import React from "react";
import type { Project } from "@/lib/schema";

interface JsonLdProps {
  data: Record<string, any>;
}

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data),
      }}
    />
  );
}

export function getOrganizationJsonLd(baseUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "HafTech",
    url: baseUrl,
    description:
      "Independent software engineering studio led by Faruq Ariyo. Designing and building digital products, intelligent systems, and software backends.",
    founder: {
      "@type": "Person",
      name: "Faruq Ariyo",
      jobTitle: "Founder & Full-Stack Engineer",
      url: `${baseUrl}/founder`,
    },
    contactPoint: {
      "@type": "ContactPoint",
      email: "haftechhq@gmail.com",
      contactType: "customer support",
    },
    sameAs: [
      "https://linkedin.com/in/fsdev-faruq",
      "https://x.com/faruq_dev",
    ],
  };
}

export function getWebSiteJsonLd(baseUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "HafTech",
    url: baseUrl,
  };
}

export function getPersonJsonLd(baseUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Faruq Ariyo",
    jobTitle: "Founder & Full-Stack Software Engineer",
    email: "ariyofaruq1@gmail.com",
    worksFor: {
      "@type": "Organization",
      name: "HafTech",
      url: baseUrl,
    },
    url: `${baseUrl}/founder`,
    sameAs: [
      "https://linkedin.com/in/fsdev-faruq",
      "https://x.com/faruq_dev",
    ],
  };
}

export function getContactPageJsonLd(baseUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact HafTech",
    url: `${baseUrl}/contact`,
    description: "Start a conversation with HafTech about software engineering, architecture, or product development.",
    mainEntity: {
      "@type": "Organization",
      name: "HafTech",
      url: baseUrl,
      email: "haftechhq@gmail.com",
    },
  };
}

export function getProjectJsonLd(project: Project, baseUrl: string, path: "work" | "projects") {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    headline: project.summary,
    url: `${baseUrl}/${path}/${project.slug}`,
    dateModified: project.statusVerifiedOn,
    author: {
      "@type": "Organization",
      name: "HafTech",
      url: baseUrl,
    },
  };
}
