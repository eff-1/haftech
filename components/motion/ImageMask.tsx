"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { dur, ease } from "./tokens";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ImageMaskProps {
  children: React.ReactNode;
  aspectRatio?: string;
  className?: string;
}

export function ImageMask({
  children,
  aspectRatio = "16 / 9",
  className = "",
}: ImageMaskProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const innerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    const inner = innerRef.current;
    if (!el || !inner) return;

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

        if (reduce) {
          gsap.set(el, { clipPath: "inset(0% 0% 0% 0%)" });
          gsap.set(inner, { scale: 1 });
          return;
        }

        const isMobile = window.innerWidth < 768;
        const clipDur = isMobile ? 0.65 : dur.image;
        const imgDur = isMobile ? 0.9 : 1.1;

        gsap.set(el, { clipPath: "inset(100% 0% 0% 0%)" });
        gsap.set(inner, { scale: 1.12 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
            once: true,
          },
        });

        tl.to(el, {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: clipDur,
          ease: ease.out,
        }).to(
          inner,
          {
            scale: 1,
            duration: imgDur,
            ease: ease.out,
          },
          0
        );

        if (desktop) {
          const onMouseEnter = () => {
            gsap.to(inner, { scale: 1.03, duration: 0.5, ease: "power2.out" });
          };
          const onMouseLeave = () => {
            gsap.to(inner, { scale: 1, duration: 0.5, ease: "power2.out" });
          };

          el.addEventListener("mouseenter", onMouseEnter);
          el.addEventListener("mouseleave", onMouseLeave);

          return () => {
            el.removeEventListener("mouseenter", onMouseEnter);
            el.removeEventListener("mouseleave", onMouseLeave);
          };
        }
      }
    );

    return () => mm.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      style={{
        aspectRatio,
        willChange: "clip-path",
      }}
    >
      <div
        ref={innerRef}
        className="w-full h-full"
        style={{
          willChange: "transform",
        }}
      >
        {children}
      </div>
    </div>
  );
}

