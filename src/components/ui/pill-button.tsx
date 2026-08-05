import Link from "next/link";

/**
 * The recurring CTA from the design: lime pill, semibold label, black circle
 * with an arrow. Used for "Book a FREE strategy call", "See more case
 * studies", "Read all blogs", etc.
 */
export function PillButton({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="group inline-flex h-14 items-center gap-6 rounded-pill bg-accent py-1 pl-6 pr-1 font-semibold text-black transition-transform hover:scale-[1.02]"
    >
      <span>{children}</span>
      <span
        aria-hidden
        className="flex size-[46px] items-center justify-center rounded-full bg-black text-accent transition-transform group-hover:rotate-45"
      >
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path
            d="M5 13L13 5M13 5H6M13 5V12"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </Link>
  );
}
