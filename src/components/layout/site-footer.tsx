import { cacheLife } from "next/cache";
import Link from "next/link";

import {
  ArrowLeftIcon,
  InstagramIcon,
  LocationIcon,
  MailIcon,
  PhoneIcon,
  SendIcon,
  TelegramIcon,
  WhatsappIcon,
} from "~/components/icons";
import { Button, Input } from "~/components/ui";
import { cn } from "~/lib";

import { SiteLogo } from "./site-logo";

const COMPANY_NAME = "شرکت بازرگانی اصولی شجاعی";
const COMPANY_TAGLINE =
  "واردات و صادرات کالا • ترخیص مستقل • گمرکات سرزمین اصلی و مناطق آزاد • مسیر ترکیبی خدمات";
const SLOGAN = "همراه شما در مسیر تجارت جهانی";
const WATERMARK = "OSULI CUSTOMS SERVICES";

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
    label: "پست الکترونیک:",
    value: "info@osoulicustoms.com",
    Icon: MailIcon,
    ltr: true,
  },
  {
    key: "phone",
    href: "tel:+98214454567",
    label: "تلفن تماس:",
    value: "۴۴۵۴۵۶۷ - ۰۲۱",
    Icon: PhoneIcon,
    ltr: true,
  },
  {
    key: "address",
    href: undefined,
    label: "آدرس:",
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
    <footer className="bg-footer text-footer-foreground relative overflow-hidden">
      <div className="container-page relative z-10 flex flex-col gap-8 py-10 md:gap-10 md:py-12 lg:gap-11 lg:py-14">
        {/* Brand + newsletter */}
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between md:gap-10 lg:gap-16">
          <div className="max-w-xl space-y-3 md:max-w-lg lg:max-w-xl">
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

          <div className="w-full shrink-0 md:w-[min(100%,22rem)] lg:w-[min(100%,26rem)]">
            <h3 className="text-footer-foreground mb-4 text-base font-semibold sm:text-lg">
              <span className="relative inline-block">
                عضویت
                <span
                  aria-hidden
                  className="bg-accent absolute inset-x-0 -bottom-1.5 h-[3px] rounded-full"
                />
              </span>{" "}
              در خبرنامه
            </h3>

            <form className="flex items-stretch gap-2.5" action="#" method="post">
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
                    "border-footer-border bg-footer-input text-footer-foreground",
                    "placeholder:text-footer-muted h-12 rounded-lg border pe-3 ps-11 text-sm",
                    "focus-visible:border-primary focus-visible:ring-primary/25",
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
          className="bg-footer-nav [-ms-overflow-style:none] [scrollbar-width:none] overflow-x-auto rounded-xl px-4 py-3.5 sm:px-6 [&::-webkit-scrollbar]:hidden"
        >
          <ul className="flex min-w-max items-center justify-between gap-5 md:min-w-0 md:gap-3 lg:gap-4">
            {FOOTER_NAV.map((item) => (
              <li key={item.href + item.label} className="shrink-0">
                <Link
                  href={item.href}
                  className={cn(
                    "text-footer-foreground/90 hover:text-footer-foreground inline-flex items-center gap-1",
                    "text-xs whitespace-nowrap transition-colors sm:text-[0.8125rem] lg:text-sm",
                  )}
                >
                  {"isHome" in item && item.isHome ? (
                    <ArrowLeftIcon className="size-3.5 opacity-90" />
                  ) : null}
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Contact + social (sits over watermark) */}
        <div className="relative z-10 flex flex-col gap-6 py-3 md:flex-row md:items-center md:justify-between md:gap-8 md:py-5">
          <ul className="text-footer-foreground flex flex-col gap-3 text-xs sm:flex-row sm:flex-wrap sm:items-center sm:gap-0 md:flex-nowrap md:text-sm">
            {CONTACT.map((item, index) => {
              const content = (
                <>
                  <item.Icon className="text-primary size-5 shrink-0" />
                  <span className="inline-flex flex-wrap items-baseline gap-1">
                    <span className="text-footer-muted">{item.label}</span>
                    <span dir={item.ltr ? "ltr" : undefined}>{item.value}</span>
                  </span>
                </>
              );

              return (
                <li key={item.key} className="inline-flex items-center">
                  {index > 0 ? (
                    <span
                      aria-hidden
                      className="bg-footer-border mx-3 hidden h-4 w-px sm:mx-4 sm:block"
                    />
                  ) : null}
                  {item.href ? (
                    <a
                      href={item.href}
                      className="hover:opacity-90 inline-flex items-center gap-2 transition-opacity"
                    >
                      {content}
                    </a>
                  ) : (
                    <span className="inline-flex items-center gap-2">
                      {content}
                    </span>
                  )}
                </li>
              );
            })}
          </ul>

          <ul
            dir="ltr"
            className="flex items-center gap-2.5 self-start md:self-auto"
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

        {/* Bottom bar */}
        <div className="border-footer-border relative z-10 flex flex-col-reverse gap-3 border-t pt-5 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
          <p className="text-footer-muted text-xs sm:text-sm">
            © {toFaDigits(year)} - تمامی حقوق برای {COMPANY_NAME} محفوظ است.
          </p>
          <p className="text-accent inline-flex items-center gap-2.5 text-xs font-medium sm:text-sm">
            <span
              aria-hidden
              className="bg-accent hidden h-0.5 w-7 rounded-full sm:inline-block"
            />
            <span>{SLOGAN}</span>
          </p>
        </div>
      </div>

      {/* Watermark behind contact / bottom */}
      <span
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-x-0 bottom-14 z-0 md:bottom-16",
          "overflow-hidden text-center font-bold tracking-[0.04em]",
          "text-[clamp(2.25rem,10vw,6.5rem)] leading-none whitespace-nowrap select-none",
          "text-transparent [-webkit-text-stroke:1px_var(--footer-border)]",
        )}
      >
        {WATERMARK}
      </span>
    </footer>
  );
}
