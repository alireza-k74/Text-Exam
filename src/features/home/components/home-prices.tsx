"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { useRef, type ComponentType } from "react";

import {
  DafIcon,
  ManIcon,
  MercedesBenzIcon,
  MgIcon,
  MitsubishiIcon,
  PricesChevronIcon,
  RenaultIcon,
  ScaniaIcon,
  TomanIcon,
  ToyotaIcon,
  VolvoIcon,
} from "~/components/icons";
import { Container } from "~/components/shared";
import { Button, Shape } from "~/components/ui";
import { HOME_PRICE_CATEGORIES } from "~/features/home/data";
import type {
  PriceCategory,
  PriceCategoryTone,
  PriceVehicle,
} from "~/features/home/types";
import { useAutoScroll } from "~/hooks";
import { cn } from "~/lib";

const VEHICLE_BRAND_ICON: Record<
  string,
  ComponentType<{ className?: string }>
> = {
  Toyota: ToyotaIcon,
  MG: MgIcon,
  "Mercedes-Benz": MercedesBenzIcon,
  Mitsubishi: MitsubishiIcon,
  DAF: DafIcon,
  Volvo: VolvoIcon,
  Renault: RenaultIcon,
  Scania: ScaniaIcon,
  MAN: ManIcon,
};

const BANNER_CHEVRON_COUNT = 6;

import { SectionHeading } from "./section-heading";

/** Mild top slant: physical right higher, left lower. */
const PRICES_TOP_SLANT = 2.5;
const PRICES_CORNER_R = 2.5;
const PRICES_W = 200;
const PRICES_H = 100;
const PRICES_VIEWBOX = `0 0 ${PRICES_W} ${PRICES_H}`;

/**
 * Prices panel silhouette: rounded corners,
 * top-right higher than top-left.
 */
function pricesPanelPath(
  slant = PRICES_TOP_SLANT,
  r = PRICES_CORNER_R,
): string {
  const w = PRICES_W;
  const h = PRICES_H;
  const topLeft = slant;
  const topRight = 0;
  const slope = (topLeft - topRight) / w;

  const afterTlX = r;
  const afterTlY = topLeft - slope * r;
  const beforeTrX = w - r;
  const beforeTrY = topLeft - slope * (w - r);

  return [
    `M 0 ${h - r}`,
    `L 0 ${topLeft + r}`,
    `Q 0 ${topLeft} ${afterTlX} ${afterTlY}`,
    `L ${beforeTrX} ${beforeTrY}`,
    `Q ${w} ${topRight} ${w} ${topRight + r}`,
    `L ${w} ${h - r}`,
    `Q ${w} ${h} ${w - r} ${h}`,
    `L ${r} ${h}`,
    `Q 0 ${h} 0 ${h - r}`,
    "Z",
  ].join(" ");
}

const PRICES_PANEL_PATH = pricesPanelPath();

/** Vehicle card image — XD: 216×138.57, top slant (physical right higher). */
const VEHICLE_IMG_W = 216;
const VEHICLE_IMG_H = 138.57028198242188;
const VEHICLE_IMG_SLANT = 12;
const VEHICLE_IMG_CORNER_R = 12;
const VEHICLE_IMG_VIEWBOX = `0 0 ${VEHICLE_IMG_W} ${VEHICLE_IMG_H}`;

function pricesVehicleImagePath(
  slant = VEHICLE_IMG_SLANT,
  r = VEHICLE_IMG_CORNER_R,
): string {
  const w = VEHICLE_IMG_W;
  const h = VEHICLE_IMG_H;
  const topLeft = slant;
  const topRight = 0;
  const slope = (topLeft - topRight) / w;

  const afterTlX = r;
  const afterTlY = topLeft - slope * r;
  const beforeTrX = w - r;
  const beforeTrY = topLeft - slope * (w - r);

  return [
    `M 0 ${h - r}`,
    `L 0 ${topLeft + r}`,
    `Q 0 ${topLeft} ${afterTlX} ${afterTlY}`,
    `L ${beforeTrX} ${beforeTrY}`,
    `Q ${w} ${topRight} ${w} ${topRight + r}`,
    `L ${w} ${h - r}`,
    `Q ${w} ${h} ${w - r} ${h}`,
    `L ${r} ${h}`,
    `Q 0 ${h} 0 ${h - r}`,
    "Z",
  ].join(" ");
}

const VEHICLE_IMG_PATH = pricesVehicleImagePath();

/** Category banner — XD: 160×221, gap -1, radius ~16.
 * Top & bottom slant: physical right higher, left lower.
 */
const BANNER_LAYOUT_W = 160;
const BANNER_LAYOUT_H = 221;
const BANNER_CORNER_R = 16;
const BANNER_SLANT = 8;
const BANNER_VIEWBOX = `0 0 ${BANNER_LAYOUT_W} ${BANNER_LAYOUT_H}`;

function pricesBannerPath(slant = BANNER_SLANT, r = BANNER_CORNER_R): string {
  const w = BANNER_LAYOUT_W;
  const h = BANNER_LAYOUT_H;
  const topLeft = slant;
  const topRight = 0;
  const bottomLeft = h;
  const bottomRight = h - slant;
  const slope = slant / w;

  const afterTlX = r;
  const afterTlY = topLeft - slope * r;
  const beforeTrX = w - r;
  const beforeTrY = topLeft - slope * (w - r);
  const afterBrX = w - r;
  const afterBrY = bottomLeft - slope * (w - r);
  const beforeBlX = r;
  const beforeBlY = bottomLeft - slope * r;

  return [
    `M 0 ${bottomLeft - r}`,
    `L 0 ${topLeft + r}`,
    `Q 0 ${topLeft} ${afterTlX} ${afterTlY}`,
    `L ${beforeTrX} ${beforeTrY}`,
    `Q ${w} ${topRight} ${w} ${topRight + r}`,
    `L ${w} ${bottomRight - r}`,
    `Q ${w} ${bottomRight} ${afterBrX} ${afterBrY}`,
    `L ${beforeBlX} ${beforeBlY}`,
    `Q 0 ${bottomLeft} 0 ${bottomLeft - r}`,
    "Z",
  ].join(" ");
}

const PRICES_BANNER_PATH = pricesBannerPath();

function PriceVehicleCard({ vehicle }: { vehicle: PriceVehicle }) {
  const BrandIcon = vehicle.brand
    ? VEHICLE_BRAND_ICON[vehicle.brand]
    : undefined;

  return (
    <article
      role="listitem"
      className="relative flex w-[216px] shrink-0 snap-start flex-col"
    >
      {/* Soft blue header — image overlaps the bottom */}
      <div className="bg-on-primary-soft ms-auto flex w-[95%] flex-col rounded-2xl px-3 pt-3 pb-14">
        <h4 className="text-foreground min-w-0 text-start text-sm leading-snug font-medium">
          {vehicle.title}
        </h4>

        <div className="mt-2 flex items-center justify-between gap-2">
          <p className="flex min-w-0 items-center gap-1.5 text-sm leading-none font-semibold tabular-nums">
            <span className="text-foreground font-normal">{vehicle.price}</span>
            <TomanIcon className="text-highlight h-2.5 w-[1.375rem]" />
            <span className="sr-only">تومان</span>
          </p>
          <Button
            type="button"
            variant="outline"
            size="icon"
            aria-label={`جزئیات ${vehicle.title}`}
            className="size-8 shrink-0 rounded-md border-[color:var(--home-prices-card-btn-border)] bg-transparent text-[color:var(--home-prices-card-btn-fg)] shadow-none hover:bg-transparent"
          >
            <ChevronLeft className="size-4" aria-hidden />
          </Button>
        </div>
      </div>

      {/* Image — XD 216×138.57 */}
      <div className="relative z-10 -mt-11 aspect-[216/138.57028198242188] w-full opacity-100">
        <Shape
          shape="custom"
          customPath={VEHICLE_IMG_PATH}
          customViewBox={VEHICLE_IMG_VIEWBOX}
          width="100%"
          height="100%"
          fit="fill"
          clipContent
          className="absolute inset-0 size-full min-h-0 min-w-0"
        >
          <Image
            src={vehicle.imageSrc}
            alt={vehicle.imageAlt}
            fill
            className="object-cover"
            sizes={`${VEHICLE_IMG_W}px`}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 h-[55%] bg-gradient-to-t from-black/80 via-black/35 to-transparent"
          />
          {BrandIcon ? (
            <span
              aria-label={vehicle.brand}
              className="text-primary-foreground absolute start-2.5 top-2.5 drop-shadow-sm"
            >
              <BrandIcon className="size-5" />
            </span>
          ) : vehicle.brand ? (
            <span className="text-primary-foreground/95 absolute start-2.5 top-2.5 text-[0.65rem] font-bold tracking-wide drop-shadow-sm">
              {vehicle.brand}
            </span>
          ) : null}
          <div className="text-primary-foreground absolute inset-x-0 bottom-0 flex min-w-0 items-end justify-center px-2.5 pb-2.5">
            <ul className="flex min-w-0 flex-wrap items-center justify-center gap-x-2 gap-y-0.5 text-xs leading-snug font-normal">
              {vehicle.specs.map((line) => (
                <li key={line} className="shrink-0">
                  {line}
                </li>
              ))}
            </ul>
          </div>
        </Shape>
      </div>
    </article>
  );
}

const BANNER_TONE: Record<
  PriceCategoryTone,
  { background: string; accent: string }
> = {
  cars: {
    background: "var(--home-prices-banner-cars)",
    accent: "text-[color:var(--home-prices-banner-accent-cars)]",
  },
  tractors: {
    background: "var(--home-prices-banner-tractors)",
    accent: "text-[color:var(--home-prices-banner-accent-tractors)]",
  },
};

function CategoryBanner({ category }: { category: PriceCategory }) {
  const tone = BANNER_TONE[category.tone];

  return (
    <div className="relative h-[13.8125rem] w-[10rem] shrink-0 overflow-visible">
      <Shape
        shape="custom"
        customPath={PRICES_BANNER_PATH}
        customViewBox={BANNER_VIEWBOX}
        width={BANNER_LAYOUT_W}
        height={BANNER_LAYOUT_H}
        fit="fill"
        background={tone.background}
        clipContent
        className={cn(
          "relative z-0 size-full",
          "[&_.ui-shape__content]:flex [&_.ui-shape__content]:h-full [&_.ui-shape__content]:min-h-0 [&_.ui-shape__content]:flex-col [&_.ui-shape__content]:items-stretch [&_.ui-shape__content]:justify-center",
        )}
      >
        <div className="relative flex size-full min-h-0 flex-col items-stretch justify-center px-3 py-3 sm:px-4 sm:py-4">
          <div className="relative z-10 flex w-full shrink-0 flex-col gap-1.5">
            <div className="space-y-0.5 text-start">
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
                "pointer-events-none -me-2 flex justify-end overflow-hidden select-none",
                tone.accent,
              )}
            >
              <span className="text-end text-[clamp(1.65rem,4.75vw,2.25rem)] leading-none font-black tracking-tight uppercase">
                {category.watermark}
              </span>
            </span>

            <div
              aria-hidden
              className={cn(
                "-me-2 flex items-center justify-end gap-0",
                tone.accent,
              )}
            >
              {Array.from({ length: BANNER_CHEVRON_COUNT }, (_, index) => (
                <PricesChevronIcon key={index} className="h-10 w-[21px]" />
              ))}
            </div>
          </div>
        </div>
      </Shape>

      {/* Sits above all banner items; peeks past bottom + physical right a bit */}
      <div className="pointer-events-none absolute -start-5 -bottom-3 z-20 h-[9.75rem] w-[9.75rem] sm:-bottom-4">
        <Image
          src={category.bannerSrc}
          alt={category.bannerAlt}
          fill
          className="object-contain object-bottom"
          sizes={`${BANNER_LAYOUT_W}px`}
        />
      </div>
    </div>
  );
}

function PriceCategoryRow({ category }: { category: PriceCategory }) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const { goNext } = useAutoScroll(scrollerRef, category.vehicles.length, {
    intervalMs: 3200,
    pauseOnHover: true,
  });

  return (
    /* Pull flush to physical left (cancel Shape content pe padding) */
    <div className="-me-4 min-w-0 sm:-me-6 md:-me-8">
      <div className="flex items-end gap-3 sm:gap-4">
        <CategoryBanner category={category} />

        <div className="relative flex min-w-0 flex-1 items-end overflow-x-hidden">
          <div
            ref={scrollerRef}
            role="list"
            aria-label={category.title}
            dir="rtl"
            className={cn(
              // dir=rtl without justify-* → first item anchors on the right
              "relative z-0 flex w-full min-w-0 snap-x snap-mandatory items-end gap-3 overflow-x-auto p-0",
              "[scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden",
            )}
          >
            {category.vehicles.map((vehicle) => (
              <PriceVehicleCard key={vehicle.id} vehicle={vehicle} />
            ))}
          </div>

          {/* White edge fade under the nav button */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 end-0 z-20"
            style={{
              width: "var(--home-prices-edge-fade-width)",
              background: "var(--home-prices-edge-fade-gradient)",
            }}
          />

          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={() => goNext("smooth")}
            aria-label={`مشاهده بیشتر ${category.seeMoreLabel}`}
            className="border-border bg-background text-foreground absolute end-2 top-1/2 z-30 hidden size-9 -translate-y-1/2 rounded-md shadow-md sm:inline-flex"
          >
            <ChevronLeft className="size-4" aria-hidden />
          </Button>
        </div>
      </div>

      <div className="mt-5 flex justify-end pe-3 sm:mt-6 sm:pe-4">
        <Link
          href={category.seeMoreHref}
          className="text-primary hover:text-primary/80 inline-flex items-center gap-1.5 text-base font-medium transition-colors"
        >
          <span>{category.seeMoreLabel}</span>
          <ChevronLeft className="size-5 shrink-0" aria-hidden />
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
      className="overflow-x-clip py-10 md:py-14"
    >
      <Container className="min-w-0">
        <Shape
          shape="custom"
          customPath={PRICES_PANEL_PATH}
          customViewBox={PRICES_VIEWBOX}
          width="100%"
          height="auto"
          aspectRatio="auto"
          background="var(--home-prices-bg)"
          fit="fill"
          clipContent
          className={cn(
            "w-full min-w-0",
            "[&_.ui-shape__content]:items-stretch [&_.ui-shape__content]:justify-start [&_.ui-shape__content]:text-start",
          )}
        >
          <div className="flex w-full min-w-0 flex-col px-4 pt-12 pb-12 sm:px-6 sm:pt-14 sm:pb-14 md:px-8 md:pt-16 md:pb-16">
            <SectionHeading
              id="home-prices-heading"
              title="قیمت روز"
              description="خودروهای موجود به دلار و کشنده‌های وارداتی به یورو، هر دو با معادل تومانی"
              showUnderline
              className="mb-8 sm:mb-10"
            />

            <div className="flex flex-col gap-8 md:gap-10">
              {HOME_PRICE_CATEGORIES.map((category) => (
                <PriceCategoryRow key={category.id} category={category} />
              ))}
            </div>
          </div>
        </Shape>
      </Container>
    </section>
  );
}
