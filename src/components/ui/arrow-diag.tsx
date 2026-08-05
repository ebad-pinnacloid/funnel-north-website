/**
 * The big diagonal arrow from the services accordion (Figma icon 244:5761),
 * inlined so color follows `currentColor`. Points down-right by default; the
 * expanded state flips it with a transform.
 */
export function ArrowDiag({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40.5139 35.3927"
      fill="none"
      aria-hidden
      className={className}
    >
      <path
        d="M4.33018 1.76954L36.1836 33.6229M4.33018 33.6229H36.1836V1.76954"
        stroke="currentColor"
        strokeWidth="2.65445"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
