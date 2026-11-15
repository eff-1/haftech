# 15 — Implementation Roadmap

**Objective.** A phased, practical plan with explicit approvals. Durations are not promised because team capacity is unknown (`OPEN`); effort is expressed in relative size (S/M/L).
**Status:** `PROPOSED`.

## 15.1 Gates (what must be approved before proceeding)
| Gate | Required approval | Blocks |
|---|---|---|
| G1 | Logo direction, wordmark, colour tokens (incl. darker muted text), typography licences | Phase 02 onward |
| G2 | Homepage layout and copy | Phase 03 |
| G3 | Motion and visualization specs | Phase 04 build of signature features |
| G4 | Verified project facts + contribution matrices + screenshots | Phase 04 publication |
| G5 | Founder bio, portrait, link list | Phase 05 publication |
| G6 | Domain and email decisions | Phase 08 |

## 15.2 Phases

### PHASE 01 — Brand identity and design foundation (M)
- **Objectives:** settle identity and tokens. **Deliverables:** vector logo masters (A/B/C exploration → one), colour and type tokens, component sheet, font licensing resolved. **Dependencies:** vector source or redraw permission. **Technical:** token CSS file, Storybook-optional specimen page. **Design:** logo suite, specimen. **Acceptance:** G1 approved; AA contrast verified for all pairs. **Risks:** logo scope creep; Switzer self-hosting terms. **Checklist:** [ ] logo masters [ ] tokens [ ] type specimen [ ] licence decision.

### PHASE 02 — Homepage design and prototype (M)
- **Objectives:** designed, responsive homepage prototype. **Deliverables:** mobile-first designs of all 8 sections, static HTML/React prototype with real content placeholders. **Dependencies:** G1, approved copy (G2). **Technical:** Next.js skeleton, layout, nav, sections without motion. **Design:** wireframes → hi-fi. **Acceptance:** passes responsive checks, Lighthouse ≥ 90 without motion. **Risks:** placeholder content leaking as fact. **Checklist:** [ ] 8 sections [ ] responsive matrix [ ] a11y baseline.

### PHASE 03 — Motion and visualization system (L)
- **Objectives:** implement motion tokens and the architecture explorer. **Deliverables:** motion library (M01–M11), explorer with request trace, reduced-motion paths. **Dependencies:** G3. **Technical:** GSAP, SVG, lazy loading. **Design:** diagram illustration. **Acceptance:** specs matched ±10 %; budgets met; keyboard/touch tested. **Risks:** performance, complexity. **Checklist:** [ ] tokens [ ] hero [ ] explorer [ ] reduced motion [ ] budgets.

### PHASE 04 — Portfolio and case studies (M)
- **Objectives:** project system and first case studies. **Deliverables:** schema, `/work` and `/projects`, 2–3 verified case studies. **Dependencies:** G4. **Technical:** content layer, CI validation. **Design:** feature layouts, real screenshots. **Acceptance:** no unverified project published; every project has a contribution matrix. **Risks:** missing evidence, client permissions. **Checklist:** [ ] schema [ ] templates [ ] verified items.

### PHASE 05 — Founder experience (S–M)
- **Objectives:** `/founder` and homepage teaser. **Deliverables:** page, portrait integration, Person schema. **Dependencies:** G5. **Acceptance:** every fact sourced; studio-first test passed. **Risks:** missing photography; overstatement. **Checklist:** [ ] bio approved [ ] portrait [ ] links verified.

### PHASE 06 — Services, approach, journal and contact (M)
- **Objectives:** remaining pages and working form. **Deliverables:** `/services`, `/approach`, `/contact` with email delivery and bot protection; `/journal` only if ≥ 2 articles. **Dependencies:** approved copy; email provider. **Acceptance:** form delivers to inbox; spam controls tested. **Risks:** deliverability. **Checklist:** [ ] pages [ ] form [ ] rate limiting.

### PHASE 07 — Performance, accessibility and SEO (M)
- **Objectives:** meet targets. **Deliverables:** audit report, fixes, structured data, OG images. **Acceptance:** doc 13 checklist complete. **Risks:** late discovery of animation cost; keep budgets in CI from Phase 02. **Checklist:** [ ] Lighthouse [ ] axe [ ] manual a11y [ ] schema validation.

### PHASE 08 — Deployment and launch (S)
- **Objectives:** go live safely. **Deliverables:** domain, DNS, email auth, production deploy, monitoring. **Dependencies:** G6. **Acceptance:** doc 14 runbook complete. **Risks:** DNS/email misconfiguration. **Checklist:** [ ] domain [ ] SPF/DKIM/DMARC [ ] Search Console [ ] monitoring.

## 15.3 Essential for launch vs later
| Essential | Optional / later |
|---|---|
| Home, Work (≥ 2 verified items), Services, Approach, Founder, Contact, Privacy | Journal (until ≥ 2 articles), Projects index if < 2 items |
| Architecture explorer (A+B) | Deployment pipeline (D), modular product view (C), blueprint (F) |
| Reduced-motion and a11y compliance | Cursor interaction (M12), 3D |
| Analytics (cookieless) | CMS/admin dashboard, auth, database |

## 15.4 Cross-phase risks
| Risk | Impact | Mitigation |
|---|---|---|
| Unverified project facts | Credibility | `verified` gate, "needs verification" status |
| Missing portrait/screenshots | Visual weakness | Commission early; placeholders clearly labelled |
| Motion ambition vs performance | Metrics miss targets | Budgets in CI from the start |
| Single-person bottleneck | Delays | Parallelise design and content; keep scope tight |

## 15.5 Acceptance criteria for the roadmap
Each gate has a named approver; each phase has dated deliverables once capacity is known; no phase starts before its gate is passed.
