import { motion } from "framer-motion";
import { ArrowRight, Github } from "lucide-react";

export default function CTA() {
  return (
    <section id="get" className="relative overflow-hidden px-6 py-32">
      {/* big glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-azure/15 blur-[140px]" />
      <div className="sheet-grid pointer-events-none absolute inset-0" />

      <motion.div
        initial={{ opacity: 0, y: 34 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative mx-auto max-w-3xl text-center"
      >
        <motion.img
          src="/icon-128.png"
          alt=""
          className="mx-auto mb-8 h-20 w-20 rounded-[22px] shadow-[0_18px_50px_rgba(59,130,246,0.4)]"
          initial={{ scale: 0.7, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 200, damping: 18, delay: 0.15 }}
        />
        <h2 className="font-heading text-4xl font-800 tracking-tight md:text-6xl">
          Your next batch
          <br /> takes five minutes.
        </h2>
        <p className="mx-auto mt-6 max-w-md text-lg text-white/50">
          Install from the Google Workspace Marketplace, or self-host the open source in your
          own tenant.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          {/* TODO: replace with the real Marketplace listing URL once published */}
          <a
            href="https://workspace.google.com/marketplace"
            target="_blank"
            rel="noreferrer"
            className="group flex items-center gap-2.5 rounded-2xl bg-azure px-8 py-4 font-semibold shadow-[0_10px_36px_rgba(59,130,246,0.35)] transition-transform hover:scale-[1.04] active:scale-95"
          >
            Get it on the Marketplace
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
          </a>
          <a
            href="https://github.com/Batchwork/Batchwork-for-Google-Workspace"
            target="_blank"
            rel="noreferrer"
            className="glass flex items-center gap-2.5 rounded-2xl px-8 py-4 font-medium text-white/80 transition-transform hover:scale-[1.04] active:scale-95"
          >
            <Github size={17} />
            Self-host from source
          </a>
        </div>
      </motion.div>
    </section>
  );
}
