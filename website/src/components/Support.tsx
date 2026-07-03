import { motion } from "framer-motion";
import { Check, Coffee } from "lucide-react";

const FREE = [
  "All bulk operations",
  "Unlimited rows & runs",
  "Live progress panel",
  "Complete alias exports",
  "Safe re-runs & auto-resume",
  "Every future feature",
];

export default function Support() {
  return (
    <section id="support" className="relative px-6 py-28">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-azure">
            Pricing, sort of
          </span>
          <h2 className="mt-4 font-heading text-3xl font-700 tracking-tight md:text-5xl">
            Free <span className="font-serif font-400 italic text-sky">forever</span>.
            <br />
            <span className="text-white/50">Supported by people like you.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-lg leading-relaxed text-white/50">
            No paywalls, no credits, no locked features. The tool is free for everyone,
            and optional support keeps it maintained and independent.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-5 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="glow-card rounded-3xl p-8"
          >
            <div className="flex items-baseline justify-between">
              <h3 className="font-heading text-xl font-700">Everything</h3>
              <div>
                <span className="font-heading text-4xl font-800">$0</span>
                <span className="ml-1 text-sm text-white/40">forever</span>
              </div>
            </div>
            <ul className="mt-7 space-y-3">
              {FREE.map((f) => (
                <li key={f} className="flex items-center gap-3 text-[14px] text-white/70">
                  <span className="grid h-5 w-5 place-items-center rounded-full bg-mint/15 text-mint">
                    <Check size={11} strokeWidth={3} />
                  </span>
                  {f}
                </li>
              ))}
            </ul>
            <a
              href="/#get"
              className="mt-8 block rounded-2xl bg-azure py-3.5 text-center font-semibold transition-transform hover:scale-[1.02] active:scale-95"
            >
              Install free
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
            className="glass flex flex-col rounded-3xl p-8"
          >
            <h3 className="font-heading text-xl font-700">Keep it alive</h3>
            <p className="mt-3 text-[14px] leading-relaxed text-white/50">
              Good tools disappear when maintainers burn out. Optional support keeps
              Batchwork actively developed and here for the long run.
            </p>
            <a
              href="/#get"
              className="mt-7 glass group flex items-center gap-4 rounded-2xl p-4 transition-colors hover:border-azure/40"
            >
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-azure/15 text-sky">
                <Coffee size={18} />
              </span>
              <div className="flex-1">
                <div className="text-[14.5px] font-semibold">Become a Supporter</div>
                <div className="text-[12.5px] text-white/40">
                  One-time or monthly, fund development directly
                </div>
              </div>
            </a>
            <p className="mt-auto pt-6 text-center text-[11.5px] text-white/30">
              Supporting is optional. No feature is ever paywalled.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
