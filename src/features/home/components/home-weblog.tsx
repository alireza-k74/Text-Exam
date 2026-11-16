"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";

import { ArrowLeftIcon, ClockIcon } from "~/components/icons";
import { Container } from "~/components/shared";
import { Button } from "~/components/ui";
import { WEBLOG_POSTS } from "~/features/home/data";
import type { WeblogPost } from "~/features/home/types";
import { cn } from "~/lib";

import { SectionHeading } from "./section-heading";

function WeblogCard({ post }: { post: WeblogPost }) {
  return (
    <article
      role="listitem"
      className="bg-card border-border shadow-sm flex w-[17.5rem] shrink-0 snap-start flex-col overflow-hidden rounded-2xl border sm:w-[19rem] md:w-[20.5rem]"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={post.imageSrc}
          alt={post.imageAlt}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 70vw, (max-width: 1024px) 40vw, 328px"
        />
        <span className="bg-background/95 text-foreground absolute top-3 end-3 z-10 rounded-md px-2.5 py-1 text-xs font-medium shadow-sm backdrop-blur-sm">
          {post.category}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-3 px-4 py-4 sm:px-5 sm:py-5">
        <div className="space-y-2">
          <h3 className="text-foreground text-base leading-snug font-bold tracking-tight md:text-lg">
            <Link
              href={post.href}
              className="hover:text-primary transition-colors"
            >
              {post.title}
            </Link>
          </h3>
          <p className="text-muted-foreground line-clamp-3 text-xs leading-relaxed text-pretty sm:text-sm">
            {post.excerpt}
          </p>
        </div>

        <div className="mt-auto flex items-center justify-between gap-3 pt-1">
          <div className="bg-secondary text-muted-foreground flex min-w-0 flex-col gap-1 rounded-lg px-2.5 py-2 text-[0.7rem] leading-none sm:text-xs">
            <time
              dateTime={post.dateTime}
              className="inline-flex items-center gap-1.5"
            >
              <ClockIcon className="text-primary size-3" />
              <span className="tabular-nums">{post.date}</span>
            </time>
            <span className="truncate font-medium">{post.author}</span>
          </div>

          <Link
            href={post.href}
            aria-label={`ادامه مطلب: ${post.title}`}
            className={cn(
              "bg-secondary text-primary hover:bg-primary hover:text-primary-foreground",
              "inline-flex size-10 shrink-0 items-center justify-center rounded-lg transition-colors",
            )}
          >
            <ArrowLeftIcon className="size-5" />
          </Link>
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
    const delta = Math.max(node.clientWidth * 0.75, 280);
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
      className="overflow-x-clip py-10 md:py-14"
    >
      <Container className="min-w-0">
        <SectionHeading
          id="home-weblog-heading"
          title="وبلاگ و مقالات"
          description="آخرین مطالب آموزشی و خبری درباره خودرو، کشنده، حمل و ترخیص"
          className="mb-6 sm:mb-8 [&_h2]:text-primary"
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
          className="flex gap-4 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] snap-x snap-mandatory sm:gap-5 md:gap-6 [&::-webkit-scrollbar]:hidden"
        >
          {WEBLOG_POSTS.map((post) => (
            <WeblogCard key={post.id} post={post} />
          ))}
        </div>

        <div className="mt-6 flex justify-center sm:mt-8">
          <Link
            href="#weblog"
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
