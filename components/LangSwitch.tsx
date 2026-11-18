"use client";

import { useLayoutEffect, useRef } from "react";
import { useLang } from "./LangProvider";
import type { Lang } from "@/lib/i18n";

const LANGS: Lang[] = ["nl", "en", "es"];

export function LangSwitch({ visible = true }: { visible?: boolean }) {
  const { lang, setLang } = useLang();
  const wrap = useRef<HTMLDivElement>(null);
  const pill = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const place = () => {
      const b = wrap.current?.querySelector<HTMLButtonElement>(`button[data-lang="${lang}"]`);
      if (b && pill.current) {
        pill.current.style.left = b.offsetLeft + "px";
        pill.current.style.width = b.offsetWidth + "px";
      }
    };
    place();
    window.addEventListener("resize", place);
    document.fonts?.ready.then(place).catch(() => {});
    return () => window.removeEventListener("resize", place);
  }, [lang, visible]);

  return (
    <div className="lang" role="group" aria-label="Taal / Language / Idioma" ref={wrap}>
      <span className="pill" aria-hidden="true" ref={pill} />
      {LANGS.map((l) => (
        <button key={l} type="button" data-lang={l} aria-pressed={lang === l} onClick={() => setLang(l)}>
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
