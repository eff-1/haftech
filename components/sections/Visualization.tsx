import { SectionStrip } from "@/components/ui/SectionStrip";
import { VizWrapper } from "@/components/viz/VizWrapper";

export function Visualization() {
  return (
    <section
      className="relative border-b border-[#26262b] bg-[#121214] text-[#f1efe8] py-16 sm:py-24 overflow-hidden"
      aria-labelledby="viz-h2"
    >
      {/* Background Architectural Grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-15"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.08) 1px, transparent 1px)",
          backgroundSize: "clamp(32px, 5vw, 64px) clamp(32px, 5vw, 64px)",
        }}
        aria-hidden="true"
      />

      <div className="wrap relative z-10">
        {/* Dark theme SectionStrip */}
        <div className="mb-8 flex items-center justify-between border-b border-[#26262b] pb-3">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs font-semibold text-[#60a5fa]">04</span>
            <span className="h-3 w-px bg-[#333338]" />
            <span className="font-mono text-xs tracking-wider text-[#a09fa6] uppercase">
              Engineering visualisation
            </span>
          </div>
          <span className="font-mono text-[11px] text-[#a09fa6] hidden sm:inline uppercase">
            Interactive Stack Model
          </span>
        </div>

        <div className="max-w-3xl mb-10">
          <h2
            id="viz-h2"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "var(--step-5)",
              lineHeight: 1.05,
              fontWeight: 500,
              letterSpacing: "-0.02em",
            }}
            className="text-[#f1efe8]"
          >
            How a product is structured
          </h2>
          {/* Support copy <= 25 words before interaction */}
          <p className="mt-4 text-base sm:text-lg text-[#a09fa6] max-w-2xl font-light">
            Every product is an interconnected stack. Trace how requests travel from user interaction through identity, business logic, and databases.
          </p>
        </div>

        <VizWrapper />
      </div>
    </section>
  );
}
