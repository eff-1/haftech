"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ease } from "./tokens";

export function LineDrawing() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    const svg = svgRef.current;
    const container = containerRef.current;
    if (!svg || !container) return;

    const mm = gsap.matchMedia();

    mm.add(
      {
        reduce: "(prefers-reduced-motion: reduce)",
        standard: "(prefers-reduced-motion: no-preference)",
        desktop: "(min-width: 1024px)",
      },
      (context) => {
        const { reduce, desktop } = context.conditions as {
          reduce: boolean;
          standard: boolean;
          desktop: boolean;
        };

        const paths = svg.querySelectorAll<SVGPathElement | SVGLineElement | SVGRectElement>(
          ".draw-stroke"
        );

        if (reduce) {
          paths.forEach((el) => {
            el.style.strokeDashoffset = "0";
            el.style.opacity = "1";
          });
          return;
        }

        // Prepare strokes
        paths.forEach((el) => {
          const len = (el as any).getTotalLength ? (el as any).getTotalLength() : 300;
          el.style.strokeDasharray = `${len}`;
          el.style.strokeDashoffset = `${len}`;
        });

        // 1400 ms sequence, staggered, starting at 300ms
        const tl = gsap.timeline({ delay: 0.3 });
        tl.to(paths, {
          strokeDashoffset: 0,
          duration: 1.4,
          ease: ease.inOut,
          stagger: 0.12,
        });

        // Pointer effect on desktop (parallax <= 6px)
        if (desktop) {
          const onMouseMove = (e: MouseEvent) => {
            const rect = container.getBoundingClientRect();
            const relX = (e.clientX - rect.left) / rect.width - 0.5;
            const relY = (e.clientY - rect.top) / rect.height - 0.5;
            gsap.to(svg, {
              x: relX * 12, // max +-6px
              y: relY * 12,
              duration: 0.4,
              ease: "power1.out",
            });
          };

          const onMouseLeave = () => {
            gsap.to(svg, { x: 0, y: 0, duration: 0.6, ease: "power2.out" });
          };

          container.addEventListener("mousemove", onMouseMove);
          container.addEventListener("mouseleave", onMouseLeave);

          return () => {
            container.removeEventListener("mousemove", onMouseMove);
            container.removeEventListener("mouseleave", onMouseLeave);
          };
        }
      }
    );

    return () => mm.revert();
  }, []);

  const ys = [8, 66, 124, 182, 240];

  return (
    <div ref={containerRef} className="w-full">
      <svg
        ref={svgRef}
        viewBox="0 0 240 300"
        aria-hidden="true"
        focusable="false"
        style={{ width: "100%", height: "auto", color: "var(--accent)" }}
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
      >
        {/* Outer boundary lines */}
        <line x1="8" y1="8" x2="8" y2="292" stroke="var(--ht-concrete)" className="draw-stroke" />
        <line
          x1="232"
          y1="8"
          x2="232"
          y2="292"
          stroke="var(--ht-concrete)"
          className="draw-stroke"
        />

        {/* Structural tiers */}
        {ys.map((y, i) => (
          <g key={y}>
            <rect x="20" y={y} width="200" height="52" className="draw-stroke" />
            <line
              x1="20"
              y1={y + 26}
              x2="220"
              y2={y + 26}
              strokeDasharray="2 4"
              opacity=".5"
              className="draw-stroke"
            />
            <line
              x1={40 + i * 24}
              y1={y}
              x2={40 + i * 24}
              y2={y + 52}
              opacity=".6"
              className="draw-stroke"
            />
          </g>
        ))}
      </svg>
    </div>
  );
}

