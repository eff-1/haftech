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
    : { duration: 0.28, ease: [0.22, 1, 0.36, 1] as const };

  return (
    <div
      className="relative z-10 w-full max-w-4xl mx-auto mt-4 sm:mt-6"
      role="region"
      aria-live="polite"
      aria-label={`Active project details: ${project.name}`}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={project.id}
          initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -10 }}
          transition={transition}
          className="grid gap-6 md:grid-cols-12 items-end border-t border-[#26262b] pt-6"
        >
          {/* Left: Number, Title, Headline, Categories */}
          <div className="md:col-span-7">
            <div className="flex flex-wrap items-center gap-3">
              <span
                className="font-mono text-xs font-semibold uppercase tracking-widest"
                style={{ color: project.accent }}
              >
                {project.num} / {project.name}
              </span>
              <span className="h-3 w-px bg-[#333338]" aria-hidden="true" />
              <span className="font-mono text-[11px] uppercase tracking-wider text-[#a09fa6]">
                {project.categories.join(" / ")}
              </span>
            </div>

            <h3
              className="mt-2.5 text-2xl sm:text-3xl lg:text-4xl text-[#f1efe8]"
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 500,
                lineHeight: 1.08,
                letterSpacing: "-0.02em",
              }}
            >
              {project.headline}
            </h3>

            <p className="mt-3 text-sm sm:text-base text-[#b8b7c2] max-w-xl leading-relaxed font-light">
              {project.description}
            </p>
          </div>

          {/* Right: Metadata, Tech Stack, CTAs */}
          <div className="md:col-span-5 flex flex-col items-start md:items-end justify-between gap-4">
            <div className="md:text-right">
              <p className="font-mono text-[11px] uppercase tracking-wider text-[#a09fa6]">
                {project.year} · {project.meta}
              </p>
              <div className="mt-2 flex flex-wrap md:justify-end gap-1.5">
                {project.technologies.slice(0, 4).map((tech) => (
                  <span
                    key={tech}
                    className="font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-xs border border-[#2c2c34] bg-[#18181e] text-[#d1d0db]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <motion.div
                whileHover={prefersReducedMotion ? undefined : { y: -1 }}
                whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
              >
                <Link
                  href={project.href}
                  prefetch={false}
                  className="inline-flex items-center justify-center gap-2 font-mono text-xs font-semibold uppercase tracking-wider px-5 py-3 rounded-xs transition-colors focus-visible:outline-2 focus-visible:outline-[#60a5fa]"
                  style={{
                    backgroundColor: "#f1efe8",
                    color: "#121214",
                    minHeight: 44,
                  }}
                >
                  <span>Explore Project</span>
                  <span aria-hidden="true">↗</span>
                </Link>
              </motion.div>

              {project.liveUrl && (
                <motion.a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={prefersReducedMotion ? undefined : { y: -1 }}
                  whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
                  className="inline-flex items-center justify-center gap-1.5 font-mono text-xs uppercase tracking-wider px-4 py-3 rounded-xs border border-[#363640] bg-[#18181e] hover:border-[#60a5fa] transition-colors focus-visible:outline-2 focus-visible:outline-[#60a5fa]"
                  style={{ color: "#f1efe8", minHeight: 44 }}
                >
                  <span>Live</span>
                  <span aria-hidden="true">↗</span>
                </motion.a>
              )}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
