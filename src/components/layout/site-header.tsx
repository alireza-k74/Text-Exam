import Link from "next/link";

import { ConsultationIcon, HomeIcon } from "~/components/icons";
import { Shape } from "~/components/ui";
import { cn } from "~/lib";

import { HeaderUser } from "./header-user";
import { SiteLogo } from "./site-logo";

const navLinkClass =
  "inline-flex items-center gap-1.5 text-sm font-medium transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring/50";

/** Parallelogram slant for the header shell (matches XD Header Container). */
const HEADER_SKEW = "18deg";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-(--z-sticky) overflow-x-clip backdrop-blur-sm sm:py-3">
      <div className="container-page min-w-0">
        <Shape
          shape="rounded-rectangle"
          width="100%"
          height="auto"
          background="var(--background)"
          border="1px solid var(--border)"
          borderRadius="1.5rem"
          color="var(--foreground)"
          clipContent={false}
          className="w-full max-w-full shadow-[0_10px_28px_oklch(0_0_0_/_0.1)] max-sm:[--header-skew:10deg] sm:[--header-skew:18deg]"
          style={{ transform: `skewX(var(--header-skew, ${HEADER_SKEW}))` }}
        >
          <div
            className="flex min-h-14 w-full min-w-0 items-center justify-between gap-2 px-3 py-2.5 sm:min-h-16 sm:gap-4 sm:px-6 sm:py-3"
            style={{
              transform: `skewX(calc(-1 * var(--header-skew, ${HEADER_SKEW})))`,
            }}
          >
            <div className="flex min-w-0 items-center gap-2 sm:gap-5 md:gap-6">
              <SiteLogo />
              <Link
                href="#"
                aria-label="خانه"
                className={cn(navLinkClass, "text-foreground hover:text-primary")}
              >
                <HomeIcon />
                <span className="max-[360px]:sr-only">خانه</span>
              </Link>
            </div>

            <div className="flex shrink-0 items-center gap-1.5 sm:gap-4">
              <Link
                href="#"
                aria-label="مشاوره"
                className={cn(navLinkClass, "text-primary hover:text-primary/80")}
              >
                <ConsultationIcon />
                <span className="max-[360px]:sr-only">مشاوره</span>
              </Link>

              <HeaderUser />
            </div>
          </div>
        </Shape>
      </div>
    </header>
  );
}
