import Link from "next/link";

interface BreadcrumbsProps {
  items: { label: string; href?: string }[];
}

export function Breadcrumbs({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex items-center gap-2 label text-xs" style={{ listStyle: "none", margin: 0, padding: 0 }}>
        <li>
          <Link href="/" className="hover:text-[var(--text)] transition-colors">
            Home
          </Link>
        </li>
        {items.map((item, idx) => (
          <li key={idx} className="flex items-center gap-2">
            <span aria-hidden="true" className="text-[var(--ht-concrete)]">/</span>
            {item.href ? (
              <Link href={item.href} className="hover:text-[var(--text)] transition-colors">
                {item.label}
              </Link>
            ) : (
              <span aria-current="page" style={{ color: "var(--text)" }}>
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

