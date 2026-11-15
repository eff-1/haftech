"use client";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { methodology } from "@/content/copy";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function MethodologyScroll() {
  const [activeStage, setActiveStage] = useState(0);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const lineRef = useRef<HTMLDivElement | null>(null);
  const stagesRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const container = containerRef.current;
    const line = lineRef.current;
    if (!container || !line) return;

    const mm = gsap.matchMedia();

    mm.add(
      {
        desktop: "(min-width: 1024px)",
        reduce: "(prefers-reduced-motion: reduce)",
      },
      (context) => {
        const { desktop, reduce } = context.conditions as { desktop: boolean; reduce: boolean };

        if (reduce) {
          line.style.transform = "scaleY(1)";
          return;
        }

        // M05 Methodology progress line fill
        gsap.set(line, { scaleY: 0, transformOrigin: "top center" });

        gsap.to(line, {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: container,
            start: "top 60%",
            end: "bottom 80%",
            scrub: true,
          },
        });

        // IntersectionObserver for active stage highlight
        const observers = stagesRef.current.map((stageEl, idx) => {
          if (!stageEl) return null;
          const obs = new IntersectionObserver(
            (entries) => {
              if (entries[0].isIntersecting) {
                setActiveStage(idx);
              }
            },
            { rootMargin: "-20% 0px -50% 0px" }
          );
          obs.observe(stageEl);
          return obs;
        });

        return () => {
          observers.forEach((obs) => obs?.disconnect());
        };
      }
    );

    return () => mm.revert();
  }, []);

  return (
    <div ref={containerRef} className="mt-12 grid gap-12 lg:grid-cols-12 items-start">
      {/* Left pinned rail on desktop */}
      <div className="lg:col-span-4 lg:sticky lg:top-28">
        <span className="label text-xs">Stage Progression</span>
        <h2
          className="mt-2"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "var(--step-3)",
            fontWeight: 500,
          }}
        >
          {methodology.stages[activeStage].title}
        </h2>
        <p className="mt-2 text-sm text-[var(--text-2)] max-w-xs">
          Stage 0{activeStage + 1} of 04. Each stage has defined inputs, activities, and an
          inspectable deliverable.
        </p>

        {/* Quick jump navigation */}
        <nav aria-label="Methodology Stages" className="mt-8 hidden lg:block">
          <ul className="space-y-3" style={{ listStyle: "none", margin: 0, padding: 0 }}>
            {methodology.stages.map((s, i) => (
              <li key={s.slug}>
                <a
                  href={`#${s.slug}`}
                  className="label text-xs flex items-center gap-3 transition-colors"
                  style={{
                    color: activeStage === i ? "var(--accent)" : "var(--ht-concrete)",
                  }}
                >
                  <span
                    className="w-2 h-2 rounded-full border"
                    style={{
                      background: activeStage === i ? "var(--accent)" : "transparent",
                      borderColor: "var(--accent)",
                    }}
                  />
                  {s.n} · {s.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-10">
          <Link href="/contact" className="btn text-sm">
            Start with Discover
          </Link>
        </div>
      </div>

      {/* Right: Stages with progress line */}
      <div className="lg:col-span-8 relative lg:pl-10">
        {/* Continuous progress line */}
        <div
          className="absolute left-0 top-0 bottom-0 w-[2px] bg-[var(--line)] hidden lg:block"
          aria-hidden="true"
        >
          <div
            ref={lineRef}
            className="w-full h-full bg-[var(--accent)] will-change-transform"
          />
        </div>

        <div className="space-y-16">
          {methodology.stages.map((s, i) => (
            <div
              key={s.slug}
              id={s.slug}
              ref={(node) => {
                stagesRef.current[i] = node;
              }}
              className="scroll-mt-28 border border-line bg-surface p-6 sm:p-8"
            >
              <div className="flex items-center justify-between border-b border-line pb-4">
                <span
                  className="label text-sm font-semibold"
                  style={{ color: "var(--accent)" }}
                >
                  Stage {s.n}
                </span>
                <span className="label text-xs text-[var(--text-2)]">
                  Deliverable Required
                </span>
              </div>

              <h3
                className="mt-4"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "var(--step-3)",
                  fontWeight: 500,
                }}
              >
                {s.title}
              </h3>

              <dl className="mt-6 grid gap-4 sm:grid-cols-3 text-sm">
                <div className="border-t sm:border-t-0 sm:border-l border-line sm:pl-4 pt-3 sm:pt-0">
                  <dt className="label text-[11px] mb-1">Required Input</dt>
                  <dd style={{ margin: 0, color: "var(--text)" }}>{s.input}</dd>
                </div>
                <div className="border-t sm:border-t-0 sm:border-l border-line sm:pl-4 pt-3 sm:pt-0">
                  <dt className="label text-[11px] mb-1">Activities</dt>
                  <dd style={{ margin: 0, color: "var(--text)" }}>{s.activity}</dd>
                </div>
                <div className="border-t sm:border-t-0 sm:border-l border-line sm:pl-4 pt-3 sm:pt-0">
                  <dt className="label text-[11px] mb-1 text-[var(--accent)]">Inspectable Output</dt>
                  <dd style={{ margin: 0, color: "var(--text)", fontWeight: 500 }}>
                    {s.output}
                  </dd>
                </div>
              </dl>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

