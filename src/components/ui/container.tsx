import { type ReactNode } from "react";

/** Page gutter: 1280px content column, 80px gutters at desktop per the design. */
export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-20 ${className}`}>
      {children}
    </div>
  );
}
