import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { PillButton } from "@/components/ui/pill-button";
import { ArrowDiag } from "@/components/ui/arrow-diag";

/* Post data will come from Decap CMS later. */
const posts = [
  {
    title: "Designing a visual identity that clicks",
    category: "Design",
    image: "/images/blog-1.jpg",
    href: "/blog",
  },
  {
    title: "Why is marketing dashboard required?",
    category: "Design",
    image: "/images/blog-2.jpg",
    href: "/blog",
  },
  {
    title: "Designing a Visual Identity That Clicks",
    category: "Design",
    image: "/images/blog-3.jpg",
    href: "/blog",
  },
];

export function Insights() {
  return (
    <section className="bg-white py-16 lg:py-24">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="flex flex-col gap-5">
            <Eyebrow>Blog</Eyebrow>
            <h2 className="heading-display text-[44px] leading-[1.05] text-ink lg:text-[64px] lg:leading-[69px]">
              Marketing Insights
            </h2>
          </div>
          <PillButton href="/blog" variant="dark" className="max-lg:hidden">
            Read all blogs
          </PillButton>
        </div>

        <div className="mt-10 grid gap-10 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3 lg:gap-[21px]">
          {posts.map((post) => (
            <Link key={post.title} href={post.href} className="group flex flex-col gap-3.5">
              <div className="relative aspect-square overflow-hidden rounded-[14px]">
                <Image
                  src={post.image}
                  alt=""
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 412px"
                  className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="rounded-pill bg-[rgba(220,204,255,0.5)] px-[15px] py-[9px] text-sm font-medium text-[#0b0c0f]">
                  {post.category}
                </span>
                <ArrowDiag className="h-[15px] w-[17px] -scale-y-100 text-brand transition-transform group-hover:translate-x-0.5" />
              </div>
              <h3 className="text-[21px] font-semibold leading-[34px] text-[#141111]">
                {post.title}
              </h3>
            </Link>
          ))}
        </div>

        <div className="mt-10 lg:hidden">
          <PillButton href="/blog" variant="dark" className="w-full">
            Read all blogs
          </PillButton>
        </div>
      </Container>
    </section>
  );
}
