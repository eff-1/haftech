import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const alt = "HafTech — Software Engineering Studio";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#F1EFE8",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          fontFamily: "Georgia, serif",
          border: "16px solid #FAF9F5",
          boxSizing: "border-box",
        }}
      >
        {/* Top Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: "1px solid #D9D7CF",
            paddingBottom: "24px",
          }}
        >
          <span
            style={{
              fontSize: "20px",
              fontFamily: "monospace",
              letterSpacing: "0.08em",
              color: "#686963",
              textTransform: "uppercase",
            }}
          >
            Studio · Founder-Led · Software Engineering
          </span>
          <span
            style={{
              fontSize: "20px",
              fontFamily: "monospace",
              color: "#344C68",
              textTransform: "uppercase",
            }}
          >
            01 / 2026
          </span>
        </div>

        {/* Headline */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: "64px",
              fontWeight: 600,
              color: "#20221F",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
            }}
          >
            <span>Ideas deserve more than execution.</span>
            <span>They deserve engineering.</span>
          </div>
          <div
            style={{
              display: "flex",
              fontSize: "24px",
              color: "#686963",
              fontFamily: "sans-serif",
              maxWidth: "850px",
              lineHeight: 1.4,
            }}
          >
            HafTech designs and engineers digital products, intelligent systems and software
            experiences for ambitious businesses.
          </div>
        </div>

        {/* Bottom Footer */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            borderTop: "1px solid #D9D7CF",
            paddingTop: "24px",
          }}
        >
          <span
            style={{
              fontSize: "36px",
              fontWeight: 700,
              color: "#20221F",
              letterSpacing: "-0.02em",
            }}
          >
            HafTech
          </span>
          <span
            style={{
              fontSize: "18px",
              fontFamily: "monospace",
              color: "#686963",
              textTransform: "uppercase",
            }}
          >
            Founded by Faruq Ariyo
          </span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
