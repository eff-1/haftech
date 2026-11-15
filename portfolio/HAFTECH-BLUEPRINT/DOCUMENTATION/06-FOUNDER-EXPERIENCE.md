# 06 — Founder Experience (`/founder`)

**Objective.** An editorial engineering profile of Faruq Ariyo that reinforces HafTech instead of competing with it.
**Status:** structure `PROPOSED`. **All biographical content is `OPEN` until the founder supplies or confirms it.** Nothing below states facts that were not provided.

## 6.1 Principles
1. **HafTech is the studio. Faruq is the founder and engineer behind it.** The page is reached from the studio, never presented as a separate brand.
2. **More personal in tone, same system in form.** Same grid, tokens and motion language, with a slightly warmer editorial voice and first person ("I").
3. **Evidence over adjectives.** Every claim links to work, code, writing or a record.
4. **Attribution is explicit** (doc 08). Personal projects and studio projects are labelled differently.

## 6.2 Page sequence
| # | Section | Content | Layout / behaviour |
|---|---|---|---|
| 1 | Introduction | Portrait, name, role line, 2–3 sentence summary | Large portrait left, name in Boska `--step-6`; metadata strip: ROLE · LOCATION · STUDIO |
| 2 | Professional experience | Roles and periods, factual one-liners | Ruled timeline list, metadata in Monaspace |
| 3 | Engineering philosophy | 3–4 principles in his own words | Large pull-quotes, one per viewport on desktop |
| 4 | Technical capabilities | Grouped skills (frontend, backend, data, infrastructure) | Plain editorial lists, no skill bars or percentages |
| 5 | Selected engineering work | 3–4 items with role stated | Same feature component as `/work`, with a "Role" row |
| 6 | Independently developed products | Items owned by the founder, status labelled | Distinct label: "Independent — not a HafTech client project" |
| 7 | Currently building | 1–3 active items with honest status | Short dated entries; updated manually |
| 8 | Technical experiments | Small explorations, repos, prototypes | Compact index |
| 9 | Writing and notes | Latest journal posts | Hidden if fewer than 2 posts |
| 10 | Professional links | GitHub, LinkedIn (and others the founder approves) | Plain link list, verified URLs only |
| 11 | Contact | Same form pattern as `/contact` | Reuses component |

## 6.3 Content inventory (what we have, what we need)
| Item | Status | Note |
|---|---|---|
| Name, role (founder, full-stack software engineer) | `CONFIRMED` in brief | |
| Years of experience, location, education, awards | `OPEN` | The founder has mentioned some of these in separate planning (for example "4+ years" in full-stack work, and a "Best Intern of the Year" recognition). **Re-confirm wording and evidence before publishing any of it**; awards need a source or document |
| Portrait photography | `OPEN` | Needs commissioning or supply; art direction in §6.5 |
| GitHub and LinkedIn URLs | `OPEN` | Brief mentions both; only verified URLs go live |
| Engineering philosophy text | `OPEN` | Draft prompts in §6.4 |
| Project involvement per item | `OPEN` | Filled through the contribution matrix |

## 6.4 Writing prompts for the founder (to produce authentic copy)
1. What do you refuse to ship, and why?
2. Describe a technical decision you reversed and what changed your mind.
3. What does "maintainable" mean in practice for you?
4. What would you tell a client who wants everything in the first release?
5. What are you currently learning, and why?
Answers are edited for clarity and approved by the founder; they are not paraphrased into marketing language.

## 6.5 Photography and art direction
Natural light, working environment (desk, screens, notebook), real posture, no stock poses, no forced smile requirement. One 4:5 hero portrait, one 3:2 environmental image, one detail shot (hands/keyboard/notes). Graded to the warm-neutral palette. Alt text describes the scene, not "founder photo".

## 6.6 Homepage teaser vs full page
The homepage section (doc 05, §07) shows portrait, 40-word introduction and one link. The full page adds depth and evidence. The studio must never read as one-person-dependent: services, process and case studies are described in "we" language; the founder page uses "I".

## 6.7 Attribution of personal vs studio projects
| Case | Label | Appears on |
|---|---|---|
| Built by HafTech for a client | "Client work · HafTech" | `/work`, founder page with role |
| Built and owned by HafTech | "HafTech product" | `/projects`, founder page |
| Built and owned by Faruq outside HafTech | "Independent project by Faruq Ariyo" | `/founder`, optionally `/projects` |
| Built by a team including others | "Contributor roles" table (doc 08) | Wherever it appears |

## 6.8 Motion and interaction
Portrait mask reveal (900 ms), pull-quotes fade in while scrolling (opacity scrub only), timeline line draws as it enters (1200 ms). No pinning, no cursor effects. Reduced motion: static.

## 6.9 SEO
`Person` JSON-LD with `name`, `jobTitle`, `worksFor` (HafTech) and `sameAs` for verified profiles. Title "Faruq Ariyo — Founder and software engineer at HafTech".

## 6.10 Acceptance criteria
- Every factual line has an approved source.
- Page passes the "studio first" test: a first-time visitor identifies HafTech as the brand within 5 seconds.
- Personal projects are never presented as client work or vice versa.
