import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ArrowRight, Heart } from "lucide-react";
import SidebarDemo from "./SidebarDemo";

const ROTATING = ["users", "groups", "aliases", "members"];

const fadeUp = {
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
};

export default function Hero() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIdx((i) => (i + 1) % ROTATING.length), 2400);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="grain relative overflow-hidden px-6 pb-24 pt-40 md:pt-44">
      {/* spreadsheet grid backdrop */}
      <div className="sheet-grid pointer-events-none absolute inset-0" />
      {/* glow blobs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="animate-pulseGlow absolute -top-48 left-1/2 h-[520px] w-[780px] -translate-x-1/2 rounded-full bg-azure/20 blur-[150px]" />
        <div className="absolute -bottom-40 -left-32 h-[420px] w-[420px] rounded-full bg-violet/10 blur-[130px]" />
        <div className="absolute -bottom-32 -right-24 h-[380px] w-[380px] rounded-full bg-mint/10 blur-[130px]" />
      </div>

      <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-16 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="text-center lg:text-left">
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
            className="glass mx-auto mb-7 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[11px] uppercase tracking-[0.22em] text-white/60 lg:mx-0"
          >
            <Heart size={12} className="text-azure" />
            Free forever · 100% user-supported
          </motion.div>

          <motion.h1
            {...fadeUp}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
            className="font-heading text-5xl font-800 leading-[1.04] tracking-[-0.03em] md:text-7xl"
          >
            Bulk-manage
            <br />
            <span className="relative inline-block h-[1.18em] min-w-[4.5ch] overflow-visible text-left">
              <AnimatePresence mode="wait">
                <motion.span
                  key={ROTATING[idx]}
                  initial={{ opacity: 0, y: "0.45em", filter: "blur(6px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: "-0.45em", filter: "blur(6px)" }}
                  transition={{ duration: 0.45, ease: "easeOut" }}
                  className="bg-gradient-to-r from-sky to-azure bg-clip-text text-transparent"
                >
                  {ROTATING[idx]}
                </motion.span>
              </AnimatePresence>
            </span>
            <br />
            without leaving Sheets.
          </motion.h1>

          <motion.p
            {...fadeUp}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.45 }}
            className="mx-auto mt-7 max-w-xl text-lg leading-relaxed text-white/55 lg:mx-0"
          >
            Batchwork turns a Google Sheet into a control panel for your Workspace domain.
            Create 500 users, add 2,000 group members, or export every alias. One row at a
            time, with live progress and safe retries.
          </motion.p>

          <motion.div
            {...fadeUp}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-4 lg:justify-start"
          >
            <a
              href="/#get"
              className="group flex items-center gap-2.5 rounded-2xl bg-azure px-7 py-3.5 font-semibold text-white shadow-[0_10px_36px_rgba(59,130,246,0.35)] transition-transform hover:scale-[1.04] active:scale-95"
            >
              Install free
              <span className="grid h-6 w-6 place-items-center rounded-full bg-white/15 transition-transform group-hover:translate-x-0.5">
                <ArrowRight size={14} />
              </span>
            </a>
            <a
              href="/#how"
              className="glass rounded-2xl px-7 py-3.5 font-medium text-white/80 transition-transform hover:scale-[1.04] active:scale-95"
            >
              See how it works
            </a>
          </motion.div>

          <motion.div
            {...fadeUp}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.75 }}
            className="mt-9 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[13px] text-white/40 lg:justify-start"
          >
            <span>Bulk operations</span>
            <span className="hidden h-1 w-1 rounded-full bg-white/25 sm:block" />
            <span>No credits, no paywall</span>
            <span className="hidden h-1 w-1 rounded-full bg-white/25 sm:block" />
            <span>Your data stays in your tenant</span>
          </motion.div>
        </div>

        {/* animated sidebar demo */}
        <motion.div
          initial={{ opacity: 0, y: 40, rotate: 2 }}
          animate={{ opacity: 1, y: 0, rotate: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
          className="relative mx-auto hidden md:block"
        >
          <div className="animate-float">
            <SidebarDemo />
          </div>
          {/* reflection glow under the panel */}
          <div className="absolute -bottom-10 left-1/2 h-16 w-3/4 -translate-x-1/2 rounded-full bg-azure/25 blur-3xl" />
        </motion.div>
      </div>
    </section>
  );
}
