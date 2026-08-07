import Image from "next/image";
import Link from "next/link";
import { CaseStudyOverlay, type CaseStudy } from "@/components/ui/case-study-overlay";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";

/* Card 1's copy comes from this frame, which words it differently to the
   homepage stack. Cards 2 and 3 are drawn in their image-only state here, so
   they keep the site's existing copy for the same two studies. */
const caseStudies: CaseStudy[] = [
  {
    image: "/images/case-study-1.jpg",
    title: "Digital Experience for an Online Dermatology Platform",
    description:
      "PelleDore partnered with Funnel North to create a modern dermatology platform for seamless virtual consultations and appointment booking across all devices.",
    tags: ["Healthcare", "UI/UX Design", "Website Development"],
    href: "/case-studies",
  },
  {
    image: "/images/case-study-2.jpg",
    title: "Digital Identity for the Next Generation of AI Education",
    description:
      "Funnel North helped Pinnacloid Institute build a strong digital presence with a professional website and cohesive social media identity for its AI training programs.",
    tags: ["Education", "AI Training", "Branding & Digital Presence"],
    href: "/case-studies",
  },
  {
    image: "/images/case-study-3.jpg",
    title: "Scaling Lead Generation with Meta Advertising",
    description:
      "KN Remodeling partnered with Funnel North to scale high-quality lead generation for kitchen and bathroom renovation services using Meta advertising.",
    tags: ["Home Remodeling", "Lead Generation", "META Advertising"],
    href: "/case-studies/kn-remodeling",
  },
];

/**
 * Staggered card column: each card is 61.5% of the content width (786.94 of
 * 1280 in the frame) and alternates between the left and right gutter, with an
 * 80px step between them.
 */
export function CaseStudiesGrid() {
  return (
    <section className="bg-white pt-[clamp(24px,2.6vw,38px)] pb-[clamp(64px,13.6vw,196px)]">
      <Container className="flex flex-col gap-10 lg:gap-20">
        {caseStudies.map((study, i) => (
          <Reveal
            key={study.image}
            delay={0.05}
            className={`lg:w-[61.48%] ${i % 2 === 1 ? "lg:ml-auto" : ""}`}
          >
            <Link href={study.href} className="group block">
              {/* @container drives the overlay's cqw type, so the card reads
                  identically here and in the larger homepage stack. */}
              <span className="@container relative block aspect-[1062/597] w-full overflow-hidden rounded-xl lg:rounded-3xl">
                <Image
                  src={study.image}
                  alt={`Case study: ${study.title}`}
                  fill
                  sizes="(max-width: 1023px) 92vw, 55vw"
                  className="object-cover"
                />
                <CaseStudyOverlay study={study} />
              </span>
              {/* Touch devices never get the hover overlay, so the title rides
                  below the card there — same fallback as the homepage stack. */}
              <span className="mt-3 flex items-start justify-between gap-3 text-[13px] font-bold uppercase leading-snug tracking-wide text-ink lg:hidden">
                <span className="min-w-0 flex-1">{study.title}</span>
                <span aria-hidden className="shrink-0 text-brand">↗</span>
              </span>
            </Link>
          </Reveal>
        ))}
      </Container>
    </section>
  );
}
