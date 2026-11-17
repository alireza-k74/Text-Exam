import Image from "next/image";
import Link from "next/link";

import { ArrowLeftIcon } from "~/components/icons";
import { Container } from "~/components/shared";
import { Shape, buttonVariants } from "~/components/ui";
import { CONSULTATION_CTA } from "~/features/home/data";
import { cn } from "~/lib";

/** Wide panel viewBox (short banner). */
const PANEL_W = 200;
const PANEL_H = 80;
/** Horizontal `/` slant — TR+BL out, TL+BR in. */
const PANEL_SLANT = 8;
const PANEL_CORNER_R = 5;
const PANEL_VIEWBOX = `0 0 ${PANEL_W} ${PANEL_H}`;

/** XD consultation photo frame. */
const IMAGE_XD_W = 574;
const IMAGE_XD_H = 255.1;
const IMAGE_ASPECT = `${IMAGE_XD_W} / ${IMAGE_XD_H}`;
const IMAGE_VIEWBOX = `0 0 ${IMAGE_XD_W} ${IMAGE_XD_H}`;
/** Horizontal parallelogram offset (px in XD viewBox). */
const IMAGE_SLANT = 36;
/** Corner radius in XD viewBox units (~14px). */
const IMAGE_CORNER_R = 14;

/**
 * Simple parallelogram `/`:
 * top-right out · bottom-right in · bottom-left out · top-left in.
 */
function consultationPanelPath(
  slant = PANEL_SLANT,
  r = PANEL_CORNER_R,
): string {
  const w = PANEL_W;
  const h = PANEL_H;
  const s = slant;
  const edgeLen = Math.hypot(s, h);
  const ux = s / edgeLen;
  const uy = h / edgeLen;

  // TL (s,0) · TR (w,0) · BR (w-s,h) · BL (0,h)
  return [
    `M ${s + r} 0`,
    `L ${w - r} 0`,
    `Q ${w} 0 ${w - r * ux} ${r * uy}`,
    `L ${w - s + r * ux} ${h - r * uy}`,
    `Q ${w - s} ${h} ${w - s - r} ${h}`,
    `L ${r} ${h}`,
    `Q 0 ${h} ${r * ux} ${h - r * uy}`,
    `L ${s - r * ux} ${r * uy}`,
    `Q ${s} 0 ${s + r} 0`,
    "Z",
  ].join(" ");
}

/**
 * Photo frame (XD 574×255.1): rounded parallelogram `/`
 * — bottom-left + top-right stick outward.
 */
function consultationImagePath(
  slant = IMAGE_SLANT,
  r = IMAGE_CORNER_R,
): string {
  const w = IMAGE_XD_W;
  const h = IMAGE_XD_H;
  const s = slant;
  const edgeLen = Math.hypot(s, h);
  const ux = s / edgeLen;
  const uy = h / edgeLen;

  // TL (s,0) · TR (w,0) · BR (w-s,h) · BL (0,h)
  return [
    `M ${s + r} 0`,
    `L ${w - r} 0`,
    `Q ${w} 0 ${w - r * ux} ${r * uy}`,
    `L ${w - s + r * ux} ${h - r * uy}`,
    `Q ${w - s} ${h} ${w - s - r} ${h}`,
    `L ${r} ${h}`,
    `Q 0 ${h} ${r * ux} ${h - r * uy}`,
    `L ${s - r * ux} ${r * uy}`,
    `Q ${s} 0 ${s + r} 0`,
    "Z",
  ].join(" ");
}

const PANEL_PATH = consultationPanelPath();
const IMAGE_PATH = consultationImagePath();

/** Consultation CTA — blue Shape panel with overlapping photo Shape (RTL: panel start, image end). */
export function HomeConsultation() {
  const { title, description, ctaLabel, ctaHref, imageSrc, imageAlt } =
    CONSULTATION_CTA;

  return (
    <section
      id="consultation"
      aria-labelledby="home-consultation-heading"
      className="py-10 md:py-14"
    >
      <Container className="min-w-0">
        <div
          className={cn(
            "@container/consult flex w-full min-w-0 flex-col gap-4",
            /* Side-by-side from lg — md row was too narrow for title + CTA */
            "lg:flex-row lg:items-center lg:gap-0",
            "overflow-x-clip",
          )}
        >
          <Shape
            shape="custom"
            customPath={PANEL_PATH}
            customViewBox={PANEL_VIEWBOX}
            aspectRatio="auto"
            background="var(--primary)"
            color="var(--primary-foreground)"
            fit="fill"
            className={cn(
              "relative z-0 flex w-full min-w-0 flex-col justify-center",
              "min-h-48 lg:w-[55%] lg:max-w-[55%] lg:shrink lg:grow-0",
              /* Floor ≈ image height; never clip — grow with content */
              "lg:min-h-[calc(0.45*100cqi*255.1/574*0.88)]",
              "[&_.ui-shape__content]:items-stretch [&_.ui-shape__content]:justify-start [&_.ui-shape__content]:text-start",
            )}
          >
            <div
              className={cn(
                "flex h-full min-w-0 flex-col items-start justify-center gap-4 sm:gap-5",
                /* ps clears parallelogram slant (PANEL_SLANT/PANEL_W = 4%) */
                "py-7 pe-5 ps-[max(1.25rem,calc(4%+0.75rem))]",
                "sm:py-8 sm:pe-7 sm:ps-[max(1.5rem,calc(4%+1rem))]",
                "lg:gap-5 lg:pe-14 lg:ps-[max(2rem,calc(4%+1.25rem))] xl:pe-16",
              )}
            >
              <div className="max-w-xl space-y-2.5 text-start md:space-y-3">
                <h2
                  id="home-consultation-heading"
                  className="font-heading text-2xl leading-snug font-medium tracking-tight text-pretty sm:text-3xl lg:text-4xl"
                >
                  {title}
                </h2>
                <p className="text-footer-nav-muted text-xs leading-relaxed font-medium text-pretty sm:text-sm">
                  {description}
                </p>
              </div>

              <Link
                href={ctaHref}
                className={cn(
                  buttonVariants({ variant: "secondary", size: "xl" }),
                  "bg-background text-foreground hover:bg-background/90 w-fit max-w-full shrink-0 font-semibold shadow-sm",
                )}
              >
                <span className="truncate">{ctaLabel}</span>
                <ArrowLeftIcon />
              </Link>
            </div>
          </Shape>

          <Shape
            shape="custom"
            customPath={IMAGE_PATH}
            customViewBox={IMAGE_VIEWBOX}
            aspectRatio={IMAGE_ASPECT}
            background="var(--muted)"
            fit="cover"
            className={cn(
              "relative z-10 w-full min-w-0 self-center",
              /* Pull over the panel’s end edge (overlap) */
              "lg:-ms-12 lg:w-[45%] lg:max-w-[45%] lg:shrink lg:grow-0 xl:-ms-16",
            )}
          >
            <div className="relative size-full min-h-0 min-w-0">
              <Image
                src={imageSrc}
                alt={imageAlt}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 45vw"
                priority={false}
              />
            </div>
          </Shape>
        </div>
      </Container>
    </section>
  );
}
