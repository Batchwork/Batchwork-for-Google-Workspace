import { motion } from "framer-motion";
import { ArrowRight, Check, Zap } from "lucide-react";
import AppShowcase from "./AppShowcase";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

export default function Hero() {
  return (
    <section className="grain relative overflow-hidden px-6 pb-0 pt-36 md:pt-40">
      {/* owned animated aurora */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="aurora" />
      </div>
      <div className="sheet-grid pointer-events-none absolute inset-0" />

      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center text-center">
        {/* glass badge */}
        <motion.div
          {...fadeUp}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="liquid-glass mb-7 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[12.5px] text-white/70"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-mint" />
          Free &amp; open source · runs in your own tenant
        </motion.div>

        {/* headline */}
        <motion.h1
          {...fadeUp}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          className="font-heading text-5xl font-800 leading-[0.96] tracking-[-0.035em] md:text-[5.5rem]"
        >
          Run your whole
          <br />
          domain from a{" "}
          <span className="font-serif font-400 italic tracking-normal text-sky">sheet</span>
          .
        </motion.h1>

        {/* subheadline */}
        <motion.p
          {...fadeUp}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          className="mt-6 max-w-[560px] text-lg leading-relaxed text-white/55"
        >
          Batchwork turns Google Sheets into a control panel for Workspace. Create
          users, manage groups, export aliases. Fill in rows, hit run, watch it work.
        </motion.p>

        {/* CTAs */}
        <motion.div
          {...fadeUp}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
          className="mt-8 flex items-center gap-3"
        >
          <a
            href="https://workspace.google.com/marketplace"
            target="_blank"
            rel="noreferrer"
            className="group flex items-center gap-2 rounded-full bg-azure px-6 py-3 text-[15px] font-semibold text-white shadow-[0_10px_36px_rgba(59,130,246,0.4)] transition-transform hover:scale-[1.03] active:scale-95"
          >
            Get it on the Marketplace
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
          </a>
          <a
            href="https://github.com/Batchwork/Batchwork-for-Google-Workspace"
            target="_blank"
            rel="noreferrer"
            className="liquid-glass rounded-full px-6 py-3 text-[15px] font-medium text-white/85 transition-transform hover:scale-[1.03] active:scale-95"
          >
            View source
          </a>
        </motion.div>
      </div>

      {/* centerpiece with layered floating cards (biotech-SaaS depth) */}
      <div className="relative z-10 mx-auto -mb-24 mt-16 flex justify-center md:-mb-40">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
          className="relative w-fit"
        >
          <div className="animate-float">
            <AppShowcase />
          </div>

          {/* floating: operation card (front-left) */}
          <motion.div
            initial={{ opacity: 0, y: 24, x: -10 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.9 }}
            className="absolute -left-8 top-10 z-30 hidden w-[210px] rounded-2xl border border-white/10 bg-[#0e1832]/95 p-3.5 shadow-[0_24px_60px_rgba(2,6,20,0.65)] backdrop-blur-xl lg:block"
            style={{ transform: "rotate(-4deg)" }}
          >
            <div className="flex items-center gap-2.5">
              <span className="grid h-7 w-7 place-items-center rounded-lg bg-azure/20 text-[12px] font-bold text-sky">1</span>
              <span className="text-[13px] font-semibold text-white/90">Create Users</span>
            </div>
            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10">
              <div className="h-full w-[82%] rounded-full bg-gradient-to-r from-sky to-azure" />
            </div>
            <div className="mt-2 font-mono text-[10.5px] text-white/45">410 / 500 · ✔ 410 ✘ 0</div>
          </motion.div>

          {/* floating: success toast (front-right) */}
          <motion.div
            initial={{ opacity: 0, y: 24, x: 10 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 1.1 }}
            className="absolute -right-10 top-[42%] z-30 hidden w-[220px] rounded-2xl border border-white/10 bg-[#0e1832]/95 p-3.5 shadow-[0_24px_60px_rgba(2,6,20,0.65)] backdrop-blur-xl lg:block"
            style={{ transform: "rotate(3deg)" }}
          >
            <div className="flex items-center gap-2.5">
              <span className="grid h-7 w-7 place-items-center rounded-full bg-mint/20 text-mint">
                <Check size={14} strokeWidth={3} />
              </span>
              <span className="text-[13px] font-semibold text-white/90">500 succeeded, 0 failed</span>
            </div>
            <div className="mt-2 text-[11px] leading-relaxed text-white/45">
              Status written back to every row.
            </div>
          </motion.div>

          {/* floating: speed pill (top-right) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 1.25 }}
            className="liquid-glass absolute right-8 -top-4 z-30 hidden items-center gap-1.5 rounded-full px-3 py-1.5 text-[12px] font-medium text-white/85 lg:flex"
          >
            <Zap size={12} className="text-amber" />
            Auto-retry &amp; resume
          </motion.div>

          <div className="absolute -bottom-4 left-1/2 h-24 w-3/4 -translate-x-1/2 rounded-full bg-azure/25 blur-[80px]" />
        </motion.div>
      </div>

      {/* fade into next section */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-40 bg-gradient-to-t from-ink to-transparent" />
    </section>
  );
}
