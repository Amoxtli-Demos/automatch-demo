import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "AutoMatch — Hulp bij het kopen van een gebruikte auto",
    short_name: "AutoMatch",
    description: "Persoonlijke hulp bij het zoeken, beoordelen en kopen van een gebruikte auto in Nederland.",
    start_url: "/",
    display: "browser",
    lang: "nl",
    background_color: "#F7F7F7",
    theme_color: "#04000B",
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
    ],
  };
}
