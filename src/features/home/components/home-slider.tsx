"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft } from "lucide-react";

import { ScribbleUnderlineIcon } from "~/components/icons";
import { buttonVariants } from "~/components/ui";
import { HOME_SLIDES } from "~/features/home/data";
import { usePrefersReducedMotion } from "~/hooks";
import { cn } from "~/lib";

/** Auto-advance interval between slides. */
const HOME_SLIDER_AUTOPLAY_MS = 5000;
/** Crossfade / slide transition duration. */
const HOME_SLIDER_TRANSITION_S = 0.5;

const slideEase = [0.22, 1, 0.36, 1] as const;

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
 * Figma SliderThumb — trapezoid top, flush bottom with image baseline.
 * Active: cyan underline + head dot (static marker — no separate timer bar).
 */
function SliderThumb({
  label,
  selected,
  controlsId,
  onSelect,
}: {
  label: string;
  selected: boolean;
  controlsId: string;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={selected}
      aria-controls={controlsId}
      className={cn(
        "relative flex min-h-12 min-w-[5.5rem] shrink-0 flex-col items-center justify-center gap-1.5 px-4 pt-3 pb-2.5 text-sm font-medium transition-colors md:min-w-28 md:px-5",
        /* Trapezoid: top-right higher; square bottom flush with image baseline */
        "[clip-path:polygon(0%_22%,12%_0%,100%_0%,100%_100%,0%_100%)]",
        selected
          ? "bg-primary text-primary-foreground"
          : "bg-background text-muted-foreground hover:text-foreground",
      )}
      onClick={onSelect}
    >
      <span className="relative z-10">{label}</span>

      {selected ? (
        <span
          dir="ltr"
          aria-hidden
          className="relative z-10 flex h-0.5 w-9 items-center"
        >
          {/* Figma: cyan line with head dot on the left tip */}
          <span className="bg-highlight size-1.5 shrink-0 translate-x-px rounded-full" />
          <span className="bg-highlight h-full flex-1 rounded-full" />
        </span>
      ) : (
        <span aria-hidden className="h-0.5 w-9" />
      )}
    </button>
  );
}

/**
 * Home hero slider — Figma Main Slider.
 * Thumbs sit on the right, flush with the image bottom edge (no separate timer bar).
 */
export function HomeSlider() {
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

  useEffect(() => {
    if (paused || reducedMotion || total < 2) return;

    const timer = window.setInterval(() => {
      setDirection(1);
      setActiveIndex((current) => (current + 1) % total);
    }, HOME_SLIDER_AUTOPLAY_MS);

    return () => window.clearInterval(timer);
  }, [paused, reducedMotion, total, activeIndex]);

  const contentOffset = direction * 28;
  const transition = reducedMotion
    ? { duration: 0 }
    : { duration: HOME_SLIDER_TRANSITION_S, ease: slideEase };

  return (
    <section
      aria-label="اسلایدر اصلی"
      aria-roledescription="carousel"
      className="bg-muted relative overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setPaused(false);
        }
      }}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_80%_at_70%_0%,color-mix(in_oklab,var(--primary)_10%,transparent),transparent_55%)]" />

      <div className="container-page relative py-8 md:py-10 lg:py-12">
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
                  <div className="flex flex-col items-start gap-1.5">
                    <ScribbleUnderlineIcon className="text-highlight ms-0.5 h-3.5 w-[5.5rem] md:h-4 md:w-[6.625rem]" />
                    {secondary ? (
                      <p className="text-accent text-sm font-semibold md:text-base">
                        {secondary}
                      </p>
                    ) : null}
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
                        buttonVariants({ size: "lg" }),
                        "rounded-xl px-6 shadow-sm",
                      )}
                    >
                      <span>{slide.ctaLabel}</span>
                      <ChevronLeft className="size-4" aria-hidden />
                    </Link>
                  </div>
                ) : null}
              </motion.div>
            </AnimatePresence>

            {/* Thumbs: right side, same baseline as image bottom */}
            <div
              className="mt-auto flex max-w-full flex-wrap items-end gap-1 pt-8"
              role="tablist"
              aria-label="دسته‌بندی اسلایدها"
            >
              {HOME_SLIDES.map((item, index) => (
                <SliderThumb
                  key={item.id}
                  label={item.category}
                  selected={index === activeIndex}
                  controlsId={`home-slide-${item.id}`}
                  onSelect={() => goTo(index)}
                />
              ))}
            </div>
          </div>

          {/* Image — inline-end (left in RTL) */}
          {slide.imageSrc ? (
            <div className="relative aspect-16/10 w-full overflow-hidden rounded-2xl md:aspect-4/3 lg:aspect-auto lg:min-h-[22rem]">
              <AnimatePresence initial={false} custom={direction}>
                <motion.div
                  key={slide.id}
                  className="absolute inset-0"
                  initial={
                    reducedMotion
                      ? { opacity: 1, scale: 1 }
                      : { opacity: 0, scale: 1.06, x: contentOffset * 0.35 }
                  }
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  exit={
                    reducedMotion
                      ? { opacity: 0 }
                      : { opacity: 0, scale: 1.02, x: -contentOffset * 0.25 }
                  }
                  transition={transition}
                >
                  <Image
                    src={slide.imageSrc}
                    alt={slide.imageAlt ?? slide.title}
                    fill
                    priority={activeIndex === 0}
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 60vw"
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
