import Link from "next/link";
import Image from "next/image";
import { founderIntro } from "@/content/copy";
import { SectionStrip } from "@/components/ui/SectionStrip";
import { ImageMask } from "@/components/motion/ImageMask";

export function FounderIntro() {
  return (
    <section className="wrap section defer" aria-labelledby="founder-h2">
      <SectionStrip n="06" name="Leadership · Founder" />
      <div className="grid gap-12 lg:grid-cols-12 items-center">
        <div className="lg:col-span-4">
          <ImageMask aspectRatio="4 / 5" className="border border-line bg-surface relative overflow-hidden shadow-xl rounded-sm">
            <Image
              src="/media/founder-portrait.jpg"
              alt="Faruq Ariyo — Founder & Systems Engineer at HafTech"
              fill
              sizes="(max-width: 1024px) 100vw, 35vw"
              className="object-cover object-center grayscale hover:grayscale-0 transition-all duration-700 ease-out"
            />
          </ImageMask>
        </div>
        <div className="lg:col-span-7 lg:col-start-6">
          <span className="label text-xs">FOUNDER & ENGINEERING LEAD</span>
          <h2 id="founder-h2" style={{ fontSize: "var(--step-4)", fontWeight: 500, lineHeight: 1.15, marginTop: "var(--s-3)" }}>
            {founderIntro.pull}
          </h2>
          <p className="text-[var(--text-2)] leading-relaxed" style={{ marginTop: "var(--s-4)", maxWidth: "54ch" }}>
            {founderIntro.text}
          </p>
          <div className="mt-8 flex items-center gap-4">
            <Link
              href="/founder"
              className="btn btn-secondary text-xs font-mono inline-flex items-center gap-2"
              style={{ minHeight: 44, paddingInline: "var(--s-4)" }}
            >
              <span>Explore Founder Profile & Principles</span>
              <span>→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
