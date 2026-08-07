import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionLabel } from "@/components/ui/section-label";

const phases = [
  {
    name: "Segment",
    body: "Audience research and separate Kitchen & Bathroom campaigns built around real homeowner intent.",
  },
  {
    name: "Convert",
    body: "High-converting Meta lead forms and tested creative that turn attention into booked enquiries.",
  },
  {
    name: "Scale",
    body: "Budget optimization, remarketing and weekly tuning to scale volume while holding efficiency.",
  },
];

/** Our Strategy: three phases hung off a horizontal rail. */
export function CaseStudyStrategy() {
  return (
    <section className="bg-white pb-16 lg:pb-24">
      <Container>
        <Reveal>
          <SectionLabel intro="A performance-focused system, built in three connected phases.">
            Our Strategy
          </SectionLabel>
        </Reveal>

        <div className="mt-11">
          {/* Rail: a hairline with a lime node above each phase (desktop only —
              the phases stack on small screens, where a shared rail can't line up) */}
          <div aria-hidden className="relative hidden h-4 lg:block">
            <div className="absolute inset-x-0 top-2 h-px bg-black/10" />
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="absolute top-px size-3.5 rounded-full bg-accent"
                style={{ left: `${i * 34.375}%` }}
              />
            ))}
          </div>

          <div className="mt-6 flex flex-col gap-10 lg:mt-8 lg:flex-row lg:gap-10">
            {phases.map((phase, i) => (
              <Reveal key={phase.name} delay={Math.min(i * 0.1, 0.2)} className="flex-1">
                <div className="flex flex-col gap-3.5">
                  <p className="heading-display text-[52px] leading-none text-navy lg:text-[60px] lg:leading-[64px]">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <p className="text-[22px] font-semibold leading-7 text-navy">{phase.name}</p>
                  <p className="text-base leading-[25px] text-[#595959]">{phase.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
