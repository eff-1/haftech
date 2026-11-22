export interface HeroStoryStep {
  num: string;
  tag: string;
  tabLabel: string;
  headlineLines: { text: string; highlight?: string }[];
  support: string;
  videoSrc: string;
  posterSrc: string;
  posterAlt: string;
}

export const HERO_STEPS: HeroStoryStep[] = [
  {
    num: "01",
    tag: "IDEA",
    tabLabel: "01 / IDEA",
    headlineLines: [
      { text: "Ideas deserve" },
      { text: "more than ", highlight: "execution." },
    ],
    support: "Every strong product starts with a clear problem.",
    videoSrc: "/media/hero/step-01-idea.mp4",
    posterSrc: "/media/hero/step-01-idea.webp",
    posterAlt: "Initial interface sketch and product concept drafting on studio desk",
  },
  {
    num: "02",
    tag: "BLUEPRINT",
    tabLabel: "02 / BLUEPRINT",
    headlineLines: [
      { text: "From idea to" },
      { text: "", highlight: "blueprint." },
    ],
    support: "Architecture, data models and interfaces aligned before code.",
    videoSrc: "/media/hero/step-02-blueprint.mp4",
    posterSrc: "/media/hero/step-02-blueprint.webp",
    posterAlt: "Architectural wireframe and structural system blueprint transformation",
  },
  {
    num: "03",
    tag: "ENGINEERING",
    tabLabel: "03 / ENGINEERING",
    headlineLines: [
      { text: "They deserve" },
      { text: "", highlight: "engineering." },
    ],
    support: "Resilient systems built cleanly to scale without rewrites.",
    videoSrc: "/media/hero/step-03-engineering.mp4",
    posterSrc: "/media/hero/step-03-engineering.webp",
    posterAlt: "Software engineering workspace showing system layers coming together",
  },
  {
    num: "04",
    tag: "PRODUCT",
    tabLabel: "04 / PRODUCT",
    headlineLines: [
      { text: "Built to work." },
      { text: "Made to ", highlight: "matter." },
    ],
    support: "Products, systems and automation, delivered end to end.",
    videoSrc: "/media/hero/step-04-product.mp4",
    posterSrc: "/media/hero/step-04-product.webp",
    posterAlt: "Finished digital product display environment from HafTech studio",
  },
];
