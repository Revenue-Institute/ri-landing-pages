/**
 * An illustrative concept preview, not a real screenshot - see the note
 * in CleverSiteMockup.tsx. Same dashboard chrome as the hero mockup (this
 * is its "Documentation" page) so the two read as one platform, showing
 * the other half of the story: the finished map turned into
 * documentation and sent to the team, faster than writing it up by hand.
 */
export default function PieShareMockup() {
  const recipients = ["JD", "SK", "MT"];
  const flow = ["Intake", "Draft", "Review", "Filed"];
  return (
    <div className="ri-band-ink" style={{ border: "1px solid var(--ri-dark-edge)", overflow: "hidden" }} aria-hidden="true">
      <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 18px", borderBottom: "1px solid var(--ri-dark-edge)" }}>
        <span style={{ width: 8, height: 8, background: "var(--ri-green)", flexShrink: 0 }} />
        <span style={{ fontFamily: "var(--ri-font-display)", fontSize: 12.5, fontWeight: 800 }}>PIE</span>
        <span style={{ fontSize: 12, color: "var(--ri-dark-muted)" }}>/ Documentation</span>
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
          <span style={{ fontFamily: "var(--ri-font-display)", fontSize: 14, fontWeight: 800 }}>Client onboarding</span>
          <span
            style={{
              fontFamily: "var(--ri-font-display)",
              fontSize: 10.5,
              color: "var(--ri-dark-muted)",
              border: "1px solid var(--ri-dark-edge)",
              padding: "4px 8px",
            }}
          >
            Generated 2 min ago
          </span>
        </div>

        <div style={{ border: "1px solid var(--ri-dark-edge)", padding: "12px 13px", marginBottom: 14 }}>
          <div style={{ fontSize: 10.5, color: "var(--ri-dark-muted)", marginBottom: 10 }}>Process map</div>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            {flow.map((label, i) => (
              <div key={label} style={{ display: "flex", alignItems: "center", gap: 6, flex: 1, minWidth: 0 }}>
                <div style={{ flex: 1, border: "1px solid var(--ri-dark-edge)", padding: "8px 6px", textAlign: "center" }}>
                  <span style={{ fontSize: 11, color: "var(--ri-dark-text)" }}>{label}</span>
                </div>
                {i < flow.length - 1 && <span style={{ color: "var(--ri-dark-muted)", fontSize: 12, flexShrink: 0 }}>&#8594;</span>}
              </div>
            ))}
          </div>
        </div>

        <div style={{ border: "1px solid var(--ri-dark-edge)", padding: "12px 13px" }}>
          <div style={{ fontSize: 10.5, color: "var(--ri-dark-muted)", marginBottom: 10 }}>Shared with</div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
            <div style={{ display: "flex", alignItems: "center" }}>
              {recipients.map((initials, i) => (
                <span
                  key={initials}
                  style={{
                    width: 24,
                    height: 24,
                    flexShrink: 0,
                    marginLeft: i === 0 ? 0 : -7,
                    background: "var(--ri-dark-ground)",
                    border: "1px solid var(--ri-dark-edge)",
                    color: "var(--ri-dark-text)",
                    fontFamily: "var(--ri-font-display)",
                    fontSize: 9.5,
                    fontWeight: 700,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {initials}
                </span>
              ))}
              <span style={{ fontSize: 12, color: "var(--ri-dark-muted)", marginLeft: 10 }}>+8 more on the team</span>
            </div>
            <span style={{ fontFamily: "var(--ri-font-display)", fontSize: 11.5, fontWeight: 800, color: "var(--ri-green)" }}>Sent instantly</span>
          </div>
        </div>
      </div>
    </div>
  );
}
