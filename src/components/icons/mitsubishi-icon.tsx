import type { SVGProps } from "react";

import { cn } from "~/lib";

export type MitsubishiIconProps = SVGProps<SVGSVGElement>;

/** Mitsubishi diamond — 20×20, uses `currentColor` for fill. */
export function MitsubishiIcon({ className, ...props }: MitsubishiIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden
      className={cn("size-5 shrink-0", className)}
      {...props}
    >
      <path
        d="M9.87567 1.75012L6.71647 6.86739L13.0598 18.0301L19.7264 18.005L16.3433 12.4864H3.55726L0.273682 18.0802H6.49259L13.1593 6.76706L9.87567 1.75012Z"
        fill="currentColor"
      />
    </svg>
  );
}
