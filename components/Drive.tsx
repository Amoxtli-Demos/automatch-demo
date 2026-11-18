"use client";

import { useLang } from "./LangProvider";
import { Chat, Key, Search } from "./icons";

const STEPS = [
  { t: "s1.t", p: "s1.p", Icon: Chat },
  { t: "s2.t", p: "s2.p", Icon: Search },
  { t: "s3.t", p: "s3.p", Icon: Key },
];

/** "Hoe werkt het?" — a pinned horizontal drive. Without motion it stacks vertically. */
export function Drive() {
  const { t } = useLang();
  return (
    <div className="pin-holder" id="aboutSpacer">
    <section className="how" id="about" aria-labelledby="howTitle">
      <div className="track" id="track">
        <div className="road" aria-hidden="true" />
        <div className="panel p0">
          <h2 className="display" id="howTitle">{t("how.title")}</h2>
          <p className="sub">{t("how.sub")}</p>
          <div className="ride-hint" aria-hidden="true">
            <svg viewBox="0 0 44 22" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round"><path className="arrowline" d="M2 11h34" /><path d="M32 5l7 6-7 6" /></svg>
            <span>{t("how.hint")}</span>
          </div>
        </div>
        {STEPS.map(({ t: tk, p, Icon }, i) => (
          <div className="panel pstep" data-step={i} key={tk}>
            <span className="sign" aria-hidden="true"><b><Icon /></b></span>
            <h3 className="big">{t(tk)}</h3>
            <div className="step-body">
              <span className="step-ic" aria-hidden="true"><Icon /></span>
              <p>{t(p)}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="hud" aria-hidden="true">
        {STEPS.map(({ t: tk }) => (<div key={tk}><span>{t(tk)}</span><i /></div>))}
      </div>
      <div className="car" id="car" aria-hidden="true">
        <span className="speed" id="speed" />
        <svg viewBox="0 0 220 96" id="carSvg">
          <g id="carBody">
            <ellipse cx="113" cy="90" rx="96" ry="5" fill="rgba(0,0,0,.35)" />
            <path d="M12 64c0-12 8-17 20-19l30-5c12-14 28-22 50-22h28c18 0 30 8 42 22l20 4c10 2 12 10 12 18v4c0 4-3 6-7 6H19c-4 0-7-2-7-6z" fill="#246BFD" />
            <path d="M12 64c0-12 8-17 20-19l30-5c12-14 28-22 50-22h28c18 0 30 8 42 22l20 4c10 2 12 10 12 18" fill="none" stroke="rgba(255,255,255,.35)" strokeWidth="2" />
            <path d="M72 40c9-11 21-16 37-16h9v16z" fill="#CFE0FF" />
            <path d="M124 24h16c14 0 24 6 31 16h-47z" fill="#CFE0FF" />
            <rect x="196" y="50" width="12" height="7" rx="3" fill="#FFF3B0" />
            <rect x="12" y="52" width="8" height="7" rx="3" fill="#FF5A6E" />
            <path d="M100 52h12" stroke="rgba(4,0,11,.45)" strokeWidth="3" strokeLinecap="round" />
          </g>
          <g className="wheel"><circle cx="58" cy="72" r="15" fill="#04000B" /><circle cx="58" cy="72" r="8" fill="#D8E7EF" /><path d="M58 64v16M50 72h16" stroke="#04000B" strokeWidth="2.5" /></g>
          <g className="wheel"><circle cx="170" cy="72" r="15" fill="#04000B" /><circle cx="170" cy="72" r="8" fill="#D8E7EF" /><path d="M170 64v16M162 72h16" stroke="#04000B" strokeWidth="2.5" /></g>
        </svg>
      </div>
    </section>
    </div>
  );
}
