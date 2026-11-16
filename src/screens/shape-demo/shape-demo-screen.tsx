import type { ReactNode } from "react";

import { Container } from "~/components/shared";
import { Button, Shape, SHAPE_GROUPS, type ShapeType } from "~/components/ui";

import { CodeBlock } from "./code-block";

const GROUP_LABELS: Record<keyof typeof SHAPE_GROUPS, string> = {
  basic: "اشکال پایه",
  geometric: "اشکال هندسی",
  organic: "اشکال ارگانیک",
  creative: "اشکال خلاقانه",
};

const GALLERY_COLORS = [
  "var(--primary)",
  "var(--accent)",
  "oklch(0.62 0.14 250)",
  "oklch(0.68 0.12 160)",
  "oklch(0.72 0.14 40)",
  "oklch(0.58 0.16 320)",
] as const;

const CUSTOM_PATH =
  "M20 50 C20 20 50 10 70 25 C90 40 90 70 65 85 C45 95 20 80 20 50 Z";

const EXAMPLE_CONTAINER = `<Shape
  shape="hexagon"
  width={220}
  aspectRatio={1}
  background="linear-gradient(135deg, #0ea5e9, #2563eb)"
>
  <span>محتوای کلیپ‌شده</span>
</Shape>`;

const EXAMPLE_DECORATION = `<Shape
  shape="blob-1"
  mode="decoration"
  width="100%"
  aspectRatio={1.4}
  background="oklch(0.7 0.12 280 / 0.35)"
  className="p-8"
>
  <div className="relative z-10">
    <h2>داشبورد</h2>
    <button>شروع</button>
  </div>
</Shape>`;

const EXAMPLE_CUSTOM = `<Shape
  shape="custom"
  customPath="M20 50 C20 20 50 10 70 25 C90 40 90 70 65 85 C45 95 20 80 20 50 Z"
  customViewBox="0 0 100 100"
  width={240}
  aspectRatio={1}
  background="#0f766e"
  border="3px solid #99f6e4"
>
  <strong>سفارشی</strong>
</Shape>`;

function Section({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <section className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <h2 className="font-heading text-xl font-semibold text-foreground md:text-2xl">
          {title}
        </h2>
        {description ? (
          <p className="max-w-3xl text-sm text-muted-foreground md:text-base">
            {description}
          </p>
        ) : null}
      </div>
      {children}
    </section>
  );
}

function ShapeLabel({ name }: { name: string }) {
  return (
    <figcaption
      className="mt-2 text-center text-xs font-medium text-muted-foreground"
      dir="ltr"
    >
      {name}
    </figcaption>
  );
}

export function ShapeDemoScreen() {
  return (
    <div className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[28rem] bg-[radial-gradient(ellipse_at_top,oklch(0.75_0.08_230_/_0.35),transparent_60%)]"
      />

      <Container className="relative flex flex-col gap-14 py-10 md:gap-16 md:py-14">
        <header className="flex max-w-3xl flex-col gap-3">
          <p className="text-sm font-medium text-primary">کامپوننت UI</p>
          <h1 className="font-heading text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            سیستم Shape
          </h1>
          <p className="text-sm leading-7 text-muted-foreground md:text-base">
            مجموعهٔ قابل‌استفاده مجدد برای برش، پس‌زمینه و تزئین محتوا با CSS و
            SVG — بدون وابستگی خارجی. از حالت{" "}
            <span dir="ltr">container</span> برای کلیپ محتوا و از{" "}
            <span dir="ltr">decoration</span> برای لایهٔ بصری بدون محدود کردن
            فرزندان استفاده کنید.
          </p>
        </header>

        {(Object.keys(SHAPE_GROUPS) as Array<keyof typeof SHAPE_GROUPS>).map(
          (group) => (
            <Section
              key={group}
              title={GROUP_LABELS[group]}
              description="گالری شکل‌های داخلی با اندازه‌ها و رنگ‌های متفاوت."
            >
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                {SHAPE_GROUPS[group].map((name, index) => {
                  const shapeName = name as ShapeType;
                  return (
                    <figure
                      key={name}
                      className="flex flex-col items-center rounded-xl border border-border/70 bg-background/70 p-3"
                    >
                      <Shape
                        shape={shapeName}
                        width="100%"
                        aspectRatio={1}
                        background={
                          GALLERY_COLORS[index % GALLERY_COLORS.length]
                        }
                        animated={name === "blob-1" || name === "star"}
                        className="max-w-36"
                        customPath={
                          shapeName === "custom" ? CUSTOM_PATH : undefined
                        }
                      >
                        <span className="px-2 text-[0.65rem] font-semibold text-primary-foreground/95">
                          {shapeName === "custom" ? "path" : ""}
                        </span>
                      </Shape>
                      <ShapeLabel name={name} />
                    </figure>
                  );
                })}
              </div>
            </Section>
          ),
        )}

        <Section
          title="حالت Container در برابر Decoration"
          description="در حالت container محتوا داخل هندسه کلیپ می‌شود. در decoration شکل فقط لایهٔ پس‌زمینه است و فوکوس، سایه و منوها آزاد می‌مانند."
        >
          <div className="grid gap-6 md:grid-cols-2">
            <div className="flex flex-col gap-3 rounded-xl border border-border p-4">
              <h3 className="text-sm font-semibold">Container</h3>
              <Shape
                shape="circle"
                width={200}
                aspectRatio={1}
                background="linear-gradient(145deg, oklch(0.65 0.14 230), oklch(0.45 0.12 280))"
                className="mx-auto"
              >
                {/* External demo asset; next/image not required for this playground sample. */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=400&q=80"
                  alt="نمونه تصویر داخل دایره"
                  width={200}
                  height={200}
                />
              </Shape>
              <CodeBlock code={EXAMPLE_CONTAINER} title="container" />
            </div>

            <div className="flex flex-col gap-3 rounded-xl border border-border p-4">
              <h3 className="text-sm font-semibold">Decoration</h3>
              <Shape
                shape="blob-2"
                mode="decoration"
                width="100%"
                aspectRatio={1.25}
                background="oklch(0.78 0.1 280 / 0.45)"
                className="mx-auto max-w-sm p-6"
              >
                <div className="relative z-10 flex flex-col items-start gap-3 text-start">
                  <h3 className="font-heading text-lg font-semibold">داشبورد</h3>
                  <p className="text-sm text-muted-foreground">
                    دکمه‌ها و فوکوس خارج از کلیپ شکل باقی می‌مانند.
                  </p>
                  <Button type="button">کاوش</Button>
                </div>
              </Shape>
              <CodeBlock code={EXAMPLE_DECORATION} title="decoration" />
            </div>
          </div>
        </Section>

        <Section
          title="گرادیان، حاشیه و اندازهٔ واکنش‌گرا"
          description="پشتیبانی از گرادیان، حاشیهٔ هم‌شکل هندسه، واحدهای CSS و کلاس‌های Tailwind."
        >
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Shape
              shape="hexagon"
              width="100%"
              aspectRatio={1}
              background="linear-gradient(135deg, #06b6d4, #2563eb 55%, #7c3aed)"
              border="3px solid #a5f3fc"
              animated
            >
              <span className="text-sm font-semibold text-white">Gradient</span>
            </Shape>
            <Shape
              shape="ticket"
              width="100%"
              aspectRatio={1.4}
              background="radial-gradient(circle at 30% 30%, #fde68a, #f59e0b 60%, #b45309)"
              className="min-h-28"
            >
              <span className="text-sm font-semibold text-white">Ticket</span>
            </Shape>
            <Shape
              shape="wave"
              width="100%"
              aspectRatio={1.8}
              background="linear-gradient(180deg, #67e8f9, #0284c7)"
              className="w-full"
            >
              <span className="text-sm font-semibold text-white">Wave</span>
            </Shape>
            <Shape
              shape="arch"
              className="w-full max-w-none"
              width="100%"
              aspectRatio={0.95}
              background="var(--accent)"
              color="var(--accent-foreground)"
            >
              <span className="text-sm font-semibold">٪ / rem / vw</span>
            </Shape>
          </div>
        </Section>

        <Section
          title="متن، دکمه و تودرتو"
          description="هر React node به‌عنوان فرزند پشتیبانی می‌شود؛ حتی Shape تو در تو."
        >
          <div className="grid gap-6 md:grid-cols-2">
            <Shape
              shape="rounded-rectangle"
              width="100%"
              aspectRatio={1.5}
              background="var(--card)"
              border="1px solid var(--border)"
              color="var(--foreground)"
              className="p-4 shadow-sm"
              mode="decoration"
            >
              <div className="relative z-10 flex flex-col items-start gap-3 text-start">
                <h3 className="font-heading text-lg font-semibold">کارت محتوا</h3>
                <p className="text-sm text-muted-foreground">
                  فرم‌ها، لینک‌ها و دکمه‌ها داخل Shape کار می‌کنند.
                </p>
                <Button type="button" variant="secondary">
                  اقدام
                </Button>
              </div>
            </Shape>

            <div className="flex items-center justify-center rounded-xl border border-border p-6">
              <Shape
                shape="octagon"
                width={220}
                aspectRatio={1}
                background="oklch(0.55 0.12 250)"
                className="items-center justify-center"
              >
                <Shape
                  shape="circle"
                  width={120}
                  aspectRatio={1}
                  background="oklch(0.85 0.08 95)"
                  color="oklch(0.3 0.05 250)"
                >
                  <span className="text-xs font-bold">Nested</span>
                </Shape>
              </Shape>
            </div>
          </div>
        </Section>

        <Section
          title="مسیر SVG سفارشی"
          description="مختصات نرمال‌شده در viewBox ثابت می‌مانند و با ظرف مقیاس می‌شوند. از shape=&quot;custom&quot; با customPath و customViewBox استفاده کنید."
        >
          <div className="grid gap-4 md:grid-cols-[minmax(0,240px)_1fr] md:items-start">
            <Shape
              shape="custom"
              customPath={CUSTOM_PATH}
              customViewBox="0 0 100 100"
              width={240}
              aspectRatio={1}
              background="#0f766e"
              border="3px solid #99f6e4"
              color="#ecfdf5"
              className="mx-auto"
            >
              <strong className="text-sm">Custom</strong>
            </Shape>
            <CodeBlock code={EXAMPLE_CUSTOM} title="custom SVG path" />
          </div>

          <div className="rounded-xl border border-border bg-muted/30 p-4 text-sm leading-7 text-muted-foreground">
            <p className="font-medium text-foreground">ساخت شکل سفارشی</p>
            <ol className="mt-2 list-decimal space-y-1 ps-5">
              <li>
                یک <span dir="ltr">viewBox</span> نرمال مثل{" "}
                <span dir="ltr">0 0 100 100</span> انتخاب کنید.
              </li>
              <li>
                مسیر را در همان دستگاه مختصات بکشید (مثلاً در Figma/SVG editor).
              </li>
              <li>
                فقط مقدار <span dir="ltr">d</span> را به{" "}
                <span dir="ltr">customPath</span> بدهید — بدون واحد پیکسل ثابت.
              </li>
              <li>
                برای حفره یا شفافیت پیچیده، از تکنیک mask در تعریف شکل استفاده
                کنید یا مسیر را طوری بکشید که ناحیهٔ پر پر شود.
              </li>
            </ol>
          </div>
        </Section>

        <Section
          title="انیمیشن سبک"
          description="با animated انیمیشن hover فعال می‌شود و با prefers-reduced-motion کاهش می‌یابد."
        >
          <div className="flex flex-wrap items-center justify-center gap-6">
            <Shape
              shape="star"
              width={140}
              aspectRatio={1}
              background="oklch(0.75 0.14 85)"
              animated
            >
              <span className="text-xs font-bold text-foreground">Hover</span>
            </Shape>
            <Shape
              shape="blob-3"
              width={160}
              aspectRatio={1}
              background="oklch(0.7 0.12 200)"
              animated
            />
            <Shape
              shape="heart"
              width={140}
              aspectRatio={1}
              background="oklch(0.65 0.18 25)"
              animated
            />
          </div>
        </Section>

        <Section title="API خلاصه">
          <CodeBlock
            title="import"
            code={`import { Shape } from "~/components/ui";

<Shape
  shape="hexagon"
  mode="container" // یا decoration
  width={240}
  height="auto"
  aspectRatio={1}
  background="var(--primary)"
  color="var(--primary-foreground)"
  border="2px solid #fff"
  fit="cover"
  clipContent
  animated
  customPath="M..."
  customViewBox="0 0 100 100"
  as="section"
>
  {children}
</Shape>`}
          />
        </Section>
      </Container>
    </div>
  );
}
