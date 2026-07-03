import { motion } from "framer-motion";
import {
  Activity,
  FileSpreadsheet,
  RefreshCcw,
  ShieldCheck,
  Sparkles,
  Timer,
} from "lucide-react";

const FEATURES = [
  {
    icon: FileSpreadsheet,
    title: "Sheets is the UI",
    desc: "No new dashboard to learn. Every operation reads rows from a worksheet you can review, share, and audit before you press Run.",
    gradient: "linear-gradient(137deg, rgba(96,165,250,.55), rgba(96,165,250,.08) 45%, rgba(59,130,246,.4))",
  },
  {
    icon: Activity,
    title: "Live progress, in-panel",
    desc: "A real progress bar with per-row ✔ / ✘ counts streams into the control panel while the batch runs. No more staring at a frozen toast.",
    gradient: "linear-gradient(137deg, rgba(52,211,153,.5), rgba(52,211,153,.06) 45%, rgba(96,165,250,.35))",
  },
  {
    icon: RefreshCcw,
    title: "Safe to run twice",
    desc: "Finished rows are marked and skipped on re-run. Fix the failures, hit Run again, and Batchwork picks up exactly where it left off.",
    gradient: "linear-gradient(137deg, rgba(167,139,250,.5), rgba(167,139,250,.06) 45%, rgba(96,165,250,.35))",
  },
  {
    icon: Timer,
    title: "Outlives time limits",
    desc: "Long batches pause safely before Google's execution ceiling and resume automatically on the next run. Thousands of rows, zero babysitting.",
    gradient: "linear-gradient(137deg, rgba(251,191,36,.45), rgba(251,191,36,.06) 45%, rgba(96,165,250,.3))",
  },
  {
    icon: ShieldCheck,
    title: "Quota-proof by design",
    desc: "Exponential backoff with jitter absorbs rate limits, and per-user API quotas mean one admin's mega-batch can't starve another's.",
    gradient: "linear-gradient(137deg, rgba(96,165,250,.5), rgba(52,211,153,.08) 45%, rgba(52,211,153,.4))",
  },
  {
    icon: Sparkles,
    title: "Complete exports",
    desc: "Exports include what other tools miss: non-editable domain aliases, org units, 2SV status, last login. Cleanly labeled and filtered.",
    gradient: "linear-gradient(137deg, rgba(167,139,250,.5), rgba(96,165,250,.08) 45%, rgba(251,191,36,.35))",
  },
];

export default function Features() {
  return (
    <section id="features" className="relative px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-azure">
            Features
          </span>
          <h2 className="mt-4 font-heading text-3xl font-700 tracking-tight md:text-5xl">
            Built like the tool
            <br /> you wished you had.
          </h2>
        </motion.div>

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.7, ease: "easeOut", delay: (i % 3) * 0.12 }}
              className="group relative"
            >
              {/* glow behind card */}
              <div
                className="pointer-events-none absolute inset-4 rounded-[28px] opacity-0 blur-[40px] transition-opacity duration-500 group-hover:opacity-50"
                style={{ background: f.gradient }}
              />
              <div
                className="relative flex h-full flex-col rounded-[28px] p-7"
                style={{
                  background: `linear-gradient(#0E1832, #0E1832) padding-box, ${f.gradient} border-box`,
                  border: "1px solid transparent",
                }}
              >
                <span className="mb-5 grid h-11 w-11 place-items-center rounded-2xl bg-white/[0.06] text-white/90">
                  <f.icon size={20} strokeWidth={2.2} />
                </span>
                <h3 className="font-heading text-[17px] font-600 tracking-tight">{f.title}</h3>
                <p className="mt-2.5 text-[13.5px] leading-[1.65] text-white/45">{f.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
