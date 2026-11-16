import Image from "next/image";
import Link from "next/link";

import { Shape } from "~/components/ui";
import { HOME_HEADER_CATEGORIES } from "~/features/home/data";
import type { HomeHeaderCategory } from "~/features/home/types";
import { cn } from "~/lib";

import { HorizontalScroller } from "./horizontal-scroller";

/** XD Story thumbnail size. */
const STORY_WIDTH = 80;
const STORY_HEIGHT = 88;
/** Soft slant (viewBox %); keep mild so it isn’t too skewed. */
const STORY_SLANT = 9;
/** ~6px corner radius in 80×88 viewBox units. */
const STORY_CORNER_R = 6;

/**
 * Rounded parallelogram (ذوزنقه): top-left highest, bottom-right lowest.
 * Matches Figma/XD Story-container slant with a light corner radius.
 */
function storyContainerPath(slant = STORY_SLANT, r = STORY_CORNER_R): string {
  const w = STORY_WIDTH;
  const h = STORY_HEIGHT;
  const s = (slant / 100) * h;
  const topLen = Math.hypot(w, s);
  const ux = w / topLen;
  const uy = s / topLen;

  const afterTlX = r * ux;
  const afterTlY = r * uy;
  const beforeTrX = w - r * ux;
  const beforeTrY = s - r * uy;
  const afterTrY = s + r;
  const beforeBrY = h - r;
  const afterBrX = w - r * ux;
  const afterBrY = h - r * uy;
  const beforeBlX = r * ux;
  const beforeBlY = h - s + r * uy;
  const afterBlY = h - s - r;

  return [
    `M 0 ${r}`,
    `Q 0 0 ${afterTlX} ${afterTlY}`,
    `L ${beforeTrX} ${beforeTrY}`,
    `Q ${w} ${s} ${w} ${afterTrY}`,
    `L ${w} ${beforeBrY}`,
    `Q ${w} ${h} ${afterBrX} ${afterBrY}`,
    `L ${beforeBlX} ${beforeBlY}`,
    `Q 0 ${h - s} 0 ${afterBlY}`,
    "Z",
  ].join(" ");
}

const STORY_PATH = storyContainerPath();
const STORY_VIEWBOX = `0 0 ${STORY_WIDTH} ${STORY_HEIGHT}`;

function HeaderCategoryItem({
  category,
  className,
}: {
  category: HomeHeaderCategory;
  className?: string;
}) {
  return (
    <Link
      href={category.href}
      role="listitem"
      className={cn(
        "group flex w-20 shrink-0 snap-start flex-col items-center gap-1.5",
        className,
      )}
    >
      <Shape
        shape="custom"
        customPath={STORY_PATH}
        customViewBox={STORY_VIEWBOX}
        width={STORY_WIDTH}
        height={STORY_HEIGHT}
        background="var(--muted)"
        fit="cover"
        className={cn(
          "drop-shadow-[0_6px_12px_rgba(15,23,42,0.22)]",
          "transition-[filter,transform] duration-200",
          "group-hover:drop-shadow-[0_10px_16px_rgba(15,23,42,0.3)]",
          "group-hover:-translate-y-0.5",
        )}
      >
        <Image
          src={category.imageSrc}
          alt={category.imageAlt}
          width={STORY_WIDTH}
          height={STORY_HEIGHT}
          className="size-full object-cover transition-transform duration-300 group-hover:scale-[1.04]"
          sizes="80px"
        />
      </Shape>
      <span className="text-foreground group-hover:text-primary text-center text-[0.6875rem] leading-snug font-normal sm:text-xs">
        {category.title}
      </span>
    </Link>
  );
}

/**
 * Story-style category strip (used inside HomeHero).
 * Images ordered RTL (right → left) from `src/assets/headers` (1…9).
 */
export function HomeHeaders() {
  return (
    <div aria-label="دسته‌بندی‌های سریع">
      <HorizontalScroller
        aria-label="دسته‌بندی‌های سریع"
        className="justify-start gap-1 sm:justify-center sm:gap-5 md:overflow-visible md:pb-0"
      >
        {HOME_HEADER_CATEGORIES.map((category) => (
          <HeaderCategoryItem key={category.id} category={category} />
        ))}
      </HorizontalScroller>
    </div>
  );
}
