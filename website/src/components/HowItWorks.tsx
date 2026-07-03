import { motion } from "framer-motion";
import { Download, PencilLine, PlayCircle, Rows3 } from "lucide-react";

const STEPS = [
  {
    icon: Download,
    title: "Open the panel",
    desc: "Install once, then open Batchwork from the Extensions menu of any Google Sheet.",
  },
  {
    icon: Rows3,
    title: "Lay out the sheets",
    desc: "One click builds a pre-formatted worksheet for every operation, headers and all.",
  },
  {
    icon: PencilLine,
    title: "Drop in your rows",
    desc: "One row per user, group, or alias. Type them in or paste from a CSV. Leave a password blank and Batchwork generates one.",
  },
  {
    icon: PlayCircle,
    title: "Hit run",
    desc: "Progress streams into the panel while a ✔ or ✘ lands on every row. Fix the misses, run again, done.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how" className="relative px-6 py-28">
      <div className="mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-2xl"
        >
          <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-azure">
            The workflow
          </span>
          <h2 className="mt-4 font-heading text-3xl font-700 tracking-tight md:text-5xl">
            Four moves, start to finish.
          </h2>
        </motion.div>

        {/* vertical timeline */}
        <div className="relative mt-14 pl-8">
          {/* spine */}
          <div className="absolute bottom-4 left-[11px] top-4 w-px bg-gradient-to-b from-azure/40 via-white/10 to-transparent" />

          <div className="space-y-8">
            {STEPS.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, x: 18 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, ease: "easeOut", delay: i * 0.08 }}
                className="relative"
              >
                {/* node */}
                <span className="absolute -left-8 top-1 grid h-6 w-6 place-items-center rounded-full border border-azure/30 bg-ink text-[11px] font-bold text-sky">
                  {i + 1}
                </span>
                <div className="flex items-start gap-4">
                  <span className="mt-0.5 hidden h-10 w-10 shrink-0 place-items-center rounded-xl bg-white/[0.05] text-sky sm:grid">
                    <s.icon size={18} />
                  </span>
                  <div>
                    <h3 className="font-heading text-lg font-600 tracking-tight">{s.title}</h3>
                    <p className="mt-1.5 max-w-xl text-[14.5px] leading-relaxed text-white/50">{s.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
