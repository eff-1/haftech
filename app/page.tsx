import { Hero } from "@/components/sections/Hero";
import { Philosophy } from "@/components/sections/Philosophy";
import { SelectedWork } from "@/components/sections/SelectedWork";
import { Visualization } from "@/components/sections/Visualization";
import { Capabilities } from "@/components/sections/Capabilities";
import { Methodology } from "@/components/sections/Methodology";
import { FounderIntro } from "@/components/sections/FounderIntro";
import { ClosingCta } from "@/components/sections/ClosingCta";

export default function Home() {
  return (
    <>
      <Hero />
      <Philosophy />
      <SelectedWork />
      <Visualization />
      <Capabilities />
      <Methodology />
      <FounderIntro />
      <ClosingCta />
    </>
  );
}