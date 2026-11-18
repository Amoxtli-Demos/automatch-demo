"use client";

import { useEffect, useRef, useState } from "react";
import { useLang } from "./LangProvider";
import { usePlanner } from "./PlannerProvider";
import { SplitWords } from "./SplitWords";
import { ArrowRight, EuStars, RollLabel } from "./icons";
import { PKG, type PkgId } from "@/lib/i18n";

type Card = { id: Exclude<PkgId, "unsure">; cls: string; title: string; text: string; covers: string[]; price: string; old?: string; grad?: boolean };
const CARDS: Card[] = [
  { id: "search", cls: "c1", title: "p1.t", text: "p1.p", covers: ["s1.t", "s2.t"], price: "€120" },
  { id: "advice", cls: "c2", title: "p2.t", text: "p2.p", covers: ["s3.t"], price: "€150" },
  { id: "premium", cls: "c3", title: "p3.t", text: "p3.p", covers: ["s1.t", "s2.t", "s3.t"], price: "€250", old: "€270", grad: true },
];

function Quiz() {
  const { t } = useLang();
  const { setReco, update, choosePkg } = usePlanner();
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<1 | 2>(1);
  const [res, setRes] = useState<PkgId | null>(null);
  const box = useRef<HTMLDivElement>(null);
  const btn = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => { if (!box.current?.contains(e.target as Node) && !btn.current?.contains(e.target as Node)) setOpen(false); };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("click", onDoc);
    document.addEventListener("keydown", onKey);
    window.setTimeout(() => box.current?.querySelector("button")?.focus(), 60);
    return () => { document.removeEventListener("click", onDoc); document.removeEventListener("keydown", onKey); };
  }, [open, step, res]);

  const recommend = (p: PkgId, eye: "yes" | "no") => { setRes(p); setReco(p); update({ eye }); };
  const toggle = () => { if (!open) { setStep(1); setRes(null); } setOpen((o) => !o); };

  return (
    <div className="helper helper-pop" data-reveal="">
      <button ref={btn} id="quizBtn" className="btn btn-ghost" type="button" aria-expanded={open} aria-controls="quiz" onClick={toggle}>
        <RollLabel text={t("quiz.btn")} />
      </button>
      <div ref={box} className={"quiz" + (open ? " open" : "")} id="quiz" role="dialog" aria-labelledby="quizQ">
        {res ? (
          <>
            <p id="quizQ" className="res" dangerouslySetInnerHTML={{ __html: t("quiz.res").replace("{p}", t(PKG[res].k)) }} />
            <div className="opts" id="quizOpts">
              <button type="button" className="btn btn-solid" onClick={() => { setOpen(false); choosePkg(res); }}>{t("quiz.go")}</button>
              <button type="button" className="btn btn-ghost" onClick={() => { setStep(1); setRes(null); }}>{t("quiz.again")}</button>
            </div>
          </>
        ) : step === 1 ? (
          <>
            <p id="quizQ">{t("quiz.q1")}</p>
            <div className="opts" id="quizOpts">
              <button type="button" className="btn btn-solid" onClick={() => recommend("advice", "yes")}>{t("quiz.yes")}</button>
              <button type="button" className="btn btn-ghost" onClick={() => { setStep(2); update({ eye: "no" }); }}>{t("quiz.no")}</button>
            </div>
          </>
        ) : (
          <>
            <p id="quizQ">{t("quiz.q2")}</p>
            <div className="opts" id="quizOpts">
              <button type="button" className="btn btn-solid" onClick={() => recommend("premium", "no")}>{t("quiz.yes")}</button>
              <button type="button" className="btn btn-ghost" onClick={() => recommend("search", "no")}>{t("quiz.no")}</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export function Services() {
  const { t } = useLang();
  const { reco, choosePkg } = usePlanner();
  return (
    <section className="services" id="service">
      <div className="wrap">
        <div className="svc-head">
          <h2 className="display-2" data-split=""><SplitWords text={t("svc.title")} /></h2>
          <Quiz />
        </div>
        <div className="stack" id="stack">
          {CARDS.map((c, i) => (
            <article key={c.id} className={`pcard ${c.cls} card${reco === c.id ? " reco" : ""}`} data-pkg={c.id} style={{ ["--i" as string]: i } as React.CSSProperties}>
              <div className="l">
                <span className="plate">
                  <span className="eu"><EuStars />NL</span>
                  <span className="num">{c.price}{c.old ? <s>{c.old}</s> : null}</span>
                </span>
                {c.old ? <span className="save">{t("svc.save")}</span> : null}
                <h3>{t(c.title)}</h3>
              </div>
              <div className="r">
                <p>{t(c.text)}</p>
                <ul className="covers" role="list">{c.covers.map((k) => <li key={k}>{t(k)}</li>)}</ul>
                <div className="act">
                  <button className={"btn" + (c.grad ? " btn-grad" : "")} type="button" onClick={() => choosePkg(c.id)}>
                    <RollLabel text={t("svc.choose")} />
                    <ArrowRight />
                  </button>
                  <span className="reco-tag">{t("svc.reco")}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
