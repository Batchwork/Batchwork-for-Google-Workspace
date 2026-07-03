/**
 * Batchwork – bulk user, group & alias operations for Google Workspace
 * Groups Manager: create, delete, export.
 */

/** 6. Create Groups */
function createGroups(opts) {
  return processRows_({
    sheetName: '6. Create Groups',
    interactive: isInteractive_(opts),
    required: ['Group Email', 'Group Name'],
    handler: function (row) {
      var group = {
        email: String(row['Group Email']),
        name: String(row['Group Name'])
      };
      if (row['Description']) group.description = String(row['Description']);

      withRetry_(function () { return AdminDirectory.Groups.insert(group); });
      return 'Group created';
    }
  });
}

/** 7. Delete Groups */
function deleteGroups(opts) {
  return processRows_({
    sheetName: '7. Delete Groups',
    interactive: isInteractive_(opts),
    required: ['Group Email'],
    confirm: 'You are about to DELETE the groups listed in "7. Delete Groups".\n\n' +
      'Group settings and membership lists cannot be recovered. Continue?',
    handler: function (row) {
      withRetry_(function () { return AdminDirectory.Groups.remove(String(row['Group Email'])); });
      return 'Group deleted';
    }
  });
}

/** 8. Export Groups */
function exportGroups(opts) {
  var headers = ['Group Email', 'Group Name', 'Description', 'Direct Members Count', 'Aliases (Editable)', 'Aliases (Domain Alias)'];
  var rows = [];
  var pageToken;
  setProgress_({ op: '8. Export Groups', phase: 'export', done: 0 });

  do {
    var page = withRetry_(function () {
      return AdminDirectory.Groups.list({
        customer: 'my_customer',
        maxResults: 200,
        pageToken: pageToken
      });
    });
    (page.groups || []).forEach(function (g) {
      var editable = (g.aliases || []).filter(function (a) { return !isTestDomainAlias_(a); });
      var fromDomain = (g.nonEditableAliases || []).filter(function (a) { return !isTestDomainAlias_(a); });
      rows.push([
        g.email || '',
        g.name || '',
        g.description || '',
        g.directMembersCount || 0,
        editable.join(', '),
        fromDomain.join(', ')
      ]);
    });
    pageToken = page.nextPageToken;
    setProgress_({ op: '8. Export Groups', phase: 'export', done: rows.length });
  } while (pageToken);

  var count = writeExport_('8. Export Groups', headers, rows, isInteractive_(opts));
  return { sheetName: '8. Export Groups', exported: count };
}
