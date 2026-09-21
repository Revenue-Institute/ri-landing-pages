/**
 * An illustrative concept preview, not a real screenshot - see the note
 * in CleverSiteMockup.tsx. Modeled on real timeline/activity-feed UI
 * (a connected vertical rail with status dots) rather than a stack of
 * plain boxes, so the live process map reads as an actual platform.
 */
export default function PieMockup() {
  const nodes: { label: string; state: "done" | "flagged" | "pending"; tag?: string }[] = [
    { label: "New client intake", state: "done" },
    { label: "Contract drafted", state: "done" },
    { label: "Partner review", state: "flagged", tag: "Bottleneck - 3 day avg" },
    { label: "Signed & filed", state: "pending" },
  ];

  return (
    <div className="ri-band-ink" style={{ border: "1px solid var(--ri-dark-edge)", overflow: "hidden" }} aria-hidden="true">
      <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 18px", borderBottom: "1px solid var(--ri-dark-edge)" }}>
        <span style={{ width: 8, height: 8, background: "var(--ri-green)", flexShrink: 0 }} />
        <span style={{ fontFamily: "var(--ri-font-display)", fontSize: 12.5, fontWeight: 800 }}>PIE</span>
        <span style={{ fontSize: 12, color: "var(--ri-dark-muted)" }}>/ Client onboarding</span>
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
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 18 }}>
          <span className="pulse-dot" style={{ width: 7, height: 7, flexShrink: 0, background: "var(--ri-alert-lift)" }} />
          <span style={{ fontFamily: "var(--ri-font-display)", fontSize: 11, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--ri-dark-muted)" }}>
            Listening - mapping live
          </span>
          <div style={{ marginLeft: "auto", display: "flex", alignItems: "flex-end", gap: 3 }}>
            {[6, 12, 8, 16, 10].map((h, i) => (
              <span key={i} style={{ width: 3, height: h, background: "var(--ri-green)", opacity: 0.85 }} />
            ))}
          </div>
        </div>

        <div style={{ position: "relative", paddingLeft: 22, marginBottom: 16 }}>
          <div style={{ position: "absolute", left: 5, top: 6, bottom: 22, width: 1, background: "var(--ri-dark-edge)" }} />
          {nodes.map((n) => (
            <div key={n.label} style={{ position: "relative", marginBottom: 18 }}>
              <span
                style={{
                  position: "absolute",
                  left: -22,
                  top: 3,
                  width: 11,
                  height: 11,
                  background: n.state === "pending" ? "var(--ri-dark-ground)" : n.state === "flagged" ? "var(--ri-alert-lift)" : "var(--ri-green)",
                  border: n.state === "pending" ? "1px solid var(--ri-dark-muted)" : undefined,
                }}
              />
              <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
                <span style={{ fontSize: 13.5, color: n.state === "pending" ? "var(--ri-dark-muted)" : "var(--ri-dark-text)" }}>{n.label}</span>
                {n.tag && (
                  <span
                    style={{
                      fontFamily: "var(--ri-font-display)",
                      fontSize: 10,
                      fontWeight: 700,
                      color: "var(--ri-alert-lift)",
                      border: "1px solid var(--ri-alert-lift)",
                      padding: "1px 6px",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {n.tag}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        <div style={{ display: "flex", gap: 10, padding: "12px 14px", background: "var(--ri-dark-panel)", border: "1px solid var(--ri-dark-edge)", marginBottom: 16 }}>
          <span
            style={{
              fontFamily: "var(--ri-font-display)",
              fontSize: 10,
              fontWeight: 800,
              color: "var(--ri-ink)",
              background: "var(--ri-green)",
              padding: "2px 6px",
              height: "fit-content",
              flexShrink: 0,
            }}
          >
            PIE
          </span>
          <span style={{ fontSize: 13.5, color: "var(--ri-dark-text)" }}>&quot;Who signs off before this goes to the client?&quot;</span>
        </div>

        <div
          style={{
            borderTop: "1px solid var(--ri-dark-edge)",
            paddingTop: 14,
            paddingBottom: 6,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 12,
            flexWrap: "wrap",
            fontSize: 12.5,
            color: "var(--ri-dark-muted)",
          }}
        >
          <span>+ Upload documentation</span>
          <span style={{ color: "var(--ri-green)", fontWeight: 700 }}>Shared with the team instantly</span>
        </div>
      </div>
    </div>
  );
}
