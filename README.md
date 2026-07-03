# Batchwork

Bulk operations for Google Workspace, powered by Google Sheets.

![Batchwork](branding/icon-128.png)

Batchwork is a Google Sheets add-on that lets Workspace admins manage users, groups, members, and aliases in bulk. Fill in a spreadsheet, click run, watch the progress bar.

## Operations

| Category | Operations |
|----------|------------|
| **Users** | Create · Update · Suspend · Delete · Export |
| **Groups** | Create · Delete · Export |
| **Members** | Add · Remove · Export |
| **Aliases** | Create · Delete · Export |

## Installation

### From the Marketplace

Install from the [Google Workspace Marketplace](https://workspace.google.com/marketplace) (search "Batchwork").

### Self-hosted

If you prefer to run Batchwork in your own Google Cloud project:

1. Create a new Google Sheet
2. Open **Extensions → Apps Script**
3. Copy each file from `src/` into the editor:
   - `.js` files → New script file
   - `.html` files → New HTML file
4. Open **Project Settings** → enable "Show appsscript.json"
5. Replace `appsscript.json` contents with `src/appsscript.json`
6. Reload the spreadsheet
7. Click **Batchwork → Open Control Panel → Set up sheets**
8. Authorize when prompted

**Using clasp** (faster for developers):

```bash
npm i -g @google/clasp
clasp login
clasp create --type sheets --rootDir src
clasp push
```

## Usage

1. Open the **Control Panel** from the Batchwork menu
2. Click an operation to open its sheet
3. Fill in rows (headers show required columns)
4. Click **Run**
5. Watch the progress bar; check the Status column when done

Rows marked ✔ are skipped on re-run, so you can fix failures and run again.

### Notes

- **Create Users**: Leave password blank to auto-generate one
- **Update Users**: Only fill columns you want to change
- **Exports**: Always fetch fresh from Google (ignores existing sheet data)
- **Alias exports**: Include both editable and non-editable (domain alias) addresses

## Requirements

- Google Workspace account with admin privileges
- That's it. No servers, no API keys, no billing.

## How it works

Batchwork runs as an Apps Script bound to your spreadsheet. API calls go directly from your Google environment to Google's Admin SDK using your own quota. There's no shared infrastructure.

## Project structure

```
src/
├── appsscript.json      # Manifest (scopes + Admin SDK)
├── Menu.js              # Extension menu
├── Setup.js             # Sheet creation
├── Utils.js             # Core engine (retry, progress, status)
├── Users.js             # User operations
├── Groups.js            # Group operations
├── Members.js           # Member operations
├── Aliases.js           # Alias operations
├── Sidebar.js           # Control panel backend
├── SidebarView.html     # Control panel UI
├── Help.js              # Help/support dialogs
├── HelpDialog.html
└── SupportDialog.html
```

## Troubleshooting

**"AdminDirectory is not defined"**  
The manifest wasn't set up correctly. Make sure `appsscript.json` includes the `enabledAdvancedServices` block.

**"Not Authorized to access this resource/api"**  
The account running Batchwork isn't a Workspace admin, or lacks privileges for that operation.

**"Domain cannot use apis"**  
Check Admin Console → Security → API controls. API access may be disabled.

**Menu doesn't appear**  
Reload the spreadsheet. The menu only loads on page open.

## License

MIT

## Links

- [Website](https://batchwork.app)
- [Marketplace](https://workspace.google.com/marketplace)
- [Report an issue](https://github.com/Batchwork/Batchwork-for-Google-Workspace/issues)
