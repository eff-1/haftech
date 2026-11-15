# 03 — Visual Design System

**Objective.** Define the logo strategy, colour, typography, grid, layout and component language so any designer or engineer can build consistently.
**Status:** analysis is `CONFIRMED` (observed from the supplied file). Logo directions and tokens are `PROPOSED`. **No logo has been approved.**

---

## 3.1 Analysis of the existing logo
**Source:** one raster image, about 500 px wide, with a photographic smoke background. The background is treated as presentation, not part of the mark. **A vector source has not been supplied** (`OPEN`), so everything below describes what is visible; nothing is traced or measured to pixel precision.

| # | Criterion | Observation | Verdict |
|---|---|---|---|
| 1 | Wordmark construction | Mixed-case "HafTech", heavy geometric sans, double-storey *a*. Splitting "Haf" + "Tech" with a customised **T** is a sound idea. | Keep the idea |
| 2 | Typography | Very heavy strokes. The custom **T** stem is a hairline by comparison, so it reads as a different typeface rather than an engineered variant of the same one. | Weakness |
| 3 | Letter spacing | The crossbars of **f** and **T** nearly touch and read as one line. Spacing in "Haf" looks looser than in "Tech". | Fix |
| 4 | Circuit-inspired T | Trace lines and circular nodes inside the stem. Legible only at large sizes; at nav or favicon size they become noise. | Simplify |
| 5 | Colour treatment | Light cyan-to-teal vertical gradient with a soft glow. The light cyan on white is roughly 1.9:1 (estimated from a sampled approximate value; to be measured on the real file). WCAG asks for ≥ 3:1 for large graphics. | Fails likely |
| 6 | Scalability | Gradient, glow and fine traces degrade quickly when small. | Weakness |
| 7 | Legibility | Letterforms are clear and friendly at large sizes. | Strength |
| 8 | Monochrome | Depends on the gradient for depth; a one-colour version needs rebuilding. | Weakness |
| 9 | Fit with editorial/architectural brand | The glossy cyan gradient reads as generic tech-startup, exactly what the brief excludes. The structure fits; the finish does not. | Low fit |

**Conclusion.** Do not discard the identity. Keep the *wordmark + engineered T* structure. Replace the finish (gradient, glow), rebalance stroke weights, fix the f–T collision, and design a standalone symbol.

---

## 3.2 Three logo directions `PROPOSED`

### Direction A — Architectural wordmark
- **Rationale:** Let typography carry the identity. Engineering appears as one restrained detail.
- **Visual characteristics:** Custom-spaced wordmark in a grotesque or editorial serif (candidates: Switzer Semibold, or a tightened Boska for a more editorial tone). Graphite on ivory. A single drafting-style detail on the T: one node plus a thin construction tick.
- **Construction:** Cap-height grid; optical kerning on f–T; T crossbar extended 6–8 % to create a deliberate overhang; node diameter equals stem width.
- **Strengths:** Most mature, most monochrome-friendly, strongest editorial fit.
- **Weaknesses:** Least distinctive as a symbol; relies on the wordmark at all sizes.
- **Colour:** Graphite #20221F on ivory/paper; ivory on graphite; blue #344C68 only as a secondary lock-up.
- **Light/dark:** Direct inversion works (contrast 13.9:1).
- **Small size:** Wordmark legible down to about 80 px wide; below that use the T-node symbol.
- **Favicon / avatar:** Single **T** with node on graphite square.

### Direction B — Refined engineering identity (continuity)
- **Rationale:** Evolve the current circuit T instead of replacing it.
- **Visual characteristics:** Stem weight matched to the letters; circuit reduced to 2–3 nodes and one right-angle trace; flat architectural blue; no gloss.
- **Construction:** Stem width = 0.8 × stroke of the other letters; traces at 90° only; node radius = half stem width; f–T spacing fixed to a consistent counter.
- **Strengths:** Preserves recognition; clear engineering signal; easy migration story.
- **Weaknesses:** Circuit motif can drift toward cliché if over-detailed.
- **Colour:** Blue #344C68 on ivory (7.7:1); mono graphite version; ivory on graphite.
- **Small size:** Drop traces below 48 px; keep stem + one node.
- **Favicon / avatar:** Simplified T with a single trace.

### Direction C — Independent studio identity
- **Rationale:** A distinctive mark that works without the wordmark.
- **Visual characteristics:** **HT** monogram built from shared geometry: the H right stem and the T stem share one vertical; the crossbar of T becomes a horizontal datum line extended into a rule used throughout layouts.
- **Construction:** Square 1:1 grid, 5×5 modules; stroke = 1 module; monogram plus wordmark lock-ups (horizontal, stacked).
- **Strengths:** Strongest standalone symbol; supports signage, stamps and avatars; the datum-line rule doubles as a layout device.
- **Weaknesses:** Needs the most design exploration; HT monograms are common, so distinctiveness must come from construction.
- **Colour:** Graphite or blue, single colour.
- **Small size:** Best of the three.
- **Favicon / avatar:** The monogram itself.

### Recommendation `PROPOSED — awaiting approval`
**B for continuity, disciplined by A's monochrome-first rules, with C's monogram developed as the standalone symbol.** This gives a recognisable evolution, a mature finish and a working avatar. Final choice, redraw and wordmark are `OPEN`.

### Logo production prerequisites
1. Vector source or permission to redraw. 2. Clear-space and minimum-size rules after redraw. 3. One-colour, reversed and favicon masters. 4. Contrast check on every lock-up.

---

## 3.3 Colour system `PROPOSED` (provisional palette is from the brief)

Ratios are computed with the WCAG 2.x relative-luminance formula.

| Token | Hex | Role |
|---|---|---|
| `--ht-graphite` | #20221F | Primary text, dark surfaces |
| `--ht-ivory` | #F1EFE8 | Primary background |
| `--ht-paper` | #FAF9F5 | Raised surfaces, PDF pages |
| `--ht-blue` | #344C68 | Accent: links, key diagram strokes, CTAs |
| `--ht-blue-hl` | #7894B1 | Highlight on light surfaces (decorative) |
| `--ht-concrete` | #A5A49B | Dividers, secondary graphics |
| `--ht-border` | #D9D7CF | Hairlines |
| `--ht-muted` (brief) | #74756F | **See finding below** |
| `--ht-muted-text` (proposed) | #686963 | Secondary text, passes AA |

### Contrast results
| Foreground on background | Ratio | Use |
|---|---|---|
| Graphite on ivory | 13.93 | Body text — AAA |
| Graphite on paper | 15.22 | Body text — AAA |
| Blue on ivory | 7.67 | Links, accent text — AAA |
| Blue on paper | 8.38 | Links, accent text — AAA |
| Ivory on blue | 7.67 | Reversed CTA — AAA |
| Muted #74756F on ivory | **4.04** | **Fails AA for normal text** |
| Muted #74756F on paper | **4.41** | **Fails AA for normal text (needs 4.5)** |
| Muted #686963 on ivory | 4.82 | Passes AA — proposed replacement |
| Muted #686963 on paper | 5.26 | Passes AA |
| Concrete on ivory | 2.18 | **Decorative only** — never text |
| Highlight #7894B1 on ivory | 2.74 | **Decorative only** |
| Border on ivory | 1.25 | Hairlines only; not enough for UI boundaries |
| Concrete on graphite | 6.40 | OK for secondary text on dark |
| Highlight on graphite | 5.09 | OK for text on dark |
| Muted #74756F on graphite | 3.45 | Fails for body; labels ≥ 24 px only |

**Findings:** (1) the brief's muted grey needs darkening to about #686963 for text; (2) concrete and highlight are decorative-only on light backgrounds; (3) form-field and control boundaries need a stronger stroke than the hairline border: propose `--ht-border-strong: #8E8D85` (2.90:1 on ivory; combine with a graphite focus ring for ≥ 3:1); (4) on dark surfaces use a lighter highlight `#9DB5CF` (7.59:1 on graphite).

**Usage rule.** Roughly 85 % warm neutrals and graphite, 12 % blue, 3 % highlight. Blue never fills large sections.

---

## 3.4 Typography system `PROPOSED`

| Role | Family | Why | Licence note |
|---|---|---|---|
| Display / editorial headlines | **Boska** (Indian Type Foundry, designed by Barbara Bigosinska; high-contrast didone-style, free on Fontshare) | Expressive editorial voice | Fontshare free licence permits commercial use |
| Interface and body | **Switzer** (Swiss-style neo-grotesque by Jérémie Hornus, Fontshare) | Neutral, legible, architectural | Free for commercial use, **but self-hosting as a web font reportedly requires ITF's written consent; use the Fontshare API/CDN or obtain consent** (`OPEN` — verify at fontshare.com) |
| Technical labels, metadata | **Monaspace Neon** (GitHub Next + Lettermatic) | Distinct technical voice | SIL OFL 1.1; can be self-hosted |

**Fallbacks.** Display: Boska → "Iowan Old Style", Georgia, serif. Body: Switzer → Inter, system-ui, sans-serif. Mono: Monaspace Neon → ui-monospace, "SF Mono", Menlo, monospace.
**This PDF set uses stand-ins** (Lora, Inter, DejaVu Sans Mono) because the Fontshare/GitHub fonts could not be fetched in the authoring environment. This is a rendering limitation, not a design decision.

### Weights
Boska 500 (headings), 700 (display), italic only at display sizes (≥ 48 px). Switzer 400, 500, 600. Monaspace Neon 400, 500.

### Type scale (fluid, CSS-ready)
```css
:root {
  --step--2: clamp(0.72rem, 0.70rem + 0.10vw, 0.78rem);   /* metadata */
  --step--1: clamp(0.83rem, 0.80rem + 0.15vw, 0.90rem);   /* captions */
  --step-0:  clamp(1.00rem, 0.96rem + 0.20vw, 1.125rem);  /* body */
  --step-1:  clamp(1.20rem, 1.12rem + 0.40vw, 1.40rem);   /* lead */
  --step-2:  clamp(1.44rem, 1.30rem + 0.70vw, 1.80rem);   /* h4 */
  --step-3:  clamp(1.73rem, 1.50rem + 1.15vw, 2.40rem);   /* h3 */
  --step-4:  clamp(2.07rem, 1.70rem + 1.85vw, 3.20rem);   /* h2 */
  --step-5:  clamp(2.49rem, 1.90rem + 2.95vw, 4.40rem);   /* h1 */
  --step-6:  clamp(2.99rem, 2.00rem + 4.95vw, 6.60rem);   /* display (hero only) */
}
```
### Line height, tracking, measure
| Style | Line-height | Letter-spacing | Max width |
|---|---|---|---|
| Display / h1 (Boska) | 0.98–1.05 | −0.02em | 14 ch per line target |
| h2–h3 | 1.1–1.2 | −0.01em | 22 ch |
| Body (Switzer) | 1.55 | 0 | 62–70 ch |
| Lead | 1.4 | 0 | 54 ch |
| Metadata (Monaspace) | 1.4 | +0.04em, uppercase | one line |

### Heading hierarchy
`h1` once per page (Boska); `h2` section titles (Boska); `h3` sub-sections (Switzer 600); `h4` captions-level (Switzer 500). Display sizes are for the hero only; size alone is not a hierarchy device.

### Technical metadata style
Monaspace Neon, `--step--2`, uppercase, +0.04em. Used for project index numbers, dates, status tags, layer labels. Always ≥ 12 px effective on mobile.

---

## 3.5 Design tokens (CSS)
```css
:root {
  /* colour */
  --ht-graphite:#20221F; --ht-ivory:#F1EFE8; --ht-paper:#FAF9F5;
  --ht-blue:#344C68; --ht-blue-hl:#7894B1; --ht-blue-hl-dark:#9DB5CF;
  --ht-concrete:#A5A49B; --ht-border:#D9D7CF; --ht-border-strong:#8E8D85;
  --ht-muted-text:#686963;
  /* semantic */
  --bg:var(--ht-ivory); --surface:var(--ht-paper); --text:var(--ht-graphite);
  --text-2:var(--ht-muted-text); --accent:var(--ht-blue); --line:var(--ht-border);
  --focus:2px solid var(--ht-blue); --focus-offset:3px;
  /* space: 4px base */
  --s-1:4px; --s-2:8px; --s-3:12px; --s-4:16px; --s-5:24px; --s-6:32px;
  --s-7:48px; --s-8:64px; --s-9:96px; --s-10:144px;
  /* layout */
  --gutter:clamp(16px,4vw,40px); --max:1440px; --radius:0; --radius-s:2px;
  /* fonts */
  --font-display:"Boska","Iowan Old Style",Georgia,serif;
  --font-body:"Switzer",Inter,system-ui,sans-serif;
  --font-mono:"Monaspace Neon",ui-monospace,"SF Mono",Menlo,monospace;
}
@media (prefers-color-scheme: dark){ :root[data-theme="auto"]{
  --bg:var(--ht-graphite); --surface:#2A2D29; --text:var(--ht-ivory);
  --text-2:#B9B8AE; --accent:var(--ht-blue-hl-dark); --line:#3A3D38;
}}
```
`--radius:0` is deliberate: architectural, not rounded-card.

## 3.6 Grid and layout
- **Columns:** 4 (mobile), 8 (tablet), 12 (desktop ≥ 1024 px). Gutter `--gutter`. Max content width 1440 px.
- **Baseline:** 4 px unit; vertical rhythm in multiples of 8 px.
- **Composition:** asymmetric; images may bleed to one edge; text blocks hold a 62–70 ch measure; a persistent hairline rule and a metadata strip (index, section name) sit at the top of each section.
- **Architectural devices:** hairline rules, section index numerals (01–08), crosshair registration marks at image corners (decorative, `aria-hidden`), and the datum line from Direction C.

## 3.7 Components (visual language)
| Component | Spec |
|---|---|
| Button (primary) | Blue fill, ivory text (7.7:1), 48 px min height, square corners, underline slides on hover, visible focus ring |
| Button (secondary) | Graphite 1 px border-strong, transparent |
| Link | Blue, underline offset 3 px, never colour-only |
| Metadata tag | Monaspace, uppercase, 1 px hairline box; status uses text plus a shape marker, not colour alone |
| Project feature | Large image, editorial meta table, index number; no card shadows |
| Form field | Underline-style input with `--ht-border-strong`, label above, error text with icon |
| Nav | Wordmark left, index of sections right; full-screen overlay on mobile with 48 px targets |

## 3.8 Imagery and photography
Art-directed, natural light, real work environments, real screenshots; monochrome-leaning grading to harmonise with the palette; duotone (graphite/ivory) allowed for placeholder frames. No stock-handshake photography, no AI-generated people. Founder portrait: `OPEN` (to be commissioned or supplied).

## 3.9 Visual references (STEP 3)
**Honesty statement.** The authoring environment can retrieve page text and search results but cannot visually render and inspect websites. "Inspected" below means *text content or award-listing data was retrieved*; layout and motion observations are **not** claimed. Each entry should be viewed in a browser by the design team.

| Reference | URL | Evidence retrieved | Principle to study | HafTech interpretation |
|---|---|---|---|---|
| Locomotive (agency) | https://locomotive.ca | Page text and awards list retrieved; also publishes the open-source Locomotive Scroll (https://scroll.locomotive.ca); an Awwwards case study states GSAP is central to its animation | Combining design thinking with technical craft; scroll choreography as a system | Same rigour on motion, quieter, architectural and editorial composition |
| Lando Norris (by OFF+BRAND) | https://landonorris.com | Awwwards listing confirms Site of the Year 2025 and a Developer Award | How a strongly personal identity can drive the whole interface | Founder identity integrated without overpowering the studio |
| Awwwards directory | https://www.awwwards.com | Listings retrieved (winners, honors, filters by typography) | Survey tool for typography and developer-award sites | Use as a research index, not a template source |
| Fontshare | https://www.fontshare.com | Licence summaries retrieved via third-party pages; verify at source | Free high-quality type; Boska/Switzer | Direct specification input |
| Monaspace | https://github.com/githubnext/monaspace | Repo README and OFL licence retrieved | Texture-healing monospace for technical annotation | Metadata and diagram labels |
| GSAP | https://gsap.com | README and package notes retrieved; all plugins are free for commercial use after the Webflow acquisition (verify at https://gsap.com/standard-license) | Motion engine for ScrollTrigger, SplitText, Flip, DrawSVG | Motion architecture in doc 09 |

**Not claimed:** we did not open or evaluate pentagram.com, activetheory.net or other studios; they may be added after a manual review.

## 3.10 Deliverables and acceptance
Deliverables: approved logo direction and redrawn vector masters; token file; type specimen; component sheet. Accepted when all text/background pairs in use pass WCAG AA, tokens are implemented in one CSS file, and the wordmark is legible at 80 px wide.
