/**
 * Batchwork – bulk user, group & alias operations for Google Workspace
 * Setup Wizard: creates/deletes the 14 worksheets used by the add-on.
 */

var BW_SHEETS = [
  { name: '1. Create Users', headers: ['First Name', 'Last Name', 'Email', 'Password', 'Org Unit Path', 'Recovery Email', 'Change Password At Next Login'] },
  { name: '2. Update Users', headers: ['Current Email', 'New First Name', 'New Last Name', 'New Primary Email', 'New Password', 'New Org Unit Path', 'New Recovery Email'] },
  { name: '3. Suspend Users', headers: ['Email', 'Action'] },
  { name: '4. Delete Users', headers: ['Email'] },
  { name: '5. Export Users', headers: ['First Name', 'Last Name', 'Email', 'Org Unit Path', 'Suspended', 'Admin', '2SV Enrolled', 'Last Login', 'Created', 'Aliases'], isExport: true },
  { name: '6. Create Groups', headers: ['Group Email', 'Group Name', 'Description'] },
  { name: '7. Delete Groups', headers: ['Group Email'] },
  { name: '8. Export Groups', headers: ['Group Email', 'Group Name', 'Description', 'Direct Members Count', 'Aliases (Editable)', 'Aliases (Domain Alias)'], isExport: true },
  { name: '9. Add Members', headers: ['Group Email', 'Member Email', 'Role'] },
  { name: '10. Export Members', headers: ['Group Email', 'Member Email', 'Role', 'Type', 'Member Status'], isExport: true },
  { name: '11. Remove Members', headers: ['Group Email', 'Member Email'] },
  { name: '12. Create Aliases', headers: ['User Email', 'Alias Email'] },
  { name: '13. Delete User Aliases', headers: ['User Email', 'Alias Email'] },
  { name: '14. Export User Aliases', headers: ['User Email', 'Alias', 'Type'], isExport: true }
];

/** Setup Wizard > Setup Sheets */
function setupSheets(opts) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();

  BW_SHEETS.forEach(function (def) {
    var sheet = ss.getSheetByName(def.name);
    if (!sheet) sheet = ss.insertSheet(def.name, ss.getNumSheets());

    var headers = def.headers.slice();
    if (!def.isExport) headers.push(BW.STATUS_HEADER);

    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    formatHeader_(sheet, headers.length);
  });

  // Drop the default empty "Sheet1" if it is still around and untouched.
  var sheet1 = ss.getSheetByName('Sheet1');
  if (sheet1 && sheet1.getLastRow() === 0 && ss.getNumSheets() > BW_SHEETS.length) {
    ss.deleteSheet(sheet1);
  }

  if (isInteractive_(opts)) {
    ss.toast('All ' + BW_SHEETS.length + ' sheets are ready.', 'Setup complete', 8);
  }
  return { message: 'All ' + BW_SHEETS.length + ' sheets are ready.' };
}

/** Setup Wizard > Delete All Sheets */
function deleteAllSheets(opts) {
  if (isInteractive_(opts)) {
    var ui = SpreadsheetApp.getUi();
    var answer = ui.alert(
      'Delete All Sheets',
      'This deletes the ' + BW_SHEETS.length + ' Batchwork worksheets (and any data typed into them). Continue?',
      ui.ButtonSet.YES_NO
    );
    if (answer !== ui.Button.YES) return { cancelled: true };
  }

  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var names = BW_SHEETS.map(function (d) { return d.name; });
  var remaining = ss.getSheets().filter(function (s) { return names.indexOf(s.getName()) === -1; });

  // A spreadsheet must always keep at least one sheet.
  if (remaining.length === 0) ss.insertSheet('Sheet1', 0);

  names.forEach(function (name) {
    var sheet = ss.getSheetByName(name);
    if (sheet) ss.deleteSheet(sheet);
  });

  if (isInteractive_(opts)) ss.toast('Batchwork sheets deleted.', 'Done', 5);
  return { message: 'Batchwork sheets deleted.' };
}
