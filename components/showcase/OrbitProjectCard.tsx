"use client";

import React, { forwardRef } from "react";
import Image from "next/image";
import Link from "next/link";
import type { ShowcaseProject } from "./showcaseData";

interface OrbitProjectCardProps {
  project: ShowcaseProject;
  index: number;
  isActive: boolean;
  onSelect: (index: number) => void;
}

export const OrbitProjectCard = forwardRef<HTMLDivElement, OrbitProjectCardProps>(
  function OrbitProjectCard({ project, index, isActive, onSelect }, ref) {
    return (
      <div
        ref={ref}
        className="orbit-card absolute left-1/2 top-1/2 select-none"
        style={{
          width: "clamp(264px, 76vw, 620px)",
          marginLeft: "calc(clamp(264px, 76vw, 620px) / -2)",
          marginTop: "calc(clamp(264px, 76vw, 620px) * 0.625 / -2)",
          transformStyle: "preserve-3d",
          willChange: "transform, opacity",
        }}
      >
        <div
          onClick={() => {
            if (!isActive) onSelect(index);
          }}
          role={isActive ? undefined : "button"}
          tabIndex={isActive ? undefined : -1}
          className={`group relative overflow-hidden rounded-sm border bg-[#141418] transition-shadow duration-500 ${
            isActive ? "cursor-default" : "cursor-pointer"
          }`}
          style={{
            borderColor: isActive ? "rgba(241,239,232,0.22)" : "rgba(255,255,255,0.08)",
            boxShadow: isActive
              ? `0 28px 70px -16px rgba(0,0,0,0.85), 0 0 42px -14px ${project.accent}35`
              : "0 18px 40px -16px rgba(0,0,0,0.7)",
          }}
        >
          {/* Optional browser chrome bar for browser-style previews */}
          {project.presentation === "browser" && (
            <div className="flex items-center justify-between border-b border-white/8 bg-[#18181d] px-3.5 py-2">
              <div className="flex items-center gap-1.5" aria-hidden="true">
                <span className="h-2 w-2 rounded-full bg-white/15" />
                <span className="h-2 w-2 rounded-full bg-white/15" />
                <span className="h-2 w-2 rounded-full bg-white/15" />
              </div>
              <span className="font-mono text-[10px] tracking-wider text-[#d1d0db] truncate max-w-[65%]">
                {project.domainLabel}
              </span>
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ backgroundColor: project.accent }}
                aria-hidden="true"
              />
            </div>
          )}

          {/* Dominant Project Visual Stage */}
          <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#101013]">
            <Image
              src={project.image}
              alt={project.imageAlt}
              fill
              sizes="(max-width: 768px) 82vw, 620px"
              priority={index === 0}
              className={`object-cover object-center transition-transform duration-700 ease-out ${
                isActive ? "group-hover:scale-[1.035]" : ""
              }`}
            />

            {/* Restrained bottom gradient purely for legibility */}
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "linear-gradient(to top, rgba(14,14,17,0.72) 0%, rgba(14,14,17,0.12) 45%, rgba(14,14,17,0.18) 100%)",
              }}
            />

            {/* Top subtle index & presentation marker */}
            <div className="pointer-events-none absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between">
              <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-wider bg-[#111115]/85 text-[#f1efe8] border border-white/12 px-2.5 py-1 rounded-xs backdrop-blur-xs">
                {project.num} / {project.name}
              </span>

              {project.presentation === "mobile-split" && (
                <span className="font-mono text-[10px] uppercase tracking-wider bg-[#111115]/85 text-[#d1d0db] border border-white/12 px-2 py-1 rounded-xs backdrop-blur-xs">
                  {project.domainLabel}
                </span>
              )}

              {project.presentation === "immersive" && (
                <span
                  className="font-mono text-[10px] uppercase tracking-wider bg-[#111115]/85 border border-white/12 px-2 py-1 rounded-xs backdrop-blur-xs"
                  style={{ color: project.accent }}
                >
                  {project.year}
                </span>
              )}
            </div>

            {/* Hover CTA overlay on active card (desktop) */}
            {isActive && (
              <div className="absolute bottom-3.5 right-3.5 z-10">
                <Link
                  href={project.href}
                  prefetch={false}
                  className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider bg-[#111115]/90 border border-white/20 px-3 py-1.5 rounded-xs backdrop-blur-xs transition-all duration-300 hover:border-white/50 hover:bg-[#1a1a22] focus-visible:outline-2 focus-visible:outline-[#60a5fa]"
                  style={{ color: "#f1efe8", minHeight: 36 }}
                >
                  <span>Inspect</span>
                  <span aria-hidden="true">↗</span>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
);
