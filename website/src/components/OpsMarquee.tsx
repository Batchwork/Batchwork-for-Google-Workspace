const OPS = [
  "Create Users",
  "Update Users",
  "Suspend Users",
  "Delete Users",
  "Export Users",
  "Create Groups",
  "Delete Groups",
  "Export Groups",
  "Add Members",
  "Export Members",
  "Remove Members",
  "Create Aliases",
  "Delete Aliases",
  "Export Aliases",
];

export default function OpsMarquee() {
  return (
    <div className="relative overflow-hidden border-y border-line py-4">
      <div className="flex w-max animate-marquee whitespace-nowrap">
        {[...Array(2)].map((_, copy) => (
          <span
            key={copy}
            aria-hidden={copy === 1}
            className="text-[12px] uppercase tracking-[0.3em] text-white/30"
          >
            {OPS.map((op) => (
              <span key={op} className="mx-6">
                {op} <span className="mx-6 text-azure/50">✦</span>
              </span>
            ))}
          </span>
        ))}
      </div>
    </div>
  );
}
