"use client";

import Link from "next/link";
import { copy } from "@/content/copy";
import { TextReveal } from "@/components/motion/TextReveal";
import { AmbientCanvas } from "@/components/motion/AmbientCanvas";
import { Magnetic } from "@/components/motion/Magnetic";
import { TiltCard } from "@/components/motion/TiltCard";
import { ScrambleText } from "@/components/motion/ScrambleText";
import { Activity, ArrowUpRight, Cpu, Layers, ShieldCheck, Terminal } from "lucide-react";

export function Hero() {
  return (
    <section
      className="relative overflow-hidden border-b border-line bg-[var(--bg)]"
      style={{ paddingBlock: "var(--s-7) var(--s-8)" }}
      aria-labelledby="hero-h1"
    >
      {/* Interactive ambient grid and spotlight cursor follower */}
      <AmbientCanvas />

      <div className="wrap relative z-10">
        <div className="grid gap-12 lg:grid-cols-12 items-center">
          {/* Left Column: Headlines & High-Impact Typography */}
          <div className="lg:col-span-7 xl:col-span-8">
            {/* Live studio status pill */}
            <div className="inline-flex items-center gap-2.5 rounded-full border border-line bg-surface/90 px-3.5 py-1.5 text-xs shadow-xs backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
              </span>
              <span className="label text-[11px] font-mono tracking-wider">
                <ScrambleText text="ACTIVE · ACCEPTING Q1/Q2 BUILDS" />
              </span>
              <span className="text-[var(--text-2)]">|</span>
              <span className="text-[11px] text-[var(--text-2)] font-mono">
                FOUNDER-LED STUDIO
              </span>
            </div>

            {/* Main Title */}
            <TextReveal
              lines={copy.hero.h1}
              as="h1"
              id="hero-h1"
              isHero={true}
              style={{
                fontSize: "var(--step-6)",
                fontWeight: 700,
                lineHeight: 1.02,
                marginTop: "var(--s-4)",
                letterSpacing: "-0.03em",
              }}
            />

            {/* Supporting Copy */}
            <p
              className="mt-6 text-[var(--text-2)] leading-relaxed"
              style={{
                fontSize: "var(--step-1)",
                maxWidth: "54ch",
              }}
            >
              {copy.hero.support}
            </p>

            {/* Interactive Magnetic CTAs */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Magnetic strength={0.25}>
                <Link
                  href="/contact"
                  className="btn text-sm font-medium shadow-sm transition-all hover:shadow-md"
                  style={{ minHeight: 48, paddingInline: "var(--s-5)" }}
                >
                  Start an Engagement
                  <ArrowUpRight className="ml-2 h-4 w-4" />
                </Link>
              </Magnetic>

              <Magnetic strength={0.2}>
                <Link
                  href="#verticals"
                  className="btn btn-secondary text-sm font-medium transition-all"
                  style={{ minHeight: 48, paddingInline: "var(--s-5)" }}
                >
                  Inspect Systems
                  <Layers className="ml-2 h-4 w-4 text-[var(--accent)]" />
                </Link>
              </Magnetic>
            </div>

            {/* Founder attribution footer */}
            <div className="mt-8 flex items-center gap-3 pt-6 border-t border-line/60 text-xs text-[var(--text-2)] font-mono">
              <span className="label text-[11px]">FOUNDED BY</span>
              <Link
                href="/founder"
                className="text-[var(--text)] font-semibold hover:text-[var(--accent)] underline underline-offset-4"
              >
                {copy.founderName}
              </Link>
              <span className="text-line">•</span>
              <span>FULL-STACK & SYSTEMS ENGINEERING</span>
            </div>
          </div>

          {/* Right Column: 3D Interactive System Kernel Card */}
          <div className="lg:col-span-5 xl:col-span-4">
            <TiltCard
              maxTilt={8}
              perspective={1200}
              className="border border-line bg-surface/95 p-6 shadow-xl backdrop-blur-md rounded-sm"
            >
              {/* Card Header */}
              <div className="flex items-center justify-between border-b border-line pb-4">
                <div className="flex items-center gap-2">
                  <Terminal className="h-4 w-4 text-[var(--accent)]" />
                  <span className="font-mono text-xs font-semibold tracking-wider uppercase text-[var(--text)]">
                    Kernel Telemetry
                  </span>
                </div>
                <span className="inline-flex items-center gap-1 font-mono text-[10px] text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  <Activity className="h-3 w-3 animate-pulse" />
                  99.99% UP
                </span>
              </div>

              {/* Graphic Circuit Animation / Blueprint Visualization */}
              <div className="my-5 relative h-36 w-full rounded bg-[var(--bg)] border border-line/80 overflow-hidden flex flex-col justify-between p-3.5 font-mono text-[11px]">
                <div className="flex justify-between items-center text-[10px] text-[var(--text-2)]">
                  <span>RUNTIME: NODE & EDGE</span>
                  <span className="text-[var(--accent)] font-semibold">GLOBAL ROUTING</span>
                </div>

                {/* Animated visual SVG traces */}
                <div className="relative my-auto flex items-center justify-between px-2">
                  <div className="flex flex-col items-center gap-1">
                    <div className="h-7 w-7 rounded border border-line bg-surface flex items-center justify-center shadow-xs">
                      <Cpu className="h-3.5 w-3.5 text-[var(--accent)]" />
                    </div>
                    <span className="text-[9px] text-[var(--text-2)]">CLIENT</span>
                  </div>

                  <div className="flex-1 h-[2px] bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent relative mx-2">
                    <div className="absolute top-[-3px] left-1/2 -translate-x-1/2 h-2 w-2 rounded-full bg-[var(--accent)] animate-ping" />
                  </div>

                  <div className="flex flex-col items-center gap-1">
                    <div className="h-7 w-7 rounded border border-line bg-surface flex items-center justify-center shadow-xs">
                      <Layers className="h-3.5 w-3.5 text-[var(--accent)]" />
                    </div>
                    <span className="text-[9px] text-[var(--text-2)]">GATEWAY</span>
                  </div>

                  <div className="flex-1 h-[2px] bg-gradient-to-r from-transparent via-emerald-500 to-transparent relative mx-2">
                    <div className="absolute top-[-3px] left-1/2 -translate-x-1/2 h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
                  </div>

                  <div className="flex flex-col items-center gap-1">
                    <div className="h-7 w-7 rounded border border-line bg-surface flex items-center justify-center shadow-xs">
                      <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
                    </div>
                    <span className="text-[9px] text-[var(--text-2)]">DATABASE</span>
                  </div>
                </div>

                <div className="flex justify-between items-center text-[10px] text-[var(--text-2)] pt-2 border-t border-line/40">
                  <span>TTFB: &lt; 90ms</span>
                  <span>CACHE HIT: 98.4%</span>
                </div>
              </div>

              {/* Architecture Core Metrics */}
              <div className="space-y-2.5 text-xs">
                <div className="flex justify-between items-center py-1 border-b border-line/40">
                  <span className="text-[var(--text-2)]">Engineering Discipline</span>
                  <span className="font-mono font-medium text-[var(--text)]">Direct Senior Oversight</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-line/40">
                  <span className="text-[var(--text-2)]">Core Deliverables</span>
                  <span className="font-mono font-medium text-[var(--text)]">Web, APIs, Automations</span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-[var(--text-2)]">Performance Budget</span>
                  <span className="font-mono font-medium text-[var(--accent)]">0 Layout Shift / 100 A11y</span>
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-line">
                <Link
                  href="/services"
                  className="flex items-center justify-between text-xs font-mono text-[var(--accent)] hover:underline"
                >
                  <span>Explore Capabilities Matrix</span>
                  <span>→</span>
                </Link>
              </div>
            </TiltCard>
          </div>
        </div>
      </div>
    </section>
  );
}
