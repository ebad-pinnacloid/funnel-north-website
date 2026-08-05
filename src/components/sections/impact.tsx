import Image from "next/image";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";

const avatars = [
  "/images/avatar-1.png",
  "/images/avatar-2.png",
  "/images/avatar-3.png",
  "/images/avatar-4.png",
];

/** "Our Short Story" statement + impact bento on the dark ink surface. */
export function Impact() {
  return (
    <section className="bg-ink py-16 text-white lg:py-24">
      <Container className="flex flex-col items-center gap-10">
        <div className="flex flex-col items-center gap-5">
          <Eyebrow onDark className="lg:justify-center">
            Our Short Story
          </Eyebrow>
          <p className="max-w-[1060px] text-[28px] font-medium leading-[1.5] tracking-[-1px] lg:text-center lg:text-[41px] lg:leading-[62px]">
            We&rsquo;re a{" "}
            <span className="font-semibold text-accent">results-driven marketing agency</span>{" "}
            helping brands grow through creative content, strategic campaigns, and data-backed
            solutions.
          </p>
        </div>

        <div className="grid w-full gap-5 lg:grid-cols-[420fr_426fr_390fr] lg:gap-[22px]">
          {/* Strategy + active clients */}
          <div className="flex min-h-[250px] flex-col justify-between rounded-xl bg-brand px-6 pb-5 pt-8 lg:h-80">
            <div>
              <p className="heading-display text-[62px] leading-none lg:text-[72px] lg:leading-[73px] lg:tracking-[-0.6px]">
                100%
              </p>
              <p className="mt-2 text-[15px] font-semibold tracking-[-0.2px]">
                Strategy-led approach
              </p>
            </div>
            <div className="flex h-[70px] items-center rounded-pill bg-white px-3">
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
            </div>
          </div>

          {/* Projects delivered — photo card */}
          <div className="relative min-h-[263px] overflow-hidden rounded-xl lg:h-80">
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
                120+
              </p>
              <p className="mt-2 text-sm font-medium tracking-[-0.2px]">
                Projects delivered for ambitious brands
              </p>
            </div>
          </div>

          {/* Growth campaigns + industries served */}
          <div className="flex flex-col gap-5 lg:h-80">
            <div className="relative flex flex-1 flex-col justify-end rounded-xl bg-accent p-6 max-lg:min-h-[176px]">
              <Image
                src="/images/motif-funnel.png"
                alt=""
                width={34}
                height={37}
                className="absolute right-4 top-4 h-[37px] w-auto transition-transform duration-300 hover:rotate-6"
              />
              <p className="heading-display text-[70px] leading-none text-ink lg:text-[82px] lg:leading-[82px] lg:tracking-[-0.5px]">
                45+
              </p>
              <p className="mt-1 text-[15px] font-semibold tracking-[-0.2px] text-ink">
                Growth Campaigns
              </p>
            </div>
            <div className="flex h-[93px] items-center justify-between rounded-xl bg-white px-6 text-black lg:h-[104px]">
              <p className="heading-display text-[50px] leading-none lg:text-[58px] lg:leading-[60px] lg:tracking-[-0.5px]">
                20+
              </p>
              <p className="text-sm font-semibold tracking-[-0.2px]">Industries Served</p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
