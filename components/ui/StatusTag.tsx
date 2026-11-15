import type { ProjectStatus } from "@/lib/schema";

const map: Record<ProjectStatus, [string, string]> = {
  concept: ["○", "Concept"],
  exploring: ["◔", "Exploring"],
  "in-development": ["◑", "In development"],
  "internal-testing": ["◕", "Internal testing"],
  live: ["●", "Live"],
  archived: ["▢", "Archived"],
};

export function StatusTag({ status }: { status: ProjectStatus }) {
  const [shape, text] = map[status];
  return (
    <span className="label inline-flex items-center gap-2 border border-line px-2 py-1" style={{ color: "var(--text)" }}>
      <span aria-hidden="true">{shape}</span>
      {text}
    </span>
  );
}