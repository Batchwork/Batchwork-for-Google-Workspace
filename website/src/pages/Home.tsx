import { Github, ArrowRight } from "lucide-react";

const OPERATIONS = [
  "Create users",
  "Update users", 
  "Suspend users",
  "Delete users",
  "Export users",
  "Create groups",
  "Delete groups",
  "Export groups",
  "Add members",
  "Remove members",
  "Export members",
  "Create aliases",
  "Delete aliases",
  "Export aliases",
];

export default function Home() {
  return (
    <div className="px-6 pb-24 pt-32">
      <div className="mx-auto max-w-2xl">
        {/* Logo + Title */}
        <div className="flex items-center gap-4">
          <img src="/icon-128.png" alt="" className="h-16 w-16" />
          <div>
            <h1 className="font-heading text-3xl font-800 tracking-tight">Batchwork</h1>
            <p className="text-white/50">Bulk operations for Google Workspace</p>
          </div>
        </div>

        {/* Description */}
        <p className="mt-8 text-lg leading-relaxed text-white/70">
          A Google Sheets add-on for managing users, groups, and aliases in bulk. 
          Fill in a spreadsheet, click run, watch the progress bar. Free and open source.
        </p>

        {/* Buttons */}
        <div className="mt-8 flex flex-wrap gap-4">
          <a
            href="https://workspace.google.com/marketplace"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 rounded-xl bg-azure px-6 py-3 font-semibold transition-transform hover:scale-[1.02] active:scale-95"
          >
            Get it on the Marketplace
            <ArrowRight size={16} />
          </a>
          <a
            href="https://github.com/Batchwork/Batchwork-for-Google-Workspace"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 rounded-xl border border-line px-6 py-3 font-medium text-white/80 transition-colors hover:border-white/30 hover:text-white"
          >
            <Github size={18} />
            View source
          </a>
        </div>

        {/* Divider */}
        <hr className="my-12 border-line" />

        {/* Operations list */}
        <h2 className="font-heading text-xl font-700">Operations</h2>
        <ul className="mt-4 grid grid-cols-2 gap-x-8 gap-y-2 text-[15px] text-white/60">
          {OPERATIONS.map((op) => (
            <li key={op}>{op}</li>
          ))}
        </ul>

        {/* Divider */}
        <hr className="my-12 border-line" />

        {/* How it works - simple text */}
        <h2 className="font-heading text-xl font-700">How it works</h2>
        <p className="mt-4 leading-relaxed text-white/60">
          Batchwork runs as an Apps Script inside your Google Sheets. When you click run, 
          it calls Google's Admin SDK directly from your environment using your own API quota. 
          There's no external server, no shared infrastructure, and no data leaves your tenant.
        </p>

        {/* Divider */}
        <hr className="my-12 border-line" />

        {/* Requirements */}
        <h2 className="font-heading text-xl font-700">Requirements</h2>
        <p className="mt-4 leading-relaxed text-white/60">
          A Google Workspace account with admin privileges. That's it.
        </p>

        {/* Divider */}
        <hr className="my-12 border-line" />

        {/* Support */}
        <h2 className="font-heading text-xl font-700">Support the project</h2>
        <p className="mt-4 leading-relaxed text-white/60">
          Batchwork is free for everyone. If you find it useful, consider supporting 
          development to keep it maintained.
        </p>
        <a
          href="#"
          className="mt-4 inline-block text-azure hover:underline"
        >
          Become a supporter →
        </a>
      </div>
    </div>
  );
}
