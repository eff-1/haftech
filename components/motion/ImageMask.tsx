"use client";

import React, { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "./useReducedMotion";

interface ImageMaskProps {
  children: React.ReactNode;
  aspectRatio?: string;
  className?: string;
}

export function ImageMask({
  children,
  aspectRatio = "16 / 9",
  className = "",
}: ImageMaskProps) {
  const prefersReducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement | null>(null);
  // Start visible on SSR/initial paint to avoid blocking or hiding content if JS fails;
  // subtle scale-settle animates when entering viewport on client.
  const [revealed, setRevealed] = useState(true);

  useEffect(() => {
    if (prefersReducedMotion) {
      setRevealed(true);
      return;
    }

    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;

    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.9) {
      setRevealed(true);
      return;
    }

    setRevealed(false);

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.05 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [prefersReducedMotion]);

  return (
    <div
      ref={containerRef}
      className={`group relative overflow-hidden ${className}`}
      style={{
        aspectRatio,
        clipPath: revealed || prefersReducedMotion ? "inset(0% 0% 0% 0%)" : "inset(14% 0% 0% 0%)",
        opacity: revealed || prefersReducedMotion ? 1 : 0.85,
        transition: prefersReducedMotion
          ? "none"
          : "clip-path 650ms cubic-bezier(0.22, 1, 0.36, 1), opacity 500ms ease",
      }}
    >
      <div
        className="w-full h-full transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        style={{
          transform: revealed || prefersReducedMotion ? undefined : "scale(1.06)",
        }}
      >
        {children}
      </div>
    </div>
  );
}
