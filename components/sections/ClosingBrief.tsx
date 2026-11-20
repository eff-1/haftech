"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useReducedMotion } from "@/components/motion/useReducedMotion";

interface ClosingBriefProps {
  directEmail?: string;
  whatsappNumber?: string;
}

const PROJECT_TYPES = [
  "Web application",
  "Custom software",
  "Backend & API",
  "Automation / Architecture",
];

const TIMELINES = ["4–8 weeks", "2–3 months", "Flexible / Exploring"];

export function ClosingBrief({ directEmail, whatsappNumber }: ClosingBriefProps) {
  const prefersReducedMotion = useReducedMotion();
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [showAmbientVideo, setShowAmbientVideo] = useState(false);

  const [projectType, setProjectType] = useState(PROJECT_TYPES[0]);
  const [timeline, setTimeline] = useState(TIMELINES[0]);
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [websiteHp, setWebsiteHp] = useState("");

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  // Defer ambient closing video strictly to desktop idle (never mobile, never reduced-motion)
  useEffect(() => {
    if (prefersReducedMotion) return;
    const isDesktop =
      typeof window !== "undefined" &&
      window.matchMedia("(min-width: 1024px) and (pointer: fine)").matches;
    if (!isDesktop) return;

    const trigger = () => setShowAmbientVideo(true);
    if ("requestIdleCallback" in window) {
      const id = window.requestIdleCallback(trigger, { timeout: 3000 });
      return () => window.cancelIdleCallback(id);
    } else {
      const t = setTimeout(trigger, 1800);
      return () => clearTimeout(t);
    }
  }, [prefersReducedMotion]);

  const buildBriefSummary = () =>
    `Project: ${projectType}\nTimeline: ${timeline}\nName: ${name || "Not provided"}\nDetails: ${message || "Let's discuss scope."}`;

  const whatsappHref = whatsappNumber
    ? `https://wa.me/${whatsappNumber.replace(/[^\d]/g, "")}?text=${encodeURIComponent(
        `Hi HafTech — ${buildBriefSummary()}`
      )}`
    : null;

  const mailtoHref = directEmail
    ? `mailto:${directEmail}?subject=${encodeURIComponent(
        `Project Brief: ${projectType}`
      )}&body=${encodeURIComponent(buildBriefSummary())}`
    : null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          projectType,
          timeline,
          message: message.trim().length >= 10 ? message.trim() : `${projectType} inquiry (${timeline}). ${message.trim()}`,
          website_hp: websiteHp,
        }),
      });
      const json = await res.json();
      if (!res.ok) {
        setStatus("error");
        setErrorMsg(json.error || "Please check your details and try again.");
        return;
      }
      setStatus("success");
    } catch {
      setStatus("error");
      setErrorMsg("Network error. Please use the classic form or direct email.");
    }
  };

  return (
    <>
      {/* Deferred desktop ambient video layer */}
      {showAmbientVideo && (
        <video
          src="/media/closing.mp4"
          autoPlay
          loop
          muted
          playsInline
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-20 mix-blend-luminosity"
        />
      )}

      {/* Primary Action Strip (Visible before interaction) */}
      <div className="relative z-10 mt-8">
        {!isOpen ? (
          <div className="flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={() => setIsOpen(true)}
              className="inline-flex items-center justify-center gap-3 px-6 py-3.5 font-mono text-xs font-semibold uppercase tracking-wider rounded-xs transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-[#60a5fa]"
              style={{
                backgroundColor: "#f1efe8",
                color: "#121214",
                minHeight: 48,
              }}
            >
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: "#2563eb" }}
                aria-hidden="true"
              />
              <span>Start guided brief</span>
            </button>

            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-5 py-3.5 font-mono text-xs uppercase tracking-wider border border-[#3a3a42] rounded-xs transition-colors hover:border-[#60a5fa] focus-visible:outline-2 focus-visible:outline-[#60a5fa]"
              style={{
                color: "#f1efe8",
                backgroundColor: "#1a1a1f",
                minHeight: 48,
              }}
            >
              Classic form →
            </Link>

            {whatsappHref && (
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-4 py-3 font-mono text-xs uppercase tracking-wider underline underline-offset-4 hover:text-white focus-visible:outline-2 focus-visible:outline-[#60a5fa]"
                style={{ color: "#93c5fd", minHeight: 48 }}
              >
                WhatsApp ↗
              </a>
            )}

            {directEmail && !whatsappHref && (
              <a
                href={`mailto:${directEmail}`}
                className="inline-flex items-center justify-center px-2 py-3 font-mono text-xs underline underline-offset-4 hover:text-white focus-visible:outline-2 focus-visible:outline-[#60a5fa]"
                style={{ color: "#93c5fd", minHeight: 48 }}
              >
                {directEmail}
              </a>
            )}
          </div>
        ) : (
          /* Guided Brief Conversational Interface */
          <div
            className="mt-6 max-w-2xl border border-[#2c2c34] bg-[#16161a]/95 p-5 sm:p-7 rounded-xs backdrop-blur-xs"
            role="region"
            aria-label="Guided project brief"
          >
            <div className="flex items-center justify-between border-b border-[#26262b] pb-3">
              <div className="flex items-center gap-2.5">
                <span className="font-mono text-xs font-semibold text-[#60a5fa] uppercase tracking-wider">
                  Guided Brief · Step 0{step} / 03
                </span>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="font-mono text-xs text-[#a09fa6] hover:text-[#f1efe8] px-2 py-1 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#60a5fa]"
                style={{ minHeight: 40 }}
                aria-label="Close guided brief"
              >
                Close ×
              </button>
            </div>

            {status === "success" ? (
              <div className="py-6" role="status" aria-live="polite">
                <p className="font-mono text-xs text-[#60a5fa] uppercase tracking-wider">
                  Brief Received
                </p>
                <h3
                  className="mt-2 text-2xl text-[#f1efe8]"
                  style={{ fontFamily: "var(--font-display)", fontWeight: 500 }}
                >
                  Thank you, {name}.
                </h3>
                <p className="mt-2 text-sm text-[#d1d0db] leading-relaxed">
                  We review technical specifications directly and reply within two business days.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setStatus("idle");
                      setStep(1);
                      setMessage("");
                    }}
                    className="font-mono text-xs px-4 py-2.5 border border-[#3a3a42] bg-[#1f1f26] text-[#f1efe8] rounded-xs cursor-pointer"
                    style={{ minHeight: 44 }}
                  >
                    Start another brief
                  </button>
                  {whatsappHref && (
                    <a
                      href={whatsappHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-xs px-4 py-2.5 border border-[#3b82f6] bg-[#2563eb] text-white rounded-xs inline-flex items-center"
                      style={{ minHeight: 44 }}
                    >
                      Continue on WhatsApp ↗
                    </a>
                  )}
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-5 space-y-5">
                {/* Honeypot */}
                <div style={{ display: "none" }} aria-hidden="true">
                  <label htmlFor="brief_hp">Leave empty</label>
                  <input
                    id="brief_hp"
                    type="text"
                    value={websiteHp}
                    onChange={(e) => setWebsiteHp(e.target.value)}
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>

                {step === 1 && (
                  <div>
                    <p className="font-mono text-xs text-[#a09fa6] uppercase tracking-wider">
                      01 · What are we engineering?
                    </p>
                    <div className="mt-3 grid gap-2.5 sm:grid-cols-2">
                      {PROJECT_TYPES.map((type) => {
                        const selected = projectType === type;
                        return (
                          <button
                            key={type}
                            type="button"
                            onClick={() => setProjectType(type)}
                            aria-pressed={selected}
                            className="text-left font-mono text-xs px-4 py-3 rounded-xs border transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-[#60a5fa]"
                            style={{
                              minHeight: 44,
                              borderColor: selected ? "#3b82f6" : "#2e2e36",
                              backgroundColor: selected ? "rgba(37,99,235,0.2)" : "#1b1b21",
                              color: selected ? "#93c5fd" : "#d1d0db",
                            }}
                          >
                            {type}
                          </button>
                        );
                      })}
                    </div>
                    <div className="mt-5 flex items-center justify-between">
                      <Link
                        href="/contact"
                        className="font-mono text-xs text-[#a09fa6] hover:text-[#f1efe8] underline"
                      >
                        Use classic form instead →
                      </Link>
                      <button
                        type="button"
                        onClick={() => setStep(2)}
                        className="font-mono text-xs font-semibold px-5 py-2.5 bg-[#f1efe8] text-[#121214] rounded-xs cursor-pointer"
                        style={{ minHeight: 44 }}
                      >
                        Next: Timeline →
                      </button>
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div>
                    <p className="font-mono text-xs text-[#a09fa6] uppercase tracking-wider">
                      02 · Target timeline & scope
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {TIMELINES.map((t) => {
                        const selected = timeline === t;
                        return (
                          <button
                            key={t}
                            type="button"
                            onClick={() => setTimeline(t)}
                            aria-pressed={selected}
                            className="font-mono text-xs px-3.5 py-2.5 rounded-xs border transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-[#60a5fa]"
                            style={{
                              minHeight: 44,
                              borderColor: selected ? "#3b82f6" : "#2e2e36",
                              backgroundColor: selected ? "rgba(37,99,235,0.2)" : "#1b1b21",
                              color: selected ? "#93c5fd" : "#d1d0db",
                            }}
                          >
                            {t}
                          </button>
                        );
                      })}
                    </div>

                    <div className="mt-4">
                      <label
                        htmlFor="brief-message"
                        className="block font-mono text-xs text-[#a09fa6] uppercase mb-1.5"
                      >
                        Short summary (what should the system do?)
                      </label>
                      <textarea
                        id="brief-message"
                        rows={3}
                        required
                        minLength={10}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="e.g. Multi-vendor platform with automated vendor payouts and inventory sync..."
                        className="w-full bg-[#121215] border border-[#2e2e36] text-[#f1efe8] text-sm p-3 rounded-xs focus:border-[#60a5fa] focus:outline-none"
                      />
                    </div>

                    <div className="mt-5 flex items-center justify-between">
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="font-mono text-xs text-[#a09fa6] hover:text-[#f1efe8] px-2 py-2 cursor-pointer"
                        style={{ minHeight: 44 }}
                      >
                        ← Back
                      </button>
                      <button
                        type="button"
                        onClick={() => setStep(3)}
                        className="font-mono text-xs font-semibold px-5 py-2.5 bg-[#f1efe8] text-[#121214] rounded-xs cursor-pointer"
                        style={{ minHeight: 44 }}
                      >
                        Next: Contact →
                      </button>
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div>
                    <p className="font-mono text-xs text-[#a09fa6] uppercase tracking-wider">
                      03 · Where should we reply?
                    </p>
                    <div className="mt-3 grid gap-3 sm:grid-cols-2">
                      <div>
                        <label
                          htmlFor="brief-name"
                          className="block font-mono text-xs text-[#a09fa6] uppercase mb-1"
                        >
                          Your name
                        </label>
                        <input
                          id="brief-name"
                          type="text"
                          required
                          minLength={2}
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Full name"
                          className="w-full bg-[#121215] border border-[#2e2e36] text-[#f1efe8] text-sm px-3 py-2.5 rounded-xs focus:border-[#60a5fa] focus:outline-none"
                          style={{ minHeight: 44 }}
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="brief-email"
                          className="block font-mono text-xs text-[#a09fa6] uppercase mb-1"
                        >
                          Email address
                        </label>
                        <input
                          id="brief-email"
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="you@company.com"
                          className="w-full bg-[#121215] border border-[#2e2e36] text-[#f1efe8] text-sm px-3 py-2.5 rounded-xs focus:border-[#60a5fa] focus:outline-none"
                          style={{ minHeight: 44 }}
                        />
                      </div>
                    </div>

                    {status === "error" && (
                      <p className="mt-3 font-mono text-xs text-[#f87171]" role="alert">
                        {errorMsg}
                      </p>
                    )}

                    <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
                      <button
                        type="button"
                        onClick={() => setStep(2)}
                        className="font-mono text-xs text-[#a09fa6] hover:text-[#f1efe8] px-2 py-2 cursor-pointer"
                        style={{ minHeight: 44 }}
                      >
                        ← Back
                      </button>

                      <div className="flex flex-wrap items-center gap-2.5">
                        {whatsappHref && (
                          <a
                            href={whatsappHref}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-mono text-xs px-4 py-2.5 border border-[#3a3a42] text-[#93c5fd] hover:border-[#60a5fa] rounded-xs inline-flex items-center"
                            style={{ minHeight: 44 }}
                          >
                            Send via WhatsApp ↗
                          </a>
                        )}
                        {!whatsappHref && mailtoHref && (
                          <a
                            href={mailtoHref}
                            className="font-mono text-xs px-4 py-2.5 border border-[#3a3a42] text-[#93c5fd] hover:border-[#60a5fa] rounded-xs inline-flex items-center"
                            style={{ minHeight: 44 }}
                          >
                            Open in Email ↗
                          </a>
                        )}
                        <button
                          type="submit"
                          disabled={status === "loading"}
                          className="font-mono text-xs font-semibold px-5 py-2.5 bg-[#2563eb] text-white hover:bg-blue-600 rounded-xs cursor-pointer disabled:opacity-60"
                          style={{ minHeight: 44 }}
                        >
                          {status === "loading" ? "Sending..." : "Submit brief →"}
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </form>
            )}
          </div>
        )}
      </div>
    </>
  );
}
