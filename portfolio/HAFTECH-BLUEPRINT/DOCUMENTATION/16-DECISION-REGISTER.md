# 16 — Design Decision Register

**Objective.** The authoritative list of what is decided, what is proposed and what is missing. **No proposal is silently converted into a decision.**
Classifications: **CONFIRMED** (explicit in the brief) · **PROPOSED** (our recommendation, needs approval) · **OPEN** (information, asset or decision missing).

## 16.1 CONFIRMED
| ID | Decision | Source |
|---|---|---|
| C-01 | HafTech is the studio; Faruq Ariyo is the founder and engineer; one website, two complementary identities | Brief §1.2 |
| C-02 | Editorial/architectural design; high-end cinematic motion | Brief §2.1 |
| C-03 | Avoid generic dark/blue-gradient, glassmorphism, glowing spheres, decorative 3D, repeated rounded cards, cyberpunk, desktop-first | Brief §2.2 |
| C-04 | Provisional palette (ten tokens in doc 03) is the starting direction | Brief §3.1 |
| C-05 | Explore Boska, Switzer, Monaspace Neon | Brief §3.2 |
| C-06 | Proposed sitemap is the starting structure and may be improved | Brief §5 |
| C-07 | Preferred stack (Next.js, React, TS, Tailwind, GSAP, selective Three.js, Vercel) to be evaluated | Brief §12 |
| C-08 | Targets: Lighthouse 90/95/95; LCP ≤ 2.5 s, INP ≤ 200 ms, CLS ≤ 0.1 | Brief §13 |
| C-09 | Preferred domain direction haftech.com, subject to availability | Brief §14 |
| C-10 | Four initial projects (REALTYINTEL, AXIORA, DEEN DRIP, CAHOOTZ) as content candidates | Brief §8 |
| C-11 | Mandatory contribution and ownership matrix | Brief §8 |
| C-12 | No invented statistics, testimonials, outcomes or unsupported superlatives | Brief §4, §8 |
| C-13 | No implementation until documentation is reviewed | Brief |

## 16.2 PROPOSED (awaiting approval)
| ID | Proposal | Doc |
|---|---|---|
| P-01 | Logo recommendation: B (refined engineering identity) with A's monochrome discipline and C's monogram as standalone symbol | 03 |
| P-02 | Replace muted text #74756F with #686963 (AA); concrete and highlight decorative only on light surfaces | 03 |
| P-03 | Add `--ht-border-strong` #8E8D85 and dark-mode highlight #9DB5CF | 03 |
| P-04 | Brand purpose, mission, vision, values, positioning statement, vocabulary | 02 |
| P-05 | Rename `/projects` label to "Products & experiments"; add `/privacy`, `/404`; journal optional at launch | 04 |
| P-06 | Work/project distinction: "if someone else owns it it is /work; if we own it it is /projects" | 04 |
| P-07 | Homepage section specifications and all sample copy | 05, 02 |
| P-08 | Founder page structure and writing prompts | 06 |
| P-09 | Project status taxonomy and schema; `verified` gate in CI | 07 |
| P-10 | Motion tokens and catalogue M01–M12; no smooth-scroll library by default | 09 |
| P-11 | Ranked visualization plan: explorer + request trace at launch; no 3D at launch | 10 |
| P-12 | Breakpoints 480/768/1024/1440 and 48 px touch targets | 11 |
| P-13 | MDX + typed data content model; no CMS/DB/auth/admin at launch | 12 |
| P-14 | Contact form with route handler, bot check, transactional email, no database | 12 |
| P-15 | Performance budgets (170 KB JS, 40 KB explorer chunk, ≤ 1 MB first view) | 13 |
| P-16 | Cookieless analytics | 12 |
| P-17 | Eight-phase roadmap and gates G1–G6 | 15 |

## 16.3 OPEN
| ID | Missing item | Needed from | Blocks |
|---|---|---|---|
| O-01 | Final logo direction and approval | Founder | G1 |
| O-02 | Vector/source file of the current logo (or permission to redraw) | Founder | Phase 01 |
| O-03 | Final wordmark | Founder + designer | G1 |
| O-04 | Final colour system sign-off | Founder | G1 |
| O-05 | Switzer web-font hosting: Fontshare API vs ITF written consent for self-hosting; Boska self-hosting terms | Founder/legal check at fontshare.com | Phase 01 |
| O-06 | Domain availability/ownership for haftech.com (founder's other materials mention contact@haftech.com; confirm) | Founder | G6 |
| O-07 | Final homepage and page copy | Founder | G2 |
| O-08 | Founder portrait photography | Founder / photographer | G5 |
| O-09 | Founder biography facts, dates, education, any awards (with evidence) | Founder | G5 |
| O-10 | GitHub, LinkedIn and other profile URLs | Founder | G5 |
| O-11 | Project screenshots for each case study | Founder / clients | G4 |
| O-12 | Verified status for REALTYINTEL, AXIORA, DEEN DRIP, CAHOOTZ | Founder | G4 |
| O-13 | Ownership and contribution matrices for each project | Founder (+ collaborators) | G4 |
| O-14 | Client permissions to name clients or show work | Founder/clients | G4 |
| O-15 | Which other projects (if any) to include | Founder | G4 |
| O-16 | Contact-form reply-time promise and business email provider | Founder | Phase 06 |
| O-17 | Analytics choice and legal review of consent requirements | Founder | Phase 06 |
| O-18 | Whether an admin dashboard will ever be required | Founder | Future |
| O-19 | Team capacity and timeline | Founder | Roadmap dating |
| O-20 | Final technology choices (versions pinned at project start) | Engineering lead | Phase 02 |
| O-21 | Manual review of external references listed in doc 03 §3.9 (not visually inspected) | Design team | Phase 01 |

## 16.4 Change log
Entries are appended with date, ID, previous state, new state, approver. Initial state of this register: as listed above (authoring date 15 November 2026).
