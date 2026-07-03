/**
 * Batchwork – bulk user, group & alias operations for Google Workspace
 * Help dialog.
 */

function showHelp() {
  var html = HtmlService.createHtmlOutputFromFile('HelpDialog')
    .setWidth(460)
    .setHeight(440);
  SpreadsheetApp.getUi().showModalDialog(html, 'Help for Batchwork');
}

function showSupport() {
  var html = HtmlService.createHtmlOutputFromFile('SupportDialog')
    .setWidth(420)
    .setHeight(430);
  SpreadsheetApp.getUi().showModalDialog(html, 'Support Batchwork');
}
