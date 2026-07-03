import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const LINKS = [
  { label: "Why Batchwork", href: "/#story" },
  { label: "Operations", href: "/#operations" },
  { label: "How it works", href: "/#how" },
  { label: "Support", href: "/#support" },
  { label: "FAQ", href: "/#faq" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="fixed inset-x-0 top-5 z-50 mx-auto w-fit max-w-[94vw] px-4"
    >
      <div
        className={`glass flex items-center gap-6 rounded-2xl px-5 py-2.5 transition-shadow duration-300 ${
          scrolled ? "shadow-[0_12px_40px_rgba(3,8,24,0.55)]" : ""
        }`}
      >
        <a href="/#" className="flex items-center gap-2.5">
          <img src="/icon-128.png" alt="Batchwork" className="h-8 w-8 rounded-lg" />
          <span className="font-heading text-[15px] font-700 tracking-tight">Batchwork</span>
        </a>

        <nav className="hidden items-center gap-1 lg:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="whitespace-nowrap rounded-lg px-2.5 py-1.5 text-[13px] text-white/60 transition-colors hover:bg-white/5 hover:text-white"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <a
          href="/#get"
          className="group flex items-center gap-1.5 rounded-xl bg-azure px-4 py-2 text-[13px] font-semibold text-white transition-transform hover:scale-[1.03] active:scale-95"
        >
          Get Batchwork
          <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
        </a>
      </div>
    </motion.header>
  );
}
