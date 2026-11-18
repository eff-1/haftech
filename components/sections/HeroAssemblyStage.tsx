"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/components/motion/useReducedMotion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const LAYERS = [
  { id: "ui", label: "01 // UI & STATE", desc: "Design System & React Runtime", startY: -110 },
  { id: "api", label: "02 // API ROUTING", desc: "REST & Serialization Contracts", startY: -55 },
  { id: "auth", label: "03 // IDENTITY & RBAC", desc: "JWT & Access Control Rules", startY: 0 },
  { id: "logic", label: "04 // DOMAIN LOGIC", desc: "Workflow Engines & Workers", startY: 55 },
  { id: "db", label: "05 // DATA PERSISTENCE", desc: "PostgreSQL & Redis Cache", startY: 110 },
];

export function HeroAssemblyStage() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const stackRef = useRef<HTMLDivElement | null>(null);
  const slabRef = useRef<HTMLDivElement | null>(null);
  const layersRef = useRef<(HTMLDivElement | null)[]>([]);
  const connectorsRef = useRef<SVGLineElement | null>(null);
  const railExitRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);
  const reducedMotion = useReducedMotion();

  // Lazy-load ambient video only on desktop after window idle, never on mobile / Save-Data
  useEffect(() => {
    if (typeof window === "undefined" || reducedMotion) return;

    // Mobile / small tablet: do not load ambient video
    if (window.innerWidth < 1024) return;

    // Check navigator connection
    const nav = navigator as unknown as { connection?: { saveData?: boolean; effectiveType?: string } };
    if (nav.connection?.saveData || nav.connection?.effectiveType === "2g" || nav.connection?.effectiveType === "3g") {
      return;
    }

    const onLoad = () => {
      if ("requestIdleCallback" in window) {
        (window as Window & { requestIdleCallback: (cb: () => void) => void }).requestIdleCallback(() => {
          setShouldLoadVideo(true);
        });
      } else {
        setTimeout(() => setShouldLoadVideo(true), 2500);
      }
    };

    if (document.readyState === "complete") {
      onLoad();
    } else {
      window.addEventListener("load", onLoad, { once: true });
      return () => window.removeEventListener("load", onLoad);
    }
  }, [reducedMotion]);

  useEffect(() => {
    const container = containerRef.current;
    const stage = stageRef.current;
    const stack = stackRef.current;
    const slab = slabRef.current;
    const layerEls = layersRef.current.filter(Boolean);
    const connector = connectorsRef.current;
    const railExit = railExitRef.current;

    if (!container || !stage || !slab) return;

    if (reducedMotion) {
      // Reduced motion: Render finished assembled slab statically
      gsap.set(slab, { opacity: 1, scale: 1 });
      gsap.set(layerEls, { opacity: 0 });
      if (connector) gsap.set(connector, { opacity: 0 });
      if (railExit) gsap.set(railExit, { scaleY: 1, opacity: 1 });
      return;
    }

    // Initial state on load (t = 0s): Exploded into five layers
    gsap.set(slab, { opacity: 0, scale: 0.94 });
    layerEls.forEach((el, i) => {
      gsap.set(el, {
        y: LAYERS[i].startY,
        opacity: 0.95,
        scale: 1,
      });
    });
    if (connector) gsap.set(connector, { opacity: 0.75, strokeDashoffset: 0 });
    if (railExit) gsap.set(railExit, { scaleY: 0, opacity: 0 });

    // ScrollTrigger assembly: scroll drives layers together into finished slab
    const st = ScrollTrigger.create({
      trigger: container,
      start: "top top",
      end: "bottom bottom",
      scrub: 0.6,
      onUpdate: (self) => {
        const p = self.progress; // 0 to 1

        // 1. Layers travel together to center (p = 0 to 0.75)
        layerEls.forEach((el, i) => {
          if (!el) return;
          const targetY = LAYERS[i].startY * (1 - Math.min(1, p * 1.33));
          const opacity = p > 0.7 ? Math.max(0, 1 - (p - 0.7) * 3.3) : 0.95;
          gsap.set(el, { y: targetY, opacity });
        });

        // 2. Connectors fade out as layers merge
        if (connector) {
          const connOpacity = Math.max(0, 0.75 * (1 - p * 1.5));
          gsap.set(connector, { opacity: connOpacity });
        }

        // 3. Finished product slab materializes (p = 0.5 to 1.0)
        if (p > 0.45) {
          const slabProgress = (p - 0.45) / 0.55;
          const slabOpacity = Math.min(1, slabProgress * 1.25);
          const slabScale = 0.96 + slabProgress * 0.04;
          gsap.set(slab, { opacity: slabOpacity, scale: slabScale });
        } else {
          gsap.set(slab, { opacity: 0 });
        }

        // 4. Build line exits downward (p = 0.85 to 1.0)
        if (railExit) {
          if (p > 0.8) {
            const exitProgress = (p - 0.8) / 0.2;
            gsap.set(railExit, { scaleY: exitProgress, opacity: exitProgress });
          } else {
            gsap.set(railExit, { scaleY: 0, opacity: 0 });
          }
        }

        // Synchronize underline draw on H1
        const underline = document.getElementById("hero-underline");
        if (underline) {
          const strokeProgress = Math.min(1, Math.max(0, (p - 0.3) / 0.6));
          const offset = 280 * (1 - strokeProgress);
          underline.style.strokeDashoffset = `${offset}`;
        }
      },
    });

    // Subtle pointer tilt (desktop only)
    const handleMouseMove = (e: MouseEvent) => {
      if (window.innerWidth < 1024 || !stack) return;
      const rect = stage.getBoundingClientRect();
      const x = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
      const y = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);

      gsap.to(stack, {
        rotationY: x * 4.5,
        rotationX: -y * 4.5,
        duration: 0.5,
        ease: "power1.out",
      });
    };

    const handleMouseLeave = () => {
      if (!stack) return;
      gsap.to(stack, {
        rotationY: 0,
        rotationX: 0,
        duration: 0.7,
        ease: "power2.out",
      });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    stage.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      st.kill();
      window.removeEventListener("mousemove", handleMouseMove);
      stage.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [reducedMotion]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[140vh] sm:h-[150vh]"
      aria-label="Interactive architecture model: product layers assemble on scroll"
    >
      {/* Sticky viewport frame */}
      <div
        ref={stageRef}
        className="sticky top-20 sm:top-24 flex h-[70vh] sm:h-[75vh] w-full items-center justify-center overflow-visible select-none"
        style={{ perspective: "1200px" }}
      >
        {/* Ambient material plate behind stage (blended with multiply) */}
        <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center opacity-30 mix-blend-multiply overflow-hidden">
          <Image
            src="/media/hero.png"
            alt=""
            width={720}
            height={540}
            className="w-full max-w-[500px] h-auto object-cover rounded-sm filter grayscale contrast-125"
            priority={false}
          />
          {shouldLoadVideo && (
            <video
              ref={videoRef}
              src="/media/hero.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-multiply"
              aria-hidden="true"
            />
          )}
        </div>

        {/* 3D Stack Container */}
        <div
          ref={stackRef}
          className="relative z-10 flex h-full w-full max-w-[420px] items-center justify-center will-change-transform"
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Vertical connector spine */}
          <svg
            className="absolute inset-0 h-full w-full pointer-events-none z-10"
            viewBox="0 0 420 400"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <line
              ref={connectorsRef}
              x1="48"
              y1="30"
              x2="48"
              y2="370"
              stroke="var(--ht-blue)"
              strokeWidth="1.5"
              strokeDasharray="4 3"
              opacity="0.75"
            />
          </svg>

          {/* Phase 1 (Initial Exploded State): The 5 Labelled Layers */}
          {LAYERS.map((layer, index) => (
            <div
              key={layer.id}
              ref={(el) => {
                layersRef.current[index] = el;
              }}
              className="absolute z-20 w-[92%] sm:w-[370px] rounded border border-line bg-surface/95 px-4 py-3 shadow-md backdrop-blur-md transition-colors"
              style={{
                willChange: "transform, opacity",
                transform: `translateY(${layer.startY}px)`,
              }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="flex h-5 w-5 items-center justify-center rounded-xs bg-[var(--bg)] font-mono text-[9px] font-bold text-[var(--ht-blue)] border border-line">
                    0{index + 1}
                  </span>
                  <span className="font-mono text-xs font-semibold tracking-wider text-[var(--text)] uppercase">
                    {layer.label}
                  </span>
                </div>
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--ht-blue)] opacity-80" />
              </div>
              <p className="mt-1 text-[11px] font-mono text-[var(--text-2)] pl-7 truncate">
                {layer.desc}
              </p>
            </div>
          ))}

          {/* Phase 2 (Assembled State): The Finished Product Dashboard Slab */}
          <div
            ref={slabRef}
            className="absolute z-30 w-[92%] sm:w-[380px] rounded border border-[var(--ht-blue)]/60 bg-surface shadow-2xl p-5 opacity-0 will-change-transform"
          >
            <div className="flex items-center justify-between border-b border-line pb-3">
              <div className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                <span className="font-mono text-[10px] tracking-widest text-[var(--text)] font-semibold uppercase">
                  ASSEMBLED SYSTEM // LIVE
                </span>
              </div>
              <span className="font-mono text-[10px] text-[var(--ht-blue)] font-bold">
                PROD · 0ms LATENCY
              </span>
            </div>

            <div className="mt-4 space-y-3 font-mono text-xs">
              <div className="flex justify-between items-center bg-[var(--bg)] p-2 rounded-xs border border-line">
                <span className="text-[var(--text-2)] text-[10px]">APPLICATION CORE</span>
                <span className="text-[var(--text)] font-semibold text-[11px]">ACTIVE & ROUTED</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-[var(--bg)] p-2 rounded-xs border border-line">
                  <span className="text-[9px] text-[var(--text-2)] block">AUTHENTICATION</span>
                  <span className="text-[10px] text-emerald-600 font-semibold">VERIFIED RBAC</span>
                </div>
                <div className="bg-[var(--bg)] p-2 rounded-xs border border-line">
                  <span className="text-[9px] text-[var(--text-2)] block">DATABASE PERSISTENCE</span>
                  <span className="text-[10px] text-[var(--ht-blue)] font-semibold">RELATIONAL + REDIS</span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-line flex justify-between items-center text-[10px] font-mono text-[var(--text-2)]">
              <span>HAFTECH DEPLOYED KERNEL</span>
              <span className="text-[var(--ht-blue)]">0 ERRORS</span>
            </div>
          </div>

          {/* Build Line Exit: Converges downward and exits into the page left rail */}
          <div
            ref={railExitRef}
            className="absolute -bottom-20 left-12 w-[2px] h-24 bg-[var(--ht-blue)] origin-top z-40 pointer-events-none opacity-0"
            aria-hidden="true"
          />
        </div>
      </div>
    </div>
  );
}

