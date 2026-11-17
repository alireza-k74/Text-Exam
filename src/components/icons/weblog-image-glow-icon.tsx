"use client";

import { useId, type SVGProps } from "react";

import { cn } from "~/lib";

export type WeblogImageGlowIconProps = SVGProps<SVGSVGElement>;

/**
 * Soft radial cyan glow behind weblog card images (Figma radial #03AEF4).
 * Color via `--highlight` token.
 */
export function WeblogImageGlowIcon({
  className,
  ...props
}: WeblogImageGlowIconProps) {
  const gradientId = useId();

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 411 229"
      fill="none"
      aria-hidden
      className={cn("h-auto w-full", className)}
      {...props}
    >
      <path d="M0 0H410.667V228.148H0V0Z" fill={`url(#${gradientId})`} />
      <defs>
        <radialGradient
          id={gradientId}
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(205.333 114.074) rotate(90) scale(114.074 114.356)"
        >
          <stop stopColor="var(--highlight)" />
          <stop offset="1" stopColor="var(--highlight)" stopOpacity="0" />
        </radialGradient>
      </defs>
    </svg>
  );
}
