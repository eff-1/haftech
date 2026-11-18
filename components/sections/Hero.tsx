"use client";

import React from "react";
import Link from "next/link";
import { HeroAssemblyStage } from "./HeroAssemblyStage";

export function Hero() {
  return (
    <section
      className="relative overflow-visible border-b border-line bg-[var(--bg)]"
      aria-labelledby="hero-h1"
    >
      {/* 12-Column Faint Hairline Drafting Grid */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--line) 1px, transparent 1px), linear-gradient(to bottom, var(--line) 1px, transparent 1px)",
          backgroundSize: "clamp(48px, 6vw, 96px) clamp(48px, 6vw, 96px)",
        }}
        aria-hidden="true"
      />

      <div className="wrap relative z-10 w-full pt-10 sm:pt-14 pb-4">
        {/* Top Monospace Strip */}
        <div className="flex items-center gap-3 font-mono text-xs text-[var(--text-2)] tracking-widest uppercase mb-6 sm:mb-8">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--ht-blue)]" />
          <span>STUDIO · SOFTWARE ENGINEERING</span>
        </div>

        <div className="grid gap-8 lg:grid-cols-12 items-start">
          {/* Columns 1–7: Headline (LCP Element) + Support + CTAs (Word budget <= 20) */}
          <div className="lg:col-span-7 lg:sticky lg:top-28 pt-2">
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
              <span className="block mt-1 sm:mt-2">
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
                      id="hero-underline"
                      x1="0"
                      y1="1.5"
                      x2="280"
                      y2="1.5"
                      stroke="var(--ht-blue)"
                      strokeWidth="2.5"
                      strokeDasharray="280"
                      strokeDashoffset="280"
                      className="transition-all duration-150 ease-out"
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
                className="btn text-xs font-mono tracking-wider uppercase shadow-xs hover:shadow-md"
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

          {/* Columns 8–12: The Assembly Stage (Scroll-driven sticky container) */}
          <div className="lg:col-span-5">
            <HeroAssemblyStage />
          </div>
        </div>
      </div>
    </section>
  );
}
