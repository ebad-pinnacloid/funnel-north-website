import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/ui/reveal";

const principles = [
  {
    title: ["Think before", "we spend."],
    body: "We investigate the business, audience and opportunity before investing time or budget.",
  },
  {
    title: ["Make creativity", "accountable."],
    body: "Strong creative should earn attention, communicate clearly and contribute to measurable action.",
  },
  {
    title: ["Work", "in the open."],
    body: "Clear communication, transparent decisions and shared visibility keep everyone moving in the same direction.",
  },
  {
    title: ["Build for", "compounding growth."],
    body: "We create systems that become smarter, stronger and more valuable over time.",
  },
];

/**
 * "Principles over promises" — four editorial panels on black. Each panel rests
 * dark and takes the designed lime Active treatment on hover, which the Figma
 * component reserves for the panel currently in focus.
 */
export function AboutPrinciples() {
  return (
    <section className="bg-black py-16 lg:py-24">
      <Container>
        <Reveal>
          <Eyebrow onDark>What guides us</Eyebrow>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="heading-display mt-5 max-w-[600px] text-[44px] text-white lg:text-[74px]">
            <span className="lg:block">Principles</span>{" "}
            <span className="lg:block">over promises.</span>
          </h2>
        </Reveal>

        <ul className="mt-10 flex flex-col gap-4 lg:mt-[10px] lg:pt-[10px]">
          {principles.map((principle, i) => (
            <li key={principle.title.join(" ")}>
              <Reveal delay={Math.min(i * 0.05, 0.2)}>
                <div className="group grid gap-x-4 gap-y-3 rounded-3xl bg-[#1a1a1a] p-6 transition-colors duration-500 hover:bg-accent motion-reduce:transition-none lg:h-[132px] lg:grid-cols-[104px_384px_1fr_154px] lg:items-center lg:gap-0 lg:p-0 lg:pl-8 lg:pr-[46px]">
                  <span className="heading-display text-[36px] leading-none text-white/50 transition-colors duration-500 group-hover:text-black motion-reduce:transition-none lg:text-[44px] lg:leading-[52px]!">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="heading-display text-[28px] leading-[1.1] text-white transition-colors duration-500 group-hover:text-ink motion-reduce:transition-none lg:max-w-[310px] lg:text-[34px] lg:leading-[38px]!">
                    {principle.title[0]}
                    <br />
                    {principle.title[1]}
                  </h3>
                  <p className="max-w-[500px] text-base leading-6 text-white/70 transition-colors duration-500 group-hover:text-[#5f5b70] motion-reduce:transition-none">
                    {principle.body}
                  </p>
                  {/* Direction rule — the panel's "keep going" motif */}
                  <span aria-hidden className="hidden items-center gap-0 lg:flex">
                    <span className="h-px flex-1 bg-white/16 transition-colors duration-500 group-hover:bg-[#232324] motion-reduce:transition-none" />
                    <span className="ml-2 size-[6px] rounded-full bg-white/40 transition-colors duration-500 group-hover:bg-[#232324] motion-reduce:transition-none" />
                  </span>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
