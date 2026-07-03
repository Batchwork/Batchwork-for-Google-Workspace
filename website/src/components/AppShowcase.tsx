import { useEffect, useState } from "react";
import { Check, ChevronRight, Mail, User, Users } from "lucide-react";
import { asset } from "../lib/assets";

/**
 * Large, detailed, perspective-tilted recreation of Batchwork in action:
 * the control-panel sidebar running a batch next to a live Google Sheet.
 * The hero centerpiece — owned, hand-coded, no screenshots.
 */

const OPS = [
  { n: 1, label: "Create Users", tint: "#2563eb", bg: "rgba(37,99,235,.12)" },
  { n: 2, label: "Update Users", tint: "#2563eb", bg: "rgba(37,99,235,.12)" },
  { n: 3, label: "Suspend Users", tint: "#2563eb", bg: "rgba(37,99,235,.12)" },
  { n: 5, label: "Export Users", tint: "#2563eb", bg: "rgba(37,99,235,.12)" },
];

const ROWS = [
  { a: "amara.okafor@acme.com", b: "Amara Okafor", c: "Sales", ok: true },
  { a: "liam.chen@acme.com", b: "Liam Chen", c: "Engineering", ok: true },
  { a: "noah.patel@acme.com", b: "Noah Patel", c: "Support", ok: true },
  { a: "sofia.rossi@acme.com", b: "Sofia Rossi", c: "Marketing", ok: true },
  { a: "yuki.tanaka@acme.com", b: "Yuki Tanaka", c: "Finance", ok: true },
  { a: "omar.haddad@acme.com", b: "Omar Haddad", c: "Design", ok: false },
  { a: "elena.novak@acme.com", b: "Elena Novak", c: "People", ok: true },
];

const TOTAL = 500;

export default function AppShowcase() {
  const [done, setDone] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setDone((d) => (d >= TOTAL ? 0 : Math.min(TOTAL, d + Math.ceil(Math.random() * 22) + 8)));
    }, 140);
    return () => clearInterval(id);
  }, []);

  const pct = Math.round((done / TOTAL) * 100);

  return (
    <div
      className="relative w-[860px] max-w-[92vw] select-none"
      style={{ transform: "perspective(2200px) rotateX(7deg)", transformStyle: "preserve-3d" }}
    >
      <div className="flex overflow-hidden rounded-2xl border border-white/10 bg-[#f6f7f9] shadow-[0_50px_120px_-20px_rgba(2,6,20,0.8)]">
        {/* ── Sidebar (the Batchwork control panel) ── */}
        <div className="w-[230px] shrink-0 border-r border-black/[0.06] bg-white">
          <div className="flex items-center gap-2.5 bg-gradient-to-br from-[#0b2a63] via-[#1a4fbb] to-[#3b82f6] px-4 py-3">
            <img src={asset("icon-128.png")} alt="" className="h-7 w-7" />
            <span className="text-[12px] font-medium text-white/95">Users · Groups · Aliases</span>
          </div>

          <div className="p-3">
            <div className="mb-3 flex gap-1.5 rounded-xl border border-black/[0.06] bg-[#f6f7f9] p-1.5">
              {[User, Users, Mail].map((Icon, i) => (
                <span key={i} className="grid h-7 flex-1 place-items-center rounded-lg text-[#5f6368]">
                  <Icon size={14} />
                </span>
              ))}
              <span className="grid h-7 flex-1 place-items-center rounded-lg bg-[#e8eaed] text-[#202124]">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </svg>
              </span>
            </div>

            <div className="mb-1.5 px-1 text-[9px] font-bold uppercase tracking-[1px] text-[#5f6368]">Users</div>
            <div className="overflow-hidden rounded-xl border border-black/[0.06]">
              {OPS.map((op, i) => (
                <div
                  key={op.label}
                  className={`flex items-center gap-2.5 px-3 py-2.5 ${i > 0 ? "border-t border-black/[0.05]" : ""} ${
                    i === 0 ? "bg-[#eef4fe]" : "bg-white"
                  }`}
                >
                  <span
                    className="grid h-5 min-w-5 place-items-center rounded-md text-[10px] font-bold"
                    style={{ color: op.tint, background: op.bg }}
                  >
                    {op.n}
                  </span>
                  <span className="flex-1 text-[11.5px] text-[#202124]">{op.label}</span>
                  <ChevronRight size={12} className="text-[#9aa0a6]" />
                </div>
              ))}
            </div>

            {/* running progress */}
            <div className="mt-3 rounded-xl border border-black/[0.06] bg-white p-3">
              <div className="flex items-center justify-between text-[11px] font-medium text-[#202124]">
                <span>Creating users…</span>
                <span className="font-mono text-[#1a73e8]">{pct}%</span>
              </div>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-[#e8eaed]">
                <div className="h-full rounded-full bg-[#1a73e8]" style={{ width: `${pct}%` }} />
              </div>
              <div className="mt-1.5 font-mono text-[10px] text-[#5f6368]">
                {done} / {TOTAL} · ✔ {done} ✘ 0
              </div>
            </div>
          </div>
        </div>

        {/* ── Google Sheet ── */}
        <div className="min-w-0 flex-1 bg-white">
          {/* sheet toolbar */}
          <div className="flex items-center gap-2 border-b border-black/[0.06] bg-[#f9fbfd] px-4 py-2.5">
            <div className="flex gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
            </div>
            <span className="ml-2 text-[11px] text-[#5f6368]">1. Create Users — Batchwork.gsheet</span>
          </div>

          {/* column headers */}
          <div className="grid grid-cols-[1.6fr_1.1fr_0.9fr_0.5fr] border-b border-black/[0.08] bg-[#f1f3f4] text-[10.5px] font-semibold text-[#5f6368]">
            {["Email", "Full Name", "Department", "Status"].map((h) => (
              <div key={h} className="border-r border-black/[0.06] px-3 py-2 last:border-r-0">{h}</div>
            ))}
          </div>

          {/* data rows */}
          {ROWS.map((r, i) => (
            <div
              key={r.a}
              className={`grid grid-cols-[1.6fr_1.1fr_0.9fr_0.5fr] text-[11px] text-[#202124] ${
                i % 2 ? "bg-[#fbfcfe]" : "bg-white"
              }`}
            >
              <div className="truncate border-b border-r border-black/[0.05] px-3 py-2 font-mono text-[10.5px] text-[#3c4043]">{r.a}</div>
              <div className="truncate border-b border-r border-black/[0.05] px-3 py-2">{r.b}</div>
              <div className="truncate border-b border-r border-black/[0.05] px-3 py-2 text-[#5f6368]">{r.c}</div>
              <div className="flex items-center border-b border-black/[0.05] px-3 py-2">
                {r.ok ? (
                  <span className="inline-flex items-center gap-1 rounded-full bg-[#e6f4ea] px-2 py-0.5 text-[9.5px] font-semibold text-[#137333]">
                    <Check size={9} strokeWidth={3} /> Done
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 rounded-full bg-[#fce8e6] px-2 py-0.5 text-[9.5px] font-semibold text-[#c5221f]">
                    ✘ Retry
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
