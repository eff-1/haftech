import { ImageResponse } from "next/og";

export const size = {
  width: 32,
  height: 32,
};
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 20,
          background: "#20221F",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#FAF9F5",
          fontFamily: "serif",
          fontWeight: 700,
        }}
      >
        H
      </div>
    ),
    {
      ...size,
    }
  );
}
