"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useLang } from "./LangProvider";
import { usePlanner, toast, type Draft } from "./PlannerProvider";
import { SplitWords } from "./SplitWords";
import { ArrowRight, Send } from "./icons";
import { LANG_NAMES, PKG, type Lang, type PkgId } from "@/lib/i18n";
import { scrollToY, prefersReducedMotion } from "@/lib/scroll";

const FORM_URL = "https://forms.gle/xrAa24g5vjxa7EyL9";
const PACKAGES: { id: PkgId; k: string; sub: string; price: string }[] = [
  { id: "search", k: "p1.t", sub: "f.pk1", price: "€120" },
  { id: "advice", k: "p2.t", sub: "f.pk2", price: "€150" },
  { id: "premium", k: "p3.t", sub: "f.pk3", price: "€250" },
  { id: "unsure", k: "f.unsure", sub: "f.pk4", price: "?" },
];
const fmtBudget = (v: number) => (v >= 50000 ? "€50.000+" : "€" + v.toLocaleString("nl-NL"));
const validEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);

/** Small dashboard gauge used on the success state. */
export function Gauge({ id, className }: { id: string; className?: string }) {
  const cx = 110, cy = 110, r = 90;
  const pt = (a: number, rr: number) => { const rad = ((a - 90) * Math.PI) / 180; return [cx + rr * Math.cos(rad), cy + rr * Math.sin(rad)]; };
  const [a0, a1] = [pt(-120, r), pt(120, r)];
  const d = `M${a0[0]} ${a0[1]} A${r} ${r} 0 1 1 ${a1[0]} ${a1[1]}`;
  const ticks = [];
  for (let a = -120; a <= 120; a += 30) { const p1 = pt(a, 72), p2 = pt(a, 62); ticks.push(<line key={a} className="tick" x1={p1[0]} y1={p1[1]} x2={p2[0]} y2={p2[1]} />); }
  return (
    <svg viewBox="0 0 220 168" className={"gauge " + (className ?? "")} aria-hidden="true">
      <defs><linearGradient id={id} x1="0" x2="1"><stop offset="0" stopColor="#246BFD" /><stop offset="1" stopColor="#A200BE" /></linearGradient></defs>
      <path className="arc" d={d} />
      <path className="arc-on" stroke={`url(#${id})`} pathLength={100} strokeDasharray="100" strokeDashoffset="100" d={d} />
      {ticks}
      <line className="needle" x1="110" y1="110" x2="110" y2="42" />
      <circle className="hub" cx="110" cy="110" r="8" />
    </svg>
  );
}

function Chips({ name, items, values, multi, onChange }: { name: string; items: string[]; values: string[]; multi: boolean; onChange: (v: string[]) => void }) {
  return (
    <div className="chips">
      {items.map((label, i) => {
        const v = String(i), id = `${name}-${i}`, on = values.includes(v);
        return (
          <span className="chip" key={id}>
            <input type={multi ? "checkbox" : "radio"} name={name} id={id} value={v} checked={on}
              onChange={() => onChange(multi ? (on ? values.filter((x) => x !== v) : [...values, v]) : [v])} />
            <label htmlFor={id}>{label}</label>
          </span>
        );
      })}
    </div>
  );
}

export function Planner() {
  const { lang, t, tl } = useLang();
  const { draft, update, reset, pane, maxPane, goPane } = usePlanner();
  const [errors, setErrors] = useState<{ name?: boolean; email?: boolean }>({});
  const [shake, setShake] = useState<string | null>(null);
  const [back, setBack] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const doneRef = useRef<HTMLDivElement>(null);
  const prevCard = useRef<Record<string, string>>({});

  // preferred language follows the site language until the visitor picks one
  useEffect(() => { if (!draft.talkTouched) update({ talk: lang }); }, [lang, draft.talkTouched, update]);

  const labels = (key: string, arr: string[]) => { const L = tl(key); return arr.map((i) => L[+i]).join(", "); };
  const talk: Lang = draft.talk ?? lang;

  const summary = (d: Draft) => {
    const L: string[] = [t("sum.hi"), "", t("sum.intro"), ""];
    L.push(`${t("m.pkg")}: ${d.pkg ? t(PKG[d.pkg].k) + (PKG[d.pkg].price ? ` (€${PKG[d.pkg].price})` : "") : "-"}`);
    if (d.eye) L.push(`${t("m.eye")}: ${d.eye === "yes" ? d.eyeTxt || t("f.yes") : t("f.no")}`);
    L.push(`${t("m.budget")}: ${fmtBudget(d.budget)}`);
    if (d.type.length) L.push(`${t("m.type")}: ${labels("types", d.type)}`);
    if (d.fuel.length) L.push(`${t("m.fuel")}: ${labels("fuels", d.fuel)}`);
    if (d.when.length) L.push(`${t("m.when")}: ${labels("whens", d.when)}`);
    L.push(`${t("sum.talk")}: ${LANG_NAMES[talk]}`);
    if (d.msg) { L.push(""); L.push(`${t("sum.note")}: ${d.msg}`); }
    L.push(""); L.push(d.name); L.push(d.email + (d.phone ? " · " + d.phone : ""));
    return L.join("\n");
  };

  const scrollFormIntoView = () => {
    const r = formRef.current?.getBoundingClientRect();
    if (r && (r.top < 70 || r.top > window.innerHeight * 0.5)) scrollToY(window.scrollY + r.top - 100);
  };
  const doShake = (key: string) => { setShake(null); requestAnimationFrame(() => setShake(key)); };
  const to = (n: number) => { setBack(n < pane); goPane(n); };

  const next = () => {
    if (pane === 0 && !draft.pkg) {
      doShake("pk"); toast(t("f.needPkg"));
      (document.getElementById("pk-search") as HTMLInputElement | null)?.focus();
      return;
    }
    to(pane + 1); scrollFormIntoView();
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = { name: draft.name.trim().length <= 1, email: !validEmail(draft.email.trim()) };
    setErrors(errs);
    if (errs.name || errs.email) {
      const first = errs.name ? "name" : "email";
      document.getElementById(first)?.focus();
      doShake(first);
      return;
    }
    to(3); scrollFormIntoView();
    window.setTimeout(() => doneRef.current?.focus({ preventScroll: true }), 50);
  };

  const copy = async () => {
    const txt = summary(draft);
    try { await navigator.clipboard.writeText(txt); }
    catch {
      const ta = document.createElement("textarea"); ta.value = txt; ta.style.position = "fixed"; ta.style.opacity = "0";
      document.body.appendChild(ta); ta.select(); try { document.execCommand("copy"); } catch { /* ignore */ } ta.remove();
    }
    toast(t("d.copied"));
  };

  /* live match card */
  const rows: [string, string, string][] = [
    ["pkg", t("m.pkg"), draft.pkg ? t(PKG[draft.pkg].k) : ""],
    ["eye", t("m.eye"), draft.eye === "yes" ? draft.eyeTxt || t("f.yes") : draft.eye === "no" ? t("f.no") : ""],
    ["budget", t("m.budget"), maxPane >= 1 || draft.budget !== 10000 ? fmtBudget(draft.budget) : ""],
    ["type", t("m.type"), labels("types", draft.type)],
    ["fuel", t("m.fuel"), labels("fuels", draft.fuel)],
    ["when", t("m.when"), labels("whens", draft.when)],
    ["name", t("m.name"), draft.name],
  ];
  const pops: Record<string, boolean> = {};
  rows.forEach(([k, , v]) => { pops[k] = !!v && prevCard.current[k] !== undefined && prevCard.current[k] !== v && !prefersReducedMotion(); });
  useEffect(() => { rows.forEach(([k, , v]) => { prevCard.current[k] = v; }); });

  const price = draft.pkg && PKG[draft.pkg].price;
  const pct = ((draft.budget - 2500) / (50000 - 2500)) * 100;
  const carPos = [6, 50, 94, 94][pane];
  const paneCls = (n: number) => "pane" + (n === 3 ? " pane-done" : "") + (pane === n ? " cur" : "") + (back ? " back" : "");
  const fieldCls = (k: "name" | "email") => "field" + (errors[k] ? " bad" : "") + (shake === k ? " shake" : "");

  return (
    <section className="plan" id="contact">
      <div className="wrap">
        <div className="plan-head">
          <h2 className="display-2" data-split=""><SplitWords text={t("plan.title")} /></h2>
          <p data-reveal="">{t("plan.sub")}</p>
        </div>
        <div className="plan-grid">
          <form className="planner" id="planner" noValidate data-reveal="" ref={formRef} onSubmit={submit}>
            <ol className="stepper" id="stepper" role="list">
              {["f.s1", "f.s2", "f.s3"].map((k, i) => (
                <li key={k} className={pane === i ? "cur" : i < pane ? "done" : undefined}>
                  <button type="button" disabled={i > maxPane || pane === 3} onClick={() => to(i)}>
                    <span className="bar"><i /></span><span>{t(k)}</span>
                  </button>
                </li>
              ))}
            </ol>

            <div className={paneCls(0)} data-pane="0">
              <fieldset>
                <legend>{t("f.pkg")}</legend>
                <div className={"pk" + (shake === "pk" ? " shake" : "")}>
                  {PACKAGES.map((p) => (
                    <div className="opt" key={p.id}>
                      <input type="radio" name="pkg" id={"pk-" + p.id} value={p.id} checked={draft.pkg === p.id} onChange={() => update({ pkg: p.id })} />
                      <label htmlFor={"pk-" + p.id}><b><span>{t(p.k)}</span><span>{p.price}</span></b><span>{t(p.sub)}</span></label>
                    </div>
                  ))}
                </div>
              </fieldset>
              <fieldset>
                <legend>{t("f.eye")}</legend>
                <div className="chips">
                  <span className="chip"><input type="radio" name="eye" id="eye-y" value="yes" checked={draft.eye === "yes"} onChange={() => update({ eye: "yes" })} /><label htmlFor="eye-y">{t("f.yes")}</label></span>
                  <span className="chip"><input type="radio" name="eye" id="eye-n" value="no" checked={draft.eye === "no"} onChange={() => update({ eye: "no" })} /><label htmlFor="eye-n">{t("f.no")}</label></span>
                </div>
              </fieldset>
              <div className="field" id="eyeField" hidden={draft.eye !== "yes"}>
                <label htmlFor="eyeTxt">{t("f.eyetxt")}</label>
                <input id="eyeTxt" name="eyeTxt" type="text" autoComplete="off" value={draft.eyeTxt} onChange={(e) => update({ eyeTxt: e.target.value })} />
              </div>
              <div className="nav-btns"><span /><button className="btn" type="button" data-next="" onClick={next}><span>{t("f.next")}</span><ArrowRight /></button></div>
            </div>

            <div className={paneCls(1)} data-pane="1">
              <fieldset>
                <legend className="budget"><span>{t("f.budget")}</span><output id="budgetOut">{fmtBudget(draft.budget)}</output></legend>
                <input type="range" id="budget" name="budget" min={2500} max={50000} step={500} value={draft.budget} aria-label={t("f.budget")}
                  style={{ ["--p" as string]: pct + "%" } as React.CSSProperties} onChange={(e) => update({ budget: +e.target.value })} />
                <div className="range-scale"><span>€2.500</span><span>€50.000+</span></div>
              </fieldset>
              <fieldset><legend>{t("f.type")}</legend><Chips name="type" items={tl("types")} values={draft.type} multi onChange={(v) => update({ type: v })} /></fieldset>
              <fieldset><legend>{t("f.fuel")}</legend><Chips name="fuel" items={tl("fuels")} values={draft.fuel} multi onChange={(v) => update({ fuel: v })} /></fieldset>
              <fieldset><legend>{t("f.when")}</legend><Chips name="when" items={tl("whens")} values={draft.when} multi={false} onChange={(v) => update({ when: v })} /></fieldset>
              <div className="nav-btns">
                <button className="btn btn-ghost" type="button" onClick={() => to(0)}>{t("f.back")}</button>
                <button className="btn" type="button" data-next="" onClick={next}><span>{t("f.next")}</span><ArrowRight /></button>
              </div>
            </div>

            <div className={paneCls(2)} data-pane="2">
              <div className="two">
                <div className={fieldCls("name")}>
                  <label htmlFor="name">{t("f.name")}</label>
                  <input id="name" name="name" type="text" autoComplete="name" required aria-invalid={!!errors.name} value={draft.name}
                    onChange={(e) => { update({ name: e.target.value }); if (errors.name) setErrors((x) => ({ ...x, name: e.target.value.trim().length <= 1 })); }} />
                  <div className="err">{t("f.errName")}</div>
                </div>
                <div className={fieldCls("email")}>
                  <label htmlFor="email">{t("f.email")}</label>
                  <input id="email" name="email" type="email" autoComplete="email" required aria-invalid={!!errors.email} value={draft.email}
                    onChange={(e) => { update({ email: e.target.value }); if (errors.email) setErrors((x) => ({ ...x, email: !validEmail(e.target.value.trim()) })); }} />
                  <div className="err">{t("f.errMail")}</div>
                </div>
              </div>
              <div className="field">
                <label htmlFor="phone"><span>{t("f.phone")}</span> <small style={{ fontWeight: 400, color: "var(--muted)" }}>{t("f.opt")}</small></label>
                <input id="phone" name="phone" type="tel" autoComplete="tel" value={draft.phone} onChange={(e) => update({ phone: e.target.value })} />
              </div>
              <fieldset>
                <legend>{t("f.talk")}</legend>
                <div className="chips">
                  {(["nl", "en", "es"] as Lang[]).map((l) => (
                    <span className="chip" key={l}>
                      <input type="radio" name="talk" id={"tk-" + l} value={l} checked={talk === l} onChange={() => update({ talk: l, talkTouched: true })} />
                      <label htmlFor={"tk-" + l}>{LANG_NAMES[l]}</label>
                    </span>
                  ))}
                </div>
              </fieldset>
              <div className="field">
                <label htmlFor="msg"><span>{t("f.msg")}</span> <small style={{ fontWeight: 400, color: "var(--muted)" }}>{t("f.opt")}</small></label>
                <textarea id="msg" name="msg" value={draft.msg} onChange={(e) => update({ msg: e.target.value })} />
              </div>
              <div className="nav-btns">
                <button className="btn btn-ghost" type="button" onClick={() => to(1)}>{t("f.back")}</button>
                <button className="btn" type="submit"><span>{t("f.send")}</span><Send /></button>
              </div>
            </div>

            <div className={paneCls(3)} data-pane="3" tabIndex={-1} ref={doneRef}>
              {pane === 3 ? <Gauge id="ggS" className="gauge-s" /> : null}
              <h3>{t("d.t")}</h3>
              <p>{t("d.p")}</p>
              <pre id="summary">{pane === 3 ? summary(draft) : ""}</pre>
              <div className="row">
                <button className="btn" type="button" onClick={copy}><span>{t("d.copy")}</span></button>
                <a className="btn btn-ghost" href={FORM_URL} target="_blank" rel="noopener">{t("d.form")}</a>
              </div>
              <p className="note">{t("d.note")}</p>
              <button className="link-arrow" type="button" onClick={() => { reset(); setErrors({}); setBack(true); }}
                style={{ marginTop: 16, background: "none", borderLeft: 0, borderRight: 0, borderTop: 0, cursor: "pointer" }}>{t("d.again")}</button>
            </div>
          </form>

          <aside className="mcard" data-reveal="" aria-labelledby="mcTitle">
            <h3 id="mcTitle">
              <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 15l1.6-4.6A2 2 0 0 1 8.5 9h7a2 2 0 0 1 1.9 1.4L19 15" /><path d="M4 15h16v3H4z" /></svg>
              <span>{t("m.title")}</span>
            </h3>
            <div className="mini" aria-hidden="true">
              <span className="ln" />
              {[6, 50, 94].map((l, i) => (<span key={l} className={"st" + (i <= Math.min(pane, 2) ? " on" : "")} style={{ left: l + "%" }} />))}
              <svg className="mcar" id="mcar" viewBox="0 0 64 64" style={{ left: carPos + "%" }}>
                <g transform="rotate(90 32 32)"><rect x="18" y="8" width="28" height="48" rx="11" fill="#fff" /><rect x="21" y="18" width="22" height="10" rx="4" fill="#9DB9F5" /><rect x="21" y="38" width="22" height="8" rx="3" fill="#BFD4FF" /><rect x="20" y="8" width="7" height="4" rx="2" fill="#FFE27A" /><rect x="37" y="8" width="7" height="4" rx="2" fill="#FFE27A" /></g>
              </svg>
            </div>
            <dl id="mdl">
              {rows.map(([k, label, v]) => (
                <div key={k}>
                  <dt>{label}</dt>
                  <dd key={v} className={!v ? "empty" : pops[k] ? "pop" : undefined}>{v || t("m.empty")}</dd>
                </div>
              ))}
            </dl>
            <div className="total"><span>{t("m.total")}</span><b id="mTotal">{price ? "€" + price : "—"}</b></div>
            <Image className="robin-mini" src="/img/robin.webp" width={728} height={1122} sizes="150px" alt="" aria-hidden="true" />
          </aside>
        </div>
      </div>
    </section>
  );
}
