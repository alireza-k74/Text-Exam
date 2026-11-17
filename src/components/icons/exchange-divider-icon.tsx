import type { SVGProps } from "react";

import { cn } from "~/lib";

export type ExchangeDividerIconProps = SVGProps<SVGSVGElement>;

/** Thin diagonal rate separator — stroke via `currentColor`. */
export function ExchangeDividerIcon({
  className,
  ...props
}: ExchangeDividerIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={7}
      height={29}
      viewBox="0 0 7 29"
      fill="none"
      aria-hidden
      className={cn("h-[29px] w-[7px] shrink-0", className)}
      {...props}
    >
      <path
        d="M6.24438 0.0523682L0.244385 28.0524"
        stroke="currentColor"
        strokeWidth={0.5}
      />
    </svg>
  );
}
