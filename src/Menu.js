/**
 * Batchwork – bulk user, group & alias operations for Google Workspace
 * Menu wiring. The Control Panel sidebar is the primary interface.
 */

function onOpen(e) {
  var ui = SpreadsheetApp.getUi();
  ui.createAddonMenu()
    .addItem('Open Control Panel', 'showSidebar')
    .addSeparator()
    .addItem('Help', 'showHelp')
    .addItem('\u2665 Support Batchwork', 'showSupport')
    .addToUi();
}

function onInstall(e) {
  onOpen(e);
}
