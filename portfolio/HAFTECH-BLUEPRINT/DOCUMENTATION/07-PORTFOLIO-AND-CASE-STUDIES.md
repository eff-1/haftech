# 07 — Portfolio and Case-Study System

**Objective.** A reusable, honest framework for presenting projects, plus the status of the four known candidates.
**Rule:** never invent outcomes, metrics, testimonials or launch status. A missing fact is recorded as `OPEN`, not guessed.

## 7.1 Project status taxonomy `PROPOSED`
| Status | Meaning | Marker (shape + text, not colour alone) |
|---|---|---|
| Concept | Idea defined, no working build | ○ CONCEPT |
| Exploring | Prototypes or research under way | ◔ EXPLORING |
| In development | Actively being built | ◑ IN DEVELOPMENT |
| Internal testing | Working, tested by the team only | ◕ INTERNAL TESTING |
| Live | Publicly usable | ● LIVE |
| Archived | No longer active | ▢ ARCHIVED |

A project's status needs a "last verified" date. Status wording is shown on every card and header.

## 7.2 Case-study template
Each section is optional if the information does not exist; the section is removed, not filled with generic text.

| # | Section | Contents | Evidence required |
|---|---|---|---|
| 1 | Introduction | One-sentence summary, category, status, ownership, role, dates | Founder confirmation |
| 2 | Problem statement | Who has what problem | Client or founder source |
| 3 | Background | Context, market, prior solutions | Source if factual |
| 4 | Objectives | What success meant | Brief or founder statement |
| 5 | Constraints | Time, budget, tech, regulation | Founder |
| 6 | Product approach | Scope decisions | Founder |
| 7 | Technical architecture | Diagram; layers and responsibilities | Actual architecture |
| 8 | Design decisions | Interface and UX choices with rationale | Design files |
| 9 | Implementation | Stack, notable code or flows | Repository or notes |
| 10 | Challenges | Real obstacles | Founder |
| 11 | Solutions | How each was addressed | Founder |
| 12 | Outcomes | **Only verified results**; otherwise "Not yet measured" | Data or documents |
| 13 | Lessons | What was learned | Founder |
| 14 | Credits and contributions | Matrix from doc 08 | Mandatory |

**Media:** real screenshots, responsive previews, architecture diagrams (SVG/Mermaid), annotated code excerpts. No mock screenshots.

## 7.3 Project data schema (TypeScript) `PROPOSED`
```ts
export type ProjectStatus =
  | "concept" | "exploring" | "in-development"
  | "internal-testing" | "live" | "archived";

export type Ownership =
  | "client" | "haftech" | "founder-independent" | "joint";

export interface Contribution {
  area: "product-design" | "frontend" | "backend" | "architecture"
      | "database" | "deployment" | "integrations" | "other";
  who: string;                 // person or organisation
  role: "led" | "contributed" | "reviewed" | "supplied";
  notes?: string;
}

export interface Project {
  slug: string;
  title: string;
  summary: string;            // one sentence
  category: string;
  type: "work" | "project";   // decides /work vs /projects
  ownership: Ownership;
  ownerName?: string;
  status: ProjectStatus;
  statusVerifiedOn: string;   // ISO date
  roles: string[];            // HafTech/founder roles
  technologies: string[];
  image?: { src: string; alt: string; width: number; height: number };
  links?: { live?: string; repo?: string; caseStudy?: string };
  contributions: Contribution[];
  verified: boolean;          // false = cannot appear in production
  caseStudy?: string;         // MDX path
}
```
A CI check fails the build when `verified` is false for an item marked for publishing.

## 7.4 Known candidates (STEP 2: synthesize)
For each: what the brief says, what is unknown, what we need. Nothing else is assumed.

### REALTYINTEL
- **Known (brief):** business lead intelligence and lead-management work.
- **Needs verification:** client vs owned; status; HafTech/founder role; what was delivered; any contributors; whether it can be shown publicly.
- **Materials needed:** screenshots, architecture notes, permission to name any client.
- **Suggested type pending facts:** `/work` if client-owned; `/projects` if owned.

### AXIORA
- **Known (brief):** AI-native business operating system concept with business operations and management modules.
- **Needs verification:** current status (the brief says "concept"); module list; stack; whether any build exists.
- **Materials needed:** product description, module map, any prototype screens or diagrams.
- **Suggested type:** `/projects` (owned), status "Concept" unless evidence says otherwise.

### DEEN DRIP
- **Known (brief):** e-commerce experience for an Islamic-inspired clothing brand.
- **Needs verification:** who owns the brand; whether the store is live; platform and stack; HafTech/founder scope.
- **Materials needed:** live URL, screenshots, permission from the brand owner.
- **Suggested type:** `/work` if for a client.

### CAHOOTZ
- **Known (brief):** university-focused study collaboration and learning platform concept.
- **Needs verification:** status; scope of anything built; whether the name is final.
- **Materials needed:** concept description, wireframes or prototype.
- **Suggested type:** `/projects`, status "Concept" or "Exploring".

### Other possible candidates
The founder has mentioned other projects in separate planning (for example a marketplace, an ongoing build called BUILDRIFT, and a Telegram bot). They are **not part of this brief**; include only if the founder asks and supplies facts.

## 7.5 Homepage selection rule
Show up to four items with verified status. If fewer than two have screenshots and verified status at launch, show two and a "More projects" link rather than padding.

## 7.6 Acceptance criteria
- Every item validates against the schema.
- No outcomes appear without a source.
- Every item has a contribution matrix (doc 08).
- Status labels use text plus shape.
