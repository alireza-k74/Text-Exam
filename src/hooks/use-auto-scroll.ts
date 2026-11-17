"use client";

import { useEffect, useRef, type RefObject } from "react";

type UseAutoScrollOptions = {
  intervalMs?: number;
  pauseOnHover?: boolean;
  enabled?: boolean;
};

function scrollScrollerToChild(
  node: HTMLElement,
  index: number,
  behavior: ScrollBehavior = "smooth",
) {
  const item = node.children[index] as HTMLElement | undefined;
  if (!item) return;
  const nodeRect = node.getBoundingClientRect();
  const itemRect = item.getBoundingClientRect();
  const isRtl = getComputedStyle(node).direction === "rtl";
  // Align to inline-start without scrolling the document.
  const delta = isRtl
    ? itemRect.right - nodeRect.right
    : itemRect.left - nodeRect.left;
  node.scrollBy({ left: delta, behavior });
}

/**
 * Auto-scrolls one child at a time inside the scroller only (never scrolls the page),
 * then loops to the first item. Pauses while off-screen or hovered.
 * Does not intercept mouse wheel — page vertical scroll stays normal.
 */
export function useAutoScroll(
  scrollerRef: RefObject<HTMLElement | null>,
  itemCount: number,
  {
    intervalMs = 3200,
    pauseOnHover = true,
    enabled = true,
  }: UseAutoScrollOptions = {},
) {
  const indexRef = useRef(0);
  const pausedRef = useRef(false);
  const inViewRef = useRef(false);

  function goTo(index: number, behavior: ScrollBehavior = "smooth") {
    const node = scrollerRef.current;
    if (!node || itemCount <= 0) return;
    const next = ((index % itemCount) + itemCount) % itemCount;
    indexRef.current = next;
    scrollScrollerToChild(node, next, behavior);
  }

  function goNext(behavior: ScrollBehavior = "smooth") {
    goTo(indexRef.current + 1, behavior);
  }

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el || !enabled || itemCount <= 1) return;

    indexRef.current = 0;
    scrollScrollerToChild(el, 0, "instant");

    const io = new IntersectionObserver(
      ([entry]) => {
        inViewRef.current = entry?.isIntersecting ?? false;
      },
      { threshold: 0.25 },
    );
    io.observe(el);

    const timer = window.setInterval(() => {
      if (pausedRef.current || !inViewRef.current) return;
      goNext("smooth");
    }, intervalMs);

    function onEnter() {
      if (pauseOnHover) pausedRef.current = true;
    }
    function onLeave() {
      if (pauseOnHover) pausedRef.current = false;
    }

    el.addEventListener("pointerenter", onEnter);
    el.addEventListener("pointerleave", onLeave);

    return () => {
      window.clearInterval(timer);
      io.disconnect();
      el.removeEventListener("pointerenter", onEnter);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, [scrollerRef, itemCount, intervalMs, pauseOnHover, enabled]);

  return { goNext };
}
