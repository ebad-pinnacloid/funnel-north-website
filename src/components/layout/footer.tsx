import Link from "next/link";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/lib/site";

const columns = [
  { title: "Services", links: siteConfig.footer.services },
  { title: "Company", links: siteConfig.footer.company },
  { title: "Resources", links: siteConfig.footer.resources },
];

export function Footer() {
  return (
    <footer className="bg-ink text-white">
      <Container className="py-16">
        <div className="flex flex-col justify-between gap-12 lg:flex-row">
          <div className="max-w-sm">
            {/* TODO: replace with the Funnel North logo asset once exported from Figma */}
            <p className="heading-display text-3xl">Funnel North</p>
            <p className="mt-6 text-overlay-white-60">
              Strategic growth, guided with clarity. A growth-focused marketing
              agency for ambitious brands.
            </p>
            <ul className="mt-8 flex gap-3">
              {siteConfig.socials.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    className="rounded-pill border border-overlay-white-16 px-4 py-2.5 text-sm transition-colors hover:border-white"
                  >
                    {social.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div id="newsletter" className="max-w-xl flex-1">
            <p className="text-sm font-semibold uppercase tracking-wide text-overlay-white-60">
              Newsletter
            </p>
            <p className="mt-2 text-lg">Growth insights, twice a month.</p>
            {/* TODO: wire up newsletter form action */}
            <form className="mt-6 flex gap-2 rounded-pill border border-overlay-white-16 p-2">
              <input
                type="email"
                required
                placeholder="you@company.com"
                className="w-full bg-transparent px-4 text-sm outline-none placeholder:text-overlay-white-40"
              />
              <button
                type="submit"
                className="shrink-0 rounded-pill bg-accent px-5 py-2.5 text-sm font-semibold text-black"
              >
                Subscribe ↗
              </button>
            </form>
          </div>
        </div>

        <div className="mt-16 grid gap-10 border-t border-overlay-white-16 pt-12 sm:grid-cols-3">
          {columns.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <p className="text-sm font-semibold uppercase tracking-wide text-overlay-white-60">
                {column.title}
              </p>
              <ul className="mt-5 space-y-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-overlay-white-60 transition-colors hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-12 flex flex-col justify-between gap-4 border-t border-overlay-white-16 pt-8 text-sm text-overlay-white-60 sm:flex-row">
          <p>© {new Date().getFullYear()} Funnel North. All rights reserved.</p>
          <div className="flex gap-8">
            <Link href="/privacy" className="hover:text-white">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white">
              Terms &amp; Conditions
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
