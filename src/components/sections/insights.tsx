import { Container } from "@/components/ui/container";
import { PillButton } from "@/components/ui/pill-button";
import { SectionHeading } from "@/components/ui/section-heading";

/* TODO: implement blog cards from Figma (node 281:18791) — three square-image
   cards with category tags. Posts will come from Decap CMS. */
export function Insights() {
  return (
    <section className="py-(--spacing-section-lg)">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading eyebrow="Blog" title="Marketing Insights" />
          <PillButton href="/blog">Read all blogs</PillButton>
        </div>
      </Container>
    </section>
  );
}
