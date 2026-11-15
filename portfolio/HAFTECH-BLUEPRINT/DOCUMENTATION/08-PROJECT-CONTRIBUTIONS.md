# 08 — Project Contributions and Ownership

**Objective.** A mandatory framework that records who owns each project and who did what, so no work is misattributed.
**Rule:** do not claim that Faruq personally completed work performed by someone else. If in doubt, write "contributed" or leave the line `OPEN`.

## 8.1 Ownership and attribution vocabulary
| Term | Meaning |
|---|---|
| Owner | Legal/commercial owner of the product |
| Led | Accountable for direction and delivery of that area |
| Contributed | Did part of the work, not accountable for the whole |
| Reviewed | Reviewed or advised; did not produce |
| Supplied | Provided by a third party (assets, library, service) |
| Not involved | Explicitly recorded, so the absence is a statement |

## 8.2 Contribution matrix template (copy per project)
Fill every cell with one value from §8.1 plus a name. `OPEN` is a valid value until verified.

| Area | Faruq Ariyo | HafTech (studio) | Third-party contributor(s) | Client | Notes / evidence |
|---|---|---|---|---|---|
| Ownership of product | | | | | |
| Product design | | | | | |
| UI design | | | | | |
| Frontend | | | | | |
| Backend | | | | | |
| System architecture | | | | | |
| Database design | | | | | |
| Deployment / DevOps | | | | | |
| Integrations | | | | | |
| Content and copy | | | | | |
| Project management | | | | | |
| Client responsibilities (assets, approvals, data) | | | | | |

**Metadata to record:** project slug, last verified date, verifier (name), evidence link (commit history, contract, invoice, design file).

## 8.3 Initial matrices for the catalogue (all unverified)
| Project | Ownership | Faruq | HafTech | Third parties | Client | Verified? |
|---|---|---|---|---|---|---|
| REALTYINTEL | `OPEN` | `OPEN` | `OPEN` | `OPEN` | `OPEN` | No |
| AXIORA | `OPEN` (likely founder/HafTech) | `OPEN` | `OPEN` | `OPEN` | n/a | No |
| DEEN DRIP | `OPEN` | `OPEN` | `OPEN` | `OPEN` | `OPEN` | No |
| CAHOOTZ | `OPEN` (likely founder/HafTech) | `OPEN` | `OPEN` | `OPEN` | n/a | No |

These stay `OPEN` until the founder fills them in; the site must not publish a project with an unverified matrix.

## 8.4 Public presentation
On each project page, a compact "Credits" block lists: owner; HafTech role; founder role; collaborators (with permission); client responsibilities. Example format:
```
Owner         Client (named with permission)
HafTech role  Design, frontend, backend, deployment
Founder role  Led architecture and backend   <- only if true
Contributors  <name> — UI design             <- only with consent
```

## 8.5 Third-party and legal considerations
- Obtain written permission before naming clients or contributors.
- Respect NDAs; use anonymised descriptions ("a Nigerian retail brand") if required.
- Confirm licences for any third-party code or assets shown.
- Keep screenshots free of personal data.

## 8.6 Process
1. Founder fills the matrix. 2. A second person (or the client) confirms disputed lines where possible. 3. `verified: true` set in the project file. 4. CI allows the project into production. 5. Re-verify at each major update.

## 8.7 Acceptance criteria
Every published project has a completed matrix; every line is either specific or marked "Not involved"; no line uses "led" without evidence.
