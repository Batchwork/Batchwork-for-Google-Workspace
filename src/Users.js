/**
 * Batchwork – bulk user, group & alias operations for Google Workspace
 * Users Manager: create, update, suspend/restore, delete, export.
 */

/** 1. Create Users */
function createUsers(opts) {
  var sheetName = '1. Create Users';
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(sheetName);

  // Auto-generate temporary passwords for blank Password cells first, and
  // write them back so the admin can hand them out.
  if (sheet && sheet.getLastRow() > 1) {
    var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0]
      .map(function (h) { return String(h).trim(); });
    var pwdCol = headers.indexOf('Password');
    var emailCol = headers.indexOf('Email');
    if (pwdCol !== -1 && emailCol !== -1) {
      var values = sheet.getRange(2, 1, sheet.getLastRow() - 1, sheet.getLastColumn()).getValues();
      for (var i = 0; i < values.length; i++) {
        var email = String(values[i][emailCol]).trim();
        var pwd = String(values[i][pwdCol]).trim();
        if (email && !pwd) {
          sheet.getRange(i + 2, pwdCol + 1).setValue(generatePassword_());
        }
      }
      SpreadsheetApp.flush();
    }
  }

  return processRows_({
    sheetName: sheetName,
    interactive: isInteractive_(opts),
    required: ['First Name', 'Last Name', 'Email', 'Password'],
    handler: function (row) {
      var email = String(row['Email']);
      if (email.indexOf('@') === -1) throw new Error('Invalid email: ' + email);

      var user = {
        primaryEmail: email,
        name: {
          givenName: String(row['First Name']),
          familyName: String(row['Last Name'])
        },
        password: String(row['Password']),
        changePasswordAtNextLogin: row['Change Password At Next Login'] === '' ? true : parseBool_(row['Change Password At Next Login'])
      };
      if (row['Org Unit Path']) user.orgUnitPath = String(row['Org Unit Path']);
      if (row['Recovery Email']) user.recoveryEmail = String(row['Recovery Email']);

      withRetry_(function () { return AdminDirectory.Users.insert(user); });
      return 'User created';
    }
  });
}

/** 2. Update Users */
function updateUsers(opts) {
  return processRows_({
    sheetName: '2. Update Users',
    interactive: isInteractive_(opts),
    required: ['Current Email'],
    handler: function (row) {
      var patch = {};
      var changes = [];

      if (row['New First Name'] || row['New Last Name']) {
        patch.name = {};
        if (row['New First Name']) { patch.name.givenName = String(row['New First Name']); changes.push('first name'); }
        if (row['New Last Name'])  { patch.name.familyName = String(row['New Last Name']); changes.push('last name'); }
      }
      if (row['New Primary Email']) { patch.primaryEmail = String(row['New Primary Email']); changes.push('primary email'); }
      if (row['New Password']) {
        patch.password = String(row['New Password']);
        patch.changePasswordAtNextLogin = true;
        changes.push('password');
      }
      if (row['New Org Unit Path'])  { patch.orgUnitPath = String(row['New Org Unit Path']); changes.push('org unit'); }
      if (row['New Recovery Email']) { patch.recoveryEmail = String(row['New Recovery Email']); changes.push('recovery email'); }

      if (!changes.length) throw new Error('Nothing to update \u2014 all "New \u2026" columns are blank');

      withRetry_(function () { return AdminDirectory.Users.update(patch, String(row['Current Email'])); });
      return 'Updated ' + changes.join(', ');
    }
  });
}

/** 3. Suspend Users */
function suspendUsers(opts) {
  return processRows_({
    sheetName: '3. Suspend Users',
    interactive: isInteractive_(opts),
    required: ['Email'],
    handler: function (row) {
      var action = String(row['Action'] || 'SUSPEND').toUpperCase();
      var suspend;
      if (action === 'SUSPEND') suspend = true;
      else if (action === 'RESTORE' || action === 'UNSUSPEND') suspend = false;
      else throw new Error('Action must be SUSPEND or RESTORE (got "' + row['Action'] + '")');

      withRetry_(function () { return AdminDirectory.Users.update({ suspended: suspend }, String(row['Email'])); });
      return suspend ? 'Suspended' : 'Restored';
    }
  });
}

/** 4. Delete Users */
function deleteUsers(opts) {
  return processRows_({
    sheetName: '4. Delete Users',
    interactive: isInteractive_(opts),
    required: ['Email'],
    confirm: 'You are about to DELETE the users listed in "4. Delete Users".\n\n' +
      'Deleted users can only be restored from the Admin console within 20 days. Continue?',
    handler: function (row) {
      withRetry_(function () { return AdminDirectory.Users.remove(String(row['Email'])); });
      return 'User deleted';
    }
  });
}

/** 5. Export Users */
function exportUsers(opts) {
  var headers = ['First Name', 'Last Name', 'Email', 'Org Unit Path', 'Suspended', 'Admin', '2SV Enrolled', 'Last Login', 'Created', 'Aliases'];
  var rows = [];
  var pageToken;
  setProgress_({ op: '5. Export Users', phase: 'export', done: 0 });

  do {
    var page = withRetry_(function () {
      return AdminDirectory.Users.list({
        customer: 'my_customer',
        maxResults: 500,
        orderBy: 'email',
        projection: 'full',
        pageToken: pageToken
      });
    });
    (page.users || []).forEach(function (u) {
      rows.push([
        (u.name && u.name.givenName) || '',
        (u.name && u.name.familyName) || '',
        u.primaryEmail || '',
        u.orgUnitPath || '',
        u.suspended ? 'TRUE' : 'FALSE',
        u.isAdmin ? 'TRUE' : 'FALSE',
        u.isEnrolledIn2Sv ? 'TRUE' : 'FALSE',
        u.lastLoginTime || '',
        u.creationTime || '',
        (u.aliases || []).join(', ')
      ]);
    });
    pageToken = page.nextPageToken;
    setProgress_({ op: '5. Export Users', phase: 'export', done: rows.length });
  } while (pageToken);

  var count = writeExport_('5. Export Users', headers, rows, isInteractive_(opts));
  return { sheetName: '5. Export Users', exported: count };
}
