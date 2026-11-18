"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/components/motion/useReducedMotion";

export function BuildLineRail() {
  const lineRef = useRef<HTMLDivElement | null>(null);
  const headRef = useRef<HTMLDivElement | null>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;

    let rafId: number;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? Math.min(1, Math.max(0, scrollY / docHeight)) : 0;

      if (lineRef.current) {
        lineRef.current.style.transform = `scaleY(${progress})`;
      }
      if (headRef.current) {
        headRef.current.style.top = `${progress * 100}%`;
        headRef.current.style.opacity = progress > 0.02 ? "1" : "0";
      }
    };

    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(handleScroll);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    handleScroll();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
    };
  }, [reducedMotion]);

  if (reducedMotion) {
    return (
      <div
        className="pointer-events-none fixed top-0 left-3 sm:left-6 lg:left-8 bottom-0 z-40 w-[1.5px] bg-[var(--ht-blue)] opacity-30"
        aria-hidden="true"
      />
    );
  }

  return (
    <div
      className="pointer-events-none fixed top-0 left-1.5 sm:left-4 lg:left-8 bottom-0 z-40 w-[2px] opacity-70"
      aria-hidden="true"
    >
      {/* Background guide rail track */}
      <div className="absolute inset-0 w-full bg-[var(--line)] opacity-40" />

      {/* Progressively drawn blue build line */}
      <div
        ref={lineRef}
        className="absolute top-0 left-0 w-full h-full bg-[var(--ht-blue)] origin-top will-change-transform"
        style={{ transform: "scaleY(0)" }}
      />

      {/* Active pulse head marker */}
      <div
        ref={headRef}
        className="absolute -left-[3px] h-2 w-2 rounded-full bg-[var(--ht-blue)] shadow-xs transition-opacity duration-300 opacity-0"
        style={{ top: "0%" }}
      />
    </div>
  );
}

