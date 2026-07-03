/**
 * Batchwork – bulk user, group & alias operations for Google Workspace
 * Group membership operations: add, export, remove members.
 */

/** 9. Add Members */
function addMembers(opts) {
  return processRows_({
    sheetName: '9. Add Members',
    interactive: isInteractive_(opts),
    required: ['Group Email', 'Member Email'],
    handler: function (row) {
      var role = String(row['Role'] || 'MEMBER').toUpperCase();
      if (['MEMBER', 'MANAGER', 'OWNER'].indexOf(role) === -1) {
        throw new Error('Role must be MEMBER, MANAGER or OWNER (got "' + row['Role'] + '")');
      }
      withRetry_(function () {
        return AdminDirectory.Members.insert(
          { email: String(row['Member Email']), role: role },
          String(row['Group Email'])
        );
      });
      return 'Added as ' + role;
    }
  });
}

/** 10. Export Members */
function exportMembers(opts) {
  var sheetName = '10. Export Members';
  var headers = ['Group Email', 'Member Email', 'Role', 'Type', 'Member Status'];
  setProgress_({ op: sheetName, phase: 'export', done: 0 });

  // Get all groups first
  var groupEmails = [];
  var pageToken;
  do {
    var page = withRetry_(function () {
      return AdminDirectory.Groups.list({ customer: 'my_customer', maxResults: 200, pageToken: pageToken });
    });
    (page.groups || []).forEach(function (g) { groupEmails.push(g.email); });
    pageToken = page.nextPageToken;
  } while (pageToken);

  var rows = [];
  groupEmails.forEach(function (groupEmail) {
    var memberToken;
    try {
      do {
        var memberPage = withRetry_(function () {
          return AdminDirectory.Members.list(groupEmail, { maxResults: 200, pageToken: memberToken });
        });
        (memberPage.members || []).forEach(function (m) {
          rows.push([groupEmail, m.email || m.id || '', m.role || '', m.type || '', m.status || '']);
        });
        memberToken = memberPage.nextPageToken;
      } while (memberToken);
    } catch (e) {
      rows.push([groupEmail, 'ERROR: ' + friendlyError_(e), '', '', '']);
    }
    setProgress_({ op: sheetName, phase: 'export', done: rows.length });
  });

  var count = writeExport_(sheetName, headers, rows, isInteractive_(opts));
  return { sheetName: sheetName, exported: count };
}

/** 11. Remove Members */
function removeMembers(opts) {
  return processRows_({
    sheetName: '11. Remove Members',
    interactive: isInteractive_(opts),
    required: ['Group Email', 'Member Email'],
    handler: function (row) {
      withRetry_(function () {
        return AdminDirectory.Members.remove(String(row['Group Email']), String(row['Member Email']));
      });
      return 'Removed from group';
    }
  });
}
