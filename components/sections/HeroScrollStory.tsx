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
  const [stepIdx, setStepIdx] = useState(0);
  const stepIdxRef = useRef(0);
  const [failed, setFailed] = useState<Record<number, boolean>>({});

  // Native scroll-linked step tracker (pure CSS sticky — zero JS scroll-jacking)
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
      const next = Math.min(
        HERO_STEPS.length - 1,
        Math.floor(progress * (HERO_STEPS.length - 0.01))
      );
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

  // Play ONLY active & next video on mobile; pause others; pause all when scrolled past hero
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

  const jumpToStep = (targetIdx: number) => {
    const runway = runwayRef.current;
    if (!runway) return;
    const top = runway.getBoundingClientRect().top + window.scrollY;
    const scrollable = Math.max(1, runway.offsetHeight - window.innerHeight);
    const targetProgress =
      HERO_STEPS.length > 1 ? (targetIdx + 0.15) / HERO_STEPS.length : 0;
    window.scrollTo({
      top: top + Math.min(1, targetProgress) * scrollable,
      behavior: "smooth",
    });
  };

  const active = HERO_STEPS[stepIdx] || HERO_STEPS[0];

  return (
    <div ref={runwayRef} className="block lg:hidden relative h-[255svh] w-full">
      <div className="sticky top-0 h-[100svh] w-full overflow-hidden bg-[#121412] text-[#f1efe8] flex flex-col justify-between">
        {/* Full-Bleed Stacked 4 Video Background */}
        <div className="absolute inset-0 z-0">
          {HERO_STEPS.map((step, idx) => {
            const isActive = idx === stepIdx;
            return (
              <div
                key={step.num}
                className="absolute inset-0 h-full w-full"
                style={{
                  opacity: isActive ? 1 : 0,
                  transform: isActive ? "scale(1)" : "scale(1.04)",
                  transition: "opacity 560ms ease, transform 750ms ease",
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

          {/* Editorial Scrim for >= 10:1 Text Legibility */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-10"
            style={{
              background:
                "linear-gradient(to top, rgba(14,16,14,0.94) 0%, rgba(14,16,14,0.52) 48%, rgba(14,16,14,0.72) 100%)",
            }}
          />

          {/* Subtle Architectural Corner Registration Marks */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-3 top-18 z-10"
          >
            <span className="absolute top-0 left-0 h-3.5 w-3.5 border-t border-l border-[#9db5cf]/70" />
            <span className="absolute top-0 right-0 h-3.5 w-3.5 border-t border-r border-[#9db5cf]/70" />
            <span className="absolute bottom-0 left-0 h-3.5 w-3.5 border-b border-l border-[#9db5cf]/70" />
            <span className="absolute bottom-0 right-0 h-3.5 w-3.5 border-b border-r border-[#9db5cf]/70" />
          </div>
        </div>

        {/* Top Bar: Studio Label & Tappable 01 / 04 Progress Segments */}
        <div className="relative z-20 px-5 pt-22">
          <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-widest text-[#d6d5ce]">
            <span className="inline-flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#9db5cf]" />
              <span>Studio · Software Engineering</span>
            </span>
            <span className="font-semibold text-[#9db5cf]" aria-live="polite">
              {active.num} / 04
            </span>
          </div>

          <div className="mt-3 grid grid-cols-4 gap-1.5" role="tablist" aria-label="Hero story steps">
            {HERO_STEPS.map((s, idx) => (
              <button
                key={s.num}
                type="button"
                role="tab"
                aria-selected={idx === stepIdx}
                aria-label={`${s.num} ${s.tag}`}
                onClick={() => jumpToStep(idx)}
                className="py-2 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#9db5cf]"
              >
                <span
                  className="block h-[2.5px] w-full transition-colors duration-300"
                  style={{
                    backgroundColor:
                      idx <= stepIdx ? "#9db5cf" : "rgba(241,239,232,0.24)",
                  }}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Bottom Editorial Story Overlay */}
        <div className="relative z-20 px-5 pb-8">
          <div className="relative min-h-[215px] flex items-end">
            {HERO_STEPS.map((step, idx) => {
              const isCurrent = idx === stepIdx;
              const Tag = idx === 0 ? "h1" : "h2";
              return (
                <div
                  key={step.num}
                  aria-hidden={!isCurrent}
                  className="absolute inset-x-0 bottom-0"
                  style={{
                    opacity: isCurrent ? 1 : 0,
                    transform: isCurrent
                      ? "translateY(0)"
                      : idx < stepIdx
                      ? "translateY(-14px)"
                      : "translateY(14px)",
                    transition: "opacity 380ms ease, transform 420ms ease",
                    pointerEvents: isCurrent ? "auto" : "none",
                  }}
                >
                  <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#9db5cf] mb-2.5">
                    {step.tabLabel}
                  </p>
                  <Tag
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "clamp(2.2rem, 1.35rem + 4.8vw, 3.5rem)",
                      fontWeight: 600,
                      lineHeight: 1.03,
                      letterSpacing: "-0.025em",
                      color: "#f1efe8",
                    }}
                  >
                    {step.headlineLines.map((line, lIdx) => (
                      <span key={lIdx} className="block">
                        {line.text}
                        {line.highlight && (
                          <span style={{ color: "#9db5cf" }}>{line.highlight}</span>
                        )}
                      </span>
                    ))}
                  </Tag>

                  <p className="mt-3 text-[#d6d5ce] text-sm sm:text-base leading-relaxed max-w-[36ch]">
                    {step.support}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Bottom Slot: Scroll Cue on Steps 1–3, Dual CTAs on Step 4 */}
          <div className="mt-6 min-h-[52px] flex items-center">
            {stepIdx < HERO_STEPS.length - 1 ? (
              <div className="w-full flex items-center justify-between border-t border-white/15 pt-3 font-mono text-[11px] uppercase tracking-widest text-[#d6d5ce]">
                <span>Scroll to continue</span>
                <span aria-hidden="true">↓</span>
              </div>
            ) : (
              <div className="w-full flex flex-col sm:flex-row gap-2.5">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center font-mono text-xs font-semibold uppercase tracking-wider px-5 py-3 w-full sm:w-auto"
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
                  className="inline-flex items-center justify-center font-mono text-xs uppercase tracking-wider px-5 py-3 border border-white/35 w-full sm:w-auto"
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

      {/* ==================== MOBILE (< 1024px): UNIFIED STICKY FULL-BLEED STORY ==================== */}
      <MobileStickyHero />
    </>
  );
}
