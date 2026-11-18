"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useLang } from "./LangProvider";
import { SplitWords } from "./SplitWords";
import { ArrowDown, ArrowRight, RollLabel } from "./icons";

export function Hero() {
  const { t } = useLang();
  const [bubble, setBubble] = useState(false);

  useEffect(() => {
    const loader = document.documentElement.classList.contains("use-loader");
    const id = window.setTimeout(() => setBubble(true), loader ? 2600 : 1400);
    return () => window.clearTimeout(id);
  }, []);

  const replayBubble = () => { setBubble(false); requestAnimationFrame(() => requestAnimationFrame(() => setBubble(true))); };
  const d = (i: number) => ({ ["--d" as string]: `${0.45 + i * 0.12}s` }) as React.CSSProperties;

  return (
    <section className="hero" id="home">
      <div className="wrap hero-grid">
        <div className="hero-copy">
          <div className="h1-wrap">
            <h1 id="h1" data-split="" className="shown">
              <SplitWords text={t("hero.title")} highlight={t("hero.hl")} baseDelay={0.1} />
            </h1>
          </div>
          <p className="lead shown" data-reveal="" style={d(0)}>{t("hero.lead")}</p>
          <div className="hero-ctas shown" data-reveal="" style={d(1)}>
            <a className="btn btn-grad" href="#contact" data-magnetic="">
              <RollLabel text={t("cta.tell")} />
              <ArrowRight />
            </a>
            <a className="link-u" href="#about"><span>{t("hero.how")}</span><ArrowDown /></a>
          </div>
          <a className="proof shown" href="#reviews" data-reveal="" style={d(2)}>
            <span className="faces" aria-hidden="true">
              <span style={{ background: "#246BFD" }}>AC</span>
              <span style={{ background: "#1F2B38" }}>MB</span>
              <span style={{ background: "#A200BE" }}>CF</span>
              <span style={{ background: "#3A6A93" }}>RC</span>
            </span>
            <small dangerouslySetInnerHTML={{ __html: t("hero.proof") }} />
          </a>
        </div>
        <div className="hero-art" onPointerEnter={replayBubble}>
          <div className="disc" aria-hidden="true" />
          <div className="stripes" aria-hidden="true" />
          <div className="robin-wrap" id="robinWrap">
            <Image
              className="robin"
              id="robin"
              src="/img/robin.webp"
              width={728}
              height={1122}
              preload
              fetchPriority="high"
              sizes="(max-width: 900px) 70vw, 36vw"
              alt={t("hero.alt")}
            />
            <div className={"bubble" + (bubble ? "" : " off")} aria-hidden="true"><span>{t("hero.hi")}</span></div>
          </div>
        </div>
      </div>
      <div className="iris" aria-hidden="true">
        <div className="iris-in">
          <p className="display iris-title">{t("how.title")}</p>
          <p className="sub">{t("how.sub")}</p>
          <div className="ride-hint">
            <svg viewBox="0 0 44 22" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round"><path className="arrowline" d="M2 11h34" /><path d="M32 5l7 6-7 6" /></svg>
            <span>{t("how.hint")}</span>
          </div>
        </div>
        <div className="road" style={{ display: "block", position: "absolute", left: 0, right: 0, bottom: 0, height: "24vh", background: "var(--asphalt)" }} />
      </div>
    </section>
  );
}
