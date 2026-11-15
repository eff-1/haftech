# 05 — Homepage Blueprint

**Objective.** Specify each homepage section so it can be designed and built without further conversation.
**Status:** layout and behaviour `PROPOSED`; headlines marked "(brief)" are `CONFIRMED` proposals from the brief but all copy still requires approval. Breakpoints: mobile < 640 px, tablet 640–1023 px, desktop ≥ 1024 px.

**Global rules:** content is readable and usable with JavaScript animations disabled; no section waits for an animation to be understood; max one primary CTA per viewport; every animation has a reduced-motion alternative (doc 09).

---

## Section 01 — Opening experience
- **Purpose:** state what HafTech is within three seconds and offer two clear paths.
- **Layout:** desktop — 12-column grid; headline spans columns 1–9, left aligned; a metadata strip (`STUDIO · FOUNDER-LED · SOFTWARE ENGINEERING`) in Monaspace above; at right, a vertical architectural line drawing (SVG) occupying columns 10–12. Tablet — headline across 8 columns, drawing below at 40 % width. Mobile — headline first, support copy, CTAs, then a compact drawing; headline never below the fold.
- **Copy:** H1 "Ideas deserve more than execution. They deserve engineering." Support: "We design and engineer digital products, intelligent systems and software experiences that help ambitious businesses move forward." CTAs: **Start a project** (primary, → `/contact`), **See the work** (secondary, → `/work`). Byline: "Founded by Faruq Ariyo" → `/founder`.
- **Typography:** H1 Boska 700, `--step-6`, line-height 1.0, tracking −0.02em; support in Switzer 400 `--step-1`.
- **Navigation:** wordmark left; text links right; transparent over ivory, becomes solid on scroll after 80 px.
- **Visual assets:** inline SVG line drawing of a layered structure (a section-view of a building that doubles as a software stack). Placeholder until designed.
- **Animation:** headline reveals line by line (mask + 24 px rise, 800–1000 ms, stagger 90 ms); drawing strokes draw over 1400 ms starting at 300 ms; **text is in the DOM and visible within 100 ms**; animation starts after fonts are ready or after a 600 ms timeout.
- **Interaction:** none required; pointer moves nudge drawing ≤ 6 px (desktop only).
- **Behaviour:** desktop as above; tablet drawing static after load; mobile no pointer effects.
- **Implementation:** server-rendered text; client `TextReveal` and `LineDrawing` components using GSAP; LCP element is the H1 text, not an image.
- **Acceptance:** LCP ≤ 2.5 s on mid-range mobile; H1 visible without JS; no layout shift when fonts load (`size-adjust` fallback).

## Section 02 — Studio philosophy
- **Purpose:** explain the difference between building interfaces and engineering systems.
- **Layout:** two-column: left sticky headline, right three short paragraphs labelled **Product engineering**, **Systems and infrastructure**, **Digital experiences**. Mobile: headline then three stacked blocks with hairline rules.
- **Copy:** "We don't just build interfaces. We engineer the systems behind them." Paragraphs (≤ 45 words each) require approval.
- **Typography:** headline Boska 500 `--step-5`; labels Monaspace; body Switzer.
- **Visual assets:** none required; optional thin technical annotation lines.
- **Animation:** words of the headline gain full opacity as they enter (scroll-linked, 0.3 → 1, no movement); paragraphs fade-translate 16 px in sequence.
- **Interaction:** hovering/focusing a label highlights the matching layer in the next section's diagram (progressive enhancement; not required).
- **Behaviour:** sticky headline on desktop only; no sticky on tablet/mobile.
- **Implementation:** CSS `position: sticky`; ScrollTrigger for opacity scrub; guarded by `prefers-reduced-motion`.
- **Acceptance:** readable with animations off; no horizontal overflow.

## Section 03 — Selected work
- **Purpose:** prove capability through honest, attributed projects.
- **Layout:** asymmetric editorial sequence: feature 1 full width (16:9), features 2–3 offset two-up (7/5 columns) with vertical stagger, feature 4 full-bleed crop. Mobile: single column, 4:3 images.
- **Per-project fields (all mandatory):** title · one-sentence description · category · ownership · HafTech/founder role · technologies · status · image · case-study link.
- **Content:** candidates **REALTYINTEL**, **AXIORA**, **DEEN DRIP**, **CAHOOTZ** (doc 07). Status, ownership and imagery are `OPEN`; a project without verified facts is omitted or shown as "Concept".
- **Typography:** project title Boska `--step-4`; metadata table Monaspace `--step--2` with hairline separators.
- **Visual assets:** real screenshots only; until available use labelled wireframe frames (no fake UI).
- **Animation:** image mask reveal (clip-path inset 100 % → 0, 800 ms `expo.out`), title lines rise; on hover/focus image scale 1.03 over 500 ms; **touch devices skip hover and use tap to open**.
- **Interaction:** whole feature is one link; focus ring on the title; keyboard order title → metadata.
- **Implementation:** `ProjectFeature` server component + `ImageMask` client wrapper; `next/image` with explicit sizes.
- **Acceptance:** no more than 4 projects on the homepage; every field present; CLS 0.

## Section 04 — Engineering visualization (signature)
- **Purpose:** let visitors see how a software product is structured.
- **Layout:** desktop — full-width stage; left 2/3 SVG isometric-free *section view* of eight horizontal layers; right 1/3 detail panel. Mobile — vertical layer list; tapping a layer expands detail and highlights it in a compact diagram above.
- **Layers (top to bottom):** User interface · Application layer · Authentication · API · Business logic · Database · Infrastructure · External integrations.
- **Copy:** caption "An illustrative architecture. It is not a depiction of every HafTech deployment." (mandatory).
- **Interaction states:** idle (all layers at 100 % stroke) → hover/focus/tap (layer fills blue 8 %, others dim to 40 %, panel updates) → "Trace a request" button runs the request-lifecycle animation.
- **Connection animation:** dashed stroke offset travelling along connectors, 1200–1800 ms per full lifecycle, pausable, replayable.
- **Data flow:** request path UI → application → authentication → API → business logic → database and back; integrations shown as side branches.
- **Labels:** Monaspace 12–13 px, never below 12 px on mobile.
- **Accessibility fallback:** the same content as an ordered list with headings; diagram has `role="img"` with long description; all layers reachable by Tab and operable with Enter/Space; animation off under reduced motion (states change instantly).
- **Implementation:** React client component loaded with `next/dynamic` when within 1 viewport of the section; SVG + GSAP (Canvas not needed); see doc 10.
- **Acceptance:** works with keyboard and touch; initial JS payload impact < 40 KB gzip (target, to measure).

## Section 05 — Capabilities
- **Purpose:** show what HafTech does in a scannable editorial list.
- **Layout:** seven rows with index numerals: Custom software · Web applications · Backend engineering · API development · Business automation · Product architecture · Infrastructure and deployment. Desktop: title left, one-line description right; mobile: stacked.
- **Expansion:** activating a row expands a panel (200–350 ms height transition) with three bullet capabilities and a link to `/services#slug`. Only one open at a time; `aria-expanded`, `aria-controls`; the first row can be open by default on desktop.
- **Animation:** numeral and title shift 8 px on hover (desktop), underline draws left to right; no animation under reduced motion.
- **Acceptance:** keyboard accessible; each row ≥ 56 px high on mobile.

## Section 06 — Working methodology
- **Purpose:** explain the process: **01 Discover · 02 Architect · 03 Engineer · 04 Deliver**.
- **Layout:** desktop — left column pinned progress rail with four markers; right column four stage blocks (inputs, activities, outputs). Mobile — plain vertical sequence with a thin progress line; **no pinning**.
- **Animation:** scroll-linked progress line fills across the section; the active stage's numeral switches to blue; transitions 350–700 ms. No scroll hijacking: scroll speed is never altered.
- **Implementation:** ScrollTrigger with `scrub: true` on the progress line only; IntersectionObserver sets active stage.
- **Acceptance:** all stages readable and linkable (`/approach#architect`); reduced-motion shows static stages with all markers active.

## Section 07 — Founder introduction
- **Purpose:** add a human connection without making the studio look dependent on one person.
- **Layout:** portrait (4:5) at left 4 columns, text 6 columns right; mobile portrait first at 4:3 crop. Pull line "Founded and engineered by Faruq Ariyo".
- **Content:** short professional introduction, engineering background, technical interests, personal philosophy (all `OPEN` — founder to supply; see doc 06), link to `/founder`.
- **Portrait:** `OPEN` — art-directed photo needed; placeholder is a labelled grey frame.
- **Animation:** portrait mask reveal (900 ms), text rise, 80 ms stagger.
- **Acceptance:** wording uses "we" for the studio and names the founder once; no claims without evidence.

## Section 08 — Closing statement and footer
- **Purpose:** convert and orient.
- **Layout:** full-width graphite panel; headline "Have something worth building?" in ivory Boska `--step-6`; primary CTA "Start a project" (ivory fill, graphite text); email link beneath. Editorial footer: sitemap columns, contact, social, privacy, copyright, a final line of the logo mark.
- **Animation:** headline word reveal; CTA arrow translates 6 px on hover.
- **Contrast:** ivory on graphite 13.9:1; links in `--ht-blue-hl-dark`.
- **Acceptance:** footer reachable by keyboard; no content cut off at 320 px width.

## Responsive summary
| Aspect | Mobile | Tablet | Desktop |
|---|---|---|---|
| Hero | Text first, compact drawing | Text + drawing below | Text + side drawing |
| Work | Single column | Two-up | Asymmetric |
| Visualization | Layer list + mini-diagram | Diagram + panel below | Diagram + side panel |
| Methodology | No pinning | No pinning | Pinned rail |
| Hover effects | None (tap only) | Tap | Hover + focus |

## Implementation order
Hero → Selected work → Capabilities → Methodology → Founder → Closing/footer → Visualization (last, because it is the heaviest and loaded lazily).
