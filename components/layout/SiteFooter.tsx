import Link from "next/link";
import { nav } from "@/content/copy";

export function SiteFooter() {
  return (
    <footer className="border-t border-line">
      <div className="wrap section" style={{ paddingBlock: "var(--s-8)" }}>
        <p className="label">HafTech — independent software studio</p>
        <nav aria-label="Footer">
          <ul style={{ listStyle: "none", margin: "var(--s-5) 0", padding: 0, display: "flex", flexWrap: "wrap", gap: "var(--s-2) var(--s-5)" }}>
            {nav.map((n) => (
              <li key={n.href}>
                <Link href={n.href} style={{ display: "inline-flex", alignItems: "center", minHeight: 48 }}>{n.label}</Link>
              </li>
            ))}
            <li>
              <Link href="/privacy" style={{ display: "inline-flex", alignItems: "center", minHeight: 48 }}>Privacy</Link>
            </li>
          </ul>
        </nav>
        {/* OPEN: contact email, social links pending founder confirmation */}
        <p className="label">© {new Date().getFullYear()} HafTech</p>
      </div>
    </footer>
  );
}

