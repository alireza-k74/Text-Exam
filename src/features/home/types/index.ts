import type { StaticImageData } from "next/image";

/** Shared types for the home feature. */

/** Quick category strip above the home slider (`src/assets/headers`). */
export type HomeHeaderCategory = {
  id: string;
  title: string;
  href: string;
  imageSrc: string | StaticImageData;
  imageAlt: string;
};

export type HomeSlide = {
  id: string;
  /** Tab / segment label for this slide (e.g. امور گمرکی). */
  category: string;
  /** Brand / company line (e.g. بازرگانی اصولی شجاعی). */
  brand?: string;
  title: string;
  /** Supporting line under the title. */
  subtitle?: string;
  /** Short service labels (e.g. ثبت سفارش). */
  tags?: string[];
  description: string;
  ctaLabel?: string;
  ctaHref?: string;
  imageSrc?: string | StaticImageData;
  imageAlt?: string;
};

export type HomeService = {
  id: string;
  /** Large English watermark behind the image (e.g. Shipping). */
  watermark: string;
  title: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
  imageSrc: string | StaticImageData;
  imageAlt: string;
};

export type PriceVehicle = {
  id: string;
  title: string;
  /** Formatted Toman price (Persian digits). */
  price: string;
  /** Overlay lines on the image (year / engine / trim / options). */
  specs: string[];
  imageSrc: string | StaticImageData;
  imageAlt: string;
  brand?: string;
};

export type PriceCategoryTone = "cars" | "tractors";

export type PriceCategory = {
  id: string;
  tone: PriceCategoryTone;
  /** Persian title on the vertical banner. */
  title: string;
  /** Short line under the banner title (e.g. موجود، مدل روز). */
  subtitle: string;
  /** English watermark behind the banner image. */
  watermark: string;
  bannerSrc: string | StaticImageData;
  bannerAlt: string;
  seeMoreLabel: string;
  seeMoreHref: string;
  vehicles: PriceVehicle[];
};

export type ExchangeRate = {
  id: string;
  code: string;
  /** Persian currency name. */
  name: string;
  /** Formatted Toman rate (Persian digits). */
  rate: string;
};

export type WeblogPost = {
  id: string;
  /** Category chip on the thumbnail (e.g. کشنده و کامیون). */
  category: string;
  title: string;
  excerpt: string;
  /** Display date (Persian digits / Jalali). */
  date: string;
  /** Machine-readable date for `<time dateTime>`. */
  dateTime: string;
  author: string;
  href: string;
  imageSrc: string | StaticImageData;
  imageAlt: string;
};

export type ConsultationCta = {
  title: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
  imageSrc: string | StaticImageData;
  imageAlt: string;
};
