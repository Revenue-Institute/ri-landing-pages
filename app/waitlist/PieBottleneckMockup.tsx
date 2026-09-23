/**
 * Villain-side visual for the problem section - one person carrying the
 * whole process, on the light page surface (not ri-band-ink, which
 * brand.md reserves for the product actually working). Pairs with
 * PieShareMockup so the page reads "here's the risk" -> "here's the fix".
 */
export default function PieBottleneckMockup() {
  const steps = ["New client intake", "Contract drafted", "Partner review", "Signed & filed"];

  return (
    <div className="ri-card" aria-hidden="true">
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 }}>
        <span style={{ fontFamily: "var(--ri-font-display)", fontSize: 13, fontWeight: 800 }}>Client onboarding</span>
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
          1 person knows this
        </span>
      </div>
      <div style={{ display: "grid", gap: 12 }}>
        {steps.map((step) => (
          <div key={step} style={{ display: "flex", alignItems: "center", gap: 12, borderTop: "1px solid var(--ri-hairline)", paddingTop: 12 }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--ri-alert)", flexShrink: 0 }} />
            <span style={{ fontSize: 13.5, color: "var(--ri-ink)", flex: 1, minWidth: 0 }}>{step}</span>
          </div>
        ))}
      </div>
      <p style={{ fontSize: 12, lineHeight: 1.5, color: "var(--ri-muted)", marginTop: 16, marginBottom: 0 }}>
        Out sick, on vacation, or gone - and the process stops with them.
      </p>
    </div>
  );
}
