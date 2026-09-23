/**
 * An illustrative concept preview, not a real screenshot - see the note
 * in CleverSiteMockup.tsx. Shows the other half of the hero mockup's
 * story: not the finished map, but the mechanism itself - a live
 * transcript feeding a process map that's still being built - then the
 * finished documentation going out to the team.
 */
export default function PieShareMockup() {
  const flow: { label: string; state: "done" | "building" }[] = [
    { label: "Intake", state: "done" },
    { label: "Draft", state: "done" },
    { label: "Review", state: "done" },
    { label: "Filed", state: "building" },
  ];
  const recipients = ["JD", "SK", "MT"];

  return (
    <div className="ri-band-ink" style={{ border: "1px solid var(--ri-dark-edge)", overflow: "hidden" }} aria-hidden="true">
      <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 18px", borderBottom: "1px solid var(--ri-dark-edge)" }}>
        <span style={{ width: 8, height: 8, background: "var(--ri-green)", flexShrink: 0 }} />
        <span style={{ fontFamily: "var(--ri-font-display)", fontSize: 12.5, fontWeight: 800 }}>PIE</span>
        <span style={{ fontSize: 12, color: "var(--ri-dark-muted)" }}>/ Client onboarding</span>
        <div style={{ marginLeft: "auto", display: "flex", alignItems: "flex-end", gap: 3, flexShrink: 0 }}>
          {[5, 11, 7, 14, 9].map((h, i) => (
            <span
              key={i}
              className="pulse-dot"
              style={{ width: 3, height: h, background: "var(--ri-green)", animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </div>
      </div>

      <div style={{ padding: "16px 18px 4px" }}>
        <div style={{ display: "flex", gap: 10, padding: "10px 12px", background: "var(--ri-dark-panel)", border: "1px solid var(--ri-dark-edge)", marginBottom: 14 }}>
          <span
            style={{
              fontFamily: "var(--ri-font-display)",
              fontSize: 9.5,
              fontWeight: 800,
              color: "var(--ri-dark-muted)",
              letterSpacing: "0.05em",
              textTransform: "uppercase",
              flexShrink: 0,
            }}
          >
            Live
          </span>
          <span style={{ fontSize: 13, color: "var(--ri-dark-text)", fontStyle: "italic" }}>
            &quot;...then it goes to partner review before we file it...&quot;
          </span>
        </div>

        <div style={{ fontSize: 10.5, color: "var(--ri-dark-muted)", marginBottom: 10 }}>Mapping as you speak</div>
        <div style={{ border: "1px solid var(--ri-dark-edge)", padding: "12px 13px", marginBottom: 14 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            {flow.map((n, i) => (
              <div key={n.label} style={{ display: "flex", alignItems: "center", gap: 6, flex: 1, minWidth: 0 }}>
                <div
                  style={{
                    flex: 1,
                    padding: "8px 6px",
                    textAlign: "center",
                    border: n.state === "building" ? "1px dashed var(--ri-green)" : "1px solid var(--ri-dark-edge)",
                    background: n.state === "building" ? "transparent" : "var(--ri-dark-panel)",
                  }}
                >
                  <span style={{ fontSize: 11, color: "var(--ri-dark-text)" }}>{n.label}</span>
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
