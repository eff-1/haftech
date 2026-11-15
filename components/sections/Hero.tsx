import Link from "next/link";
import { copy } from "@/content/copy";
import { TextReveal } from "@/components/motion/TextReveal";
import { LineDrawing } from "@/components/motion/LineDrawing";

export function Hero() {
  return (
    <section
      className="wrap"
      style={{ paddingBlock: "var(--s-7) var(--section-y)" }}
      aria-labelledby="hero-h1"
    >
      <div className="grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-9">
          <p className="label">{copy.hero.label}</p>
          <TextReveal
            lines={copy.hero.h1}
            as="h1"
            id="hero-h1"
            isHero={true}
            style={{
              fontSize: "var(--step-6)",
              fontWeight: 700,
              lineHeight: 1,
              marginTop: "var(--s-5)",
            }}
          />
          <p
            style={{
              fontSize: "var(--step-1)",
              lineHeight: 1.4,
              maxWidth: "54ch",
              marginTop: "var(--s-6)",
            }}
          >
            {copy.hero.support}
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
            <Link href="/contact" className="btn justify-center">
              Start a project
            </Link>
            <Link
              href="/work"
              style={{ display: "inline-flex", alignItems: "center", minHeight: 48 }}
            >
              See the work →
            </Link>
          </div>
          <p className="label mt-6">
            Founded by <Link href="/founder">{copy.founderName}</Link>
          </p>
        </div>
        <div className="mx-auto w-3/5 max-w-xs md:w-2/5 lg:col-span-3 lg:w-full lg:self-end">
          <LineDrawing />
        </div>
      </div>
    </section>
  );
}
