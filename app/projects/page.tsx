import type { Metadata } from "next";
import Link from "next/link";
import { getProjects } from "@/lib/content";
import { StatusTag } from "@/components/ui/StatusTag";
import { SectionStrip } from "@/components/ui/SectionStrip";
import { ImageMask } from "@/components/motion/ImageMask";

export const metadata: Metadata = {
  title: "Projects & Products — Independent Software Systems",
  description:
    "Products, tools and systems engineered independently by HafTech and Faruq Ariyo. Status and accountability explicitly labelled.",
  alternates: {
    canonical: "/projects",
  },
  openGraph: {
    title: "Projects & Products — HafTech",
    description:
      "Products, tools and systems engineered independently by HafTech and Faruq Ariyo. Status and accountability explicitly labelled.",
  },
};

export default function ProjectsPage() {
  const projects = getProjects("project");

  return (
    <div className="wrap section">
      <SectionStrip n="01" name="Products & Experiments" />

      <div className="max-w-3xl">
        <h1 style={{ fontSize: "var(--step-5)", fontWeight: 500 }}>
          Independent products & systems.
        </h1>
        <p className="mt-4 text-[var(--text-2)]" style={{ fontSize: "var(--step-1)" }}>
          Software engineered independently by HafTech and founder Faruq Ariyo. Each product states
          its operational status, architecture, and current engineering milestones.
        </p>
      </div>

      {/* Status Taxonomy Legend */}
      <div className="mt-8 border border-line bg-surface p-4 flex flex-wrap items-center gap-4 text-xs">
        <span className="label text-[11px] text-[var(--text)]">Status Taxonomy:</span>
        <div className="flex flex-wrap gap-3">
          <StatusTag status="concept" />
          <StatusTag status="exploring" />
          <StatusTag status="in-development" />
          <StatusTag status="internal-testing" />
          <StatusTag status="live" />
          <StatusTag status="archived" />
        </div>
      </div>

      <div className="mt-12">
        {projects.length === 0 ? (
          <div className="border border-line bg-surface p-8 max-w-2xl">
            <h2 style={{ fontSize: "var(--step-2)" }}>Products in preparation</h2>
            <p className="mt-3 text-sm text-[var(--text-2)] leading-relaxed">
              Verified product records are being finalized for production display.
            </p>
          </div>
        ) : (
          <div className="grid gap-12">
            {projects.map((p, i) => (
              <article
                key={p.slug}
                className="border-t border-line pt-8 grid gap-6 lg:grid-cols-12 items-start"
              >
                <div className="lg:col-span-5">
                  <ImageMask aspectRatio="16 / 10" className="border border-line bg-surface">
                    <div className="w-full h-full flex items-center justify-center">
                      <p className="label">Screenshot pending</p>
                    </div>
                  </ImageMask>
                </div>
                <div className="lg:col-span-7 flex flex-col justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="label text-xs">0{i + 1} · {p.category}</span>
                      <StatusTag status={p.status} />
                      {!p.verified && (
                        <span className="label text-[10px] border border-line px-1.5 py-0.5 text-[var(--ht-concrete)]">
                          Unverified preview
                        </span>
                      )}
                    </div>
                    <h2
                      className="mt-3"
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "var(--step-3)",
                        fontWeight: 500,
                      }}
                    >
                      <Link
                        href={`/projects/${p.slug}`}
                        className="hover:text-[var(--accent)] transition-colors"
                      >
                        {p.title}
                      </Link>
                    </h2>
                    <p className="mt-2 text-sm text-[var(--text-2)] max-w-xl">{p.summary}</p>
                  </div>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {p.technologies.map((t) => (
                      <span
                        key={t}
                        className="label text-[11px] border border-line px-2 py-0.5 bg-surface"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="mt-6 flex items-center gap-4">
                    <Link
                      href={`/projects/${p.slug}`}
                      className="label text-xs inline-flex items-center gap-1 text-[var(--accent)] hover:underline"
                    >
                      Inspect product architecture →
                    </Link>
                    {p.links?.live && (
                      <a
                        href={p.links.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="label text-xs inline-flex items-center gap-1 text-[var(--text-2)] hover:text-[var(--text)]"
                      >
                        Live URL ↗
                      </a>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

