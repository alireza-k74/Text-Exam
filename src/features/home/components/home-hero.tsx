"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft } from "lucide-react";

import { ScribbleUnderlineIcon } from "~/components/icons";
import { Shape, buttonVariants } from "~/components/ui";
import { HOME_SLIDES } from "~/features/home/data";
import { usePrefersReducedMotion } from "~/hooks";
import { cn } from "~/lib";

import { HomeHeaders } from "./home-headers";

/** Auto-advance interval between slides. */
const HOME_SLIDER_AUTOPLAY_MS = 5000;
/** Crossfade / slide transition duration. */
const HOME_SLIDER_TRANSITION_S = 0.5;

/**
 * How much the thumb top-left sits below top-right (viewBox %).
 * Left peak is lower; right peak is higher.
 */
const THUMB_SLANT = 20;
/** Top-left corner radius (viewBox) — smaller than TR. */
const THUMB_CORNER_TL = 8;
/** Top-right corner radius (viewBox) — larger than TL. */
const THUMB_CORNER_TR = 18;

/**
 * How much the image top edge drops L→R (viewBox %).
 * Left top sits higher; right top is lower — mild roof slant.
 */
const IMAGE_SLANT = 7;
/** Top-only corner radius for the slide image (viewBox 0–100). */
const IMAGE_CORNER_R = 5;

/** XD slider image frame — aspect locked; width fluid per breakpoint. */
const SLIDER_IMAGE_XD_W = 761.6;
const SLIDER_IMAGE_XD_H = 504;
const SLIDER_IMAGE_ASPECT = `${SLIDER_IMAGE_XD_W} / ${SLIDER_IMAGE_XD_H}`;

const slideEase = [0.22, 1, 0.36, 1] as const;

/**
 * Thumb silhouette: flat bottom, slanted top (left lower than right),
 * asymmetric top radii (TR > TL).
 */
function sliderThumbPath(): string {
  const topLeft = THUMB_SLANT;
  const topRight = 0;
  const rL = THUMB_CORNER_TL;
  const rR = THUMB_CORNER_TR;
  const slope = (topLeft - topRight) / 100;
  const yLeftAlong = topLeft - slope * rL;
  const yRightAlong = topLeft - slope * (100 - rR);

  return [
    `M 0 100`,
    `L 0 ${topLeft + rL}`,
    `Q 0 ${topLeft} ${rL} ${yLeftAlong}`,
    `L ${100 - rR} ${yRightAlong}`,
    `Q 100 ${topRight} 100 ${topRight + rR}`,
    `L 100 100`,
    `Z`,
  ].join(" ");
}

/**
 * Slide image silhouette: square bottom (flush to hero baseline),
 * rounded top corners only, left peak higher than right.
 */
function sliderImagePath(): string {
  const topLeft = 0;
  const topRight = IMAGE_SLANT;
  const r = IMAGE_CORNER_R;
  const slope = (topLeft - topRight) / 100;
  const yLeftAlong = topLeft - slope * r;
  const yRightAlong = topLeft - slope * (100 - r);

  return [
    `M 0 100`,
    `L 0 ${topLeft + r}`,
    `Q 0 ${topLeft} ${r} ${yLeftAlong}`,
    `L ${100 - r} ${yRightAlong}`,
    `Q 100 ${topRight} 100 ${topRight + r}`,
    `L 100 100`,
    `Z`,
  ].join(" ");
}

/**
 * Figma hierarchy:
 * - secondary (orange): `title` when brand or subtitle exists
 * - headline (blue): `brand` → `subtitle` → `title`
 */
function resolveSlideCopy(slide: (typeof HOME_SLIDES)[number]) {
  const headline = slide.brand ?? slide.subtitle ?? slide.title;
  const secondary =
    slide.brand || slide.subtitle ? slide.title : undefined;
  return { secondary, headline };
}

/**
 * Figma SliderThumb — Shape custom path (left top lower than right).
 * Equal base height; selected grows taller. Timer bar advances slides.
 * Inactive: white; active: brand blue rgb(1, 101, 150).
 */
function SliderThumb({
  label,
  selected,
  progressKey,
  progressPaused,
  controlsId,
  onSelect,
  onProgressComplete,
}: {
  label: string;
  selected: boolean;
  progressKey: number;
  progressPaused: boolean;
  controlsId: string;
  onSelect: () => void;
  onProgressComplete: () => void;
}) {
  return (
    <Shape
      as="button"
      type="button"
      role="tab"
      aria-selected={selected}
      aria-controls={controlsId}
      shape="custom"
      customPath={sliderThumbPath()}
      customViewBox="0 0 100 100"
      width="100%"
      height="auto"
      background={selected ? "var(--primary)" : "var(--background)"}
      color={
        selected ? "var(--primary-foreground)" : "var(--muted-foreground)"
      }
      className={cn(
        "min-w-0 flex-1 basis-0 transition-[min-height,colors] duration-300",
        selected ? "min-h-14 md:min-h-16" : "min-h-11 md:min-h-12",
        !selected && "hover:[--shape-color:var(--foreground)]",
      )}
      onClick={onSelect}
    >
      <span
        className={cn(
          "flex h-full w-full flex-col items-center justify-center gap-1.5 px-2 text-center text-xs font-medium sm:px-3 sm:text-sm md:px-4",
          selected ? "pt-4 pb-2.5" : "pt-3 pb-2",
        )}
      >
        <span className="w-full truncate">{label}</span>

        {/* Progress track — fills on active; no head-dot thumbnail */}
        <span
          dir="ltr"
          aria-hidden
          className={cn(
            "relative h-0.5 w-8 shrink-0 overflow-hidden rounded-full sm:w-9",
            selected ? "bg-primary-foreground/25" : "bg-foreground/10",
          )}
        >
          {selected ? (
            <span
              key={progressKey}
              className={cn(
                "bg-highlight absolute inset-y-0 start-0 w-full rounded-full",
                "animate-slider-timer",
              )}
              style={{
                ["--slider-timer-ms" as string]: `${HOME_SLIDER_AUTOPLAY_MS}ms`,
                animationPlayState: progressPaused ? "paused" : "running",
              }}
              onAnimationEnd={onProgressComplete}
            />
          ) : null}
        </span>
      </span>
    </Shape>
  );
}

/**
 * Home hero — story headers + main slider on one soft gradient band.
 */
export function HomeHero() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);
  const reducedMotion = usePrefersReducedMotion();

  const slide = HOME_SLIDES[activeIndex] ?? HOME_SLIDES[0];
  const total = HOME_SLIDES.length;
  const { secondary, headline } = resolveSlideCopy(slide);

  function goTo(index: number) {
    const next = ((index % total) + total) % total;
    if (next === activeIndex) return;
    setDirection(next > activeIndex ? 1 : -1);
    setActiveIndex(next);
  }

  function goNext() {
    setDirection(1);
    setActiveIndex((current) => (current + 1) % total);
  }

  /* Reduced-motion: interval fallback (CSS timer animation is disabled). */
  useEffect(() => {
    if (paused || !reducedMotion || total < 2) return;

    const timer = window.setInterval(goNext, HOME_SLIDER_AUTOPLAY_MS);
    return () => window.clearInterval(timer);
  }, [paused, reducedMotion, total, activeIndex]);

  const contentOffset = direction * 28;
  const transition = reducedMotion
    ? { duration: 0 }
    : { duration: HOME_SLIDER_TRANSITION_S, ease: slideEase };

  return (
    <section
      aria-label="بخش اصلی صفحه"
      className="relative overflow-x-clip overflow-y-hidden bg-[linear-gradient(to_bottom,var(--home-hero-from),var(--home-hero-to))]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setPaused(false);
        }
      }}
    >
      {/* No bottom padding — thumbs + image flush to hero baseline */}
      <div className="container-page relative pt-4 md:pt-5">
        <HomeHeaders />

        <div
          aria-label="اسلایدر اصلی"
          aria-roledescription="carousel"
          className="relative pt-5 md:pt-7 lg:pt-8"
        >
          {/* items-stretch → thumbs at content bottom align with image bottom */}
          <div className="grid items-stretch gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:gap-10 xl:gap-12">
            {/* Content — inline-start (right in RTL) */}
            <div className="relative flex min-h-72 flex-col md:min-h-80">
              <AnimatePresence mode="wait" initial={false} custom={direction}>
                <motion.div
                  key={slide.id}
                  id={`home-slide-${slide.id}`}
                  role="tabpanel"
                  aria-live="polite"
                  className="flex flex-col gap-5 md:gap-6"
                  initial={
                    reducedMotion
                      ? { opacity: 1, x: 0 }
                      : { opacity: 0, x: contentOffset }
                  }
                  animate={{ opacity: 1, x: 0 }}
                  exit={
                    reducedMotion
                      ? { opacity: 0 }
                      : { opacity: 0, x: -contentOffset }
                  }
                  transition={transition}
                >
                  <div className="flex flex-col gap-3 md:gap-3.5">
                    <div className="flex flex-col items-start gap-2.5">
                      {secondary ? (
                        <p className="text-accent text-sm font-semibold md:text-base">
                          {secondary}
                        </p>
                      ) : null}
                      <ScribbleUnderlineIcon className="text-highlight ms-0.5 h-3.5 w-[5.5rem] md:h-4 md:w-[6.625rem]" />

                    </div>

                    <h1 className="text-primary max-w-xl text-2xl font-bold tracking-tight text-balance sm:text-3xl md:text-4xl lg:text-[2.5rem] lg:leading-tight">
                      {headline}
                    </h1>

                    {slide.tags && slide.tags.length > 0 ? (
                      <ul className="flex flex-wrap gap-2 pt-0.5">
                        {slide.tags.map((tag) => (
                          <li
                            key={tag}
                            className="bg-foreground text-background rounded-full px-3.5 py-1.5 text-xs font-medium md:text-sm"
                          >
                            {tag}
                          </li>
                        ))}
                      </ul>
                    ) : null}

                    <p className="text-muted-foreground max-w-xl text-sm leading-relaxed text-pretty md:text-base">
                      {slide.description}
                    </p>
                  </div>

                  {slide.ctaLabel && slide.ctaHref ? (
                    <div>
                      <Link
                        href={slide.ctaHref}
                        className={cn(
                          buttonVariants({ size: "xl" }),
                          "shadow-sm",
                        )}
                      >
                        <span>{slide.ctaLabel}</span>
                        <ChevronLeft aria-hidden />
                      </Link>
                    </div>
                  ) : null}
                </motion.div>
              </AnimatePresence>

              {/* Thumbs: single row (no wrap); Shape chips with X gap */}
              <div
                className="mt-auto flex w-full max-w-full flex-nowrap items-end gap-2 pt-8 md:gap-1.5"
                role="tablist"
                aria-label="دسته‌بندی اسلایدها"
              >
                {HOME_SLIDES.map((item, index) => (
                  <SliderThumb
                    key={item.id}
                    label={item.category}
                    selected={index === activeIndex}
                    progressKey={activeIndex}
                    progressPaused={paused || reducedMotion}
                    controlsId={`home-slide-${item.id}`}
                    onSelect={() => goTo(index)}
                    onProgressComplete={goNext}
                  />
                ))}
              </div>
            </div>

            {/* Image — XD 761.6×504 aspect; width fluid, height from ratio */}
            {slide.imageSrc ? (
              <Shape
                shape="custom"
                customPath={sliderImagePath()}
                customViewBox="0 0 100 100"
                width="100%"
                aspectRatio={SLIDER_IMAGE_ASPECT}
                background="var(--muted)"
                fit="cover"
                className="flex w-full min-w-0 self-end justify-self-stretch"
              >
                <div className="relative size-full">
                  <AnimatePresence initial={false} custom={direction}>
                    <motion.div
                      key={slide.id}
                      className="absolute inset-0"
                      initial={
                        reducedMotion
                          ? { opacity: 1, scale: 1 }
                          : {
                              opacity: 0,
                              scale: 1.06,
                              x: contentOffset * 0.35,
                            }
                      }
                      animate={{ opacity: 1, scale: 1, x: 0 }}
                      exit={
                        reducedMotion
                          ? { opacity: 0 }
                          : {
                              opacity: 0,
                              scale: 1.02,
                              x: -contentOffset * 0.25,
                            }
                      }
                      transition={transition}
                    >
                      <Image
                        src={slide.imageSrc}
                        alt={slide.imageAlt ?? slide.title}
                        fill
                        priority={activeIndex === 0}
                        className="object-cover"
                        sizes="(max-width: 1023px) 100vw, (max-width: 1439px) 55vw, 762px"
                      />
                    </motion.div>
                  </AnimatePresence>
                </div>
              </Shape>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
