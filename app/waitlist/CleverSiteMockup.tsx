/**
 * An illustrative concept preview, not a real screenshot - the product
 * doesn't exist yet. Built with plain shapes so that's obvious, and kept
 * on the dark surface docs/brand.md reserves for product UI.
 *
 * Modeled on real analytics-dashboard conventions (breadcrumb + avatar,
 * KPI cards, an actual line chart, a table-style change log) rather than
 * a handful of oversized colored blocks, so it reads as a platform.
 */
export default function CleverSiteMockup() {
  const points: [number, number][] = [
    [0, 42],
    [40, 40],
    [80, 37],
    [120, 32],
    [160, 25],
    [200, 17],
    [240, 9],
    [280, 4],
  ];
  const linePath = points.map((p, i) => `${i === 0 ? "M" : "L"}${p[0]},${p[1]}`).join(" ");
  const areaPath = `${linePath} L280,56 L0,56 Z`;
  const changes = [
    { label: "Headline rewritten", lift: "+1.1%" },
    { label: "CTA moved above the fold", lift: "+0.6%" },
    { label: "Checkout form shortened", lift: "+0.4%" },
  ];

  return (
    <div className="ri-band-ink" style={{ border: "1px solid var(--ri-dark-edge)", overflow: "hidden" }} aria-hidden="true">
      <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 18px", borderBottom: "1px solid var(--ri-dark-edge)" }}>
        <span style={{ width: 8, height: 8, background: "var(--ri-green)", flexShrink: 0 }} />
        <span style={{ fontFamily: "var(--ri-font-display)", fontSize: 12.5, fontWeight: 800 }}>CleverSite</span>
        <span style={{ fontSize: 12, color: "var(--ri-dark-muted)" }}>/ yourfirm.com</span>
        <div
          style={{
            marginLeft: "auto",
            width: 22,
            height: 22,
            flexShrink: 0,
            background: "var(--ri-dark-panel)",
            border: "1px solid var(--ri-dark-edge)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "var(--ri-font-display)",
            fontSize: 10,
            fontWeight: 700,
          }}
        >
          JD
        </div>
      </div>

      <div style={{ padding: "16px 18px 4px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
          <span style={{ fontFamily: "var(--ri-font-display)", fontSize: 14, fontWeight: 800 }}>Overview</span>
          <span
            style={{
              fontFamily: "var(--ri-font-display)",
              fontSize: 10.5,
              color: "var(--ri-dark-muted)",
              border: "1px solid var(--ri-dark-edge)",
              padding: "4px 8px",
              display: "flex",
              alignItems: "center",
              gap: 5,
            }}
          >
            Last 8 weeks <span style={{ fontSize: 8 }}>&#9662;</span>
          </span>
        </div>

        <div style={{ display: "flex", gap: 10, marginBottom: 14 }}>
          <div style={{ flex: 1, minWidth: 0, border: "1px solid var(--ri-dark-edge)", padding: "11px 13px" }}>
            <div style={{ fontSize: 10.5, color: "var(--ri-dark-muted)", marginBottom: 6 }}>Conversion rate</div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 7 }}>
              <span style={{ fontFamily: "var(--ri-font-display)", fontSize: 20, fontWeight: 800 }}>4.8%</span>
              <span style={{ fontSize: 11, fontWeight: 700, color: "var(--ri-green)" }}>+128%</span>
            </div>
          </div>
          <div style={{ flex: 1, minWidth: 0, border: "1px solid var(--ri-dark-edge)", padding: "11px 13px" }}>
            <div style={{ fontSize: 10.5, color: "var(--ri-dark-muted)", marginBottom: 6 }}>Issues auto-fixed</div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 7 }}>
              <span style={{ fontFamily: "var(--ri-font-display)", fontSize: 20, fontWeight: 800 }}>19</span>
              <span style={{ fontSize: 11, color: "var(--ri-dark-muted)" }}>this month</span>
            </div>
          </div>
        </div>

        <div style={{ border: "1px solid var(--ri-dark-edge)", padding: "14px 14px 10px", marginBottom: 14 }}>
          <svg viewBox="0 0 280 56" width="100%" height="56" preserveAspectRatio="none">
            <line x1="0" y1="14" x2="280" y2="14" stroke="var(--ri-dark-edge)" strokeWidth="1" />
            <line x1="0" y1="28" x2="280" y2="28" stroke="var(--ri-dark-edge)" strokeWidth="1" />
            <line x1="0" y1="42" x2="280" y2="42" stroke="var(--ri-dark-edge)" strokeWidth="1" />
            <path d={areaPath} fill="var(--ri-green)" opacity="0.12" stroke="none" />
            <path d={linePath} fill="none" stroke="var(--ri-green)" strokeWidth="2" />
            <circle cx="280" cy="4" r="3" fill="var(--ri-green)" />
          </svg>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, color: "var(--ri-dark-muted)", marginTop: 6 }}>
            <span>Week 1</span>
            <span>Week 8</span>
          </div>
        </div>

        <div style={{ borderTop: "1px solid var(--ri-dark-edge)" }}>
          {changes.map((c) => (
            <div
              key={c.label}
              style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 0", borderBottom: "1px solid var(--ri-dark-edge)", fontSize: 13 }}
            >
              <span style={{ color: "var(--ri-green)", fontSize: 13, flexShrink: 0 }}>&#10003;</span>
              <span style={{ color: "var(--ri-dark-text)", flex: 1, minWidth: 0 }}>{c.label}</span>
              <span
                style={{
                  fontFamily: "var(--ri-font-display)",
                  fontSize: 11,
                  fontWeight: 700,
                  color: "var(--ri-green)",
                  border: "1px solid var(--ri-dark-edge)",
                  padding: "2px 6px",
                  flexShrink: 0,
                }}
              >
                {c.lift}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
