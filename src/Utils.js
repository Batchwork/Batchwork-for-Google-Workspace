/**
 * Batchwork – bulk user, group & alias operations for Google Workspace
 * Shared engine: retry with exponential backoff, row processor, sheet helpers.
 */

var BW = {
  STATUS_HEADER: 'Status',
  OK_PREFIX: '\u2714 ',    // ✔
  ERR_PREFIX: '\u2716 ',   // ✖
  MAX_RETRIES: 5,
  // Stop safely before the Apps Script execution time limit. Runs are
  // resumable: rows already marked ✔ are skipped on the next run.
  MAX_RUNTIME_MS: 5 * 60 * 1000,
  FLUSH_EVERY: 10,
  TOAST_EVERY: 25
};

/**
 * Runs an API call, retrying on rate-limit / quota / transient server errors
 * with exponential backoff + jitter. This is what prevents the
 * "Resource has been exhausted" failures that killed Ok Goldy runs.
 */
function withRetry_(fn) {
  var delayMs = 1000;
  for (var attempt = 1; ; attempt++) {
    try {
      return fn();
    } catch (e) {
      var msg = (e && e.message) ? e.message : String(e);
      var retryable = /resource has been exhausted|quota|rate ?limit|too many|429|500|502|503|backend error|internal error|try again/i.test(msg);
      if (!retryable || attempt >= BW.MAX_RETRIES) {
        throw e;
      }
      Utilities.sleep(delayMs + Math.floor(Math.random() * 500));
      delayMs = Math.min(delayMs * 2, 32000);
    }
  }
}

/** Cleans an API error message down to something readable in a cell. */
function friendlyError_(e) {
  var msg = (e && e.message) ? e.message : String(e);
  return msg.replace(/^(GoogleJsonResponseException:|API call to \S+ failed with error:)\s*/i, '').trim();
}

/**
 * True unless the operation was invoked with {interactive:false} (i.e. from
 * the sidebar, which shows its own confirmations and result cards instead of
 * the blocking alert dialogs used by the menu flow).
 */
function isInteractive_(opts) {
  return !(opts && opts.interactive === false);
}

/** Publishes run progress for the sidebar to poll. */
function setProgress_(progress) {
  progress.ts = Date.now();
  CacheService.getDocumentCache().put('BW_PROGRESS', JSON.stringify(progress), 300);
}

/** Called by the sidebar (google.script.run) while an operation is running. */
function sidebarGetProgress() {
  var raw = CacheService.getDocumentCache().get('BW_PROGRESS');
  return raw ? JSON.parse(raw) : null;
}

/**
 * Generic engine for all row-based operations (create/update/delete etc.).
 *
 * config = {
 *   sheetName: string          — sheet to read rows from
 *   required: [string]         — column headers that must be non-empty
 *   handler: function(row)     — does the API work for one row; returns a
 *                                short success message; throws on failure
 *   confirm: string (optional) — YES/NO prompt shown before a destructive run
 *   interactive: boolean       — false = no dialogs (sidebar mode); default true
 * }
 *
 * Behavior:
 *  - Writes ✔/✖ + message into the Status column of every processed row.
 *  - Skips rows already marked ✔, so a re-run resumes where it left off.
 *  - Stops gracefully near the execution time limit; re-run to continue.
 *  - Publishes progress for the sidebar and returns a result summary object.
 */
function processRows_(config) {
  var interactive = config.interactive !== false;
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var ui = interactive ? SpreadsheetApp.getUi() : null;
  var sheet = ss.getSheetByName(config.sheetName);
  if (!sheet) {
    var noSheetMsg = 'Sheet "' + config.sheetName + '" was not found. Run Setup Sheets first.';
    if (interactive) ui.alert(noSheetMsg);
    return { error: noSheetMsg };
  }

  var data = sheet.getDataRange().getValues();
  if (data.length < 2) {
    var noRowsMsg = 'No data rows found in "' + config.sheetName + '". Add rows below the header and try again.';
    if (interactive) ui.alert(noRowsMsg);
    return { error: noRowsMsg };
  }

  var headers = data[0].map(function (h) { return String(h).trim(); });
  var statusCol = headers.indexOf(BW.STATUS_HEADER);
  if (statusCol === -1) {
    statusCol = headers.length;
    sheet.getRange(1, statusCol + 1).setValue(BW.STATUS_HEADER);
  }

  if (config.confirm && interactive) {
    var answer = ui.alert('Please confirm', config.confirm, ui.ButtonSet.YES_NO);
    if (answer !== ui.Button.YES) return { cancelled: true };
  }

  // Jump to the sheet being processed so the user can watch statuses fill in.
  sheet.activate();

  // Pre-scan so the sidebar can show a determinate progress bar.
  var pendingRows = [];
  var skipped = 0;
  for (var r = 1; r < data.length; r++) {
    var allEmpty = true;
    for (var c = 0; c < headers.length; c++) {
      var cell = data[r][c];
      if (typeof cell === 'string') cell = cell.trim();
      if (headers[c] !== BW.STATUS_HEADER && cell !== '' && cell !== null) {
        allEmpty = false;
        break;
      }
    }
    if (allEmpty) continue;
    var st = String(data[r][statusCol] || '');
    if (st.indexOf(BW.OK_PREFIX.trim()) === 0) skipped++;
    else pendingRows.push(r);
  }

  var startedAt = Date.now();
  var success = 0, failed = 0, stoppedEarly = false;
  setProgress_({ op: config.sheetName, phase: 'run', done: 0, total: pendingRows.length, ok: 0, fail: 0 });

  for (var i = 0; i < pendingRows.length; i++) {
    var rowIdx = pendingRows[i];
    var row = {};
    for (var c2 = 0; c2 < headers.length; c2++) {
      var v = data[rowIdx][c2];
      row[headers[c2]] = (typeof v === 'string') ? v.trim() : v;
    }

    if (Date.now() - startedAt > BW.MAX_RUNTIME_MS) {
      stoppedEarly = true;
      break;
    }

    var statusCell = sheet.getRange(rowIdx + 1, statusCol + 1);
    try {
      var missing = (config.required || []).filter(function (col) {
        return row[col] === '' || row[col] === null || row[col] === undefined;
      });
      if (missing.length) {
        throw new Error('Missing required value(s): ' + missing.join(', '));
      }
      var message = config.handler(row);
      statusCell.setValue(BW.OK_PREFIX + (message || 'Done'));
      success++;
    } catch (e) {
      statusCell.setValue(BW.ERR_PREFIX + friendlyError_(e));
      failed++;
    }

    var done = success + failed;
    if (done % BW.FLUSH_EVERY === 0) SpreadsheetApp.flush();
    if (done % 5 === 0 || done === pendingRows.length) {
      setProgress_({ op: config.sheetName, phase: 'run', done: done, total: pendingRows.length, ok: success, fail: failed });
    }
    if (interactive && done % BW.TOAST_EVERY === 0) {
      ss.toast(success + ' succeeded, ' + failed + ' failed so far\u2026', config.sheetName, 5);
    }
  }

  SpreadsheetApp.flush();
  setProgress_({ op: config.sheetName, phase: 'done', done: success + failed, total: pendingRows.length, ok: success, fail: failed });

  var result = {
    sheetName: config.sheetName,
    success: success,
    failed: failed,
    skipped: skipped,
    stoppedEarly: stoppedEarly
  };

  if (interactive) {
    var summary = success + ' succeeded, ' + failed + ' failed' +
      (skipped ? ', ' + skipped + ' already done (skipped)' : '') + '.';
    if (stoppedEarly) {
      summary += '\n\nStopped early to avoid the script time limit. ' +
        'Run the same menu item again to resume \u2014 completed rows are skipped automatically.';
    }
    if (failed) {
      summary += '\n\nCheck the Status column for error details. ' +
        'Fix the failed rows and run again \u2014 only non-\u2714 rows are retried.';
    }
    ui.alert(config.sheetName, summary, ui.ButtonSet.OK);
  }
  return result;
}

/**
 * Rewrites an export sheet with headers + rows, jumps the user to it, and
 * returns the row count. Pass interactive=false (sidebar mode) to skip the
 * toast — the sidebar shows its own result card.
 */
function writeExport_(sheetName, headers, rows, interactive) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(sheetName) || ss.insertSheet(sheetName);
  sheet.clearContents();
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  formatHeader_(sheet, headers.length);
  if (rows.length) {
    sheet.getRange(2, 1, rows.length, headers.length).setValues(rows);
  }
  sheet.activate();
  setProgress_({ op: sheetName, phase: 'done', done: rows.length, total: rows.length, exported: rows.length });
  if (interactive !== false) {
    ss.toast('Exported ' + rows.length + ' row(s).', sheetName, 8);
  }
  return rows.length;
}

/** Bold white-on-blue header, frozen first row. */
function formatHeader_(sheet, numColumns) {
  sheet.getRange(1, 1, 1, numColumns)
    .setBackground('#1a73e8')
    .setFontColor('#ffffff')
    .setFontWeight('bold');
  sheet.setFrozenRows(1);
}

/** TRUE/YES/Y/1 (any case) => true, everything else => false. */
function parseBool_(value) {
  return /^(true|yes|y|1)$/i.test(String(value).trim());
}

/** Random 16-char temporary password (used when the Password cell is blank). */
function generatePassword_() {
  var chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789!@#$%&*';
  var out = '';
  for (var i = 0; i < 16; i++) {
    out += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return out;
}