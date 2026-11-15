import type { Contribution, Ownership } from "@/lib/schema";

const ownershipLabels: Record<Ownership, string> = {
  client: "Client owned (built under contract)",
  haftech: "Owned by HafTech Studio",
  "founder-independent": "Independently owned & developed by Faruq Ariyo",
  joint: "Joint venture / collaborative ownership",
};

const areaLabels: Record<Contribution["area"], string> = {
  "product-design": "Product Design",
  frontend: "Frontend Engineering",
  backend: "Backend Engineering",
  architecture: "System Architecture",
  database: "Database Design",
  deployment: "Deployment & DevOps",
  integrations: "Third-Party Integrations",
  other: "Specialised Scope",
};

const roleBadges: Record<Contribution["role"], string> = {
  led: "Led direction & execution",
  contributed: "Contributed implementation",
  reviewed: "Technical review / advisory",
  supplied: "Supplied assets or specification",
};

interface ContributionMatrixProps {
  ownership: Ownership;
  ownerName?: string;
  contributions: Contribution[];
  verified: boolean;
}

export function ContributionMatrix({
  ownership,
  ownerName,
  contributions,
  verified,
}: ContributionMatrixProps) {
  return (
    <div className="border border-line bg-surface p-6 my-8">
      <div className="flex items-center justify-between border-b border-line pb-3">
        <h3 className="label text-xs">Attribution & Accountability</h3>
        <span
          className="label text-[10px] px-2 py-0.5 border"
          style={{
            borderColor: verified ? "var(--accent)" : "var(--ht-border-strong)",
            color: verified ? "var(--accent)" : "var(--text-2)",
          }}
        >
          {verified ? "Verified Attribution" : "Unverified Seed Matrix"}
        </span>
      </div>

      <div className="mt-4 grid gap-3 text-sm">
        <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4 border-b border-line pb-3">
          <span className="label text-xs min-w-[9rem]">Product Ownership</span>
          <span style={{ color: "var(--text)" }}>
            {ownershipLabels[ownership]} {ownerName ? `(${ownerName})` : ""}
          </span>
        </div>

        <div className="mt-2">
          <p className="label text-xs mb-3">Area Contributions</p>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="border-b border-line label text-[11px]">
                  <th className="py-2 pr-4 font-normal">Functional Area</th>
                  <th className="py-2 pr-4 font-normal">Contributor</th>
                  <th className="py-2 pr-4 font-normal">Accountability Scope</th>
                  <th className="py-2 font-normal">Notes</th>
                </tr>
              </thead>
              <tbody>
                {contributions.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="py-4 text-xs text-[var(--text-2)] italic">
                      Detailed contribution breakdown pending founder verification.
                    </td>
                  </tr>
                ) : (
                  contributions.map((c, i) => (
                    <tr key={i} className="border-b border-line last:border-b-0">
                      <td className="py-2.5 pr-4 font-medium" style={{ color: "var(--text)" }}>
                        {areaLabels[c.area]}
                      </td>
                      <td className="py-2.5 pr-4 text-[var(--text)]">{c.who}</td>
                      <td className="py-2.5 pr-4 text-xs text-[var(--text-2)]">
                        {roleBadges[c.role]}
                      </td>
                      <td className="py-2.5 text-xs text-[var(--text-2)]">
                        {c.notes ?? "—"}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

