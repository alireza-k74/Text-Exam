import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";

import { OcsLogo, type OcsLogoProps } from "~/components/icons";
import { cn } from "~/lib";

type SiteLogoProps = Omit<ComponentPropsWithoutRef<typeof Link>, "href"> & {
  href?: string;
  tone?: OcsLogoProps["tone"];
  logoClassName?: string;
};

/** OCS / Osuli brand mark linking to home. */
export function SiteLogo({
  className,
  href = "/",
  tone,
  logoClassName,
  ...props
}: SiteLogoProps) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex shrink-0 items-center outline-none focus-visible:ring-2 focus-visible:ring-ring/50",
        className,
      )}
      {...props}
    >
      <span className="sr-only">خدمات گمرکی اصولی</span>
      <OcsLogo tone={tone} className={logoClassName} />
    </Link>
  );
}
