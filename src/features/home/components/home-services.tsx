import Image from "next/image";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

import { Container } from "~/components/shared";
import { Shape } from "~/components/ui";
import { HOME_SERVICES } from "~/features/home/data";
import type { HomeService } from "~/features/home/types";
import { cn } from "~/lib";

import { SectionHeading } from "./section-heading";

/** Bottom edge drop L→R in viewBox units (left sits lower). */
const CARD_BOTTOM_SLANT = 10;
/** Soft corner radius in 0–100 viewBox units. */
const CARD_CORNER_R = 7;
const CARD_VIEWBOX = "0 0 100 100";
/** Figma service card fill. */
const CARD_BG = "rgb(236, 238, 242)";

/**
 * Service body silhouette: flat rounded top,
 * bottom-left lower than bottom-right.
 */
function serviceCardBodyPath(
  slant = CARD_BOTTOM_SLANT,
  r = CARD_CORNER_R,
): string {
  const w = 100;
  const h = 100;
  const bottomLeft = h;
  const bottomRight = h - slant;
  const slope = (bottomLeft - bottomRight) / w;

  const afterTrY = r;
  const beforeBrY = bottomRight - r;
  const afterBrX = w - r;
  const afterBrY = bottomRight + slope * r;
  const beforeBlX = r;
  const beforeBlY = bottomLeft - slope * r;
  const afterBlY = bottomLeft - r;

  return [
    `M ${r} 0`,
    `L ${w - r} 0`,
    `Q ${w} 0 ${w} ${afterTrY}`,
    `L ${w} ${beforeBrY}`,
    `Q ${w} ${bottomRight} ${afterBrX} ${afterBrY}`,
    `L ${beforeBlX} ${beforeBlY}`,
    `Q 0 ${bottomLeft} 0 ${afterBlY}`,
    `L 0 ${r}`,
    `Q 0 0 ${r} 0`,
    "Z",
  ].join(" ");
}

const SERVICE_CARD_PATH = serviceCardBodyPath();

function ServiceCard({ service }: { service: HomeService }) {
  return (
    <li className="flex flex-col">
      {/* Image above card; only a bit of watermark bottom tucks under the image */}
      <div className="relative z-10 -mb-8 flex min-h-44 items-end justify-center px-2 pt-6 sm:-mb-10 sm:min-h-48 md:min-h-52">
        <span
          aria-hidden
          className={cn(
            "pointer-events-none absolute inset-x-0 top-[18%] z-0 flex justify-center select-none",
            "sm:top-[16%]",
          )}
        >
          <span
            className={cn(
              "text-foreground/[0.08] max-w-full truncate text-[clamp(2.5rem,8vw,3.75rem)] leading-none font-bold tracking-tight",
              "[text-shadow:0_1px_2px_rgb(15_23_42_/_0.12),0_2px_8px_rgb(255_255_255_/_0.9),0_8px_28px_rgb(255_255_255_/_0.65)]",
            )}
          >
            {service.watermark}
          </span>
        </span>

        <span
          aria-hidden
          className={cn(
            "pointer-events-none absolute bottom-2 start-1/2 z-[1] -translate-x-1/2 rtl:translate-x-1/2",
            "h-[75%] w-[min(100%,19rem)] translate-y-[35%]",
            "rounded-[50%] bg-background/95 blur-2xl",
            "sm:bottom-0 sm:h-[80%] sm:w-[min(100%,21rem)] sm:translate-y-[40%] sm:blur-3xl",
          )}
        />

        <div className="relative z-10 w-full max-w-[17.5rem]">
          <Image
            src={service.imageSrc}
            alt={service.imageAlt}
            className="mx-auto h-auto w-full object-contain mix-blend-lighten dark:mix-blend-normal"
            sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 280px"
            priority={false}
          />
        </div>
      </div>

      <Shape
        shape="custom"
        customPath={SERVICE_CARD_PATH}
        customViewBox={CARD_VIEWBOX}
        width="100%"
        height="auto"
        background={CARD_BG}
        className="relative z-0 flex w-full flex-1"
        clipContent
      >
        <div
          className={cn(
            "flex w-full flex-1 flex-col items-center gap-4",
            "px-5 pt-10 pb-8 text-center sm:gap-5 sm:px-6 sm:pt-12 sm:pb-10",
          )}
        >
          <div className="w-full space-y-2 text-[#343A46]">
            <h3 className="text-base font-bold tracking-tight md:text-lg">
              {service.title}
            </h3>
            <p className="text-xs leading-relaxed text-pretty sm:text-sm">
              {service.description}
            </p>
          </div>

          <Link
            href={service.ctaHref}
            className={cn(
              "hover:text-primary mt-auto inline-flex items-center justify-center gap-1 text-[#343A46]",
              "text-xs font-medium transition-colors sm:text-sm",
            )}
          >
            <span>{service.ctaLabel}</span>
            <ChevronLeft className="size-3.5 shrink-0" aria-hidden />
          </Link>
        </div>
      </Shape>
    </li>
  );
}

/** Six services in a 3-column grid (2 rows on desktop). */
export function HomeServices() {
  return (
    <section
      id="services"
      aria-labelledby="home-services-heading"
      className="relative overflow-hidden py-10 md:py-14"
    >
      <Container className="relative z-10">
        <SectionHeading
          id="home-services-heading"
          title="خدمات ما"
          description="راهکارهای تخصصی برای بازرگانان، شرکت‌ها و صاحبان کالا؛ برآورد اولیه همان لحظه"
          align="center"
          showMark={false}
          showUnderline
          className="[&_h2]:text-primary mb-8 items-center text-center sm:mb-10 sm:flex-col sm:items-center sm:justify-center [&_p]:mx-auto"
        />

        <ul className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-8">
          {HOME_SERVICES.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </ul>
      </Container>
    </section>
  );
}
