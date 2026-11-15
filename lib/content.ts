// Single read path for content. A Supabase-backed admin can replace this file later.
import raw from "@/content/projects/projects.json";
import { ProjectFile, type Project } from "./schema";

const all: Project[] = ProjectFile.parse(raw).projects; // build fails on invalid data

// Unverified records show only in dev or when the preview flag is on.
export function isPreviewEnabled(): boolean {
  return (
    process.env.NODE_ENV !== "production" ||
    process.env.NEXT_PUBLIC_SHOW_UNVERIFIED === "true"
  );
}

export function getAllProjects(): Project[] {
  const showUnverified = isPreviewEnabled();
  return all.filter((p) => showUnverified || p.verified);
}

export function getProjects(type?: Project["type"]): Project[] {
  return getAllProjects().filter((p) => !type || p.type === type);
}

export function getProject(slug: string, type?: Project["type"]): Project | undefined {
  return getProjects(type).find((p) => p.slug === slug);
}

// For static parameters generation
export function getAllProjectSlugs(type?: Project["type"]): string[] {
  return getProjects(type).map((p) => p.slug);
}
