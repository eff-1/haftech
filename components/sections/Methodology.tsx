"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { methodology } from "@/content/copy";
import { SectionStrip } from "@/components/ui/SectionStrip";
import { useReducedMotion } from "@/components/motion/useReducedMotion";

const STAGE_MEDIA: Record<string, { src: string; alt: string }> = {
  discover: {
    src: "/media/process-discover.jpg",
    alt: "Architect model bench representing the Discover stage: pencil notes, scope lines and initial structural study",
  },
  architect: {
    src: "/media/process-architect.jpg",
    alt: "Architect model bench representing the Architect stage: drafted elevation plans and modular foam blocks",
  },
  engineer: {
    src: "/media/process-engineer.jpg",
    alt: "Architect model bench representing the Engineer stage: precision joined acrylic and board layers",
  },
  deliver: {
    src: "/media/process-deliver.jpg",
    alt: "Architect model bench representing the Deliver stage: completed architectural model under clean studio light",
  },
};

export function Methodology() {
  const prefersReducedMotion = useReducedMotion();
  const [activeIdx, setActiveIdx] = useState(0);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [inViewFocus, setInViewFocus] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);

  // Only enable subtle focus dimming once user scrolls into section (preserves 100% contrast at scrollY=0 for Axe)
  useEffect(() => {
    if (prefersReducedMotion) return;
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setInViewFocus(true);
        }
      },
      { threshold: 0.25 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [prefersReducedMotion]);

  const stages = methodology.stages;
  const activeStage = stages[activeIdx] || stages[0];
  const progressPercent = ((activeIdx + 1) / stages.length) * 100;

  const selectStage = (idx: number) => {
    setActiveIdx(idx);
    setHasInteracted(true);
  };

  return (
    <section
      ref={sectionRef}
      className="wrap section border-b border-line"
      aria-labelledby="method-h2"
    >
      <SectionStrip n="05" name="Methodology" />

      <div className="grid gap-10 lg:grid-cols-12 items-start">
        {/* Left: Sticky Architectural Plate & Build Line Progress */}
        <div className="lg:col-span-5 lg:sticky lg:top-24">
          <h2
            id="method-h2"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "var(--step-5)",
              fontWeight: 500,
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
            }}
          >
            How we work
          </h2>
          <p
            className="text-[var(--text-2)]"
            style={{ marginTop: "var(--s-3)", maxWidth: "36ch" }}
          >
            {methodology.intro}
          </p>

          {/* Architectural Model Plate */}
          <div className="mt-6 relative aspect-[4/3] w-full overflow-hidden border border-line bg-surface rounded-xs">
            {stages.map((s, i) => {
              const media = STAGE_MEDIA[s.slug] ?? STAGE_MEDIA.discover;
              const isCurrent = i === activeIdx;
              return (
                <div
                  key={s.slug}
                  aria-hidden={!isCurrent}
                  className="absolute inset-0"
                  style={{
                    opacity: isCurrent ? 1 : 0,
                    transform: isCurrent || prefersReducedMotion ? "scale(1)" : "scale(1.03)",
                    transition: prefersReducedMotion
                      ? "none"
                      : "opacity 320ms ease, transform 420ms ease",
                    pointerEvents: isCurrent ? "auto" : "none",
                  }}
                >
                  <Image
                    src={media.src}
                    alt={media.alt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 42vw"
                    className="object-cover object-center"
                  />
                </div>
              );
            })}

            {/* Subtle drafting plate corner tag */}
            <div className="absolute top-3 left-3 z-10 bg-[#121214]/85 text-[#f1efe8] px-2.5 py-1 font-mono text-[11px] uppercase tracking-wider rounded-xs border border-[#333338]">
              Stage {activeStage.n} · {activeStage.title}
            </div>

            {/* Bottom Build-Line Progress Bar */}
            <div
              className="absolute bottom-0 left-0 right-0 h-1 bg-[#121214]/25 z-10"
              aria-hidden="true"
            >
              <div
                className="h-full bg-[var(--ht-blue)]"
                style={{
                  width: `${progressPercent}%`,
                  transition: prefersReducedMotion ? "none" : "width 300ms ease",
                }}
              />
            </div>
          </div>
        </div>

        {/* Right: 4 Stations Along the Vertical Build Line */}
        <div className="lg:col-span-6 lg:col-start-7">
          <div className="relative pl-6 sm:pl-8">
            {/* Continuous Architectural Build Line Rail */}
            <div
              className="absolute left-[7px] top-3 bottom-3 w-px bg-[var(--ht-border)]"
              aria-hidden="true"
            />
            <div
              className="absolute left-[7px] top-3 w-0.5 bg-[var(--ht-blue)]"
              aria-hidden="true"
              style={{
                height: `calc(${((activeIdx + 0.5) / stages.length) * 100}% - 12px)`,
                transition: prefersReducedMotion ? "none" : "height 320ms ease",
              }}
            />

            <ol
              style={{ listStyle: "none", margin: 0, padding: 0 }}
              aria-label="Four engineering stages"
            >
              {stages.map((s, i) => {
                const isActive = i === activeIdx;
                const isExpanded = isActive && hasInteracted;
                const shouldDim = !prefersReducedMotion && inViewFocus && hasInteracted && !isActive;

                return (
                  <li
                    key={s.slug}
                    id={s.slug}
                    className="relative border-t border-line py-5 first:border-t-0"
                    style={{
                      opacity: shouldDim ? 0.55 : 1,
                      transition: prefersReducedMotion ? "none" : "opacity 240ms ease",
                    }}
                  >
                    {/* Station Node on the Build Line */}
                    <span
                      aria-hidden="true"
                      className="absolute -left-6 sm:-left-8 top-7 flex items-center justify-center w-4 h-4 rounded-full border transition-colors"
                      style={{
                        backgroundColor: isActive ? "var(--ht-blue)" : "var(--bg)",
                        borderColor: isActive ? "var(--ht-blue)" : "var(--ht-border-strong)",
                      }}
                    >
                      <span
                        className="w-1.5 h-1.5 rounded-full"
                        style={{
                          backgroundColor: isActive ? "#ffffff" : "transparent",
                        }}
                      />
                    </span>

                    <button
                      type="button"
                      onClick={() => selectStage(i)}
                      aria-expanded={isExpanded}
                      aria-controls={`stage-panel-${s.slug}`}
                      className="w-full text-left flex items-baseline justify-between gap-4 cursor-pointer focus-visible:outline-2 focus-visible:outline-[var(--ht-blue)] py-1"
                      style={{ minHeight: 44 }}
                    >
                      <div className="flex items-baseline gap-4">
                        <span
                          className="font-mono text-xs font-semibold"
                          style={{ color: isActive ? "var(--accent)" : "var(--text-2)" }}
                        >
                          {s.n}
                        </span>
                        <h3
                          style={{
                            fontFamily: "var(--font-display)",
                            fontWeight: 500,
                            fontSize: "var(--step-3)",
                            lineHeight: 1.15,
                            margin: 0,
                          }}
                        >
                          {s.title}
                        </h3>
                      </div>
                      <span
                        className="font-mono text-xs uppercase tracking-wider shrink-0"
                        style={{ color: isActive ? "var(--accent)" : "var(--text-2)" }}
                      >
                        {isExpanded ? "Hide −" : "Inspect +"}
                      </span>
                    </button>

                    {/* Expandable Deliverable Spec (revealed on interaction, keeping initial word budget <= 25) */}
                    {isExpanded && (
                      <div
                        id={`stage-panel-${s.slug}`}
                        role="region"
                        aria-label={`${s.title} stage deliverables`}
                        className="mt-4 pl-8 sm:pl-9"
                      >
                        <dl className="grid gap-3 sm:grid-cols-[6.5rem_1fr] m-0 text-sm">
                          {(
                            [
                              ["Input", s.input],
                              ["Activities", s.activity],
                              ["Output", s.output],
                            ] as const
                          ).map(([label, val]) => (
                            <div key={label} className="contents">
                              <dt className="font-mono text-[11px] uppercase tracking-wider text-[var(--text-2)] pt-0.5">
                                {label}
                              </dt>
                              <dd className="m-0 text-[var(--text)] leading-relaxed">{val}</dd>
                            </div>
                          ))}
                        </dl>
                      </div>
                    )}
                  </li>
                );
              })}
            </ol>
          </div>

          <div className="mt-6 border-t border-line pt-4 pl-6 sm:pl-8">
            <Link
              href="/approach"
              className="font-mono text-xs uppercase tracking-wider inline-flex items-center gap-2 hover:underline"
              style={{ minHeight: 48, color: "var(--accent)" }}
            >
              <span>Read the full approach</span>
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
