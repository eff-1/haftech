import type { Metadata } from "next";
import Link from "next/link";
import { capabilities } from "@/content/copy";
import { SectionStrip } from "@/components/ui/SectionStrip";
import { VizWrapper } from "@/components/viz/VizWrapper";

export const metadata: Metadata = {
  title: "Services & Capabilities — Software Engineering",
  description:
    "Custom software, web applications, backend engineering, API development, business automation, and product architecture.",
  alternates: {
    canonical: "/services",
  },
  openGraph: {
    title: "Services & Capabilities — HafTech",
    description:
      "Custom software, web applications, backend engineering, API development, business automation, and product architecture.",
  },
};

export default function ServicesPage() {
  return (
    <div className="wrap section">
      <SectionStrip n="01" name="Capabilities · Services" />

      <div className="max-w-3xl">
        <h1 style={{ fontSize: "var(--step-5)", fontWeight: 500 }}>
          Capabilities & engineering scope.
        </h1>
        <p className="mt-4 text-[var(--text-2)]" style={{ fontSize: "var(--step-1)" }}>
          We design and build digital products, intelligent systems, and software backends that help
          ambitious businesses move forward. Every engagement is led by senior engineering.
        </p>
      </div>

      {/* Seven capability rows with deep-linkable anchors */}
      <div className="mt-16 space-y-12">
        {capabilities.map((c, i) => (
          <section
            key={c.slug}
            id={c.slug}
            className="border-t border-line pt-8 scroll-mt-24 grid gap-6 lg:grid-cols-12"
          >
            <div className="lg:col-span-4">
              <span className="label text-xs">Capability 0{i + 1}</span>
              <h2
                className="mt-2"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "var(--step-3)",
                  fontWeight: 500,
                }}
              >
                {c.title}
              </h2>
              <p className="mt-2 text-sm text-[var(--text-2)]">{c.line}</p>
            </div>

            <div className="lg:col-span-8 space-y-4">
              <ul className="grid sm:grid-cols-2 gap-3 text-sm" style={{ paddingLeft: "1.1em" }}>
                {c.points.map((p) => (
                  <li key={p} style={{ color: "var(--text)" }}>
                    {p}
                  </li>
                ))}
              </ul>
              <div className="pt-2">
                <Link
                  href="/contact"
                  className="label text-xs inline-flex items-center gap-1 text-[var(--accent)] hover:underline"
                >
                  Discuss a {c.title.toLowerCase()} requirement →
                </Link>
              </div>
            </div>
          </section>
        ))}
      </div>

      {/* Reusable Architecture Explorer section */}
      <div className="mt-24 pt-12 border-t border-line">
        <div className="max-w-2xl mb-8">
          <span className="label">System Design Discipline</span>
          <h2 style={{ fontSize: "var(--step-4)", fontWeight: 500, marginTop: "var(--s-2)" }}>
            How our engineering connects together
          </h2>
          <p className="mt-2 text-sm text-[var(--text-2)]">
            Whether delivering an internal tool or a multi-tenant platform, we separate concerns
            across each layer of the operational stack.
          </p>
        </div>
        <VizWrapper />
      </div>

      {/* CTA section */}
      <div className="mt-20 border border-line bg-surface p-8 max-w-3xl">
        <h2 style={{ fontSize: "var(--step-3)", fontWeight: 500 }}>
          Have a project ready to specify?
        </h2>
        <p className="mt-2 text-sm text-[var(--text-2)] max-w-xl">
          We review requirements, assess technical constraints, and provide an honest build scope.
        </p>
        <div className="mt-6 flex flex-wrap gap-4 items-center">
          <Link href="/contact" className="btn text-sm">
            Start a project
          </Link>
          <Link href="/approach" className="label text-xs text-[var(--text)] hover:underline">
            Read our 4-stage methodology →
          </Link>
        </div>
      </div>
    </div>
  );
}

