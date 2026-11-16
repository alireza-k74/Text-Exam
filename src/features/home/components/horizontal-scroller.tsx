import type { ReactNode } from "react";

import { cn } from "~/lib";

type HorizontalScrollerProps = {
  children: ReactNode;
  className?: string;
  /** Accessible name for the scroll region. */
  "aria-label": string;
};

/**
 * Shared horizontal list shell — snap-friendly, no overflow on the page.
 */
export function HorizontalScroller({
  children,
  className,
  "aria-label": ariaLabel,
}: HorizontalScrollerProps) {
  return (
    <div
      role="list"
      aria-label={ariaLabel}
      className={cn(
        "flex gap-3 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] snap-x snap-mandatory [&::-webkit-scrollbar]:hidden",
        className,
      )}
    >
      {children}
    </div>
  );
}
