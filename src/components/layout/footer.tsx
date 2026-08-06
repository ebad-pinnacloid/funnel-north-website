import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { siteConfig } from "@/lib/site";

const columns = [
  { title: "Services", links: siteConfig.footer.services },
  { title: "Company", links: siteConfig.footer.company },
  { title: "Resources", links: siteConfig.footer.resources },
];

export function Footer() {
  return (
    <footer className="bg-black pb-8 pt-14 text-white lg:pt-[66px]">
      <Container>
        <div className="flex flex-col gap-12 lg:flex-row lg:items-center lg:justify-between">
          <Reveal className="flex flex-col gap-5 lg:w-[384px]">
            <Link href="/" aria-label="Funnel North — home">
              <Image
                src="/images/logo.png"
                alt="Funnel North"
                width={217}
                height={91}
                className="h-[67px] w-auto lg:h-[91px]"
              />
            </Link>
            <p className="text-base leading-6 text-white/55">
              Strategic growth, guided with clarity. A growth-focused marketing
              agency turning momentum into measurable results.
            </p>
            <ul className="flex gap-2.5">
              {siteConfig.socials.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    className="flex h-10 items-center rounded-pill border border-white/15 px-4 text-sm text-accent transition-colors hover:border-accent"
                  >
                    {social.label}
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.15} className="w-full scroll-mt-24 lg:max-w-[643px]">
            <p className="text-[11.5px] font-semibold uppercase tracking-[2.5px] text-accent">
              Newsletter
            </p>
            <p className="mt-3 text-xl font-bold leading-7">Growth insights, twice a month.</p>
            {/* TODO: connect the newsletter form to a provider */}
            <form
              id="newsletter"
              className="mt-5 flex flex-col gap-3 sm:h-[66px] sm:flex-row sm:items-center sm:gap-2 sm:rounded-pill sm:border sm:border-white/15 sm:bg-white/5 sm:p-1.5"
            >
              <input
                type="email"
                required
                placeholder="you@email.com"
                className="h-14 flex-1 rounded-pill border border-white/15 bg-white/5 px-4 text-sm text-white outline-none placeholder:text-white/40 focus:border-accent sm:h-full sm:border-0 sm:bg-transparent"
              />
              <button
                type="submit"
                className="mr-6 h-14 shrink-0 cursor-pointer rounded-pill bg-accent px-5 text-sm font-bold uppercase text-black transition-transform hover:scale-105 sm:h-10"
              >
                Subscribe <span aria-hidden className="font-semibold normal-case">↗</span>
              </button>
            </form>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-10 border-y border-white/15 py-12 sm:grid-cols-3 lg:mt-[69px] lg:py-[61px]">
          {columns.map((column, i) => (
            <Reveal key={column.title} delay={i * 0.1}>
            <nav aria-label={column.title}>
              <p className="text-[11.5px] font-semibold uppercase tracking-[2.5px] text-accent">
                {column.title}
              </p>
              <ul className="mt-5 space-y-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-base leading-6 text-white/65 transition-colors hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            </Reveal>
          ))}
        </div>

        <div className="mt-7 flex flex-col justify-between gap-4 text-sm text-white/40 sm:flex-row">
          <p>© {new Date().getFullYear()} Funnel North. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="transition-colors hover:text-white">
              Privacy Policy
            </Link>
            <Link href="/terms" className="transition-colors hover:text-white">
              Terms &amp; Conditions
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
