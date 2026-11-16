import Image from "next/image";
import Link from "next/link";

import { Container } from "~/components/shared";
import { HOME_HEADER_CATEGORIES } from "~/features/home/data";
import type { HomeHeaderCategory } from "~/features/home/types";
import { cn } from "~/lib";

import { HorizontalScroller } from "./horizontal-scroller";

/** Story-style frame: large radius on start-start + end-end (diagonal). */
const STORY_FRAME =
  "rounded-ss-[3.25rem] rounded-se-xl rounded-ee-[3.25rem] rounded-es-xl";

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
        "group flex w-[5.25rem] shrink-0 snap-start flex-col items-center gap-2.5 sm:w-[5.75rem] md:w-auto md:min-w-0 md:flex-1 md:gap-3",
        className,
      )}
    >
      <div
        className={cn(
          "relative aspect-[3/4] w-full overflow-hidden bg-muted",
          "shadow-[0_8px_24px_-6px_rgba(15,23,42,0.28)]",
          "transition-[box-shadow,transform] duration-200",
          "group-hover:shadow-[0_12px_28px_-6px_rgba(15,23,42,0.34)]",
          "group-hover:-translate-y-0.5",
          STORY_FRAME,
        )}
      >
        <Image
          src={category.imageSrc}
          alt={category.imageAlt}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-[1.04]"
          sizes="(max-width: 768px) 92px, (max-width: 1280px) 10vw, 120px"
        />
      </div>
      <span className="text-foreground group-hover:text-primary text-center text-xs leading-snug font-bold sm:text-[0.8125rem] md:text-sm">
        {category.title}
      </span>
    </Link>
  );
}

/**
 * Quick category gallery above the home slider.
 * Images ordered RTL (right → left) from `src/assets/headers` (1…9).
 */
export function HomeHeaders() {
  return (
    <section
      aria-label="دسته‌بندی‌های سریع"
      className="bg-background pt-4 pb-3 md:pt-6 md:pb-4"
    >
      <Container>
        <HorizontalScroller
          aria-label="دسته‌بندی‌های سریع"
          className="gap-3 sm:gap-3.5 md:gap-4 md:overflow-visible md:pb-0 lg:gap-5"
        >
          {HOME_HEADER_CATEGORIES.map((category) => (
            <HeaderCategoryItem key={category.id} category={category} />
          ))}
        </HorizontalScroller>
      </Container>
    </section>
  );
}
