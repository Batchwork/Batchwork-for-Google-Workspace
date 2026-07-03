import { motion } from "framer-motion";
import { AlertTriangle, ShieldCheck } from "lucide-react";

export default function Story() {
  return (
    <section id="story" className="relative px-6 py-28">
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center"
        >
          <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-azure">
            Why Batchwork exists
          </span>
          <h2 className="mt-4 font-heading text-3xl font-700 tracking-tight md:text-5xl">
            Your favorite bulk tool died.
            <br />
            <span className="text-white/50">We made sure the next one can't.</span>
          </h2>
        </motion.div>

        <div className="mt-14 grid gap-5 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="rounded-3xl border border-red-400/15 bg-red-500/[0.04] p-8"
          >
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-red-500/15 text-red-400">
                <AlertTriangle size={19} />
              </span>
              <h3 className="font-heading text-lg font-600">The old way</h3>
            </div>
            <p className="mt-4 leading-relaxed text-white/50">
              Shared-cloud bulk tools route every admin's API calls through one project.
              As installs grow, the shared quota runs dry, and eventually every
              operation returns{" "}
              <code className="rounded bg-red-500/10 px-1.5 py-0.5 font-mono text-[12.5px] text-red-300">
                Resource has been exhausted
              </code>
              . Then you're stuck.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
            className="glow-card rounded-3xl p-8"
          >
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-mint/15 text-mint">
                <ShieldCheck size={19} />
              </span>
              <h3 className="font-heading text-lg font-600">The Batchwork way</h3>
            </div>
            <p className="mt-4 leading-relaxed text-white/50">
              Batchwork runs as an Apps Script in <em className="text-white/75">your</em>{" "}
              environment, calling Google's Admin SDK directly with per-user quotas and
              automatic exponential backoff. A busy minute means a slightly slower run, never
              a dead tool. And because the source is open, you can always self-host.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
