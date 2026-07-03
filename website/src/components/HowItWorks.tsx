import { motion } from "framer-motion";
import { Download, PencilLine, PlayCircle, Rows3 } from "lucide-react";

const STEPS = [
  {
    icon: Download,
    step: "01",
    title: "Install & open",
    desc: "Add Batchwork from the Marketplace, then open the control panel from the Extensions menu in any Google Sheet.",
  },
  {
    icon: Rows3,
    step: "02",
    title: "Set up sheets",
    desc: "One click creates all the pre-formatted worksheets, one per operation, headers ready.",
  },
  {
    icon: PencilLine,
    step: "03",
    title: "Fill in rows",
    desc: "One row per user, group, or alias. Paste from HR exports, CSVs, wherever your data lives.",
  },
  {
    icon: PlayCircle,
    step: "04",
    title: "Run & watch",
    desc: "Live progress in the panel, ✔ / ✘ status written to every row. Fix, re-run, done.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how" className="relative px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-azure">
            How it works
          </span>
          <h2 className="mt-4 font-heading text-3xl font-700 tracking-tight md:text-5xl">
            From zero to bulk
            <br /> in four steps.
          </h2>
        </motion.div>

        <div className="relative mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {/* connecting line */}
          <div className="pointer-events-none absolute left-[12%] right-[12%] top-[52px] hidden h-px bg-gradient-to-r from-transparent via-azure/30 to-transparent lg:block" />

          {STEPS.map((s, i) => (
            <motion.div
              key={s.step}
              initial={{ opacity: 0, y: 34 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.7, ease: "easeOut", delay: i * 0.12 }}
              className="glass relative rounded-3xl p-7"
            >
              <div className="mb-5 flex items-center justify-between">
                <span className="grid h-11 w-11 place-items-center rounded-2xl bg-azure/15 text-sky">
                  <s.icon size={20} />
                </span>
                <span className="font-mono text-[12px] text-white/25">{s.step}</span>
              </div>
              <h3 className="font-heading text-[16.5px] font-600 tracking-tight">{s.title}</h3>
              <p className="mt-2.5 text-[13.5px] leading-[1.65] text-white/45">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
