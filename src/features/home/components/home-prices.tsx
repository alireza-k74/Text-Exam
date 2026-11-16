"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { useRef } from "react";

import { Container } from "~/components/shared";
import { Button } from "~/components/ui";
import { HOME_PRICE_CATEGORIES } from "~/features/home/data";
import type {
  PriceCategory,
  PriceCategoryTone,
  PriceVehicle,
} from "~/features/home/types";
import { cn } from "~/lib";

import { SectionHeading } from "./section-heading";

function TomanIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden
      className={cn("size-3.5 shrink-0", className)}
    >
      <circle cx="8" cy="8" r="7" fill="currentColor" fillOpacity="0.18" />
      <path
        d="M5.2 4.6h5.6M8 4.6v6.8M5.6 11.4h4.8"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

function PriceVehicleCard({ vehicle }: { vehicle: PriceVehicle }) {
  return (
    <article
      role="listitem"
      className="bg-card border-border shadow-sm flex w-[13rem] shrink-0 snap-start flex-col overflow-hidden rounded-2xl border sm:w-[14.5rem]"
    >
      <div className="flex items-start justify-between gap-2 px-3 pt-3 pb-1">
        <h4 className="text-foreground min-w-0 flex-1 text-sm leading-snug font-semibold">
          {vehicle.title}
        </h4>
        <Button
          type="button"
          variant="outline"
          size="icon"
          aria-label={`جزئیات ${vehicle.title}`}
          className="border-border text-foreground size-8 shrink-0 rounded-lg"
        >
          <ChevronLeft className="size-4" aria-hidden />
        </Button>
      </div>

      <p className="text-primary flex items-center gap-1.5 px-3 pb-2.5 text-sm leading-none font-semibold tabular-nums">
        <TomanIcon className="text-primary size-3.5" />
        <span>{vehicle.price}</span>
        <span className="sr-only">تومان</span>
      </p>

      <div className="relative mx-2 mb-2 aspect-[5/4] overflow-hidden rounded-xl">
        <Image
          src={vehicle.imageSrc}
          alt={vehicle.imageAlt}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 52vw, 232px"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[55%] bg-gradient-to-t from-black/80 via-black/35 to-transparent"
        />
        {vehicle.brand ? (
          <span className="text-primary-foreground/95 absolute end-2.5 top-2.5 text-[0.65rem] font-bold tracking-wide drop-shadow-sm">
            {vehicle.brand}
          </span>
        ) : null}
        <ul className="text-primary-foreground absolute inset-x-0 bottom-0 flex flex-col gap-0.5 px-2.5 pb-2.5 text-xs leading-snug font-medium">
          {vehicle.specs.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
      </div>
    </article>
  );
}

const BANNER_TONE: Record<
  PriceCategoryTone,
  { shell: string; watermark: string }
> = {
  cars: {
    shell: "bg-[var(--color-neutral-800)] dark:bg-[var(--color-neutral-900)]",
    watermark: "text-primary-foreground/15",
  },
  tractors: {
    shell: "bg-primary",
    watermark: "text-primary-foreground/20",
  },
};

function CategoryBanner({ category }: { category: PriceCategory }) {
  const tone = BANNER_TONE[category.tone];

  return (
    <div
      className={cn(
        "relative flex h-full min-h-56 w-[7.25rem] shrink-0 flex-col overflow-hidden rounded-2xl sm:min-h-60 sm:w-36 md:w-40",
        tone.shell,
      )}
    >
      <div className="relative z-10 space-y-1 px-3 pt-4 sm:px-4 sm:pt-5">
        <p className="text-primary-foreground text-sm leading-snug font-bold sm:text-base">
          {category.title}
        </p>
        <p className="text-primary-foreground/80 text-[0.7rem] leading-snug sm:text-xs">
          {category.subtitle}
        </p>
      </div>

      <span
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-x-0 top-[28%] flex justify-center overflow-hidden select-none",
          tone.watermark,
        )}
      >
        <span className="text-[clamp(1.75rem,5vw,2.75rem)] font-black tracking-tight uppercase">
          {category.watermark}
        </span>
      </span>

      <div className="relative mt-auto min-h-28 w-full flex-1">
        <Image
          src={category.bannerSrc}
          alt={category.bannerAlt}
          fill
          className="object-contain object-bottom mix-blend-lighten dark:mix-blend-normal"
          sizes="160px"
        />
      </div>
    </div>
  );
}

function PriceCategoryRow({ category }: { category: PriceCategory }) {
  const scrollerRef = useRef<HTMLDivElement>(null);

  function scrollNext() {
    const node = scrollerRef.current;
    if (!node) return;
    const delta = Math.max(node.clientWidth * 0.7, 220);
    // In RTL, scrolling toward more content uses a negative delta.
    node.scrollBy({ left: -delta, behavior: "smooth" });
  }

  return (
    <div className="min-w-0">
      <div className="flex items-stretch gap-3 sm:gap-4">
        <CategoryBanner category={category} />

        <div className="relative min-w-0 flex-1 overflow-x-clip">
          <div
            ref={scrollerRef}
            role="list"
            aria-label={category.title}
            className="flex h-full min-w-0 gap-3 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] snap-x snap-mandatory [&::-webkit-scrollbar]:hidden"
          >
            {category.vehicles.map((vehicle) => (
              <PriceVehicleCard key={vehicle.id} vehicle={vehicle} />
            ))}
          </div>

          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={scrollNext}
            aria-label={`مشاهده بیشتر ${category.seeMoreLabel}`}
            className="border-border bg-background/95 text-foreground absolute end-0 top-1/2 z-10 hidden size-9 -translate-y-1/2 rounded-full shadow-md backdrop-blur-sm sm:inline-flex"
          >
            <ChevronLeft className="size-4" aria-hidden />
          </Button>
        </div>
      </div>

      <div className="mt-3 flex justify-end">
        <Link
          href={category.seeMoreHref}
          className="text-primary hover:text-primary/80 inline-flex items-center gap-1 text-sm font-medium transition-colors"
        >
          <span>{category.seeMoreLabel}</span>
          <ChevronLeft className="size-4 shrink-0" aria-hidden />
        </Link>
      </div>
    </div>
  );
}

/** Daily vehicle prices — cars + imported tractors. */
export function HomePrices() {
  return (
    <section
      id="prices"
      aria-labelledby="home-prices-heading"
      className="bg-muted/40 border-border overflow-x-clip border-t py-10 md:py-14"
    >
      <Container className="min-w-0">
        <SectionHeading
          id="home-prices-heading"
          title="قیمت روز"
          description="خودروهای موجود به دلار و کشنده‌های وارداتی به یورو، هر دو با معادل تومانی"
          className="mb-8 sm:mb-10"
        />

        <div className="flex flex-col gap-8 md:gap-10">
          {HOME_PRICE_CATEGORIES.map((category) => (
            <PriceCategoryRow key={category.id} category={category} />
          ))}
        </div>
      </Container>
    </section>
  );
}
