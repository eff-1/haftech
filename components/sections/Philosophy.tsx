"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { philosophy } from "@/content/copy";
import { SectionStrip } from "@/components/ui/SectionStrip";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function Philosophy() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const wordsRef = useRef<(HTMLSpanElement | null)[]>([]);

  const words = philosophy.h2.split(" ");

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const mm = gsap.matchMedia();

    mm.add(
      {
        reduce: "(prefers-reduced-motion: reduce)",
        standard: "(prefers-reduced-motion: no-preference)",
      },
      (context) => {
        const { reduce } = context.conditions as { reduce: boolean; standard: boolean };
        const validWords = wordsRef.current.filter(Boolean);

        if (reduce) {
          gsap.set(validWords, { opacity: 1 });
          return;
        }

        // On load before user scrolls here, opacity is 1 (passes AA/AAA contrast checks).
        // When scroll reaches section, ScrollTrigger scrubs 0.3 -> 1.
        gsap.fromTo(
          validWords,
          { opacity: 0.3 },
          {
            opacity: 1,
            stagger: 0.1,
            ease: "none",
            immediateRender: false,
            scrollTrigger: {
              trigger: section,
              start: "top 80%",
              end: "top 35%",
              scrub: 0.5,
            },
          }
        );
      }
    );

    return () => mm.revert();
  }, []);

  return (
    <section ref={sectionRef} className="wrap section" aria-labelledby="philosophy-h2">
      <SectionStrip n="01" name="Studio · Philosophy" />
      <div className="grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <h2
            id="philosophy-h2"
            className="lg:sticky lg:top-8"
            style={{
              fontSize: "var(--step-5)",
              maxWidth: "16ch",
              fontWeight: 500,
              lineHeight: 1.02,
              letterSpacing: "-0.02em",
            }}
          >
            {words.map((word, i) => (
              <React.Fragment key={i}>
                <span
                  ref={(node) => {
                    wordsRef.current[i] = node;
                  }}
                  style={{
                    display: "inline-block",
                    willChange: "opacity",
                    transition: "color 0.2s ease",
                  }}
                >
                  {word}
                </span>
                {i < words.length - 1 ? " " : ""}
              </React.Fragment>
            ))}
          </h2>
        </div>
        <div className="lg:col-span-5 lg:col-start-8">
          {philosophy.blocks.map((b) => (
            <div key={b.label} className="border-t border-line py-6">
              <h3 className="label" style={{ fontWeight: 500 }}>
                {b.label}
              </h3>
              <p style={{ marginTop: "var(--s-3)", maxWidth: "62ch" }}>{b.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
