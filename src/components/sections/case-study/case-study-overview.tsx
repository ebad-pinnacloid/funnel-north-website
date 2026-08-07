import { Container } from "@/components/ui/container";
import { CountUp } from "@/components/ui/count-up";
import { Reveal } from "@/components/ui/reveal";
import { SectionLabel } from "@/components/ui/section-label";

const info = [
  { label: "Industry", value: "Home Remodeling" },
  { label: "Market", value: "United States" },
  { label: "Services", value: "Kitchen & Bathroom Renovation" },
  { label: "Channel", value: "Meta Advertising" },
  { label: "Objective", value: "Qualified Lead Generation" },
];

const stats = [
  { end: 505, label: "Meta Leads generated", surface: "bg-lime-soft" },
  { end: 230000, label: "Impressions on campaigns", surface: "bg-purple-soft" },
  { end: 111000, label: "People reached", surface: "bg-blue-soft" },
];

/** Client Overview: summary, the project info table, and the headline stats. */
export function CaseStudyOverview() {
  return (
    <section className="bg-white pt-[60px]">
      <Container>
        <Reveal>
          <SectionLabel rule="brand">Client Overview</SectionLabel>
        </Reveal>

        <Reveal delay={0.05}>
          <p className="mt-10 text-[17px] leading-[27px] text-[#595959] lg:text-lg">
            A USA-based home remodeling company wanted to generate consistent, high-quality leads
            for kitchen and bathroom renovation services. Despite running advertising campaigns,
            they were struggling with inconsistent lead flow, rising acquisition costs, and limited
            campaign optimization.
          </p>
        </Reveal>

        <dl className="mt-7">
          {info.map((row, i) => (
            <Reveal key={row.label} delay={Math.min(i * 0.04, 0.16)}>
              <div className="flex flex-wrap items-start justify-between gap-x-6 gap-y-1 border-t border-black/10 py-3.5 text-sm">
                <dt className="font-semibold uppercase text-[#8c8c8c]">{row.label}</dt>
                <dd className="font-medium text-[#0f0f0f]">{row.value}</dd>
              </div>
            </Reveal>
          ))}
        </dl>

        <div className="mt-[60px] grid gap-5 lg:mt-[100px] lg:grid-cols-3">
          {stats.map((stat, i) => (
            <Reveal
              key={stat.label}
              delay={Math.min(i * 0.1, 0.2)}
              className={`flex flex-col justify-between gap-8 rounded-sm p-[30px] lg:h-[216px] lg:gap-[52px] ${stat.surface}`}
            >
              <p className="heading-display text-[56px] leading-none text-navy lg:text-[72px] lg:leading-[80px]">
                <CountUp end={stat.end} grouped />
              </p>
              <p className="font-medium text-navy">{stat.label}</p>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
