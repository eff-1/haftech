# 13 — Performance, Accessibility and Quality

**Objective.** Make performance and accessibility measurable parts of the creative direction.
**Status:** targets from the brief are `CONFIRMED`; budgets and methods are `PROPOSED`. Targets are goals to verify, not guarantees.

## 13.1 Targets
| Metric | Target | Source / note |
|---|---|---|
| Lighthouse mobile performance | ≥ 90 | Brief |
| Lighthouse accessibility | ≥ 95 | Brief |
| Lighthouse SEO | ≥ 95 | Brief |
| Largest Contentful Paint | ≤ 2.5 s | Core Web Vitals "good" threshold, measured at the 75th percentile |
| Interaction to Next Paint | ≤ 200 ms | Core Web Vitals "good" threshold |
| Cumulative Layout Shift | ≤ 0.1 | Core Web Vitals "good" threshold |
Lab scores (Lighthouse) are a proxy; field data (CrUX/RUM) is the judge after launch. Heavy interactive pages can score lower in lab tests while passing in the field, so both are recorded.

## 13.2 Budgets `PROPOSED`
| Resource | Budget |
|---|---|
| Homepage first-load JS | ≤ 170 KB gzip |
| Architecture explorer lazy chunk | ≤ 40 KB gzip (plus GSAP if not already loaded) |
| Fonts | ≤ 3 families, ≤ 120 KB total transferred above the fold |
| Hero LCP element | Text; if an image, ≤ 120 KB AVIF |
| Total page weight (mobile first view) | ≤ 1 MB |
| Third-party scripts | ≤ 1 (analytics) |
Budgets are enforced in CI with Lighthouse CI and a bundle-size check.

## 13.3 Performance techniques
- **Images:** `next/image`, AVIF/WebP, correct `sizes`, no oversized sources, lazy loading below the fold, `priority` only for the LCP image.
- **Fonts:** subsetting, preload of the display and body weights, `font-display: swap`, `size-adjust` fallbacks to avoid shifts.
- **Lazy loading and dynamic imports:** visualization, methodology and any GSAP plugin beyond core loaded after first paint or when near the viewport.
- **GPU-conscious animation:** `transform`/`opacity` only; avoid `filter`/`backdrop-filter` and large blurred shadows; `will-change` applied transiently.
- **Bundle:** tree-shake GSAP imports (import plugins individually), avoid heavy icon libraries (use inline SVG), analyse with a bundle analyser per release.
- **Caching:** immutable caching for hashed assets, ISR/static generation for content pages, `stale-while-revalidate` for images; HTML revalidation on deploy.
- **Third parties:** none beyond analytics and the bot check on the contact page only.

## 13.4 Loading heavy simulations
Server-render a static fallback → hydrate lightweight shell → dynamic import the explorer when it is about 1 viewport from view → start timelines only on user action. On `save-data`, slow connections or low-memory devices keep the static version. The simulation must never delay LCP, INP or hydration of above-the-fold content.

## 13.5 Accessibility standard
Target **WCAG 2.2 AA** across the site.
| Area | Requirement |
|---|---|
| Semantic HTML | One `h1`, ordered headings, landmarks (`header`, `nav`, `main`, `footer`), lists for lists, buttons for actions, links for navigation |
| Keyboard | All functionality operable with keyboard; logical tab order; visible focus ring (2 px blue, 3 px offset, 3:1 contrast); skip link; no keyboard traps; Escape closes overlays |
| Colour contrast | Text ≥ 4.5:1 (3:1 for large); UI components and graphics ≥ 3:1; use `--ht-muted-text` (#686963) instead of #74756F for text (doc 03) |
| Motion | `prefers-reduced-motion` honoured; no flashing; user-triggered animation pausable |
| Screen readers | Meaningful alt text; diagrams have text alternatives; status and form errors announced; `aria-expanded`, `aria-current` used correctly; decorative SVG `aria-hidden` |
| Targets | ≥ 48 px (≥ 24 px is the WCAG 2.2 minimum) |
| Forms | Visible labels, programmatic association, error summary and inline errors, no placeholder-as-label, autocomplete attributes |
| Language and zoom | `lang` set; 200 % zoom and 320 px reflow supported |
| Status not by colour alone | Status tags use shape + text |
Automated checks catch only a portion of issues; manual testing is required.

## 13.6 Testing and acceptance checklist
**Automated (CI)**
- [ ] `tsc` and ESLint pass
- [ ] Content schema validates; no unverified published projects
- [ ] Unit tests pass
- [ ] Playwright e2e: nav, contact form, explorer (keyboard + touch)
- [ ] axe: zero serious/critical violations on all templates
- [ ] Lighthouse CI: budgets met (performance ≥ 90 mobile, a11y ≥ 95, SEO ≥ 95)
- [ ] Bundle-size check passes
- [ ] Link checker: no broken internal links
**Manual**
- [ ] Keyboard-only walk-through of every page
- [ ] Screen reader pass (NVDA + VoiceOver) on home, case study, form
- [ ] Reduced-motion pass: all content visible, no movement
- [ ] 320 px, 375 px, 768 px, 1024 px, 1440 px visual checks; no horizontal scroll
- [ ] Throttled CPU (4×) and slow 4G run for LCP and INP
- [ ] Zoom 200 % and text-spacing override
- [ ] Real device test on a low-end Android and an iPhone
**Content**
- [ ] Every claim sourced; no invented statistics, outcomes or testimonials
- [ ] Contribution matrices verified
- [ ] OG images and metadata correct
**Release**
- [ ] SPF/DKIM/DMARC pass; form delivers email; analytics events fire
- [ ] Search Console property verified; sitemap submitted

## 13.7 Monitoring after launch
Core Web Vitals via CrUX/Search Console and RUM; monthly Lighthouse run; accessibility regression tests in CI; error monitoring for the contact route.

## 13.8 Acceptance criteria
All checklist items pass or have documented, approved exceptions; field Core Web Vitals within "good" thresholds after sufficient traffic.
