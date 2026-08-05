"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/lib/site";

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <Container className="flex items-center justify-between py-5 lg:py-6">
        <Link href="/" aria-label="Funnel North — home" className="shrink-0">
          <Image
            src="/images/logo.png"
            alt="Funnel North"
            width={109}
            height={46}
            priority
            className="h-10 w-auto lg:h-[46px]"
          />
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-4 md:flex">
          {siteConfig.nav.map((item, i) => (
            <Link
              key={item.label}
              href={item.href}
              className={`p-2.5 transition-colors hover:text-white ${
                i === 0 ? "font-semibold text-white" : "font-medium text-[#d9d9d9]"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link
          href={siteConfig.cta.href}
          className="hidden rounded-pill bg-accent px-6 py-3 text-sm font-bold uppercase tracking-wide text-black transition-transform hover:scale-105 md:block"
        >
          {siteConfig.cta.label}
        </Link>

        <button
          type="button"
          className="flex size-12 items-center justify-center text-white md:hidden"
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
        <nav aria-label="Mobile" className="bg-black/95 md:hidden">
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
