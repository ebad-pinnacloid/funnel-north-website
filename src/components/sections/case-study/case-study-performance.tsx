import Image from "next/image";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionLabel } from "@/components/ui/section-label";

/* Bar widths are the design's own: 332px is the full track, so each bar is
   drawn as a share of it rather than of its own value. */
const bars = [
  { label: "Kitchen", value: "222", width: "100%", fill: "bg-accent" },
  { label: "Bathroom", value: "174", width: "78.3%", fill: "bg-[#99b03d]" },
  { label: "Additional", value: "109+", width: "49.1%", fill: "bg-[#667338]" },
];

const metrics = [
  { value: "222", label: "Kitchen campaign leads" },
  { value: "174", label: "Bathroom campaign leads" },
  { value: "230K+", label: "Impressions delivered" },
  { value: "111K+", label: "People reached" },
  { value: "$0.46", label: "Per landing-page visit" },
];

/** Campaign Performance: the dark band with the bar chart and key metrics. */
export function CaseStudyPerformance() {
  return (
    <section className="bg-carbon py-16 lg:py-24">
      <Container>
        <Reveal>
          <SectionLabel
            tone="accent"
            rule="dark"
            intro="Measurable results delivered across every remodeling service."
          >
            Campaign Performance
          </SectionLabel>
        </Reveal>

        <div className="mt-13 flex flex-col gap-10 lg:flex-row">
          <Reveal
            delay={0.05}
            className="flex flex-col gap-7 rounded-lg bg-carbon-card p-7 lg:w-[620px] lg:shrink-0 lg:p-10"
          >
            <p className="text-[13px] font-semibold uppercase tracking-[1.4px] text-carbon-muted">
              Meta leads by campaign
            </p>
            <div className="flex flex-col gap-[22px]">
              {bars.map((bar) => (
                <div key={bar.label} className="flex items-center gap-3.5">
                  <p className="w-20 shrink-0 text-sm font-medium text-[#f5f5f5] lg:w-[120px]">
                    {bar.label}
                  </p>
                  <div className="h-9 flex-1 overflow-hidden rounded-full bg-white/8">
                    <div className={`h-full rounded-full ${bar.fill}`} style={{ width: bar.width }} />
                  </div>
                  <p className="heading-display w-[54px] shrink-0 text-right text-xl leading-none text-[#f5f5f5] lg:text-2xl">
                    {bar.value}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>

          {/* Browser frame around the Meta Ads Manager screenshot */}
          <Reveal
            delay={0.1}
            className="flex flex-1 flex-col overflow-hidden rounded-lg border border-white/8 bg-carbon-card lg:h-[276px]"
          >
            <div className="flex items-center gap-3.5 border-b border-white/8 bg-carbon-chrome px-[18px] py-3">
              <span aria-hidden className="flex gap-[7px]">
                <span className="size-2.5 rounded-full bg-[#ff5f57]" />
                <span className="size-2.5 rounded-full bg-[#febc2e]" />
                <span className="size-2.5 rounded-full bg-[#28c840]" />
              </span>
              <span className="flex-1 truncate rounded-pill bg-white/6 px-4 py-[7px] text-xs font-medium text-[#737a87]">
                business.facebook.com/adsmanager
              </span>
            </div>
            <div className="relative min-h-0 flex-1 bg-white">
              <Image
                src="/images/meta-ads-manager.jpg"
                alt="Meta Ads Manager showing the campaign rows, results and cost per result"
                fill
                sizes="(max-width: 1023px) 92vw, 620px"
                className="object-contain"
              />
            </div>
          </Reveal>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3 lg:mt-13 lg:flex lg:gap-0">
          {metrics.map((metric, i) => (
            <Reveal
              key={metric.label}
              delay={Math.min(i * 0.06, 0.24)}
              className={`lg:flex-1 lg:px-7 lg:first:pl-0 ${
                i > 0 ? "lg:border-l lg:border-white/12" : ""
              }`}
            >
              <p className="heading-display text-[38px] leading-none text-accent lg:text-[46px] lg:leading-[50px]">
                {metric.value}
              </p>
              <p className="mt-3 text-[13px] font-medium leading-[19px] text-carbon-muted">
                {metric.label}
              </p>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <div className="mt-10 flex items-center gap-3.5 lg:mt-13">
            <span aria-hidden className="size-3 shrink-0 rounded-full bg-accent" />
            <p className="text-[17px] font-medium leading-[26px] text-[#f5f5f5] lg:text-lg">
              Campaigns stayed active and optimized for continuous, scalable lead generation.
            </p>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
