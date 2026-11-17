import type { ReactNode } from "react";

import { AccentUnderlineIcon } from "~/components/icons";
import { cn } from "~/lib";

type SectionHeadingProps = {
  id?: string;
  title: string;
  description?: string;
  action?: ReactNode;
  /** Gold gradient bar under the title. */
  showUnderline?: boolean;
  className?: string;
};

/** Consistent title block for home sections (RTL start / right-aligned). */
export function SectionHeading({
  id,
  title,
  description,
  action,
  showUnderline = false,
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "mb-5 flex flex-col gap-2 sm:mb-6 sm:flex-row sm:items-end sm:justify-between",
        className,
      )}
    >
      <div className="min-w-0 space-y-1 text-start">
        <div className="inline-flex flex-col items-start gap-1.5">
          <h2
            id={id}
            className="text-primary text-xl font-semibold tracking-tight md:text-2xl"
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
