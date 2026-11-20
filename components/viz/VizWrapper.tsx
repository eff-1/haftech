"use client";
import React, { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { layersCaption } from "@/content/copy";

// 8 Verified Architectural Tiers matching V2 Spec
const FALLBACK_LAYERS = [
  { num: "01", name: "User Interface", role: "Presentation & Client State" },
  { num: "02", name: "CDN / Edge", role: "Global Anycast & Static Delivery" },
  { num: "03", name: "Routing & Gateway", role: "Reverse Proxy & Rate Defense" },
  { num: "04", name: "Identity & RBAC", role: "Session Lifecycle & Access Control" },
  { num: "05", name: "Domain Logic", role: "Business Rules & Workflows" },
  { num: "06", name: "Asynchronous Workers", role: "Background Processing & Retries" },
  { num: "07", name: "Database & Cache", role: "ACID Persistence & Integrity" },
  { num: "08", name: "External Integrations", role: "Third-Party APIs & Webhooks" },
];

function StaticFallback() {
  const h = 42;
  return (
    <div className="border border-[#26262b] bg-[#161619] p-4 sm:p-6 lg:p-8 rounded-xs text-[#f1efe8]">
      <div className="border-b border-[#26262b] pb-4 flex flex-wrap items-center justify-between gap-2">
        <div>
          <span className="font-mono text-xs uppercase tracking-wider text-[#60a5fa]">
            Interactive System Model
          </span>
          <p className="text-sm text-[#a09fa6] mt-1">
            Loading architectural runtime explorer...
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs text-[#a09fa6] border border-[#2c2c32] px-3 py-1.5 rounded-xs">
            ▶ Trace a request
          </span>
        </div>
      </div>
      <div className="mt-6 grid gap-8 lg:grid-cols-12 items-start">
        <svg
          className="lg:col-span-7 w-full h-auto"
          viewBox={`0 0 460 ${FALLBACK_LAYERS.length * h + 8}`}
          role="img"
          aria-label="Eight stacked layers of software architecture, from user interface to external integrations."
        >
          {FALLBACK_LAYERS.map((l, i) => (
            <g key={l.name}>
              <rect
                x="48"
                y={4 + i * h}
                width="408"
                height={h - 6}
                fill="#1f1f24"
                stroke="#2e2e36"
                strokeWidth="1"
                rx="2"
              />
              <text
                x="62"
                y={4 + i * h + 24}
                fill="#f1efe8"
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 12,
                  textTransform: "uppercase",
                  letterSpacing: "0.04em",
                }}
              >
                {l.num} {l.name}
              </text>
              <text
                x="440"
                y={4 + i * h + 24}
                textAnchor="end"
                fill="#a09fa6"
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  textTransform: "uppercase",
                }}
              >
                {l.role}
              </text>
            </g>
          ))}
        </svg>
        <div className="lg:col-span-5 border border-[#26262b] bg-[#1a1a1f] p-5 rounded-xs">
          <span className="font-mono text-xs text-[#a09fa6] uppercase">Tier 01 · Presentation & Client State</span>
          <h3 className="font-display text-xl text-[#f1efe8] mt-2">User Interface</h3>
          <p className="text-sm text-[#a09fa6] mt-3">
            Semantic HTML, accessible ARIA patterns, and client state orchestration.
          </p>
        </div>
      </div>
      <p className="font-mono mt-6 text-xs text-[#a09fa6]">{layersCaption}</p>
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
