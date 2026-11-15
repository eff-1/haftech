import Link from "next/link";
import { methodology } from "@/content/copy";
import { SectionStrip } from "@/components/ui/SectionStrip";

export function Methodology() {
  return (
    <section className="wrap section" aria-labelledby="method-h2">
      <SectionStrip n="05" name="Methodology" />
      <div className="grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <h2 id="method-h2" style={{ fontSize: "var(--step-5)" }}>How we work</h2>
          <p style={{ marginTop: "var(--s-4)", maxWidth: "40ch" }}>{methodology.intro}</p>
        </div>
        <ol className="lg:col-span-7 lg:col-start-6" style={{ listStyle: "none", margin: 0, padding: 0 }}>
          {methodology.stages.map((s) => (
            <li key={s.slug} id={s.slug} className="border-t border-line py-6">
              <p className="label" style={{ color: "var(--accent)" }}>{s.n}</p>
              <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 500, fontSize: "var(--step-3)", marginTop: "var(--s-2)" }}>{s.title}</h3>
              <dl style={{ margin: "var(--s-4) 0 0" }} className="grid gap-2 sm:grid-cols-[7rem_1fr]">
                {([["Input", s.input], ["Activities", s.activity], ["Output", s.output]] as const).map(([k, v]) => (
                  <div key={k} className="contents">
                    <dt className="label">{k}</dt>
                    <dd style={{ margin: 0 }}>{v}</dd>
                  </div>
                ))}
              </dl>
            </li>
          ))}
          <li className="border-t border-line pt-4">
            <Link href="/approach" style={{ display: "inline-flex", alignItems: "center", minHeight: 48 }}>Read the full approach →</Link>
          </li>
        </ol>
      </div>
    </section>
  );
}