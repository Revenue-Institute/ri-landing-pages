/**
 * An illustrative concept preview, not a real screenshot - see the note
 * in CleverSiteMockup.tsx. Shows the other half of the hero mockup's
 * story: not the dashboard looking at results, but the actual live page
 * being rewritten in place - a browser frame nested inside the app chrome,
 * with one element mid-edit and a timestamped log proving it never stops.
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
        <span style={{ fontSize: 12, color: "var(--ri-dark-muted)" }}>/ Live edit</span>
        <span
          style={{
            marginLeft: "auto",
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
            flexShrink: 0,
          }}
        >
          <span className="pulse-dot" style={{ width: 6, height: 6, background: "var(--ri-green)", flexShrink: 0 }} />
          Live
        </span>
      </div>

      <div style={{ padding: 18 }}>
        {/* Nested browser frame - the customer's actual site, mid-rewrite */}
        <div style={{ border: "1px solid var(--ri-dark-edge)", background: "var(--ri-white)" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "8px 10px",
              borderBottom: "1px solid var(--ri-hairline)",
              background: "var(--ri-mist)",
            }}
          >
            <span style={{ display: "flex", gap: 4, flexShrink: 0 }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#d9d7de" }} />
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#d9d7de" }} />
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#d9d7de" }} />
            </span>
            <span
              style={{
                flex: 1,
                minWidth: 0,
                fontSize: 10.5,
                color: "var(--ri-muted)",
                background: "var(--ri-white)",
                border: "1px solid var(--ri-hairline)",
                padding: "3px 8px",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              yourfirm.com/pricing
            </span>
          </div>

          <div style={{ padding: "16px 16px 18px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
              <span style={{ width: 46, height: 8, background: "var(--ri-hairline)" }} />
              <span style={{ display: "flex", gap: 8 }}>
                <span style={{ width: 20, height: 6, background: "var(--ri-hairline)" }} />
                <span style={{ width: 20, height: 6, background: "var(--ri-hairline)" }} />
                <span style={{ width: 20, height: 6, background: "var(--ri-hairline)" }} />
              </span>
            </div>

            <div style={{ position: "relative", border: "1.5px dashed var(--ri-green)", padding: "11px 12px", marginBottom: 12 }}>
              <span
                style={{
                  position: "absolute",
                  top: -10,
                  right: 8,
                  fontFamily: "var(--ri-font-display)",
                  fontSize: 9.5,
                  fontWeight: 800,
                  letterSpacing: "0.04em",
                  textTransform: "uppercase",
                  background: "var(--ri-green)",
                  color: "var(--ri-ink)",
                  padding: "2px 6px",
                }}
              >
                Rewriting
              </span>
              <div style={{ height: 11, width: "78%", background: "var(--ri-ink)", marginBottom: 8 }} />
              <div style={{ height: 7, width: "55%", background: "var(--ri-hairline)" }} />
            </div>

            <div style={{ display: "flex", gap: 8 }}>
              <span style={{ width: 64, height: 22, background: "var(--ri-green)" }} />
              <span style={{ width: 50, height: 22, border: "1px solid var(--ri-hairline)" }} />
            </div>
          </div>
        </div>

        <div style={{ marginTop: 14, border: "1px solid var(--ri-dark-edge)" }}>
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
          {log.map((l, i) => (
            <div
              key={l.text}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "9px 13px",
                borderBottom: i < log.length - 1 ? "1px solid var(--ri-dark-edge)" : "none",
                fontSize: 13,
              }}
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
