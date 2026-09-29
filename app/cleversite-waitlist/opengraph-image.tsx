import { ImageResponse } from "next/og";

export const alt = "CleverSite: make your website self-aware";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const INK = "#0E0D12";
const GREEN = "#12D68E";
const TEXT = "#F4F4F6";
const MUTED = "#9D9BA8";
const EDGE = "#2A2833";

const STEPS = ["Analyze performance", "Propose tests", "You approve", "Measure and repeat"];

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: INK,
          padding: "64px 72px",
          fontFamily: "sans-serif",
          borderTop: `12px solid ${GREEN}`,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", fontSize: 40, fontWeight: 800, color: TEXT, letterSpacing: -1 }}>
            Clever<span style={{ color: GREEN }}>Site</span>
          </div>
          <div
            style={{
              display: "flex",
              border: `2px solid ${GREEN}`,
              color: GREEN,
              fontSize: 22,
              fontWeight: 800,
              letterSpacing: 2,
              textTransform: "uppercase",
              padding: "10px 20px",
            }}
          >
            Early-Access Waitlist
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              fontSize: 92,
              fontWeight: 900,
              color: TEXT,
              lineHeight: 1.02,
              letterSpacing: -3,
            }}
          >
            <span>Make your website&nbsp;</span>
            <span style={{ color: GREEN }}>self-aware.</span>
          </div>
          <div style={{ display: "flex", fontSize: 30, color: MUTED, marginTop: 28, maxWidth: 940, lineHeight: 1.35 }}>
            Plugs into your existing site and creates SEO, engagement, and conversion tests, with your approval.
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          {STEPS.map((step, i) => (
            <div key={step} style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <div
                style={{
                  display: "flex",
                  border: `2px solid ${EDGE}`,
                  color: TEXT,
                  fontSize: 22,
                  fontWeight: 700,
                  padding: "10px 18px",
                }}
              >
                {step}
              </div>
              {i < STEPS.length - 1 && <div style={{ display: "flex", color: GREEN, fontSize: 26, fontWeight: 800 }}>+</div>}
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
