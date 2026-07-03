const UPDATED = "July 3, 2026";

export default function Privacy() {
  return (
    <section className="px-6 pb-24 pt-36">
      <div className="mx-auto max-w-3xl">
        <h1 className="font-heading text-4xl font-800 tracking-tight">Privacy Policy</h1>
        <p className="mt-2 text-sm text-white/35">Last updated: {UPDATED}</p>

        <div className="mt-10 space-y-10 text-[15px] leading-[1.75] text-white/60">
          <div>
            <h2 className="mb-3 font-heading text-xl font-700 text-white">The short version</h2>
            <p>
              Batchwork does not collect, store, transmit, or sell any of your data.
              The add-on runs entirely within Google's infrastructure, between your
              spreadsheet and Google's own APIs. There are no Batchwork servers, no
              analytics, no tracking, and no third parties.
            </p>
          </div>

          <div>
            <h2 className="mb-3 font-heading text-xl font-700 text-white">What Batchwork accesses</h2>
            <p>
              To perform the bulk operations you request, Batchwork uses the following Google
              OAuth scopes:
            </p>
            <ul className="mt-4 space-y-3">
              {[
                {
                  scope: "admin.directory.user",
                  why: "Create, update, suspend, delete, and export user accounts in your Google Workspace domain — only when you run a user operation.",
                },
                {
                  scope: "admin.directory.group",
                  why: "Create, delete, and export groups — only when you run a group operation.",
                },
                {
                  scope: "admin.directory.group.member",
                  why: "Add, remove, and export group members — only when you run a member operation.",
                },
                {
                  scope: "spreadsheets.currentonly",
                  why: "Read the rows you filled in and write status results back. Batchwork can only see the spreadsheet it is installed in — never your other Drive files.",
                },
                {
                  scope: "script.container.ui",
                  why: "Display the control panel sidebar and dialogs inside Google Sheets.",
                },
              ].map((s) => (
                <li key={s.scope} className="glass rounded-xl p-4">
                  <code className="font-mono text-[13px] text-sky">{s.scope}</code>
                  <p className="mt-1.5 text-[13.5px] text-white/50">{s.why}</p>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="mb-3 font-heading text-xl font-700 text-white">Where your data goes</h2>
            <p>
              Directory data (users, groups, members, aliases) flows directly between your
              spreadsheet and the Google Admin SDK API, inside your own Google Workspace
              tenant, under the account of the administrator running the operation. Exported
              data is written only to your spreadsheet. Nothing is sent to the developer of
              Batchwork or to any third party.
            </p>
          </div>

          <div>
            <h2 className="mb-3 font-heading text-xl font-700 text-white">Data retention</h2>
            <p>
              Batchwork retains nothing. When an operation finishes, the only artifacts are
              the rows and status columns in your own spreadsheet, which you control and can
              delete at any time. Actions performed through the Admin SDK appear in your
              Google Admin console audit log, managed by Google under your organization's
              policies.
            </p>
          </div>

          <div>
            <h2 className="mb-3 font-heading text-xl font-700 text-white">
              Google API Services User Data Policy
            </h2>
            <p>
              Batchwork's use of information received from Google APIs adheres to the{" "}
              <a
                href="https://developers.google.com/terms/api-services-user-data-policy"
                target="_blank"
                rel="noreferrer"
                className="text-sky underline decoration-sky/40 underline-offset-2 hover:decoration-sky"
              >
                Google API Services User Data Policy
              </a>
              , including the Limited Use requirements.
            </p>
          </div>

          <div>
            <h2 className="mb-3 font-heading text-xl font-700 text-white">Changes & contact</h2>
            <p>
              If this policy changes, the "Last updated" date above will change with it.
              Questions? Open an issue on{" "}
              <a
                href="https://github.com/Batchwork/Batchwork-for-Google-Workspace"
                target="_blank"
                rel="noreferrer"
                className="text-sky underline decoration-sky/40 underline-offset-2 hover:decoration-sky"
              >
                GitHub
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
