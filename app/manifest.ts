import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "HafTech — Software Engineering Studio",
    short_name: "HafTech",
    description: "Independent software engineering studio led by Faruq Ariyo.",
    start_url: "/",
    display: "standalone",
    background_color: "#FAF9F5",
    theme_color: "#20221F",
    icons: [
      {
        src: "/icon",
        sizes: "32x32",
        type: "image/png",
      },
    ],
  };
}

