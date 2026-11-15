"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { dur, ease, stagger } from "./tokens";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface TextRevealProps {
  lines: string[];
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "div";
  className?: string;
  id?: string;
  style?: React.CSSProperties;
  isHero?: boolean;
}

export function TextReveal({
  lines,
  as: Component = "h2",
  className = "",
  id,
  style,
  isHero = false,
}: TextRevealProps) {
  const containerRef = useRef<HTMLElement | null>(null);
  const linesRef = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const mm = gsap.matchMedia();

    mm.add(
      {
        reduce: "(prefers-reduced-motion: reduce)",
        standard: "(prefers-reduced-motion: no-preference)",
      },
      (context) => {
        const { reduce } = context.conditions as { reduce: boolean; standard: boolean };
        const validLines = linesRef.current.filter(Boolean);

        if (reduce) {
          gsap.set(validLines, { yPercent: 0, opacity: 1 });
          return;
        }

        gsap.set(validLines, { yPercent: 105 });

        const isMobile = window.innerWidth < 768;
        const duration = isMobile ? dur.headline * 0.85 : dur.headline;

        if (isHero) {
          const startAnim = () => {
            gsap.to(validLines, {
              yPercent: 0,
              duration,
              ease: ease.out,
              stagger: stagger.text,
              delay: 0.1,
            });
          };

          if (document.fonts) {
            Promise.race([
              document.fonts.ready,
              new Promise((resolve) => setTimeout(resolve, 600)),
            ]).then(startAnim);
          } else {
            setTimeout(startAnim, 200);
          }
        } else {
          gsap.to(validLines, {
            yPercent: 0,
            duration,
            ease: ease.out,
            stagger: stagger.text,
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              once: true,
            },
          });
        }
      }
    );

    return () => mm.revert();
  }, [isHero, lines.length]);

  return (
    <Component ref={containerRef as any} id={id} className={className} style={style}>
      {lines.map((line, idx) => (
        <span
          key={idx}
          style={{
            display: "block",
            overflow: "hidden",
            lineHeight: "inherit",
          }}
        >
          <span
            ref={(node) => {
              linesRef.current[idx] = node;
            }}
            style={{
              display: "block",
              willChange: "transform",
            }}
          >
            {line}
          </span>
        </span>
      ))}
    </Component>
  );
}

