import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/ui/reveal";

/** "What we do" — centred statement on the dark ink surface. */
export function AboutIntro() {
  return (
    <section className="bg-ink py-16 text-white lg:py-24">
      <Container className="flex flex-col items-center gap-5">
        <Reveal>
          <Eyebrow onDark className="lg:justify-center">
            What we do
          </Eyebrow>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="max-w-[1060px] text-[26px] font-medium leading-[1.35] tracking-[-1px] lg:text-center lg:text-[41px] lg:leading-[51px]">
            At Funnel North, we believe marketing isn&rsquo;t about selling. It&rsquo;s about
            creating meaningful connections. We combine strategic thinking, purposeful creativity
            and data-driven execution to build campaigns that convert and brands that grow.
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
