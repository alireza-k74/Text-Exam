import type { ReactNode } from "react";

import { cn } from "~/lib";

type SectionHeadingProps = {
  id?: string;
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
};

/** Consistent title block for home sections. */
export function SectionHeading({
  id,
  title,
  description,
  action,
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
        <h2
          id={id}
          className="text-foreground text-xl font-semibold tracking-tight md:text-2xl"
        >
          {title}
        </h2>
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
