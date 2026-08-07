import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { ImpactBento } from "@/components/ui/impact-bento";
import { Reveal } from "@/components/ui/reveal";

/** "Our Mission" heading over the shared impact bento, on the light surface. */
export function AboutMission() {
  return (
    <section className="bg-white py-16 lg:py-24">
      <Container className="flex flex-col items-center">
        <Reveal>
          <Eyebrow className="lg:justify-center">Our Mission</Eyebrow>
        </Reveal>
        <Reveal delay={0.1}>
          {/* `.heading-display` is unlayered CSS, so its 1.05 line-height beats a
              plain `leading-*` utility — the design's exact 71px needs `!`. */}
          <h2 className="heading-display mt-5 max-w-[1100px] text-center text-[40px] text-ink lg:text-[70px] lg:leading-[71px]!">
            <span className="lg:block">Purpose behind a mission</span>{" "}
            <span className="lg:block">built around growth</span>
          </h2>
        </Reveal>
        <div className="mt-10 w-full lg:mt-14">
          <ImpactBento />
        </div>
      </Container>
    </section>
  );
}
