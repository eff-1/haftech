import type { Metadata } from "next";
import { SectionStrip } from "@/components/ui/SectionStrip";
import { ContactForm } from "@/components/sections/ContactForm";
import { JsonLd, getContactPageJsonLd } from "@/components/seo/JsonLd";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://haftech.com";

export const metadata: Metadata = {
  title: "Contact & Project Inquiries — HafTech Studio",
  description:
    "Direct contact channel for engineering projects, technical partnerships, and architecture inquiries.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact & Project Inquiries — HafTech Studio",
    description:
      "Direct contact channel for engineering projects, technical partnerships, and architecture inquiries.",
    url: `${siteUrl}/contact`,
  },
};

export default function ContactPage() {
  const directEmail = process.env.CONTACT_TO_EMAIL || "haftechhq@gmail.com";

  return (
    <div className="wrap section">
      <JsonLd data={getContactPageJsonLd(siteUrl)} />
      <SectionStrip n="01" name="Engagements · Contact" />

      <div className="grid gap-12 lg:grid-cols-12 items-start">
        <div className="lg:col-span-5">
          <h1 style={{ fontSize: "var(--step-5)", fontWeight: 500, lineHeight: 1.05 }}>
            Have something worth building?
          </h1>
          <p className="mt-4 text-[var(--text-2)]" style={{ fontSize: "var(--step-1)" }}>
            We work with founders and technical leaders who need software engineered with craft,
            durability, and operational discipline.
          </p>

          <div className="mt-8 border-t border-line pt-6 space-y-6">
            <div>
              <p className="label text-xs mb-1">Direct Engineering Inbox</p>
              <a
                href={`mailto:${directEmail}`}
                className="text-base font-medium text-[var(--text)] hover:text-[var(--accent)] underline"
              >
                {directEmail}
              </a>
            </div>

            <div>
              <p className="label text-xs mb-1">Response Expectations</p>
              <p className="text-xs text-[var(--text-2)] leading-relaxed">
                Initial replies include technical review and clarification questions. We do not
                send automated sales decks or inflated estimates.
              </p>
            </div>

            <div>
              <p className="label text-xs mb-1">What to Include</p>
              <ul className="text-xs text-[var(--text-2)] space-y-1" style={{ paddingLeft: "1.1em" }}>
                <li>Summary of the problem or opportunity</li>
                <li>Known constraints (timeline, existing stack)</li>
                <li>Target milestone or deliverable format</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7">
          <ContactForm />
        </div>
      </div>
    </div>
  );
}

