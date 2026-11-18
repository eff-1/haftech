import type { Metadata } from "next";
import "../styles/globals.css";
import { SiteNav } from "@/components/layout/SiteNav";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { BuildLineRail } from "@/components/layout/BuildLineRail";
import { copy } from "@/content/copy";
import { JsonLd, getOrganizationJsonLd, getWebSiteJsonLd } from "@/components/seo/JsonLd";
import { SmoothScroll } from "@/components/motion/SmoothScroll";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://haftech.site";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "HafTech — Software engineering studio", template: "%s — HafTech" },
  description: copy.description,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "HafTech",
    title: "HafTech — Software engineering studio",
    description: copy.description,
  },
  twitter: {
    card: "summary_large_image",
    title: "HafTech — Software engineering studio",
    description: copy.description,
    creator: "@faruq_dev",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const orgJsonLd = getOrganizationJsonLd(siteUrl);
  const websiteJsonLd = getWebSiteJsonLd(siteUrl);

  return (
    <html lang="en">
      <head>
        <link rel="preload" href="/fonts/Boska-Variable.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/Switzer-Variable.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <JsonLd data={orgJsonLd} />
        <JsonLd data={websiteJsonLd} />
      </head>
      <body>
        <SmoothScroll>
          <a className="skip-link" href="#main">Skip to content</a>
          <BuildLineRail />
          <SiteNav />
          <main id="main">{children}</main>
          <SiteFooter />
        </SmoothScroll>
      </body>
    </html>
  );
}

