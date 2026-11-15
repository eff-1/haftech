import type { Metadata } from "next";
import { SectionStrip } from "@/components/ui/SectionStrip";
import { MethodologyScroll } from "@/components/sections/MethodologyScroll";

export const metadata: Metadata = {
  title: "Approach & Methodology — Engineering Process",
  description:
    "Four inspectable stages: Discover, Architect, Engineer, and Deliver. Transparent technical development with working milestones.",
  alternates: {
    canonical: "/approach",
  },
  openGraph: {
    title: "Approach & Methodology — HafTech",
    description:
      "Four inspectable stages: Discover, Architect, Engineer, and Deliver. Transparent technical development with working milestones.",
  },
};

export default function ApproachPage() {
  return (
    <div className="wrap section">
      <SectionStrip n="01" name="Engineering Methodology" />

      <div className="max-w-3xl">
        <h1 style={{ fontSize: "var(--step-5)", fontWeight: 500 }}>
          How engagements are run.
        </h1>
        <p className="mt-4 text-[var(--text-2)]" style={{ fontSize: "var(--step-1)" }}>
          Four disciplined stages. No speculative build phases, no opaque progress reports. Each
          stage terminates in a concrete, inspectable artifact or running build.
        </p>
      </div>

      <MethodologyScroll />
    </div>
  );
}

