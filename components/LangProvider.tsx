"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { T, type Lang } from "@/lib/i18n";
import { persistLang } from "@/lib/lang-cookie";

type LangCtx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (k: string) => string;
  tl: (k: string) => string[];
};

const Ctx = createContext<LangCtx | null>(null);

export function LangProvider({ children, initialLang = "nl" }: { children: React.ReactNode; initialLang?: Lang }) {
  // First visit: Dutch (the client's original language). After that: the last language picked (cookie, read on the server).
  const [lang, setLangState] = useState<Lang>(initialLang);
  const setLang = useCallback((l: Lang) => {
    persistLang(l);
    setLangState(l);
    // each language has its own indexable URL: "/" (nl), "/en", "/es" — update it without remounting the page
    const path = l === "nl" ? "/" : `/${l}`;
    if (window.location.pathname !== path) window.history.replaceState(window.history.state, "", path + window.location.hash);
  }, []);

  const t = useCallback((k: string) => {
    const v = T[lang][k] ?? T.nl[k];
    return typeof v === "string" ? v : "";
  }, [lang]);

  const tl = useCallback((k: string) => {
    const v = T[lang][k] ?? T.nl[k];
    return Array.isArray(v) ? v : [];
  }, [lang]);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = t("meta.title");
    window.dispatchEvent(new CustomEvent("am:lang", { detail: lang }));
  }, [lang, t]);

  const value = useMemo(() => ({ lang, setLang, t, tl }), [lang, setLang, t, tl]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useLang() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useLang must be used inside <LangProvider>");
  return c;
}
