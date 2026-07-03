import { Github } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-line px-6 py-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-8 md:flex-row">
        <div className="flex items-center gap-3">
          <img src="/icon-128.png" alt="" className="h-9 w-9 rounded-lg" />
          <div>
            <div className="font-heading text-[15px] font-700">Batchwork</div>
            <div className="text-[12px] text-white/35">Bulk operations for Google Workspace</div>
          </div>
        </div>

        <nav className="flex flex-wrap items-center justify-center gap-x-7 gap-y-3 text-[13px] text-white/45">
          <a href="/#operations" className="transition-colors hover:text-white">Operations</a>
          <a href="/#support" className="transition-colors hover:text-white">Support</a>
          <a href="/#faq" className="transition-colors hover:text-white">FAQ</a>
          <a href="#/privacy" className="transition-colors hover:text-white">Privacy</a>
          <a href="#/terms" className="transition-colors hover:text-white">Terms</a>
          <a
            href="https://github.com/Batchwork/Batchwork-for-Google-Workspace"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 transition-colors hover:text-white"
          >
            <Github size={14} />
            GitHub
          </a>
        </nav>
      </div>

      <div className="mx-auto mt-10 flex max-w-6xl flex-col items-center justify-between gap-3 border-t border-line pt-6 text-[11.5px] text-white/25 md:flex-row">
        <span>© {new Date().getFullYear()} Batchwork. Free forever, user-supported.</span>
        <span>
          Google Workspace™ and Google Sheets™ are trademarks of Google LLC. Batchwork is not
          affiliated with or endorsed by Google.
        </span>
      </div>
    </footer>
  );
}
