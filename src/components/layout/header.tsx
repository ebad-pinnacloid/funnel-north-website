"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/lib/site";

/* Routes whose hero is a light surface: the header inverts to the dark
   wordmark and ink nav so it stays legible (Figma "About us", node 455:1520). */
const LIGHT_HEADER_ROUTES = ["/about", "/case-studies", "/contact"];

/** Within this much of the page top the bar is "resting": transparent over the
    hero, always visible, no hide-on-scroll. */
const TOP_ZONE = 24;
/** Don't start hiding until the bar has cleared its own height, so a short
    flick just below the hero doesn't snatch it away. */
const HIDE_AFTER = 140;
/** Ignore sub-pixel scroll noise so the bar doesn't flicker direction. */
const DELTA = 6;

export function Header() {
  const [open, setOpen] = useState(false);
  /** Scrolled off the resting zone — the bar floats and needs its own surface. */
  const [pinned, setPinned] = useState(false);
  const [hidden, setHidden] = useState(false);
  const pathname = usePathname() ?? "/";
  const onLight = LIGHT_HEADER_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );

  /* Hide on scroll down, reveal on scroll up — except in the resting zone at
     the top of the page, where the bar always shows. Re-render churn is nil:
     setState bails out when the value is unchanged. */
  useEffect(() => {
    let last = window.scrollY;
    let raf = 0;
    const update = () => {
      raf = 0;
      // Clamp so iOS rubber-banding past the top doesn't read as "scrolled up".
      const y = Math.max(window.scrollY, 0);
      const atTop = y <= TOP_ZONE;
      setPinned(!atTop);
      const delta = y - last;
      if (atTop) {
        setHidden(false);
      } else if (Math.abs(delta) > DELTA) {
        setHidden(delta > 0 && y > HIDE_AFTER);
      }
      if (Math.abs(delta) > DELTA) last = y;
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    return () => {
      window.removeEventListener("scroll", schedule);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-transform duration-300 ease-out motion-reduce:transition-none ${
        hidden && !open ? "-translate-y-full" : "translate-y-0"
      } ${
        pinned
          ? onLight
            ? "border-b border-line-subtle bg-white/95 backdrop-blur-sm"
            : "bg-black/85 backdrop-blur-sm"
          : onLight
            ? "border-b border-line-subtle"
            : ""
      }`}
    >
      <Container className="flex items-center justify-between py-5 lg:py-6">
        <Link href="/" aria-label="Funnel North — home" className="shrink-0">
          <Image
            src={onLight ? "/images/logo-dark.png" : "/images/logo.png"}
            alt="Funnel North"
            width={109}
            height={46}
            priority
            className="h-10 w-auto lg:h-[46px]"
          />
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-4 md:flex">
          {siteConfig.nav.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.label}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`p-2.5 transition-colors ${
                  onLight
                    ? active
                      ? "font-semibold text-black"
                      : "font-medium text-[#717171] hover:text-black"
                    : active
                      ? "font-semibold text-white"
                      : "font-medium text-[#d9d9d9] hover:text-white"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <Link
          href={siteConfig.cta.href}
          className="hidden rounded-pill bg-accent px-6 py-3 text-sm font-bold uppercase tracking-wide text-black transition-transform hover:scale-105 md:block"
        >
          {siteConfig.cta.label}
        </Link>

        <button
          type="button"
          className={`flex size-12 items-center justify-center md:hidden ${
            onLight ? "text-ink" : "text-white"
          }`}
          aria-expanded={open}
          aria-label="Toggle navigation"
          onClick={() => setOpen((v) => !v)}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
            {open ? (
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </Container>

      {open && (
        <nav
          aria-label="Mobile"
          className={`md:hidden ${onLight ? "bg-white/95 text-ink" : "bg-black/95 text-white"}`}
        >
          <Container className="flex flex-col gap-1 py-4">
            {[...siteConfig.nav, siteConfig.cta].map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="py-3 text-lg"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </Container>
        </nav>
      )}
    </header>
  );
}
