/**
 * An illustrative concept preview, not a real screenshot - see the note
 * in CleverSiteMockup.tsx. Same dashboard chrome as the hero mockup (this
 * is its "Activity" page) so the two read as one platform, showing the
 * other half of the story: the live, ongoing edits landing on the actual
 * page, with a timestamped log proving it never stops.
 */
export default function CleverSiteEditingMockup() {
  const log = [
    { time: "10:42 AM", text: "Headline rewritten" },
    { time: "10:44 AM", text: "Broken pricing link fixed" },
    { time: "10:47 AM", text: "Hero image compressed" },
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
          <span style={{ fontFamily: "var(--ri-font-display)", fontSize: 14, fontWeight: 800 }}>Activity</span>
          <span
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              fontFamily: "var(--ri-font-display)",
              fontSize: 10.5,
              fontWeight: 700,
              letterSpacing: "0.04em",
              textTransform: "uppercase",
              color: "var(--ri-green)",
              border: "1px solid var(--ri-dark-edge)",
              padding: "4px 8px",
            }}
          >
            <span className="pulse-dot" style={{ width: 6, height: 6, background: "var(--ri-green)", flexShrink: 0 }} />
            Live
          </span>
        </div>

        <div style={{ border: "1px solid var(--ri-dark-edge)", padding: "12px 13px", marginBottom: 14 }}>
          <div style={{ fontSize: 10.5, color: "var(--ri-dark-muted)", marginBottom: 10 }}>Currently editing / yourfirm.com/pricing</div>
          <div style={{ border: "1px dashed var(--ri-green)", padding: "10px 12px", position: "relative" }}>
            <div style={{ height: 8, width: "70%", background: "var(--ri-dark-text)", marginBottom: 6 }} />
            <div style={{ height: 8, width: "45%", background: "var(--ri-dark-text)" }} />
            <span
              style={{
                position: "absolute",
                top: -11,
                right: 8,
                fontFamily: "var(--ri-font-display)",
                fontSize: 10,
                fontWeight: 800,
                letterSpacing: "0.04em",
                textTransform: "uppercase",
                background: "var(--ri-green)",
                color: "var(--ri-ink)",
                padding: "2px 7px",
              }}
            >
              Rewriting
            </span>
          </div>
        </div>

        <div style={{ border: "1px solid var(--ri-dark-edge)" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "8px 13px",
              borderBottom: "1px solid var(--ri-dark-edge)",
              fontFamily: "var(--ri-font-display)",
              fontSize: 10,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              color: "var(--ri-dark-muted)",
            }}
          >
            <span>Recent activity</span>
          </div>
          {log.map((l) => (
            <div
              key={l.text}
              style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 13px", borderBottom: "1px solid var(--ri-dark-edge)", fontSize: 13 }}
            >
              <span style={{ color: "var(--ri-green)", fontSize: 12, flexShrink: 0 }}>&#10003;</span>
              <span style={{ fontFamily: "var(--ri-font-display)", fontSize: 10.5, color: "var(--ri-dark-muted)", whiteSpace: "nowrap" }}>{l.time}</span>
              <span style={{ color: "var(--ri-dark-text)" }}>{l.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
