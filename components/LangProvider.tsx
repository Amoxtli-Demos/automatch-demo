"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { T, type Lang } from "@/lib/i18n";

type LangCtx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (k: string) => string;
  tl: (k: string) => string[];
};

const Ctx = createContext<LangCtx | null>(null);

export function LangProvider({ children }: { children: React.ReactNode }) {
  // The site always opens in Dutch (the client's original language).
  const [lang, setLangState] = useState<Lang>("nl");

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

  const value = useMemo(() => ({ lang, setLang: setLangState, t, tl }), [lang, t, tl]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useLang() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useLang must be used inside <LangProvider>");
  return c;
}
