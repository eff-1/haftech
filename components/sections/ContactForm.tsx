"use client";
import React, { useState } from "react";

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    projectType: "Custom software / Web application",
    message: "",
    budget: "",
    timeline: "",
    website_hp: "", // Honeypot field
  });

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const json = await res.json();

      if (!res.ok) {
        setStatus("error");
        setErrorMessage(json.error || "Unable to send your enquiry. Please try again.");
        return;
      }

      setStatus("success");
      setFormData({
        name: "",
        email: "",
        projectType: "Custom software / Web application",
        message: "",
        budget: "",
        timeline: "",
        website_hp: "",
      });
    } catch (err) {
      setStatus("error");
      setErrorMessage("Network error. Please try sending directly via email.");
    }
  };

  return (
    <div className="border border-line bg-surface p-6 sm:p-8">
      {status === "success" ? (
        <div className="p-6 bg-[var(--bg)] border border-line" role="alert">
          <p className="label text-xs text-[var(--accent)]">Enquiry Received</p>
          <h2 className="mt-2 text-xl font-medium" style={{ fontFamily: "var(--font-display)" }}>
            Thank you for reaching out.
          </h2>
          <p className="mt-2 text-sm text-[var(--text-2)] leading-relaxed">
            Your message has been delivered to the studio inbox. We review technical specifications
            and respond with initial scoping feedback within two business days.
          </p>
          <button
            type="button"
            onClick={() => setStatus("idle")}
            className="mt-6 btn text-xs"
            style={{ minHeight: 40 }}
          >
            Send another message
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate className="space-y-6">
          {/* Honeypot field: hidden visually and from screen readers */}
          <div style={{ display: "none" }} aria-hidden="true">
            <label htmlFor="website_hp">Website URL (leave empty)</label>
            <input
              type="text"
              id="website_hp"
              name="website_hp"
              value={formData.website_hp}
              onChange={handleChange}
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label
                htmlFor="name"
                className="label text-xs block mb-1"
                style={{ color: "var(--text)" }}
              >
                Your Name <span className="text-[var(--accent)]">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Alex Morgan"
                className="w-full bg-[var(--bg)] border border-[var(--ht-border-strong)] px-3 py-2.5 text-sm text-[var(--text)] focus:outline-none focus:border-[var(--accent)]"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="label text-xs block mb-1"
                style={{ color: "var(--text)" }}
              >
                Email Address <span className="text-[var(--accent)]">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="alex@company.com"
                className="w-full bg-[var(--bg)] border border-[var(--ht-border-strong)] px-3 py-2.5 text-sm text-[var(--text)] focus:outline-none focus:border-[var(--accent)]"
              />
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-3">
            <div>
              <label
                htmlFor="projectType"
                className="label text-xs block mb-1"
                style={{ color: "var(--text)" }}
              >
                Project Focus
              </label>
              <select
                id="projectType"
                name="projectType"
                value={formData.projectType}
                onChange={handleChange}
                className="w-full bg-[var(--bg)] border border-[var(--ht-border-strong)] px-3 py-2.5 text-sm text-[var(--text)] focus:outline-none focus:border-[var(--accent)]"
              >
                <option value="Custom software / Web application">Custom software / Web app</option>
                <option value="Backend & API engineering">Backend & API engineering</option>
                <option value="Business workflow automation">Business automation</option>
                <option value="System architecture review">Architecture consultation</option>
                <option value="Other engagement">Other / Exploratory</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="budget"
                className="label text-xs block mb-1"
                style={{ color: "var(--text)" }}
              >
                Target Budget (Optional)
              </label>
              <input
                type="text"
                id="budget"
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                placeholder="e.g. $5k - $15k"
                className="w-full bg-[var(--bg)] border border-[var(--ht-border-strong)] px-3 py-2.5 text-sm text-[var(--text)] focus:outline-none focus:border-[var(--accent)]"
              />
            </div>

            <div>
              <label
                htmlFor="timeline"
                className="label text-xs block mb-1"
                style={{ color: "var(--text)" }}
              >
                Target Timeline (Optional)
              </label>
              <input
                type="text"
                id="timeline"
                name="timeline"
                value={formData.timeline}
                onChange={handleChange}
                placeholder="e.g. Q1 launch / 6 weeks"
                className="w-full bg-[var(--bg)] border border-[var(--ht-border-strong)] px-3 py-2.5 text-sm text-[var(--text)] focus:outline-none focus:border-[var(--accent)]"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="message"
              className="label text-xs block mb-1"
              style={{ color: "var(--text)" }}
            >
              Project Specifications & Context <span className="text-[var(--accent)]">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={5}
              value={formData.message}
              onChange={handleChange}
              placeholder="What are you building? Outline your current constraints, existing stack, and primary objectives."
              className="w-full bg-[var(--bg)] border border-[var(--ht-border-strong)] p-3 text-sm text-[var(--text)] focus:outline-none focus:border-[var(--accent)] leading-relaxed"
            />
          </div>

          {status === "error" && (
            <div className="p-3 border border-red-300 bg-red-50 text-red-800 text-xs" role="alert">
              {errorMessage}
            </div>
          )}

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
            <button
              type="submit"
              disabled={status === "loading"}
              className="btn justify-center"
              style={{ minHeight: 48 }}
            >
              {status === "loading" ? "Submitting..." : "Send project enquiry"}
            </button>

            <span className="label text-[11px] text-[var(--text-2)]">
              No spam. Direct reply from engineering.
            </span>
          </div>
        </form>
      )}
    </div>
  );
}

