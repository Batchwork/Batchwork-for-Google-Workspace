import { motion } from "framer-motion";
import { ArrowUpRight, Github } from "lucide-react";

export default function CTA() {
  return (
    <section id="get" className="relative overflow-hidden px-6 py-32 text-center">
      {/* owned animated aurora backdrop */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="aurora" />
      </div>
      {/* top + bottom fades */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-ink to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink to-transparent" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 mx-auto max-w-3xl"
      >
        <img src="/icon-128.png" alt="" className="mx-auto mb-8 h-16 w-16" />
        <h2 className="font-heading text-4xl font-800 leading-[1] tracking-[-0.03em] md:text-6xl">
          Put the busywork
          <br />
          on autopilot.
        </h2>
        <p className="mx-auto mt-6 max-w-md text-lg leading-relaxed text-white/50">
          Install from the Marketplace, or clone the source and run it in your own
          Google Cloud project. Either way, it's yours.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a
            href="https://workspace.google.com/marketplace"
            target="_blank"
            rel="noreferrer"
            className="group flex items-center gap-2 rounded-full bg-azure px-7 py-3.5 font-semibold text-white shadow-[0_10px_36px_rgba(59,130,246,0.4)] transition-transform hover:scale-[1.03] active:scale-95"
          >
            Get it on the Marketplace
            <ArrowUpRight size={17} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
          <a
            href="https://github.com/Batchwork/Batchwork-for-Google-Workspace"
            target="_blank"
            rel="noreferrer"
            className="liquid-glass flex items-center gap-2 rounded-full px-7 py-3.5 font-medium text-white/85 transition-transform hover:scale-[1.03] active:scale-95"
          >
            <Github size={17} />
            Self-host from source
          </a>
        </div>
      </motion.div>
    </section>
  );
}
