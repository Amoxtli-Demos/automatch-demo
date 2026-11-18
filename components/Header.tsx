"use client";

import { useEffect, useRef, useState } from "react";
import { useLang } from "./LangProvider";
import { LangSwitch } from "./LangSwitch";
import { RollLabel } from "./icons";
import { motionState, scrollToEl } from "@/lib/scroll";

const NAV = [
  { href: "#home", k: "nav.home" },
  { href: "#about", k: "nav.how" },
  { href: "#why", k: "nav.why" },
  { href: "#service", k: "nav.services" },
  { href: "#reviews", k: "nav.reviews" },
];
const SECTIONS = ["home", "about", "why", "service", "reviews", "contact"];

export function Header() {
  const { t } = useLang();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [darkScroll, setDarkScroll] = useState(false);
  const [darkHold, setDarkHold] = useState(false);
  const [active, setActive] = useState("home");
  const [mbar, setMbar] = useState(false);
  const lastY = useRef(0);
  const holdTimer = useRef<number | undefined>(undefined);

  /* scroll state: background, dark sections, hide on scroll down, scroll-spy, mobile CTA */
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 20);
      let dark = motionState.heroDark;
      ["about", "contact"].forEach((id) => {
        const r = document.getElementById(id)?.getBoundingClientRect();
        if (r && r.top <= 36 && r.bottom > 36) dark = true;
      });
      const f = document.querySelector("footer.site")?.getBoundingClientRect();
      if (f && f.top <= 36 && f.bottom > 36) dark = true;
      setDarkScroll(dark);
      if (y > lastY.current + 4 && y > 400) setHidden(true);
      else if (y < lastY.current - 4 || y < 100) setHidden(false);
      lastY.current = y;
      let cur = "home";
      SECTIONS.forEach((id) => {
        const s = document.getElementById(id);
        if (s && s.getBoundingClientRect().top < window.innerHeight * 0.45) cur = id;
      });
      setActive(cur);
      const ct = document.getElementById("contact")?.getBoundingClientRect();
      setMbar(y > window.innerHeight * 0.8 && !(ct && ct.top < window.innerHeight && ct.bottom > 0));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* in-page anchors go through Lenis so they share the site's easing */
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]');
      if (!a) return;
      const el = document.getElementById(a.getAttribute("href")!.slice(1));
      if (!el) return;
      e.preventDefault();
      setOpen(false);
      scrollToEl(el);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  /* drawer: lock scroll, Esc to close, header stays dark until the closing circle has passed */
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const lenis = motionState.lenis;
    if (lenis) (open ? lenis.stop() : lenis.start());
    window.clearTimeout(holdTimer.current);
    if (open) setDarkHold(true);
    else holdTimer.current = window.setTimeout(() => setDarkHold(false), 450);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const cls = ["site", scrolled && "scrolled", (darkScroll || darkHold) && "dark", hidden && !open && "hide"].filter(Boolean).join(" ");

  return (
    <>
      <header className={cls} id="top">
        <div className="wrap nav">
          <a className="logo" href="#home" aria-label="AutoMatch">AutoMatch</a>
          <ul className="menu" role="list">
            {NAV.map((n) => (
              <li key={n.href}>
                <a href={n.href} className={active === n.href.slice(1) ? "active" : undefined}>{t(n.k)}</a>
              </li>
            ))}
          </ul>
          <LangSwitch />
          <a className="btn btn-grad" href="#contact"><RollLabel text={t("nav.contact")} /></a>
          <button className="burger" type="button" aria-expanded={open} aria-controls="drawer" aria-label="Menu" onClick={() => setOpen((o) => !o)}>
            <span /><span /><span />
          </button>
        </div>
      </header>

      <div className={"drawer" + (open ? " open" : "")} id="drawer" inert={!open}>
        {NAV.map((n) => (
          <a key={n.href} className="dl" href={n.href}>{t(n.k)}</a>
        ))}
        <div className="row">
          <LangSwitch visible={open} />
          <a className="btn btn-grad" href="#contact"><span>{t("nav.contact")}</span></a>
        </div>
      </div>

      <div className={"mbar" + (mbar ? " show" : "")}>
        <a className="btn btn-grad" href="#contact"><span>{t("cta.tell")}</span></a>
      </div>
    </>
  );
}
