"use client";
import React, { useState } from "react";
import Link from "next/link";
import { capabilities } from "@/content/copy";
import { SectionStrip } from "@/components/ui/SectionStrip";

export function Capabilities() {
  const [openSlug, setOpenSlug] = useState<string | null>(capabilities[0].slug);

  const toggle = (slug: string) => {
    setOpenSlug((prev) => (prev === slug ? null : slug));
  };

  return (
    <section className="wrap section defer" aria-labelledby="cap-h2">
      <SectionStrip n="04" name="Capabilities" />
      <h2 id="cap-h2" style={{ fontSize: "var(--step-5)", maxWidth: "16ch" }}>
        What we do
      </h2>
      <div className="mt-8">
        {capabilities.map((c, i) => {
          const isOpen = openSlug === c.slug;
          return (
            <div key={c.slug} id={c.slug} className="border-t border-line capability-item">
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={`panel-${c.slug}`}
                onClick={() => toggle(c.slug)}
                className="w-full text-left grid cursor-pointer items-center gap-2 py-4 md:grid-cols-12 md:gap-6 group"
                style={{
                  minHeight: 56,
                  background: "transparent",
                  border: "none",
                  paddingInline: 0,
                  color: "inherit",
                }}
              >
                <span
                  className="label md:col-span-1 transition-transform duration-180 ease-out group-hover:translate-x-2"
                  style={{ willChange: "transform" }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  className="md:col-span-5"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "var(--step-3)",
                    lineHeight: 1.1,
                  }}
                >
                  {c.title}
                </span>
                <span className="md:col-span-6" style={{ color: "var(--text-2)" }}>
                  {c.line}
                </span>
              </button>

              <div
                id={`panel-${c.slug}`}
                role="region"
                aria-labelledby={c.slug}
                className="grid transition-[grid-template-rows] duration-300 ease-in-out"
                style={{
                  gridTemplateRows: isOpen ? "1fr" : "0fr",
                }}
              >
                <div className="overflow-hidden">
                  <div
                    className="grid gap-4 pb-6 md:grid-cols-12 md:gap-6 transition-opacity duration-300"
                    style={{
                      opacity: isOpen ? 1 : 0,
                    }}
                  >
                    <ul
                      className="md:col-span-5 md:col-start-2"
                      style={{ margin: 0, paddingLeft: "1.2em" }}
                    >
                      {c.points.map((p) => (
                        <li key={p}>{p}</li>
                      ))}
                    </ul>
                    <p className="md:col-span-5 md:col-start-8" style={{ margin: 0 }}>
                      <Link
                        href={`/services#${c.slug}`}
                        style={{ display: "inline-flex", alignItems: "center", minHeight: 48 }}
                      >
                        About {c.title.toLowerCase()} →
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        <hr className="rule" />
      </div>
    </section>
  );
}
