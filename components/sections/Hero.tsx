"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import { copy } from "@/content/copy";
import { TextReveal } from "@/components/motion/TextReveal";
import { AmbientCanvas } from "@/components/motion/AmbientCanvas";
import { Magnetic } from "@/components/motion/Magnetic";
import { TiltCard } from "@/components/motion/TiltCard";
import { ScrambleText } from "@/components/motion/ScrambleText";
import { ArrowUpRight, Cpu, Layers, Terminal, Sparkles, Volume2, VolumeX } from "lucide-react";
import { useState } from "react";

export function Hero() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.9;
    }
  }, []);

  return (
    <section
      className="relative overflow-hidden border-b border-line bg-[var(--bg)]"
      style={{ paddingBlock: "var(--s-7) var(--s-9)" }}
      aria-labelledby="hero-h1"
    >
      {/* Interactive ambient grid and spotlight cursor follower */}
      <AmbientCanvas />

      {/* Industrial corner HUD crosshairs */}
      <div className="pointer-events-none absolute top-4 left-6 hidden md:block font-mono text-[10px] text-[var(--text-2)] tracking-widest opacity-60">
        [ SYS // HAFTECH_PROD_KERNEL ]
      </div>
      <div className="pointer-events-none absolute top-4 right-6 hidden md:block font-mono text-[10px] text-[var(--text-2)] tracking-widest opacity-60">
        [ COORDINATES: 06°30&apos;N 03°23&apos;E ]
      </div>

      <div className="wrap relative z-10">
        <div className="grid gap-12 lg:grid-cols-12 items-center">
          {/* Left Column: Monumental Editorial Typography */}
          <div className="lg:col-span-7 xl:col-span-7">
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
              className="mt-6 text-[var(--text-2)] leading-relaxed text-base md:text-lg"
              style={{
                maxWidth: "52ch",
              }}
            >
              {copy.hero.support}
            </p>

            {/* Interactive Magnetic CTAs */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Magnetic strength={0.25}>
                <Link
                  href="/contact"
                  className="btn text-xs md:text-sm font-mono tracking-wider uppercase shadow-md transition-all hover:shadow-lg"
                  style={{ minHeight: 48, paddingInline: "var(--s-5)" }}
                >
                  <span>Initiate Engagement</span>
                  <ArrowUpRight className="ml-2 h-4 w-4" />
                </Link>
              </Magnetic>

              <Magnetic strength={0.2}>
                <Link
                  href="#verticals"
                  className="btn btn-secondary text-xs md:text-sm font-mono tracking-wider uppercase transition-all"
                  style={{ minHeight: 48, paddingInline: "var(--s-5)" }}
                >
                  <span>Inspect Systems</span>
                  <Layers className="ml-2 h-4 w-4 text-[var(--accent)]" />
                </Link>
              </Magnetic>
            </div>

            {/* Founder attribution footer */}
            <div className="mt-10 flex flex-wrap items-center gap-3 pt-6 border-t border-line/60 text-xs text-[var(--text-2)] font-mono">
              <span className="label text-[11px]">FOUNDED BY</span>
              <Link
                href="/founder"
                className="text-[var(--text)] font-semibold hover:text-[var(--accent)] underline underline-offset-4"
              >
                {copy.founderName}
              </Link>
              <span className="text-line">•</span>
              <span>SYSTEMS & FULL-STACK ENGINEERING</span>
            </div>
          </div>

          {/* Right Column: High-End Cinematic Monolith Video Frame */}
          <div className="lg:col-span-5 xl:col-span-5">
            <TiltCard
              maxTilt={6}
              perspective={1400}
              className="relative rounded-sm border border-line bg-surface/90 p-3 shadow-2xl backdrop-blur-md overflow-hidden"
            >
              {/* Terminal HUD Header */}
              <div className="flex items-center justify-between border-b border-line px-3 py-2 text-xs font-mono">
                <div className="flex items-center gap-2">
                  <Terminal className="h-3.5 w-3.5 text-[var(--accent)]" />
                  <span className="text-[11px] font-semibold tracking-wider text-[var(--text)] uppercase">
                    Core Monolith // v2.6
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="inline-flex items-center gap-1 font-mono text-[10px] text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    <Sparkles className="h-2.5 w-2.5 animate-pulse" />
                    LIVE RENDER
                  </span>
                </div>
              </div>

              {/* Looping High-Tech Video Screen */}
              <div className="relative aspect-4/5 w-full overflow-hidden rounded-xs bg-black my-2 border border-line/50 group">
                <video
                  ref={videoRef}
                  src="/videos/hero-monolith.mp4"
                  autoPlay
                  loop
                  muted={isMuted}
                  playsInline
                  className="h-full w-full object-cover opacity-95 transition-transform duration-700 group-hover:scale-105"
                />

                {/* Subtle Scanline Overlay */}
                <div
                  className="pointer-events-none absolute inset-0 opacity-15"
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 0, 0, 0.4) 3px, rgba(0, 0, 0, 0.4) 4px)",
                  }}
                  aria-hidden="true"
                />

                {/* Corner Industrial Brackets */}
                <span className="pointer-events-none absolute top-2 left-2 font-mono text-[9px] text-white/50 tracking-tighter">
                  ┌ [MONOLITH_01]
                </span>
                <span className="pointer-events-none absolute top-2 right-2 font-mono text-[9px] text-white/50 tracking-tighter">
                  [ORBIT] ┐
                </span>
                <span className="pointer-events-none absolute bottom-2 left-2 font-mono text-[9px] text-white/50 tracking-tighter">
                  └ [60_FPS]
                </span>
                <span className="pointer-events-none absolute bottom-2 right-2 font-mono text-[9px] text-white/50 tracking-tighter">
                  [STABLE] ┘
                </span>

                {/* Audio Toggle (Optional) */}
                <button
                  type="button"
                  onClick={() => setIsMuted(!isMuted)}
                  className="absolute bottom-3 right-3 h-7 w-7 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white/80 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                  aria-label={isMuted ? "Unmute video" : "Mute video"}
                >
                  {isMuted ? <VolumeX className="h-3.5 w-3.5" /> : <Volume2 className="h-3.5 w-3.5" />}
                </button>
              </div>

              {/* Live Telemetry Ticker Below Video */}
              <div className="p-2 space-y-2 font-mono text-xs">
                <div className="flex justify-between items-center text-[10px] text-[var(--text-2)] border-b border-line/40 pb-1.5">
                  <span>ARCHITECTURE</span>
                  <span className="text-[var(--text)] font-semibold">EVENT-DRIVEN & EDGE</span>
                </div>
                <div className="flex justify-between items-center text-[10px] text-[var(--text-2)] border-b border-line/40 pb-1.5">
                  <span>DISCIPLINE</span>
                  <span className="text-[var(--accent)] font-semibold">MISSION-CRITICAL BACKENDS</span>
                </div>
                <div className="flex justify-between items-center text-[10px] text-[var(--text-2)]">
                  <span>PERFORMANCE</span>
                  <span className="text-emerald-600 font-semibold">&lt; 70ms GLOBAL TTFB</span>
                </div>
              </div>
            </TiltCard>
          </div>
        </div>
      </div>
    </section>
  );
}
