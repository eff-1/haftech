# HafTech — Studio Website & Founder Profile

The official digital presence of **HafTech**, an independent software engineering studio, and **Faruq Ariyo**, founder and full-stack engineer.

Built following the comprehensive architectural blueprint in `HAFTECH-BLUEPRINT/DOCUMENTATION`.

---

## 1. Architectural Principles & Voice

1. **Dual Identity**: 
   - **HafTech** is the engineering studio entity. Studio pages (`/`, `/work`, `/services`, `/approach`, `/contact`) use the collaborative "we" voice.
   - **Faruq Ariyo** is the founder and engineering lead. The `/founder` profile uses the first-person "I" voice.
   - We make no speculative team headcount claims; project accountability is governed by transparent contribution matrices.
2. **Strict Verification Gate**:
   - No invented metrics, client testimonials, awards, or fake screenshots.
   - Missing or unconfirmed data points remain explicitly labelled as **pending** or **unverified**.
   - In production builds, records with `verified: false` are strictly omitted from public views unless `NEXT_PUBLIC_SHOW_UNVERIFIED=true` is enabled.
3. **High-Performance & Accessible Motion**:
   - Zero scroll-hijacking (no smooth-scroll wrapper libraries).
   - All GSAP animations (M01–M11) respect `prefers-reduced-motion: reduce`.
   - LCP element is pure HTML H1 text; zero layout shift (CLS = 0) through metric-matched font fallbacks (`size-adjust`).
   - Full WCAG 2.2 AA compliance: 48px minimum touch targets, 4.5:1+ contrast ratios, and visible keyboard focus rings.

---

## 2. Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router, Turbopack, React 19)
- **Language**: [TypeScript 5](https://www.typescriptlang.org/) (Strict mode, full type-safety)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) + CSS custom properties design tokens (`styles/tokens.css`, `styles/globals.css`)
- **Motion**: [GSAP 3](https://gsap.com/) (`ScrollTrigger`, `Flip`) with tokenized easings and reduced-motion bypass hooks
- **Data Validation**: [Zod](https://zod.dev/) schemas (`lib/schema.ts`)
- **Typography**: 
  - Display: **Boska Variable** (Editorial Serif)
  - Body: **Switzer Variable** (Contemporary Sans)
  - Code & Technical: **Monaspace Neon** (Latin-subsetted to ~13.8 KB each)
- **Interactive Visualization**:
  - 8-tier interactive software architecture explorer & request trace simulation (M07–M08)
  - Code-split into an isolated dynamic chunk (~38 KB gzip) with server-rendered static SVG fallback for zero-JS environments

---

## 3. Project Structure

```text
portfolio/
├── app/                        # Next.js App Router routes
│   ├── layout.tsx              # Root layout (fonts, metadata, JSON-LD)
│   ├── page.tsx                # Homepage (8 semantic sections)
│   ├── work/                   # Client case studies (/work & /work/[slug])
│   ├── projects/               # Products & experiments (/projects & /projects/[slug])
│   ├── services/               # Capabilities & service breakdown
│   ├── approach/               # Engineering methodology & rail
│   ├── founder/                # Founder profile & principles
│   ├── contact/                # Contact page & submission form
│   ├── privacy/                # Plain-language privacy policy
│   ├── api/contact/            # Form route handler (rate-limit, honeypot, Turnstile)
│   ├── opengraph-image.tsx     # Dynamic 1200x630 branded social cards
│   ├── icon.tsx                # Dynamic 32x32 favicon generator
│   ├── manifest.ts             # Web app manifest
│   ├── sitemap.ts              # Dynamic XML sitemap
│   └── robots.ts               # Robots.txt with preview protection
├── components/
│   ├── layout/                 # SiteNav, SiteFooter, MobileMenu
│   ├── motion/                 # TextReveal, LineDrawing, ImageMask, tokens
│   ├── sections/               # Hero, Philosophy, Capabilities, etc.
│   ├── seo/                    # Structured data (JsonLd components)
│   ├── ui/                     # SectionStrip, StatusTag, ContributionMatrix
│   └── viz/                    # ArchitectureExplorer & RequestTrace simulation
├── content/
│   ├── copy.ts                 # Editorial brand copy & capabilities
│   └── projects/projects.json  # Project database (Zod validated)
├── lib/
│   ├── content.ts              # Content query API & verification filters
│   └── schema.ts               # Zod schemas for projects & contributions
├── public/
│   └── fonts/                  # Subsetted WOFF2 font files
└── styles/
    ├── tokens.css              # Design tokens (colors, spacing, typography)
    └── globals.css             # Base styles, focus rings, font-face overrides
```

---

## 4. Getting Started

### Prerequisites
- Node.js 20+
- npm 10+

### Installation
```bash
npm install
```

### Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the application.

### Type Check & Build
```bash
npm run typecheck
npm run build
npm run start
```

---

## 5. Environment Variables

Copy `.env.example` to `.env.local` to configure environment secrets:

| Variable | Description | Default |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Canonical origin of the production site | `https://haftech.com` |
| `NEXT_PUBLIC_SHOW_UNVERIFIED` | Toggle to show unverified projects (`true`/`false`) | `false` |
| `CONTACT_TO_EMAIL` | Inbox destination for contact form submissions | `haftechhq@gmail.com` |
| `CONTACT_FROM_EMAIL` | Verified sending address for transactional emails | `studio@haftech.com` |
| `EMAIL_API_KEY` | Resend / email provider API key | `""` |
| `TURNSTILE_SECRET_KEY` | Cloudflare Turnstile bot verification secret | `""` |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Cloudflare Turnstile site key | `""` |

---

## 6. Content Management & Verification Policy

All case studies and independent products reside in `content/projects/projects.json`. Each entry conforms to the schema in `lib/schema.ts`:

- **Ownership Taxonomy**: `client`, `haftech`, `founder-independent`, or `joint`.
- **Status Taxonomy**: `concept`, `exploring`, `in-development`, `internal-testing`, `live`, or `archived`.
- **Contribution Matrix**: Mandatory breakdown of functional areas (`architecture`, `frontend`, `backend`, `database`, `integrations`, `deployment`) and the specific role taken (`led`, `contributed`, `reviewed`, `supplied`).
- **Verified Gate**: Only records with `"verified": true` appear in standard production builds. When updating a project from unverified to verified, ensure client permissions and all metrics are confirmed.

---

## 7. Open Items & Pre-Launch Register (doc 16)

Before full commercial launch, the following items from the Decision Register require resolution:

1. **O-01 / O-02 (Logo & Wordmark)**: Provide vector SVG master asset for the approved mark (current build uses the architectural monogram).
2. **O-05 (Font Licensing)**: Confirm ITF / Fontshare written consent for self-hosting Switzer Variable in production.
3. **O-06 (Domain & Email)**: Confirm ownership and DNS control of `haftech.com`.
4. **O-08 (Founder Portrait)**: Supply high-resolution monochrome founder portrait (current build features an accessible architectural placeholder).
5. **O-09 (Founder Bio)**: Confirm factual dates, academic degrees, and professional certifications.
6. **O-11 to O-14 (Case Studies)**: Obtain client permission sign-offs to display client names and interface captures for REALTYINTEL and DEEN DRIP.
7. **O-16 (Contact SLA)**: Finalize client inquiry response time promise and provision business inbox.

---

## 8. Domain, DNS & Email Launch Runbook (doc 14)

### DNS Records (Vercel)
- **Apex domain (`haftech.com`)**: `A` record pointing to `76.76.21.21`
- **Subdomain (`www.haftech.com`)**: `CNAME` pointing to `cname.vercel-dns.com`

### Email Authentication Records
To ensure 100% inbox delivery and protect the domain against spoofing:
- **SPF**: Publish a single TXT record:
  ```text
  v=spf1 include:_spf.google.com include:sendgrid.net ~all
  ```
  *(Adjust includes based on the active mailbox and transactional provider).*
- **DKIM**: Add the 2048-bit selector TXT/CNAME records provided by the mailbox and Resend/SendGrid providers.
- **DMARC**: Add the following TXT record at `_dmarc.haftech.com`:
  ```text
  v=DMARC1; p=none; rua=mailto:dmarc-reports@haftech.com; pct=100; sp=none
  ```
  *(Transition from `p=none` to `p=quarantine` after initial delivery telemetry confirms alignment).*

---

## 9. License

Proprietary. Copyright © 2026 HafTech Studio and Faruq Ariyo. All rights reserved.
