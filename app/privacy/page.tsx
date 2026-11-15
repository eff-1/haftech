import type { Metadata } from "next";
import Link from "next/link";
import { SectionStrip } from "@/components/ui/SectionStrip";

export const metadata: Metadata = {
  title: "Privacy Policy — HafTech Studio",
  description:
    "Privacy and data practices for the HafTech studio website. Cookieless analytics, minimal collection, and zero data brokering.",
  alternates: {
    canonical: "/privacy",
  },
  openGraph: {
    title: "Privacy Policy — HafTech Studio",
    description:
      "Privacy and data practices for the HafTech studio website. Cookieless analytics, minimal collection, and zero data brokering.",
  },
};

export default function PrivacyPage() {
  const directEmail = process.env.CONTACT_TO_EMAIL || "haftechhq@gmail.com";

  return (
    <article className="wrap section max-w-3xl">
      <SectionStrip n="01" name="Legal · Privacy Policy" />

      <h1 style={{ fontSize: "var(--step-5)", fontWeight: 500, lineHeight: 1.05 }}>
        Privacy & Data Transparency
      </h1>
      <p className="mt-3 label text-xs text-[var(--text-2)]">
        Last updated: November 2026 · Plain language summary
      </p>

      <div className="mt-8 space-y-8 text-sm leading-relaxed text-[var(--text)]">
        <section>
          <h2 className="label text-xs mb-2">1. Our Core Principle</h2>
          <p>
            HafTech operates with engineering minimalism. We collect only what is strictly necessary
            to respond to your project enquiries and operate a fast, reliable website. We do not sell,
            broker, or monetize visitor data.
          </p>
        </section>

        <section>
          <h2 className="label text-xs mb-2">2. Cookieless Architecture</h2>
          <p>
            This website does not store non-essential cookies on your device. We use no marketing
            pixels, third-party advertising cookies, or cross-site tracking beacons. Performance and
            page telemetry are evaluated strictly on aggregated, privacy-preserving metrics.
          </p>
        </section>

        <section>
          <h2 className="label text-xs mb-2">3. Contact Form Submissions</h2>
          <p>
            When you submit a project enquiry via our contact form, the information you provide
            (your name, email address, and project description) is transmitted directly to our studio
            inbox over encrypted channels. We do not store enquiries in public databases. We use your
            contact details solely to communicate regarding your request.
          </p>
        </section>

        <section>
          <h2 className="label text-xs mb-2">4. Server Diagnostics & Security</h2>
          <p>
            Standard web hosting infrastructure (edge routing) processes HTTP headers and transient IP
            addresses to guard against denial-of-service abuse and enforce rate limits. These transient
            records are purged automatically.
          </p>
        </section>

        <section>
          <h2 className="label text-xs mb-2">5. Your Inquiries & Deletion</h2>
          <p>
            You may request a copy or deletion of any correspondence at any time by reaching out
            directly to{" "}
            <a href={`mailto:${directEmail}`} className="underline text-[var(--accent)]">
              {directEmail}
            </a>
            .
          </p>
        </section>

        <div className="pt-6 border-t border-line">
          <Link href="/" className="label text-xs text-[var(--accent)] hover:underline">
            ← Return to homepage
          </Link>
        </div>
      </div>
    </article>
  );
}

