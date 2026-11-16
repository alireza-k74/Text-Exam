import Image from "next/image";
import Link from "next/link";

import { ArrowLeftIcon } from "~/components/icons";
import { Container } from "~/components/shared";
import { buttonVariants } from "~/components/ui";
import { CONSULTATION_CTA } from "~/features/home/data";
import { cn } from "~/lib";

/** Consultation CTA — blue panel with overlapping photo (RTL: panel start, image end). */
export function HomeConsultation() {
  const { title, description, ctaLabel, ctaHref, imageSrc, imageAlt } =
    CONSULTATION_CTA;

  return (
    <section
      id="consultation"
      aria-labelledby="home-consultation-heading"
      className="py-10 md:py-14"
    >
      <Container>
        <div className="flex flex-col gap-4 md:flex-row md:items-stretch">
          <div
            className={cn(
              "bg-primary flex flex-1 flex-col justify-center gap-5 rounded-2xl",
              "px-5 py-6 sm:px-7 sm:py-8 md:gap-6 md:px-8 md:py-10 md:pe-16 lg:px-10 lg:pe-20",
            )}
          >
            <div className="max-w-xl space-y-2.5 md:space-y-3">
              <h2
                id="home-consultation-heading"
                className="text-primary-foreground font-heading text-xl font-bold tracking-tight text-pretty sm:text-2xl md:text-[1.75rem] md:leading-snug"
              >
                {title}
              </h2>
              <p className="text-primary-foreground/90 text-sm leading-relaxed text-pretty sm:text-base">
                {description}
              </p>
            </div>

            <Link
              href={ctaHref}
              className={cn(
                buttonVariants({ variant: "secondary", size: "lg" }),
                "bg-background text-foreground hover:bg-background/90 h-11 w-fit gap-2 rounded-lg px-5 text-sm font-semibold shadow-sm sm:h-12 sm:px-6 sm:text-base",
              )}
            >
              <span>{ctaLabel}</span>
              <ArrowLeftIcon className="size-5 sm:size-6" />
            </Link>
          </div>

          <div
            className={cn(
              "relative z-10 overflow-hidden rounded-2xl",
              "aspect-[16/10] w-full md:aspect-auto md:min-h-56 md:w-[44%] md:shrink-0 md:-ms-10 lg:min-h-64 lg:w-[42%] lg:-ms-14",
            )}
          >
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 42vw"
              priority={false}
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
