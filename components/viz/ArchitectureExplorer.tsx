"use client";

import React, { useState, useEffect, useRef } from "react";
import { layersCaption } from "@/content/copy";
import { useReducedMotion } from "@/components/motion/useReducedMotion";

export interface LayerDetail {
  id: string;
  num: string;
  name: string;
  role: string;
  guarantee: string;
  responsibilities: string[];
  technologies: string[];
  failureModes: string;
}

export const ARCHITECTURE_LAYERS: LayerDetail[] = [
  {
    id: "ui",
    num: "01",
    name: "User Interface",
    role: "Presentation & Client State",
    guarantee: "Sub-100ms optimistic updates & zero layout shifts.",
    responsibilities: [
      "Semantic HTML & accessible ARIA patterns (WCAG 2.2 AA)",
      "Client state management and optimistic UI mutations",
      "Responsive, device-agnostic layouts with hardware transforms",
    ],
    technologies: ["React / Next.js", "TypeScript", "Tailwind CSS", "WAI-ARIA"],
    failureModes: "Hydration mismatches, dropped input states, uncaught boundary exceptions.",
  },
  {
    id: "edge",
    num: "02",
    name: "CDN / Edge",
    role: "Global Anycast & Static Delivery",
    guarantee: "Global sub-40ms TTFB for cached assets & edge routing.",
    responsibilities: [
      "Geographic routing to nearest Point of Presence (PoP)",
      "Automatic TLS 1.3 termination and HTTP/3 multiplexing",
      "Edge cache invalidation and immutable asset versioning",
    ],
    technologies: ["Vercel Edge Network", "Cloudflare Anycast", "Edge Workers"],
    failureModes: "Edge cache stampedes, TLS renegotiation drops, stale route caches.",
  },
  {
    id: "gateway",
    num: "03",
    name: "Routing & Gateway",
    role: "Reverse Proxy & Rate Defense",
    guarantee: "Per-tenant rate limiting and zero unprotected routes.",
    responsibilities: [
      "Route dispatch, payload compression, and CORS policy enforcement",
      "Token-bucket rate limiting against DDoS and automated credential stuffing",
      "Standardized JSON error contract formatting and health probes",
    ],
    technologies: ["Next.js Middleware", "Zod Schema Parser", "Upstash Redis"],
    failureModes: "Traffic spikes saturating gateway memory, misconfigured CORS headers.",
  },
  {
    id: "auth",
    num: "04",
    name: "Identity & RBAC",
    role: "Session Lifecycle & Access Control",
    guarantee: "Cryptographically signed sessions with instant revocation.",
    responsibilities: [
      "Argon2id password hashing and MFA challenge verification",
      "Role-based access control (RBAC) and tenant privilege enforcement",
      "Encrypted, HttpOnly, SameSite session cookie lifecycle",
    ],
    technologies: ["JWT / Secure Cookies", "OAuth2 / OIDC", "Argon2id", "Jose"],
    failureModes: "Token expiration in-flight, replay vulnerabilities, privilege escalation.",
  },
  {
    id: "logic",
    num: "05",
    name: "Domain Logic",
    role: "Business Rules & Workflows",
    guarantee: "Deterministic state transitions and strict idempotency keys.",
    responsibilities: [
      "Pure domain calculations, invoice generation, and discount pricing",
      "Explicit transaction boundaries with optimistic locking guards",
      "Domain event dispatching for downstream automated workflows",
    ],
    technologies: ["TypeScript Domain Services", "State Machines", "Zod Validation"],
    failureModes: "Race conditions during simultaneous checkout, non-idempotent duplicate calls.",
  },
  {
    id: "workers",
    num: "06",
    name: "Asynchronous Workers",
    role: "Background Processing & Retries",
    guarantee: "At-least-once job delivery with exponential backoff & dead-letter isolation.",
    responsibilities: [
      "Heavy asynchronous jobs (PDF generation, media encoding, bulk email)",
      "Scheduled cron automations and ledger reconciliation pipelines",
      "Dead-letter queue isolation for permanently failing tasks",
    ],
    technologies: ["Redis Queues (BullMQ)", "Inngest", "Cron Triggers", "Worker Pools"],
    failureModes: "Worker queue exhaustion, memory spikes during PDF rendering, poison-pill jobs.",
  },
  {
    id: "db",
    num: "07",
    name: "Database & Cache",
    role: "ACID Persistence & Integrity",
    guarantee: "Serializable transactions and foreign-key referential integrity.",
    responsibilities: [
      "Strict relational schema constraints, indexes, and automated migrations",
      "Connection pooling and automated read-replica routing",
      "In-memory Redis cache with sub-2ms read latencies",
    ],
    technologies: ["PostgreSQL", "Supabase / Neon", "Prisma / Drizzle", "Redis"],
    failureModes: "Connection pool exhaustion, long-running unindexed table locks, connection timeouts.",
  },
  {
    id: "ext",
    num: "08",
    name: "External Integrations",
    role: "Third-Party APIs & Webhooks",
    guarantee: "Circuit-breaker protection isolating external service outages.",
    responsibilities: [
      "Payment tokenization via Paystack, Stripe, and Flutterwave",
      "Transactional email dispatch via Resend and Postmark with DKIM/SPF verification",
      "HMAC cryptographic webhook signature verification",
    ],
    technologies: ["Paystack / Stripe SDK", "Resend API", "Crypto HMAC", "Circuit Breakers"],
    failureModes: "Third-party gateway 504 timeouts, dropped webhook notifications.",
  },
];

export interface TraceStep {
  layerIndex: number;
  stepTitle: string;
  action: string;
  businessImpact: string;
  annotation: string;
}

export interface Scenario {
  id: string;
  name: string;
  summary: string;
  steps: TraceStep[];
}

export const SCENARIOS: Scenario[] = [
  {
    id: "signin",
    name: "Sign In",
    summary: "Authentication and session token lifecycle.",
    steps: [
      {
        layerIndex: 0, // UI
        stepTitle: "Client Submits Encrypted Credentials",
        action: "Client encrypts email and password payload, validates form structure, and dispatches POST /api/auth/login.",
        businessImpact: "Zero clear-text exposure; client-side validation prevents unnecessary server roundtrips.",
        annotation: "PAYLOAD: { email, password } · HTTPS/TLS",
      },
      {
        layerIndex: 1, // Edge
        stepTitle: "Edge TLS Handshake & Geo-Route",
        action: "CDN terminates TLS 1.3 handshake at the nearest regional PoP within ~25ms and routes to origin.",
        businessImpact: "Minimizes connection latency across global mobile networks.",
        annotation: "EDGE POP: LHR1 · TLS 1.3 · 24ms TTFB",
      },
      {
        layerIndex: 2, // Gateway
        stepTitle: "Rate Limiting & Threat Inspection",
        action: "Gateway evaluates origin headers and applies token-bucket rate limit (max 5 attempts per 15 min per IP).",
        businessImpact: "Blocks automated brute-force attacks and credential stuffing before hitting downstream logic.",
        annotation: "GATEWAY: RATE_OK (4/5 REMAINING)",
      },
      {
        layerIndex: 3, // Auth
        stepTitle: "Timing-Safe Hash Verification",
        action: "Identity service evaluates password against stored hash using timing-safe Argon2id comparison.",
        businessImpact: "Guarantees complete immunity against timing side-channel attacks.",
        annotation: "AUTH: ARGON2ID_VERIFY = PASS",
      },
      {
        layerIndex: 6, // Database
        stepTitle: "Tenant Record & Permissions Query",
        action: "Indexed single-row query fetches user privileges, active organization ID, and MFA challenge status.",
        businessImpact: "Fast indexed index-scan completes in < 3ms without locking tenant tables.",
        annotation: "DB QUERY: SELECT WHERE user_id = $1 [2.1ms]",
      },
      {
        layerIndex: 3, // Auth
        stepTitle: "Encrypted Session Token Issuance",
        action: "Identity service signs an HttpOnly, Secure, SameSite=Strict JWT cookie and logs audit event.",
        businessImpact: "Prevents XSS token theft and eliminates CSRF attack vectors entirely.",
        annotation: "COOKIE: SET-COOKIE __Host-Session; HttpOnly",
      },
      {
        layerIndex: 0, // UI
        stepTitle: "Session Hydrated & Workspace Rendered",
        action: "Browser receives authenticated cookie, hydrates user state, and renders private dashboard.",
        businessImpact: "Sub-200ms total roundtrip delivers an instantaneous, smooth login experience.",
        annotation: "STATUS: 200 OK · SESSION_ACTIVE",
      },
    ],
  },
  {
    id: "checkout",
    name: "Place an Order",
    summary: "Transactional checkout and async background worker dispatch.",
    steps: [
      {
        layerIndex: 0, // UI
        stepTitle: "Shopper Confirms Order",
        action: "Client attaches unique idempotency UUID and dispatches atomic order payload.",
        businessImpact: "Prevents accidental double-clicks from charging customer cards twice.",
        annotation: "POST /api/orders · Idempotency-Key: uuid-v4",
      },
      {
        layerIndex: 2, // Gateway
        stepTitle: "Idempotency & Schema Validation",
        action: "Gateway verifies Zod schema structure and checks cache for existing idempotency key.",
        businessImpact: "Rejects malformed payloads instantly; drops duplicates at the network edge.",
        annotation: "ZOD: VALID · IDEMPOTENCY: CACHE_MISS",
      },
      {
        layerIndex: 3, // Auth
        stepTitle: "Session & RBAC Authorization",
        action: "Validates active customer token and ensures user has permissions to buy on this tenant.",
        businessImpact: "Ensures tenant boundary isolation and prevents unauthorized purchase requests.",
        annotation: "RBAC: TENANT_PERM_VERIFIED",
      },
      {
        layerIndex: 4, // Logic
        stepTitle: "Inventory & Discount Rules",
        action: "Domain engine validates current inventory reserves, applies promo discounts, and calculates tax.",
        businessImpact: "Guarantees pricing consistency and prevents overselling out-of-stock items.",
        annotation: "LOGIC: INVENTORY_RESERVED · TAX_CALC_OK",
      },
      {
        layerIndex: 6, // Database
        stepTitle: "ACID Transaction & Stock Hold",
        action: "PostgreSQL transaction locks sku rows, reserves quantity, and records pending order.",
        businessImpact: "Serializable ACID isolation eliminates race conditions between simultaneous shoppers.",
        annotation: "SQL: BEGIN ... UPDATE inventory ... COMMIT",
      },
      {
        layerIndex: 7, // External
        stepTitle: "Payment Tokenization via Gateway",
        action: "Dispatches payment intent to Paystack / Stripe over circuit-breaker guarded connection.",
        businessImpact: "Zero cardholder data touches our servers, satisfying PCI-DSS compliance.",
        annotation: "PAYMENT: INTENT_CONFIRMED · AUTH_CODE",
      },
      {
        layerIndex: 5, // Workers
        stepTitle: "Asynchronous Queue Dispatch",
        action: "Dispatches async background jobs to BullMQ queue: generates PDF invoice and sends customer email.",
        businessImpact: "Moves heavy background tasks off the critical path, keeping checkout response under 200ms.",
        annotation: "QUEUE: ENQUEUE { job: 'invoice-gen' }",
      },
      {
        layerIndex: 0, // UI
        stepTitle: "Order Confirmed & Live Tracking",
        action: "Shopper sees confirmation page with order receipt and real-time fulfillment webhook listener.",
        businessImpact: "Reassures buyer immediately and drives high post-purchase customer satisfaction.",
        annotation: "STATUS: 201 CREATED · ORDER #8241",
      },
    ],
  },
];

export function ArchitectureExplorer() {
  const prefersReducedMotion = useReducedMotion();
  const [selectedScenarioIdx, setSelectedScenarioIdx] = useState(0);
  const [selectedLayerIdx, setSelectedLayerIdx] = useState(0);
  const [currentStepIdx, setCurrentStepIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isManualInspection, setIsManualInspection] = useState(false);

  const scenario = SCENARIOS[selectedScenarioIdx];
  const steps = scenario.steps;
  const currentStep = steps[currentStepIdx] || steps[0];
  const activeLayerIdx = isManualInspection ? selectedLayerIdx : currentStep.layerIndex;
  const activeLayer = ARCHITECTURE_LAYERS[activeLayerIdx];

  // Auto-trace playback timer (disabled under reduced motion)
  useEffect(() => {
    if (!isPlaying || prefersReducedMotion) return;

    const timer = setInterval(() => {
      setCurrentStepIdx((prev) => {
        if (prev >= steps.length - 1) {
          setIsPlaying(false);
          return prev;
        }
        return prev + 1;
      });
    }, 850);

    return () => clearInterval(timer);
  }, [isPlaying, prefersReducedMotion, steps.length]);

  const handleScenarioChange = (idx: number) => {
    setSelectedScenarioIdx(idx);
    setCurrentStepIdx(0);
    setIsPlaying(false);
    setIsManualInspection(false);
  };

  const handlePlayToggle = () => {
    if (isPlaying) {
      setIsPlaying(false);
    } else {
      setIsManualInspection(false);
      if (currentStepIdx >= steps.length - 1) {
        setCurrentStepIdx(0);
      }
      setIsPlaying(true);
    }
  };

  const handleStepForward = () => {
    setIsPlaying(false);
    setIsManualInspection(false);
    setCurrentStepIdx((prev) => (prev + 1) % steps.length);
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentStepIdx(0);
    setIsManualInspection(false);
  };

  const handleLayerClick = (idx: number) => {
    setIsPlaying(false);
    setSelectedLayerIdx(idx);
    setIsManualInspection(true);
  };

  const rowHeight = 44;

  return (
    <div className="border border-[#26262b] bg-[#161619] p-4 sm:p-6 lg:p-8 rounded-xs text-[#f1efe8]">
      {/* Top Control Strip */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-[#26262b] pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs uppercase tracking-wider text-[#60a5fa] font-semibold">
              Interactive System Model
            </span>
            <span className="font-mono text-[10px] text-[#a09fa6] border border-[#2e2e36] px-1.5 py-0.5 rounded-xs">
              LIVE SIMULATION
            </span>
          </div>
          <p className="text-sm text-[#a09fa6] mt-1">
            Typically deployed across 8 integrated architectural tiers.
          </p>
        </div>

        {/* Scenario Toggle Buttons */}
        <div className="flex flex-wrap items-center gap-2" role="tablist" aria-label="Request trace scenarios">
          <span className="font-mono text-xs text-[#a09fa6] mr-1 hidden sm:inline">Scenario:</span>
          {SCENARIOS.map((sc, i) => (
            <button
              key={sc.id}
              type="button"
              role="tab"
              aria-selected={i === selectedScenarioIdx}
              onClick={() => handleScenarioChange(i)}
              className="font-mono text-xs px-3.5 py-2 rounded-xs border transition-all cursor-pointer flex items-center gap-2 focus-visible:outline-2 focus-visible:outline-[#60a5fa]"
              style={{
                borderColor: i === selectedScenarioIdx ? "#3b82f6" : "#2e2e36",
                backgroundColor: i === selectedScenarioIdx ? "rgba(37,99,235,0.2)" : "#1c1c22",
                color: i === selectedScenarioIdx ? "#93c5fd" : "#a09fa6",
                minHeight: 40,
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{
                  backgroundColor: i === selectedScenarioIdx ? "#60a5fa" : "#a09fa6",
                }}
              />
              {sc.name}
            </button>
          ))}
        </div>
      </div>

      {/* Playback Controls & Progress Slider */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-4 py-3 px-4 bg-[#121215] border border-[#26262b] rounded-xs">
        <div className="flex items-center gap-2">
          {!prefersReducedMotion && (
            <button
              type="button"
              onClick={handlePlayToggle}
              className="flex items-center gap-1.5 font-mono text-xs font-semibold px-4 py-2 rounded-xs border border-[#3b82f6] bg-[#2563eb] text-white hover:bg-blue-600 transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-[#60a5fa]"
              style={{ minHeight: 40 }}
              aria-label={isPlaying ? "Pause trace animation" : "Play trace animation"}
            >
              <span>{isPlaying ? "⏸" : "▶"}</span>
              <span>{isPlaying ? "Pause" : currentStepIdx > 0 ? "Resume" : "Trace a request"}</span>
            </button>
          )}

          <button
            type="button"
            onClick={handleStepForward}
            className="font-mono text-xs px-3.5 py-2 rounded-xs border border-[#33333b] bg-[#1a1a20] text-[#f1efe8] hover:border-[#444450] transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-[#60a5fa]"
            style={{ minHeight: 40 }}
            aria-label="Advance to next step in trace"
          >
            Step →
          </button>

          <button
            type="button"
            onClick={handleReset}
            className="font-mono text-xs px-3 py-2 text-[#a09fa6] hover:text-[#f1efe8] transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-[#60a5fa]"
            style={{ minHeight: 40 }}
            aria-label="Reset trace to first step"
          >
            Reset
          </button>
        </div>

        {/* Step Scrubber & Counter */}
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <span className="font-mono text-xs text-[#a09fa6] whitespace-nowrap">
            Step {currentStepIdx + 1} of {steps.length}
          </span>
          <input
            type="range"
            min={0}
            max={steps.length - 1}
            value={currentStepIdx}
            onChange={(e) => {
              setIsPlaying(false);
              setIsManualInspection(false);
              setCurrentStepIdx(Number(e.target.value));
            }}
            className="w-28 sm:w-36 h-1.5 bg-[#26262b] rounded-lg appearance-none cursor-pointer accent-[#3b82f6]"
            aria-label="Scrub through request trace steps"
          />
        </div>
      </div>

      {/* Main 2-Column Architectural Stage */}
      <div className="mt-6 grid gap-8 lg:grid-cols-12 items-start">
        {/* Left: Interactive SVG Architectural Stack */}
        <div className="lg:col-span-7">
          <div className="flex items-center justify-between mb-3 text-xs font-mono text-[#a09fa6]">
            <span>SYSTEM ARCHITECTURE (8 TIERS)</span>
            <span>TAP TIER TO INSPECT</span>
          </div>

          <svg
            viewBox={`0 0 460 ${ARCHITECTURE_LAYERS.length * rowHeight + 10}`}
            role="img"
            aria-label="Architectural stack showing 8 software tiers. Interactive trace routes through active tiers."
            className="w-full h-auto select-none"
          >
            {/* Architectural Left Rail Guideline */}
            <line
              x1="24"
              y1="18"
              x2="24"
              y2={ARCHITECTURE_LAYERS.length * rowHeight - 20}
              stroke="#26262b"
              strokeWidth="2"
              strokeDasharray="4 4"
            />

            {/* Active Trace Line Segment from Layer 0 to Current */}
            <line
              x1="24"
              y1="18"
              x2="24"
              y2={4 + activeLayerIdx * rowHeight + 18}
              stroke="#3b82f6"
              strokeWidth="2"
              className={prefersReducedMotion ? "" : "transition-all duration-300"}
            />

            {ARCHITECTURE_LAYERS.map((layer, i) => {
              const isActive = activeLayerIdx === i;
              const y = 4 + i * rowHeight;

              return (
                <g
                  key={layer.id}
                  role="button"
                  tabIndex={0}
                  aria-pressed={isActive}
                  aria-label={`${layer.num} ${layer.name}: ${layer.role}`}
                  onClick={() => handleLayerClick(i)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      handleLayerClick(i);
                    }
                  }}
                  className="cursor-pointer focus:outline-none"
                  style={{
                    opacity: !isManualInspection && !isActive ? 0.45 : 1,
                    transition: prefersReducedMotion ? "none" : "opacity 0.25s ease-in-out",
                  }}
                >
                  {/* Tier Box */}
                  <rect
                    x="48"
                    y={y}
                    width="408"
                    height={rowHeight - 6}
                    fill={isActive ? "rgba(37,99,235,0.2)" : "#1a1a1f"}
                    stroke={isActive ? "#3b82f6" : "#2a2a32"}
                    strokeWidth={isActive ? "1.75" : "1"}
                    rx="2"
                    className={prefersReducedMotion ? "" : "transition-colors duration-200"}
                  />

                  {/* Connection Node */}
                  <circle
                    cx="24"
                    cy={y + (rowHeight - 6) / 2}
                    r={isActive ? "5" : "2.5"}
                    fill={isActive ? "#3b82f6" : "#484852"}
                    stroke={isActive ? "#f1efe8" : "transparent"}
                    strokeWidth="1.5"
                    className={prefersReducedMotion ? "" : "transition-all duration-200"}
                  />

                  {/* Horizontal Connection Arm */}
                  <line
                    x1="24"
                    y1={y + (rowHeight - 6) / 2}
                    x2="48"
                    y2={y + (rowHeight - 6) / 2}
                    stroke={isActive ? "#3b82f6" : "#2e2e36"}
                    strokeWidth="1"
                  />

                  {/* Numeral + Layer Name */}
                  <text
                    x="62"
                    y={y + 24}
                    fill={isActive ? "#f1efe8" : "#d1d0db"}
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 12,
                      fontWeight: isActive ? 600 : 500,
                      letterSpacing: "0.04em",
                      textTransform: "uppercase",
                    }}
                  >
                    {layer.num} {layer.name}
                  </text>

                  {/* Role descriptor badge on desktop */}
                  <text
                    x="442"
                    y={y + 24}
                    textAnchor="end"
                    fill={isActive ? "#93c5fd" : "#a09fa6"}
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 11,
                      textTransform: "uppercase",
                    }}
                  >
                    {layer.role}
                  </text>
                </g>
              );
            })}

            {/* Glowing Traveling Packet Node */}
            <circle
              cx="24"
              cy={4 + activeLayerIdx * rowHeight + (rowHeight - 6) / 2}
              r="7"
              fill="#3b82f6"
              stroke="#ffffff"
              strokeWidth="2"
              className={prefersReducedMotion ? "" : "transition-all duration-300"}
              style={{
                filter: "drop-shadow(0 0 6px rgba(59,130,246,0.85))",
              }}
            />
          </svg>
        </div>

        {/* Right: Live Trace Step & Inspection Panel */}
        <div
          className="lg:col-span-5 border border-[#26262b] bg-[#141417] p-5 sm:p-6 rounded-xs"
          role="region"
          aria-live="polite"
          aria-label={
            isManualInspection
              ? `Specification for ${activeLayer.name}`
              : `Trace Step ${currentStepIdx + 1}: ${currentStep.stepTitle}`
          }
        >
          {/* Header Strip */}
          <div className="flex items-center justify-between border-b border-[#26262b] pb-3">
            <span className="font-mono text-xs uppercase tracking-wider text-[#60a5fa] font-semibold">
              {isManualInspection ? "Tier Specification" : `Step 0${currentStepIdx + 1} / 0${steps.length}`}
            </span>
            <span className="font-mono text-[10px] text-[#a09fa6] border border-[#2c2c32] px-2 py-0.5 rounded-xs uppercase">
              {isManualInspection ? "Manual Inspection" : scenario.name}
            </span>
          </div>

          {!isManualInspection ? (
            /* ACTIVE TRACE STEP VIEW */
            <div>
              <div className="mt-4">
                <span className="font-mono text-xs text-[#a09fa6] uppercase">
                  Location: Tier {activeLayer.num} · {activeLayer.name}
                </span>
                <h3
                  className="mt-1 text-xl sm:text-2xl text-[#f1efe8]"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 500,
                  }}
                >
                  {currentStep.stepTitle}
                </h3>
              </div>

              {/* Action Description */}
              <div className="mt-4 border-t border-[#26262b] pt-3">
                <p className="font-mono text-[11px] text-[#a09fa6] uppercase">Execution Details</p>
                <p className="mt-1.5 text-sm text-[#d1d0db] leading-relaxed">
                  {currentStep.action}
                </p>
              </div>

              {/* Business Impact Note */}
              <div className="mt-4 border-t border-[#26262b] pt-3">
                <p className="font-mono text-[11px] text-[#60a5fa] uppercase font-semibold">Business Guarantee</p>
                <p className="mt-1.5 text-sm text-[#d1d0db] leading-relaxed">
                  {currentStep.businessImpact}
                </p>
              </div>

              {/* Wire Protocol / Packet Annotation */}
              <div className="mt-4 bg-[#1a1a20] border border-[#2a2a32] p-2.5 rounded-xs">
                <span className="font-mono text-[10px] text-[#a09fa6] uppercase block">
                  Wire Annotation
                </span>
                <code className="font-mono text-xs text-[#93c5fd] mt-1 block break-all">
                  {currentStep.annotation}
                </code>
              </div>
            </div>
          ) : (
            /* MANUAL TIER DEEP DIVE */
            <div>
              <div className="mt-4">
                <span className="font-mono text-xs text-[#a09fa6] uppercase">
                  Tier {activeLayer.num} · {activeLayer.role}
                </span>
                <h3
                  className="mt-1 text-xl sm:text-2xl text-[#f1efe8]"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 500,
                  }}
                >
                  {activeLayer.name}
                </h3>
              </div>

              <div className="mt-4 border-t border-[#26262b] pt-3">
                <p className="font-mono text-[11px] text-[#60a5fa] uppercase font-semibold">Architectural Guarantee</p>
                <p className="mt-1.5 text-sm text-[#d1d0db] leading-relaxed font-medium">
                  {activeLayer.guarantee}
                </p>
              </div>

              <div className="mt-4 border-t border-[#26262b] pt-3">
                <p className="font-mono text-[11px] text-[#a09fa6] uppercase">Core Responsibilities</p>
                <ul className="mt-2 space-y-1.5 text-sm text-[#d1d0db] pl-4 list-disc">
                  {activeLayer.responsibilities.map((r) => (
                    <li key={r}>{r}</li>
                  ))}
                </ul>
              </div>

              <div className="mt-4 border-t border-[#26262b] pt-3">
                <p className="font-mono text-[11px] text-[#a09fa6] uppercase">Verified Technology Stack</p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {activeLayer.technologies.map((t) => (
                    <span
                      key={t}
                      className="font-mono text-[11px] bg-[#1d1d24] border border-[#2c2c34] text-[#d1d0db] px-2 py-0.5 rounded-xs"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-4 border-t border-[#26262b] pt-3">
                <p className="font-mono text-[11px] text-[#f87171] uppercase font-semibold">Guarded Failure Mode</p>
                <p className="mt-1 text-xs text-[#d1d0db] leading-relaxed">
                  {activeLayer.failureModes}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mandatory Caption per doc 05 §04 */}
      <p className="font-mono mt-6 text-xs text-[#a09fa6]">{layersCaption}</p>
    </div>
  );
}
