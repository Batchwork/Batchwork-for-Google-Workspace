import { motion } from "framer-motion";
import { Mail, User, Users } from "lucide-react";

const GROUPS = [
  {
    name: "Users",
    icon: User,
    tint: "text-sky",
    chip: "bg-sky/10 text-sky",
    border: "hover:border-sky/40",
    ops: [
      { n: 1, label: "Create Users", desc: "One account per row, auto-generated temp passwords" },
      { n: 2, label: "Update Users", desc: "Change only the fields you fill in" },
      { n: 3, label: "Suspend / Restore", desc: "Toggle access without deleting" },
      { n: 4, label: "Delete Users", desc: "With 20-day Admin console recovery" },
      { n: 5, label: "Export Users", desc: "Org unit, 2SV, last login & more" },
    ],
  },
  {
    name: "Groups & Members",
    icon: Users,
    tint: "text-mint",
    chip: "bg-mint/10 text-mint",
    border: "hover:border-mint/40",
    ops: [
      { n: 6, label: "Create Groups", desc: "Bulk-create with name and description" },
      { n: 7, label: "Delete Groups", desc: "Two-click confirmation, no accidents" },
      { n: 8, label: "Export Groups", desc: "Including domain-alias addresses" },
      { n: 9, label: "Add Members", desc: "As member, manager, or owner" },
      { n: 10, label: "Export Members", desc: "Every member of every group" },
      { n: 11, label: "Remove Members", desc: "Accounts stay untouched" },
    ],
  },
  {
    name: "Aliases",
    icon: Mail,
    tint: "text-violet",
    chip: "bg-violet/10 text-violet",
    border: "hover:border-violet/40",
    ops: [
      { n: 12, label: "Create Aliases", desc: "Add email nicknames in bulk" },
      { n: 13, label: "Delete Aliases", desc: "Clean up old addresses" },
      { n: 14, label: "Export Aliases", desc: "Editable and domain aliases, labeled by type" },
    ],
  },
];

export default function Operations() {
  return (
    <section id="operations" className="relative px-6 py-28">
      {/* subtle center glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-azure/[0.07] blur-[160px]" />

      <div className="relative mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-azure">
            14 operations
          </span>
          <h2 className="mt-4 font-heading text-3xl font-700 tracking-tight md:text-5xl">
            Every bulk job an admin
            <br /> actually does.
          </h2>
        </motion.div>

        <div className="mt-16 grid gap-5 lg:grid-cols-3">
          {GROUPS.map((g, gi) => (
            <motion.div
              key={g.name}
              initial={{ opacity: 0, y: 34 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.7, ease: "easeOut", delay: gi * 0.15 }}
              className={`glass rounded-3xl p-6 transition-colors duration-300 ${g.border}`}
            >
              <div className="mb-5 flex items-center gap-3">
                <span className={`grid h-10 w-10 place-items-center rounded-xl bg-white/[0.06] ${g.tint}`}>
                  <g.icon size={19} />
                </span>
                <h3 className="font-heading text-lg font-600">{g.name}</h3>
              </div>
              <ul className="space-y-1">
                {g.ops.map((op) => (
                  <li
                    key={op.n}
                    className="group flex items-start gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-white/[0.04]"
                  >
                    <span
                      className={`mt-0.5 grid h-6 min-w-6 place-items-center rounded-md text-[11px] font-bold ${g.chip}`}
                    >
                      {op.n}
                    </span>
                    <div>
                      <div className="text-[14px] font-medium text-white/85">{op.label}</div>
                      <div className="text-[12px] leading-relaxed text-white/35">{op.desc}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
