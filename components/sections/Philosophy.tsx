"use client";

import React, { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/components/motion/useReducedMotion";
import { SectionStrip } from "@/components/ui/SectionStrip";

const PHILOSOPHY_PARAGRAPHS = [
  {
    id: "product",
    badge: "01 // PRODUCT ARCHITECTURE",
    title: "Product Engineering",
    text: "Software engineered from database schema to interface runtime, eliminating architectural fragility and hidden technical debt.",
  },
  {
    id: "systems",
    badge: "02 // DISTRIBUTED BACKENDS",
    title: "Systems & Infrastructure",
    text: "Resilient API routing, reliable queue workers, and automated continuous deployment built for predictable throughput and low latency.",
  },
  {
    id: "experience",
    badge: "03 // FRONTEND RUNTIMES",
    title: "Digital Experiences",
    text: "Accessible, responsive digital interfaces crafted with precision editorial typography, hardware-accelerated motion, and verifiable Core Web Vitals.",
  },
];

export function Philosophy() {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLElement | null>(null);
  const paraRefs = useRef<(HTMLDivElement | null)[]>([]);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;

    let rafId: number;

    const handleScroll = () => {
      const section = containerRef.current;
      if (!section) return;
      const sRect = section.getBoundingClientRect();
      // Only engage focus pull when section is in viewport
      if (sRect.bottom < 0 || sRect.top > window.innerHeight) return;

      const vCenter = window.innerHeight * 0.5;
      let minDistance = Infinity;
      let closestIdx = 0;

      paraRefs.current.forEach((el, idx) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const elCenter = rect.top + rect.height * 0.5;
        const dist = Math.abs(elCenter - vCenter);

        if (dist < minDistance) {
          minDistance = dist;
          closestIdx = idx;
        }

        const factor = Math.min(1, dist / (window.innerHeight * 0.45));
        const opacity = 1 - factor * 0.55; // 1.0 down to 0.45 (safe contrast)
        const scale = 1 - factor * 0.02;

        el.style.opacity = `${opacity}`;
        el.style.transform = `scale(${scale})`;
      });

      setActiveIndex(closestIdx);
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

  return (
    <section
      ref={containerRef}
      className="relative border-b border-line bg-[var(--bg)] py-16 sm:py-24"
      aria-labelledby="philosophy-heading"
    >
      <div className="wrap relative z-10 w-full">
        <SectionStrip n="01" name="Studio · Philosophy" />

        <div className="mt-8 grid gap-12 lg:grid-cols-12 lg:gap-16 items-start">
          {/* LEFT COLUMN: Sticky Vertically Centered Headline + Illustration Slot */}
          <div className="lg:col-span-6 lg:sticky lg:top-28">
            <h2
              id="philosophy-heading"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "var(--step-5)",
                fontWeight: 600,
                lineHeight: 1.08,
                letterSpacing: "-0.02em",
                color: "var(--text)",
              }}
            >
              We don&apos;t just build interfaces. We engineer the systems behind them.
            </h2>

            {/* Dynamic SVG Illustration Slot (Cross-fades 300ms) */}
            <div className="mt-8 sm:mt-12 h-64 sm:h-72 w-full rounded border border-line bg-surface/80 p-5 shadow-xs relative overflow-hidden flex items-center justify-center">
              {/* Drafting grid background */}
              <div
                className="pointer-events-none absolute inset-0 opacity-25"
                style={{
                  backgroundImage:
                    "linear-gradient(to right, var(--line) 1px, transparent 1px), linear-gradient(to bottom, var(--line) 1px, transparent 1px)",
                  backgroundSize: "24px 24px",
                }}
                aria-hidden="true"
              />

              {/* Slot 0: Product Engineering (Wireframe Layer Stack) */}
              <div
                className="absolute inset-0 flex flex-col items-center justify-center transition-all duration-300 pointer-events-none"
                style={{
                  opacity: activeIndex === 0 || reducedMotion ? 1 : 0,
                  transform: activeIndex === 0 || reducedMotion ? "scale(1)" : "scale(0.96)",
                }}
                aria-hidden={activeIndex !== 0 && !reducedMotion}
              >
                <svg viewBox="0 0 280 180" className="w-56 h-36" fill="none">
                  {/* Layer 1 Top UI */}
                  <polygon
                    points="140,25 240,65 140,105 40,65"
                    stroke="var(--ht-blue)"
                    strokeWidth="1.5"
                    fill="var(--bg)"
                  />
                  <line x1="140" y1="25" x2="140" y2="105" stroke="var(--ht-blue)" strokeDasharray="2 3" opacity="0.6" />
                  
                  {/* Layer 2 Mid API / Logic */}
                  <polygon
                    points="140,60 240,100 140,140 40,100"
                    stroke="var(--text-2)"
                    strokeWidth="1.2"
                    fill="var(--surface)"
                    opacity="0.85"
                  />
                  
                  {/* Layer 3 Bottom Database */}
                  <polygon
                    points="140,95 240,135 140,175 40,135"
                    stroke="var(--line)"
                    strokeWidth="1.5"
                    fill="var(--bg)"
                    opacity="0.9"
                  />

                  {/* Vertical coordinate connectors */}
                  <line x1="40" y1="65" x2="40" y2="135" stroke="var(--ht-blue)" strokeWidth="1" strokeDasharray="3 3" />
                  <line x1="240" y1="65" x2="240" y2="135" stroke="var(--ht-blue)" strokeWidth="1" strokeDasharray="3 3" />
                  <line x1="140" y1="105" x2="140" y2="175" stroke="var(--ht-blue)" strokeWidth="1.5" />
                  <circle cx="140" cy="105" r="3" fill="var(--ht-blue)" />
                </svg>
                <span className="font-mono text-[10px] tracking-widest text-[var(--ht-blue)] uppercase mt-2">
                  01 // FULL-STACK SPECIFICATION
                </span>
              </div>

              {/* Slot 1: Systems & Infrastructure (Nodes, Queues, Data Edges) */}
              <div
                className="absolute inset-0 flex flex-col items-center justify-center transition-all duration-300 pointer-events-none"
                style={{
                  opacity: activeIndex === 1 && !reducedMotion ? 1 : 0,
                  transform: activeIndex === 1 && !reducedMotion ? "scale(1)" : "scale(0.96)",
                }}
                aria-hidden={activeIndex !== 1}
              >
                <svg viewBox="0 0 280 180" className="w-60 h-36" fill="none">
                  {/* Gateway Node */}
                  <circle cx="50" cy="90" r="14" stroke="var(--ht-blue)" strokeWidth="1.5" fill="var(--bg)" />
                  <text x="50" y="93" fill="var(--ht-blue)" fontSize="8" fontFamily="var(--font-mono)" textAnchor="middle">GW</text>

                  {/* Routing Lines */}
                  <path d="M64,90 C100,90 100,50 140,50" stroke="var(--ht-blue)" strokeWidth="1.5" strokeDasharray="4 3" />
                  <path d="M64,90 C100,90 100,130 140,130" stroke="var(--ht-blue)" strokeWidth="1.5" strokeDasharray="4 3" />

                  {/* Worker Nodes */}
                  <rect x="140" y="38" width="45" height="24" rx="2" stroke="var(--text)" strokeWidth="1" fill="var(--surface)" />
                  <text x="162" y="53" fill="var(--text)" fontSize="8" fontFamily="var(--font-mono)" textAnchor="middle">WORKER A</text>

                  <rect x="140" y="118" width="45" height="24" rx="2" stroke="var(--text)" strokeWidth="1" fill="var(--surface)" />
                  <text x="162" y="133" fill="var(--text)" fontSize="8" fontFamily="var(--font-mono)" textAnchor="middle">WORKER B</text>

                  {/* Persistence Hub */}
                  <path d="M185,50 C210,50 210,90 230,90" stroke="var(--line)" strokeWidth="1.5" />
                  <path d="M185,130 C210,130 210,90 230,90" stroke="var(--line)" strokeWidth="1.5" />
                  <circle cx="230" cy="90" r="16" stroke="var(--ht-blue)" strokeWidth="2" fill="var(--bg)" />
                  <text x="230" y="93" fill="var(--ht-blue)" fontSize="8" fontFamily="var(--font-mono)" textAnchor="middle">DB/CACHE</text>
                </svg>
                <span className="font-mono text-[10px] tracking-widest text-[var(--ht-blue)] uppercase mt-2">
                  02 // EVENT QUEUE &amp; PERSISTENCE
                </span>
              </div>

              {/* Slot 2: Digital Experiences (Interface Slab & Tactile Gauge) */}
              <div
                className="absolute inset-0 flex flex-col items-center justify-center transition-all duration-300 pointer-events-none"
                style={{
                  opacity: activeIndex === 2 && !reducedMotion ? 1 : 0,
                  transform: activeIndex === 2 && !reducedMotion ? "scale(1)" : "scale(0.96)",
                }}
                aria-hidden={activeIndex !== 2}
              >
                <svg viewBox="0 0 280 180" className="w-56 h-36" fill="none">
                  {/* Browser Slab Frame */}
                  <rect x="35" y="25" width="210" height="130" rx="4" stroke="var(--ht-blue)" strokeWidth="1.5" fill="var(--surface)" />
                  <line x1="35" y1="48" x2="245" y2="48" stroke="var(--line)" strokeWidth="1" />
                  <circle cx="48" cy="36" r="2.5" fill="var(--ht-blue)" />
                  <circle cx="58" cy="36" r="2.5" fill="var(--text-2)" opacity="0.6" />
                  <circle cx="68" cy="36" r="2.5" fill="var(--line)" />

                  {/* Tactile Wireframe Elements */}
                  <rect x="48" y="60" width="70" height="8" rx="1" fill="var(--ht-blue)" opacity="0.8" />
                  <rect x="48" y="74" width="110" height="5" rx="1" fill="var(--line)" />
                  <rect x="48" y="83" width="90" height="5" rx="1" fill="var(--line)" />

                  {/* 60fps Gauge Box */}
                  <rect x="175" y="60" width="60" height="36" rx="2" stroke="var(--line)" fill="var(--bg)" />
                  <text x="205" y="76" fill="var(--ht-blue)" fontSize="10" fontFamily="var(--font-mono)" fontWeight="bold" textAnchor="middle">0.9s</text>
                  <text x="205" y="88" fill="var(--text-2)" fontSize="7" fontFamily="var(--font-mono)" textAnchor="middle">LCP // PROD</text>

                  {/* Cursor Indicator */}
                  <polygon points="125,105 133,122 139,116 148,124 151,121 142,113 149,110" fill="var(--ht-blue)" />
                </svg>
                <span className="font-mono text-[10px] tracking-widest text-[var(--ht-blue)] uppercase mt-2">
                  03 // SUB-SECOND CORE WEB VITALS
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Three Short Paragraphs with Focus Mechanic */}
          <div className="lg:col-span-5 lg:col-start-8 space-y-24 sm:space-y-36 pt-8 lg:pt-16 pb-12">
            {PHILOSOPHY_PARAGRAPHS.map((p, idx) => (
              <div
                key={p.id}
                ref={(el) => {
                  paraRefs.current[idx] = el;
                }}
                className="transition-all duration-300 ease-out will-change-transform"
                style={{
                  opacity: 1,
                  transform: "scale(1)",
                }}
              >
                <span className="font-mono text-xs text-[var(--ht-blue)] tracking-wider uppercase block mb-3 font-semibold">
                  {p.badge}
                </span>
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "var(--step-3)",
                    fontWeight: 600,
                    lineHeight: 1.15,
                    color: "var(--text)",
                    marginBottom: "0.75rem",
                  }}
                >
                  {p.title}
                </h3>
                <p
                  className="text-base sm:text-lg leading-relaxed text-[var(--text)] font-sans"
                  style={{ maxWidth: "34ch" }}
                >
                  {p.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
