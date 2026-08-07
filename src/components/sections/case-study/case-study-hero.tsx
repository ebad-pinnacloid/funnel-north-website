import Image from "next/image";
import { Container } from "@/components/ui/container";

/** Client name over the case study's cover image. */
export function CaseStudyHero({
  title,
  image,
  imageAlt,
}: {
  title: string;
  image: string;
  imageAlt: string;
}) {
  return (
    <section className="bg-white pt-[clamp(112px,11.9vw,171px)]">
      <Container>
        <h1 className="animate-rise text-center text-[clamp(34px,5.28vw,76px)] font-semibold leading-[1.1] tracking-[-0.05em] text-[#080d0d]">
          {title}
        </h1>
        <div className="animate-hero-visual relative mx-auto mt-[clamp(24px,2.85vw,41px)] aspect-[1060/597] w-full max-w-[1060px] overflow-hidden rounded-2xl lg:rounded-[28.6px]">
          <Image
            src={image}
            alt={imageAlt}
            fill
            sizes="(max-width: 1119px) 92vw, 1060px"
            priority
            className="object-cover"
          />
        </div>
      </Container>
    </section>
  );
}
