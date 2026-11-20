"use client";

import React from "react";
import type { ShowcaseProject } from "./showcaseData";

interface ProjectNavigationProps {
  projects: ShowcaseProject[];
  activeIndex: number;
  progressFillRef: React.RefObject<HTMLDivElement | null>;
  onPrev: () => void;
  onNext: () => void;
  onSelect: (index: number) => void;
}

export function ProjectNavigation({
  projects,
  activeIndex,
  progressFillRef,
  onPrev,
  onNext,
  onSelect,
}: ProjectNavigationProps) {
  const total = projects.length;
  const activeProject = projects[activeIndex] || projects[0];

  return (
    <div className="relative z-10 w-full max-w-4xl mx-auto mt-6 pt-4 border-t border-[#222228]">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Left: Counter & Continuous Progress Bar */}
        <div className="flex items-center gap-4 flex-1 min-w-0">
          <div className="font-mono text-xs tracking-widest text-[#f1efe8] shrink-0">
            <span className="font-semibold" style={{ color: activeProject.accent }}>
              {String(activeIndex + 1).padStart(2, "0")}
            </span>
            <span className="text-[#71707a] mx-1.5">/</span>
            <span className="text-[#a09fa6]">{String(total).padStart(2, "0")}</span>
          </div>

          {/* Continuous Progress Track (mutated via ref during scroll for 0 re-renders) */}
          <div
            className="relative h-[2px] flex-1 max-w-[220px] bg-[#26262e] overflow-hidden rounded-full"
            aria-hidden="true"
          >
            <div
              ref={progressFillRef}
              className="absolute inset-y-0 left-0 w-full origin-left"
              style={{
                backgroundColor: activeProject.accent,
                transform: `scaleX(${total > 1 ? Math.max(0.06, activeIndex / (total - 1)) : 1})`,
              }}
            />
          </div>
        </div>

        {/* Center: Compact Direct Project Index (Desktop & Tablet) */}
        <div
          className="hidden md:flex items-center gap-1"
          role="tablist"
          aria-label="Direct project index"
        >
          {projects.map((p, i) => {
            const isCurrent = i === activeIndex;
            return (
              <button
                key={p.id}
                type="button"
                role="tab"
                aria-selected={isCurrent}
                aria-label={`${p.num} ${p.name}`}
                title={p.name}
                onClick={() => onSelect(i)}
                className="font-mono text-[11px] px-2.5 py-2 rounded-xs transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-[#60a5fa]"
                style={{
                  minHeight: 40,
                  minWidth: 36,
                  color: isCurrent ? "#f1efe8" : "#a8a7b3",
                  backgroundColor: isCurrent ? "rgba(255,255,255,0.08)" : "transparent",
                }}
              >
                {p.num}
              </button>
            );
          })}
        </div>

        {/* Right: Previous / Next Controls */}
        <div className="flex items-center justify-between sm:justify-end gap-3">
          <button
            type="button"
            onClick={onPrev}
            disabled={activeIndex === 0}
            aria-label="Previous project"
            className="font-mono text-xs uppercase tracking-wider px-4 py-2.5 rounded-xs border border-[#2c2c34] bg-[#16161b] text-[#f1efe8] hover:border-[#60a5fa] disabled:opacity-45 disabled:cursor-not-allowed transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-[#60a5fa]"
            style={{ minHeight: 44 }}
          >
            <span aria-hidden="true">← </span>Previous
          </button>

          <button
            type="button"
            onClick={onNext}
            disabled={activeIndex === total - 1}
            aria-label="Next project"
            className="font-mono text-xs uppercase tracking-wider px-4 py-2.5 rounded-xs border border-[#2c2c34] bg-[#16161b] text-[#f1efe8] hover:border-[#60a5fa] disabled:opacity-45 disabled:cursor-not-allowed transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-[#60a5fa]"
            style={{ minHeight: 44 }}
          >
            Next<span aria-hidden="true"> →</span>
          </button>
        </div>
      </div>
    </div>
  );
}
