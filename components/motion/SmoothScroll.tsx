"use client";

import { useEffect } from "react";
import { useReducedMotion } from "./useReducedMotion";

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;

    // Per brief guardrails: touch stays native on mobile/touch screens
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    if (!isFinePointer) return;

    let destroyed = false;
    let cleanup: (() => void) | null = null;

    Promise.all([
      import("lenis"),
      import("gsap"),
      import("gsap/ScrollTrigger"),
    ]).then(([{ default: Lenis }, { gsap }, { ScrollTrigger }]) => {
      if (destroyed) return;

      gsap.registerPlugin(ScrollTrigger);

      const lenis = new Lenis({
        duration: 1.15,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: "vertical",
        gestureOrientation: "vertical",
        smoothWheel: true,
        wheelMultiplier: 0.9,
      });

      lenis.on("scroll", ScrollTrigger.update);

      const tickerCb = (time: number) => {
        lenis.raf(time * 1000);
      };

      gsap.ticker.add(tickerCb);
      gsap.ticker.lagSmoothing(0);

      cleanup = () => {
        gsap.ticker.remove(tickerCb);
        lenis.destroy();
      };
    });

    return () => {
      destroyed = true;
      if (cleanup) cleanup();
    };
  }, [reducedMotion]);

  return <>{children}</>;
}

