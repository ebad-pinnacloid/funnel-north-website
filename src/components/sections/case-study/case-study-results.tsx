import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionLabel } from "@/components/ui/section-label";

const outcomes = [
  "Increased qualified homeowner enquiries",
  "A repeatable system across kitchen & bathroom services",
  "Improved efficiency through weekly optimization",
  "Reach expanded to 100,000+ potential customers",
];

/** Results Achieved: closing statement beside the checked outcome list. */
export function CaseStudyResults() {
  return (
    <section className="bg-white py-16 lg:py-24">
      <Container>
        <Reveal>
          <SectionLabel>Results Achieved</SectionLabel>
        </Reveal>

        <div className="mt-12 flex flex-col gap-10 lg:flex-row lg:gap-20">
          <Reveal delay={0.05} className="flex-1">
            <p className="heading-display text-[36px] leading-[1.07] text-navy lg:text-[54px] lg:leading-[58px]">
              A scalable lead engine across every remodeling service.
            </p>
            <p className="mt-6 text-[17px] leading-[29px] text-[#595959] lg:text-lg">
              The campaign structure turned inconsistent activity into a predictable, optimizable
              acquisition system — repeatable across services and built to scale.
            </p>
          </Reveal>

          <ul className="lg:w-[500px] lg:shrink-0">
            {outcomes.map((outcome, i) => (
              <li key={outcome}>
                <Reveal delay={Math.min(i * 0.06, 0.24)}>
                  <div
                    className={`flex items-center gap-4 py-5 lg:py-[22px] ${
                      i > 0 ? "border-t border-black/10" : ""
                    }`}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      aria-hidden
                      className="size-6 shrink-0"
                      fill="none"
                    >
                      <circle cx="12" cy="12" r="12" fill="#E7FE25" />
                      <path
                        d="M7 12.2996L10.2 15.4996L17 8.59961"
                        stroke="#081122"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <p className="text-[17px] font-medium leading-[25px] text-navy">{outcome}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
