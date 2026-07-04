import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "DairyHisab",
    short_name: "DairyHisab",
    description: "Simple dairy record management for farmers",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#15803d", // your green theme
    icons: [
      {
        src: "/logo.png",
        sizes: "483x517",
        type: "image/png",
      },
    ],
  };
}