"use client";

import React from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useReducedMotion } from "@/components/motion/useReducedMotion";
import type { ShowcaseProject } from "./showcaseData";

interface ActiveProjectInformationProps {
  project: ShowcaseProject;
}

export function ActiveProjectInformation({ project }: ActiveProjectInformationProps) {
  const prefersReducedMotion = useReducedMotion();

  const transition = prefersReducedMotion
    ? { duration: 0 }
    : { duration: 0.32, ease: [0.22, 1, 0.36, 1] as const };

  return (
    <div
      className="relative z-10 w-full max-w-3xl mx-auto text-center px-4"
      role="region"
      aria-live="polite"
      aria-label={`Active project: ${project.name}`}
    >
      {/* Minimal Scroll / Drag cue directly beneath the curved cylinder */}
      <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#9a9c98] mb-4 sm:mb-6">
        <span className="hidden lg:inline">Scroll</span>
        <span className="lg:hidden">Drag or Tap</span>
      </p>

      <AnimatePresence mode="wait">
        <motion.div
          key={project.id}
          initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -12 }}
          transition={transition}
          className="flex flex-col items-center"
        >
          {/* Oversized Centered Editorial Serif Title (Boska) */}
          <h3
            className="text-[#f1efe8]"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.5rem, 6.2vw, 4.75rem)",
              fontWeight: 400,
              lineHeight: 1.0,
              letterSpacing: "-0.02em",
            }}
          >
            {project.name}
          </h3>

          {/* Clean centered subtitle */}
          <p className="mt-3 sm:mt-4 text-sm sm:text-base lg:text-lg text-[#b3b5b0] max-w-xl leading-relaxed font-light">
            {project.description}
          </p>

          {/* Subtle metadata & understated CTA row */}
          <div className="mt-5 sm:mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
            <span className="font-mono text-[11px] uppercase tracking-widest text-[#9a9c98]">
              {project.num} / {project.year} · {project.categories[0]}
            </span>

            <Link
              href={project.href}
              prefetch={false}
              className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider border-b border-[#f1efe8]/40 pb-0.5 hover:border-[#f1efe8] transition-colors focus-visible:outline-2 focus-visible:outline-[#60a5fa]"
              style={{ color: "#f1efe8", minHeight: 36 }}
            >
              <span>Explore Project</span>
              <span aria-hidden="true">↗</span>
            </Link>

            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-mono text-xs uppercase tracking-wider border-b border-transparent hover:border-[#93c5fd] pb-0.5 transition-colors focus-visible:outline-2 focus-visible:outline-[#60a5fa]"
                style={{ color: "#93c5fd", minHeight: 36 }}
              >
                <span>Live Site</span>
                <span aria-hidden="true">↗</span>
              </a>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
