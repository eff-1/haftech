import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getProject, getProjects, getAllProjectSlugs } from "@/lib/content";
import { StatusTag } from "@/components/ui/StatusTag";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ContributionMatrix } from "@/components/ui/ContributionMatrix";
import { ImageMask } from "@/components/motion/ImageMask";
import { JsonLd, getProjectJsonLd } from "@/components/seo/JsonLd";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://haftech.site";

export async function generateStaticParams() {
  const slugs = getAllProjectSlugs("project");
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug, "project");
  if (!project) return { title: "Project Not Found" };

  return {
    title: `${project.title} — System Architecture & Roadmap`,
    description: project.summary,
    alternates: {
      canonical: `/projects/${project.slug}`,
    },
    openGraph: {
      title: `${project.title} — HafTech Product`,
      description: project.summary,
      url: `${siteUrl}/projects/${project.slug}`,
    },
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug, "project");

  if (!project) {
    notFound();
  }

  const allProjects = getProjects("project");
  const currentIndex = allProjects.findIndex((p) => p.slug === slug);
  const nextProject = allProjects[(currentIndex + 1) % allProjects.length];

  return (
    <article className="wrap section">
      <JsonLd data={getProjectJsonLd(project, siteUrl, "projects")} />
      <Breadcrumbs items={[{ label: "Projects", href: "/projects" }, { label: project.title }]} />

      <header className="border-b border-line pb-8">
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <span className="label text-xs">{project.category}</span>
          <StatusTag status={project.status} />
          {!project.verified && (
            <span className="label text-[10px] border border-line px-2 py-0.5 text-[var(--ht-concrete)]">
              Unverified Seed Record
            </span>
          )}
        </div>

        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "var(--step-5)",
            fontWeight: 500,
            lineHeight: 1.05,
          }}
        >
          {project.title}
        </h1>

        <p className="mt-4 text-[var(--text-2)] max-w-3xl" style={{ fontSize: "var(--step-1)" }}>
          {project.summary}
        </p>

        {project.links?.live && (
          <div className="mt-4">
            <a
              href={project.links.live}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary text-xs inline-flex items-center gap-2"
              style={{ minHeight: 40 }}
            >
              Visit live deployment ↗
            </a>
          </div>
        )}
      </header>

      {/* Hero preview frame */}
      <div className="my-8">
        <ImageMask aspectRatio="16 / 9" className="border border-line bg-surface">
          <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center">
            <p className="label">Interface Capture Pending</p>
            <p className="text-xs text-[var(--text-2)] mt-1 max-w-md">
              Wireframes, architecture schematics and production screenshots will be uploaded upon
              milestone verification.
            </p>
          </div>
        </ImageMask>
      </div>

      {/* 2-column specifications */}
      <div className="grid gap-12 lg:grid-cols-12 items-start mt-12">
        {/* Left: Metadata sidebar */}
        <aside className="lg:col-span-4 border-t lg:border-t-0 lg:border-r border-line lg:pr-8">
          <h2 className="label text-xs mb-4">Product Attributes</h2>
          <dl className="grid gap-4 text-sm" style={{ margin: 0 }}>
            <div>
              <dt className="label text-[11px]">Ownership Entity</dt>
              <dd className="mt-1 font-medium" style={{ margin: 0, color: "var(--text)" }}>
                {project.ownership === "haftech"
                  ? "HafTech Studio (Owned)"
                  : "Independent (Faruq Ariyo)"}
              </dd>
            </div>
            <div>
              <dt className="label text-[11px]">Engineering Role</dt>
              <dd className="mt-1" style={{ margin: 0, color: "var(--text)" }}>
                {project.roles.join(" · ")}
              </dd>
            </div>
            <div>
              <dt className="label text-[11px]">Core Stack</dt>
              <dd className="mt-1 flex flex-wrap gap-1.5" style={{ margin: 0 }}>
                {project.technologies.length > 0 ? (
                  project.technologies.map((t) => (
                    <span
                      key={t}
                      className="label text-[10px] border border-line px-2 py-0.5 bg-surface"
                    >
                      {t}
                    </span>
                  ))
                ) : (
                  <span className="text-xs text-[var(--text-2)] italic">In verification</span>
                )}
              </dd>
            </div>
            <div>
              <dt className="label text-[11px]">Audit Record</dt>
              <dd className="mt-1 text-xs text-[var(--text-2)]" style={{ margin: 0 }}>
                {project.statusVerifiedOn}
              </dd>
            </div>
          </dl>
        </aside>

        {/* Right: Technical Narrative */}
        <div className="lg:col-span-8 space-y-8">
          <section>
            <h2 className="label text-xs mb-2">System Overview</h2>
            <p className="text-[var(--text)] leading-relaxed">
              {project.summary}
            </p>
          </section>

          <section>
            <h2 className="label text-xs mb-2">Technical Decisions & Architecture</h2>
            <p className="text-[var(--text-2)] leading-relaxed text-sm">
              Engineered with a focus on modularity, predictable data flow, and minimal infrastructure
              maintenance overhead. Data integrity constraints are enforced at the database layer.
            </p>
          </section>

          <section>
            <h2 className="label text-xs mb-2">Roadmap & Status</h2>
            <div className="border border-line bg-surface p-4">
              <p className="text-sm font-medium" style={{ color: "var(--text)" }}>
                Current Phase: <StatusTag status={project.status} />
              </p>
              <p className="text-xs text-[var(--text-2)] mt-2">
                Work continues on core validation rules, deployment pipelines, and operational telemetry.
              </p>
            </div>
          </section>

          {/* Explicit Contribution Matrix */}
          <ContributionMatrix
            ownership={project.ownership}
            ownerName={project.ownerName}
            contributions={project.contributions}
            verified={project.verified}
          />

          {/* Next project or Contact CTA */}
          <div className="border-t border-line pt-8 flex flex-col sm:flex-row items-baseline justify-between gap-4">
            {nextProject && nextProject.slug !== slug ? (
              <div>
                <span className="label text-xs">Next Product</span>
                <p className="mt-1">
                  <Link
                    href={`/projects/${nextProject.slug}`}
                    className="font-medium text-[var(--text)] hover:text-[var(--accent)]"
                    style={{ fontFamily: "var(--font-display)", fontSize: "var(--step-2)" }}
                  >
                    {nextProject.title} →
                  </Link>
                </p>
              </div>
            ) : null}

            <div>
              <Link href="/contact" className="btn text-sm">
                Discuss collaboration
              </Link>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

