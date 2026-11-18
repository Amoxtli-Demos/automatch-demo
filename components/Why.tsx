"use client";

import Image from "next/image";
import { useLang } from "./LangProvider";
import { SplitWords } from "./SplitWords";
import { Check, RollLabel } from "./icons";

export function Why() {
  const { t } = useLang();
  const words = t("why.p1").split(" ");
  return (
    <section className="why" id="why">
      <div className="wrap why-grid">
        <div className="why-art">
          <div className="globe-wrap" data-clip="">
            <Image className="globe" id="globe" src="/img/globe.webp" width={687} height={697} sizes="(max-width: 900px) 90vw, 40vw" alt={t("why.alt")} />
          </div>
        </div>
        <div className="why-copy">
          <h2 className="display-2" data-split=""><SplitWords text={t("why.title")} /></h2>
          <p className="statement" id="statement">
            {words.map((w, i) => (<span className="sw" key={i}>{w + (i < words.length - 1 ? " " : "")}</span>))}
          </p>
          <ul className="checks" role="list">
            {["why.q1", "why.q2", "why.q3"].map((k) => (
              <li data-reveal="" className="pt" key={k}>
                <span className="box" aria-hidden="true"><Check /></span>
                <span>{t(k)}</span>
              </li>
            ))}
          </ul>
          <div className="verdict on" id="verdict" data-reveal="">
            <b>{t("why.v")}</b>
            <a className="btn btn-light" href="#service"><RollLabel text={t("why.cta")} /></a>
          </div>
        </div>
      </div>
    </section>
  );
}
