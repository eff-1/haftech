"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { useReducedMotion } from "@/components/motion/useReducedMotion";
import { SHOWCASE_PROJECTS } from "./showcaseData";
import { ShowcaseAtmosphere } from "./ShowcaseAtmosphere";
import { ShowcaseIntro } from "./ShowcaseIntro";
import { OrbitProjectCard } from "./OrbitProjectCard";
import { ActiveProjectInformation } from "./ActiveProjectInformation";
import { ProjectNavigation } from "./ProjectNavigation";

export function ProjectShowcase() {
  const prefersReducedMotion = useReducedMotion();
  const projects = SHOWCASE_PROJECTS;
  const total = projects.length;

  const [activeIndex, setActiveIndex] = useState(0);
  const activeIndexRef = useRef(0);

  const pinStageRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const progressFillRef = useRef<HTMLDivElement | null>(null);
  const scrollProgressRef = useRef(0);
  const stRef = useRef<{ start: number; end: number } | null>(null);
  const mobileTweenRafRef = useRef<number>(0);
  const touchStartXRef = useRef<number | null>(null);
  const touchStartYRef = useRef<number | null>(null);

  // Core 3D Circular Orbit positioning math (direct DOM mutation = 0 React re-renders per frame)
  const applyOrbitLayout = useCallback(
    (progress: number) => {
      const clamped = Math.max(0, Math.min(1, progress));
      scrollProgressRef.current = clamped;

      const vw = typeof window !== "undefined" ? window.innerWidth : 1280;
      const isDesktop = vw >= 1024;
      const radius = isDesktop
        ? Math.min(580, Math.max(400, vw * 0.37))
        : Math.min(250, Math.max(170, vw * 0.52));
      const perspectivePx = isDesktop ? 1350 : 960;

      const angleStep = (Math.PI * 2) / total;
      const orbitAngle = clamped * (total - 1) * angleStep;

      for (let i = 0; i < total; i++) {
        const el = cardRefs.current[i];
        if (!el) continue;

        const theta = i * angleStep - orbitAngle;
        const cosT = Math.cos(theta);
        const sinT = Math.sin(theta);

        // Circular coordinates on horizontal 3D orbit: front card at z=0, x=0; neighbours curve backward
        const x = sinT * radius;
        const z = (cosT - 1) * radius * 0.85;
        // Smooth orbital rotation along the arc (never exceeds 90deg so no mirrored backface text)
        const rotY = -sinT * (isDesktop ? 34 : 26);

        // Depth prominence in [0, 1]
        const depth = (cosT + 1) * 0.5;
        const scale = isDesktop ? 0.66 + 0.34 * depth : 0.72 + 0.28 * depth;
        const opacity = 0.18 + 0.82 * Math.pow(depth, 1.4);

        el.style.transform = `perspective(${perspectivePx}px) translate3d(${x.toFixed(1)}px, 0px, ${z.toFixed(1)}px) rotateY(${rotY.toFixed(1)}deg) scale(${scale.toFixed(3)})`;
        el.style.opacity = opacity.toFixed(3);
        el.style.zIndex = String(Math.round(depth * 100));
        el.style.pointerEvents = depth > 0.55 ? "auto" : "none";

        // Subtle blur only on desktop receding cards, never on mobile or active card
        if (isDesktop && !prefersReducedMotion && depth < 0.86) {
          const blurPx = (1 - depth) * 2.0;
          el.style.filter = `blur(${blurPx.toFixed(2)}px)`;
        } else {
          el.style.filter = "none";
        }
      }

      if (progressFillRef.current) {
        const visualFill = Math.max(0.06, clamped);
        progressFillRef.current.style.transform = `scaleX(${visualFill.toFixed(4)})`;
      }

      const nextIdx = Math.round(clamped * (total - 1));
      if (nextIdx !== activeIndexRef.current) {
        activeIndexRef.current = nextIdx;
        setActiveIndex(nextIdx);
      }
    },
    [total, prefersReducedMotion]
  );

  // Initial layout + resize handler
  useEffect(() => {
    applyOrbitLayout(scrollProgressRef.current);

    const onResize = () => {
      applyOrbitLayout(scrollProgressRef.current);
    };
    window.addEventListener("resize", onResize, { passive: true });
    return () => window.removeEventListener("resize", onResize);
  }, [applyOrbitLayout]);

  // Desktop GSAP + ScrollTrigger pinned orbital scroll choreography
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
          end: () => `+=${Math.round(window.innerHeight * (total - 1) * 0.65)}`,
          pin: true,
          scrub: 0.75,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            applyOrbitLayout(self.progress);
          },
          onRefresh: (self) => {
            stRef.current = { start: self.start, end: self.end };
            applyOrbitLayout(self.progress);
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
  }, [prefersReducedMotion, total, applyOrbitLayout]);

  // Animate progress smoothly on mobile/touch or reduced-motion jump
  const animateToProgress = useCallback(
    (targetProgress: number) => {
      if (mobileTweenRafRef.current) {
        window.cancelAnimationFrame(mobileTweenRafRef.current);
      }

      if (prefersReducedMotion) {
        applyOrbitLayout(targetProgress);
        return;
      }

      const startProgress = scrollProgressRef.current;
      const delta = targetProgress - startProgress;
      const duration = 560;
      const startTime = performance.now();

      const step = (now: number) => {
        const t = Math.min(1, (now - startTime) / duration);
        // Cubic ease-out
        const eased = 1 - Math.pow(1 - t, 3);
        applyOrbitLayout(startProgress + delta * eased);
        if (t < 1) {
          mobileTweenRafRef.current = window.requestAnimationFrame(step);
        } else {
          mobileTweenRafRef.current = 0;
        }
      };

      mobileTweenRafRef.current = window.requestAnimationFrame(step);
    },
    [applyOrbitLayout, prefersReducedMotion]
  );

  // Cleanup mobile RAF tween on unmount
  useEffect(() => {
    return () => {
      if (mobileTweenRafRef.current) {
        window.cancelAnimationFrame(mobileTweenRafRef.current);
      }
    };
  }, []);

  // Authoritative navigation: synchronizes with desktop ScrollTrigger OR mobile tween
  const navigateToIndex = useCallback(
    (targetIdx: number) => {
      const clampedIdx = Math.max(0, Math.min(total - 1, targetIdx));
      const targetProgress = total > 1 ? clampedIdx / (total - 1) : 0;

      if (stRef.current && window.innerWidth >= 1024 && !prefersReducedMotion) {
        const targetY =
          stRef.current.start + targetProgress * (stRef.current.end - stRef.current.start);
        window.scrollTo({ top: targetY, behavior: "smooth" });
      } else {
        animateToProgress(targetProgress);
      }
    },
    [total, prefersReducedMotion, animateToProgress]
  );

  const handlePrev = useCallback(() => {
    navigateToIndex(activeIndexRef.current - 1);
  }, [navigateToIndex]);

  const handleNext = useCallback(() => {
    navigateToIndex(activeIndexRef.current + 1);
  }, [navigateToIndex]);

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

  // Natural mobile touch swipe (ignores vertical page scrolls)
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
    touchStartYRef.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null || touchStartYRef.current === null) return;
    const dx = touchStartXRef.current - e.changedTouches[0].clientX;
    const dy = touchStartYRef.current - e.changedTouches[0].clientY;
    if (Math.abs(dx) > 42 && Math.abs(dx) > Math.abs(dy) * 1.2) {
      if (dx > 0) handleNext();
      else handlePrev();
    }
    touchStartXRef.current = null;
    touchStartYRef.current = null;
  };

  const activeProject = projects[activeIndex] || projects[0];

  return (
    <section
      id="selected-work"
      aria-labelledby="showcase-h2"
      aria-roledescription="3D orbital project showcase"
      onKeyDown={handleKeyDown}
      tabIndex={0}
      className="relative bg-[#0f0f12] text-[#f1efe8] border-b border-[#26262b] focus:outline-none"
    >
      {/* 03 Section Introduction */}
      <ShowcaseIntro totalProjects={total} />

      {/* Pinned 3D Circular Orbit Stage */}
      <div
        ref={pinStageRef}
        className="relative w-full min-h-[min(100svh,880px)] lg:min-h-[100vh] flex flex-col justify-center overflow-hidden py-8 sm:py-10"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Restrained Three.js / WebGL & CSS Radial Atmosphere */}
        <ShowcaseAtmosphere
          scrollProgressRef={scrollProgressRef}
          activeAccent={activeProject.accent}
        />

        <div className="wrap relative z-10 w-full flex flex-col items-center">
          {/* 3D Perspective Orbit Viewport */}
          <div
            className="relative w-full overflow-visible"
            style={{
              height: "clamp(230px, 44vw, 430px)",
            }}
          >
            <div className="relative w-full h-full">
              {projects.map((project, index) => (
                <OrbitProjectCard
                  key={project.id}
                  ref={(el) => {
                    cardRefs.current[index] = el;
                  }}
                  project={project}
                  index={index}
                  isActive={index === activeIndex}
                  onSelect={navigateToIndex}
                />
              ))}
            </div>
          </div>

          {/* Synchronized Framer Motion Editorial Project Info Panel */}
          <ActiveProjectInformation project={activeProject} />

          {/* Custom Synchronized Navigation & Scroll Progress */}
          <ProjectNavigation
            projects={projects}
            activeIndex={activeIndex}
            progressFillRef={progressFillRef}
            onPrev={handlePrev}
            onNext={handleNext}
            onSelect={navigateToIndex}
          />
        </div>
      </div>
    </section>
  );
}
