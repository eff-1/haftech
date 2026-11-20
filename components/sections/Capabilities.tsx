"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useReducedMotion } from "@/components/motion/useReducedMotion";
import { SectionStrip } from "@/components/ui/SectionStrip";

const CAPABILITY_ROWS = [
  {
    num: "01",
    slug: "web-apps",
    title: "Web Applications",
    bullets: [
      "Custom full-stack web platforms built with React, Next.js, and TypeScript.",
      "Strict data modeling with relational schema design and atomic state updates.",
      "Optimized production SSR/SSG pipelines engineered for low LCP and zero CLS.",
    ],
  },
  {
    num: "02",
    slug: "cloud-apis",
    title: "Cloud Architecture & APIs",
    bullets: [
      "RESTful and event-driven API contracts validated end-to-end with Zod schemas.",
      "Distributed cache layers and connection pooling via Redis and PostgreSQL.",
      "Containerized microservices and edge worker deployments on secure cloud rails.",
    ],
  },
  {
    num: "03",
    slug: "automation",
    title: "Automation & Tooling",
    bullets: [
      "Headless background task queues and asynchronous cron worker pipelines.",
      "Automated web scraping, batch data transforms, and third-party webhook feeds.",
      "Developer productivity CLI utilities and automated continuous integration testing.",
    ],
  },
  {
    num: "04",
    slug: "consultation",
    title: "Technical Consultation",
    bullets: [
      "System architecture audits, code reviews, and database schema normalizations.",
      "Honest feasibility assessments and tech stack selection without vendor bias.",
      "Security best practices: authenticated RBAC, rate-limiting, and sanitized inputs.",
    ],
  },
  {
    num: "05",
    slug: "mobile-first",
    title: "Mobile-First Systems",
    bullets: [
      "Responsive layout architectures tested across real 320px–1440px viewports.",
      "Native touch gesture handling with hardware-accelerated 60/120fps CSS transforms.",
      "Offline-resilient caching, progressive web manifests, and lean network payloads.",
    ],
  },
  {
    num: "06",
    slug: "performance",
    title: "Performance & Optimization",
    bullets: [
      "Targeted Core Web Vitals profiling: eliminating TBT, forced reflows, and long tasks.",
      "Next.js bundle shaking: sub-170 KB initial JS payloads via dynamic module splits.",
      "Lossless WebP/AVIF media extraction, raster minimization, and font subsetting.",
    ],
  },
  {
    num: "07",
    slug: "design-engineering",
    title: "Engineering-Led Design",
    bullets: [
      "Design systems implemented in precise Tailwind/CSS variables and fluid typography.",
      "Tactile editorial animations adhering strictly to prefers-reduced-motion standards.",
      "100% WCAG AA/AAA accessible color contrast, keyboard skips, and ARIA labels.",
    ],
  },
];

export function Capabilities() {
  const [openSlug, setOpenSlug] = useState<string | null>("web-apps");
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const reducedMotion = useReducedMotion();

  const toggle = (slug: string) => {
    setOpenSlug((prev) => (prev === slug ? null : slug));
  };

  useEffect(() => {
    if (reducedMotion) return;

    let rafId: number;

    const handleScroll = () => {
      const vCenter = window.innerHeight * 0.5;

      rowRefs.current.forEach((el) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        // Only dim when section is actively scrolled through
        if (rect.bottom < 0 || rect.top > window.innerHeight) return;

        const elCenter = rect.top + rect.height * 0.5;
        const dist = Math.abs(elCenter - vCenter);

        const factor = Math.min(1, dist / (window.innerHeight * 0.4));
        const opacity = 1 - factor * 0.55;

        el.style.opacity = `${opacity}`;
      });
    };

    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(handleScroll);
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
    };
  }, [reducedMotion]);

  return (
    <section className="relative border-b border-line bg-[var(--bg)] py-16 sm:py-24" aria-labelledby="capabilities-h2">
      <div className="wrap relative z-10 w-full">
        <SectionStrip n="02" name="Capabilities" />

        <div className="flex flex-col sm:flex-row sm:items-end justify-between mt-6 mb-12 border-b border-line pb-6 gap-4">
          <div>
            <h2
              id="capabilities-h2"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "var(--step-5)",
                fontWeight: 600,
                lineHeight: 1.05,
                letterSpacing: "-0.02em",
                color: "var(--text)",
              }}
            >
              What we do
            </h2>
            <p className="mt-2 text-sm font-mono text-[var(--text-2)]">
              ENGINEERING DISCIPLINES // END TO END
            </p>
          </div>

          <span className="font-mono text-xs text-[var(--ht-blue)]">
            TAP TO INSPECT SPECIFICATION
          </span>
        </div>

        {/* 7 Large Typographic Rows (Boska, step-5) */}
        <div className="divide-y divide-line border-b border-line">
          {CAPABILITY_ROWS.map((row, idx) => {
            const isOpen = openSlug === row.slug;

            return (
              <div
                key={row.slug}
                ref={(el) => {
                  rowRefs.current[idx] = el;
                }}
                className="group transition-opacity duration-300 py-2"
                style={{ opacity: 1 }}
              >
                <button
                  type="button"
                  id={`btn-${row.slug}`}
                  aria-expanded={isOpen}
                  aria-controls={`panel-${row.slug}`}
                  onClick={() => toggle(row.slug)}
                  className="w-full text-left py-4 sm:py-6 flex items-center justify-between cursor-pointer group-hover:text-[var(--ht-blue)] transition-colors focus-visible:outline-2 focus-visible:outline-[var(--ht-blue)]"
                >
                  <div className="flex items-center gap-4 sm:gap-8">
                    <span className="font-mono text-xs sm:text-sm text-[var(--ht-blue)] font-bold tracking-wider">
                      {row.num}
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "clamp(1.5rem, 3.5vw, 2.5rem)",
                        fontWeight: 500,
                        lineHeight: 1.1,
                        letterSpacing: "-0.02em",
                        color: "var(--text)",
                      }}
                    >
                      {row.title}
                    </span>
                  </div>

                  {/* Dynamic Line Indicator Icon */}
                  <div className="flex items-center gap-3">
                    <span className="hidden sm:inline font-mono text-[11px] text-[var(--text-2)] uppercase">
                      {isOpen ? "CLOSE" : "EXPAND"}
                    </span>
                    <span
                      className="flex h-7 w-7 items-center justify-center rounded-xs border border-line bg-surface text-xs font-mono font-bold transition-transform duration-300"
                      style={{ transform: isOpen ? "rotate(45deg)" : "rotate(0deg)" }}
                    >
                      +
                    </span>
                  </div>
                </button>

                {/* Micro-breakdown Disclosure */}
                <div
                  id={`panel-${row.slug}`}
                  role="region"
                  aria-labelledby={`btn-${row.slug}`}
                  aria-label={`${row.title} specification`}
                  className="grid transition-[grid-template-rows] duration-300 ease-in-out"
                  style={{
                    gridTemplateRows: isOpen ? "1fr" : "0fr",
                  }}
                >
                  <div className="overflow-hidden">
                    <div className="pb-8 pt-2 pl-8 sm:pl-16 grid gap-6 md:grid-cols-12 items-start border-t border-line/50 mt-2">
                      <div className="md:col-span-8">
                        <ul className="space-y-2.5 font-sans text-sm sm:text-base text-[var(--text)]">
                          {row.bullets.map((b, i) => (
                            <li key={i} className="flex items-start gap-2.5">
                              <span className="h-1.5 w-1.5 rounded-full bg-[var(--ht-blue)] mt-2 shrink-0" />
                              <span>{b}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="md:col-span-4 flex justify-start md:justify-end">
                        <Link
                          href={`/services#${row.slug}`}
                          className="inline-flex items-center gap-2 font-mono text-xs text-[var(--ht-blue)] hover:underline border border-line px-3.5 py-2 rounded-xs bg-surface"
                        >
                          <span>Full capability details</span>
                          <span>→</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
