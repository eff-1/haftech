// Proposed copy: needs founder approval. Edit here.
export const copy = {
  siteName: "HafTech",
  founderName: "Faruq Ariyo", // OPEN: public name (Ariyo vs Oladura)
  // VOICE (decided): "we" for studio copy (collaborators join seasonally), "I" on /founder.
  // Never state team size, names or headcount; project pages credit people explicitly (doc 08).
  description:
    "HafTech is a software studio led by Faruq Ariyo. We design and engineer digital products, intelligent systems and software experiences.",
  hero: {
    label: "Studio · Founder-led · Software engineering",
    h1: ["Ideas deserve more than execution.", "They deserve engineering."],
    support:
      "We design and engineer digital products, intelligent systems and software experiences that help ambitious businesses move forward.",
  },
  closing: "Have something worth building?",
};

export const nav = [
  { href: "/work", label: "Work" },
  { href: "/projects", label: "Projects" },
  { href: "/services", label: "Services" },
  { href: "/approach", label: "Approach" },
  { href: "/founder", label: "Founder" },
  { href: "/contact", label: "Contact" },
];


// ---- Homepage section copy (proposed, needs founder approval) ----
export const philosophy = {
  h2: "We don't just build interfaces. We engineer the systems behind them.",
  blocks: [
    { label: "Product engineering", text: "We start from what the product has to do, then shape the code, data and interface around it so the first version can grow without a rewrite." },
    { label: "Systems and infrastructure", text: "Authentication, APIs, databases and hosting are designed together. When they fit, the product is easier to run, change and hand over." },
    { label: "Digital experiences", text: "Interfaces are fast, readable and usable by keyboard and touch. Design decisions are made in code, so what you review is what ships." },
  ],
};

export const layers = [
  { name: "User interface", text: "What people see and touch, built to work on any screen and with a keyboard." },
  { name: "Application layer", text: "Routing, state and rendering that turn data into screens." },
  { name: "Authentication", text: "Who is allowed in, and what each person may do." },
  { name: "API", text: "The contract between the interface and the systems behind it." },
  { name: "Business logic", text: "The rules specific to the product, kept in one place." },
  { name: "Database", text: "Where data lives, shaped to match how the product uses it." },
  { name: "Infrastructure", text: "Hosting, deployments, environments and monitoring." },
  { name: "External integrations", text: "Payments, email and other services, connected through the API." },
];
export const layersCaption =
  "An illustrative architecture. It is not a depiction of every HafTech deployment.";

export const capabilities = [
  { slug: "custom-software", title: "Custom software", line: "Software shaped around how your business works.", points: ["Internal tools and operational systems", "Replacing spreadsheets and manual steps", "Built to be maintained after hand-over"] },
  { slug: "web-applications", title: "Web applications", line: "Fast, accessible products that run in the browser.", points: ["Customer-facing apps and dashboards", "Responsive on phone, tablet and desktop", "Accessible by keyboard and screen reader"] },
  { slug: "backend-engineering", title: "Backend engineering", line: "The data and logic behind the screen.", points: ["Database design and migrations", "Background jobs and notifications", "Authentication and role-based access"] },
  { slug: "api-development", title: "API development", line: "Clear interfaces between your systems and others.", points: ["REST APIs with documented contracts", "Payment and third-party integrations", "Validation and error handling"] },
  { slug: "business-automation", title: "Business automation", line: "Repetitive work handed to software.", points: ["Follow-ups and messaging workflows", "Data capture and reporting", "Human review where it matters"] },
  { slug: "product-architecture", title: "Product architecture", line: "Technical decisions made early and written down.", points: ["Scoping and stack selection", "Data modelling and system design", "Roadmaps tied to what can be built"] },
  { slug: "infrastructure-deployment", title: "Infrastructure and deployment", line: "Getting software live and keeping it running.", points: ["Hosting and environment setup", "Deployment pipelines", "Monitoring and handover notes"] },
];

export const methodology = {
  intro: "Four stages. Each ends with something you can inspect.",
  stages: [
    { slug: "discover", n: "01", title: "Discover", input: "Your goals, constraints and existing systems.", activity: "Interviews, audit, scoping.", output: "A written scope and a list of open questions." },
    { slug: "architect", n: "02", title: "Architect", input: "The agreed scope.", activity: "Data model, system design, interface structure.", output: "An architecture outline and a build plan." },
    { slug: "engineer", n: "03", title: "Engineer", input: "The plan.", activity: "Iterative builds with working previews.", output: "Running software you can try at each step." },
    { slug: "deliver", n: "04", title: "Deliver", input: "A tested build.", activity: "Deployment, documentation, hand-over.", output: "Live software and the notes to run it." },
  ],
};

export const founderIntro = {
  pull: "Founded and engineered by Faruq Ariyo",
  // OPEN: founder to supply the real introduction; this is the approved-pending one-liner only.
  text: "Faruq Ariyo is the founder and a full-stack engineer. He designs and builds HafTech's products.",
};
