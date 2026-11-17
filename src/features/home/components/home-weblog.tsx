"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";

import {
  ArrowLeftLongIcon,
  ClockIcon,
  WeblogImageGlowIcon,
} from "~/components/icons";
import { Container } from "~/components/shared";
import { Button, Shape } from "~/components/ui";
import { WEBLOG_POSTS } from "~/features/home/data";
import type { WeblogPost } from "~/features/home/types";
import { cn } from "~/lib";

import { SectionHeading } from "./section-heading";

/** Mild top slant: physical left a bit lower, right higher. */
const CARD_TOP_SLANT = 5;
const CARD_CORNER_R = 6;
const CARD_VIEWBOX = "0 0 100 100";

/**
 * Weblog body silhouette: rounded corners,
 * top-right slightly higher than top-left.
 */
function weblogCardBodyPath(slant = CARD_TOP_SLANT, r = CARD_CORNER_R): string {
  const w = 100;
  const h = 100;
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

const WEBLOG_CARD_PATH = weblogCardBodyPath();

/**
 * Meta chip: physical right higher, left lower (parallelogram tilt),
 * rounded corners. ViewBox x: 0=left … w=right.
 */
const META_V_SLANT = 12;
const META_CORNER_R = 10;
const META_VIEWBOX = "0 0 100 72";

function weblogMetaPath(vSlant = META_V_SLANT, r = META_CORNER_R): string {
  const w = 100;
  const h = 72;
  const tlY = vSlant;
  const trY = 0;
  const brY = h - vSlant;
  const blY = h;
  const topSlope = (trY - tlY) / w;
  const botSlope = (brY - blY) / w;

  const afterTlX = r;
  const afterTlY = tlY + topSlope * r;
  const beforeTrX = w - r;
  const beforeTrY = tlY + topSlope * (w - r);
  const afterBrX = w - r;
  const afterBrY = blY + botSlope * (w - r);
  const beforeBlX = r;
  const beforeBlY = blY + botSlope * r;

  return [
    `M 0 ${tlY + r}`,
    `Q 0 ${tlY} ${afterTlX} ${afterTlY}`,
    `L ${beforeTrX} ${beforeTrY}`,
    `Q ${w} ${trY} ${w} ${trY + r}`,
    `L ${w} ${brY - r}`,
    `Q ${w} ${brY} ${afterBrX} ${afterBrY}`,
    `L ${beforeBlX} ${beforeBlY}`,
    `Q 0 ${blY} 0 ${blY - r}`,
    "Z",
  ].join(" ");
}

const WEBLOG_META_PATH = weblogMetaPath();

function WeblogCard({ post }: { post: WeblogPost }) {
  return (
    <article
      role="listitem"
      className={cn(
        "relative flex shrink-0 snap-start flex-col",
        /* 1 card + peek on narrow; exactly 3 visible from md up */
        "w-[min(17.5rem,85%)] sm:w-[min(19rem,48%)]",
        "md:w-[calc((100%-2*1.25rem)/3)] lg:w-[calc((100%-2*1.5rem)/3)]",
      )}
    >
      {/* Glow under image (centered); image stacked above glow */}
      <div className="relative z-0 mx-auto w-full">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center"
        >
          <WeblogImageGlowIcon className="h-full w-[115%] max-w-none" />
        </div>
        <div className="relative z-10 mx-auto aspect-[16/10] w-[92%] overflow-hidden rounded-2xl sm:w-[90%]">
          <Image
            src={post.imageSrc}
            alt={post.imageAlt}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 65vw, (max-width: 1024px) 36vw, 300px"
          />
          <span className="bg-foreground/50 text-background absolute end-3 top-3 z-10 rounded-2xl px-2.5 py-1 text-xs font-medium backdrop-blur-sm">
            {post.category}
          </span>
        </div>
      </div>

      {/* White body + meta sit on top of the image (overlap bottom) */}
      <div className="relative z-20 -mt-8 flex w-full flex-1 flex-col pb-7 sm:-mt-9 sm:pb-8">
        <Shape
          shape="custom"
          customPath={WEBLOG_CARD_PATH}
          customViewBox={CARD_VIEWBOX}
          width="100%"
          height="auto"
          background="var(--background)"
          className="relative z-0 flex w-full flex-1"
          clipContent
        >
          <div className="flex flex-1 flex-col gap-3 ps-[4%] pe-4 pt-10 pb-5 sm:ps-[5%] sm:pe-5 sm:pt-11 sm:pb-6">
            <div className="space-y-2 text-start">
              <h3 className="text-foreground text-base leading-snug font-bold tracking-tight md:text-lg">
                <Link
                  href={post.href}
                  className="hover:text-primary transition-colors"
                >
                  {post.title}
                </Link>
              </h3>
              <p className="text-muted-foreground line-clamp-2 text-xs leading-relaxed text-pretty sm:text-sm">
                {post.excerpt}
              </p>
            </div>

            {/* Arrow — physical bottom-left (end in RTL) */}
            <div className="mt-auto flex items-center justify-end pt-2">
              <Link
                href={post.href}
                aria-label={`ادامه مطلب: ${post.title}`}
                className={cn(
                  "bg-secondary text-primary hover:bg-primary hover:text-primary-foreground",
                  "inline-flex size-10 shrink-0 items-center justify-center rounded-lg transition-colors",
                )}
              >
                <ArrowLeftLongIcon className="size-5" />
              </Link>
            </div>
          </div>
        </Shape>

        {/* Meta — half in / half out of card bottom; start-aligned with title/excerpt */}
        <div className="absolute start-[4%] bottom-7 z-30 w-auto max-w-[42%] min-w-[7.5rem] translate-y-1/2 sm:start-[5%] sm:bottom-8 sm:max-w-[38%] sm:min-w-[8rem]">
          <Shape
            shape="custom"
            customPath={WEBLOG_META_PATH}
            customViewBox={META_VIEWBOX}
            background="var(--home-weblog-meta)"
            width="auto"
            height="auto"
            className="relative z-30 w-full"
            clipContent
          >
            <div className="flex h-full min-h-[4.25rem] w-full min-w-0 flex-col items-center justify-center gap-1.5 p-3.5 text-center sm:min-h-[4.75rem] sm:gap-2 sm:p-4">
              <time
                dateTime={post.dateTime}
                className="bg-foreground text-background inline-flex max-w-full items-center justify-center gap-1 rounded-full px-2 py-0.5 text-[0.625rem] leading-none"
              >
                <ClockIcon className="size-3 shrink-0" />
                <span className="truncate tabular-nums">{post.date}</span>
              </time>
              <span className="text-primary max-w-full truncate text-center text-[0.625rem] leading-none font-medium">
                {post.author}
              </span>
            </div>
          </Shape>
        </div>
      </div>
    </article>
  );
}

function WeblogNav({
  onPrev,
  onNext,
}: {
  onPrev: () => void;
  onNext: () => void;
}) {
  return (
    <div className="flex items-center gap-2">
      <Button
        type="button"
        variant="outline"
        size="icon"
        onClick={onPrev}
        aria-label="مقاله قبلی"
        className="border-primary text-primary hover:bg-primary/5 size-9 rounded-full sm:size-10"
      >
        <ChevronRight className="size-4 sm:size-5" aria-hidden />
      </Button>
      <Button
        type="button"
        variant="default"
        size="icon"
        onClick={onNext}
        aria-label="مقاله بعدی"
        className="size-9 rounded-full sm:size-10"
      >
        <ChevronLeft className="size-4 sm:size-5" aria-hidden />
      </Button>
    </div>
  );
}

/** Blog / articles carousel for the home page. */
export function HomeWeblog() {
  const scrollerRef = useRef<HTMLDivElement>(null);

  function scrollByCard(direction: "prev" | "next") {
    const node = scrollerRef.current;
    if (!node) return;
    const card = node.querySelector<HTMLElement>("[role='listitem']");
    const styles = getComputedStyle(node);
    const gap = Number.parseFloat(styles.columnGap || styles.gap) || 0;
    const delta = card
      ? card.offsetWidth + gap
      : Math.max(node.clientWidth / 3, 280);
    // In RTL, moving toward later items uses a negative scrollLeft delta.
    node.scrollBy({
      left: direction === "next" ? -delta : delta,
      behavior: "smooth",
    });
  }

  return (
    <section
      id="weblog"
      aria-labelledby="home-weblog-heading"
      className="overflow-x-clip bg-[var(--home-weblog-card)] py-10 md:py-14"
    >
      <Container className="min-w-0">
        <SectionHeading
          id="home-weblog-heading"
          title="وبلاگ و مقالات"
          description="راهکارهای تخصصی برای بازرگانان، شرکت‌ها و صاحبان کالا؛ برآورد اولیه همان لحظه"
          showUnderline
          className="mb-6 sm:mb-8"
          action={
            <WeblogNav
              onPrev={() => scrollByCard("prev")}
              onNext={() => scrollByCard("next")}
            />
          }
        />

        <div
          ref={scrollerRef}
          role="list"
          aria-label="مطالب وبلاگ"
          className="flex snap-x snap-mandatory [scrollbar-width:none] gap-4 overflow-x-auto overflow-y-visible pb-8 [-ms-overflow-style:none] sm:gap-5 sm:pb-9 md:gap-5 lg:gap-6 [&::-webkit-scrollbar]:hidden"
        >
          {WEBLOG_POSTS.map((post) => (
            <WeblogCard key={post.id} post={post} />
          ))}
        </div>

        <div className="mt-2 flex justify-center sm:mt-3">
          <Link
            href="#"
            className="text-primary hover:text-primary/80 inline-flex items-center gap-1 text-sm font-medium transition-colors"
          >
            <span>موارد بیشتر</span>
            <ChevronLeft className="size-4 shrink-0" aria-hidden />
          </Link>
        </div>
      </Container>
    </section>
  );
}
