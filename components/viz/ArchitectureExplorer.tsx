"use client";
import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { layers, layersCaption } from "@/content/copy";

// Enhanced layer data with responsibilities, examples, and failure modes per doc 10 §10.1
export interface LayerDetail {
  id: string;
  name: string;
  role: string;
  responsibilities: string[];
  technologies: string[];
  failureModes: string;
}

export const layerDetails: LayerDetail[] = [
  {
    id: "ui",
    name: "User interface",
    role: "Presentation & Input",
    responsibilities: [
      "Semantic HTML & responsive layouts",
      "Accessible interactions (WCAG 2.2 AA)",
      "Client state management & optimistic updates",
    ],
    technologies: ["React / Next.js", "Tailwind CSS", "Semantic HTML", "WAI-ARIA"],
    failureModes: "Layout shifts, unresponsive inputs, hydration mismatches.",
  },
  {
    id: "app",
    name: "Application layer",
    role: "Routing & State Orchestration",
    responsibilities: [
      "Server-side rendering & static caching",
      "Session management & request routing",
      "Client/server boundary coordination",
    ],
    technologies: ["Next.js App Router", "Server Components", "Middleware"],
    failureModes: "Memory leaks, unhandled route exceptions, cache invalidation delays.",
  },
  {
    id: "auth",
    name: "Authentication",
    role: "Identity & Access Control",
    responsibilities: [
      "Credential validation & token issuance",
      "Role-based access control (RBAC)",
      "Secure cookie & session lifecycle",
    ],
    technologies: ["JWT / Secure Cookies", "OAuth2 / OIDC", "Argon2 / bcrypt"],
    failureModes: "Token expiration in-flight, replay vulnerabilities, unauthorized privilege escalation.",
  },
  {
    id: "api",
    name: "API",
    role: "Contract & Transport",
    responsibilities: [
      "Strict input parsing & schema validation",
      "Rate limiting, throttling & bot filtering",
      "Standardised JSON error responses",
    ],
    technologies: ["REST endpoints", "Zod validation", "Cloudflare Turnstile", "Edge handlers"],
    failureModes: "Schema payload drift, unhandled rate limit bursts, serialization overhead.",
  },
  {
    id: "logic",
    name: "Business logic",
    role: "Domain Rules & Workflows",
    responsibilities: [
      "Domain model calculations & validations",
      "Transaction boundaries & idempotency",
      "Event dispatching & async tasks",
    ],
    technologies: ["TypeScript Domain Services", "State Machines", "Task Queues"],
    failureModes: "Race conditions, non-idempotent duplicate processing, partial failure rollbacks.",
  },
  {
    id: "db",
    name: "Database",
    role: "Persistence & Integrity",
    responsibilities: [
      "Relational integrity & constraints",
      "Indexed query optimization",
      "Automated migration pipelines",
    ],
    technologies: ["PostgreSQL", "Neon / Supabase", "Connection Pooling"],
    failureModes: "Connection exhaustion, locking bottlenecks, slow unindexed scans.",
  },
  {
    id: "infra",
    name: "Infrastructure",
    role: "Runtime & Deployment",
    responsibilities: [
      "Global CDN edge caching",
      "Automated CI/CD pipelines",
      "Telemetry, health checks & alerts",
    ],
    technologies: ["Vercel Edge Network", "Docker", "Zero-downtime deploys"],
    failureModes: "Cold start spikes, DNS propagation lag, regional network partitions.",
  },
  {
    id: "ext",
    name: "External integrations",
    role: "Third-Party Services",
    responsibilities: [
      "Transactional email & notification hooks",
      "Payment gateway tokenization & webhooks",
      "Circuit breakers & exponential retry",
    ],
    technologies: ["Resend / Postmark", "Stripe / Paystack", "Webhook verifiers"],
    failureModes: "Third-party outages, webhook timeout drops, delivery retries.",
  },
];

export function ArchitectureExplorer() {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [activeLeg, setActiveLeg] = useState<number | null>(null);
  const [isTracing, setIsTracing] = useState(false);
  const [tracePaused, setTracePaused] = useState(false);
  const [traceStep, setTraceStep] = useState(0);

  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const markerRef = useRef<SVGCircleElement | null>(null);

  // Request trace path order (down to DB, then back up to UI, with branch to external integrations)
  // Leg index maps to layer index: UI(0) -> App(1) -> Auth(2) -> API(3) -> Logic(4) -> DB(5) -> Logic(4) -> Ext(7) -> Logic(4) -> API(3) -> App(1) -> UI(0)
  const traceSequence = [0, 1, 2, 3, 4, 5, 4, 7, 4, 3, 1, 0];

  useEffect(() => {
    return () => {
      if (timelineRef.current) {
        timelineRef.current.kill();
      }
    };
  }, []);

  const runTrace = () => {
    if (timelineRef.current) {
      timelineRef.current.kill();
    }

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setIsTracing(true);
    setTracePaused(false);

    if (prefersReduced) {
      // Step-based without smooth travelling animation
      let step = 0;
      const interval = setInterval(() => {
        if (step >= traceSequence.length) {
          clearInterval(interval);
          setIsTracing(false);
          setActiveLeg(null);
        } else {
          setActiveLeg(traceSequence[step]);
          setSelectedIdx(traceSequence[step]);
          setTraceStep(step);
          step++;
        }
      }, 400);
      return;
    }

    const tl = gsap.timeline({
      onComplete: () => {
        setIsTracing(false);
        setActiveLeg(null);
        setTraceStep(0);
      },
    });

    timelineRef.current = tl;

    traceSequence.forEach((layerIdx, stepIdx) => {
      tl.call(() => {
        setActiveLeg(layerIdx);
        setSelectedIdx(layerIdx);
        setTraceStep(stepIdx);
      });

      // Target Y in SVG for layer: 4 + layerIdx * 42 + 21
      const targetY = 16 + layerIdx * 42;
      tl.to(
        markerRef.current,
        {
          attr: { cy: targetY },
          duration: 0.22,
          ease: "power2.inOut",
        },
        "+=0.08"
      );
    });
  };

  const pauseTrace = () => {
    if (!timelineRef.current) return;
    if (tracePaused) {
      timelineRef.current.play();
      setTracePaused(false);
    } else {
      timelineRef.current.pause();
      setTracePaused(true);
    }
  };

  const stepForward = () => {
    const nextStep = (traceStep + 1) % traceSequence.length;
    setTraceStep(nextStep);
    const layerIdx = traceSequence[nextStep];
    setActiveLeg(layerIdx);
    setSelectedIdx(layerIdx);
    if (markerRef.current) {
      markerRef.current.setAttribute("cy", String(16 + layerIdx * 42));
    }
  };

  const current = layerDetails[selectedIdx];
  const h = 42;

  return (
    <div className="border border-line bg-surface p-4 sm:p-6 lg:p-8">
      {/* Top control bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-line pb-4">
        <div>
          <span className="label">Interactive System Model</span>
          <p className="text-sm text-[var(--text-2)] mt-1">
            Select any tier to inspect guarantees, interfaces and failure modes.
          </p>
        </div>
        <div className="flex items-center gap-2">
          {!isTracing ? (
            <button
              type="button"
              onClick={runTrace}
              className="btn btn-secondary text-xs py-2 px-4"
              style={{ minHeight: 40 }}
            >
              ▶ Trace a request
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={pauseTrace}
                className="btn btn-secondary text-xs py-2 px-3"
                style={{ minHeight: 40 }}
              >
                {tracePaused ? "Resume" : "Pause"}
              </button>
              <button
                type="button"
                onClick={stepForward}
                className="btn btn-secondary text-xs py-2 px-3"
                style={{ minHeight: 40 }}
              >
                Step →
              </button>
              <button
                type="button"
                onClick={() => {
                  timelineRef.current?.kill();
                  setIsTracing(false);
                  setActiveLeg(null);
                }}
                className="label text-xs px-2"
                style={{ minHeight: 40, background: "none", border: 0, cursor: "pointer" }}
              >
                Reset
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Main 2-column layout */}
      <div className="mt-6 grid gap-8 lg:grid-cols-12 items-start">
        {/* Left: SVG Diagram (8 stacked tiers + active tracer) */}
        <div className="lg:col-span-7">
          <svg
            viewBox={`0 0 460 ${layerDetails.length * h + 8}`}
            role="img"
            aria-label="Interactive architecture diagram showing eight stacked tiers of software infrastructure."
            className="w-full h-auto select-none"
            style={{ color: "var(--accent)" }}
          >
            {/* Background trace line */}
            <line
              x1="24"
              y1="16"
              x2="24"
              y2={layerDetails.length * h - 20}
              stroke="var(--ht-border)"
              strokeWidth="2"
              strokeDasharray="4 4"
            />

            {layerDetails.map((l, i) => {
              const isSelected = selectedIdx === i;
              const isLegActive = activeLeg === i;
              const y = 4 + i * h;

              return (
                <g
                  key={l.id}
                  role="button"
                  tabIndex={0}
                  aria-pressed={isSelected}
                  aria-label={`${l.name}: ${l.role}`}
                  onClick={() => setSelectedIdx(i)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setSelectedIdx(i);
                    }
                  }}
                  className="cursor-pointer focus:outline-none"
                  style={{
                    opacity: isTracing && activeLeg !== null && !isLegActive ? 0.35 : 1,
                    transition: "opacity 0.22s ease-in-out",
                  }}
                >
                  {/* Layer Box */}
                  <rect
                    x="48"
                    y={y}
                    width="408"
                    height={h - 6}
                    fill={isSelected || isLegActive ? "var(--ht-blue)" : "var(--bg)"}
                    fillOpacity={isSelected || isLegActive ? 0.12 : 1}
                    stroke={isSelected || isLegActive ? "var(--ht-blue)" : "var(--ht-border)"}
                    strokeWidth={isSelected || isLegActive ? "1.75" : "1"}
                    className="transition-colors duration-200"
                  />

                  {/* Connect dot */}
                  <circle
                    cx="24"
                    cy={y + (h - 6) / 2}
                    r={isSelected || isLegActive ? "4" : "2.5"}
                    fill={isSelected || isLegActive ? "var(--ht-blue)" : "var(--ht-border-strong)"}
                    className="transition-all duration-200"
                  />

                  {/* Connecting arm */}
                  <line
                    x1="24"
                    y1={y + (h - 6) / 2}
                    x2="48"
                    y2={y + (h - 6) / 2}
                    stroke={isSelected || isLegActive ? "var(--ht-blue)" : "var(--ht-border)"}
                    strokeWidth="1"
                  />

                  {/* Numeral + Layer name */}
                  <text
                    x="62"
                    y={y + 23}
                    fill="var(--text)"
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 12,
                      fontWeight: isSelected ? 600 : 500,
                      letterSpacing: "0.04em",
                      textTransform: "uppercase",
                    }}
                  >
                    {String(i + 1).padStart(2, "0")} {l.name}
                  </text>

                  {/* Role descriptor badge on desktop */}
                  <text
                    x="440"
                    y={y + 23}
                    textAnchor="end"
                    fill="var(--text-2)"
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 11,
                      textTransform: "uppercase",
                    }}
                  >
                    {l.role}
                  </text>
                </g>
              );
            })}

            {/* Traveling request tracer marker */}
            <circle
              ref={markerRef}
              cx="24"
              cy="20"
              r="6"
              fill="var(--ht-blue)"
              stroke="var(--ht-ivory)"
              strokeWidth="2"
              style={{
                display: isTracing ? "block" : "none",
                filter: "drop-shadow(0 0 4px rgba(52, 76, 104, 0.5))",
              }}
            />
          </svg>
        </div>

        {/* Right: Detailed Inspection Panel */}
        <div
          className="lg:col-span-5 border border-line bg-[var(--bg)] p-5 transition-opacity duration-220"
          role="region"
          aria-live="polite"
          aria-label={`Detailed specification for ${current.name}`}
        >
          <div className="flex items-baseline justify-between border-b border-line pb-3">
            <span className="label text-xs">
              Tier 0{selectedIdx + 1} · {current.role}
            </span>
            <span
              className="label text-[10px] px-1.5 py-0.5 border"
              style={{
                borderColor: "var(--ht-border-strong)",
                color: "var(--accent)",
              }}
            >
              Active Inspection
            </span>
          </div>

          <h3
            className="mt-3"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "var(--step-2)",
              fontWeight: 500,
            }}
          >
            {current.name}
          </h3>

          <div className="mt-4">
            <p className="label text-[11px]">Primary Responsibilities</p>
            <ul className="mt-2 space-y-1.5 text-sm" style={{ paddingLeft: "1.1em" }}>
              {current.responsibilities.map((r) => (
                <li key={r} style={{ color: "var(--text)" }}>
                  {r}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-5 border-t border-line pt-3">
            <p className="label text-[11px]">Reference Implementation Stack</p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {current.technologies.map((t) => (
                <span
                  key={t}
                  className="label text-[10px] border border-line px-2 py-0.5 bg-surface"
                  style={{ color: "var(--text)" }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-5 border-t border-line pt-3">
            <p className="label text-[11px]" style={{ color: "var(--accent)" }}>
              Guarded Failure Mode
            </p>
            <p className="mt-1 text-xs text-[var(--text-2)]">{current.failureModes}</p>
          </div>
        </div>
      </div>

      {/* Mandatory Caption per doc 05 §04 & doc 10 §10.5 */}
      <p className="label mt-6 text-xs text-[var(--text-2)]">{layersCaption}</p>
    </div>
  );
}

