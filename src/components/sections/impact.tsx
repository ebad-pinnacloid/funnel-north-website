import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { ImpactBento } from "@/components/ui/impact-bento";
import { Reveal } from "@/components/ui/reveal";

/** "Our Short Story" statement + impact bento on the dark ink surface. */
export function Impact() {
  return (
    <section className="bg-ink py-16 text-white lg:py-24">
      <Container className="flex flex-col items-center gap-10">
        <div className="flex flex-col items-center gap-5">
          <Reveal>
            <Eyebrow onDark className="lg:justify-center">
              Our Short Story
            </Eyebrow>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="max-w-[1060px] text-[28px] font-medium leading-[1.5] tracking-[-1px] lg:text-center lg:text-[41px] lg:leading-[62px]">
              We&rsquo;re a{" "}
              <span className="font-semibold text-accent">results-driven marketing agency</span>{" "}
              helping brands grow through creative content, strategic campaigns, and data-backed
              solutions.
            </p>
          </Reveal>
        </div>

        <ImpactBento onDark />
      </Container>
    </section>
  );
}
