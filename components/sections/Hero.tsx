"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { HeroBuildStage } from "./HeroBuildStage";
import { gsap } from "gsap";
import { useReducedMotion } from "@/components/motion/useReducedMotion";

export function Hero() {
  const underlineRef = useRef<SVGLineElement | null>(null);
  const gridRef = useRef<HTMLDivElement | null>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const underline = underlineRef.current;
    if (!underline) return;

    if (reducedMotion) {
      gsap.set(underline, { strokeDashoffset: 0 });
      return;
    }

    gsap.set(underline, { strokeDashoffset: 280 });

    // Sync blue underline draw with the wireframe dissolution at t = 2.4s
    const tween = gsap.to(underline, {
      strokeDashoffset: 0,
      duration: 0.8,
      ease: "power2.out",
      delay: 2.4,
    });

    return () => {
      tween.kill();
    };
  }, [reducedMotion]);

  return (
    <section
      className="relative overflow-hidden border-b border-line bg-[var(--bg)] min-h-[82vh] lg:min-h-[88vh] flex items-center"
      aria-labelledby="hero-h1"
    >
      {/* 12-Column Faint Hairline Grid (Architect's drafting grid) */}
      <div
        ref={gridRef}
        className="pointer-events-none absolute inset-0 z-0 opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--line) 1px, transparent 1px), linear-gradient(to bottom, var(--line) 1px, transparent 1px)",
          backgroundSize: "clamp(48px, 6vw, 96px) clamp(48px, 6vw, 96px)",
        }}
        aria-hidden="true"
      />

      <div className="wrap relative z-10 w-full py-12 lg:py-16">
        {/* Top Monospace Anchor */}
        <div className="flex items-center gap-3 font-mono text-xs text-[var(--text-2)] tracking-widest uppercase mb-8">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--ht-blue)]" />
          <span>STUDIO · SOFTWARE ENGINEERING</span>
        </div>

        <div className="grid gap-12 lg:grid-cols-12 items-center">
          {/* Columns 1–7: Huge Headline + Support + CTAs (Word budget <= 20) */}
          <div className="lg:col-span-7">
            <h1
              id="hero-h1"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "var(--step-6)",
                fontWeight: 600,
                lineHeight: 1.02,
                letterSpacing: "-0.025em",
                color: "var(--text)",
              }}
            >
              <span className="block">Ideas deserve more</span>
              <span className="block">than execution.</span>
              <span className="block mt-2">
                They deserve{" "}
                <span className="relative inline-block text-[var(--text)]">
                  engineering.
                  <svg
                    className="absolute -bottom-1.5 left-0 w-full h-[3px] pointer-events-none overflow-visible"
                    viewBox="0 0 280 3"
                    preserveAspectRatio="none"
                    aria-hidden="true"
                  >
                    <line
                      ref={underlineRef}
                      x1="0"
                      y1="1.5"
                      x2="280"
                      y2="1.5"
                      stroke="var(--ht-blue)"
                      strokeWidth="2.5"
                      strokeDasharray="280"
                      strokeDashoffset="280"
                    />
                  </svg>
                </span>
              </span>
            </h1>

            {/* Support Line (Proposed: <= 14 words) */}
            <p
              className="mt-6 text-[var(--text-2)] text-base md:text-lg leading-relaxed font-sans"
              style={{ maxWidth: "44ch" }}
            >
              Products, systems and automation, built end to end.
            </p>

            {/* Dual CTAs */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/contact"
                className="btn text-xs font-mono tracking-wider uppercase"
                style={{ minHeight: 48, paddingInline: "var(--s-5)" }}
              >
                Start a project
              </Link>

              <Link
                href="/work"
                className="btn btn-secondary text-xs font-mono tracking-wider uppercase"
                style={{ minHeight: 48, paddingInline: "var(--s-5)" }}
              >
                See the work →
              </Link>
            </div>
          </div>

          {/* Columns 8–12: The Build Stage (~80vh on desktop) */}
          <div className="lg:col-span-5 flex justify-center">
            <HeroBuildStage />
          </div>
        </div>
      </div>
    </section>
  );
}
