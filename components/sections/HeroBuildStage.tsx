"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/components/motion/useReducedMotion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const LAYERS = [
  { id: "ui", label: "01 // UI & STATE", desc: "Design System & React Runtime", yOffset: -88 },
  { id: "api", label: "02 // API ROUTING", desc: "REST & Serialization Contracts", yOffset: -44 },
  { id: "auth", label: "03 // IDENTITY & RBAC", desc: "JWT & Access Control Rules", yOffset: 0 },
  { id: "logic", label: "04 // DOMAIN LOGIC", desc: "Workflow Engines & Workers", yOffset: 44 },
  { id: "db", label: "05 // DATA PERSISTENCE", desc: "PostgreSQL & Redis Cache", yOffset: 88 },
];

export function HeroBuildStage() {
  const stageRef = useRef<HTMLDivElement | null>(null);
  const stackRef = useRef<HTMLDivElement | null>(null);
  const slabRef = useRef<HTMLDivElement | null>(null);
  const wireframeRef = useRef<SVGSVGElement | null>(null);
  const layersRef = useRef<(HTMLDivElement | null)[]>([]);
  const connectorsRef = useRef<SVGLineElement | null>(null);
  const pulseRef = useRef<SVGCircleElement | null>(null);
  const scrollLineRef = useRef<HTMLDivElement | null>(null);

  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const stage = stageRef.current;
    const slab = slabRef.current;
    const wire = wireframeRef.current;
    const layerEls = layersRef.current.filter(Boolean);
    const connector = connectorsRef.current;
    const pulse = pulseRef.current;
    const scrollLine = scrollLineRef.current;

    if (!stage || !slab || !wire) return;

    if (reducedMotion) {
      // Instant exploded state for reduced motion
      gsap.set(slab, { opacity: 0 });
      gsap.set(wire, { opacity: 0.25 });
      layerEls.forEach((el, i) => {
        gsap.set(el, {
          y: LAYERS[i].yOffset,
          opacity: 1,
          scale: 1,
        });
      });
      if (connector) gsap.set(connector, { strokeDashoffset: 0, opacity: 0.8 });
      if (scrollLine) gsap.set(scrollLine, { scaleY: 1, opacity: 1 });
      return;
    }

    // Set initial choreography states
    gsap.set(slab, { y: 60, opacity: 0, scale: 0.96 });
    gsap.set(wire, { opacity: 0 });
    gsap.set(layerEls, { y: 0, opacity: 0, scale: 0.98 });
    if (connector) gsap.set(connector, { strokeDashoffset: 360, opacity: 0 });
    if (pulse) gsap.set(pulse, { opacity: 0 });
    if (scrollLine) gsap.set(scrollLine, { scaleY: 0, opacity: 0 });

    const tl = gsap.timeline({ delay: 0.3 });

    // 0.4s - 1.6s: Finished product slab rises into stage
    tl.to(slab, {
      y: 0,
      opacity: 1,
      scale: 1,
      duration: 1.2,
      ease: "power3.out",
    });

    // 1.6s - 2.4s: Hold beat (handled by timeline delay)

    // 2.4s - 3.2s: Slab dissolves to wireframe
    tl.to(
      slab,
      {
        opacity: 0.12,
        duration: 0.8,
        ease: "power2.inOut",
      },
      "+=0.8"
    )
      .to(
        wire,
        {
          opacity: 0.9,
          duration: 0.8,
          ease: "power2.inOut",
        },
        "<"
      );

    // 3.0s - 4.2s: Wireframe separates into 5 labelled layers
    tl.to(
      wire,
      {
        opacity: 0.2,
        duration: 0.5,
      },
      "-=0.2"
    );

    layerEls.forEach((el, idx) => {
      tl.to(
        el,
        {
          y: LAYERS[idx].yOffset,
          opacity: 1,
          scale: 1,
          duration: 0.9,
          ease: "expo.out",
        },
        `<+=${idx === 0 ? 0 : 0.09}`
      );
    });

    // Draw vertical connector line between layers
    if (connector) {
      tl.to(
        connector,
        {
          opacity: 0.85,
          strokeDashoffset: 0,
          duration: 0.8,
          ease: "power2.out",
        },
        "-=0.5"
      );
    }

    // 4.6s+: Idle breathing and hint pulse
    if (pulse) {
      tl.to(pulse, { opacity: 1, duration: 0.2 })
        .fromTo(
          pulse,
          { attr: { cy: 30 } },
          {
            attr: { cy: 330 },
            duration: 1.1,
            ease: "power1.inOut",
          }
        )
        .to(pulse, { opacity: 0, duration: 0.2 });
    }

    // Scroll cue line draws down
    if (scrollLine) {
      tl.to(
        scrollLine,
        {
          scaleY: 1,
          opacity: 0.8,
          duration: 0.6,
          ease: "power2.out",
        },
        "-=0.4"
      );
    }

    // Subtle idle floating breath
    const floatAnim = gsap.to(layerEls, {
      y: "+=3.5",
      duration: 2.8,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
      stagger: 0.12,
      delay: 4.8,
    });

    // Scroll parallax & compression: stack compresses on scroll down
    const scrollTrigger = ScrollTrigger.create({
      trigger: stage,
      start: "top top+=100",
      end: "bottom top",
      scrub: 0.5,
      onUpdate: (self) => {
        const progress = self.progress;
        layerEls.forEach((el, idx) => {
          if (!el) return;
          const targetY = LAYERS[idx].yOffset * (1 - progress * 0.45);
          gsap.set(el, { y: targetY });
        });
      },
    });

    // Desktop pointer tilt
    const handleMouseMove = (e: MouseEvent) => {
      if (window.innerWidth < 1024) return;
      const rect = stage.getBoundingClientRect();
      const x = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
      const y = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);

      gsap.to(stackRef.current, {
        rotationY: x * 5.5,
        rotationX: -y * 5.5,
        duration: 0.6,
        ease: "power1.out",
      });
    };

    const handleMouseLeave = () => {
      gsap.to(stackRef.current, {
        rotationY: 0,
        rotationX: 0,
        duration: 0.8,
        ease: "power2.out",
      });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    stage.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      tl.kill();
      floatAnim.kill();
      scrollTrigger.kill();
      window.removeEventListener("mousemove", handleMouseMove);
      stage.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [reducedMotion]);

  return (
    <div
      ref={stageRef}
      className="relative flex h-[480px] sm:h-[560px] lg:h-[620px] w-full items-center justify-center select-none"
      style={{ perspective: "1200px" }}
      aria-label="Interactive architecture model: interface disassembled into engineering layers"
    >
      {/* 3D Rotating Stack Container */}
      <div
        ref={stackRef}
        className="relative flex h-full w-full max-w-[420px] items-center justify-center will-change-transform"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Layer Connector Spine (Vertical Thread) */}
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
            y2="330"
            stroke="var(--ht-blue)"
            strokeWidth="1.5"
            strokeDasharray="360"
            strokeDashoffset="360"
            opacity="0.8"
          />
          <circle
            ref={pulseRef}
            cx="48"
            cy="30"
            r="3.5"
            fill="var(--ht-blue)"
            opacity="0"
          />
        </svg>

        {/* Phase 1: Finished Product Slab (Built in pure SVG/HTML) */}
        <div
          ref={slabRef}
          className="absolute z-20 w-[92%] sm:w-[360px] rounded border border-line bg-surface shadow-2xl p-5"
          style={{ willChange: "transform, opacity" }}
        >
          <div className="flex items-center justify-between border-b border-line pb-3">
            <div className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
            </div>
            <span className="font-mono text-[10px] tracking-widest text-[var(--text-2)] uppercase">
              haftech.prod // live
            </span>
          </div>
          <div className="mt-4 space-y-2.5">
            <div className="h-4 w-2/3 rounded-xs bg-[var(--text)] opacity-85" />
            <div className="h-2 w-full rounded-xs bg-line" />
            <div className="h-2 w-4/5 rounded-xs bg-line" />
            <div className="mt-4 grid grid-cols-3 gap-2 pt-2">
              <div className="h-10 rounded-xs border border-line bg-[var(--bg)]" />
              <div className="h-10 rounded-xs border border-line bg-[var(--bg)]" />
              <div className="h-10 rounded-xs border border-[var(--accent)] bg-[var(--accent)] opacity-90" />
            </div>
          </div>
        </div>

        {/* Phase 2: Precision Wireframe Strokes */}
        <svg
          ref={wireframeRef}
          className="absolute z-15 w-[92%] sm:w-[360px] h-[220px] pointer-events-none opacity-0"
          viewBox="0 0 360 220"
          fill="none"
          stroke="var(--ht-blue)"
          strokeWidth="1"
          strokeDasharray="4 2"
          aria-hidden="true"
        >
          <rect x="1" y="1" width="358" height="218" rx="2" />
          <line x1="1" y1="36" x2="359" y2="36" strokeDasharray="none" />
          <line x1="24" y1="65" x2="160" y2="65" strokeWidth="2" strokeDasharray="none" />
          <line x1="24" y1="95" x2="336" y2="95" />
          <line x1="24" y1="115" x2="280" y2="115" />
          <rect x="24" y="145" width="88" height="48" />
          <rect x="136" y="145" width="88" height="48" />
          <rect x="248" y="145" width="88" height="48" stroke="var(--text)" />
        </svg>

        {/* Phase 3: The 5 Exploded Architectural Layers */}
        {LAYERS.map((layer, index) => (
          <div
            key={layer.id}
            ref={(el) => {
              layersRef.current[index] = el;
            }}
            className="absolute z-30 w-[92%] sm:w-[360px] rounded border border-line/90 bg-surface/95 backdrop-blur-md px-4 py-3 shadow-lg transition-colors hover:border-[var(--accent)]"
            style={{
              willChange: "transform, opacity",
              transform: `translateY(${layer.yOffset}px)`,
            }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="flex h-5 w-5 items-center justify-center rounded-xs bg-[var(--bg)] font-mono text-[9px] font-bold text-[var(--accent)] border border-line">
                  0{index + 1}
                </span>
                <span className="font-mono text-xs font-semibold tracking-wider text-[var(--text)] uppercase">
                  {layer.label}
                </span>
              </div>
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-xs" />
            </div>
            <p className="mt-1 text-[11px] font-mono text-[var(--text-2)] pl-7 truncate">
              {layer.desc}
            </p>
          </div>
        ))}

        {/* Scroll Line Exit: The Build Line continues downward as the page left rail */}
        <div
          ref={scrollLineRef}
          className="absolute -bottom-16 left-12 w-[1.5px] h-20 bg-[var(--ht-blue)] origin-top z-40 pointer-events-none opacity-0"
          aria-hidden="true"
        />
      </div>
    </div>
  );
}
