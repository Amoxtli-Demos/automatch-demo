"use client";

import { useState } from "react";
import { useLang } from "./LangProvider";
import { CarSmall, Translate } from "./icons";
import { REVIEWS, type Lang } from "@/lib/i18n";

export function Reviews() {
  const { lang, t } = useLang();
  const [shown, setShown] = useState<Record<string, Lang>>({});
  const [fading, setFading] = useState<string | null>(null);
  const titles = REVIEWS.map((r) => r.title);
  const row = (list: string[]) =>
    [0, 1, 2].flatMap((k) => list.map((x, i) => (<span key={`${k}-${i}`}>{x}<CarSmall /></span>)));

  const toggle = (id: string, orig: Lang, cur: Lang) => {
    setFading(id);
    window.setTimeout(() => { setShown((s) => ({ ...s, [id]: cur === orig ? lang : orig })); setFading(null); }, 200);
  };

  return (
    <section className="reviews" id="reviews">
      <h2 className="sr-only">{t("rev.title")}</h2>
      <div className="marquee" id="mq1" aria-hidden="true">{row(titles)}</div>
      <div className="marquee o" id="mq2" aria-hidden="true">{row([...titles].reverse())}</div>
      <div className="wrap">
        <div className="rev-grid" id="revGrid">
          {REVIEWS.map((r) => {
            const cur = shown[r.id] && (shown[r.id] === r.lang || shown[r.id] === lang) ? shown[r.id] : r.lang;
            const canTranslate = !(r.lang === lang && cur === r.lang);
            return (
              <article className="rev" data-reveal="" key={r.id}>
                <h3 lang={r.lang}>{r.title}<span className="lang-tag">{r.lang.toUpperCase()}</span></h3>
                <blockquote lang={cur} className={fading === r.id ? "swap" : undefined}>“{r.text[cur]}”</blockquote>
                <footer>
                  <div className="who">
                    <span className="av" aria-hidden="true" style={{ background: r.color }}>{r.name.split(" ").map((x) => x[0]).slice(0, 2).join("")}</span>
                    <div><b>{r.name}</b><small>{r.role[lang]}</small></div>
                  </div>
                  {canTranslate ? (
                    <button className="tr" type="button" onClick={() => toggle(r.id, r.lang, cur)}>
                      <Translate /><span>{cur === r.lang ? t("rev.tr") : t("rev.orig")}</span>
                    </button>
                  ) : null}
                </footer>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
