"use client";

import { Fragment } from "react";
import { ChevronLeft } from "lucide-react";

import { EXCHANGE_RATES } from "~/features/home/data";
import type { ExchangeRate } from "~/features/home/types";
import { usePrefersReducedMotion } from "~/hooks";
import { cn } from "~/lib";

function RateSegment({
  rates,
  ariaHidden,
}: {
  rates: ExchangeRate[];
  ariaHidden?: boolean;
}) {
  return (
    <ul
      aria-hidden={ariaHidden || undefined}
      className="flex shrink-0 items-center gap-x-3 px-4 md:gap-x-4 md:px-6"
    >
      {rates.map((item, index) => (
        <Fragment key={`${item.id}-${index}`}>
          {index > 0 ? (
            <li
              aria-hidden
              className="text-primary-foreground/50 shrink-0 select-none"
            >
              |
            </li>
          ) : null}
          <li className="flex shrink-0 items-center gap-2 whitespace-nowrap">
            <span className="text-sm font-medium text-white md:text-base">
              {item.name}
            </span>
            <span className="text-accent text-sm font-semibold tabular-nums md:text-base">
              {item.rate}
            </span>
          </li>
        </Fragment>
      ))}
    </ul>
  );
}

/**
 * Live currency ticker.
 * Marquee track is forced LTR so overflow + translate% stay aligned;
 * content moves left→right in a seamless 50% loop (duplicated list).
 */
export function HomeExchange() {
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <section
      aria-labelledby="home-exchange-heading"
      className="py-6 md:py-8"
    >
      <div className="bg-primary relative flex min-h-12 items-stretch overflow-hidden md:min-h-14">
        <div className="bg-accent text-accent-foreground relative z-10 flex shrink-0 items-center gap-1.5 rounded-e-md px-3 py-2 text-sm font-bold md:gap-2 md:px-4 md:text-base">
          <h2 id="home-exchange-heading" className="leading-none">
            نرخ ارز امروز
          </h2>
          <ChevronLeft className="size-4 shrink-0 md:size-5" aria-hidden />
        </div>

        {/* dir=ltr keeps the overflow window on the physical left of the track */}
        <div dir="ltr" className="relative min-w-0 flex-1 overflow-hidden">
          {prefersReducedMotion ? (
            <div
              className="flex h-full items-center overflow-x-auto"
              aria-label="نرخ ارز امروز"
            >
              <RateSegment rates={EXCHANGE_RATES} />
            </div>
          ) : (
            <div
              className={cn(
                "animate-exchange-marquee flex h-full w-max items-center",
              )}
              aria-label="نرخ ارز امروز"
            >
              <RateSegment rates={EXCHANGE_RATES} />
              <RateSegment rates={EXCHANGE_RATES} ariaHidden />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
