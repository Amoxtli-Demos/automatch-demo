import { cookies } from "next/headers";
import { LangProvider } from "@/components/LangProvider";
import { LANG_COOKIE, parseLang } from "@/lib/lang-cookie";
import { PlannerProvider } from "@/components/PlannerProvider";
import { Loader } from "@/components/Loader";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Drive } from "@/components/Drive";
import { Why } from "@/components/Why";
import { Services } from "@/components/Services";
import { Reviews } from "@/components/Reviews";
import { Planner } from "@/components/Planner";
import { Footer } from "@/components/Footer";
import { Toast } from "@/components/Toast";
import { Motion } from "@/components/Motion";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "LocalBusiness",
      "@id": "https://automatchnl.com/#business",
      name: "AutoMatch",
      url: "https://automatchnl.com/",
      description: "Hulp bij het vinden en kopen van een gebruikte auto, afgestemd op wensen en budget.",
      areaServed: { "@type": "Country", name: "Nederland" },
      founder: { "@type": "Person", name: "Robin" },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Pakketten",
        itemListElement: [
          { "@type": "Offer", price: "120", priceCurrency: "EUR", itemOffered: { "@type": "Service", name: "Autozoekservice" } },
          { "@type": "Offer", price: "150", priceCurrency: "EUR", itemOffered: { "@type": "Service", name: "Aankoopadvies" } },
          { "@type": "Offer", price: "250", priceCurrency: "EUR", itemOffered: { "@type": "Service", name: "Premium pakket" } },
        ],
      },
    },
    {
      "@type": "WebSite",
      "@id": "https://automatchnl.com/#website",
      url: "https://automatchnl.com/",
      name: "AutoMatch",
      inLanguage: ["nl", "en", "es"],
      publisher: { "@id": "https://automatchnl.com/#business" },
    },
  ],
};

export default async function Page() {
  const initialLang = parseLang((await cookies()).get(LANG_COOKIE)?.value);
  return (
    <LangProvider initialLang={initialLang}>
      <PlannerProvider>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <div className="grain" aria-hidden="true" />
        <Loader />
        <Header />
        <main>
          <Hero />
          <Drive />
          <Why />
          <Services />
          <Reviews />
          <Planner />
        </main>
        <Footer />
        <Toast />
        <Motion />
      </PlannerProvider>
    </LangProvider>
  );
}
