# 01 — Project Brief

**Status key used across this package:** `CONFIRMED` = stated in the brief · `PROPOSED` = our recommendation, needs approval · `OPEN` = missing information or undecided.

## 1.1 Objective
Produce the single source of truth for HafTech's next digital identity: brand strategy, visual system, website and founder experience, motion and visualization, technical architecture, project documentation and an implementation plan. No website code is written until this package is reviewed.

## 1.2 What HafTech is `CONFIRMED`
An independent software studio that designs, engineers and delivers digital products, custom software, web applications, backend systems, business automation and technology solutions. It is founder-led by **Faruq Ariyo**, a full-stack software engineer. The site must make that relationship unmistakable: **HafTech is the studio; Faruq is the founder and engineer behind it.**

## 1.3 Confirmed creative decisions `CONFIRMED`
| Area | Decision |
|---|---|
| Design personality | Editorial / architectural |
| Motion personality | High-end cinematic, restrained, never blocking |
| Structure | One website, two complementary identities (studio + founder), not two sites |
| Preferred stack | Next.js App Router, React, TypeScript, Tailwind, CSS tokens, GSAP + ScrollTrigger, selective Three.js/R3F, SVG/Canvas, MDX or structured content, Vercel |
| Provisional palette | Graphite, warm ivory, architectural blue, concrete grey, paper white (see doc 03) |
| Typefaces to explore | Boska, Switzer, Monaspace Neon |
| Domain direction | haftech.com, subject to availability |
| Quality targets | Lighthouse mobile ≥ 90, A11y ≥ 95, SEO ≥ 95; LCP ≤ 2.5 s, INP ≤ 200 ms, CLS ≤ 0.1 |

## 1.4 Explicit exclusions `CONFIRMED`
Generic black + electric-blue gradients, heavy glassmorphism, glowing spheres, purposeless floating 3D, generic AI illustration, repeated rounded cards, particle backgrounds, SaaS-template structure, cyberpunk/neon, desktop-first layouts squeezed onto mobile. No invented statistics, testimonials, outcomes or "award-winning / industry-leading" claims.

## 1.5 Inputs inspected (STEP 1)
| Input | Provided? | What we did |
|---|---|---|
| Master brief | Yes | Parsed; decisions extracted above |
| Existing logo | Yes — one low-resolution raster (~500 px wide) on a smoke photo background | Analysed visually; findings in doc 03 |
| Vector logo source (SVG/AI/Figma) | **No** | `OPEN` — logo construction is described, not traced |
| Founder photography | **No** | `OPEN` — all portrait slots are labelled placeholders |
| Project screenshots | **No** | `OPEN` — case studies are templates with verified-facts-only fields |
| Repositories or live URLs | **None supplied** | Nothing was inspected; no claims are made about existing sites or code |
| LinkedIn URL | **No** | `OPEN` |

## 1.6 Method (STEP 2–9)
Inspect → synthesize → research → architect → specify → document → generate PDFs → verify → finalize. Research sources and what was and was not actually accessed are listed in doc 03 §3.9 and doc 09 §9.9.

## 1.7 Assumptions (and why)
1. **Single locale (English) at launch.** The brief does not mention localisation; adding i18n later is cheaper than carrying it now. `PROPOSED`
2. **No CMS, database or admin.** The brief asks to avoid them without a demonstrated need; Git-based content is sufficient for a founder-run studio. `PROPOSED`
3. **A small set of case studies at launch (2–3), the rest as project stories.** Because project status and ownership are unverified, depth beats breadth. `PROPOSED`
4. **Primary audiences are prospective clients and collaborators**, with hiring managers as a secondary audience for the `/founder` page. `PROPOSED`

## 1.8 Deliverables
See `README.md` for the full file map. Acceptance for this package: every file in the required tree exists; Markdown and PDFs are consistent; every unverified fact is recorded in doc 16.
