# HAFTECH-BLUEPRINT

The creative, brand and engineering foundation for HafTech's next digital identity. **Documentation only: no website code has been written.** Version 0.1, prepared 15 November 2026, for review.

**HafTech is the studio. Faruq Ariyo is the founder and engineer behind it.**

## How to read this package
Every statement carries one of three states. They are tracked in `DOCUMENTATION/16-DECISION-REGISTER.md`.

| State | Meaning |
|---|---|
| `CONFIRMED` | Explicitly stated in the project brief |
| `PROPOSED` | Our recommendation; needs approval |
| `OPEN` | Information, asset or decision still missing |

**Nothing marked PROPOSED has been approved. No logo has been approved.**

## Reading order
| If you are... | Start with | Then |
|---|---|---|
| Founder / decision-maker | `PDFs/00-HafTech-Master-Blueprint.pdf` | Doc 16 (decisions) |
| Designer | PDF 01, PDF 02 | Docs 03, 05, 11 |
| Motion designer / creative developer | PDF 03 | Docs 09, 10 |
| Engineer / AI coding agent | PDF 04 | Docs 12, 13, 14, then 07 (schema) |
| Project manager | PDF 05 | Docs 15, 16 |

## File map
### `PDFs/` (designed, printable; generated from the Markdown)
| File | Contains |
|---|---|
| `00-HafTech-Master-Blueprint.pdf` | All sixteen documents, in order |
| `01-Brand-Identity-and-Visual-System.pdf` | Docs 02, 03 |
| `02-Website-UX-and-Experience-Blueprint.pdf` | Docs 04, 05, 06, 07, 08, 11 |
| `03-Motion-and-Interactive-Visualization.pdf` | Docs 09, 10 |
| `04-Technical-Architecture-and-Development.pdf` | Docs 12, 14 |
| `05-Implementation-Roadmap-and-QA.pdf` | Docs 13, 15, 16 |

### `DOCUMENTATION/` (authoritative, editable source)
| File | Purpose |
|---|---|
| `01-PROJECT-BRIEF.md` | Objective, confirmed decisions, inputs inspected, assumptions |
| `02-BRAND-STRATEGY.md` | Purpose, positioning, voice, sample copy |
| `03-VISUAL-DESIGN-SYSTEM.md` | Logo analysis and three directions, colour with contrast data, type, tokens, references |
| `04-INFORMATION-ARCHITECTURE.md` | Sitemap, work vs projects rule, 12-point page specs |
| `05-HOMEPAGE-BLUEPRINT.md` | Eight homepage sections, specified |
| `06-FOUNDER-EXPERIENCE.md` | `/founder` blueprint and attribution rules |
| `07-PORTFOLIO-AND-CASE-STUDIES.md` | Status taxonomy, case-study template, TypeScript schema, project candidates |
| `08-PROJECT-CONTRIBUTIONS.md` | Mandatory ownership and contribution matrix |
| `09-MOTION-DESIGN-SPECIFICATION.md` | Motion tokens and animations M01–M12 with all 16 attributes |
| `10-SIMULATION-AND-VISUALIZATION.md` | Seven visualization concepts, ranked; technology decision |
| `11-RESPONSIVE-DESIGN.md` | Mobile-first rules, breakpoints, component behaviour |
| `12-TECHNICAL-ARCHITECTURE.md` | Stack evaluation, structure, content model, form, security |
| `13-PERFORMANCE-AND-ACCESSIBILITY.md` | Targets, budgets, WCAG 2.2 AA, test checklist |
| `14-SEO-AND-DEPLOYMENT.md` | Domain, DNS, email authentication, structured data, launch runbook |
| `15-IMPLEMENTATION-ROADMAP.md` | Eight phases, gates, essential vs later |
| `16-DECISION-REGISTER.md` | Confirmed / Proposed / Open register |

### `DIAGRAMS/` (Mermaid sources: sitemap, system architecture, component architecture, content workflow, deployment workflow)
Render with `npx @mermaid-js/mermaid-cli -i file.mmd -o file.svg`, or paste into any Mermaid viewer.

### `ASSETS/` (see `ASSETS/README.md`: what is missing and where it goes)

## Using this during implementation
1. Resolve the OPEN items that block the phase you are starting (doc 15 gates).
2. Build from tokens in doc 03 and the motion tokens in doc 09; do not invent new values.
3. Treat the Markdown as the source of truth. If a PDF and a Markdown file differ, the Markdown wins; regenerate the PDF.
4. Never publish a project until its record is `verified` with a completed contribution matrix (docs 07, 08).
5. Record any change of decision in doc 16.

## Known limitations
- **Logo:** analysed from a low-resolution raster; no vector source supplied.
- **Fonts in the PDFs:** Boska, Switzer and Monaspace Neon were not retrievable in the authoring environment, so the PDFs use stand-ins (Lora, Inter, DejaVu Sans Mono). The Markdown specifies the real typefaces.
- **External references:** retrieved as text or listings only; none were visually inspected (doc 03 §3.9).
- **No founder photos, project screenshots or repository access** were provided; all related content is placeholder or `OPEN`.
- Licence terms (Switzer self-hosting, Boska) should be confirmed at the source before launch.
