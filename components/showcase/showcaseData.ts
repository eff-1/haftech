export interface ShowcaseProject {
  id: string;
  num: string;
  slug: string;
  href: string;
  name: string;
  headline: string;
  description: string;
  categories: string[];
  technologies: string[];
  year: string;
  meta: string;
  image: string;
  imageAlt: string;
  liveUrl?: string;
  domainLabel: string;
  presentation: "browser" | "immersive" | "mobile-split";
  accent: string;
}

export const SHOWCASE_PROJECTS: ShowcaseProject[] = [
  {
    id: "axiora",
    num: "01",
    slug: "axiora",
    href: "/projects/axiora",
    name: "Axiora",
    headline: "AI-native business operating system",
    description:
      "Connects CRM, invoicing, HR, projects, inventory, support, and automation in one unified environment with human verification.",
    categories: ["SAAS", "AI WORKFLOWS", "FULL-STACK"],
    technologies: ["Neon PostgreSQL", "Resend", "Next.js", "TypeScript"],
    year: "2026",
    meta: "STUDIO PRODUCT · ARCHITECTURE & ENGINEERING",
    image: "/media/sector-software.jpg",
    imageAlt: "Axiora architectural model plate representing modular business operating system software",
    liveUrl: "https://axiora-dusky.vercel.app",
    domainLabel: "axiora-dusky.vercel.app",
    presentation: "browser",
    accent: "#60a5fa",
  },
  {
    id: "jimmarof",
    num: "02",
    slug: "jimmarof",
    href: "/projects/jimmarof",
    name: "Jimmarof",
    headline: "Multi-vendor online marketplace",
    description:
      "Multi-vendor online marketplace for Nigeria spanning automotive and retail categories with localized Paystack and Flutterwave checkout.",
    categories: ["E-COMMERCE", "MARKETPLACE", "PAYMENTS"],
    technologies: ["PHP", "MySQL", "Paystack", "Flutterwave", "REST API"],
    year: "2025",
    meta: "LIVE PRODUCTION · BACKEND & PAYMENTS",
    image: "/media/sector-commerce.jpg",
    imageAlt: "Jimmarof architectural model plate representing multi-vendor commerce infrastructure",
    liveUrl: "https://jimmarof.com",
    domainLabel: "jimmarof.com",
    presentation: "browser",
    accent: "#d4a373",
  },
  {
    id: "buildrift",
    num: "03",
    slug: "buildrift",
    href: "/projects/buildrift",
    name: "BUILDRIFT",
    headline: "Verified builder reputation platform",
    description:
      "Web3 platform turning real event participation into verifiable on-chain builder reputation with SIWE authentication and IPFS storage.",
    categories: ["WEB3", "IDENTITY", "FULL-STACK"],
    technologies: ["Next.js App Router", "TypeScript", "Supabase", "IPFS", "SIWE"],
    year: "2025",
    meta: "PLATFORM BUILD · ARCHITECTURE & IMPLEMENTATION",
    image: "/media/sector-web3.jpg",
    imageAlt: "BUILDRIFT architectural model plate representing decentralized builder reputation layers",
    domainLabel: "buildrift · protocol",
    presentation: "immersive",
    accent: "#818cf8",
  },
  {
    id: "realtyintel",
    num: "04",
    slug: "realtyintel",
    href: "/work/realtyintel",
    name: "RealtyIntel",
    headline: "Real-estate lead intelligence system",
    description:
      "Lead intelligence and property buyer management architecture helping agencies qualify, track, and follow up prospective clients.",
    categories: ["BUSINESS SOFTWARE", "DATA ARCHITECTURE", "BACKEND"],
    technologies: ["Backend Systems", "Data Modeling", "Lead Workflows"],
    year: "2026",
    meta: "CLIENT SYSTEM · BACKEND & DATA STRUCTURE",
    image: "/media/process-architect.jpg",
    imageAlt: "RealtyIntel architectural drafting plate representing structured property lead intelligence",
    domainLabel: "realtyintel · workspace",
    presentation: "browser",
    accent: "#38bdf8",
  },
  {
    id: "cahootz",
    num: "05",
    slug: "cahootz",
    href: "/projects/cahootz",
    name: "Cahootz",
    headline: "Collaborative university study platform",
    description:
      "University-focused study platform designed around structured study sessions, peer accountability, and real-time collaboration.",
    categories: ["EDUCATION", "PRODUCT ARCHITECTURE", "COLLABORATION"],
    technologies: ["Product Concept", "Technical Planning", "System Design"],
    year: "2025",
    meta: "PRODUCT CONCEPT · TECHNICAL ARCHITECTURE",
    image: "/media/sector-education.jpg",
    imageAlt: "Cahootz architectural model plate representing collaborative learning environment",
    domainLabel: "cahootz · study",
    presentation: "mobile-split",
    accent: "#a78bfa",
  },
  {
    id: "wahalacheck",
    num: "06",
    slug: "wahalacheck",
    href: "/projects/wahalacheck",
    name: "WahalaCheck",
    headline: "Real-time civic intelligence bot",
    description:
      "Community-sourced Telegram bot providing live fuel availability, power outage updates, and fair-price checks across Nigeria.",
    categories: ["BOTS", "COMMUNITY TOOLS", "AUTOMATION"],
    technologies: ["Node.js", "Telegram Bot API"],
    year: "2024",
    meta: "LIVE PRODUCTION · DESIGN & DEPLOYMENT",
    image: "/media/sector-community.jpg",
    imageAlt: "WahalaCheck architectural model plate representing community real-time intelligence network",
    domainLabel: "t.me/wahalacheck",
    presentation: "mobile-split",
    accent: "#34d399",
  },
];
