import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

/** Monogram favicon. */
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 16,
          background: "linear-gradient(135deg, #ff6b3d, #e8c170)",
          color: "#120e0b",
          fontSize: 30,
          fontWeight: 800,
          letterSpacing: -1,
        }}
      >
        HG
      </div>
    ),
    size,
  );
}
