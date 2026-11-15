# 10 — Simulation and Interactive Visualization System

**Objective.** Select technically meaningful interactive visuals that make HafTech's engineering visible, ranked by value and cost.
**Principle:** a sophisticated 2D visualization is preferred over unnecessary 3D. Technology follows the idea, not the other way round.

## 10.1 Concepts
Complexity: S/M/L. Tech: recommendation.

### A. Interactive system architecture explorer — **Signature, launch**
- **Visitor sees:** a layered section-view diagram of a generic product (UI → app → auth → API → logic → DB → infra, plus integrations).
- **Can interact with:** each layer (hover, tap, keyboard) to reveal responsibilities, typical technologies and common failure points.
- **Concept communicated:** separation of concerns; that interfaces rest on systems.
- **Why it belongs:** shows engineering thinking in 30 seconds; central to the "engineer the systems behind them" message.
- **Assets:** SVG illustration; copy per layer.
- **Technology:** inline SVG + React state + CSS (M07). **Complexity:** M.
- **Performance risks:** low. **Mobile:** layer list + mini diagram. **A11y:** semantic list fallback, `role="img"` with description.

### B. Request lifecycle animation — **Signature, launch (part of A)**
- **Sees:** a marker travelling through the layers when a user action is simulated (e.g. "Submit order").
- **Interacts:** play, pause, step, replay, choose scenario (read, write, authenticated).
- **Communicates:** latency path, authentication gate, database round trip, caching.
- **Assets:** SVG paths; scenario scripts. **Tech:** SVG + GSAP timeline (M08). **Complexity:** M.
- **Risks:** timeline sync bugs; keep to one timeline. **Mobile:** vertical path. **A11y:** step list narrates each leg; live-region updates optional.

### C. Modular product architecture visualization — **Post-launch**
- **Sees:** a product (e.g. a business operating system) as modules around a core with shared services.
- **Interacts:** toggle modules on/off to see dependencies.
- **Communicates:** modularity and extensibility. **Assets:** module data from real projects (needs verified facts). **Tech:** SVG + React. **Complexity:** M. **Risks:** depends on verified project data. **Mobile:** stacked list. **A11y:** checkbox list.

### D. Deployment pipeline visualization — **Post-launch**
- **Sees:** commit → CI → preview → tests → production.
- **Interacts:** hover a stage for detail; replay a "passing" and "failing" run.
- **Communicates:** delivery discipline. **Tech:** SVG + CSS. **Complexity:** S. **Risks:** low. **Mobile:** vertical stepper. **A11y:** ordered list.

### E. Interactive product lifecycle — **Launch (reuse methodology)**
- **Sees:** idea → planning → architecture → development → testing → deployment.
- **Interacts:** scroll-linked progress and anchored stages (doc 05 §06).
- **Communicates:** process transparency. **Tech:** CSS + ScrollTrigger. **Complexity:** S.

### F. Interactive technical blueprint — **Stretch**
- **Sees:** an engineering-drawing style sheet of a real HafTech system with callouts.
- **Interacts:** hover/tap callouts; zoom/pan on desktop.
- **Communicates:** depth and craft. **Tech:** SVG; Canvas only if drawing > ~2,000 elements. **Complexity:** L (needs real architecture data and illustration time). **Risks:** content and art-direction effort.

### G. Project-specific architecture explorer — **Per case study**
- **Sees:** the actual architecture of one project.
- **Interacts:** same engine as A with project data.
- **Communicates:** real decisions. **Tech:** same component, data-driven. **Complexity:** S once A exists. **Risks:** only possible with verified architecture; never fabricate.

## 10.2 Ranking by value vs cost
| Rank | Concept | Value | Cost | Phase |
|---|---|---|---|---|
| 1 | A + B explorer with request trace | Very high | Medium | Launch |
| 2 | E lifecycle / methodology | High | Low | Launch |
| 3 | G project-specific explorer | High | Low after A | Per project |
| 4 | D deployment pipeline | Medium | Low | Post-launch |
| 5 | C modular product view | Medium | Medium | Post-launch |
| 6 | F interactive blueprint | High (distinctive) | High | Stretch |

## 10.3 Technology decision
| Need | Choice | Why |
|---|---|---|
| Diagrams, layers, flows | **SVG** | Resolution-independent, accessible, easy to style |
| State changes | **CSS + React** | Cheapest, most robust |
| Sequenced motion | **GSAP timeline** | Control, pause/step |
| Many particles or thousands of nodes | Canvas | Not needed at launch |
| 3D | **Not recommended at launch** | No concept above needs depth; adds bundle weight (Three.js), GPU cost and accessibility burden |

If 3D is explored later (for example an exploded isometric blueprint), isolate it in a lazily loaded component, cap the pixel ratio, provide a static fallback image and obtain approval against the performance budget first.

## 10.4 Loading strategy (heavy visuals without hurting first load)
1. Render a static SVG/HTML fallback in the server HTML (also the no-JS state).
2. Load the interactive layer with `next/dynamic`, triggered by IntersectionObserver at ~1 viewport before the section.
3. Defer GSAP timelines until first interaction ("Trace a request").
4. Keep the section's JS under a 40 KB gzip target, measured in CI.
5. On `save-data` or low-memory devices, keep the static fallback only.

## 10.5 Content guardrails
- Caption: "Illustrative architecture, not a depiction of every HafTech deployment."
- Technology names in the diagram are examples, not claims of use on a given project.
- No metrics (latency numbers, uptime) unless real.

## 10.6 Accessibility
Every visualization has a text equivalent; interactive elements are keyboard operable with visible focus; animation is user-triggered and pausable; no information conveyed only by colour or motion.

## 10.7 Acceptance criteria
Explorer works with keyboard, touch and mouse; works with JS disabled (static content); passes axe with zero serious issues; lazy chunk under budget; reduced-motion mode functional.
