"use client";
import React, { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { layers, layersCaption } from "@/content/copy";

function StaticFallback() {
  const h = 36;
  return (
    <div className="border border-line bg-surface p-4 sm:p-6 lg:p-8">
      <div className="border-b border-line pb-4">
        <span className="label">System Architecture</span>
        <p className="text-sm text-[var(--text-2)] mt-1">
          Static architecture overview.
        </p>
      </div>
      <div className="mt-6 grid gap-8 lg:grid-cols-12 items-start">
        <svg
          className="lg:col-span-7"
          viewBox={`0 0 400 ${layers.length * h + 8}`}
          role="img"
          aria-label="Eight stacked layers of a software product, from user interface at the top to external integrations at the bottom. The same content is listed beside the diagram."
          style={{ width: "100%", height: "auto", color: "var(--accent)" }}
          fill="none"
          stroke="currentColor"
        >
          {layers.map((l, i) => (
            <g key={l.name}>
              <rect x="4" y={4 + i * h} width="392" height={h - 4} />
              <text
                x="16"
                y={4 + i * h + 22}
                fill="var(--text)"
                stroke="none"
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 13,
                  textTransform: "uppercase",
                }}
              >
                {String(i + 1).padStart(2, "0")} {l.name}
              </text>
            </g>
          ))}
        </svg>
        <ol className="lg:col-span-5" style={{ listStyle: "none", margin: 0, padding: 0 }}>
          {layers.map((l) => (
            <li key={l.name} className="border-t border-line py-3">
              <h3 style={{ fontSize: "var(--step-0)" }}>{l.name}</h3>
              <p style={{ margin: 0, color: "var(--text-2)" }}>{l.text}</p>
            </li>
          ))}
        </ol>
      </div>
      <p className="label mt-6 text-xs text-[var(--text-2)]">{layersCaption}</p>
    </div>
  );
}

const DynamicExplorer = dynamic(
  () =>
    import("@/components/viz/ArchitectureExplorer").then((mod) => mod.ArchitectureExplorer),
  {
    ssr: false,
    loading: () => <StaticFallback />,
  }
);

export function VizWrapper() {
  const [shouldLoad, setShouldLoad] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Load when within ~1 viewport of section
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: "600px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef}>
      {shouldLoad ? <DynamicExplorer /> : <StaticFallback />}
    </div>
  );
}

