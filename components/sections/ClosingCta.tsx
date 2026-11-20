import Image from "next/image";
import { copy } from "@/content/copy";
import { ClosingBrief } from "@/components/sections/ClosingBrief";

export function ClosingCta() {
  // Contact channels come from env config, never invented.
  const email = process.env.CONTACT_TO_EMAIL;
  const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;

  return (
    <section
      className="relative overflow-hidden border-t border-[#26262b] bg-[#121214] text-[#f1efe8]"
      aria-labelledby="closing-h2"
    >
      {/* Atmospheric architectural model-bench backdrop (lazy loaded) */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <Image
          src="/media/closing.jpg"
          alt=""
          fill
          sizes="100vw"
          loading="lazy"
          className="object-cover object-center opacity-25 mix-blend-luminosity"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#121214] via-[#121214]/80 to-[#121214]/90" />
      </div>

      {/* Architectural hairline grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-15"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.08) 1px, transparent 1px)",
          backgroundSize: "clamp(32px, 5vw, 64px) clamp(32px, 5vw, 64px)",
        }}
        aria-hidden="true"
      />

      <div className="wrap section relative z-10">
        {/* Section Strip */}
        <div className="mb-8 flex items-center justify-between border-b border-[#26262b] pb-3">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs font-semibold text-[#60a5fa]">07</span>
            <span className="h-3 w-px bg-[#333338]" />
            <span className="font-mono text-xs tracking-wider text-[#a09fa6] uppercase">
              Contact
            </span>
          </div>
          <span className="font-mono text-[11px] text-[#a09fa6] hidden sm:inline uppercase">
            End of Build Line
          </span>
        </div>

        <h2
          id="closing-h2"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "var(--step-6)",
            maxWidth: "14ch",
            lineHeight: 1.02,
            letterSpacing: "-0.02em",
            fontWeight: 500,
          }}
          className="text-[#f1efe8]"
        >
          {copy.closing}
        </h2>

        <p className="mt-4 text-base sm:text-lg text-[#a09fa6] max-w-xl font-light">
          Start a guided brief or message us directly.
        </p>

        <ClosingBrief directEmail={email} whatsappNumber={whatsapp} />
      </div>
    </section>
  );
}
