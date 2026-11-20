import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { SectionStrip } from "@/components/ui/SectionStrip";
import { ImageMask } from "@/components/motion/ImageMask";
import { getProjects } from "@/lib/content";
import { StatusTag } from "@/components/ui/StatusTag";
import { JsonLd, getPersonJsonLd } from "@/components/seo/JsonLd";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://haftech.site";

export const metadata: Metadata = {
  title: "Faruq Ariyo — Founder & Full-Stack Engineer at HafTech",
  description:
    "Founder profile of Faruq Ariyo. Background, technical capabilities, engineering principles, and independently developed products.",
  alternates: {
    canonical: "/founder",
  },
  openGraph: {
    title: "Faruq Ariyo — Founder & Full-Stack Engineer at HafTech",
    description:
      "Founder profile of Faruq Ariyo. Background, technical capabilities, engineering principles, and independently developed products.",
    url: `${siteUrl}/founder`,
  },
};

const verifiedSkills = [
  "TypeScript",
  "React.js",
  "Next.js App Router",
  "Node.js",
  "Express",
  "PostgreSQL",
  "MySQL",
  "MongoDB",
  "Redis",
  "REST & GraphQL APIs",
  "JWT & RBAC Security",
  "Docker",
  "CI/CD (GitHub Actions)",
  "AWS",
  "Python",
  "PHP",
  "Tailwind CSS",
  "Figma",
];

export default function FounderPage() {
  const independentProjects = getProjects("project");

  return (
    <div className="wrap section">
      <JsonLd data={getPersonJsonLd(siteUrl)} />
      <SectionStrip n="01" name="Profile · Founder & Engineering Lead" />

      {/* Hero introduction */}
      <div className="grid gap-12 lg:grid-cols-12 items-start">
        <div className="lg:col-span-5">
          <ImageMask aspectRatio="4 / 5" className="border border-line bg-surface relative overflow-hidden shadow-xl rounded-sm">
            <Image
              src="/media/founder-portrait.jpg"
              alt="Faruq Ariyo — Founder & Systems Engineer at HafTech"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover object-center grayscale hover:grayscale-0 transition-all duration-700 ease-out"
            />
          </ImageMask>

          <div className="mt-6 border border-line bg-surface p-4 text-xs space-y-2">
            <div className="flex justify-between">
              <span className="label text-[11px]">Role</span>
              <span style={{ color: "var(--text)" }}>Founder & Software Engineer</span>
            </div>
            <div className="flex justify-between">
              <span className="label text-[11px]">Studio</span>
              <span style={{ color: "var(--text)" }}>HafTech</span>
            </div>
            <div className="flex justify-between">
              <span className="label text-[11px]">Direct Inbox</span>
              <a href="mailto:ariyofaruq1@gmail.com" className="hover:underline font-mono" style={{ color: "var(--text)" }}>
                ariyofaruq1@gmail.com
              </a>
            </div>
            <div className="flex justify-between">
              <span className="label text-[11px]">Experience</span>
              <span style={{ color: "var(--text)" }}>4+ Years (Since 2022)</span>
            </div>
            <div className="flex justify-between">
              <span className="label text-[11px]">Academic</span>
              <span style={{ color: "var(--text)" }}>B.Sc. CS & Statistics</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7">
          <span className="label text-xs">Founder · Software Engineer</span>
          <h1
            className="mt-2"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "var(--step-5)",
              fontWeight: 500,
              lineHeight: 1.05,
            }}
          >
            Faruq Ariyo
          </h1>

          <div className="mt-6 space-y-4 text-base text-[var(--text)] leading-relaxed">
            <p>
              I am a full-stack engineer and the founder of HafTech. I design and build reliable
              software systems, from responsive browser interfaces to backend data pipelines and API
              contracts.
            </p>
            <p className="text-[var(--text-2)]">
              My engineering approach prioritizes simplicity over speculative abstraction. When building
              software, I believe interfaces deserve more than cosmetic execution; they demand
              disciplined systems, reliable database constraints, and clear contracts behind them.
            </p>
            <p className="text-[var(--text-2)]">
              Alongside client engagements led through HafTech, I actively engineer independent
              platforms and explore domain-specific software models.
            </p>
          </div>

          {/* Verified Profiles */}
          <div className="mt-8 pt-6 border-t border-line flex flex-wrap gap-4 items-center">
            <a
              href="mailto:ariyofaruq1@gmail.com"
              className="btn btn-secondary text-xs inline-flex items-center gap-1.5"
              style={{ minHeight: 40 }}
            >
              Email Founder ↗
            </a>
            <a
              href="https://linkedin.com/in/fsdev-faruq"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary text-xs inline-flex items-center gap-1.5"
              style={{ minHeight: 40 }}
            >
              LinkedIn ↗
            </a>
            <a
              href="https://x.com/faruq_dev"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary text-xs inline-flex items-center gap-1.5"
              style={{ minHeight: 40 }}
            >
              X / Twitter ↗
            </a>
            <span className="label text-xs text-[var(--text-2)]">
              GitHub: <span className="text-[var(--text)]">eff-1</span>
            </span>
          </div>
        </div>
      </div>

      {/* Engineering Philosophy */}
      <section className="mt-24 pt-12 border-t border-line">
        <span className="label">Principles in Practice</span>
        <h2 style={{ fontSize: "var(--step-4)", fontWeight: 500, marginTop: "var(--s-2)" }}>
          How I think about software
        </h2>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          <div className="border border-line bg-surface p-6">
            <p className="label text-xs" style={{ color: "var(--accent)" }}>01 · Reliability</p>
            <h3 className="mt-2 font-medium text-base" style={{ fontFamily: "var(--font-display)" }}>
              Data integrity at the core
            </h3>
            <p className="mt-2 text-xs text-[var(--text-2)] leading-relaxed">
              If data structures and validation boundaries are loose, interfaces will eventually break.
              I enforce domain invariants at the schema and database level before polishing pixels.
            </p>
          </div>

          <div className="border border-line bg-surface p-6">
            <p className="label text-xs" style={{ color: "var(--accent)" }}>02 · Restraint</p>
            <h3 className="mt-2 font-medium text-base" style={{ fontFamily: "var(--font-display)" }}>
              Smallest thing that works
            </h3>
            <p className="mt-2 text-xs text-[var(--text-2)] leading-relaxed">
              No dependency graveyards, no premature distributed systems. Deliver the leanest
              architecture that satisfies the requirement cleanly and remains maintainable after handover.
            </p>
          </div>

          <div className="border border-line bg-surface p-6">
            <p className="label text-xs" style={{ color: "var(--accent)" }}>03 · Craft</p>
            <h3 className="mt-2 font-medium text-base" style={{ fontFamily: "var(--font-display)" }}>
              Speed is part of design
            </h3>
            <p className="mt-2 text-xs text-[var(--text-2)] leading-relaxed">
              An interface that stutters or shifts layout is unfinished. Accessible semantics, keyboard
              navigation, and sub-second load times are fundamental engineering standards.
            </p>
          </div>
        </div>
      </section>

      {/* Technical Capabilities / Skills (plain list only, no bars or percentages per doc 06 §6.2) */}
      <section className="mt-20 pt-12 border-t border-line">
        <span className="label">Technical Scope</span>
        <h2 style={{ fontSize: "var(--step-4)", fontWeight: 500, marginTop: "var(--s-2)" }}>
          Languages, frameworks & tools
        </h2>
        <p className="mt-2 text-sm text-[var(--text-2)] max-w-xl">
          Plain verified technologies utilized across production systems and independent architectures.
        </p>

        <div className="mt-8 flex flex-wrap gap-2">
          {verifiedSkills.map((s) => (
            <span
              key={s}
              className="label text-xs border border-line px-3 py-1.5 bg-surface text-[var(--text)]"
            >
              {s}
            </span>
          ))}
        </div>
      </section>

      {/* Independently developed products */}
      <section className="mt-20 pt-12 border-t border-line">
        <div className="flex flex-wrap items-baseline justify-between gap-4 mb-8">
          <div>
            <span className="label">Independent Engineering</span>
            <h2 style={{ fontSize: "var(--step-4)", fontWeight: 500, marginTop: "var(--s-2)" }}>
              Self-directed products & tools
            </h2>
            <p className="mt-1 text-xs text-[var(--text-2)]">
              Personal products developed independently — separate from client mandates.
            </p>
          </div>
          <Link href="/projects" className="label text-xs text-[var(--accent)] hover:underline">
            View full catalogue ({independentProjects.length}) →
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {independentProjects.slice(0, 3).map((p) => (
            <div key={p.slug} className="border border-line bg-surface p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="label text-[10px]">{p.category}</span>
                  <StatusTag status={p.status} />
                </div>
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "var(--step-2)",
                    fontWeight: 500,
                  }}
                >
                  <Link href={`/projects/${p.slug}`} className="hover:text-[var(--accent)]">
                    {p.title}
                  </Link>
                </h3>
                <p className="mt-2 text-xs text-[var(--text-2)] leading-relaxed">
                  {p.summary}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-line">
                <Link
                  href={`/projects/${p.slug}`}
                  className="label text-[11px] text-[var(--accent)] hover:underline"
                >
                  Inspect architecture →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact CTA */}
      <div className="mt-24 border border-line bg-surface p-8 max-w-3xl">
        <h2 style={{ fontSize: "var(--step-3)", fontWeight: 500 }}>
          Interested in collaborating or discussing an engagement?
        </h2>
        <p className="mt-2 text-sm text-[var(--text-2)]">
          Reach out through the studio contact channel with technical requirements or project context.
        </p>
        <div className="mt-6">
          <Link href="/contact" className="btn text-sm">
            Get in touch
          </Link>
        </div>
      </div>
    </div>
  );
}

