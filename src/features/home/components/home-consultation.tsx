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
            "md:flex-row md:items-center md:gap-0",
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
              "min-h-48 md:min-h-0 md:w-[55%] md:max-w-[55%] md:shrink md:grow-0",
              // ~88% of image height (image = 45% row × XD aspect)
              "md:h-[calc(0.45*100cqi*255.1/574*0.88)]",
            )}
          >
            <div
              className={cn(
                "flex h-full min-w-0 flex-col items-start justify-center gap-5",
                "px-5 py-6 sm:px-7 sm:py-8 md:gap-5 md:px-8 md:py-8 md:pe-14 lg:px-10 lg:pe-16",
              )}
            >
              <div className="max-w-xl space-y-2.5 text-start md:space-y-3">
                <h2
                  id="home-consultation-heading"
                  className="font-heading text-xl font-bold tracking-tight text-pretty sm:text-2xl md:text-[1.75rem] md:leading-snug"
                >
                  {title}
                </h2>
                <p className="text-primary-foreground/90 text-xs leading-relaxed text-pretty sm:text-sm">
                  {description}
                </p>
              </div>

              <Link
                href={ctaHref}
                className={cn(
                  buttonVariants({ variant: "secondary", size: "xl" }),
                  "bg-background text-foreground hover:bg-background/90 w-fit max-w-full font-semibold shadow-sm",
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
              // Pull over the panel’s physical-left edge
              "md:-ms-12 md:w-[45%] md:max-w-[45%] md:shrink md:grow-0 lg:-ms-16",
            )}
          >
            <div className="relative size-full min-h-0 min-w-0">
              <Image
                src={imageSrc}
                alt={imageAlt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 45vw"
                priority={false}
              />
            </div>
          </Shape>
        </div>
      </Container>
    </section>
  );
}
