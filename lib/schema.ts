import { z } from "zod";

export const ProjectStatus = z.enum([
  "concept",
  "exploring",
  "in-development",
  "internal-testing",
  "live",
  "archived",
]);
export const Ownership = z.enum(["client", "haftech", "founder-independent", "joint"]);

export const Contribution = z.object({
  area: z.enum([
    "product-design",
    "frontend",
    "backend",
    "architecture",
    "database",
    "deployment",
    "integrations",
    "other",
  ]),
  who: z.string(),
  role: z.enum(["led", "contributed", "reviewed", "supplied"]),
  notes: z.string().optional(),
});

export const Project = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/),
  title: z.string(),
  summary: z.string(),
  category: z.string(),
  type: z.enum(["work", "project"]),
  ownership: Ownership,
  ownerName: z.string().optional(),
  status: ProjectStatus,
  statusVerifiedOn: z.string(),
  roles: z.array(z.string()),
  technologies: z.array(z.string()),
  image: z
    .object({ src: z.string(), alt: z.string(), width: z.number(), height: z.number() })
    .optional(),
  links: z
    .object({ live: z.string().url(), repo: z.string().url(), caseStudy: z.string() })
    .partial()
    .optional(),
  contributions: z.array(Contribution),
  verified: z.boolean(),
  caseStudy: z.string().optional(),
  // Seed-only, dev-only fields: never rendered.
  openFields: z.array(z.string()).optional(),
  sourceNote: z.string().optional(),
  statusConflict: z.string().optional(),
  featuredCandidate: z.boolean().optional(),
});
export type Project = z.infer<typeof Project>;
export type ProjectStatus = z.infer<typeof ProjectStatus>;
export type Ownership = z.infer<typeof Ownership>;
export type Contribution = z.infer<typeof Contribution>;

export const ProjectFile = z.object({ projects: z.array(Project) });

