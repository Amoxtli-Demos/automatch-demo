import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import localFont from "next/font/local";
import "../globals.css";
import { buildMetadata, LOCALES } from "@/lib/seo";
import type { Lang } from "@/lib/i18n";

const outfit = localFont({
  src: "../fonts/outfit-latin-var.woff2",
  weight: "100 900",
  style: "normal",
  display: "swap",
  variable: "--font-outfit",
  fallback: ["system-ui", "Segoe UI", "Arial", "sans-serif"],
  adjustFontFallback: "Arial",
});

export const dynamicParams = false;
export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  return buildMetadata(lang as Lang);
}

export const viewport: Viewport = {
  themeColor: "#04000B",
  width: "device-width",
  initialScale: 1,
  colorScheme: "light",
};

/**
 * Runs before first paint: decides the intro mode so nothing flashes or shifts.
 *  - has-gsap   → hidden start states for scroll reveals (rolled back if motion can't load)
 *  - hero-css   → hero intro is pure CSS (fast LCP, no JS needed)
 *  - use-loader → short CSS loader, desktop only, first visit per session
 */
const prePaint = `(function(){var d=document.documentElement,r=matchMedia('(prefers-reduced-motion: reduce)').matches;if(!r)d.classList.add('has-gsap');d.classList.add('hero-css');var s=false;try{s=sessionStorage.getItem('am-intro')==='1'}catch(e){}if(!r&&innerWidth>900&&!s){d.classList.add('use-loader');try{sessionStorage.setItem('am-intro','1')}catch(e){}setTimeout(function(){d.classList.remove('use-loader');d.style.setProperty('--intro','1.25s')},1900)}})();`;

export default async function RootLayout({ children, params }: { children: React.ReactNode; params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!LOCALES.includes(lang as Lang)) notFound();
  return (
    <html lang={lang} className={outfit.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: prePaint }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
