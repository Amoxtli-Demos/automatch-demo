"use client";

import { useLang } from "./LangProvider";
import { LangSwitch } from "./LangSwitch";
import { SplitWords } from "./SplitWords";
import { ArrowRight, RollLabel } from "./icons";

export function Footer() {
  const { t } = useLang();
  return (
    <footer className="site">
      <div className="wrap foot">
        <div className="cta">
          <p data-split=""><SplitWords text={t("foot.t")} /></p>
          <a className="btn btn-grad" href="#contact"><RollLabel text={t("nav.contact")} /><ArrowRight /></a>
        </div>
        <nav aria-label="Footer">
          <a href="#about">{t("nav.how")}</a>
          <a href="#why">{t("nav.why")}</a>
          <a href="#service">{t("nav.services")}</a>
          <a href="#reviews">{t("nav.reviews")}</a>
        </nav>
        <div className="bottom">
          <span>© Copyright 2025. All Rights Reserved by <span translate="no" className="notranslate">AutoMatch</span></span>
          <LangSwitch />
        </div>
      </div>
      <div className="wordmark notranslate" translate="no" id="wordmark" aria-hidden="true">
        {"AutoMatch".split("").map((ch, i) => (<span key={i} className={"ch" + (i >= 4 ? " g" : "")}>{ch}</span>))}
      </div>
    </footer>
  );
}
