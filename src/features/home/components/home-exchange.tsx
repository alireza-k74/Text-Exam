"use client";

import { Fragment } from "react";
import { ChevronLeft } from "lucide-react";

import { ExchangeDividerIcon, TomanIcon } from "~/components/icons";
import { Shape } from "~/components/ui";
import { EXCHANGE_RATES } from "~/features/home/data";
import type { ExchangeRate } from "~/features/home/types";
import { usePrefersReducedMotion } from "~/hooks";
import { cn } from "~/lib";

/** Wide banner viewBox — stretched via preserveAspectRatio=none. */
const EXCHANGE_W = 1000;
const EXCHANGE_H = 100;
/** Top/bottom inset on the short (left) edge; right stays full height. */
const EXCHANGE_TAPER = 22;

/**
 * Trapezoid: tall on the physical right, shorter on the left.
 * Height decreases right → left (top & bottom edges converge toward start of LTR box).
 */
function exchangeBarPath(taper = EXCHANGE_TAPER): string {
  const w = EXCHANGE_W;
  const h = EXCHANGE_H;
  return [
    `M 0 ${taper}`,
    `L ${w} 0`,
    `L ${w} ${h}`,
    `L 0 ${h - taper}`,
    "Z",
  ].join(" ");
}

const EXCHANGE_PATH = exchangeBarPath();
const EXCHANGE_VIEWBOX = `0 0 ${EXCHANGE_W} ${EXCHANGE_H}`;

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
              className="shrink-0 text-[color:var(--home-exchange-divider)] select-none"
            >
              <ExchangeDividerIcon />
            </li>
          ) : null}
          {/* RTL: right→left = title + price + تومان icon */}
          <li
            dir="rtl"
            className="flex shrink-0 items-center gap-1.5 text-sm whitespace-nowrap md:text-base"
          >
            <span className="font-medium text-white">{item.name}</span>
            <span className="text-accent font-semibold tabular-nums">
              {item.rate}
            </span>
            <TomanIcon className="text-on-primary-soft" />
            <span className="sr-only">تومان</span>
          </li>
        </Fragment>
      ))}
    </ul>
  );
}

/**
 * Live currency ticker.
 * Outer Shape tapers tall→short (physical right→left).
 * Marquee track is forced LTR so overflow + translate% stay aligned;
 * content moves left→right in a seamless 50% loop (duplicated list).
 */
export function HomeExchange() {
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <section
      aria-labelledby="home-exchange-heading"
      className="overflow-x-clip py-6 md:py-8"
    >
      <div className="relative min-w-0">
        <div className="bg-accent text-[color:var(--home-exchange-label)] absolute start-2 top-1/2 z-10 flex h-9 -translate-y-1/2 items-center gap-1.5 rounded-md px-3 text-sm font-bold md:start-3 md:h-10 md:gap-2 md:px-4 md:text-base">
          {/* Dark fade stuck to the left (inline-end) of the chip */}
          <div
            aria-hidden
            className="pointer-events-none absolute top-1/2 start-full z-0 h-16 -translate-y-1/2 md:h-20"
            style={{
              width: "var(--home-exchange-edge-fade-width)",
              background: "var(--home-exchange-edge-fade-gradient)",
            }}
          />
          <h2 id="home-exchange-heading" className="relative z-[1] leading-none">
            نرخ ارز امروز
          </h2>
          <ChevronLeft
            className="relative z-[1] size-4 shrink-0 md:size-5"
            aria-hidden
          />
        </div>

        <Shape
          shape="custom"
          customPath={EXCHANGE_PATH}
          customViewBox={EXCHANGE_VIEWBOX}
          width="100%"
          aspectRatio="auto"
          background="var(--primary)"
          color="var(--primary-foreground)"
          fit="fill"
          className="flex h-16 w-full max-w-none md:h-20"
        >
          {/* dir=ltr keeps the overflow window on the physical left of the track */}
          <div
            dir="ltr"
            className="relative h-full w-full min-w-0 overflow-hidden pe-28 md:pe-36"
          >
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
        </Shape>
      </div>
    </section>
  );
}
