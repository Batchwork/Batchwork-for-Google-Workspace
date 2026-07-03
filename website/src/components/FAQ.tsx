import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";

const FAQS = [
  {
    q: "What permissions does Batchwork need?",
    a: "The Admin SDK scopes for users, groups, and members, plus the current spreadsheet only. It can't touch your other Drive files, email, or calendar. You'll need to be a Workspace admin.",
  },
  {
    q: "Where does my data go?",
    a: "Nowhere. Batchwork runs between your spreadsheet and Google's own Admin API. No third-party servers, no analytics, no tracking. Your directory data never leaves your tenant.",
  },
  {
    q: "Will it hit API rate limits?",
    a: "Unlikely. Every call retries with exponential backoff, and Admin SDK quotas are per-user, so one admin can't starve another. Heavy users can self-host with their own quota.",
  },
  {
    q: "What happens if a batch fails halfway?",
    a: "Every row gets a ✔ or ✘ as it runs. ✔ rows are skipped on re-run, so you fix the failures and hit Run again. Long batches also pause before Google's time limit and resume next run.",
  },
  {
    q: "Is it really free? What's the catch?",
    a: "Really free, no catch. All operations, unlimited rows, forever. Optional contributions and honor-system commercial licenses fund maintenance. Nothing is paywalled.",
  },
  {
    q: "Can MSPs use it across client tenants?",
    a: "Yes. Install per-tenant from the Marketplace, or copy the master spreadsheet into each client for full quota isolation. Each copy runs under that tenant's own admin.",
  },
];

function Item({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="glass overflow-hidden rounded-2xl">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
      >
        <span className="font-heading text-[15.5px] font-600 tracking-tight">{q}</span>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.25 }}
          className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-white/[0.06] text-white/60"
        >
          <Plus size={15} />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          >
            <p className="px-6 pb-6 text-[14px] leading-[1.7] text-white/50">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  return (
    <section id="faq" className="relative px-6 py-28">
      <div className="mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center"
        >
          <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-azure">
            FAQ
          </span>
          <h2 className="mt-4 font-heading text-3xl font-700 tracking-tight md:text-5xl">
            Questions admins ask.
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
          className="mt-12 space-y-3"
        >
          {FAQS.map((f) => (
            <Item key={f.q} {...f} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
