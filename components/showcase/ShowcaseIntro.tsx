"use client";

import React, { useEffect, useRef } from "react";
import { useReducedMotion } from "@/components/motion/useReducedMotion";

export function ShowcaseIntro({ totalProjects }: { totalProjects: number }) {
  const prefersReducedMotion = useReducedMotion();
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (prefersReducedMotion) return;
    if (typeof window === "undefined") return;
    const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
    if (!isDesktop) return;

    const root = rootRef.current;
    if (!root) return;

    let ctx: { revert: () => void } | null = null;
    let cancelled = false;

    Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(
      ([{ gsap }, { ScrollTrigger }]) => {
        if (cancelled || !root) return;
        gsap.registerPlugin(ScrollTrigger);

        ctx = gsap.context(() => {
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: root,
              start: "top 82%",
              once: true,
            },
          });

          tl.from("[data-intro-id]", {
            opacity: 0,
            y: 12,
            duration: 0.55,
            ease: "power3.out",
          })
            .from(
              "[data-intro-line]",
              {
                yPercent: 105,
                opacity: 0,
                duration: 0.78,
                stagger: 0.11,
                ease: "power3.out",
              },
              "-=0.3"
            )
            .from(
              "[data-intro-desc]",
              {
                opacity: 0,
                y: 14,
                duration: 0.6,
                ease: "power2.out",
              },
              "-=0.45"
            )
            .from(
              "[data-intro-orbit]",
              {
                opacity: 0,
                scale: 0.9,
                duration: 0.75,
                ease: "power2.out",
              },
              "-=0.5"
            );
        }, root);
      }
    );

    return () => {
      cancelled = true;
      if (ctx) ctx.revert();
    };
  }, [prefersReducedMotion]);

  return (
    <div ref={rootRef} className="wrap relative z-10 pt-16 sm:pt-24 pb-8 sm:pb-12">
      {/* Section Strip */}
      <div
        data-intro-id
        className="mb-8 flex items-center justify-between border-b border-[#26262b] pb-3"
      >
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs font-semibold text-[#60a5fa]">03</span>
          <span className="h-3 w-px bg-[#333338]" />
          <span className="font-mono text-xs tracking-wider text-[#a09fa6] uppercase">
            Selected Work / 2022 — 2026
          </span>
        </div>
        <span className="font-mono text-[11px] text-[#a09fa6] hidden sm:inline uppercase">
          3D Circular Showcase · {String(totalProjects).padStart(2, "0")} Systems
        </span>
      </div>

      <div className="grid gap-8 lg:grid-cols-12 items-end">
        <div className="lg:col-span-8">
          <h2
            id="showcase-h2"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "var(--step-6)",
              lineHeight: 1.02,
              fontWeight: 500,
              letterSpacing: "-0.025em",
            }}
            className="text-[#f1efe8]"
          >
            <span className="block overflow-hidden">
              <span data-intro-line className="block">
                Building digital products.
              </span>
            </span>
            <span className="block overflow-hidden">
              <span data-intro-line className="block text-[#c8c7d2]">
                Engineering what comes next.
              </span>
            </span>
          </h2>
        </div>

        <div className="lg:col-span-4 flex flex-col items-start lg:items-end justify-end gap-4">
          <p
            data-intro-desc
            className="text-sm sm:text-base text-[#a09fa6] max-w-md lg:text-right leading-relaxed font-light"
          >
            A curated selection of digital experiences, platforms, and systems built through
            product thinking, architecture, and engineering.
          </p>

          {/* Subtle emerging circular orbit indicator */}
          <div
            data-intro-orbit
            className="hidden sm:inline-flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-wider text-[#a09fa6] border border-[#2a2a32] bg-[#141418]/80 px-3 py-1.5 rounded-xs"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <ellipse cx="8" cy="8" rx="6.5" ry="3.2" stroke="#60a5fa" strokeWidth="1" />
              <circle cx="14.5" cy="8" r="1.4" fill="#f1efe8" />
            </svg>
            <span>Scroll to orbit</span>
          </div>
        </div>
      </div>
    </div>
  );
}
