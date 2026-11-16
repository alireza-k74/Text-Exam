import Link from "next/link";

import { ConsultationIcon, HomeIcon } from "~/components/icons";
import { cn } from "~/lib";

import { HeaderUser } from "./header-user";
import { SiteLogo } from "./site-logo";

const navLinkClass =
  "inline-flex items-center gap-1.5 text-sm font-medium transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring/50";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-(--z-sticky) bg-muted/70 py-2.5 backdrop-blur-sm sm:py-3">
      <div className="container-page">
        <div className="flex min-h-14 items-center justify-between gap-3 rounded-xl bg-background px-3 py-2.5 shadow-md sm:min-h-16 sm:gap-4 sm:px-4 sm:py-3">
          <div className="flex min-w-0 items-center gap-3 sm:gap-5 md:gap-6">
            <SiteLogo />
            <Link
              href="/"
              className={cn(navLinkClass, "text-foreground hover:text-primary")}
            >
              <HomeIcon />
              <span>خانه</span>
            </Link>
          </div>

          <div className="flex shrink-0 items-center gap-2.5 sm:gap-4">
            <Link
              href="/consultation"
              className={cn(navLinkClass, "text-primary hover:text-primary/80")}
            >
              <ConsultationIcon />
              <span>مشاوره</span>
            </Link>

            <HeaderUser />
          </div>
        </div>
      </div>
    </header>
  );
}
