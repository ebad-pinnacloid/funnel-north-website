/**
 * Central site configuration. Header, footer, and SEO metadata all read from
 * here so copy/links live in one place — this is also the seam where Decap CMS
 * content will be wired in later.
 */
export const siteConfig = {
  name: "Funnel North",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://funnelnorth.com",
  tagline: "Lead Growth Forward",
  description:
    "Funnel North is the growth partner for ambitious brands. We combine sharp strategy with bold creative to turn attention into measurable revenue.",
  contact: {
    email: "hello@funnelnorth.com",
    phone: "+1 2345 67891",
  },
  socials: [
    { label: "LinkedIn", href: "#" },
    { label: "Instagram", href: "#" },
    { label: "Behance", href: "#" },
  ],
  nav: [
    { label: "Home", href: "/" },
    { label: "Case Studies", href: "/case-studies" },
    { label: "Services", href: "/services" },
    { label: "About", href: "/about" },
  ],
  cta: { label: "Get in touch", href: "/contact" },
  footer: {
    services: [
      { label: "Performance Marketing", href: "/services" },
      { label: "SEO", href: "/services" },
      { label: "Branding", href: "/services" },
      { label: "Web Design & Dev", href: "/services" },
      { label: "CRO", href: "/services" },
      { label: "AI Automation", href: "/services" },
    ],
    company: [
      { label: "About", href: "/about" },
      { label: "Work", href: "/case-studies" },
      { label: "Industries", href: "/industries" },
      { label: "Marketing Insights", href: "/blog" },
      { label: "Contact", href: "/contact" },
    ],
    resources: [
      { label: "Growth playbooks", href: "/blog" },
      { label: "Case studies", href: "/case-studies" },
      { label: "Newsletter", href: "#newsletter" },
      { label: "Reports", href: "/blog" },
    ],
  },
} as const;
