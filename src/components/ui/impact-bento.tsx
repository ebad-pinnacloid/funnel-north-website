import Image from "next/image";
import { CountUp } from "@/components/ui/count-up";
import { Reveal } from "@/components/ui/reveal";

const avatars = [
  "/images/avatar-1.png",
  "/images/avatar-2.png",
  "/images/avatar-3.png",
  "/images/avatar-4.png",
];

/**
 * The impact bento: 100% strategy card, projects photo card, growth campaigns
 * and industries served. Shared by the homepage "Our Short Story" section and
 * the About page "Our Mission" section — the only difference between them is
 * the industries tile, which inverts to stay readable on its surface.
 */
export function ImpactBento({ onDark = false }: { onDark?: boolean }) {
  return (
    <div className="grid w-full gap-5 lg:grid-cols-[420fr_426fr_390fr] lg:gap-[22px]">
      {/* Strategy + active clients */}
      <Reveal className="flex min-h-[250px] flex-col justify-between rounded-xl bg-brand px-6 pb-5 pt-8 text-white lg:h-80">
        <div>
          <p className="heading-display text-[62px] leading-none lg:text-[72px] lg:leading-[73px] lg:tracking-[-0.6px]">
            <CountUp end={100} suffix="%" />
          </p>
          <Reveal delay={0.1}>
            <p className="mt-2 text-[15px] font-semibold tracking-[-0.2px]">
              Strategy-led approach
            </p>
          </Reveal>
        </div>
        <Reveal delay={0.2} className="flex h-[70px] items-center rounded-pill bg-white px-3">
          <div className="flex">
            {avatars.map((src, i) => (
              <Image
                key={src}
                src={src}
                alt=""
                width={38}
                height={38}
                className={`size-8 rounded-full border border-white lg:size-[38px] ${
                  i > 0 ? "-ml-3.5" : ""
                }`}
              />
            ))}
          </div>
          <p className="ml-2.5 text-sm font-semibold tracking-[-0.2px] text-black">
            60+ Active Clients
          </p>
        </Reveal>
      </Reveal>

      {/* Projects delivered — photo card */}
      <Reveal delay={0.1} className="reveal-scale relative min-h-[263px] overflow-hidden rounded-xl text-white lg:h-80">
        <Image
          src="/images/stat-projects.jpg"
          alt="The Funnel North team collaborating around a table"
          fill
          sizes="(max-width: 1024px) 100vw, 426px"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/[0.02] via-black/10 to-black/85" />
        <div className="absolute inset-x-6 bottom-5">
          <p className="heading-display text-[62px] leading-none lg:text-[74px] lg:leading-[76px] lg:tracking-[-0.5px]">
            <CountUp end={120} suffix="+" />
          </p>
          <Reveal delay={0.2}>
            <p className="mt-2 text-sm font-medium tracking-[-0.2px]">
              Projects delivered for ambitious brands
            </p>
          </Reveal>
        </div>
      </Reveal>

      {/* Growth campaigns + industries served */}
      <Reveal delay={0.2} className="flex flex-col gap-5 lg:h-80">
        <div className="relative flex flex-1 flex-col justify-end rounded-xl bg-accent p-6 max-lg:min-h-[176px]">
          <Image
            src="/images/motif-funnel.png"
            alt=""
            width={34}
            height={37}
            className="absolute right-4 top-4 h-[37px] w-auto transition-transform duration-300 hover:rotate-6"
          />
          <p className="heading-display text-[70px] leading-none text-ink lg:text-[82px] lg:leading-[82px] lg:tracking-[-0.5px]">
            <CountUp end={45} suffix="+" />
          </p>
          <Reveal delay={0.3}>
            <p className="mt-1 text-[15px] font-semibold tracking-[-0.2px] text-ink">
              Growth Campaigns
            </p>
          </Reveal>
        </div>
        <div
          className={`flex h-[93px] items-center justify-between rounded-xl px-6 lg:h-[104px] ${
            onDark ? "bg-white text-black" : "bg-ink text-white"
          }`}
        >
          <p className="heading-display text-[50px] leading-none lg:text-[58px] lg:leading-[60px] lg:tracking-[-0.5px]">
            <CountUp end={20} suffix="+" />
          </p>
          <Reveal delay={0.4}>
            <p className="text-sm font-semibold tracking-[-0.2px]">Industries Served</p>
          </Reveal>
        </div>
      </Reveal>
    </div>
  );
}
