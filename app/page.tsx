import dynamic from "next/dynamic";
import { Hero } from "@/components/sections/Hero";

const Philosophy = dynamic(() => import("@/components/sections/Philosophy").then((m) => m.Philosophy));
const VerticalShowcase = dynamic(() => import("@/components/sections/VerticalShowcase").then((m) => m.VerticalShowcase));
const Visualization = dynamic(() => import("@/components/sections/Visualization").then((m) => m.Visualization));
const Capabilities = dynamic(() => import("@/components/sections/Capabilities").then((m) => m.Capabilities));
const Methodology = dynamic(() => import("@/components/sections/Methodology").then((m) => m.Methodology));
const FounderIntro = dynamic(() => import("@/components/sections/FounderIntro").then((m) => m.FounderIntro));
const ClosingCta = dynamic(() => import("@/components/sections/ClosingCta").then((m) => m.ClosingCta));

export default function Home() {
  return (
    <>
      <Hero />
      <Philosophy />
      <VerticalShowcase />
      <Visualization />
      <Capabilities />
      <Methodology />
      <FounderIntro />
      <ClosingCta />
    </>
  );
}