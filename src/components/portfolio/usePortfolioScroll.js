import { useEffect, useLayoutEffect, useRef } from "react";

const scrollKeys = new Set([
  "ArrowUp", "ArrowDown", "PageUp", "PageDown", "Home", "End", " ",
]);

export default function usePortfolioScroll(locationKey, navigationType) {
  const lenis = useRef(null);
  const positions = useRef(new Map());

  useEffect(() => {
    // The query sits before the HashRouter fragment and survives route links.
    if (new URLSearchParams(window.location.search).get("scroll") === "native") return;
    const desktopMotion = window.matchMedia(
      "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
    );
    let revision = 0;
    const sync = async () => {
      const current = ++revision;
      lenis.current?.destroy();
      lenis.current = null;
      if (!desktopMotion.matches) return;
      try {
        const { default: Lenis } = await import("lenis");
        if (current !== revision) return;
        lenis.current = new Lenis({
          autoRaf: true,
          lerp: 0.19,
          syncTouch: false,
          allowNestedScroll: true,
          // HashRouter owns links; Lenis only eases wheel input.
          anchors: false,
          prevent: (node) => node.matches(
            "dialog, input, select, textarea, [contenteditable], .js-plotly-plot",
          ),
        });
      } catch {
        // A failed optional chunk must not change native scrolling.
      }
    };
    const releaseWheel = () => {
      const instance = lenis.current;
      if (instance?.isScrolling === "smooth") {
        instance.stop();
        instance.start();
      }
    };
    const onKey = (event) => {
      if (scrollKeys.has(event.key)) releaseWheel();
    };
    const onClick = (event) => {
      if (event.target instanceof Element && event.target.closest("a")) releaseWheel();
    };
    desktopMotion.addEventListener("change", sync);
    window.addEventListener("keydown", onKey, true);
    window.addEventListener("click", onClick, true);
    sync();
    return () => {
      ++revision;
      desktopMotion.removeEventListener("change", sync);
      window.removeEventListener("keydown", onKey, true);
      window.removeEventListener("click", onClick, true);
      lenis.current?.destroy();
      lenis.current = null;
    };
  }, []);

  useLayoutEffect(() => {
    const original = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";
    return () => { window.history.scrollRestoration = original; };
  }, []);

  useLayoutEffect(() => {
    const target = navigationType === "POP" ? positions.current.get(locationKey) ?? 0 : 0;
    let observer;
    let timeout;
    let restoring = false;
    const jump = () => {
      const instance = lenis.current;
      instance?.stop();
      window.scrollTo({ top: target, behavior: "instant" });
      instance?.start();
    };
    const remember = () => {
      if (!restoring) positions.current.set(locationKey, window.scrollY);
    };
    const cancelRestore = () => {
      observer?.disconnect();
      clearTimeout(timeout);
      for (const type of ["wheel", "touchstart", "pointerdown", "keydown"]) {
        window.removeEventListener(type, cancelRestore, true);
      }
      restoring = false;
    };
    jump();
    if (window.scrollY < target && typeof ResizeObserver !== "undefined") {
      // Back/forward may return to charts that haven't been loaded or laid out yet.
      restoring = true;
      observer = new ResizeObserver(() => {
        const height = document.scrollingElement?.scrollHeight ?? 0;
        if (height - window.innerHeight >= target) {
          jump();
          cancelRestore();
          remember();
        }
      });
      observer.observe(document.body);
      timeout = window.setTimeout(() => {
        jump();
        cancelRestore();
        remember();
      }, 2500);
      for (const type of ["wheel", "touchstart", "pointerdown", "keydown"]) {
        window.addEventListener(type, cancelRestore, { capture: true, passive: true });
      }
    }
    window.addEventListener("scroll", remember, { passive: true });
    remember();
    return () => {
      cancelRestore();
      window.removeEventListener("scroll", remember);
    };
  }, [locationKey, navigationType]);
}
