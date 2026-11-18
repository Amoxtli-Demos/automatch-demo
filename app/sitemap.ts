import type { MetadataRoute } from "next";
import { LOCALES, urlFor } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const languages = Object.fromEntries([...LOCALES.map((l) => [l, urlFor(l)]), ["x-default", urlFor("nl")]]);
  return LOCALES.map((l) => ({
    url: urlFor(l),
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: l === "nl" ? 1 : 0.8,
    alternates: { languages },
  }));
}
