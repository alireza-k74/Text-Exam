import type { ReactNode } from "react";

import { AccentUnderlineIcon, TitleMarkIcon } from "~/components/icons";
import { cn } from "~/lib";

type SectionHeadingProps = {
  id?: string;
  title: string;
  description?: string;
  action?: ReactNode;
  /** Show brand title mark above the heading. Default true. */
  showMark?: boolean;
  /** Gold gradient bar under the title. */
  showUnderline?: boolean;
  /** Horizontal alignment of the mark + title stack. */
  align?: "start" | "center";
  className?: string;
};

/** Consistent title block for home sections. */
export function SectionHeading({
  id,
  title,
  description,
  action,
  showMark = true,
  showUnderline = false,
  align = "start",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "mb-5 flex flex-col gap-2 sm:mb-6 sm:flex-row sm:items-end sm:justify-between",
        className,
      )}
    >
      <div className="min-w-0 space-y-1">
        <div
          className={cn(
            "inline-flex flex-col gap-1.5",
            align === "center" ? "items-center" : "items-start",
          )}
        >
          {showMark ? (
            <TitleMarkIcon
              className={cn(
                "text-highlight",
                align === "start" && "ms-0.5",
              )}
            />
          ) : null}
          <h2
            id={id}
            className="text-foreground text-xl font-semibold tracking-tight md:text-2xl"
          >
            {title}
          </h2>
          {showUnderline ? (
            <AccentUnderlineIcon className="mt-0.5 w-8 sm:w-9" />
          ) : null}
        </div>
        {description ? (
          <p className="text-muted-foreground max-w-2xl text-sm text-pretty md:text-base">
            {description}
          </p>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}
