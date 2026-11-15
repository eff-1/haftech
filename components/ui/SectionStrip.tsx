export function SectionStrip({ n, name }: { n: string; name: string }) {
  return (
    <div className="mb-8">
      <hr className="rule" />
      <p className="label pt-3">{n} — {name}</p>
    </div>
  );
}