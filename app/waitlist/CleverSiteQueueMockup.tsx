/**
 * Villain-side visual for the problem section - the stuck dev queue itself,
 * on the light page surface (not ri-band-ink, which brand.md reserves for
 * the product actually working). Pairs with CleverSiteEditingMockup so the
 * page reads "here's the problem" -> "here's the fix", not text-then-void.
 */
export default function CleverSiteQueueMockup() {
  const tickets = [
    { id: "DEV-482", label: "Rewrite hero copy", age: "14 days overdue" },
    { id: "DEV-479", label: "Fix broken pricing link", age: "9 days overdue" },
    { id: "DEV-471", label: "Shorten checkout form", age: "21 days overdue" },
  ];

  return (
    <div className="ri-card" aria-hidden="true">
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 }}>
        <span style={{ fontFamily: "var(--ri-font-display)", fontSize: 13, fontWeight: 800 }}>Waiting on dev</span>
        <span
          style={{
            fontFamily: "var(--ri-font-display)",
            fontSize: 10.5,
            fontWeight: 700,
            color: "var(--ri-alert)",
            border: "1px solid var(--ri-alert)",
            padding: "3px 8px",
          }}
        >
          14 open
        </span>
      </div>
      <div style={{ display: "grid", gap: 12 }}>
        {tickets.map((t) => (
          <div key={t.id} style={{ display: "flex", alignItems: "center", gap: 12, borderTop: "1px solid var(--ri-hairline)", paddingTop: 12 }}>
            <span style={{ fontFamily: "var(--ri-font-display)", fontSize: 10.5, color: "var(--ri-muted)", flexShrink: 0 }}>{t.id}</span>
            <span style={{ fontSize: 13.5, color: "var(--ri-ink)", flex: 1, minWidth: 0 }}>{t.label}</span>
            <span style={{ fontFamily: "var(--ri-font-display)", fontSize: 10.5, fontWeight: 700, color: "var(--ri-alert)", flexShrink: 0, whiteSpace: "nowrap" }}>
              {t.age}
            </span>
          </div>
        ))}
      </div>
      <p style={{ fontSize: 12, lineHeight: 1.5, color: "var(--ri-muted)", marginTop: 16, marginBottom: 0 }}>
        Every one of these was true the day it was filed - and stale by the time it shipped.
      </p>
    </div>
  );
}
