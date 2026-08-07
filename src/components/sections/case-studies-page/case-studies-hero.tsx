/**
 * "Our work" wordmark, matching the About hero's treatment: same 283px Anton
 * cap and same 1.1 line height, starting at the frame's y=152. Nothing sits
 * under it here, so unlike the About hero there is no crop — the grid picks up
 * 38px below the text box.
 */
export function CaseStudiesHero() {
  return (
    <section className="bg-white pt-[clamp(96px,10.6vw,152px)]">
      <h1 className="heading-display animate-rise text-center text-[clamp(52px,19.68vw,283px)] leading-[1.1] text-brand">
        Our work
      </h1>
    </section>
  );
}
