# 11 — Mobile-First Responsive Design

**Objective.** Define how every component behaves from 320 px upward. Mobile is designed first and enhanced, not compressed down.
**Status:** `PROPOSED`.

## 11.1 Rules
1. No hover-only interaction: every hover effect has a tap/focus equivalent.
2. No horizontal page overflow at any width from 320 px.
3. Minimum text sizes: body 16 px; metadata 12 px (never smaller); captions 13 px.
4. Touch targets ≥ 48×48 px with ≥ 8 px spacing (exceeds WCAG 2.2 AA minimum of 24 px).
5. Desktop and mobile may use different compositions when it serves the content.
6. No desktop simulation that fails on a phone: each visualization has a defined mobile form.

## 11.2 Breakpoints
| Name | Min width | Columns | Gutter | Notes |
|---|---|---|---|---|
| `base` (mobile) | 0 | 4 | 16 px | Design starts here; test at 320, 360, 390 |
| `sm` | 480 px | 4 | 20 px | Large phones |
| `md` (tablet) | 768 px | 8 | 24–32 px | Two-up layouts begin |
| `lg` (desktop) | 1024 px | 12 | 32–40 px | Pinning and side panels allowed |
| `xl` | 1440 px | 12 | 40 px | Max content width cap |
Container queries are preferred for components (feature cards, metadata tables) so they adapt to space, not viewport.

## 11.3 Typography on mobile
Use the fluid scale in doc 03. At 320–390 px the hero uses `--step-5`-class sizes (about 40–44 px) with a 14 ch target per line; no word may overflow (`overflow-wrap: anywhere` as safety). Body line length 36–45 characters on mobile, 62–70 on desktop.

## 11.4 Spacing and grid
Section vertical spacing: 64 px mobile, 96 px tablet, 144 px desktop. Gutters per breakpoint above. Hairline separators replace large card padding.

## 11.5 Navigation
- Mobile: top bar 56 px (wordmark left, "Menu" text button right, not icon only); full-screen overlay with links ≥ 56 px high; Escape and close button; focus trapped; Contact link duplicated at bottom.
- Desktop: inline links; current page indicated by underline plus `aria-current`.
- Sticky header hides on scroll down and returns on scroll up (optional; test for clarity).

## 11.6 Component behaviour matrix
| Component | Mobile | Tablet | Desktop |
|---|---|---|---|
| Hero | Headline, support copy, CTAs stacked; compact drawing | Drawing beneath | Drawing at right |
| Selected work | 1 column, 4:3 crops, metadata under image | 2 columns offset | Asymmetric 12-col |
| Metadata table | Two-column definition list | Same | Inline row |
| Capability list | Tap to expand | Tap | Hover affordance + click |
| Methodology | Vertical sequence, no pinning | Same | Pinned rail |
| Architecture explorer | Layer list + mini-diagram | Diagram + panel below | Diagram + side panel |
| Case-study metadata | Block above content | Same | Sticky side column |
| Forms | Single column, native input types, 16 px inputs to prevent zoom | Same | Two-column optional |
| Footer | Stacked | Two columns | Four columns |

## 11.7 Images and crops
`next/image` with `sizes` per layout; art-directed crops (`<picture>`) for hero and portrait; screenshots displayed in device-neutral frames only when real. AVIF/WebP; explicit width/height to prevent CLS; LCP image `priority`.

## 11.8 Diagrams and simulations on small screens
Diagrams are authored at two viewBoxes (mobile portrait, desktop landscape) or switch to the list form. Labels never below 12 px effective size. Wide tables and code blocks scroll horizontally inside their own container with a visible scroll hint.

## 11.9 Scroll and transitions
Native scrolling only; no pinned sections under 1024 px; page transitions ≤ 600 ms and skip on slow devices.

## 11.10 Performance on mobile
Target mid-range Android on 4G (Lighthouse mobile profile). Total JS for the homepage first load under 170 KB gzip (target, to measure); fonts ≤ 3 families, subset, `font-display: swap` with metric-adjusted fallbacks; heavy visualization lazy loaded.

## 11.11 Accessibility on mobile
Zoom to 200 % without loss; orientation not locked; reflow at 320 px; focus visible; screen-reader order matches visual order; `prefers-reduced-motion` respected.

## 11.12 Acceptance criteria
Passes manual checks at 320, 375, 414, 768, 1024, 1440; no horizontal scroll; all targets ≥ 48 px; no hover-only interaction; each visualization usable on a phone.
