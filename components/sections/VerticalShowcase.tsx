"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { SectionStrip } from "@/components/ui/SectionStrip";
import { TiltCard } from "@/components/motion/TiltCard";
import { Magnetic } from "@/components/motion/Magnetic";
import { ScrambleText } from "@/components/motion/ScrambleText";
import {
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  ShoppingCart,
  Cpu,
  Building2,
  GraduationCap,
  Radio,
  Layers,
  ArrowRight,
} from "lucide-react";

export interface VerticalDomain {
  id: string;
  keyword: string;
  tagline: string;
  category: string;
  icon: typeof ShoppingCart;
  accentColor: string;
  flagship: {
    title: string;
    description: string;
    slug: string;
    liveUrl?: string;
    videoUrl?: string;
    imageUrl?: string;
    technologies: string[];
    metrics: { label: string; value: string }[];
    highlight: string;
  };
  relatedProjects: string[];
}

const VERTICALS: VerticalDomain[] = [
  {
    id: "ecommerce",
    keyword: "E-COMMERCE & RETAIL SYSTEMS",
    category: "Commerce & Digital Retail",
    tagline: "Scalable storefronts, multi-vendor marketplaces, and secure multi-currency payment pipelines.",
    icon: ShoppingCart,
    accentColor: "#344C68",
    flagship: {
      title: "Jimmarof Marketplace",
      slug: "jimmarof",
      liveUrl: "https://jimmarof.com",
      description:
        "High-throughput multi-vendor digital marketplace and automotive trade hub engineered with automated vendor reconciliations and localized checkout gateways.",
      technologies: ["PHP & MySQL", "Paystack & Flutterwave", "REST APIs", "Dynamic Catalog Engine"],
      metrics: [
        { label: "GATEWAY", value: "Paystack + Flutterwave" },
        { label: "CATALOG", value: "Multi-Vendor" },
        { label: "UPTIME", value: "99.9%" },
      ],
      highlight: "Direct automated payment splitting and vendor disbursement workflows.",
    },
    relatedProjects: ["Deen Drip Apparel", "Raws Apparel Store"],
  },
  {
    id: "automation",
    keyword: "BUSINESS OS & AI AUTOMATION",
    category: "Intelligent Operations",
    tagline: "Integrated enterprise platforms, conversational workflow bots, and autonomous operations.",
    icon: Cpu,
    accentColor: "#2A3F57",
    flagship: {
      title: "Axiora Business OS",
      slug: "axiora",
      liveUrl: "https://axiora-dusky.vercel.app",
      description:
        "AI-native operations hub consolidating customer relationships, invoice billing, inventory lifecycles, and cross-channel automations into a unified command dashboard.",
      technologies: ["Next.js App Router", "Neon PostgreSQL", "Resend API", "TypeScript"],
      metrics: [
        { label: "MODULES", value: "CRM + Invoicing + HR" },
        { label: "DATABASE", value: "Serverless Postgres" },
        { label: "ARCHITECTURE", value: "Event-Driven" },
      ],
      highlight: "Real-time ledger reconciliation and automated invoice dispatch.",
    },
    relatedProjects: ["Retention Lifecycle SaaS", "Auth & RBAC System"],
  },
  {
    id: "realestate",
    keyword: "REAL ESTATE & SPATIAL INTELLIGENCE",
    category: "PropTech & Data Engines",
    tagline: "Property valuation models, lead qualification pipelines, and interactive spatial data.",
    icon: Building2,
    accentColor: "#344C68",
    flagship: {
      title: "RealtyIntel Platform",
      slug: "realtyintel",
      description:
        "Real-estate intelligence and prospective buyer tracking system built for agency lead prioritization, automated property matching, and transaction lifecycle monitoring.",
      technologies: ["Node.js & Express", "PostgreSQL", "Data Aggregation", "Lead Pipeline"],
      metrics: [
        { label: "DOMAIN", value: "Commercial PropTech" },
        { label: "DATA SCHEMA", value: "Normalized Relational" },
        { label: "WORKFLOW", value: "Lead Scoring" },
      ],
      highlight: "Zero-latency lead matching algorithm based on buyer criteria vectors.",
    },
    relatedProjects: ["Spatial Valuation API", "Property Ingestion Worker"],
  },
  {
    id: "edtech",
    keyword: "EDTECH & ASSESSMENT ENGINES",
    category: "Education & Standardized Testing",
    tagline: "Low-latency computer-based testing, examination analytics, and collaborative learning.",
    icon: GraduationCap,
    accentColor: "#344C68",
    flagship: {
      title: "Edunexs LearnSphere",
      slug: "edunexs-learnsphere",
      description:
        "High-concurrency examination and learning platform engineered to administer standardized exams (JAMB, WAEC, ACT) with instant evaluation and diagnostic reporting.",
      technologies: ["MongoDB Atlas", "Cloudinary", "SendGrid", "CBT Test Engine"],
      metrics: [
        { label: "FORMATS", value: "JAMB / WAEC / ACT" },
        { label: "LATENCY", value: "< 50ms Submission" },
        { label: "SCORING", value: "Instant Algorithmic" },
      ],
      highlight: "Reliable examination state preservation during intermittent connectivity.",
    },
    relatedProjects: ["Cahootz Study Platform", "Question Bank Pipeline"],
  },
  {
    id: "realtime",
    keyword: "REAL-TIME UTILITIES & BOTS",
    category: "Community & Microservices",
    tagline: "High-volume Telegram bots, messaging pipelines, and live data telemetry.",
    icon: Radio,
    accentColor: "#2A3F57",
    flagship: {
      title: "WahalaCheck Utility",
      slug: "wahalacheck",
      description:
        "Crowdsourced real-time utility network tracking regional fuel availability, grid power status, and fair-price benchmarks across Nigeria under high concurrent load.",
      technologies: ["Node.js", "Telegram Bot API", "Redis In-Memory", "Community Feed"],
      metrics: [
        { label: "PLATFORM", value: "Telegram Ecosystem" },
        { label: "CACHE", value: "Redis Micro-Cache" },
        { label: "EXECUTION", value: "Event Loop" },
      ],
      highlight: "Sub-second verification and broadcast to active community channels.",
    },
    relatedProjects: ["Chat App V2 (Socket.IO)", "TeamNotifier App"],
  },
];

export function VerticalShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const activeVertical = VERTICALS[activeIndex];
  const IconComponent = activeVertical.icon;

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % VERTICALS.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + VERTICALS.length) % VERTICALS.length);
  };

  return (
    <section id="verticals" className="wrap section border-b border-line bg-[var(--bg)]" aria-labelledby="verticals-heading">
      <SectionStrip n="02" name="Capabilities in Practice · Core Industry Verticals" />

      {/* Header and Controls */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6">
        <div>
          <span className="label text-xs">
            <ScrambleText text="PROVEN SOFTWARE SOLUTIONS" />
          </span>
          <h2 id="verticals-heading" style={{ fontSize: "var(--step-5)", fontWeight: 500, marginTop: "var(--s-2)" }}>
            Systems engineered by sector.
          </h2>
          <p className="mt-3 text-[var(--text-2)] max-w-xl text-sm md:text-base leading-relaxed">
            Rather than isolated experiments, we engineer deep, domain-specific systems. Each vertical below is anchored by a tested, running software flagship.
          </p>
        </div>

        {/* Carousel Prev/Next Buttons */}
        <div className="flex items-center gap-3 self-start md:self-end">
          <span className="font-mono text-xs text-[var(--text-2)] mr-2">
            0{activeIndex + 1} / 0{VERTICALS.length}
          </span>
          <button
            onClick={handlePrev}
            className="h-11 w-11 rounded border border-line bg-surface hover:bg-[var(--accent)] hover:text-white transition-colors flex items-center justify-center cursor-pointer shadow-xs"
            aria-label="Previous sector"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={handleNext}
            className="h-11 w-11 rounded border border-line bg-surface hover:bg-[var(--accent)] hover:text-white transition-colors flex items-center justify-center cursor-pointer shadow-xs"
            aria-label="Next sector"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Sector Category Navigation Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 pt-2 no-scrollbar">
        {VERTICALS.map((v, i) => {
          const isSelected = i === activeIndex;
          const PillIcon = v.icon;
          return (
            <button
              key={v.id}
              onClick={() => setActiveIndex(i)}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono whitespace-nowrap transition-all border cursor-pointer ${
                isSelected
                  ? "border-[var(--accent)] bg-[var(--text)] text-[var(--bg)] shadow-md font-semibold"
                  : "border-line bg-surface text-[var(--text-2)] hover:border-[var(--text)] hover:text-[var(--text)]"
              }`}
            >
              <PillIcon className={`h-3.5 w-3.5 ${isSelected ? "text-emerald-400" : "text-[var(--accent)]"}`} />
              <span>{v.category}</span>
            </button>
          );
        })}
      </div>

      {/* Flagship Showcase Card (3D Tilt Deck) */}
      <div ref={containerRef} className="mt-6">
        <TiltCard
          key={activeVertical.id}
          maxTilt={5}
          perspective={1400}
          className="border border-line bg-surface shadow-2xl rounded-sm p-6 md:p-10"
        >
          <div className="grid gap-10 lg:grid-cols-12 items-center">
            {/* Left Specification Column */}
            <div className="lg:col-span-6 space-y-6">
              {/* Sector Header Tag */}
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded border border-line bg-[var(--bg)] flex items-center justify-center">
                  <IconComponent className="h-4 w-4 text-[var(--accent)]" />
                </div>
                <div>
                  <span className="font-mono text-[11px] font-semibold tracking-wider text-[var(--accent)] uppercase">
                    Sector 0{activeIndex + 1}
                  </span>
                  <p className="font-mono text-xs text-[var(--text-2)]">{activeVertical.keyword}</p>
                </div>
              </div>

              {/* Title & Description */}
              <div>
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "var(--step-4)",
                    fontWeight: 500,
                    lineHeight: 1.1,
                  }}
                >
                  {activeVertical.flagship.title}
                </h3>
                <p className="mt-3 text-sm text-[var(--text-2)] leading-relaxed">
                  {activeVertical.flagship.description}
                </p>
              </div>

              {/* Performance / Architectural Highlights */}
              <div className="p-3.5 rounded border border-line/60 bg-[var(--bg)] font-mono text-xs">
                <span className="text-[10px] text-[var(--accent)] font-semibold block mb-1">
                  KEY ARCHITECTURAL DISCIPLINE
                </span>
                <p className="text-[var(--text)] text-[11px]">{activeVertical.flagship.highlight}</p>
              </div>

              {/* Telemetry Metrics Grid */}
              <div className="grid grid-cols-3 gap-2 py-2 border-y border-line/60">
                {activeVertical.flagship.metrics.map((m) => (
                  <div key={m.label} className="p-2">
                    <p className="font-mono text-[9px] text-[var(--text-2)] uppercase">{m.label}</p>
                    <p className="font-mono text-xs font-semibold text-[var(--text)] mt-0.5 truncate">{m.value}</p>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                {activeVertical.flagship.liveUrl ? (
                  <Magnetic strength={0.25}>
                    <a
                      href={activeVertical.flagship.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn text-xs inline-flex items-center gap-2"
                      style={{ minHeight: 44, paddingInline: "var(--s-4)" }}
                    >
                      <span>Launch Live Platform</span>
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  </Magnetic>
                ) : null}

                <Magnetic strength={0.2}>
                  <Link
                    href={`/projects/${activeVertical.flagship.slug}`}
                    className="btn btn-secondary text-xs inline-flex items-center gap-1.5"
                    style={{ minHeight: 44, paddingInline: "var(--s-4)" }}
                  >
                    <span>Inspect Blueprint</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </Magnetic>
              </div>

              {/* Related Sector Deployments */}
              <div className="pt-2 text-xs font-mono text-[var(--text-2)] flex items-center gap-2">
                <Layers className="h-3.5 w-3.5 text-[var(--accent)]" />
                <span>Sector Portfolio:</span>
                <span className="text-[var(--text)]">{activeVertical.relatedProjects.join(" · ")}</span>
              </div>
            </div>

            {/* Right Interactive Preview Window */}
            <div className="lg:col-span-6">
              <div className="relative rounded border border-line bg-[var(--bg)] shadow-lg overflow-hidden flex flex-col">
                {/* Browser-style Chrome Bar */}
                <div className="flex items-center justify-between border-b border-line px-4 py-2.5 bg-surface text-xs font-mono">
                  <div className="flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-red-400/80 inline-block" />
                    <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80 inline-block" />
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80 inline-block" />
                  </div>
                  <span className="text-[10px] text-[var(--text-2)] truncate max-w-[200px]">
                    {activeVertical.flagship.liveUrl || `system://${activeVertical.flagship.slug}`}
                  </span>
                  <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                </div>

                {/* Simulated High-Res Interactive Viewport */}
                <div className="relative min-h-[320px] overflow-hidden bg-black flex flex-col justify-between">
                  {activeVertical.flagship.videoUrl ? (
                    <video
                      key={activeVertical.flagship.videoUrl}
                      src={activeVertical.flagship.videoUrl}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  ) : activeVertical.flagship.imageUrl ? (
                    <img
                      src={activeVertical.flagship.imageUrl}
                      alt={activeVertical.flagship.title}
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  ) : (
                    <div className="p-6 md:p-8 flex flex-col justify-between min-h-[320px] relative overflow-hidden bg-gradient-to-br from-[var(--bg)] via-surface to-[var(--bg)] w-full">
                      <div className="absolute top-0 right-0 -mr-12 -mt-12 w-48 h-48 rounded-full bg-[var(--accent)] opacity-10 blur-2xl pointer-events-none" />

                      {/* Header inside viewport */}
                      <div className="flex justify-between items-start border-b border-line/40 pb-4">
                        <div>
                          <span className="text-[10px] font-mono tracking-wider text-[var(--accent)] uppercase font-semibold">
                            ACTIVE SERVICE DEPLOYMENT
                          </span>
                          <h4 className="text-xl font-medium mt-1 text-[var(--text)]">
                            {activeVertical.flagship.title}
                          </h4>
                        </div>
                        <span className="font-mono text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-200 px-2.5 py-1 rounded-full font-semibold">
                          VERIFIED PRODUCTION
                        </span>
                      </div>

                      {/* Stack Tech Pills */}
                      <div className="my-6 space-y-3">
                        <p className="text-[11px] font-mono text-[var(--text-2)]">CORE ARCHITECTURE STACK:</p>
                        <div className="flex flex-wrap gap-2">
                          {activeVertical.flagship.technologies.map((t) => (
                            <span
                              key={t}
                              className="px-2.5 py-1 rounded bg-surface border border-line font-mono text-xs text-[var(--text)] shadow-2xs"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Footer status within viewport */}
                      <div className="pt-4 border-t border-line/40 flex justify-between items-center text-xs font-mono text-[var(--text-2)]">
                        <span className="flex items-center gap-1.5">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                          Continuous Integration Verified
                        </span>
                        <span className="text-[var(--text)]">HafTech Studio Engine</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </TiltCard>
      </div>
    </section>
  );
}

