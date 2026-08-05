import Image from "next/image";

/** Full-width photo band between Services and Industries (Figma 278:12422). */
export function VisualBand() {
  return (
    <section aria-hidden className="relative h-[520px] lg:h-[749px]">
      <Image
        src="/images/visual-band.jpg"
        alt=""
        fill
        sizes="100vw"
        className="object-cover"
      />
    </section>
  );
}
