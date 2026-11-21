"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useReducedMotion } from "@/components/motion/useReducedMotion";
import { SHOWCASE_PROJECTS } from "./showcaseData";
import { ShowcaseIntro } from "./ShowcaseIntro";
import { CurvedCylinderStage } from "./CurvedCylinderStage";
import { ActiveProjectInformation } from "./ActiveProjectInformation";

export function ProjectShowcase() {
  const prefersReducedMotion = useReducedMotion();
  const projects = SHOWCASE_PROJECTS;
  const total = projects.length;
  const angleStep = (Math.PI * 2) / total;
  const maxAngle = (total - 1) * angleStep;

  const [activeIndex, setActiveIndex] = useState(0);
  const activeIndexRef = useRef(0);

  const pinStageRef = useRef<HTMLDivElement | null>(null);
  const angleRef = useRef(0);
  const progressFillRef = useRef<HTMLDivElement | null>(null);
  const stRef = useRef<{ start: number; end: number } | null>(null);

  const syncFromAngle = useCallback(
    (nextAngle: number) => {
      const clamped = Math.max(0, Math.min(maxAngle, nextAngle));
      angleRef.current = clamped;

      const progress = maxAngle > 0 ? clamped / maxAngle : 0;
      if (progressFillRef.current) {
        progressFillRef.current.style.transform = `scaleX(${Math.max(0.04, progress).toFixed(4)})`;
      }

      const nextIdx = Math.round(progress * (total - 1));
      if (nextIdx !== activeIndexRef.current) {
        activeIndexRef.current = nextIdx;
        setActiveIndex(nextIdx);
      }
    },
    [maxAngle, total]
  );

  // Desktop GSAP + ScrollTrigger pinned vertical-to-rotational cylinder scrub
  useEffect(() => {
    if (prefersReducedMotion) return;
    if (typeof window === "undefined") return;

    const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
    if (!isDesktop) return;

    const pinEl = pinStageRef.current;
    if (!pinEl) return;

    let cancelled = false;
    let stInstance: { kill: () => void; start: number; end: number } | null = null;

    Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(
      ([{ gsap }, { ScrollTrigger }]) => {
        if (cancelled || !pinEl) return;
        gsap.registerPlugin(ScrollTrigger);

        const st = ScrollTrigger.create({
          trigger: pinEl,
          start: "top top",
          end: () => `+=${Math.round(window.innerHeight * (total - 1) * 0.62)}`,
          pin: true,
          scrub: 0.65,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            syncFromAngle(self.progress * maxAngle);
          },
          onRefresh: (self) => {
            stRef.current = { start: self.start, end: self.end };
            syncFromAngle(self.progress * maxAngle);
          },
        });

        stInstance = st;
        stRef.current = { start: st.start, end: st.end };
      }
    );

    return () => {
      cancelled = true;
      stRef.current = null;
      if (stInstance) stInstance.kill();
    };
  }, [prefersReducedMotion, total, maxAngle, syncFromAngle]);

  // Authoritative navigation: syncs with desktop ScrollTrigger OR smoothly targets cylinder angle on mobile
  const navigateToIndex = useCallback(
    (targetIdx: number) => {
      const wrappedIdx = ((targetIdx % total) + total) % total;
      const targetProgress = total > 1 ? wrappedIdx / (total - 1) : 0;

      if (stRef.current && window.innerWidth >= 1024 && !prefersReducedMotion) {
        const targetY =
          stRef.current.start + targetProgress * (stRef.current.end - stRef.current.start);
        window.scrollTo({ top: targetY, behavior: "smooth" });
      } else {
        syncFromAngle(wrappedIdx * angleStep);
      }
    },
    [total, angleStep, prefersReducedMotion, syncFromAngle]
  );

  const handlePrev = useCallback(() => {
    navigateToIndex(activeIndexRef.current - 1);
  }, [navigateToIndex]);

  const handleNext = useCallback(() => {
    navigateToIndex(activeIndexRef.current + 1);
  }, [navigateToIndex]);

  // Continuous pointer/touch drag on the 3D cylinder
  const handleDragDelta = useCallback(
    (deltaRad: number) => {
      if (stRef.current && window.innerWidth >= 1024 && !prefersReducedMotion) {
        const scrollSpan = stRef.current.end - stRef.current.start;
        const deltaY = (deltaRad / maxAngle) * scrollSpan;
        window.scrollBy({ top: deltaY, behavior: "instant" as ScrollBehavior });
      } else {
        syncFromAngle(angleRef.current + deltaRad);
      }
    },
    [maxAngle, prefersReducedMotion, syncFromAngle]
  );

  // Snap gently to nearest curved panel on drag release (mobile/touch)
  const handleDragEnd = useCallback(() => {
    if (window.innerWidth < 1024 || prefersReducedMotion) {
      const nearest = Math.round(angleRef.current / angleStep);
      syncFromAngle(nearest * angleStep);
    }
  }, [angleStep, prefersReducedMotion, syncFromAngle]);

  // Keyboard accessibility
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      handlePrev();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      handleNext();
    }
  };

  const activeProject = projects[activeIndex] || projects[0];

  return (
    <section
      id="selected-work"
      aria-labelledby="showcase-h2"
      aria-roledescription="3D curved cylindrical project showcase"
      onKeyDown={handleKeyDown}
      tabIndex={0}
      className="relative bg-[#151715] text-[#f1efe8] border-b border-[#252825] focus:outline-none"
    >
      {/* 03 Section Introduction */}
      <ShowcaseIntro totalProjects={total} />

      {/* Pinned 3D Curved Cylinder Showcase Stage */}
      <div
        ref={pinStageRef}
        className="relative w-full min-h-[min(100svh,860px)] lg:min-h-[100vh] flex flex-col justify-between overflow-hidden pt-4 pb-8 sm:pt-8 sm:pb-10"
      >
        {/* Subtle studio radial backdrop glow */}
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden="true"
          style={{
            background:
              "radial-gradient(ellipse 65% 48% at 50% 38%, rgba(255,255,255,0.045) 0%, rgba(21,23,21,0) 70%)",
          }}
        />

        {/* Curved Three.js WebGL Cylinder + Edge Circular Arrows */}
        <div className="relative w-full flex items-center justify-center flex-1">
          <CurvedCylinderStage
            projects={projects}
            angleRef={angleRef}
            activeIndex={activeIndex}
            onSelectIndex={navigateToIndex}
            onDragDelta={handleDragDelta}
            onDragEnd={handleDragEnd}
          />

          {/* Left Edge Circular Chevron Button */}
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous project"
            className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 bg-[#0e100e]/80 border border-white/15 text-[#f1efe8] hover:border-white/45 hover:bg-[#1a1d1a] transition-colors cursor-pointer backdrop-blur-xs focus-visible:outline-2 focus-visible:outline-[#60a5fa]"
            style={{ borderRadius: "9999px" }}
          >
            <ChevronLeft className="w-5 h-5" aria-hidden="true" />
          </button>

          {/* Right Edge Circular Chevron Button */}
          <button
            type="button"
            onClick={handleNext}
            aria-label="Next project"
            className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 bg-[#0e100e]/80 border border-white/15 text-[#f1efe8] hover:border-white/45 hover:bg-[#1a1d1a] transition-colors cursor-pointer backdrop-blur-xs focus-visible:outline-2 focus-visible:outline-[#60a5fa]"
            style={{ borderRadius: "9999px" }}
          >
            <ChevronRight className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        {/* Centered Editorial Info + Subtle Right-Aligned Next Cue */}
        <div className="relative z-10 w-full pb-4">
          <ActiveProjectInformation project={activeProject} />

          {/* Subtle right-aligned Next trigger (desktop, matching reference) */}
          <button
            type="button"
            onClick={handleNext}
            aria-label="Next"
            className="hidden lg:inline-flex items-center font-mono text-xs tracking-wider text-[#9a9c98] hover:text-[#f1efe8] transition-colors cursor-pointer absolute right-8 top-1/2 -translate-y-1/2 px-2 py-2 focus-visible:outline-2 focus-visible:outline-[#60a5fa]"
            style={{ minHeight: 44 }}
          >
            Next
          </button>
        </div>

        {/* Full-Width Minimal Bottom Progress Bar */}
        <div
          className="absolute bottom-0 left-0 right-0 h-[3px] bg-white/10 overflow-hidden"
          aria-hidden="true"
        >
          <div
            ref={progressFillRef}
            className="h-full w-full origin-left bg-[#e6e7e4]"
            style={{
              transform: `scaleX(${Math.max(0.04, total > 1 ? activeIndex / (total - 1) : 1)})`,
            }}
          />
        </div>
      </div>
    </section>
  );
}
