import dynamic from "next/dynamic";
import { Hero } from "@/components/sections/Hero";

const Philosophy = dynamic(() => import("@/components/sections/Philosophy").then((m) => m.Philosophy));
const Capabilities = dynamic(() => import("@/components/sections/Capabilities").then((m) => m.Capabilities));
const ProjectShowcase = dynamic(() => import("@/components/showcase/ProjectShowcase").then((m) => m.ProjectShowcase));
const Visualization = dynamic(() => import("@/components/sections/Visualization").then((m) => m.Visualization));
const Methodology = dynamic(() => import("@/components/sections/Methodology").then((m) => m.Methodology));
const FounderIntro = dynamic(() => import("@/components/sections/FounderIntro").then((m) => m.FounderIntro));
const ClosingCta = dynamic(() => import("@/components/sections/ClosingCta").then((m) => m.ClosingCta));

export default function Home() {
  return (
    <>
      <Hero />
      <Philosophy />
      <Capabilities />
      <ProjectShowcase />
      <Visualization />
      <Methodology />
      <FounderIntro />
      <ClosingCta />
    </>
  );
}