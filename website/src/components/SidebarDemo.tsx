import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronRight, Mail, User, Users } from "lucide-react";

/**
 * Animated recreation of the real Batchwork control panel sidebar,
 * looping through: pick an operation -> live progress -> success.
 */

const OPS = [
  { n: 1, label: "Create Users", tint: "#60A5FA", bg: "rgba(96,165,250,.14)" },
  { n: 5, label: "Export Users", tint: "#60A5FA", bg: "rgba(96,165,250,.14)" },
  { n: 9, label: "Add Members", tint: "#34D399", bg: "rgba(52,211,153,.14)" },
  { n: 12, label: "Create Aliases", tint: "#A78BFA", bg: "rgba(167,139,250,.14)" },
];

const TOTAL = 250;

export default function SidebarDemo() {
  const [phase, setPhase] = useState<"list" | "running" | "done">("list");
  const [done, setDone] = useState(0);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (phase === "list") {
      timer = setTimeout(() => setPhase("running"), 2200);
    } else if (phase === "running") {
      if (done >= TOTAL) {
        timer = setTimeout(() => setPhase("done"), 350);
      } else {
        timer = setTimeout(() => setDone((d) => Math.min(TOTAL, d + Math.ceil(Math.random() * 14) + 6)), 90);
      }
    } else {
      timer = setTimeout(() => {
        setDone(0);
        setPhase("list");
      }, 3000);
    }
    return () => clearTimeout(timer);
  }, [phase, done]);

  const pct = Math.round((done / TOTAL) * 100);

  return (
    <div className="w-[300px] overflow-hidden rounded-2xl border border-white/10 bg-[#f8f9fa] text-left shadow-[0_30px_80px_rgba(2,6,20,0.6)]">
      {/* header — same gradient as the real sidebar */}
      <div className="flex items-center gap-2.5 bg-gradient-to-br from-[#0b2a63] via-[#1a4fbb] to-[#3b82f6] px-4 py-3.5">
        <img src="/icon-128.png" alt="" className="h-8 w-8 rounded-lg" />
        <span className="text-[12.5px] font-medium text-white/95">Users · Groups · Aliases</span>
      </div>

      <div className="px-3 pb-4 pt-3">
        {/* tab bar */}
        <div className="mb-3 flex gap-1.5 rounded-xl border border-black/[0.07] bg-white p-1.5">
          {[User, Users, Mail].map((Icon, i) => (
            <span key={i} className="grid h-8 flex-1 place-items-center rounded-lg text-[#5f6368]">
              <Icon size={15} />
            </span>
          ))}
          <span className="grid h-8 flex-1 place-items-center rounded-lg bg-[#e8eaed] text-[#202124]">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </span>
        </div>

        <AnimatePresence mode="wait">
          {phase === "list" && (
            <motion.div
              key="list"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35 }}
            >
              <div className="mb-1.5 px-1 text-[9.5px] font-bold uppercase tracking-[1px] text-[#5f6368]">
                Users
              </div>
              <div className="overflow-hidden rounded-xl border border-black/[0.07] bg-white">
                {OPS.map((op, i) => (
                  <motion.div
                    key={op.label}
                    className={`flex items-center gap-2.5 px-3 py-2.5 ${i > 0 ? "border-t border-black/[0.05]" : ""} ${
                      i === 0 ? "bg-[#f6f9fe]" : ""
                    }`}
                    animate={i === 0 ? { backgroundColor: ["#ffffff", "#eef4fe", "#eef4fe"] } : undefined}
                    transition={{ duration: 1.4, delay: 0.6 }}
                  >
                    <span
                      className="grid h-6 min-w-6 place-items-center rounded-md text-[10.5px] font-bold"
                      style={{ color: op.tint, background: op.bg }}
                    >
                      {op.n}
                    </span>
                    <span className="flex-1 text-[12.5px] text-[#202124]">{op.label}</span>
                    <ChevronRight size={13} className="text-[#9aa0a6]" />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {phase === "running" && (
            <motion.div
              key="running"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35 }}
              className="rounded-xl border border-black/[0.07] bg-white p-3.5"
            >
              <div className="flex items-center gap-2.5">
                <span className="grid h-6 min-w-6 place-items-center rounded-md bg-[rgba(96,165,250,.14)] text-[10.5px] font-bold text-[#1a73e8]">
                  1
                </span>
                <span className="text-[13.5px] font-medium text-[#202124]">Create Users</span>
              </div>
              <div className="mt-3.5 h-1.5 overflow-hidden rounded-full bg-[#e8eaed]">
                <div
                  className="h-full rounded-full bg-[#1a73e8] transition-[width] duration-100"
                  style={{ width: `${pct}%` }}
                />
              </div>
              <div className="mt-2 font-mono text-[11px] text-[#5f6368]">
                {done} / {TOTAL} · ✔ {done} ✘ 0
              </div>
            </motion.div>
          )}

          {phase === "done" && (
            <motion.div
              key="done"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35 }}
              className="rounded-xl border border-black/[0.07] bg-white p-3.5"
            >
              <div className="flex items-center gap-2.5">
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 15, delay: 0.15 }}
                  className="grid h-6 w-6 place-items-center rounded-full bg-[#e6f4ea] text-[#188038]"
                >
                  <Check size={13} strokeWidth={3} />
                </motion.span>
                <span className="text-[13.5px] font-medium text-[#202124]">250 succeeded, 0 failed</span>
              </div>
              <div className="mt-2.5 rounded-lg bg-[#e6f4ea] px-3 py-2 text-[11.5px] leading-relaxed text-[#135c2a]">
                All rows written back to the Status column.
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
