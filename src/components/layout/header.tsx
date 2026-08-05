"use client";

import { useState } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/lib/site";

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <Container className="flex items-center justify-between py-6">
        {/* TODO: replace with the Funnel North logo asset once exported from Figma */}
        <Link href="/" className="heading-display text-xl text-white">
          Funnel North
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-4 md:flex">
          {siteConfig.nav.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="rounded-pill px-2.5 py-2.5 text-white/80 transition-colors hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link
          href={siteConfig.cta.href}
          className="hidden rounded-pill border border-white/40 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white transition-colors hover:border-white md:block"
        >
          {siteConfig.cta.label}
        </Link>

        <button
          type="button"
          className="text-white md:hidden"
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
        <nav aria-label="Mobile" className="bg-ink/95 md:hidden">
          <Container className="flex flex-col gap-1 py-4">
            {[...siteConfig.nav, siteConfig.cta].map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="py-3 text-lg text-white"
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
