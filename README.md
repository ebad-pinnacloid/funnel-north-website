# Funnel North — Website

Marketing site for Funnel North, an end-to-end marketing agency. Built with
Next.js (App Router) and Tailwind CSS v4, deployed on Vercel. Decap CMS
integration is planned as a later phase.

## Stack

- **Next.js 16** (App Router, TypeScript, Turbopack)
- **Tailwind CSS v4** — design tokens live in `src/app/globals.css` under `@theme`
- **Fonts** — Anton (display headings) + Inter (UI/body) via `next/font`, self-hosted at build time

## Getting started

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
npm run lint
```

## Structure

```
src/
  app/                 # routes, layout, globals.css, robots.ts, sitemap.ts
  components/
    layout/            # Header, Footer
    sections/          # Homepage sections (Hero, Services, FAQ, ...)
    ui/                # Reusable primitives (Container, PillButton, SectionHeading)
  lib/
    site.ts            # Central site config: nav, footer links, contact, SEO copy
```

## Design system

Tokens are sourced from the Figma `--fn-*` variable set and exposed as Tailwind
utilities via `@theme` in `globals.css`:

| Token | Value | Usage |
| --- | --- | --- |
| `brand` | `#7b3df2` | Hero/brand surfaces |
| `brand-deep` | `#6227d4` | Brand text on light |
| `accent` | `#e7fe25` | CTAs, highlights |
| `ink` | `#0f092b` | Primary text, dark sections |
| `muted` | `#7d798c` | Secondary text |
| `surface-tint` | `#f1edff` | Tinted section backgrounds |
| `line` | `#d0cfd8` | Dividers/borders |

Display headings use the `.heading-display` class (Anton, uppercase, tight
tracking).

## Environment

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical site URL used for SEO metadata, sitemap, robots. Defaults to `https://funnelnorth.com`. |

## Deployment

Push to the connected Vercel project — no extra configuration required.
Set `NEXT_PUBLIC_SITE_URL` in the Vercel environment settings.
