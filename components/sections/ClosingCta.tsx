import Link from "next/link";
import { copy } from "@/content/copy";

export function ClosingCta() {
  // Email comes from config, never hard-coded. OPEN: which inbox receives enquiries.
  const email = process.env.CONTACT_TO_EMAIL;
  return (
    <section style={{ background: "var(--ht-graphite)", color: "var(--ht-ivory)" }} aria-labelledby="closing-h2">
      <div className="wrap section">
        <p className="label" style={{ color: "var(--ht-concrete)" }}>07 — Contact</p>
        <h2 id="closing-h2" style={{ fontSize: "var(--step-6)", maxWidth: "14ch", marginTop: "var(--s-5)" }}>{copy.closing}</h2>
        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-8">
          <Link href="/contact" className="btn justify-center" style={{ background: "var(--ht-ivory)", color: "var(--ht-graphite)", borderColor: "var(--ht-ivory)" }}>Start a project</Link>
          {email && <a href={`mailto:${email}`} style={{ color: "var(--ht-blue-hl-dark)", display: "inline-flex", alignItems: "center", minHeight: 48 }}>{email}</a>}
        </div>
      </div>
    </section>
  );
}