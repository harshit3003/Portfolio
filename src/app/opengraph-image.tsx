import { ImageResponse } from "next/og";
import { profile } from "@/data/profile";

export const alt = `${profile.name} — ${profile.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Generated social card: dark canvas, gradient glow, name + role. */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#0c0b0a",
          backgroundImage:
            "radial-gradient(circle at 18% 22%, rgba(255,107,61,0.30), transparent 45%), radial-gradient(circle at 85% 80%, rgba(232,193,112,0.20), transparent 45%)",
          color: "#f4efe6",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 26, color: "#a39c91" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 56,
              height: 56,
              borderRadius: 16,
              background: "linear-gradient(135deg, #ff6b3d, #e8c170)",
              color: "#120e0b",
              fontSize: 26,
              fontWeight: 800,
            }}
          >
            HG
          </div>
          {"// portfolio"}
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 96, fontWeight: 800, letterSpacing: -3, lineHeight: 1.02 }}>{profile.name}</div>
          <div style={{ marginTop: 20, fontSize: 38, color: "#e8c170" }}>{profile.role}</div>
          <div style={{ marginTop: 10, fontSize: 28, color: "#a39c91" }}>
            {`B.Tech Computer Science (AIML) · ${profile.location}`}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
