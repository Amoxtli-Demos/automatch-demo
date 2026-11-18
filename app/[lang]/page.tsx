import { Suspense } from "react";
import { LangProvider } from "@/components/LangProvider";
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
import { buildJsonLd } from "@/lib/seo";
import type { Lang } from "@/lib/i18n";

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const lang = (await params).lang as Lang;
  return (
    <LangProvider initialLang={lang}>
      <PlannerProvider>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildJsonLd(lang)).replace(/</g, "\\u003c") }} />
        <div className="grain" aria-hidden="true" />
        <Loader />
        <Header />
        <main>
          <Hero />
          <Suspense><Drive /></Suspense>
          <Suspense><Why /></Suspense>
          <Suspense><Services /></Suspense>
          <Suspense><Reviews /></Suspense>
          <Suspense><Planner /></Suspense>
        </main>
        <Suspense><Footer /></Suspense>
        <Toast />
        <Motion />
      </PlannerProvider>
    </LangProvider>
  );
}
