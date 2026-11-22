"use client";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { nav } from "@/content/copy";
import { ease } from "@/components/motion/tokens";

export function SiteNav() {
  const [open, setOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const linksRef = useRef<(HTMLLIElement | null)[]>([]);

  // Solid background after 80px of scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMenu = () => {
    const overlay = overlayRef.current;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!overlay || prefersReduced) {
      setOpen(false);
      return;
    }

    import("gsap").then(({ default: gsap }) => {
      gsap.to(overlay, {
        clipPath: "inset(0% 0% 100% 0%)",
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => setOpen(false),
      });
    });
  };

  // M10 Mobile menu overlay animation (dynamic GSAP only when menu is toggled)
  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeMenu();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";

    const overlay = overlayRef.current;
    if (overlay) {
      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const validLinks = linksRef.current.filter(Boolean);

      if (prefersReduced) {
        overlay.style.clipPath = "inset(0% 0% 0% 0%)";
        validLinks.forEach((l) => {
          if (l) {
            l.style.transform = "none";
            l.style.opacity = "1";
          }
        });
      } else {
        import("gsap").then(({ default: gsap }) => {
          gsap.set(overlay, { clipPath: "inset(0% 0% 100% 0%)" });
          gsap.set(validLinks, { y: 24, opacity: 0 });

          const tl = gsap.timeline();
          tl.to(overlay, {
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 0.45,
            ease: ease.out,
          }).to(
            validLinks,
            {
              y: 0,
              opacity: 1,
              duration: 0.35,
              ease: ease.out,
              stagger: 0.05,
            },
            "-=0.2"
          );
        });
      }
    }

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-40 transition-colors duration-280 ${
        isScrolled ? "bg-[var(--bg)] border-b border-line shadow-sm" : "bg-transparent border-b border-line"
      }`}
      style={{
        backdropFilter: isScrolled ? "blur(8px)" : "none",
      }}
    >
      <div className="wrap flex items-center justify-between" style={{ minHeight: 64 }}>
        <Link
          href="/"
          className="group inline-flex items-center gap-2.5 no-underline"
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 600,
            fontSize: "1.35rem",
            color: "var(--text)",
          }}
        >
          <span className="flex h-7 w-7 items-center justify-center rounded bg-[var(--text)] font-serif text-sm font-bold text-[var(--bg)] shadow-xs transition-transform duration-200 group-hover:scale-105">
            H
          </span>
          <span>HafTech</span>
        </Link>

        <div className="hidden md:flex items-center gap-6">
          <nav aria-label="Primary">
            <ul
              className="flex items-center"
              style={{ gap: "var(--s-5)", listStyle: "none", margin: 0, padding: 0 }}
            >
              {nav.map((n) => (
                <li key={n.href}>
                  <Link
                    href={n.href}
                    className="nav-link font-mono text-xs tracking-wide uppercase"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      minHeight: 48,
                      color: "var(--text)",
                      textDecoration: "none",
                    }}
                  >
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <Link
            href="/contact"
            className="btn text-xs font-mono tracking-wider uppercase shadow-xs hover:shadow-sm"
            style={{ minHeight: 38, paddingInline: "var(--s-4)", fontSize: "11px" }}
          >
            Contact ↗
          </Link>
        </div>

        <button
          type="button"
          className="md:hidden label"
          style={{
            minHeight: 48,
            minWidth: 48,
            background: "none",
            border: 0,
            color: "var(--text)",
            cursor: "pointer",
          }}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen(true)}
        >
          Menu
        </button>
      </div>

      {open && (
        <div
          ref={overlayRef}
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 50,
            background: "var(--bg)",
            padding: "var(--gutter)",
            willChange: "clip-path",
          }}
        >
          <div className="flex justify-end">
            <button
              type="button"
              className="label"
              style={{
                minHeight: 48,
                minWidth: 48,
                background: "none",
                border: 0,
                color: "var(--text)",
                cursor: "pointer",
              }}
              onClick={closeMenu}
              autoFocus
            >
              Close
            </button>
          </div>
          <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
            {nav.map((n, i) => (
              <li
                key={n.href}
                ref={(node) => {
                  linksRef.current[i] = node;
                }}
                className="border-t border-line"
              >
                <Link
                  href={n.href}
                  onClick={closeMenu}
                  style={{
                    display: "block",
                    padding: "var(--s-4) 0",
                    minHeight: 48,
                    fontFamily: "var(--font-display)",
                    fontSize: "var(--step-4)",
                    color: "var(--text)",
                    textDecoration: "none",
                  }}
                >
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
