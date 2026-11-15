import Link from "next/link";
import { founderIntro } from "@/content/copy";
import { SectionStrip } from "@/components/ui/SectionStrip";
import { ImageMask } from "@/components/motion/ImageMask";

export function FounderIntro() {
  return (
    <section className="wrap section defer" aria-labelledby="founder-h2">
      <SectionStrip n="06" name="Founder" />
      <div className="grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <ImageMask aspectRatio="4 / 5" className="border border-line bg-surface">
            <div className="w-full h-full flex items-center justify-center">
              {/* OPEN: founder portrait not supplied */}
              <p className="label">Portrait pending</p>
            </div>
          </ImageMask>
        </div>
        <div className="lg:col-span-6 lg:col-start-6 lg:self-center">
          <h2 id="founder-h2" style={{ fontSize: "var(--step-4)" }}>
            {founderIntro.pull}
          </h2>
          <p style={{ marginTop: "var(--s-5)", maxWidth: "54ch" }}>{founderIntro.text}</p>
          <p style={{ marginTop: "var(--s-5)" }}>
            <Link
              href="/founder"
              style={{ display: "inline-flex", alignItems: "center", minHeight: 48 }}
            >
              About the founder →
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
