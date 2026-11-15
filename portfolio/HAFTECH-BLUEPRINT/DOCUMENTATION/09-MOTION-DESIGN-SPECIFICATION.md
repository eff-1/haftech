# 09 — Motion Design Specification

**Objective.** Specify every significant animation precisely enough for a motion designer and engineer to implement it identically.
**Status:** `PROPOSED`. Durations follow the brief's suggested ranges and are starting points to tune in prototype.

## 9.1 Principles
1. **Motion explains structure or confirms action**; it never gates content.
2. **Content first:** text is in the DOM and legible before any animation starts; animation never delays interaction.
3. **No scroll hijacking, no forced waiting, no speed manipulation.** Only the page's native scroll drives scrubbed animations.
4. **Parallax is rare and small** (≤ 40 px, one element per view).
5. **Only compositor-friendly properties** are animated: `transform`, `opacity`, `clip-path` (carefully), `stroke-dashoffset`. Never layout properties.
6. **Everything has a reduced-motion alternative** and a mobile adaptation.

## 9.2 Motion tokens
```css
:root {
  /* durations */
  --dur-micro: 180ms;      /* 150–220 */
  --dur-ui: 280ms;         /* 200–350 */
  --dur-image: 800ms;      /* 650–950 */
  --dur-headline: 900ms;   /* 700–1100 */
  --dur-section: 900ms;    /* 700–1200 */
  --dur-sequence: 1500ms;  /* 1200–1800 */
  /* easings */
  --ease-out: cubic-bezier(0.22, 1, 0.36, 1);      /* default enter */
  --ease-in-out: cubic-bezier(0.65, 0, 0.35, 1);   /* state changes */
  --ease-in: cubic-bezier(0.55, 0, 1, 0.45);       /* exits only */
  --stagger-text: 90ms; --stagger-list: 60ms;
}
```
```ts
// motion/tokens.ts — GSAP equivalents
export const dur = { micro: .18, ui: .28, image: .8, headline: .9, section: .9, sequence: 1.5 };
export const ease = { out: "expo.out", inOut: "power3.inOut", in: "power2.in" };
export const stagger = { text: .09, list: .06 };
```

## 9.3 Global behaviours
- **Reduced motion:** `gsap.matchMedia()` with `(prefers-reduced-motion: reduce)` sets final states instantly; no scrubbing, no auto-playing sequences. User-initiated state changes (opening an accordion) use ≤ 1 ms opacity change or none.
- **Mobile adaptation:** disable pointer effects; shorten durations ~15 %; no pinning below 1024 px.
- **Cleanup:** every animation is created inside `gsap.context()` / `useGSAP` and reverted on unmount; ScrollTriggers are refreshed after fonts and images load.
- **Performance:** `will-change` only during animation; animate ≤ 20 elements simultaneously; split text into lines (not characters) by default.

---

## 9.4 Animation catalogue
Each entry lists the 16 required attributes.

### M01 — Headline reveal (hero, section titles)
1. **Name:** Headline line reveal. 2. **Purpose:** establish typographic hierarchy. 3. **Trigger:** hero — page ready (fonts loaded or 600 ms timeout); sections — enter viewport at 85 %.
4. **Initial:** each line wrapped in overflow-hidden mask; line translated `yPercent: 105`. 5. **Intermediate:** line sliding up with slight ease-out. 6. **Final:** `yPercent: 0`, fully visible.
7. **Duration:** 900 ms. 8. **Easing:** `expo.out`. 9. **Stagger:** 90 ms per line. 10. **Scroll:** none (one-shot). 11. **Pointer/touch:** none.
12. **Reversal:** none; does not replay on scroll up. 13. **Mobile:** same, duration 750 ms. 14. **Reduced motion:** text visible immediately, no mask.
15. **Performance:** split by lines with SplitText (re-split on resize, debounced); `transform` only. 16. **Implementation:** `<TextReveal>` client component using GSAP `SplitText` (all GSAP plugins are free for commercial use per GSAP's current licence; verify at gsap.com/standard-license).

### M02 — Architectural line drawing (hero drawing, diagrams)
1. **Name:** Line draw. 2. **Purpose:** introduce the architectural motif and suggest "construction". 3. **Trigger:** hero — after M01 starts + 300 ms; elsewhere — in view.
4. **Initial:** `stroke-dasharray = length`, `dashoffset = length`. 5. **Intermediate:** strokes drawn in logical order (frame → layers → annotations). 6. **Final:** all strokes complete; annotations fade in.
7. **Duration:** 1400 ms total sequence. 8. **Easing:** `power3.inOut`. 9. **Stagger:** 120 ms between strokes. 10. **Scroll:** none in hero; optional scrub for large diagrams. 11. **Pointer:** desktop only — ≤ 6 px parallax of the drawing.
12. **Reversal:** none. 13. **Mobile:** same but no pointer effect; fewer strokes. 14. **Reduced motion:** final drawn state, no animation.
15. **Performance:** use `pathLength="1"` normalisation; keep path count < 80; avoid filters. 16. **Implementation:** GSAP `DrawSVGPlugin` or manual `stroke-dashoffset`.

### M03 — Image mask reveal
1. **Name:** Clip reveal. 2. **Purpose:** introduce images deliberately. 3. **Trigger:** image container enters at 80 %.
4. **Initial:** `clip-path: inset(100% 0 0 0)`; inner image `scale: 1.12`. 5. **Intermediate:** clip opens upward while image scales down. 6. **Final:** `inset(0)`, `scale: 1`.
7. **Duration:** 800 ms (image 1100 ms). 8. **Easing:** `expo.out`. 9. **Stagger:** 100 ms for multi-image rows. 10. **Scroll:** one-shot. 11. **Pointer:** hover/focus on features: scale 1.03, 500 ms (desktop only).
12. **Reversal:** none. 13. **Mobile:** no hover; reveal retained but 650 ms. 14. **Reduced motion:** visible immediately.
15. **Performance:** reserve space with `aspect-ratio` (no CLS); LCP image is **never** masked. 16. **Implementation:** `<ImageMask>` wrapping `next/image`.

### M04 — Scroll-linked text emphasis (philosophy)
1. **Name:** Word opacity scrub. 2. **Purpose:** guide reading of the philosophy line. 3. **Trigger:** section scroll progress.
4. **Initial:** words at opacity 0.3. 5. **Intermediate:** words reach 1 sequentially as the section crosses the viewport (start `top 80%`, end `top 35%`). 6. **Final:** all words opacity 1.
7. **Duration:** tied to scroll. 8. **Easing:** linear. 9. **Stagger:** per word, even distribution. 10. **Scroll:** `scrub: 0.5`; no pinning. 11. **Pointer:** none.
12. **Reversal:** full (scrubbed). 13. **Mobile:** same. 14. **Reduced motion:** opacity 1 from the start.
15. **Performance:** opacity only; ≤ 40 words. 16. **Implementation:** ScrollTrigger + SplitText words.

### M05 — Methodology progress
1. **Name:** Stage progress. 2. **Purpose:** show progression through Discover → Deliver. 3. **Trigger:** scroll within section.
4. **Initial:** progress line `scaleY: 0`, all numerals muted. 5. **Intermediate:** line fills; active numeral turns blue and scales 1.0→1.08. 6. **Final:** line full; last stage active.
7. **Duration:** scrubbed; stage switch 350 ms. 8. **Easing:** linear (line), `power2.out` (numeral). 9. **Stagger:** n/a. 10. **Scroll:** `scrub: true` on the line only; IntersectionObserver sets active stage. 11. **Pointer/touch:** stage links jump to anchors.
12. **Reversal:** full. 13. **Mobile:** line retained, no pinning, no scale. 14. **Reduced motion:** all stages visible, no line animation, active state static.
15. **Performance:** `transform: scaleY` on one element. 16. **Implementation:** ScrollTrigger; fallback list is the semantic markup.

### M06 — Capability row expansion
1. **Name:** Accordion expand. 2. **Purpose:** progressive disclosure. 3. **Trigger:** click / Enter / Space on row header.
4. **Initial:** panel `height: 0`, content opacity 0. 5. **Intermediate:** height animates to auto; content fades. 6. **Final:** open; `aria-expanded="true"`.
7. **Duration:** 300 ms. 8. **Easing:** `ease-in-out`. 9. **Stagger:** 60 ms for bullet items. 10. **Scroll:** none. 11. **Pointer:** desktop hover shifts numeral 8 px (180 ms).
12. **Reversal:** collapse at 220 ms. 13. **Mobile:** no hover; tap. 14. **Reduced motion:** instant toggle.
15. **Performance:** use CSS grid `grid-template-rows: 0fr → 1fr` where supported to avoid JS height. 16. **Implementation:** native `<details>`-like pattern with ARIA, CSS transition.

### M07 — Architecture layer focus
1. **Name:** Layer focus. 2. **Purpose:** let visitors inspect one layer. 3. **Trigger:** hover, focus or tap on a layer.
4. **Initial:** all layers full opacity, no fill. 5. **Intermediate:** selected layer fill `--ht-blue` at 8 %, stroke 2 px; others dim to 0.4. 6. **Final:** panel text swapped (cross-fade).
7. **Duration:** 220 ms. 8. **Easing:** `ease-in-out`. 9. **Stagger:** none. 10. **Scroll:** none. 11. **Pointer/touch:** hover desktop, tap on touch, Enter/Space on keyboard.
12. **Reversal:** blur/escape returns to idle after 200 ms. 13. **Mobile:** list expands in place; mini-diagram highlights. 14. **Reduced motion:** instant state change.
15. **Performance:** CSS classes on SVG groups. 16. **Implementation:** React state + CSS.

### M08 — Request lifecycle data flow
1. **Name:** Request trace. 2. **Purpose:** explain how an action travels through a system. 3. **Trigger:** user presses "Trace a request" (never auto-plays).
4. **Initial:** connectors static grey. 5. **Intermediate:** a marker travels UI → app → auth → API → logic → DB; each layer pulses 200 ms on arrival; the response returns along the same path. 6. **Final:** all connectors return to idle; caption summarises timing.
7. **Duration:** 1500 ms (range 1200–1800). 8. **Easing:** `power2.inOut` per leg. 9. **Stagger:** 150 ms between legs. 10. **Scroll:** none. 11. **Pointer/touch:** play / pause / replay / step buttons (≥ 48 px).
12. **Reversal:** step back button. 13. **Mobile:** vertical path, same logic. 14. **Reduced motion:** step-through with buttons, no travelling marker.
15. **Performance:** one GSAP timeline, animates transforms. 16. **Implementation:** GSAP `MotionPathPlugin` or manual path interpolation.

### M09 — Page transition
1. **Name:** Route transition. 2. **Purpose:** continuity between pages. 3. **Trigger:** internal navigation.
4. **Initial:** current page visible. 5. **Intermediate:** outgoing content fades to 0 and drops 12 px (200 ms); a thin blue progress line crosses the top; incoming content rises in (300 ms). 6. **Final:** new page at rest, focus moved to `h1`.
7. **Duration:** ≤ 600 ms total. 8. **Easing:** `ease-in` out, `ease-out` in. 9. **Stagger:** none. 10. **Scroll:** reset to top (or restore on back). 11. **Pointer:** none.
12. **Reversal:** browser back uses the same transition. 13. **Mobile:** same. 14. **Reduced motion:** no transition; instant swap, focus still moved to `h1`.
15. **Performance:** never block navigation; transition must not delay content more than 300 ms. 16. **Implementation:** View Transitions API where supported with a CSS fallback; avoid full-page overlays.

### M10 — Navigation overlay (mobile)
1. **Name:** Menu overlay. 2. **Purpose:** access navigation on small screens. 3. **Trigger:** tap menu button.
4. **Initial:** overlay `clip-path: inset(0 0 100% 0)`. 5. **Intermediate:** clip opens; links rise with stagger. 6. **Final:** overlay full screen, focus trapped.
7. **Duration:** 450 ms. 8. **Easing:** `expo.out`. 9. **Stagger:** 50 ms. 10. **Scroll:** body scroll locked. 11. **Touch:** swipe not required; close button and Escape.
12. **Reversal:** 300 ms. 13. **Mobile:** this is the mobile behaviour. 14. **Reduced motion:** instant. 15. **Performance:** clip-path only. 16. **Implementation:** React state + CSS; `inert` on page content.

### M11 — Micro-interactions
Link underline draw (180 ms `ease-out`), button arrow shift 6 px (180 ms), focus ring appearance (instant, never animated away), form field label shift (200 ms), copy-to-clipboard confirmation (opacity 220 ms). Reduced motion: colour/state changes remain, movement removed.

### M12 — Cursor interaction (optional, desktop fine-pointer only)
A 10 px ring that expands to 48 px with the label "View" over project images. Trigger: `pointer: fine` and `hover: hover` media queries; otherwise disabled. **Never replaces the native cursor.** Reduced motion: disabled. Considered optional; drop first if performance or clarity suffers.

---

## 9.5 Where motion is removed or simplified
- Reduced-motion users (all of §9.4 reverts to static).
- Low-power or low-memory devices: if `navigator.deviceMemory ≤ 2` or `save-data` is on, disable M02 pointer effects, M03 scale, M12.
- Long-form content (journal, case-study body): no reveals beyond images.
- Forms and checkout-style flows: no decoration.

## 9.6 Performance budget for motion
≤ 20 simultaneously animated elements; main-thread animation scripting ≤ 50 ms per frame budget burst; no long tasks from SplitText on load (split after first paint). Test on a mid-range Android profile (4× CPU throttling).

## 9.7 Testing
Visual regression with Playwright screenshots at final states; interaction tests for M06–M10 (keyboard and touch); manual reduced-motion pass; frame-time capture on throttled CPU.

## 9.8 Implementation recommendation
GSAP + ScrollTrigger for scroll and sequences; CSS transitions for micro-interactions and accordions; React state for diagram interaction; View Transitions for routes with CSS fallback. Lenis or other smooth-scroll libraries are **not recommended** by default because they alter scroll feel; add only if the founder explicitly requests and it passes the "no scroll hijacking" test.

## 9.9 Source note
GSAP's current free commercial licence, plugin list and ScrollTrigger/SplitText availability were retrieved from GSAP's README and package documentation; Locomotive's published case study states GSAP is central to its animation work. No third-party website animation was inspected visually (see doc 03 §3.9).

## 9.10 Acceptance criteria
Every animation matches its specification within ±10 % duration; reduced-motion mode shows all content with no movement; no CLS from animation; INP unaffected.
