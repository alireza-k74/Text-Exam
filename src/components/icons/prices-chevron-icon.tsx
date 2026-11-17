import type { SVGProps } from "react";

import { cn } from "~/lib";

export type PricesChevronIconProps = SVGProps<SVGSVGElement>;

/** 23×45 chevron band — uses `currentColor` for fill. */
export function PricesChevronIcon({
  className,
  ...props
}: PricesChevronIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={23}
      height={45}
      viewBox="0 0 23 45"
      fill="none"
      aria-hidden
      className={cn("h-[45px] w-[23px] shrink-0", className)}
      {...props}
    >
      <path
        d="M13.0333 0H23L9.96667 22.5L23 45H13.0333L0 22.5L13.0333 0Z"
        fill="currentColor"
      />
    </svg>
  );
}
