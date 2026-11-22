import React from "react";
import { HeroScrollStory } from "./HeroScrollStory";

export function Hero() {
  return (
    <section
      className="relative overflow-x-clip border-b border-line bg-[var(--bg)]"
      aria-labelledby="hero-h1"
    >
      {/* Existing Hairline Drafting Grid Background */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--line) 1px, transparent 1px), linear-gradient(to bottom, var(--line) 1px, transparent 1px)",
          backgroundSize: "clamp(48px, 6vw, 96px) clamp(48px, 6vw, 96px)",
        }}
        aria-hidden="true"
      />

      <HeroScrollStory />
    </section>
  );
}
