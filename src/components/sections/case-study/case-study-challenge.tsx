import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionLabel } from "@/components/ui/section-label";

const points = [
  "Inconsistent lead flow across kitchen and bathroom services",
  "Rising cost per qualified lead",
  "Limited campaign scalability",
  "Unclear tracking of which campaigns drove real returns",
];

/** The Challenge: numbered problem list beside the objective panel. */
export function CaseStudyChallenge() {
  return (
    <section className="bg-white py-16 lg:py-24">
      <Container>
        <Reveal>
          <SectionLabel tone="danger">The Challenge</SectionLabel>
        </Reveal>

        <div className="mt-11 flex flex-col gap-10 lg:flex-row lg:gap-20">
          <div className="flex-1">
            <Reveal delay={0.05}>
              <p className="text-[17px] leading-7 text-[#595959] lg:text-lg">
                Multiple campaigns were already running — but without a scalable system to acquire
                qualified remodeling leads efficiently.
              </p>
            </Reveal>
            <ol className="mt-7">
              {points.map((point, i) => (
                <li key={point}>
                  <Reveal delay={Math.min(i * 0.05, 0.2)}>
                    <div className="flex items-center gap-6 border-t border-black/10 py-5">
                      <span className="heading-display w-10 shrink-0 text-[22px] leading-none text-navy/20">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <p className="text-[17px] font-medium leading-[25px] text-navy">{point}</p>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ol>
          </div>

          <Reveal
            delay={0.1}
            className="flex flex-col gap-[18px] rounded-3xl bg-lime-wash p-8 lg:w-[468px] lg:shrink-0 lg:self-start lg:p-11"
          >
            <span className="w-fit rounded-pill bg-accent px-3.5 py-[7px] text-[11px] font-semibold uppercase tracking-[1.2px] text-navy">
              The Objective
            </span>
            <p className="text-[22px] font-semibold leading-[1.3] text-navy lg:text-[26px] lg:leading-[34px]">
              Increase qualified appointment requests while maintaining advertising efficiency at
              scale.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <span aria-hidden className="size-2.5 shrink-0 rounded-full bg-brand" />
              <p className="text-sm font-medium leading-5 text-[#595959]">
                Built around real homeowner intent, not broad reach.
              </p>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
