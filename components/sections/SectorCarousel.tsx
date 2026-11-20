"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { useReducedMotion } from "@/components/motion/useReducedMotion";
import { SectionStrip } from "@/components/ui/SectionStrip";

export interface SectorPlate {
  sector: string;
  example: string;
  slug: string;
  image: string;
  tagline: string;
  summary: string;
  stack: string[];
  metrics: { label: string; value: string }[];
  liveUrl?: string;
}

const SECTOR_PLATES: SectorPlate[] = [
  {
    sector: "Commerce",
    example: "Jimmarof",
    slug: "jimmarof",
    image: "/media/sector-commerce.jpg",
    tagline: "Automated multi-vendor catalog and localized payment reconciliation.",
    summary:
      "High-throughput commerce engine built with localized checkout integrations, automated vendor splits, and inventory synchronization.",
    stack: ["PHP & MySQL", "Paystack", "Flutterwave", "REST APIs"],
    metrics: [
      { label: "GATEWAY", value: "Paystack + Flutterwave" },
      { label: "CATALOG", value: "Multi-Vendor" },
      { label: "UPTIME", value: "99.9%" },
    ],
    liveUrl: "https://jimmarof.com",
  },
  {
    sector: "Software",
    example: "Axiora",
    slug: "axiora",
    image: "/media/sector-software.jpg",
    tagline: "Integrated business OS consolidating CRM, billing, and autonomous queues.",
    summary:
      "Event-driven operations command center coordinating customer data, invoice dispatch, and automated ledger updates under verified RBAC.",
    stack: ["Next.js App Router", "PostgreSQL", "Resend API", "TypeScript"],
    metrics: [
      { label: "MODULES", value: "CRM + Invoicing + HR" },
      { label: "DATABASE", value: "PostgreSQL" },
      { label: "ARCHITECTURE", value: "Event-Driven" },
    ],
    liveUrl: "https://axiora-dusky.vercel.app",
  },
  {
    sector: "Education",
    example: "Cahootz",
    slug: "cahootz",
    image: "/media/sector-education.jpg",
    tagline: "Collaborative learning architecture with low-latency media delivery.",
    summary:
      "Interactive educational platform delivering structured course modules, peer evaluations, and responsive assessment pipelines.",
    stack: ["React", "Node.js", "Redis Cache", "Tailwind CSS"],
    metrics: [
      { label: "WORKFLOW", value: "Cohort Learning" },
      { label: "DELIVERY", value: "Low-Latency" },
      { label: "DEVICE SUPPORT", value: "Mobile-First" },
    ],
    liveUrl: "https://cahootz.net",
  },
  {
    sector: "Web3",
    example: "BUILDRIFT",
    slug: "buildrift",
    image: "/media/sector-web3.jpg",
    tagline: "Decentralized state verification and cryptographic asset pipelines.",
    summary:
      "Web3 developer hub and asset tracking platform interfacing with EVM smart contracts and cryptographic wallet signing protocols.",
    stack: ["TypeScript", "Ethers.js", "Next.js", "Web3 APIs"],
    metrics: [
      { label: "PROTOCOL", value: "EVM / Smart Contracts" },
      { label: "INTEGRATION", value: "Web3 RPC" },
      { label: "VALIDATION", value: "Cryptographic" },
    ],
  },
  {
    sector: "Community",
    example: "WahalaCheck",
    slug: "wahalacheck",
    image: "/media/sector-community.jpg",
    tagline: "Civic verification network and distributed report validation.",
    summary:
      "Civic intelligence platform verifying community-submitted reports with cryptographic timestamps and localized geotagging.",
    stack: ["Next.js", "Supabase", "Edge Functions", "Tailwind CSS"],
    metrics: [
      { label: "PIPELINE", value: "Civic Verification" },
      { label: "RESPONSE", value: "Edge-Routed" },
      { label: "MODERATION", value: "Automated Audit" },
    ],
    liveUrl: "https://wahalacheck.com",
  },
];

export function SectorCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const touchStartX = useRef<number | null>(null);
  const reducedMotion = useReducedMotion();

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : SECTOR_PLATES.length - 1));
  }, []);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev < SECTOR_PLATES.length - 1 ? prev + 1 : 0));
  }, []);

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      handlePrev();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      handleNext();
    }
  };

  // Touch swipe support
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) handleNext();
      else handlePrev();
    }
    touchStartX.current = null;
  };

  const activePlate = SECTOR_PLATES[activeIndex];

  return (
    <section
      className="relative border-b border-[#26262b] bg-[#121214] text-[#f1efe8] py-16 sm:py-24 overflow-hidden"
      aria-roledescription="carousel"
      aria-label="Systems engineered by sector"
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      {/* Background Architectural Grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-15"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.08) 1px, transparent 1px)",
          backgroundSize: " clamp(32px, 5vw, 64px) clamp(32px, 5vw, 64px)",
        }}
        aria-hidden="true"
      />

      <div className="wrap relative z-10 w-full">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-[#26262b] pb-6 gap-4">
          <div>
            <SectionStrip n="03" name="Systems by Sector" />
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "var(--step-5)",
                fontWeight: 600,
                lineHeight: 1.05,
                letterSpacing: "-0.025em",
                color: "#f1efe8",
                marginTop: "0.5rem",
              }}
            >
              Systems engineered by sector
            </h2>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-[#a0a0a5]">
              0{activeIndex + 1} / 0{SECTOR_PLATES.length}
            </span>
            <div className="flex items-center gap-1.5 ml-2">
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous sector plate"
                className="flex h-9 w-9 items-center justify-center rounded-xs border border-[#333338] bg-[#1a1a1e] text-[#f1efe8] hover:border-[var(--ht-blue)] hover:text-[var(--ht-blue)] transition-colors focus-visible:outline-2 focus-visible:outline-[var(--ht-blue)]"
              >
                ←
              </button>
              <button
                type="button"
                onClick={handleNext}
                aria-label="Next sector plate"
                className="flex h-9 w-9 items-center justify-center rounded-xs border border-[#333338] bg-[#1a1a1e] text-[#f1efe8] hover:border-[var(--ht-blue)] hover:text-[var(--ht-blue)] transition-colors focus-visible:outline-2 focus-visible:outline-[var(--ht-blue)]"
              >
                →
              </button>
            </div>
          </div>
        </div>

        {/* FOCAL LENS CAROUSEL STAGE */}
        <div
          ref={containerRef}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className="relative mt-8 sm:mt-12 w-full flex flex-col items-center select-none overflow-hidden"
        >
          {/* Plates Track */}
          <div className="relative w-full h-[320px] sm:h-[400px] md:h-[460px] flex items-center justify-center overflow-hidden">
            {SECTOR_PLATES.map((plate, index) => {
              const diff = index - activeIndex;
              const isActive = diff === 0;
              const isPrev = diff === -1 || (activeIndex === 0 && index === SECTOR_PLATES.length - 1);
              const isNext = diff === 1 || (activeIndex === SECTOR_PLATES.length - 1 && index === 0);
              const isVisible = isActive || isPrev || isNext;

              if (!isVisible) return null;

              // Positioning transform for lens depth effect
              let translateX = "0%";
              let scale = 1;
              let opacity = 1;
              let zIndex = 30;

              if (isPrev) {
                translateX = "-75%";
                scale = 0.82;
                opacity = 0.45;
                zIndex = 20;
              } else if (isNext) {
                translateX = "75%";
                scale = 0.82;
                opacity = 0.45;
                zIndex = 20;
              }

              return (
                <div
                  key={plate.slug}
                  onClick={() => setActiveIndex(index)}
                  className={`absolute w-[88%] sm:w-[580px] md:w-[680px] h-[300px] sm:h-[380px] md:h-[430px] rounded border border-[#2d2d33] bg-[#17171b] shadow-2xl overflow-hidden cursor-pointer transition-all duration-450 ease-out will-change-transform ${
                    !isActive ? "hidden sm:block" : "block"
                  }`}
                  style={{
                    transform: reducedMotion ? "none" : `translateX(${translateX}) scale(${scale})`,
                    opacity: reducedMotion ? (isActive ? 1 : 0) : opacity,
                    zIndex: isActive ? 35 : zIndex,
                    filter: !isActive && !reducedMotion ? "brightness(0.7)" : "none",
                  }}
                  aria-hidden={!isActive}
                >
                  {/* Plate Media (Architect Model Bench Image) */}
                  <div className="relative w-full h-full overflow-hidden">
                    <Image
                      src={plate.image}
                      alt={`Sector: ${plate.sector} · Example: ${plate.example}`}
                      fill
                      sizes="(max-width: 640px) 90vw, 680px"
                      className="object-cover transition-transform duration-700 ease-out"
                      priority={index === 0}
                    />

                    {/* Architectural Overlay & Drafting Annotation */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#121214] via-[#121214]/40 to-transparent pointer-events-none" />

                    {/* Architectural Plate Header Strip */}
                    <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10 pointer-events-none">
                      <span className="font-mono text-[10px] sm:text-xs text-[#f1efe8] bg-[#121214]/85 border border-[#333338] px-2.5 py-1 rounded-xs uppercase tracking-wider backdrop-blur-xs">
                        Sector: {plate.sector} · Example: {plate.example}
                      </span>
                      <span className="font-mono text-[10px] text-[var(--ht-blue)] bg-[#121214]/85 border border-[#333338] px-2 py-1 rounded-xs font-semibold backdrop-blur-xs">
                        SPEC // 0{index + 1}
                      </span>
                    </div>

                    {/* Bottom Floating Tagline on Plate (<= 25 words) */}
                    <div className="absolute bottom-4 left-4 right-4 z-10">
                      <p className="font-mono text-xs sm:text-sm text-[#f1efe8] font-medium leading-snug drop-shadow-md">
                        {plate.tagline}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Dot Indicator Strip with Accessible Tap Targets */}
          <div className="flex items-center gap-1 mt-6" role="tablist" aria-label="Sector plates navigation">
            {SECTOR_PLATES.map((p, i) => (
              <button
                key={p.slug}
                role="tab"
                aria-selected={i === activeIndex}
                aria-label={`Jump to sector: ${p.sector}`}
                onClick={() => setActiveIndex(i)}
                className="flex items-center justify-center p-3 cursor-pointer focus-visible:outline-2 focus-visible:outline-[var(--ht-blue)]"
              >
                <span
                  className="h-2 rounded-full transition-all duration-300 block"
                  style={{
                    width: i === activeIndex ? "28px" : "8px",
                    backgroundColor: i === activeIndex ? "var(--ht-blue)" : "#484852",
                  }}
                />
              </button>
            ))}
          </div>

          {/* ACTIVE PLATE EXPANDED DETAILS (Accessible Breakdown) */}
          <div className="w-full mt-8 p-6 sm:p-8 rounded border border-[#26262b] bg-[#17171b] shadow-md">
            <div className="grid gap-6 md:grid-cols-12 items-start">
              <div className="md:col-span-7 space-y-3">
                <div className="flex items-center gap-3">
                  <span className="h-2 w-2 rounded-full bg-[var(--ht-blue)]" />
                  <span className="font-mono text-xs text-[#a0a0a5] tracking-widest uppercase">
                    SECTOR // {activePlate.sector}
                  </span>
                </div>
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "var(--step-3)",
                    fontWeight: 600,
                    color: "#f1efe8",
                  }}
                >
                  {activePlate.example}
                </h3>
                <p className="font-sans text-sm sm:text-base text-[#c4c4ca] leading-relaxed">
                  {activePlate.summary}
                </p>

                {/* Tech Stack Pills */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {activePlate.stack.map((tech) => (
                    <span
                      key={tech}
                      className="font-mono text-[11px] text-[#a0a0a5] border border-[#2d2d33] bg-[#121214] px-2.5 py-1 rounded-xs"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Metrics Column & Case Study Link */}
              <div className="md:col-span-5 flex flex-col justify-between h-full pt-2 md:pt-0 border-t md:border-t-0 md:border-l border-[#26262b] md:pl-6 space-y-4">
                <div className="space-y-2.5">
                  <span className="font-mono text-[10px] text-[#a0a0a5] tracking-wider uppercase block">
                    VERIFIED BENCHMARKS
                  </span>
                  {activePlate.metrics.map((m, i) => (
                    <div key={i} className="flex justify-between items-center text-xs font-mono border-b border-[#26262b]/60 pb-1.5">
                      <span className="text-[#88888f]">{m.label}</span>
                      <span className="text-[#f1efe8] font-semibold">{m.value}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-2 flex items-center gap-3">
                  <Link
                    href={`/work/${activePlate.slug}`}
                    className="inline-flex items-center gap-2 font-mono text-xs text-[#121214] bg-[#f1efe8] hover:bg-white px-4 py-2 rounded-xs font-semibold transition-colors"
                  >
                    <span>Read case study</span>
                    <span>→</span>
                  </Link>

                  {activePlate.liveUrl && (
                    <a
                      href={activePlate.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 font-mono text-xs border border-[#3e3e46] px-3.5 py-2 rounded-xs transition-colors hover:bg-[#2c2c34]"
                      style={{ color: "#f1efe8", backgroundColor: "#222228" }}
                    >
                      <span style={{ color: "#f1efe8" }}>Live site</span>
                      <span style={{ color: "#f1efe8" }}>↗</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
