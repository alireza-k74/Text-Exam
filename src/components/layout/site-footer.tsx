import { cacheLife } from "next/cache";
import Link from "next/link";

import {
  AccentUnderlineIcon,
  ArrowLeftIcon,
  FooterWatermarkIcon,
  InstagramIcon,
  LocationIcon,
  MailIcon,
  PhoneIcon,
  SendIcon,
  TelegramIcon,
  WhatsappIcon,
} from "~/components/icons";
import { Button, Input, Shape } from "~/components/ui";
import { cn } from "~/lib";

import { SiteLogo } from "./site-logo";

const COMPANY_NAME = "شرکت بازرگانی اصولی شجاعی";
const COMPANY_TAGLINE =
  "واردات و صادرات کالا • ترخیص مستقل • گمرکات سرزمین اصلی و مناطق آزاد • مسیر ترکیبی خدمات";
const SLOGAN = "همراه شما در مسیر تجارت جهانی";

const FOOTER_NAV = [
  { href: "/", label: "صفحه اصلی", isHome: true },
  { href: "#cars", label: "خودروهای سواری" },
  { href: "#truck", label: "کشنده و کامیون" },
  { href: "#shipping", label: "حمل و نقل" },
  { href: "#import-export", label: "واردات، صادرات و ترخیص" },
  { href: "#storage", label: "انبارداری و سردخانه گمرکی" },
  { href: "#orders", label: "ثبت سفارش و امور ارزی" },
] as const;

const CONTACT = [
  {
    key: "email",
    href: "mailto:info@osoulicustoms.com",
    label: "پست الکترونیک",
    value: "info@osoulicustoms.com",
    Icon: MailIcon,
    ltr: true,
  },
  {
    key: "phone",
    href: "tel:+98214454567",
    label: "تلفن تماس",
    value: "۴۴۵۴۵۶۷ - ۰۲۱",
    Icon: PhoneIcon,
    ltr: true,
  },
  {
    key: "address",
    href: undefined,
    label: "آدرس",
    value: "تهران، جردن، ناهید غربی، گروه اصولی",
    Icon: LocationIcon,
    ltr: false,
  },
] as const;

const SOCIAL_LINKS = [
  { href: "#", label: "اینستاگرام", Icon: InstagramIcon },
  { href: "#", label: "واتساپ", Icon: WhatsappIcon },
  { href: "#", label: "تلگرام", Icon: TelegramIcon },
] as const;

/** Wide footer shell — stretched via preserveAspectRatio=none. */
const FOOTER_W = 1000;
const FOOTER_H = 500;
/** How much lower the physical top-left sits vs top-right. */
const FOOTER_TOP_SLANT = 36;
/** Rounded top corners (viewBox units). */
const FOOTER_CORNER_R = 28;
const FOOTER_VIEWBOX = `0 0 ${FOOTER_W} ${FOOTER_H}`;

/**
 * Footer shell: top-right higher than top-left, rounded top corners, flat bottom.
 * TL (0, slant) · TR (w, 0) · BR (w, h) · BL (0, h)
 */
function footerShellPath(
  slant = FOOTER_TOP_SLANT,
  r = FOOTER_CORNER_R,
): string {
  const w = FOOTER_W;
  const h = FOOTER_H;
  const len = Math.hypot(w, slant);
  const ux = w / len;
  const uy = -slant / len;

  return [
    `M 0 ${slant + r}`,
    `Q 0 ${slant} ${r * ux} ${slant + r * uy}`,
    `L ${w - r * ux} ${-r * uy}`,
    `Q ${w} 0 ${w} ${r}`,
    `L ${w} ${h}`,
    `L 0 ${h}`,
    "Z",
  ].join(" ");
}

const FOOTER_SHELL_PATH = footerShellPath();

function toFaDigits(value: number | string) {
  return String(value).replace(/\d/g, (digit) => "۰۱۲۳۴۵۶۷۸۹"[Number(digit)]!);
}

async function getCurrentYear() {
  "use cache";
  cacheLife("max");
  return new Date().getFullYear();
}

export async function SiteFooter() {
  const year = await getCurrentYear();

  return (
    <footer className="relative overflow-x-clip">
      <Shape
        shape="custom"
        customPath={FOOTER_SHELL_PATH}
        customViewBox={FOOTER_VIEWBOX}
        width="100%"
        height="auto"
        aspectRatio="auto"
        background="var(--footer)"
        color="var(--footer-foreground)"
        fit="fill"
        clipContent
        className={cn(
          "relative w-full max-w-none",
          /* Shape defaults to center — stretch/start so footer rows align edge-to-edge */
          "[&_.ui-shape__content]:items-stretch [&_.ui-shape__content]:justify-start [&_.ui-shape__content]:text-start",
        )}
      >
        <div className="relative w-full min-w-0">
          <div className="container-page relative z-10 flex min-w-0 flex-col gap-8 py-10 md:gap-10 md:py-12 lg:gap-11 lg:py-14">
            {/* Brand + newsletter — brand fixed, newsletter flex-1 to left edge (= nav) */}
            <div className="flex min-w-0 flex-col gap-8 md:flex-row md:items-start md:gap-40 lg:gap-64 xl:gap-72">
              <div className="flex max-w-xl min-w-0 shrink-0 flex-col items-start space-y-3 text-start md:max-w-lg lg:max-w-xl">
                <SiteLogo
                  tone="onDark"
                  logoClassName="h-7 sm:h-8"
                  className="mb-1"
                />
                <h2 className="text-footer-foreground text-xl font-bold tracking-tight sm:text-2xl">
                  {COMPANY_NAME}
                </h2>
                <p className="text-footer-muted text-xs leading-relaxed text-pretty sm:text-sm">
                  {COMPANY_TAGLINE}
                </p>
              </div>

              <div className="flex w-full min-w-0 flex-1 flex-col items-start text-start">
                <h3 className="text-footer-foreground mb-4 flex w-full flex-col items-start gap-1.5 text-start text-base font-semibold sm:text-lg">
                  <span>عضویت در خبرنامه</span>
                  <AccentUnderlineIcon className="w-6" />
                </h3>

                <form
                  className="flex w-full min-w-0 items-stretch gap-2.5"
                  action="#"
                  method="post"
                >
                  <label className="sr-only" htmlFor="footer-newsletter-email">
                    ایمیل
                  </label>
                  <div className="relative min-w-0 flex-1">
                    <MailIcon className="text-footer-muted pointer-events-none absolute start-3.5 top-1/2 size-5 -translate-y-1/2" />
                    <Input
                      id="footer-newsletter-email"
                      type="email"
                      name="email"
                      autoComplete="email"
                      placeholder="ایمیل خود را وارد کنید"
                      className={cn(
                        "bg-footer-input text-footer-foreground border-0",
                        "placeholder:text-footer-muted h-12 rounded-lg ps-11 pe-3 text-sm",
                        "focus-visible:ring-primary/25",
                      )}
                    />
                  </div>
                  <Button
                    type="submit"
                    size="icon-lg"
                    aria-label="ارسال"
                    className="bg-primary text-primary-foreground hover:bg-primary/90 size-12 shrink-0 rounded-lg"
                  >
                    <SendIcon className="size-5" />
                  </Button>
                </form>
              </div>
            </div>

            {/* Nav strip */}
            <nav
              aria-label="پیوندهای فوتر"
              className="bg-footer-nav min-w-0 [scrollbar-width:none] overflow-x-auto rounded-xl px-4 py-3.5 [-ms-overflow-style:none] sm:px-6 [&::-webkit-scrollbar]:hidden"
            >
              <ul className="flex w-max min-w-full items-center gap-3.5 sm:gap-4 md:gap-5 lg:gap-6">
                {FOOTER_NAV.map((item) => {
                  const isHome = "isHome" in item && item.isHome;

                  return (
                    <li key={item.href + item.label} className="shrink-0">
                      <Link
                        href={item.href}
                        className={cn(
                          "inline-flex items-center gap-1 whitespace-nowrap transition-colors",
                          "text-xs sm:text-[0.8125rem] lg:text-sm",
                          isHome
                            ? "text-footer-foreground"
                            : "text-footer-nav-muted hover:text-footer-foreground",
                        )}
                      >
                        {isHome ? (
                          <ArrowLeftIcon className="size-3.5 shrink-0 opacity-90" />
                        ) : null}
                        <span>{item.label}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            {/* Contact + social — contact at start, social at end */}
            <div className="relative z-10 -mt-2 flex min-w-0 flex-col gap-5 pb-2 md:-mt-3 md:flex-row md:items-center md:justify-between md:gap-8 md:pb-3">
              <ul className="text-footer-foreground flex min-w-0 flex-col gap-3 text-xs sm:flex-row sm:flex-wrap sm:items-center sm:gap-y-2 md:flex-nowrap md:text-sm">
                {CONTACT.map((item, index) => {
                  const content = (
                    <>
                      <span className="inline-flex min-w-0 flex-wrap items-baseline gap-1">
                        <span className="text-footer-muted">{item.label}</span>
                        <span dir={item.ltr ? "ltr" : undefined}>
                          {item.value}
                        </span>
                      </span>
                      <item.Icon className="text-primary size-5 shrink-0" />
                    </>
                  );

                  return (
                    <li
                      key={item.key}
                      className="inline-flex min-w-0 items-center"
                    >
                      {index > 0 ? (
                        <span
                          aria-hidden
                          className="text-footer-muted ms-3 me-3 hidden shrink-0 sm:ms-4 sm:me-4 sm:inline"
                        >
                          /
                        </span>
                      ) : null}
                      {item.href ? (
                        <a
                          href={item.href}
                          className="inline-flex min-w-0 items-center gap-2 transition-opacity hover:opacity-90"
                        >
                          {content}
                        </a>
                      ) : (
                        <span className="inline-flex min-w-0 items-center gap-2">
                          {content}
                        </span>
                      )}
                    </li>
                  );
                })}
              </ul>

              <ul
                dir="ltr"
                className="flex shrink-0 items-center gap-2.5 self-end md:self-auto"
              >
                {SOCIAL_LINKS.map(({ href, label, Icon }) => (
                  <li key={label}>
                    <a
                      href={href}
                      aria-label={label}
                      className={cn(
                        "border-footer-border text-footer-foreground",
                        "hover:border-primary hover:text-primary",
                        "inline-flex size-10 items-center justify-center rounded-lg border transition-colors",
                      )}
                    >
                      <Icon className="size-5" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div
              aria-hidden
              className="relative z-0 flex w-full min-w-0 justify-center overflow-x-clip pt-2 md:pt-3"
            >
              <FooterWatermarkIcon className="w-full max-w-[min(100%,80rem)] select-none" />
            </div>

            {/* Bottom bar: slogan at inline-start, copyright at inline-end */}
            <div className="relative z-10 flex w-full min-w-0 flex-col gap-3 pt-5 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
              <p className="text-accent inline-flex min-w-0 items-center gap-2.5 text-xs font-medium sm:text-sm">
                <AccentUnderlineIcon className="w-6 shrink-0" />
                <span className="min-w-0 text-pretty">{SLOGAN}</span>
              </p>
              <p className="text-footer-muted min-w-0 text-xs text-pretty sm:text-sm">
                © {toFaDigits(year)} - تمامی حقوق برای {COMPANY_NAME} محفوظ است.
              </p>
            </div>
          </div>
        </div>
      </Shape>
    </footer>
  );
}
