import type { Metadata, Viewport } from "next";
import "@fontsource-variable/outfit";
import "./globals.css";

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://automatchnl.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: "AutoMatch — Hulp bij het kopen van een gebruikte auto",
  description:
    "Robin van AutoMatch helpt je de perfecte gebruikte auto te vinden, afgestemd op je wensen en budget. Autozoekservice, aankoopadvies of het premium pakket.",
  applicationName: "AutoMatch",
  // Demo build: keep it out of search results so it never competes with the live site.
  robots: { index: false, follow: false },
  openGraph: {
    type: "website",
    siteName: "AutoMatch",
    title: "AutoMatch — Ik help je jouw perfecte auto te vinden",
    description: "Persoonlijke hulp bij het zoeken, beoordelen en kopen van een gebruikte auto in Nederland. Ook voor expats.",
    locale: "nl_NL",
    alternateLocale: ["en_GB", "es_ES"],
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#04000B",
  width: "device-width",
  initialScale: 1,
};

/**
 * Runs before first paint: decides the intro mode so nothing flashes or shifts.
 *  - has-gsap   → hidden start states for scroll reveals (rolled back if motion can't load)
 *  - hero-css   → hero intro is pure CSS (fast LCP, no JS needed)
 *  - use-loader → short CSS loader, desktop only, first visit per session
 */
const prePaint = `(function(){var d=document.documentElement,r=matchMedia('(prefers-reduced-motion: reduce)').matches;if(!r)d.classList.add('has-gsap');d.classList.add('hero-css');var s=false;try{s=sessionStorage.getItem('am-intro')==='1'}catch(e){}if(!r&&innerWidth>900&&!s){d.classList.add('use-loader');try{sessionStorage.setItem('am-intro','1')}catch(e){}setTimeout(function(){d.classList.remove('use-loader');d.style.setProperty('--intro','1.25s')},1900)}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nl" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: prePaint }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
