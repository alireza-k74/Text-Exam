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
  /** Default `start` (RTL-aware). Use `center` for centered section titles. */
  align?: "start" | "center";
  className?: string;
};

/** Consistent title block for home sections. */
export function SectionHeading({
  id,
  title,
  description,
  action,
  showUnderline = false,
  align = "start",
  className,
}: SectionHeadingProps) {
  const centered = align === "center";

  return (
    <div
      className={cn(
        "mb-5 flex flex-col gap-2 sm:mb-6",
        centered
          ? "items-center"
          : "sm:flex-row sm:items-end sm:justify-between",
        className,
      )}
    >
      <div
        className={cn(
          "min-w-0 space-y-1",
          centered ? "text-center" : "text-start",
        )}
      >
        <div
          className={cn(
            "inline-flex flex-col gap-1.5",
            centered ? "items-center" : "items-start",
          )}
        >
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
          <p
            className={cn(
              "text-muted-foreground max-w-2xl text-sm text-pretty md:text-base",
              centered && "mx-auto",
            )}
          >
            {description}
          </p>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}
