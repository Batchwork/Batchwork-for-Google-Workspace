/**
 * Batchwork – bulk user, group & alias operations for Google Workspace
 * Control panel sidebar: server-side API called by SidebarView.html
 * via google.script.run.
 */

/** Single source of truth for what the sidebar can run. */
var BW_OPS = [
  { id: 'createUsers', n: 1, label: 'Create Users', group: 'Users', sheet: '1. Create Users', type: 'rows',
    desc: 'Creates one account per row. Leave Password blank to auto-generate a temporary one.',
    required: ['First Name', 'Last Name', 'Email'] },
  { id: 'updateUsers', n: 2, label: 'Update Users', group: 'Users', sheet: '2. Update Users', type: 'rows',
    desc: 'Changes only the "New \u2026" columns you fill in; blank columns are left untouched.',
    required: ['Current Email'] },
  { id: 'suspendUsers', n: 3, label: 'Suspend Users', group: 'Users', sheet: '3. Suspend Users', type: 'rows',
    desc: 'Action column: SUSPEND (default) or RESTORE.',
    required: ['Email'] },
  { id: 'deleteUsers', n: 4, label: 'Delete Users', group: 'Users', sheet: '4. Delete Users', type: 'rows',
    desc: 'Deletes the listed accounts. Restorable from the Admin console for 20 days.',
    required: ['Email'], destructive: true,
    confirmText: 'Delete every listed user? They can only be restored within 20 days.' },
  { id: 'exportUsers', n: 5, label: 'Export Users', group: 'Users', sheet: '5. Export Users', type: 'export',
    desc: 'Rewrites the sheet with every user in your domain, including org unit, 2SV and last login.' },

  { id: 'createGroups', n: 6, label: 'Create Groups', group: 'Groups', sheet: '6. Create Groups', type: 'rows',
    desc: 'Creates one group per row.',
    required: ['Group Email', 'Group Name'] },
  { id: 'deleteGroups', n: 7, label: 'Delete Groups', group: 'Groups', sheet: '7. Delete Groups', type: 'rows',
    desc: 'Deletes the listed groups. Membership lists are not recoverable.',
    required: ['Group Email'], destructive: true,
    confirmText: 'Delete every listed group? Their membership lists cannot be recovered.' },
  { id: 'exportGroups', n: 8, label: 'Export Groups', group: 'Groups', sheet: '8. Export Groups', type: 'export',
    desc: 'Rewrites the sheet with every group in your domain, including aliases (manual and domain-alias generated).' },

  { id: 'addMembers', n: 9, label: 'Add Members', group: 'Groups', sheet: '9. Add Members', type: 'rows',
    desc: 'Adds each member to its group. Role: MEMBER (default), MANAGER or OWNER.',
    required: ['Group Email', 'Member Email'] },
  { id: 'exportMembers', n: 10, label: 'Export Members', group: 'Groups', sheet: '10. Export Members', type: 'export',
    desc: 'Exports every member of every group in your domain. The sheet is cleared and rewritten.' },
  { id: 'removeMembers', n: 11, label: 'Remove Members', group: 'Groups', sheet: '11. Remove Members', type: 'rows',
    desc: 'Removes members from groups. The user accounts themselves are untouched.',
    required: ['Group Email', 'Member Email'] },

  { id: 'createAliases', n: 12, label: 'Create Aliases', group: 'Aliases', sheet: '12. Create Aliases', type: 'rows',
    desc: 'Adds an email alias (nickname) to each listed user.',
    required: ['User Email', 'Alias Email'] },
  { id: 'deleteUserAliases', n: 13, label: 'Delete User Aliases', group: 'Aliases', sheet: '13. Delete User Aliases', type: 'rows',
    desc: 'Removes the listed aliases.',
    required: ['User Email', 'Alias Email'] },
  { id: 'exportUserAliases', n: 14, label: 'Export User Aliases', group: 'Aliases', sheet: '14. Export User Aliases', type: 'export',
    desc: 'Exports every alias for every user, including non-editable aliases from alias domains. The sheet is cleared and rewritten.' }
];

function showSidebar() {
  var t = HtmlService.createTemplateFromFile('SidebarView');
  var html = t.evaluate().setTitle('Batchwork');
  SpreadsheetApp.getUi().showSidebar(html);
}

/** Sidebar bootstrap: operations plus whether the sheets exist yet. */
function sidebarInit() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  return {
    ops: BW_OPS,
    isSetUp: BW_SHEETS.every(function (d) { return ss.getSheetByName(d.name) !== null; })
  };
}

/** Runs an operation on behalf of the sidebar (confirmations happen client-side). */
function sidebarRun(opId) {
  var fns = {
    createUsers: createUsers, updateUsers: updateUsers, suspendUsers: suspendUsers,
    deleteUsers: deleteUsers, exportUsers: exportUsers,
    createGroups: createGroups, deleteGroups: deleteGroups, exportGroups: exportGroups,
    addMembers: addMembers, exportMembers: exportMembers, removeMembers: removeMembers,
    createAliases: createAliases, deleteUserAliases: deleteUserAliases, exportUserAliases: exportUserAliases,
    setupSheets: setupSheets, deleteAllSheets: deleteAllSheets
  };
  var fn = fns[opId];
  if (!fn) throw new Error('Unknown operation: ' + opId);
  return fn({ interactive: false }) || { message: 'Done' };
}

/** Jumps the user to an operation's sheet. Returns false if it doesn't exist. */
function sidebarOpenSheet(sheetName) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
  if (!sheet) return false;
  sheet.activate();
  return true;
}
