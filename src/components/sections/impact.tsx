import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";

const stats = [
  { value: "100%", label: "Strategy-led approach" },
  { value: "60+", label: "Active clients" },
  { value: "45+", label: "Growth campaigns" },
  { value: "20+", label: "Industries served" },
];

/* TODO: implement the full bento layout from Figma (node 278:11514) with
   avatar pills and motif imagery. */
export function Impact() {
  return (
    <section className="py-(--spacing-section-lg)">
      <Container>
        <SectionHeading
          eyebrow="Our Short Story"
          title="We're a results-driven marketing agency helping brands grow"
          align="center"
        />
        <dl className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-md bg-surface-tint p-6">
              <dt className="order-last mt-2 text-sm text-muted">{stat.label}</dt>
              <dd className="heading-display text-5xl text-ink">{stat.value}</dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
