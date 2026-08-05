import { Container } from "@/components/ui/container";
import { PillButton } from "@/components/ui/pill-button";
import { SectionHeading } from "@/components/ui/section-heading";

/* TODO: implement case study cards from Figma (node 241:36) — two large cards
   with imagery, metrics, and outcomes. Card data will come from Decap CMS. */
export function CaseStudies() {
  return (
    <section className="bg-ink py-(--spacing-section-lg) text-white">
      <Container>
        <SectionHeading
          eyebrow="Case Studies"
          title="Real Strategies · Real Growth · Real Results"
          align="center"
          onDark
        />
        <div className="mt-16 flex justify-center">
          <PillButton href="/case-studies">See more case studies</PillButton>
        </div>
      </Container>
    </section>
  );
}
