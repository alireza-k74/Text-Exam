import { useId, type SVGProps } from "react";

import { cn } from "~/lib";

export type AccentUnderlineIconProps = SVGProps<SVGSVGElement>;

/**
 * Soft gold gradient bar underline (Figma `#F0A510`).
 * Fades from transparent → accent for section titles.
 */
export function AccentUnderlineIcon({
  className,
  ...props
}: AccentUnderlineIconProps) {
  const gradientId = `accent-underline-${useId().replaceAll(":", "")}`;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 4"
      fill="none"
      aria-hidden
      className={cn("h-1 w-6 shrink-0", className)}
      {...props}
    >
      <path
        d="M0 2C0 0.895431 0.895431 0 2 0H22C23.1046 0 24 0.895431 24 2V2C24 3.10457 23.1046 4 22 4H2C0.89543 4 0 3.10457 0 2V2Z"
        fill={`url(#${gradientId})`}
      />
      <defs>
        <linearGradient
          id={gradientId}
          x1="0"
          y1="2"
          x2="24"
          y2="2"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="var(--accent)" stopOpacity="0" />
          <stop offset="1" stopColor="var(--accent)" />
        </linearGradient>
      </defs>
    </svg>
  );
}
