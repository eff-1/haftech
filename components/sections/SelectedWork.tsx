import Link from "next/link";
import { getProjects } from "@/lib/content";
import { StatusTag } from "@/components/ui/StatusTag";
import { SectionStrip } from "@/components/ui/SectionStrip";
import { ImageMask } from "@/components/motion/ImageMask";
import type { Project } from "@/lib/schema";

const ownerLabel: Record<Project["ownership"], string> = {
  client: "Client work",
  haftech: "Owned by HafTech",
  "founder-independent": "Independently developed by Faruq Ariyo",
  joint: "Joint",
};

function Feature({ p, i, verified }: { p: Project; i: number; verified: boolean }) {
  const span = i === 0 ? "lg:col-span-12" : i === 1 ? "lg:col-span-7" : "lg:col-span-5 lg:mt-24";
  const ratio = i === 0 ? "16 / 9" : "4 / 3";

  return (
    <article className={span}>
      <Link
        href={`/projects/${p.slug}`}
        style={{ color: "inherit", textDecoration: "none", display: "block" }}
      >
        <ImageMask aspectRatio={ratio} className="border border-line bg-surface">
          <div className="w-full h-full flex items-center justify-center">
            <p className="label">Screenshot pending</p>
          </div>
        </ImageMask>
        <div className="mt-4 grid gap-4 md:grid-cols-12">
          <div className="md:col-span-7">
            <p className="label">
              0{i + 1} — {p.category}
              {verified ? "" : " · Unverified preview"}
            </p>
            <h3
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 500,
                fontSize: "var(--step-4)",
                lineHeight: 1.1,
                marginTop: "var(--s-2)",
              }}
            >
              <span
                style={{
                  textDecoration: "underline",
                  textUnderlineOffset: 6,
                  textDecorationColor: "var(--line)",
                }}
              >
                {p.title}
              </span>
            </h3>
            <p style={{ marginTop: "var(--s-3)", maxWidth: "54ch" }}>{p.summary}</p>
          </div>
          <dl className="label md:col-span-5" style={{ margin: 0 }}>
            {[
              ["Ownership", ownerLabel[p.ownership]],
              ["Role", p.roles.join(", ")],
              ["Stack", p.technologies.join(", ") || "To be confirmed"],
            ].map(([k, v]) => (
              <div key={k} className="flex gap-3 border-t border-line py-2">
                <dt style={{ minWidth: "6rem" }}>{k}</dt>
                <dd style={{ margin: 0, color: "var(--text)" }}>{v}</dd>
              </div>
            ))}
            <div className="border-t border-line py-2">
              <StatusTag status={p.status} />
            </div>
          </dl>
        </div>
      </Link>
    </article>
  );
}

export function SelectedWork() {
  const items = getProjects()
    .filter((p) => p.featuredCandidate)
    .slice(0, 4);
  return (
    <section className="wrap section" aria-labelledby="work-h2">
      <SectionStrip n="02" name="Selected work" />
      <h2 id="work-h2" style={{ fontSize: "var(--step-5)", maxWidth: "16ch" }}>
        Selected work
      </h2>
      {items.length === 0 ? (
        <p style={{ marginTop: "var(--s-6)", maxWidth: "54ch" }}>
          {/* Empty until at least one project has verified:true. */}
          Case studies are being prepared. Each one will state who owns the project, what we built
          and what is live.
        </p>
      ) : (
        <div className="mt-8 grid gap-x-8 gap-y-12 lg:grid-cols-12">
          {items.map((p, i) => (
            <Feature key={p.slug} p={p} i={i} verified={p.verified} />
          ))}
        </div>
      )}
    </section>
  );
}
