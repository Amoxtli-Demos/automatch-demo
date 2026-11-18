"use client";

import { useEffect } from "react";
import { motionState, prefersReducedMotion } from "@/lib/scroll";

type Revealable = HTMLElement & { _st?: unknown };

/**
 * Scroll choreography (GSAP + ScrollTrigger + Lenis).
 * The libraries are loaded after first paint and idle time, so they never sit on the LCP path.
 * Content stays fully usable without them: if loading fails or the visitor prefers reduced
 * motion, every reveal is shown and the drive section stacks vertically.
 */
export function Motion() {
  useEffect(() => {
    const root = document.documentElement;
    const $ = <T extends Element = HTMLElement>(s: string, c: ParentNode = document) => c.querySelector<T>(s);
    const $$ = <T extends Element = HTMLElement>(s: string, c: ParentNode = document) => Array.from(c.querySelectorAll<T>(s));
    let cancelled = false;
    let cleanup: (() => void) | null = null;

    const showAll = () => {
      root.classList.remove("has-gsap", "hz");
      $$("[data-split],[data-reveal],[data-clip]").forEach((el) => el.classList.add("shown"));
    };

    async function boot() {
      if (prefersReducedMotion()) { showAll(); return; }
      let gsapMod: typeof import("gsap"), stMod: typeof import("gsap/ScrollTrigger"), LenisCtor: typeof import("lenis").default;
      try {
        [gsapMod, stMod, LenisCtor] = await Promise.all([
          import("gsap"),
          import("gsap/ScrollTrigger"),
          import("lenis").then((m) => m.default),
        ]);
      } catch {
        showAll();
        return;
      }
      if (cancelled) return;
      const gsap = gsapMod.gsap;
      const ScrollTrigger = stMod.ScrollTrigger;
      gsap.registerPlugin(ScrollTrigger);

      /* smooth scroll */
      const lenis = new LenisCtor({ lerp: 0.1, wheelMultiplier: 1, anchors: false });
      lenis.on("scroll", ScrollTrigger.update);
      const raf = (time: number) => lenis.raf(time * 1000);
      gsap.ticker.add(raf);
      gsap.ticker.lagSmoothing(0);
      motionState.lenis = lenis;
      motionState.ready = true;

      const ctx = gsap.context(() => {});
      const mm = gsap.matchMedia();
      let stmtTween: gsap.core.Tween | null = null;
      const listeners: (() => void)[] = [];

      /* magnetic primary CTA */
      if (window.matchMedia("(hover:hover)").matches) {
        $$("[data-magnetic]").forEach((b) => {
          const xTo = gsap.quickTo(b, "x", { duration: 0.6, ease: "power3" });
          const yTo = gsap.quickTo(b, "y", { duration: 0.6, ease: "power3" });
          const move = (e: PointerEvent) => { const r = b.getBoundingClientRect(); xTo((e.clientX - r.left - r.width / 2) * 0.25); yTo((e.clientY - r.top - r.height / 2) * 0.35); };
          const leave = () => { xTo(0); yTo(0); };
          b.addEventListener("pointermove", move);
          b.addEventListener("pointerleave", leave);
          listeners.push(() => { b.removeEventListener("pointermove", move); b.removeEventListener("pointerleave", leave); });
        });
      }

      const revealOnScroll = () => {
        $$<Revealable>("[data-split],[data-reveal],[data-clip]").forEach((el) => {
          if (el.id === "h1" || el._st || el.closest(".hero")) return;
          el._st = ScrollTrigger.create({ trigger: el, start: "top 88%", once: true, onEnter: () => el.classList.add("shown") });
        });
      };
      const statementScrub = () => {
        if (stmtTween) { stmtTween.scrollTrigger?.kill(); stmtTween.kill(); }
        stmtTween = gsap.fromTo("#statement .sw", { opacity: 0.55 }, {
          opacity: 1, color: "#04000B", stagger: 0.08, ease: "none",
          scrollTrigger: { trigger: "#statement", start: "top 78%", end: "bottom 45%", scrub: true },
        });
      };

      /* language changes swap text nodes: re-arm the scrubbed statement and any new reveal targets */
      const onLang = () => requestAnimationFrame(() => {
        $$("#revGrid .rev").forEach((el) => el.classList.add("shown"));
        statementScrub();
        revealOnScroll();
        ScrollTrigger.refresh();
      });
      window.addEventListener("am:lang", onLang);
      const onFonts = () => ScrollTrigger.refresh();
      document.fonts?.ready.then(onFonts).catch(() => {});

      cleanup = () => {
        window.removeEventListener("am:lang", onLang);
        listeners.forEach((f) => f());
        stmtTween?.kill();
        mm.revert();
        ctx.revert();
        ScrollTrigger.getAll().forEach((s) => s.kill());
        gsap.ticker.remove(raf);
        lenis.destroy();
        motionState.lenis = null;
        motionState.ready = false;
        root.classList.remove("hz", "iris-on");
        $$<Revealable>("[data-split],[data-reveal],[data-clip]").forEach((el) => { delete el._st; });
      };

      /* build in stages, yielding between them, so setup never blocks input for long */
      const yieldTask = () => new Promise<void>((r) => setTimeout(r, 0));
      ctx.add(() => {
        /* hero: pinned iris opening from Robin's key into the drive (tablet / desktop) */
        mm.add("(min-width: 901px)", () => {
          const hero = $("#home")!, robin = $("#robin")!;
          const origin = () => {
            const r = robin.getBoundingClientRect(), h = hero.getBoundingClientRect();
            return `${(((r.left + r.width * 0.14 - h.left) / h.width) * 100).toFixed(2)}% ${(((r.top + r.height * 0.26 - h.top) / h.height) * 100).toFixed(2)}%`;
          };
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: hero, start: "top top", end: "+=110%", pin: true, scrub: 0.4, invalidateOnRefresh: true,
              onUpdate: (s) => { motionState.heroDark = s.progress > 0.62; },
              onLeave: () => gsap.set("#about", { autoAlpha: 1 }),
              onEnterBack: () => gsap.set("#about", { autoAlpha: 0 }),
            },
          });
          tl.to(".hero-copy", { yPercent: -18, opacity: 0, ease: "power1.in", duration: 0.5 }, 0)
            .to("#robinWrap", { scale: 1.18, yPercent: 4, ease: "none", duration: 0.6 }, 0)
            .to(".disc", { scale: 1.3, ease: "none", duration: 0.6 }, 0)
            .fromTo(".iris", { clipPath: () => `circle(0% at ${origin()})` }, { clipPath: () => `circle(160% at ${origin()})`, ease: "power2.in", duration: 0.7 }, 0.18)
            .fromTo(".iris-in", { yPercent: 12, opacity: 0 }, { yPercent: 0, opacity: 1, ease: "power3.out", duration: 0.25 }, 0.66)
            .fromTo(".iris .road", { yPercent: 100 }, { yPercent: 0, ease: "power3.out", duration: 0.25 }, 0.7);
          root.classList.add("iris-on");
          gsap.set("#about", { autoAlpha: 0 });
          return () => { motionState.heroDark = false; root.classList.remove("iris-on"); gsap.set("#about", { autoAlpha: 1 }); };
        });
        mm.add("(max-width: 900px)", () => {
          gsap.to("#robinWrap", { yPercent: 10, ease: "none", scrollTrigger: { trigger: "#home", start: "top top", end: "bottom top", scrub: true } });
        });
      });
      await yieldTask();
      if (cancelled) return;

      ctx.add(() => {
        /* the drive: horizontal pinned track */
        root.classList.add("hz");
        const track = $("#track")!, car = $("#car")!, speed = $("#speed")!, body = $("#carBody")!;
        const wheels = $$(".wheel"), hudItems = $$(".hud div"), signs = $$(".sign");
        gsap.set(wheels, { transformOrigin: "50% 50%" });
        const tilt = gsap.quickTo(car, "rotation", { duration: 0.5, ease: "power3" });
        gsap.to(body, { y: -1.6, duration: 0.18, repeat: -1, yoyo: true, ease: "sine.inOut" });
        const drive = gsap.to(track, {
          x: () => -(track.scrollWidth - window.innerWidth), ease: "none",
          scrollTrigger: {
            trigger: "#about", start: "top top", end: () => "+=" + (track.scrollWidth - window.innerWidth) * 1.15,
            pin: true, scrub: true, invalidateOnRefresh: true, anticipatePin: 1,
            onUpdate: (s) => {
              const p = s.progress, dist = (track.scrollWidth - window.innerWidth) * p;
              gsap.set(wheels, { rotation: (dist / (Math.PI * 30)) * 360 * 0.35 });
              const v = Math.max(-1, Math.min(1, s.getVelocity() / 2600));
              tilt(-v * 2.2);
              speed.style.opacity = String(Math.min(1, Math.abs(v) * 1.4));
              hudItems.forEach((h, i) => {
                const f = Math.max(0, Math.min(1, p * 3 - i));
                h.querySelector<HTMLElement>("i")!.style.setProperty("--f", f * 100 + "%");
                h.classList.toggle("on", f > 0);
              });
            },
          },
        });
        $$(".pstep").forEach((panel, i) => {
          gsap.to($(".big", panel), { backgroundSize: "100% 100%", ease: "none", scrollTrigger: { trigger: panel, containerAnimation: drive, start: "left 75%", end: "left 15%", scrub: true } });
          gsap.from($(".step-body", panel), { y: 60, opacity: 0, ease: "power2.out", scrollTrigger: { trigger: panel, containerAnimation: drive, start: "left 70%", end: "left 25%", scrub: true } });
          ScrollTrigger.create({ trigger: panel, containerAnimation: drive, start: "left 30%", onToggle: (s) => signs[i]?.classList.toggle("on", s.isActive) });
        });

      });
      await yieldTask();
      if (cancelled) return;

      ctx.add(() => {
        /* why: globe roll */
        gsap.fromTo("#globe", { rotation: -18, scale: 0.92 }, { rotation: 22, scale: 1.04, ease: "none", scrollTrigger: { trigger: "#why", start: "top bottom", end: "bottom top", scrub: true } });

        /* services: stacking cards (dimmed with an overlay, not a filter) */
        const cards = $$(".pcard");
        cards.forEach((c, i) => {
          if (i === cards.length - 1) return;
          gsap.fromTo(c, { scale: 1, "--dim": 0 }, { scale: 0.92 + i * 0.02, "--dim": 0.12, ease: "none", scrollTrigger: { trigger: cards[i + 1], start: "top bottom", end: "top 30%", scrub: true } });
        });

      });
      await yieldTask();
      if (cancelled) return;

      ctx.add(() => {
        /* reviews: marquees */
        gsap.fromTo("#mq1", { xPercent: 0 }, { xPercent: -28, ease: "none", scrollTrigger: { trigger: "#reviews", start: "top bottom", end: "bottom top", scrub: true } });
        gsap.fromTo("#mq2", { xPercent: -28 }, { xPercent: 0, ease: "none", scrollTrigger: { trigger: "#reviews", start: "top bottom", end: "bottom top", scrub: true } });

        /* footer wordmark */
        gsap.fromTo("#wordmark .ch", { yPercent: 105 }, { yPercent: 0, stagger: 0.06, ease: "none", scrollTrigger: { trigger: "#wordmark", start: "top bottom", end: "bottom bottom", scrub: true } });

        revealOnScroll();
        statementScrub();
      });

    }

    /* after first paint + idle: keeps the motion stack off the critical rendering path */
    let idleId: number | undefined, timeoutId: number | undefined;
    const schedule = () => {
      timeoutId = window.setTimeout(() => {
        if ("requestIdleCallback" in window) idleId = window.requestIdleCallback(() => boot(), { timeout: 1200 });
        else boot();
      }, 400);
    };
    if (document.readyState === "complete") schedule();
    else window.addEventListener("load", schedule, { once: true });

    return () => {
      cancelled = true;
      window.removeEventListener("load", schedule);
      window.clearTimeout(timeoutId);
      if (idleId !== undefined && "cancelIdleCallback" in window) window.cancelIdleCallback(idleId);
      cleanup?.();
    };
  }, []);

  return null;
}
