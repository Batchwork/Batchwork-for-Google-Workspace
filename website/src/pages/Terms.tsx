const UPDATED = "July 3, 2026";

export default function Terms() {
  return (
    <section className="px-6 pb-24 pt-36">
      <div className="mx-auto max-w-3xl">
        <h1 className="font-heading text-4xl font-800 tracking-tight">Terms of Service</h1>
        <p className="mt-2 text-sm text-white/35">Last updated: {UPDATED}</p>

        <div className="mt-10 space-y-10 text-[15px] leading-[1.75] text-white/60">
          <div>
            <h2 className="mb-3 font-heading text-xl font-700 text-white">1. What Batchwork is</h2>
            <p>
              Batchwork is a Google Sheets™ add-on that performs bulk administrative
              operations (users, groups, members, and aliases) in Google Workspace™ domains
              via Google's Admin SDK API. It is provided free of charge and funded by
              voluntary user support.
            </p>
          </div>

          <div>
            <h2 className="mb-3 font-heading text-xl font-700 text-white">2. Who may use it</h2>
            <p>
              Directory operations require Google Workspace administrator privileges. By using
              Batchwork you confirm you are authorized to administer the domain you operate
              on, and that your use complies with your organization's policies and applicable
              law.
            </p>
          </div>

          <div>
            <h2 className="mb-3 font-heading text-xl font-700 text-white">3. Your responsibility</h2>
            <p>
              Batchwork executes exactly the operations you specify in your spreadsheet rows.
              Bulk deletion, suspension, and modification of accounts are powerful actions —
              review your data before pressing Run. You are responsible for the changes made
              to your domain, including recoverability windows (for example, Google's 20-day
              user restore period).
            </p>
          </div>

          <div>
            <h2 className="mb-3 font-heading text-xl font-700 text-white">4. No warranty</h2>
            <p>
              Batchwork is provided "as is", without warranty of any kind, express or implied,
              including merchantability, fitness for a particular purpose, and
              non-infringement. In no event shall the authors be liable for any claim, damages
              or other liability arising from the use of the software. The source code is
              available under its published open-source license on GitHub.
            </p>
          </div>

          <div>
            <h2 className="mb-3 font-heading text-xl font-700 text-white">5. Support & payments</h2>
            <p>
              Supporter contributions and commercial licenses are voluntary, non-refundable
              donations that fund maintenance. They do not purchase features, support
              guarantees, or service-level agreements — every feature remains free for
              everyone.
            </p>
          </div>

          <div>
            <h2 className="mb-3 font-heading text-xl font-700 text-white">6. Google trademarks</h2>
            <p>
              Google Workspace™, Google Sheets™, and related marks are trademarks of Google
              LLC. Batchwork is an independent project and is not affiliated with, sponsored
              by, or endorsed by Google.
            </p>
          </div>

          <div>
            <h2 className="mb-3 font-heading text-xl font-700 text-white">7. Changes</h2>
            <p>
              These terms may be updated as the project evolves; the date above reflects the
              latest revision. Continued use after a change constitutes acceptance. Questions
              are welcome on{" "}
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
