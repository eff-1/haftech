"use client";

import React, { useEffect, useRef, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { useReducedMotion } from "@/components/motion/useReducedMotion";
import { HERO_STEPS, type HeroStoryStep } from "./HeroStoryData";

const emptySubscribe = () => () => {};
function useHasMounted() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
}

function CornerNotches() {
  return (
    <>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -top-px -left-px z-20 h-3.5 w-3.5 border-t-2 border-l-2 border-[#38536F]"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -top-px -right-px z-20 h-3.5 w-3.5 border-t-2 border-r-2 border-[#38536F]"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-px -left-px z-20 h-3.5 w-3.5 border-b-2 border-l-2 border-[#38536F]"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-px -right-px z-20 h-3.5 w-3.5 border-b-2 border-r-2 border-[#38536F]"
      />
    </>
  );
}

function StepHeadline({
  step,
  asH1,
  lineAttr,
}: {
  step: HeroStoryStep;
  asH1?: boolean;
  lineAttr?: boolean;
}) {
  const Tag = asH1 ? "h1" : "h2";
  return (
    <Tag
      id={asH1 ? "hero-h1" : undefined}
      style={{
        fontFamily: "var(--font-display)",
        fontSize: "clamp(2.4rem, 1.55rem + 3.4vw, 4.85rem)",
        fontWeight: 600,
        lineHeight: 1.03,
        letterSpacing: "-0.025em",
        color: "var(--text)",
      }}
    >
      {step.headlineLines.map((line, idx) => (
        <span key={idx} className="block overflow-hidden pb-1">
          <span
            {...(lineAttr ? { "data-hero-line": "true" } : {})}
            className="block will-change-transform"
          >
            {line.text}
            {line.highlight && (
              <span style={{ color: "#38536F" }}>{line.highlight}</span>
            )}
          </span>
        </span>
      ))}
    </Tag>
  );
}

function MobileStoryBlock({
  step,
  index,
  reducedMotion,
}: {
  step: HeroStoryStep;
  index: number;
  reducedMotion: boolean;
}) {
  const blockRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [inView, setInView] = useState(index === 0);
  const [loadVideo, setLoadVideo] = useState(index === 0);
  const [videoFailed, setVideoFailed] = useState(false);

  useEffect(() => {
    if (reducedMotion) return;
    const el = blockRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries[0].isIntersecting;
        setInView(visible);
        if (visible) {
          setLoadVideo(true);
        }
        const vid = videoRef.current;
        if (vid) {
          if (visible) {
            vid.play().catch(() => {});
          } else {
            vid.pause();
          }
        }
      },
      { threshold: 0.35 }
    );

    observer.observe(el);
    const vidEl = videoRef.current;
    return () => {
      observer.disconnect();
      vidEl?.pause();
    };
  }, [reducedMotion]);

  return (
    <article ref={blockRef} className="py-7 border-t border-line first:border-t-0 first:pt-2">
      {/* Mono Step Label */}
      <div className="flex items-center justify-between font-mono text-xs tracking-widest uppercase text-[var(--text-2)] mb-3">
        <span>{step.tabLabel}</span>
        <span>{step.num} / 04</span>
      </div>

      {/* Headline & Support */}
      <div
        style={{
          opacity: inView || reducedMotion ? 1 : 0.35,
          transform: inView || reducedMotion ? "translateY(0)" : "translateY(10px)",
          transition: reducedMotion ? "none" : "opacity 420ms ease, transform 420ms ease",
        }}
      >
        <StepHeadline step={step} asH1={index === 0} />
        <p
          className="mt-3 text-[var(--text-2)] text-base leading-relaxed font-sans"
          style={{ maxWidth: "40ch" }}
        >
          {step.support}
        </p>
      </div>

      {/* Squared Notched-Corner Media Frame UNDER the text */}
      <div className="relative mt-5 border border-line bg-[var(--surface)]">
        <CornerNotches />
        <div className="flex items-center justify-between border-b border-line px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider text-[var(--text-2)] bg-[var(--bg)]/80">
          <span>{step.tabLabel}</span>
          <span>HAFTECH // {step.num}</span>
        </div>

        <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#161816]">
          {reducedMotion || videoFailed ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={step.posterSrc}
              alt={step.posterAlt}
              loading={index === 0 ? "eager" : "lazy"}
              className="h-full w-full object-cover"
            />
          ) : (
            <video
              ref={videoRef}
              src={loadVideo ? step.videoSrc : undefined}
              poster={step.posterSrc}
              muted
              loop
              playsInline
              autoPlay={index === 0}
              preload={index === 0 ? "metadata" : "none"}
              onError={() => setVideoFailed(true)}
              className="h-full w-full object-cover"
              aria-label={step.posterAlt}
            />
          )}
        </div>
      </div>
    </article>
  );
}

function MobileStickyHero() {
  const runwayRef = useRef<HTMLDivElement | null>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const textLayerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [stepIdx, setStepIdx] = useState(0);
  const stepIdxRef = useRef(0);
  const [failed, setFailed] = useState<Record<number, boolean>>({});

  // Native scroll-linked step & subtle continuous kinetic text drift (0 re-renders per scroll frame)
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(min-width: 1024px)").matches) return;

    let rafId = 0;

    const update = () => {
      const runway = runwayRef.current;
      if (!runway) return;
      const rect = runway.getBoundingClientRect();
      const scrollable = Math.max(1, rect.height - window.innerHeight);
      const progress = Math.max(0, Math.min(1, -rect.top / scrollable));

      const segmentSize = 1 / HERO_STEPS.length;
      const next = Math.min(
        HERO_STEPS.length - 1,
        Math.floor(progress * (HERO_STEPS.length - 0.01))
      );

      // Continuous micro-parallax drift within each step's scroll slice so text moves WITH the video
      const localP = Math.max(0, Math.min(1, (progress - next * segmentSize) / segmentSize));
      const driftY = (0.5 - localP) * 18;
      const activeEl = textLayerRefs.current[next];
      if (activeEl) {
        activeEl.style.setProperty("--mob-drift-y", `${driftY.toFixed(1)}px`);
      }

      if (next !== stepIdxRef.current) {
        stepIdxRef.current = next;
        setStepIdx(next);
      }
    };

    const onScroll = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // Play ONLY active & next video on mobile; pause others
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(min-width: 1024px)").matches) return;

    HERO_STEPS.forEach((step, idx) => {
      const vid = videoRefs.current[idx];
      if (!vid) return;
      const shouldPlay = idx === stepIdx || idx === stepIdx + 1;
      if (shouldPlay) {
        if (!vid.getAttribute("src")) {
          vid.setAttribute("src", step.videoSrc);
          vid.load();
        }
        vid.play().catch(() => {});
      } else {
        vid.pause();
      }
    });
  }, [stepIdx]);

  // Pause all mobile videos when hero runway leaves viewport
  useEffect(() => {
    const runway = runwayRef.current;
    if (!runway || typeof IntersectionObserver === "undefined") return;

    const vids = videoRefs.current;
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) {
          vids.forEach((v) => v?.pause());
        } else {
          const cur = stepIdxRef.current;
          vids[cur]?.play().catch(() => {});
        }
      },
      { threshold: 0.02 }
    );
    observer.observe(runway);
    return () => {
      observer.disconnect();
      vids.forEach((v) => v?.pause());
    };
  }, []);

  // Choreographed spatial layout per step so text dances with each video composition
  const STEP_LAYOUTS = [
    {
      // 01 IDEA: upper-left, leaving the sketching hand below wide open
      positionClass: "top-[18%] left-5 right-5 text-left items-start",
      enterTransform: "translate3d(-18px, calc(22px + var(--mob-drift-y, 0px)), 0)",
      exitTransform: "translate3d(-12px, -28px, 0)",
      lineOffset: (lIdx: number) => (lIdx === 0 ? -12 : 12),
    },
    {
      // 02 BLUEPRINT: dead-center editorial convergence
      positionClass: "top-[42%] left-5 right-5 text-center items-center",
      enterTransform: "translate3d(0px, calc(24px + var(--mob-drift-y, 0px)), 0) scale(0.96)",
      exitTransform: "translate3d(0px, -26px, 0) scale(1.02)",
      lineOffset: (lIdx: number) => (lIdx === 0 ? -24 : 24),
    },
    {
      // 03 ENGINEERING: mid-right sweep, letting coding screen & hands shine left
      positionClass: "top-[36%] left-5 right-5 text-right items-end",
      enterTransform: "translate3d(22px, calc(18px + var(--mob-drift-y, 0px)), 0)",
      exitTransform: "translate3d(14px, -28px, 0)",
      lineOffset: (lIdx: number) => (lIdx === 0 ? 18 : -10),
    },
    {
      // 04 PRODUCT: grounded lower-center finale with dual CTAs joining underneath
      positionClass: "bottom-9 left-5 right-5 text-center items-center",
      enterTransform: "translate3d(0px, calc(28px + var(--mob-drift-y, 0px)), 0)",
      exitTransform: "translate3d(0px, -20px, 0)",
      lineOffset: () => 0,
    },
  ];

  return (
    <div ref={runwayRef} className="block lg:hidden relative h-[260svh] w-full">
      <div className="sticky top-0 h-[100svh] w-full overflow-hidden bg-[#121412] text-[#f1efe8]">
        {/* Full-Bleed Stacked 4 Video Background — Top Completely Free */}
        <div className="absolute inset-0 z-0">
          {HERO_STEPS.map((step, idx) => {
            const isActive = idx === stepIdx;
            return (
              <div
                key={step.num}
                className="absolute inset-0 h-full w-full"
                style={{
                  opacity: isActive ? 1 : 0,
                  transform: isActive ? "scale(1)" : "scale(1.06)",
                  transition: "opacity 620ms cubic-bezier(0.22, 1, 0.36, 1), transform 900ms cubic-bezier(0.22, 1, 0.36, 1)",
                  zIndex: isActive ? 2 : 1,
                }}
              >
                {failed[idx] ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={step.posterSrc}
                    alt={step.posterAlt}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <video
                    ref={(el) => {
                      videoRefs.current[idx] = el;
                    }}
                    src={idx === 0 ? step.videoSrc : undefined}
                    poster={step.posterSrc}
                    muted
                    loop
                    playsInline
                    autoPlay={idx === 0}
                    preload={idx === 0 ? "metadata" : "none"}
                    onError={() => setFailed((prev) => ({ ...prev, [idx]: true }))}
                    className="h-full w-full object-cover"
                    aria-label={step.posterAlt}
                  />
                )}
              </div>
            );
          })}

          {/* Balanced Cinematic Vignette Scrim (keeps text >= 8:1 readable at every position) */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-10"
            style={{
              background:
                stepIdx === 0
                  ? "linear-gradient(to bottom, rgba(14,16,14,0.84) 0%, rgba(14,16,14,0.48) 48%, rgba(14,16,14,0.38) 100%)"
                  : stepIdx === 1
                  ? "radial-gradient(ellipse 85% 65% at 50% 50%, rgba(14,16,14,0.72) 0%, rgba(14,16,14,0.46) 100%)"
                  : stepIdx === 2
                  ? "linear-gradient(to left, rgba(14,16,14,0.86) 0%, rgba(14,16,14,0.52) 55%, rgba(14,16,14,0.34) 100%)"
                  : "linear-gradient(to top, rgba(14,16,14,0.94) 0%, rgba(14,16,14,0.56) 52%, rgba(14,16,14,0.32) 100%)",
              transition: "background 500ms ease",
            }}
          />
        </div>

        {/* Choreographed Dynamic Text Layers Synced with Video */}
        <div className="relative z-20 h-full w-full">
          {HERO_STEPS.map((step, idx) => {
            const isCurrent = idx === stepIdx;
            const layout = STEP_LAYOUTS[idx] || STEP_LAYOUTS[0];
            const Tag = idx === 0 ? "h1" : "h2";

            return (
              <div
                key={step.num}
                ref={(el) => {
                  textLayerRefs.current[idx] = el;
                }}
                aria-hidden={!isCurrent}
                className={`absolute flex flex-col ${layout.positionClass}`}
                style={{
                  opacity: isCurrent ? 1 : 0,
                  transform: isCurrent
                    ? "translate3d(0px, var(--mob-drift-y, 0px), 0) scale(1)"
                    : idx < stepIdx
                    ? layout.exitTransform
                    : layout.enterTransform,
                  transition:
                    "opacity 460ms cubic-bezier(0.22, 1, 0.36, 1), transform 580ms cubic-bezier(0.22, 1, 0.36, 1)",
                  pointerEvents: isCurrent ? "auto" : "none",
                }}
              >
                {/* Minimal kinetic step tag */}
                <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#9db5cf] mb-3">
                  {step.tabLabel}
                </p>

                {/* Masked Staggered Headline Lines */}
                <Tag
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(2.3rem, 1.35rem + 5vw, 3.6rem)",
                    fontWeight: 600,
                    lineHeight: 1.03,
                    letterSpacing: "-0.025em",
                    color: "#f1efe8",
                  }}
                >
                  {step.headlineLines.map((line, lIdx) => {
                    const xOff = layout.lineOffset(lIdx);
                    return (
                      <span key={lIdx} className="block overflow-hidden pb-0.5">
                        <span
                          className="block"
                          style={{
                            transform: isCurrent
                              ? "translate3d(0, 0, 0)"
                              : `translate3d(${xOff}px, 105%, 0)`,
                            transition: `transform 560ms cubic-bezier(0.22, 1, 0.36, 1) ${lIdx * 85}ms`,
                          }}
                        >
                          {line.text}
                          {line.highlight && (
                            <span style={{ color: "#9db5cf" }}>{line.highlight}</span>
                          )}
                        </span>
                      </span>
                    );
                  })}
                </Tag>

                <p
                  className="mt-3.5 text-[#d6d5ce] text-sm sm:text-base leading-relaxed max-w-[34ch]"
                  style={{
                    opacity: isCurrent ? 1 : 0,
                    transform: isCurrent ? "translateY(0)" : "translateY(10px)",
                    transition: "opacity 420ms ease 150ms, transform 460ms ease 150ms",
                  }}
                >
                  {step.support}
                </p>

                {/* Step 4 Finale CTAs */}
                {idx === HERO_STEPS.length - 1 && (
                  <div
                    className="mt-6 w-full max-w-sm flex flex-col sm:flex-row gap-2.5"
                    style={{
                      opacity: isCurrent ? 1 : 0,
                      transform: isCurrent ? "translateY(0)" : "translateY(14px)",
                      transition: "opacity 440ms ease 220ms, transform 500ms ease 220ms",
                    }}
                  >
                    <Link
                      href="/contact"
                      className="inline-flex items-center justify-center font-mono text-xs font-semibold uppercase tracking-wider px-5 py-3 w-full"
                      style={{
                        backgroundColor: "#f1efe8",
                        color: "#121412",
                        minHeight: 48,
                      }}
                    >
                      Start a project
                    </Link>
                    <Link
                      href="/work"
                      className="inline-flex items-center justify-center font-mono text-xs uppercase tracking-wider px-5 py-3 border border-white/35 w-full"
                      style={{
                        color: "#f1efe8",
                        backgroundColor: "rgba(18,20,18,0.55)",
                        minHeight: 48,
                      }}
                    >
                      See the work
                    </Link>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export function HeroScrollStory() {
  const prefersReducedMotion = useReducedMotion();
  const [activeStep, setActiveStep] = useState(0);
  const mounted = useHasMounted();
  const [failedVideos, setFailedVideos] = useState<Record<number, boolean>>({});

  const desktopPinRef = useRef<HTMLDivElement | null>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const videoLayerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const videoElRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const ctaRef = useRef<HTMLDivElement | null>(null);
  const borderArchRef = useRef<SVGPathElement | null>(null);
  const monolithScrollRef = useRef<HTMLDivElement | null>(null);
  const monolithTiltRef = useRef<HTMLDivElement | null>(null);
  const rightStageRef = useRef<HTMLDivElement | null>(null);
  const activeStepRef = useRef(0);

  // Desktop: play ONLY active and next video; pause all others; lazy-load videos 2–4
  useEffect(() => {
    if (!mounted || prefersReducedMotion) return;
    if (typeof window === "undefined" || !window.matchMedia("(min-width: 1024px)").matches) {
      return;
    }

    HERO_STEPS.forEach((step, idx) => {
      const vid = videoElRefs.current[idx];
      if (!vid) return;

      const shouldBeActive = idx === activeStep || idx === activeStep + 1;
      if (shouldBeActive) {
        if (!vid.getAttribute("src")) {
          vid.setAttribute("src", step.videoSrc);
          vid.load();
        }
        vid.play().catch(() => {});
      } else {
        vid.pause();
      }
    });
  }, [activeStep, mounted, prefersReducedMotion]);

  // Desktop GSAP + ScrollTrigger pinned 4-step split-screen story
  useEffect(() => {
    if (!mounted || prefersReducedMotion) return;
    if (typeof window === "undefined") return;

    const pinEl = desktopPinRef.current;
    if (!pinEl) return;

    let cancelled = false;
    let mm: { revert: () => void } | null = null;

    Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(
      ([{ gsap }, { ScrollTrigger }]) => {
        if (cancelled || !pinEl) return;
        gsap.registerPlugin(ScrollTrigger);

        const matchMedia = gsap.matchMedia();
        mm = matchMedia;

        matchMedia.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
          // Draw the floating 3D wire-arch halo stroke once on load
          if (borderArchRef.current) {
            const len = borderArchRef.current.getTotalLength();
            gsap.set(borderArchRef.current, {
              strokeDasharray: len,
              strokeDashoffset: len,
            });
            gsap.to(borderArchRef.current, {
              strokeDashoffset: 0,
              duration: 1.25,
              ease: "power2.out",
              delay: 0.12,
            });
          }

          // Initial sculptural 3D angle for Step 01 (angled gently toward the headline)
          const MONOLITH_POSES = [
            { rotateY: -11, rotateX: 4, rotateZ: -0.6, scale: 0.99 },
            { rotateY: 7, rotateX: -3, rotateZ: 0.5, scale: 1.0 },
            { rotateY: -8, rotateX: 3.5, rotateZ: -0.4, scale: 1.0 },
            { rotateY: 0, rotateX: 0, rotateZ: 0, scale: 1.02 },
          ];
          if (monolithScrollRef.current) {
            gsap.set(monolithScrollRef.current, MONOLITH_POSES[0]);
          }

          // Interactive desktop pointer 3D tilt on nested pivot (composes cleanly with scroll poses)
          let removePointerListeners: (() => void) | null = null;
          if (rightStageRef.current && monolithTiltRef.current) {
            const stageEl = rightStageRef.current;
            const tiltEl = monolithTiltRef.current;
            const qRotY = gsap.quickTo(tiltEl, "rotateY", { duration: 0.65, ease: "power3.out" });
            const qRotX = gsap.quickTo(tiltEl, "rotateX", { duration: 0.65, ease: "power3.out" });

            const onMove = (e: MouseEvent) => {
              const rect = stageEl.getBoundingClientRect();
              const nx = (e.clientX - rect.left) / rect.width - 0.5;
              const ny = (e.clientY - rect.top) / rect.height - 0.5;
              qRotY(nx * 11);
              qRotX(-ny * 9);
            };
            const onLeave = () => {
              qRotY(0);
              qRotX(0);
            };
            stageEl.addEventListener("mousemove", onMove, { passive: true });
            stageEl.addEventListener("mouseleave", onLeave);
            removePointerListeners = () => {
              stageEl.removeEventListener("mousemove", onMove);
              stageEl.removeEventListener("mouseleave", onLeave);
            };
          }

          // Initialize slides 1..3 hidden below masks; slide 0 painted & visible
          slideRefs.current.forEach((slideEl, idx) => {
            if (!slideEl) return;
            const lines = slideEl.querySelectorAll("[data-hero-line]");
            const support = slideEl.querySelector("[data-hero-support]");
            if (idx === 0) {
              gsap.set(slideEl, { autoAlpha: 1, zIndex: 2 });
              gsap.set(lines, { yPercent: 0, opacity: 1 });
              if (support) gsap.set(support, { y: 0, opacity: 1 });
            } else {
              gsap.set(slideEl, { autoAlpha: 0, zIndex: 1 });
              gsap.set(lines, { yPercent: 105, opacity: 0 });
              if (support) gsap.set(support, { y: 12, opacity: 0 });
            }
          });

          // Initialize video layers 1..3 clipped below; layer 0 visible
          videoLayerRefs.current.forEach((layerEl, idx) => {
            if (!layerEl) return;
            if (idx === 0) {
              gsap.set(layerEl, {
                opacity: 1,
                clipPath: "inset(0% 0% 0% 0%)",
                scale: 1,
                zIndex: 1,
              });
            } else {
              gsap.set(layerEl, {
                opacity: 0,
                clipPath: "inset(100% 0% 0% 0%)",
                scale: 1.05,
                zIndex: idx + 1,
              });
            }
          });

          if (ctaRef.current) {
            gsap.set(ctaRef.current, { autoAlpha: 0, y: 16 });
          }

          // Single scrubbed GSAP timeline across all 4 steps
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: pinEl,
              start: "top top",
              end: "+=300%",
              pin: true,
              scrub: 0.65,
              anticipatePin: 1,
              invalidateOnRefresh: true,
              onUpdate: (self) => {
                const nextIdx = Math.min(
                  HERO_STEPS.length - 1,
                  Math.floor(self.progress * (HERO_STEPS.length - 0.01))
                );
                if (nextIdx !== activeStepRef.current) {
                  activeStepRef.current = nextIdx;
                  setActiveStep(nextIdx);
                }
              },
            },
          });

          for (let i = 0; i < HERO_STEPS.length - 1; i++) {
            const outSlide = slideRefs.current[i];
            const inSlide = slideRefs.current[i + 1];
            const inVideo = videoLayerRefs.current[i + 1];

            if (!outSlide || !inSlide || !inVideo) continue;

            const outLines = outSlide.querySelectorAll("[data-hero-line]");
            const outSupport = outSlide.querySelector("[data-hero-support]");
            const inLines = inSlide.querySelectorAll("[data-hero-line]");
            const inSupport = inSlide.querySelector("[data-hero-support]");

            // Reading beat for current step
            tl.to({}, { duration: 0.32 });

            const label = `step-${i + 1}`;
            tl.addLabel(label);

            // Outgoing text slides up and fades
            tl.to(
              outLines,
              {
                yPercent: -105,
                opacity: 0,
                duration: 0.42,
                stagger: 0.08,
                ease: "power2.in",
              },
              label
            );
            if (outSupport) {
              tl.to(
                outSupport,
                { y: -10, opacity: 0, duration: 0.32, ease: "power2.in" },
                label
              );
            }
            tl.set(outSlide, { autoAlpha: 0, zIndex: 1 }, `${label}+=0.45`);

            // Right 3D monolith shifts sculptural camera angle + video crossfades with clip-path & scale
            if (monolithScrollRef.current) {
              tl.to(
                monolithScrollRef.current,
                {
                  ...MONOLITH_POSES[i + 1],
                  duration: 0.72,
                  ease: "power2.inOut",
                },
                `${label}+=0.04`
              );
            }
            tl.to(
              inVideo,
              {
                opacity: 1,
                clipPath: "inset(0% 0% 0% 0%)",
                scale: 1,
                duration: 0.6,
                ease: "power2.inOut",
              },
              `${label}+=0.08`
            );

            // Incoming text slides up line by line from behind overflow masks
            tl.set(inSlide, { autoAlpha: 1, zIndex: 2 }, `${label}+=0.28`);
            tl.to(
              inLines,
              {
                yPercent: 0,
                opacity: 1,
                duration: 0.48,
                stagger: 0.08,
                ease: "power3.out",
              },
              `${label}+=0.3`
            );
            if (inSupport) {
              tl.to(
                inSupport,
                { y: 0, opacity: 1, duration: 0.36, ease: "power2.out" },
                `${label}+=0.46`
              );
            }
          }

          // After Step 4: reveal dual CTAs, then release naturally
          if (ctaRef.current) {
            tl.to(
              ctaRef.current,
              { autoAlpha: 1, y: 0, duration: 0.38, ease: "power2.out" },
              "-=0.05"
            );
          }
          tl.to({}, { duration: 0.35 });

          return () => {
            if (removePointerListeners) removePointerListeners();
          };
        });
      }
    );

    const videoSnapshot = videoElRefs.current;
    return () => {
      cancelled = true;
      if (mm) mm.revert();
      videoSnapshot.forEach((v) => v?.pause());
    };
  }, [mounted, prefersReducedMotion]);

  const currentStep = HERO_STEPS[activeStep] || HERO_STEPS[0];

  // Reduced-motion fallback: all 4 steps stacked statically with WebP posters & buttons visible
  if (mounted && prefersReducedMotion) {
    return (
      <div className="wrap relative z-10 pt-10 pb-14">
        <div className="flex items-center gap-3 font-mono text-xs text-[var(--text-2)] tracking-widest uppercase mb-6">
          <span className="h-1.5 w-1.5 rounded-full bg-[#38536F]" />
          <span>STUDIO · SOFTWARE ENGINEERING</span>
        </div>

        <div className="grid gap-10 lg:grid-cols-2">
          {HERO_STEPS.map((step, i) => (
            <MobileStoryBlock key={step.num} step={step} index={i} reducedMotion />
          ))}
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <Link
            href="/contact"
            className="btn text-xs font-mono tracking-wider uppercase"
            style={{ minHeight: 48, paddingInline: "var(--s-5)" }}
          >
            Start a project
          </Link>
          <Link
            href="/work"
            className="btn btn-secondary text-xs font-mono tracking-wider uppercase"
            style={{ minHeight: 48, paddingInline: "var(--s-5)" }}
          >
            See the work
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* ==================== DESKTOP (>= 1024px): PINNED SPLIT-SCREEN STORY ==================== */}
      <div
        ref={desktopPinRef}
        className="hidden lg:flex relative z-10 min-h-screen w-full items-center pt-20 pb-10"
      >
        <div className="wrap w-full">
          <div className="grid grid-cols-12 gap-8 xl:gap-12 items-center">
            {/* LEFT COLUMN (~45% -> 5 cols): Label, Progress, Masked Headlines, Support, Final CTAs */}
            <div className="col-span-5 flex flex-col justify-between min-h-[min(68vh,540px)] py-2">
              {/* Top Mono Studio Strip + Step Progress */}
              <div>
                <div className="flex items-center gap-3 font-mono text-xs text-[var(--text-2)] tracking-widest uppercase">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#38536F]" />
                  <span>STUDIO · SOFTWARE ENGINEERING</span>
                </div>

                {/* Step Progress Indicator (01 / 04) */}
                <div className="mt-6 flex items-center gap-4">
                  <span
                    className="font-mono text-xs font-semibold tracking-widest"
                    style={{ color: "#38536F" }}
                    aria-live="polite"
                  >
                    {currentStep.num} / 04
                  </span>
                  <div className="flex items-center gap-1.5 flex-1 max-w-[160px]" aria-hidden="true">
                    {HERO_STEPS.map((s, idx) => (
                      <span
                        key={s.num}
                        className="h-[2px] flex-1 transition-colors duration-300"
                        style={{
                          backgroundColor:
                            idx <= activeStep ? "#38536F" : "var(--line)",
                        }}
                      />
                    ))}
                  </div>
                  <span className="font-mono text-[11px] uppercase tracking-widest text-[var(--text-2)]">
                    {currentStep.tag}
                  </span>
                </div>
              </div>

              {/* Center Stacked Masked Headline & Support Slot */}
              <div className="relative my-auto min-h-[260px] flex items-center">
                {HERO_STEPS.map((step, idx) => (
                  <div
                    key={step.num}
                    ref={(el) => {
                      slideRefs.current[idx] = el;
                    }}
                    className="absolute inset-x-0 top-1/2 -translate-y-1/2"
                    style={{
                      opacity: idx === 0 ? 1 : 0,
                      visibility: idx === 0 ? "visible" : "hidden",
                    }}
                  >
                    <StepHeadline step={step} asH1={idx === 0} lineAttr />
                    <p
                      data-hero-support
                      className="mt-5 text-[var(--text-2)] text-base xl:text-lg leading-relaxed font-sans"
                      style={{ maxWidth: "38ch" }}
                    >
                      {step.support}
                    </p>
                  </div>
                ))}
              </div>

              {/* Bottom Slot: Final CTAs revealed at Step 4 + Scroll Cue */}
              <div className="pt-4">
                <div
                  ref={ctaRef}
                  className="flex flex-wrap items-center gap-3.5"
                  style={{ opacity: 0, visibility: "hidden" }}
                >
                  <Link
                    href="/contact"
                    className="btn text-xs font-mono tracking-wider uppercase"
                    style={{ minHeight: 48, paddingInline: "var(--s-5)" }}
                  >
                    Start a project
                  </Link>
                  <Link
                    href="/work"
                    className="btn btn-secondary text-xs font-mono tracking-wider uppercase"
                    style={{ minHeight: 48, paddingInline: "var(--s-5)" }}
                  >
                    See the work
                  </Link>
                </div>

                <div className="mt-5 flex items-center justify-between border-t border-line pt-3 font-mono text-[11px] uppercase tracking-widest text-[var(--text-2)]">
                  <span>{activeStep < 3 ? "Scroll to continue" : "Ready when you are"}</span>
                  <span>{currentStep.tabLabel}</span>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN (~55% -> 7 cols): Sculptural 3D Arched Architectural Portal */}
            <div
              ref={rightStageRef}
              className="col-span-7 flex items-center justify-center py-4 px-2 xl:px-6"
              style={{ perspective: "1450px" }}
            >
              <div
                ref={monolithScrollRef}
                className="relative w-full max-w-[680px] will-change-transform"
                style={{ transformStyle: "preserve-3d" }}
              >
                <div
                  ref={monolithTiltRef}
                  className="relative w-full will-change-transform"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  {/* DEPTH LAYER -1 (-52px): Architectural Backplate Silhouette & Soft Ground Shadow */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 rounded-t-[200px] rounded-b-[22px] border border-[var(--line)] bg-[#e6e3d9]/75"
                    style={{
                      transform: "translate3d(18px, 22px, -52px)",
                      boxShadow: "0 44px 90px -24px rgba(24, 28, 32, 0.28)",
                    }}
                  />

                  {/* DEPTH LAYER 0 (0px): Main Sculpted Arched Glass Video Monolith */}
                  <div
                    className="relative aspect-[4/3.1] max-h-[68vh] w-full overflow-hidden rounded-t-[196px] rounded-b-[20px] border border-[#20221f]/20 bg-[#151715]"
                    style={{
                      boxShadow:
                        "0 30px 70px -18px rgba(20, 22, 19, 0.38), inset 0 1px 0 rgba(255,255,255,0.28)",
                    }}
                  >
                    {/* Stacked 4-Layer HD Video Window */}
                    {HERO_STEPS.map((step, idx) => {
                      const failed = !!failedVideos[idx];
                      return (
                        <div
                          key={step.num}
                          ref={(el) => {
                            videoLayerRefs.current[idx] = el;
                          }}
                          className="absolute inset-0 h-full w-full will-change-transform"
                          style={{
                            opacity: idx === 0 ? 1 : 0,
                            zIndex: idx + 1,
                          }}
                        >
                          {failed ? (
                            /* eslint-disable-next-line @next/next/no-img-element */
                            <img
                              src={step.posterSrc}
                              alt={step.posterAlt}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <video
                              ref={(el) => {
                                videoElRefs.current[idx] = el;
                              }}
                              src={idx === 0 ? step.videoSrc : undefined}
                              poster={step.posterSrc}
                              muted
                              loop
                              playsInline
                              autoPlay={idx === 0}
                              preload={idx === 0 ? "metadata" : "none"}
                              onError={() =>
                                setFailedVideos((prev) => ({ ...prev, [idx]: true }))
                              }
                              className="h-full w-full object-cover"
                              aria-label={step.posterAlt}
                            />
                          )}
                        </div>
                      );
                    })}

                    {/* Subtle Architectural Specular Arch Sheen */}
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 z-20 rounded-t-[196px] rounded-b-[20px]"
                      style={{
                        background:
                          "linear-gradient(135deg, rgba(255,255,255,0.16) 0%, rgba(255,255,255,0.0) 36%, rgba(16,18,16,0.22) 100%)",
                      }}
                    />
                  </div>

                  {/* DEPTH LAYER +1 (+30px): Floating Precision Wire-Arch Contour (Self-Drawing SVG) */}
                  <svg
                    aria-hidden="true"
                    className="pointer-events-none absolute -inset-3 z-30 h-[calc(100%+24px)] w-[calc(100%+24px)] overflow-visible"
                    viewBox="0 0 680 530"
                    preserveAspectRatio="none"
                    style={{ transform: "translateZ(30px)" }}
                  >
                    <path
                      ref={borderArchRef}
                      d="M 24 522 L 656 522 Q 672 522 672 506 L 672 210 C 672 95 575 8 340 8 C 105 8 8 95 8 210 L 8 506 Q 8 522 24 522 Z"
                      fill="none"
                      stroke="#38536F"
                      strokeOpacity="0.52"
                      strokeWidth="1.25"
                    />
                  </svg>

                  {/* DEPTH LAYER +2 (+56px): Floating 3D Glassmorphic Studio Badges */}
                  <div
                    className="pointer-events-none absolute -top-2 right-5 z-40 flex items-center gap-2 rounded-full border border-[#d9d7cf] bg-[#faf9f5]/95 px-3.5 py-1.5 font-mono text-[11px] font-semibold uppercase tracking-widest backdrop-blur-sm"
                    style={{
                      color: "#38536F",
                      transform: "translateZ(56px)",
                      boxShadow: "0 14px 30px -8px rgba(20,22,19,0.22)",
                    }}
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-[#38536F]" />
                    <span>{currentStep.tabLabel}</span>
                  </div>

                  <div
                    className="pointer-events-none absolute -bottom-3 left-6 z-40 flex items-center gap-2.5 rounded-full border border-white/15 bg-[#181a18]/92 px-4 py-1.5 font-mono text-[11px] uppercase tracking-widest text-[#f1efe8] backdrop-blur-sm"
                    style={{
                      transform: "translateZ(56px)",
                      boxShadow: "0 18px 34px -10px rgba(0,0,0,0.45)",
                    }}
                  >
                    <span className="text-[#9db5cf] font-semibold">
                      {currentStep.num}
                    </span>
                    <span className="h-3 w-px bg-white/20" />
                    <span>HAFTECH // STUDIO</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ==================== MOBILE (< 1024px): UNIFIED STICKY FULL-BLEED STORY ==================== */}
      <MobileStickyHero />
    </>
  );
}
