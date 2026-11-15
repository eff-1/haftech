# PORTFOLIO — MASTER PROMPT FOR THE IDE AGENT

> Paste this whole file (or point your IDE agent at it) as the first message. It is self-contained. Deeper detail lives in `HAFTECH-BLUEPRINT/` next to this file; this prompt tells you where to look and what to do.

---

## 0. WHO YOU ARE AND THE MISSION

You are a senior full-stack + creative-frontend engineer working inside the founder's IDE. You are building **the HafTech website**: a studio site with a founder profile built in. It is the portfolio and the studio front door in one.

- **HafTech** = the studio (primary brand). **Faruq Ariyo** = founder and full-stack engineer behind it. Display name is always **"Faruq Ariyo"** (never "Ariyo Faruq").
- **Audience:** prospective clients (freelance/studio work), collaborators, and hiring managers (secondary).
- **One sentence of intent:** an editorial, architectural, calm-but-cinematic website that makes the engineering visible and never lies about what was built.

**Work style the founder wants (learned from his last build, which went badly):**
1. **Do not over-engineer.** Last time a build sprawled into too many test scripts and took days. Build the smallest thing that meets the spec. No script graveyards, no speculative abstractions, no extra dependencies without a one-line justification.
2. **Ship in small, working steps.** After each phase the site must run (`npm run dev`) and build (`npm run build`).
3. **Performance is part of the design.** His previous site missed the mobile Lighthouse 90 target. Design for speed from the first commit.
4. **Do not ask questions you can resolve with a sensible default.** Use placeholders for missing assets, record the open item (section 9), and keep going. Ask only when truly blocked.
5. **Be honest in reports.** Say what works, what is placeholder, and what you did not test.

---

## 1. WHERE EVERYTHING IS

```
portfolio/
├─ MASTER-PROMPT.md              ← you are here
├─ AGENTS.md                     ← short pointer for IDEs that auto-load it
├─ CONTENT-SEED/                 ← real project + founder facts (all unverified) and notes
│   projects.seed.json · founder.seed.json · CONTENT-NOTES.md
└─ HAFTECH-BLUEPRINT/
   ├─ README.md                  ← file map + reading order
   ├─ DOCUMENTATION/             ← authoritative Markdown specs (source of truth)
   │   01 brief · 02 brand · 03 visual system + tokens · 04 information architecture
   │   05 homepage · 06 founder page · 07 portfolio schema + case studies
   │   08 contribution matrix · 09 motion spec · 10 visualization · 11 responsive
   │   12 technical architecture · 13 performance + a11y · 14 SEO + deploy
   │   15 roadmap · 16 decision register (confirmed / proposed / open)
   ├─ PDFs/                      ← designed versions of the same content (read-only reference)
   ├─ DIAGRAMS/                  ← Mermaid sources (sitemap, architecture, workflows)
   └─ ASSETS/README.md           ← list of assets still needed
```

**Lookup table — when you need X, open Y:**

| You need | Open |
|---|---|
| Colours, type scale, CSS tokens, logo rules | `DOCUMENTATION/03-VISUAL-DESIGN-SYSTEM.md` |
| Page list, sitemap, per-page specs | `04-INFORMATION-ARCHITECTURE.md` |
| Exact homepage sections, copy, behaviour | `05-HOMEPAGE-BLUEPRINT.md` |
| Founder page | `06-FOUNDER-EXPERIENCE.md` |
| Project data schema, status labels, case-study template | `07-PORTFOLIO-AND-CASE-STUDIES.md` |
| Who-did-what attribution | `08-PROJECT-CONTRIBUTIONS.md` |
| Every animation (16 attributes each) and motion tokens | `09-MOTION-DESIGN-SPECIFICATION.md` |
| The architecture explorer / request trace | `10-SIMULATION-AND-VISUALIZATION.md` |
| Breakpoints, mobile behaviour | `11-RESPONSIVE-DESIGN.md` |
| Folder structure, stack, form, security, env vars | `12-TECHNICAL-ARCHITECTURE.md` |
| Budgets, WCAG checklist | `13-PERFORMANCE-AND-ACCESSIBILITY.md` |
| Domain, SEO, JSON-LD, launch | `14-SEO-AND-DEPLOYMENT.md` |
| What is decided vs missing | `16-DECISION-REGISTER.md` |

**Rule:** if this prompt and a DOCUMENTATION file disagree on design or engineering detail, the DOCUMENTATION file wins. For **content facts** (projects, founder, links), `CONTENT-SEED/` wins over doc 07 §7.4 and doc 06 §6.3, which predate it. If you find a real conflict, note it in your report and follow the document.

**Existing files on the founder's machine (check, do not assume):** the build may live at `c:/portfolio`, and an older asset pack may exist at `c:/portfolio/portfolio-assets` (made for an earlier, different concept). Real font files (Boska, Switzer, Monaspace Neon Regular + Medium) may already exist in an earlier project; reuse them if found. The earlier "Compiled Book" front end is **not** the design to follow; this brief replaces it.

---

## 2. NON-NEGOTIABLE RULES

1. **Never invent facts.** No fake statistics, testimonials, outcomes, awards, client names, screenshots, or "trusted by". Missing → placeholder + open item.
2. **Verified gate.** Every project record has `verified: boolean`. Only `verified: true` records may appear in production builds. For now, founder-stated facts (section 5) are entered with `verified: false` and shown only behind a `NEXT_PUBLIC_SHOW_UNVERIFIED=true` preview flag.
3. **Attribution is explicit.** Every project states ownership, status, and who did what (doc 08). Do not credit Faruq with others' work.
4. **Content first.** All text is in server-rendered HTML and readable with JS off or animations disabled. Animation never gates content or delays interaction.
5. **No scroll hijacking.** Native scroll only. No smooth-scroll libraries. No forced waiting. Parallax ≤ 40 px, rarely.
6. **Reduced motion is mandatory.** Every animation has a `prefers-reduced-motion` path (final state, no movement).
7. **No hover-only interactions.** Touch and keyboard equivalents for everything.
8. **Accessibility:** WCAG 2.2 AA, semantic HTML, visible focus, 48 px touch targets.
9. **Performance budgets:** homepage first-load JS ≤ 170 KB gzip; explorer lazy chunk ≤ 40 KB gzip; Lighthouse mobile ≥ 90 / a11y ≥ 95 / SEO ≥ 95; LCP ≤ 2.5 s, INP ≤ 200 ms, CLS ≤ 0.1. The LCP element is the H1 text, never a masked image.
10. **No database, auth, or admin panel in this task.** Content lives in Git (typed data + MDX). Put all reads behind `lib/content.ts` so a Supabase-backed admin can replace it later (the founder has a working Supabase admin from a previous build he may reuse).
11. **No 3D at launch.** SVG + CSS + GSAP only.
12. **Do not imply a team.** The founder's CV describes HafTech as a personal brand. Default copy: "an independent software studio led by Faruq Ariyo"; use "I" on `/founder`; use "we" only where real collaborators exist (open decision, see CONTENT-NOTES).
13. **Never publish** client pricing, infrastructure settings, lead details, phone number or CV metrics (see CONTENT-SEED notes).
14. **Do not copy any website.** Do not use stock people or AI-generated people.

---

## 3. THE GENERAL LOOK OF THE PAGE

### 3.1 One-paragraph picture
A warm-ivory, paper-like page with graphite type and one restrained architectural-blue accent. It reads like an **architecture/engineering monograph**: hairline rules, section index numerals (01–08), small monospaced technical labels, and large editorial serif headlines. Layouts are **asymmetric and square-cornered** (no rounded cards, no shadows). The hero pairs a huge headline with a **thin line drawing of a layered structure** that looks like a building cross-section and doubles as a software stack. Motion is slow, precise and quiet: lines draw, headlines rise out of masks, images open with a clip reveal. It should feel mature, intentional and technically credible.

### 3.2 It must NOT look like
Black background with electric-blue/cyan gradients · glassmorphism · glowing spheres · floating 3D objects · particle backgrounds · rounded-card grids · neon/cyberpunk · generic SaaS landing page · gradients of any kind in the logo or UI · desktop layout squeezed onto mobile.

### 3.3 Tokens (use exactly; full set in doc 03)
```css
:root{
  --ht-graphite:#20221F; --ht-ivory:#F1EFE8; --ht-paper:#FAF9F5;
  --ht-blue:#344C68; --ht-blue-hl:#7894B1; --ht-blue-hl-dark:#9DB5CF;
  --ht-concrete:#A5A49B; --ht-border:#D9D7CF; --ht-border-strong:#8E8D85;
  --ht-muted-text:#686963;           /* NOT #74756F: that fails AA */
  --bg:var(--ht-ivory); --surface:var(--ht-paper); --text:var(--ht-graphite);
  --text-2:var(--ht-muted-text); --accent:var(--ht-blue); --line:var(--ht-border);
  --radius:0;
  --font-display:"Boska","Iowan Old Style",Georgia,serif;
  --font-body:"Switzer",Inter,system-ui,sans-serif;
  --font-mono:"Monaspace Neon",ui-monospace,"SF Mono",Menlo,monospace;
  --s-1:4px;--s-2:8px;--s-3:12px;--s-4:16px;--s-5:24px;--s-6:32px;--s-7:48px;--s-8:64px;--s-9:96px;--s-10:144px;
  --gutter:clamp(16px,4vw,40px); --max:1440px;
  --step-0:clamp(1rem,.96rem + .2vw,1.125rem);
  --step-4:clamp(2.07rem,1.7rem + 1.85vw,3.2rem);
  --step-5:clamp(2.49rem,1.9rem + 2.95vw,4.4rem);
  --step-6:clamp(2.99rem,2rem + 4.95vw,6.6rem);   /* hero only */
  --dur-micro:180ms;--dur-ui:280ms;--dur-image:800ms;--dur-headline:900ms;--dur-sequence:1500ms;
  --ease-out:cubic-bezier(.22,1,.36,1);--ease-in-out:cubic-bezier(.65,0,.35,1);
}
```
Colour use: ~85 % ivory/paper/graphite, ~12 % blue, ~3 % highlight. Blue never fills big areas. Concrete and highlight are **decorative only** on light backgrounds (they fail text contrast).

**Typography:** Boska = headlines (500/700; italic only ≥ 48 px). Switzer = body and UI (400/500/600). Monaspace Neon = technical labels, metadata, status tags (uppercase, +0.04em tracking, never below 12 px). Body 1.55 line-height, 62–70 ch measure. Fonts: `next/font/local`, subset Latin, `font-display:swap`, metric-adjusted fallbacks. **Licence note:** Switzer self-hosting may need ITF written consent; if unsure, load from Fontshare or fall back to Inter and flag it in the report.

### 3.4 Layout language
12-column grid desktop (≥1024), 8 tablet (≥768), 4 mobile. Hairline rule + a Monaspace strip (`01 — STUDIO · SOFTWARE ENGINEERING`) opens each section. Images may bleed to one edge. Registration/crosshair marks on image corners (decorative, `aria-hidden`). Section spacing 64 / 96 / 144 px (mobile / tablet / desktop).

### 3.5 Hero wireframe (desktop)
```
┌───────────────────────────────────────────────────────────────────────────┐
│ HafTech                        Work  Projects  Services  Approach  Founder  Contact │
│───────────────────────────────────────────────────────────────────────────│
│ STUDIO · FOUNDER-LED · SOFTWARE ENGINEERING                                │
│                                                          ┌──────────────┐ │
│ Ideas deserve more                                       │ ┌──────────┐ │ │
│ than execution.                                          │ ├──────────┤ │ │
│ They deserve                                             │ ├──────────┤ │ │
│ engineering.                                             │ ├──────────┤ │ │
│                                                          │ ├──────────┤ │ │
│ We design and engineer digital products, intelligent     │ └──────────┘ │ │
│ systems and software experiences that help ambitious     │  layered line │ │
│ businesses move forward.                                 │  drawing (SVG)│ │
│ [ Start a project ]   See the work →                     └──────────────┘ │
│ Founded by Faruq Ariyo                                                     │
└───────────────────────────────────────────────────────────────────────────┘
```
**Mobile hero:** headline first (never below the fold), support copy, two stacked CTAs (48 px), compact drawing underneath. Menu is a text button "Menu" opening a full-screen overlay.

### 3.6 Homepage sections in order (details in doc 05)
1. **Opening** — as above. H1 "Ideas deserve more than execution. They deserve engineering."
2. **Philosophy** — "We don't just build interfaces. We engineer the systems behind them." Sticky headline left on desktop, three short blocks right: Product engineering · Systems and infrastructure · Digital experiences. Words brighten while scrolling (opacity only).
3. **Selected work** — asymmetric editorial features, **not cards**: full-width, offset two-up, full-bleed crop. Each shows title, one-line description, category, ownership, role, technologies, status tag, image, link. Max 4. Mask-reveal images.
4. **Engineering visualization (signature)** — layered section-view SVG of a generic product: UI · Application · Authentication · API · Business logic · Database · Infrastructure · External integrations. Hover/tap/keyboard focuses a layer and fills a detail panel; a **"Trace a request"** button animates a marker through the layers (1.2–1.8 s, pausable, steppable). Mobile: layer list with expand + mini diagram. Caption required: "Illustrative architecture, not a depiction of every HafTech deployment." Lazy-loaded.
5. **Capabilities** — seven numbered rows (Custom software · Web applications · Backend engineering · API development · Business automation · Product architecture · Infrastructure and deployment) that expand (300 ms) with three bullets and a link.
6. **Methodology** — 01 Discover · 02 Architect · 03 Engineer · 04 Deliver; desktop pinned progress rail with a scroll-linked line; mobile plain vertical sequence, no pinning.
7. **Founder** — portrait (placeholder frame until supplied) + short intro + link to `/founder`. Uses "Founded and engineered by Faruq Ariyo". Must not make the studio look dependent on one person.
8. **Closing** — full-width graphite panel, ivory Boska "Have something worth building?", primary CTA, email link, then an editorial footer (sitemap, contact, socials, privacy).

### 3.7 Motion feel
Slow ease-out (`expo.out`), ~0.8–1.0 s reveals, 90 ms stagger by line. Headline lines rise from masks; hero drawing strokes draw over ~1.4 s; images open via `clip-path` while scaling 1.12 → 1; micro-interactions 180 ms. Page transition ≤ 600 ms, never blocking. Full catalogue M01–M12 in doc 09.

### 3.8 Status tags (shape + text, never colour alone)
○ CONCEPT · ◔ EXPLORING · ◑ IN DEVELOPMENT · ◕ INTERNAL TESTING · ● LIVE · ▢ ARCHIVED.

---

## 4. STACK AND STRUCTURE

Next.js (App Router, current stable), React, TypeScript, Tailwind **plus** the CSS variables above as source of truth, GSAP + ScrollTrigger (all GSAP plugins are free for commercial use), MDX for prose, typed data + Zod validation for projects, Vercel. Contact via a route handler + transactional email (Resend or Postmark) + Cloudflare Turnstile + honeypot + simple rate limit. Cookieless analytics (e.g. Vercel Web Analytics).

Server Components by default. Client islands only for: `SiteNav`, `TextReveal`, `ImageMask`, `LineDrawing`, `ArchitectureExplorer`, `MethodologyScroll`, `ContactForm`. Import GSAP only inside client components; load heavy ones with `next/dynamic`. Run every animation inside `useGSAP`/`gsap.context` with cleanup and `gsap.matchMedia()` for reduced motion.

Directory layout (from doc 12):
```
app/ layout.tsx page.tsx work/ projects/ services/ approach/ founder/ journal/ contact/ privacy/ not-found.tsx api/contact/route.ts sitemap.ts robots.ts opengraph-image.tsx
components/ layout/ sections/ viz/ motion/ ui/
content/ projects/ case-studies/ journal/
lib/ content.ts schema.ts seo.ts email.ts
styles/ tokens.css globals.css
public/ fonts/ images/
```
Env vars: `EMAIL_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`, `TURNSTILE_SECRET_KEY`, `NEXT_PUBLIC_TURNSTILE_SITE_KEY`, `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_SHOW_UNVERIFIED`. Provide `.env.example`. Never commit secrets.

**Keep tooling light:** `tsc`, ESLint, one Playwright smoke test (nav, contact form, explorer keyboard) and axe on the homepage. That is enough. No other test scripts.

---

## 5. CONTENT AND DATA

### 5.1 Project schema (copy from doc 07)
```ts
export type ProjectStatus="concept"|"exploring"|"in-development"|"internal-testing"|"live"|"archived";
export type Ownership="client"|"haftech"|"founder-independent"|"joint";
export interface Contribution{area:"product-design"|"frontend"|"backend"|"architecture"|"database"|"deployment"|"integrations"|"other";who:string;role:"led"|"contributed"|"reviewed"|"supplied";notes?:string}
export interface Project{slug:string;title:string;summary:string;category:string;type:"work"|"project";ownership:Ownership;ownerName?:string;status:ProjectStatus;statusVerifiedOn:string;roles:string[];technologies:string[];image?:{src:string;alt:string;width:number;height:number};links?:{live?:string;repo?:string;caseStudy?:string};contributions:Contribution[];verified:boolean;caseStudy?:string}
```
Rule: **if someone else owns it → `/work`; if HafTech/founder owns it → `/projects`.** CI/build fails if a project marked for publishing has `verified:false`.

### 5.2 Known projects: use `CONTENT-SEED/projects.seed.json`
Load it into `content/projects/` (strip seed-only fields `openFields`, `sourceNote`, `statusConflict`, `featuredCandidate` or keep them in a dev-only type). There are 13 records, all `verified:false`: Axiora, BUILDRIFT, Jimmarof, RealtyIntel, Deen Drip, Cahootz, WahalaCheck, Retention SaaS, Auth and Dashboard System, Raws Apparel, Edunexs LearnSphere, chat-app-v2, TeamNotifier. Statuses for the older four builds are placeholders.
- Featured candidates once verified: **Axiora, BUILDRIFT, Jimmarof**. The rest appear in an index list.
- Client-owned work (Deen Drip, RealtyIntel, Raws Apparel, TeamNotifier, Edunexs) needs the client's written permission before appearing anywhere.
- Read `CONTENT-SEED/CONTENT-NOTES.md`: it lists conflicts between sources (do not resolve them yourself) and the **never publish** list (client pricing, infrastructure settings, lead details, phone number).
- Contribution matrices stay `OPEN`; do not guess. No screenshots exist: use labelled "Screenshot pending" frames.

### 5.3 Copy (proposed, still needs founder approval; keep it in `content/copy.ts` so it is easy to edit)
Hero, philosophy and closing lines are in section 3.6. Founder one-liner: "Faruq Ariyo is the founder and a full-stack engineer. He designs and builds HafTech's products." Methodology intro: "Four stages, one accountable team. Each ends with something you can inspect." Voice: direct, intelligent, confident, human. **Banned words:** best, leading, world-class, cutting-edge, revolutionary, award-winning, seamless, leverage, solutions, synergy. No unsourced numbers.

### 5.4 Founder facts: use `CONTENT-SEED/founder.seed.json`
Each fact carries `publish: yes | confirm | never`. Show only `yes` items by default; `confirm` items sit behind placeholders until the founder approves; never render `never` items. Education, skills (plain lists, no bars), role, 4+ years and links (LinkedIn, X) are `yes`. Public name, employer, award, location and email are `confirm`. **Name conflict:** the CV says "Faruq Oladura A." while the site uses **Faruq Ariyo**. Use "Faruq Ariyo" as instructed and flag it in your first report.

### 5.5 Emails (configuration, not hard-coded in components)
Portfolio/personal email: ariyofaruq1@gmail.com. HafTech agency email: haftechhq@gmail.com. Which one receives this site's contact form is **OPEN**: read it from `CONTACT_TO_EMAIL`.

### 5.6 Logo
No approved logo and no vector source exist. Use a **typographic placeholder** wordmark "HafTech" (Boska 600, graphite) in the header, with a comment `/* LOGO PLACEHOLDER: not approved */`. Do not recreate the old cyan-gradient circuit logo.

---

## 6. BUILD PLAN (do in order; stop and report at each ✋)

**Phase A — Foundation.** Scaffold Next.js + TS + Tailwind; add `styles/tokens.css` (section 3.3), fonts, `lib/content.ts`, `lib/schema.ts` (Zod), `content/` seed data, `.env.example`, layout (SiteNav, SiteFooter), skip link, focus styles, `not-found`. Mobile first.
*Done when:* dev + build pass; tokens used everywhere (no hard-coded colours); AA contrast verified for all text pairs.
✋ Report.

**Phase B — Homepage, static.** Build sections 1–8 with real semantics and responsive layouts, **no animation yet**, placeholders where assets are missing.
*Done when:* readable at 320/375/768/1024/1440 px, no horizontal scroll, Lighthouse mobile ≥ 90 without motion, H1 is the LCP.
✋ Report with screenshots of 375 px and 1440 px.

**Phase C — Motion.** Implement `motion/tokens.ts`, `useReducedMotion`, `TextReveal` (M01), `LineDrawing` (M02), `ImageMask` (M03), philosophy scrub (M04), capability expand (M06), nav overlay (M10), micro-interactions (M11). Skip M12 (cursor) unless trivially cheap.
*Done when:* matches doc 09 within ±10 % timing; reduced-motion shows everything instantly; no CLS; budgets met.
✋ Report.

**Phase D — Signature visualization.** `ArchitectureExplorer` + request trace (M07, M08). Static SVG/list fallback server-rendered; interactive part lazy-loaded when ~1 viewport away; timeline only starts on click. Keyboard + touch + screen-reader list.
*Done when:* works with JS off (static), keyboard, touch; chunk ≤ 40 KB gzip; axe clean.
✋ Report.

**Phase E — Remaining pages.** `/work`, `/work/[slug]`, `/projects`, `/projects/[slug]`, `/services`, `/approach` (methodology scroll M05), `/founder`, `/contact` (working form), `/privacy`. `/journal` only if ≥ 2 articles exist (otherwise omit from nav and routes). Case-study template per doc 07; contribution block per doc 08; status tags with shapes. Unverified items hidden unless the preview flag is on.
*Done when:* every route has a unique title/description, one `h1`, breadcrumbs on detail pages; form delivers (or clearly logs in dev), is spam-protected and accessible.
✋ Report.

**Phase F — SEO, performance, accessibility.** Metadata API per route, `sitemap.ts`, `robots.ts` (disallow previews), canonical URLs, Open Graph images, JSON-LD (Organization, WebSite, Person on `/founder`, Article for case studies), security headers (CSP, Referrer-Policy, X-Content-Type-Options, Permissions-Policy). Image optimisation (`next/image`, AVIF/WebP, correct `sizes`, downscale before commit). Run Lighthouse + axe; fix to targets.
✋ Report with scores.

**Phase G — Deploy.** Private GitHub repo, Vercel project, env vars, preview deployments `noindex`, production domain once the founder confirms `haftech.com` ownership. SPF/DKIM/DMARC checklist from doc 14 (provide it; do not claim it is configured).
✋ Final report.

---

## 7. DEFINITION OF DONE (checklist)

- [ ] `npm run build` clean; `tsc` + ESLint pass; no `any` without comment
- [ ] No hard-coded colours/fonts outside tokens
- [ ] All 8 homepage sections implemented per doc 05, responsive, accessible
- [ ] Explorer works: keyboard, touch, JS-off static fallback, caption present
- [ ] Reduced motion tested; no scroll hijack; no hover-only features
- [ ] Mobile Lighthouse ≥ 90 perf, ≥ 95 a11y, ≥ 95 SEO; LCP ≤ 2.5 s, INP ≤ 200 ms, CLS ≤ 0.1 (record actual numbers; if missed, say so and say why)
- [ ] Contact form validated, spam-protected, accessible, env-driven recipient
- [ ] Project data validated by Zod; unverified items excluded from production
- [ ] No invented facts anywhere; every placeholder labelled
- [ ] README at repo root explaining run/build/deploy, env vars, where to edit copy and projects, and the open items

---

## 8. REPORT FORMAT (after every ✋ phase, max ~15 lines)
```
PHASE X — done / partial
Built: …
Works: …    Placeholder: …    Not tested: …
Numbers: LCP/INP/CLS/Lighthouse (if measured)
Deviations from the docs: … (and why)
Open items hit: O-xx …
Next: Phase Y
```

---

## 9. OPEN ITEMS (use placeholders; list in README; full list in doc 16)
Public name (Ariyo vs Oladura) · Axiora and BUILDRIFT status · Direction B approval (reported in pasted text, unconfirmed) · we-vs-I voice · Logo (vector + approval) · wordmark · Switzer/Boska self-hosting terms · haftech.com ownership/DNS/email · final copy · founder portrait · founder bio facts, GitHub/LinkedIn links · screenshots for every project · verified status/ownership/contributions per project · client permissions · which email receives the form · analytics choice and consent rules · whether an admin panel is ever needed (if yes, reuse the founder's earlier Supabase admin via `lib/content.ts`).

---

## 10. FIRST MESSAGE TO SEND BACK
Reply with: (1) the file list you read, (2) any conflict you spotted between this prompt and the docs, (3) which fonts/assets you found on disk, (4) your Phase A plan in five bullets. Then start Phase A.
