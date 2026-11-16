import Image from "next/image";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

import { Container } from "~/components/shared";
import { HOME_SERVICES } from "~/features/home/data";
import type { HomeService } from "~/features/home/types";
import { cn } from "~/lib";

import { SectionHeading } from "./section-heading";

function ServiceCard({ service }: { service: HomeService }) {
  return (
    <li className="flex flex-col">
      <div className="relative flex min-h-44 items-end justify-center px-2 pt-6 sm:min-h-48 md:min-h-52">
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 flex justify-center overflow-hidden select-none"
        >
          <span className="text-foreground/[0.07] max-w-full truncate text-[clamp(2.5rem,8vw,3.75rem)] font-bold leading-none tracking-tight">
            {service.watermark}
          </span>
        </span>

        <div className="relative z-10 w-full max-w-[17.5rem]">
          <Image
            src={service.imageSrc}
            alt={service.imageAlt}
            className="mx-auto h-auto w-full object-contain mix-blend-lighten dark:mix-blend-normal"
            sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 280px"
            priority={false}
          />
        </div>
      </div>

      <div
        className={cn(
          "bg-muted flex flex-1 flex-col items-center gap-4 rounded-2xl",
          "px-5 py-5 text-center sm:gap-5 sm:px-6 sm:py-6",
        )}
      >
        <div className="w-full space-y-2">
          <h3 className="text-foreground text-base font-bold tracking-tight md:text-lg">
            {service.title}
          </h3>
          <p className="text-muted-foreground text-xs leading-relaxed text-pretty sm:text-sm">
            {service.description}
          </p>
        </div>

        <Link
          href={service.ctaHref}
          className={cn(
            "text-foreground hover:text-primary mt-auto inline-flex items-center justify-center gap-1",
            "text-xs font-medium transition-colors sm:text-sm",
          )}
        >
          <span>{service.ctaLabel}</span>
          <ChevronLeft className="size-3.5 shrink-0" aria-hidden />
        </Link>
      </div>
    </li>
  );
}

/** Six services in a 3-column grid (2 rows on desktop). */
export function HomeServices() {
  return (
    <section
      id="services"
      aria-labelledby="home-services-heading"
      className="relative overflow-hidden py-10 md:py-14"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -start-24 top-1/4 size-72 rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--primary)_28%,transparent),transparent_70%)] blur-2xl sm:size-96 md:-start-16 md:top-16"
      />

      <Container className="relative z-10">
        <SectionHeading
          id="home-services-heading"
          title="خدمات ما"
          description="راهکارهای تخصصی برای بازرگانان، شرکت‌ها و صاحبان کالا؛ برآورد اولیه همان لحظه"
          className="mb-8 items-center text-center sm:mb-10 sm:flex-col sm:items-center sm:justify-center [&_h2]:text-primary [&_p]:mx-auto"
        />

        <ul className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-8">
          {HOME_SERVICES.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </ul>
      </Container>
    </section>
  );
}
