import type { SVGProps } from "react";

import { cn } from "~/lib";

export type RenaultIconProps = SVGProps<SVGSVGElement>;

/** Renault diamond — 20×20, uses `currentColor` for fill. */
export function RenaultIcon({ className, ...props }: RenaultIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden
      className={cn("size-5 shrink-0", className)}
      {...props}
    >
      <g clipPath="url(#clip-renault-logo)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M17.4949 9.99103L12.227 -0.0012207H10.7408L5.48926 9.99103L8.87457 16.4182L9.61762 14.9955L6.99203 9.99103L11.4838 1.43822L15.9921 9.99103L10.7408 20H12.227L17.4949 9.99103ZM14.4893 9.99103L11.1205 3.58057L10.361 5.00327L13.0032 9.99103L8.49495 18.5606L3.9865 9.99103L9.25435 -0.0012207H7.75159L2.50024 9.99103L7.75159 20H9.23784L14.4893 9.99103Z"
          fill="currentColor"
        />
      </g>
      <defs>
        <clipPath id="clip-renault-logo">
          <rect width="20" height="20" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}
