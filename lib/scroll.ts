/** Shared, framework-agnostic motion state (filled in by <Motion/> once GSAP + Lenis are loaded). */
type LenisLike = {
  scrollTo: (target: HTMLElement | number, opts?: Record<string, unknown>) => void;
  stop: () => void;
  start: () => void;
} | null;

export const motionState: { lenis: LenisLike; heroDark: boolean; ready: boolean } = {
  lenis: null,
  heroDark: false,
  ready: false,
};

const easeInOutCubic = (x: number) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);

export function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function scrollToEl(el: HTMLElement | null) {
  if (!el) return;
  const { lenis } = motionState;
  if (lenis) lenis.scrollTo(el, { offset: 0, duration: 1.6, easing: easeInOutCubic });
  else el.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth" });
}

export function scrollToY(y: number) {
  const { lenis } = motionState;
  if (lenis) lenis.scrollTo(y, { duration: 1 });
  else window.scrollTo({ top: y, behavior: prefersReducedMotion() ? "auto" : "smooth" });
}

export function scrollToId(id: string) {
  scrollToEl(document.getElementById(id));
}

/** Local storage that never throws (private mode, sandboxed frames). */
export const safeStore = {
  get<T>(k: string): T | null {
    try {
      const v = localStorage.getItem(k);
      return v ? (JSON.parse(v) as T) : null;
    } catch {
      return null;
    }
  },
  set(k: string, v: unknown) {
    try {
      localStorage.setItem(k, JSON.stringify(v));
    } catch {
      /* ignore */
    }
  },
};
