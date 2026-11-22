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
  const borderRectRef = useRef<SVGRectElement | null>(null);
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
          // Draw the architectural frame border stroke once on load
          if (borderRectRef.current) {
            const len = borderRectRef.current.getTotalLength();
            gsap.set(borderRectRef.current, {
              strokeDasharray: len,
              strokeDashoffset: len,
            });
            gsap.to(borderRectRef.current, {
              strokeDashoffset: 0,
              duration: 1.15,
              ease: "power2.out",
              delay: 0.12,
            });
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

            // Right video crossfades + clip-path & scale reveals (0.6s equivalent)
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

            {/* RIGHT COLUMN (~55% -> 7 cols): Grid-Aligned Squared Architectural Media Frame */}
            <div className="col-span-7">
              <div className="relative border border-line bg-[var(--surface)]">
                {/* Self-Drawing SVG Frame Border on First Load */}
                <svg
                  className="pointer-events-none absolute inset-0 z-30 h-full w-full"
                  viewBox="0 0 1000 660"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <rect
                    ref={borderRectRef}
                    x="1"
                    y="1"
                    width="998"
                    height="658"
                    fill="none"
                    stroke="#38536F"
                    strokeOpacity="0.45"
                    strokeWidth="1.5"
                  />
                </svg>

                <CornerNotches />

                {/* Top Technical Drawing Caption Tab */}
                <div className="relative z-20 flex items-center justify-between border-b border-line bg-[var(--bg)]/90 px-4 py-2 font-mono text-[11px] uppercase tracking-widest text-[var(--text-2)]">
                  <span style={{ color: "#38536F", fontWeight: 600 }}>
                    {currentStep.tabLabel}
                  </span>
                  <span>HAFTECH // STUDIO REEL</span>
                </div>

                {/* Stacked 4-Layer Video Window */}
                <div className="relative aspect-[16/10] max-h-[66vh] w-full overflow-hidden bg-[#151715]">
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
                </div>

                {/* Bottom Technical Caption Strip */}
                <div className="relative z-20 flex items-center justify-between border-t border-line bg-[var(--bg)]/90 px-4 py-2 font-mono text-[11px] uppercase tracking-wider text-[var(--text-2)]">
                  <span>STEP {currentStep.num} OF 04</span>
                  <span>{currentStep.tag}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ==================== MOBILE (< 1024px): CLEAN STACKED SCROLL BLOCKS ==================== */}
      <div className="block lg:hidden wrap relative z-10 pt-8 pb-12">
        <div className="flex items-center gap-3 font-mono text-xs text-[var(--text-2)] tracking-widest uppercase mb-4">
          <span className="h-1.5 w-1.5 rounded-full bg-[#38536F]" />
          <span>STUDIO · SOFTWARE ENGINEERING</span>
        </div>

        <div>
          {HERO_STEPS.map((step, idx) => (
            <MobileStoryBlock
              key={step.num}
              step={step}
              index={idx}
              reducedMotion={false}
            />
          ))}
        </div>

        {/* Thumb-reachable CTAs at the end of Step 4 */}
        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <Link
            href="/contact"
            className="btn justify-center text-xs font-mono tracking-wider uppercase w-full sm:w-auto"
            style={{ minHeight: 48, paddingInline: "var(--s-5)" }}
          >
            Start a project
          </Link>
          <Link
            href="/work"
            className="btn btn-secondary justify-center text-xs font-mono tracking-wider uppercase w-full sm:w-auto"
            style={{ minHeight: 48, paddingInline: "var(--s-5)" }}
          >
            See the work
          </Link>
        </div>
      </div>
    </>
  );
}
