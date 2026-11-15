import { SectionStrip } from "@/components/ui/SectionStrip";
import { VizWrapper } from "@/components/viz/VizWrapper";

export function Visualization() {
  return (
    <section className="wrap section defer" aria-labelledby="viz-h2">
      <SectionStrip n="03" name="Engineering visualisation" />
      <h2
        id="viz-h2"
        style={{
          fontSize: "var(--step-5)",
          maxWidth: "16ch",
          marginBottom: "var(--s-6)",
        }}
      >
        How a product is structured
      </h2>
      <VizWrapper />
    </section>
  );
}
