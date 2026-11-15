import type { Metadata } from "next";
import Link from "next/link";
import { getProjects } from "@/lib/content";
import { StatusTag } from "@/components/ui/StatusTag";
import { SectionStrip } from "@/components/ui/SectionStrip";
import { ImageMask } from "@/components/motion/ImageMask";

export const metadata: Metadata = {
  title: "Work — Client & Studio Projects",
  description:
    "Client work and studio systems built under the HafTech name. Each item states ownership, scope, and verified status.",
  alternates: {
    canonical: "/work",
  },
  openGraph: {
    title: "Work — Client & Studio Projects — HafTech",
    description:
      "Client work and studio systems built under the HafTech name. Each item states ownership, scope, and verified status.",
  },
};

export default function WorkPage() {
  const workItems = getProjects("work");

  return (
    <div className="wrap section">
      <SectionStrip n="01" name="Archive · Client Work" />

      <div className="max-w-3xl">
        <h1 style={{ fontSize: "var(--step-5)", fontWeight: 500 }}>
          Client & studio systems.
        </h1>
        <p className="mt-4 text-[var(--text-2)]" style={{ fontSize: "var(--step-1)" }}>
          Software engineered for third parties and studio deployments. Built under contract or
          mandate, with explicit scope and client attribution.
        </p>
      </div>

      <div className="mt-12">
        {workItems.length === 0 ? (
          <div className="border border-line bg-surface p-8 max-w-2xl">
            <h2 style={{ fontSize: "var(--step-2)" }}>Client case studies pending verification</h2>
            <p className="mt-3 text-sm text-[var(--text-2)] leading-relaxed">
              We never publish client engagements without explicit written permission and verified
              scope. Candidate client projects (including Deen Drip and RealtyIntel) are currently in
              verification.
            </p>
            <div className="mt-6">
              <Link href="/contact" className="btn text-sm">
                Discuss an engagement
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid gap-12">
            {workItems.map((p, i) => (
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
                      <Link href={`/work/${p.slug}`} className="hover:text-[var(--accent)] transition-colors">
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

                  <div className="mt-6">
                    <Link
                      href={`/work/${p.slug}`}
                      className="label text-xs inline-flex items-center gap-1 text-[var(--accent)] hover:underline"
                    >
                      View project specifications →
                    </Link>
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

