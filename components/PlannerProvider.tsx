"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import type { Lang, PkgId } from "@/lib/i18n";
import { safeStore, scrollToId, prefersReducedMotion } from "@/lib/scroll";

export type Draft = {
  pkg: PkgId | null;
  eye: "yes" | "no" | null;
  eyeTxt: string;
  budget: number;
  type: string[];
  fuel: string[];
  when: string[];
  name: string;
  email: string;
  phone: string;
  talk: Lang | null;
  talkTouched: boolean;
  msg: string;
};

const EMPTY: Draft = {
  pkg: null, eye: null, eyeTxt: "", budget: 10000, type: [], fuel: [], when: [],
  name: "", email: "", phone: "", talk: null, talkTouched: false, msg: "",
};

type PlannerCtx = {
  draft: Draft;
  update: (patch: Partial<Draft>) => void;
  reset: () => void;
  pane: number;
  maxPane: number;
  goPane: (n: number) => void;
  reco: PkgId | null;
  setReco: (p: PkgId | null) => void;
  choosePkg: (p: PkgId) => void;
};

const Ctx = createContext<PlannerCtx | null>(null);

export function PlannerProvider({ children }: { children: React.ReactNode }) {
  const [draft, setDraft] = useState<Draft>(EMPTY);
  const [pane, setPane] = useState(0);
  const [maxPane, setMaxPane] = useState(0);
  const [reco, setReco] = useState<PkgId | null>(null);
  const restored = useRef(false);

  // restore after hydration (keeps server and client markup identical)
  useEffect(() => {
    const saved = safeStore.get<Partial<Draft>>("am-draft");
    if (saved) setDraft((d) => ({ ...d, ...saved }));
    restored.current = true;
  }, []);

  useEffect(() => {
    if (restored.current) safeStore.set("am-draft", draft);
  }, [draft]);

  const update = useCallback((patch: Partial<Draft>) => setDraft((d) => ({ ...d, ...patch })), []);
  const reset = useCallback(() => { setDraft(EMPTY); setPane(0); setMaxPane(0); }, []);

  const goPane = useCallback((n: number) => {
    setPane(n);
    setMaxPane((m) => Math.max(m, Math.min(n, 2)));
  }, []);

  const choosePkg = useCallback((p: PkgId) => {
    setDraft((d) => ({ ...d, pkg: p }));
    setPane(0);
    scrollToId("contact");
    window.setTimeout(() => {
      (document.getElementById("pk-" + p) as HTMLInputElement | null)?.focus({ preventScroll: true });
    }, prefersReducedMotion() ? 0 : 700);
  }, []);

  const value = useMemo(
    () => ({ draft, update, reset, pane, maxPane, goPane, reco, setReco, choosePkg }),
    [draft, update, reset, pane, maxPane, goPane, reco, choosePkg],
  );
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function usePlanner() {
  const c = useContext(Ctx);
  if (!c) throw new Error("usePlanner must be used inside <PlannerProvider>");
  return c;
}

export function toast(msg: string) {
  window.dispatchEvent(new CustomEvent("am:toast", { detail: msg }));
}
