import { motion } from "framer-motion";
import { Heart, Zap } from "lucide-react";

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
            Built on what came before.
            <br />
            <span className="text-white/50">Designed to last.</span>
          </h2>
        </motion.div>

        <div className="mt-14 grid gap-5 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="glass rounded-3xl p-8"
          >
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-azure/15 text-azure">
                <Heart size={19} />
              </span>
              <h3 className="font-heading text-lg font-600">Standing on shoulders</h3>
            </div>
            <p className="mt-4 leading-relaxed text-white/50">
              Tools like Ok Goldy showed admins what was possible and saved countless
              hours. Batchwork wouldn't exist without them.
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
                <Zap size={19} />
              </span>
              <h3 className="font-heading text-lg font-600">A different architecture</h3>
            </div>
            <p className="mt-4 leading-relaxed text-white/50">
              Batchwork runs in <em className="text-white/75">your</em> Google environment
              on your own API quota. No shared server means no single point of failure,
              and being open source means it can't disappear.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
