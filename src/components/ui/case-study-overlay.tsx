export type CaseStudy = {
  image: string;
  title: string;
  description: string;
  tags: readonly string[];
  href: string;
};

/**
 * Hover state from Figma (194:3445): dark veil over the card with tag pills
 * top-right, a lime VIEW pill center, and title + summary bottom-left.
 * Elements rise in slightly, staggered, on hover.
 *
 * Shared by the homepage's pinned case-study stack and the /case-studies grid —
 * the design uses one card component in both, at different sizes.
 */
export function CaseStudyOverlay({ study }: { study: CaseStudy }) {
  return (
    <div className="absolute inset-0 rounded-xl bg-black/70 opacity-0 transition-opacity duration-500 group-hover:opacity-100 lg:rounded-3xl">
      {/* Percentage insets and container-query (cqw) type: every element is
          sized as a ratio of the card itself, so the overlay stays perfectly
          proportioned on any screen — and unlike vw, cqw doesn't compound
          with the ultra-wide page zoom. Ratios come from the 1440 design
          (32px title on a 1062px card = 3.01cqw, etc.). */}
      <div className="absolute right-[3.6%] top-[6%] flex max-w-[60%] translate-y-2 flex-wrap justify-end gap-1.5 opacity-0 transition-[opacity,transform] duration-500 delay-75 group-hover:translate-y-0 group-hover:opacity-100 lg:gap-[0.56cqw]">
        {study.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-pill bg-white/20 px-4 py-2.5 text-sm text-white shadow-[0_2px_8px_rgba(0,0,0,0.1)] backdrop-blur-sm lg:px-[1.5cqw] lg:py-[0.94cqw] lg:text-[1.32cqw]"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="absolute inset-0 flex items-center justify-center">
        <span className="flex scale-90 items-center gap-1 rounded-pill bg-accent px-6 py-3 text-sm font-bold uppercase tracking-[0.2px] text-black opacity-0 transition-[opacity,transform] duration-500 delay-100 group-hover:scale-100 group-hover:opacity-100 lg:px-[2.26cqw] lg:py-[1.13cqw] lg:text-[1.32cqw]">
          View
          <span aria-hidden className="text-base font-semibold normal-case lg:text-[1.5cqw]">↗</span>
        </span>
      </div>

      <div className="absolute bottom-[7.3%] left-[3.65%] max-w-[85%] translate-y-2 text-white opacity-0 transition-[opacity,transform] duration-500 delay-150 group-hover:translate-y-0 group-hover:opacity-100 lg:max-w-[46%]">
        <p className="text-xl font-bold leading-tight lg:text-[3.01cqw] lg:leading-[1.28]">
          {study.title}
        </p>
        <p className="mt-2 text-sm leading-5 lg:mt-[0.75cqw] lg:text-[1.32cqw] lg:leading-[1.45]">
          {study.description}
        </p>
      </div>
    </div>
  );
}
