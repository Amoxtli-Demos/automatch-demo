import type { Metadata } from "next";
import { PKG, T, type Lang } from "./i18n";

/** Production domain. Override per environment with NEXT_PUBLIC_SITE_URL. */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://automatchnl.com").replace(/\/$/, "");

/**
 * Indexing is opt-in so previews and demo deployments never compete with the live site.
 * Set SITE_INDEXABLE=true on the production deployment.
 */
export const INDEXABLE = process.env.SITE_INDEXABLE === "true";

export const LOCALES: Lang[] = ["nl", "en", "es"];
export const DEFAULT_LOCALE: Lang = "nl";

/** Dutch lives at "/", the other languages at "/en" and "/es". */
export const pathFor = (l: Lang) => (l === DEFAULT_LOCALE ? "/" : `/${l}`);
export const urlFor = (l: Lang) => SITE_URL + (l === DEFAULT_LOCALE ? "/" : `/${l}`);

const OG_LOCALE: Record<Lang, string> = { nl: "nl_NL", en: "en_GB", es: "es_ES" };

/**
 * Search intent per language (primary keyword first). Titles 50–60 chars, descriptions 120–160.
 * NL: hulp bij het kopen van een gebruikte auto · autozoekservice · aankoopadvies · occasion kopen · auto kopen expat
 * EN: help buying a used car in the Netherlands · car buying service for expats · used car purchase advice
 * ES: ayuda para comprar un auto usado en Países Bajos · comprar coche como expat · asesoría de compra
 */
export const SEO: Record<Lang, { title: string; description: string; ogTitle: string; ogAlt: string; keywords: string[] }> = {
  nl: {
    title: "AutoMatch | Hulp bij het kopen van een gebruikte auto",
    description:
      "Robin van AutoMatch zoekt, beoordeelt en onderhandelt met je mee over een gebruikte auto die past bij je wensen en budget. Ook voor expats. Vanaf €120.",
    ogTitle: "Ik help je jouw perfecte auto te vinden | AutoMatch",
    ogAlt: "Robin van AutoMatch met een autosleutel: hulp bij het kopen van een gebruikte auto, vanaf €120",
    keywords: ["gebruikte auto kopen", "hulp bij aankoop auto", "autozoekservice", "aankoopadvies auto", "occasion kopen", "auto kopen expat", "Nederland"],
  },
  en: {
    title: "AutoMatch | Help buying a used car in the Netherlands",
    description:
      "Robin from AutoMatch helps you find, check and negotiate a used car that fits your wishes and budget in the Netherlands. Ideal for expats. From €120.",
    ogTitle: "I help you find your perfect car | AutoMatch",
    ogAlt: "Robin from AutoMatch holding a car key: help buying a used car in the Netherlands, from €120",
    keywords: ["buy a used car Netherlands", "car buying service", "used car purchase advice", "buying a car as an expat", "car search service"],
  },
  es: {
    title: "AutoMatch | Ayuda para comprar un auto usado en Países Bajos",
    description:
      "Robin de AutoMatch te ayuda a encontrar, revisar y negociar un auto usado en Países Bajos según lo que buscas y tu presupuesto. Ideal para expats. Desde €120.",
    ogTitle: "Te ayudo a encontrar tu auto perfecto | AutoMatch",
    ogAlt: "Robin de AutoMatch con una llave de auto: ayuda para comprar un auto usado en Países Bajos, desde €120",
    keywords: ["comprar auto usado Países Bajos", "comprar coche Holanda", "asesoría compra auto", "expat comprar coche", "búsqueda de auto"],
  },
};

export function buildMetadata(lang: Lang): Metadata {
  const s = SEO[lang];
  const languages = Object.fromEntries(LOCALES.map((l) => [l, pathFor(l)])) as Record<string, string>;
  languages["x-default"] = "/";
  return {
    metadataBase: new URL(SITE_URL),
    title: s.title,
    description: s.description,
    keywords: s.keywords,
    applicationName: "AutoMatch",
    authors: [{ name: "AutoMatch" }],
    creator: "AutoMatch",
    publisher: "AutoMatch",
    category: "automotive",
    alternates: { canonical: pathFor(lang), languages },
    robots: INDEXABLE
      ? { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } }
      : { index: false, follow: false, googleBot: { index: false, follow: false } },
    openGraph: {
      type: "website",
      siteName: "AutoMatch",
      url: pathFor(lang),
      title: s.ogTitle,
      description: s.description,
      locale: OG_LOCALE[lang],
      alternateLocale: LOCALES.filter((l) => l !== lang).map((l) => OG_LOCALE[l]),
      images: [{ url: `/og/${lang}.jpg`, width: 1200, height: 630, alt: s.ogAlt, type: "image/jpeg" }],
    },
    twitter: {
      card: "summary_large_image",
      title: s.ogTitle,
      description: s.description,
      images: [{ url: `/og/${lang}.jpg`, alt: s.ogAlt }],
    },
    formatDetection: { telephone: false, email: false, address: false },
    other: { google: "notranslate" },
    verification: process.env.NEXT_PUBLIC_GSC_VERIFICATION ? { google: process.env.NEXT_PUBLIC_GSC_VERIFICATION } : undefined,
  };
}

const str = (lang: Lang, k: string) => {
  const v = T[lang][k] ?? T.nl[k];
  return typeof v === "string" ? v : "";
};

/** One @graph per page with stable @ids. Only facts published on the client's site; no ratings or invented data. */
export function buildJsonLd(lang: Lang) {
  const biz = `${SITE_URL}/#business`;
  const site = `${SITE_URL}/#website`;
  const page = `${urlFor(lang)}#webpage`;
  const services = (["search", "advice", "premium"] as const).map((id, i) => ({
    "@type": "Service",
    "@id": `${SITE_URL}/#service-${id}`,
    name: str(lang, PKG[id].k),
    description: str(lang, `p${i + 1}.p`),
    serviceType: str(lang, PKG[id].k),
    provider: { "@id": biz },
    areaServed: { "@type": "Country", name: "Netherlands" },
    offers: { "@type": "Offer", price: String(PKG[id].price), priceCurrency: "EUR", url: `${urlFor(lang)}#service` },
  }));
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "AutomotiveBusiness",
        "@id": biz,
        name: "AutoMatch",
        url: `${SITE_URL}/`,
        description: str("nl", "hero.lead"),
        image: `${SITE_URL}/og/nl.jpg`,
        founder: { "@type": "Person", name: "Robin" },
        areaServed: { "@type": "Country", name: "Netherlands" },
        priceRange: "€120 – €250",
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: str(lang, "svc.title"),
          itemListElement: services.map((s) => ({ "@type": "Offer", itemOffered: { "@id": s["@id"] }, price: s.offers.price, priceCurrency: "EUR" })),
        },
      },
      ...services,
      {
        "@type": "WebSite",
        "@id": site,
        url: `${SITE_URL}/`,
        name: "AutoMatch",
        inLanguage: LOCALES,
        publisher: { "@id": biz },
      },
      {
        "@type": "WebPage",
        "@id": page,
        url: urlFor(lang),
        name: SEO[lang].title,
        description: SEO[lang].description,
        inLanguage: lang,
        isPartOf: { "@id": site },
        about: { "@id": biz },
        primaryImageOfPage: { "@type": "ImageObject", url: `${SITE_URL}/og/${lang}.jpg`, width: 1200, height: 630 },
      },
    ],
  };
}
