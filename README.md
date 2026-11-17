# آزمون فرانت‌اند — پیاده‌سازی صفحه Home (Pixel Perfect)

پیاده‌سازی لایهٔ **Home** از طرح Figma با **Next.js** برای آزمون شرکت **آذرترخیص ارس** (برند نمایشی: شرکت بازرگانی اصولی شجاعی).

| مورد | جزئیات |
| --- | --- |
| طرح Figma | [Test-Exam — layer Home](https://www.figma.com/design/CeRORMTj0asqhsdQAah6TL/Test-Exam?node-id=0-1) |
| فریم‌ورک | Next.js 16 (App Router) + React 19 + TypeScript |
| استایل | Tailwind CSS v4 + توکن‌های طراحی در `src/styles/tokens.css` |
| فونت UI | **Peyda** (لوکال، بدون Google Fonts) |
| جهت / زبان | پیش‌فرض `fa` / `rtl` |
| پکیج‌منیجر | **Yarn** |

---

## ۱) متن آماده‌شدهٔ دعوت‌نامه / شرح آزمون

> سلام، وقت بخیر
>
> من اقبال هستم، کارشناس فنی شرکت **آذرترخیص ارس**.
> شما رزومه‌تان را برای موقعیت **برنامه‌نویس فرانت‌اند** ارسال کرده‌اید و از میان رزومه‌های دریافت‌شده، برای شرکت در **آزمون اولیه** انتخاب شده‌اید.
>
> ### شرح آزمون
> یکی از صفحات پروژه را بر اساس طرح آماده‌شده در Figma (**طراحی layer Home**) و با استفاده از **Next.js** پیاده‌سازی کنید. خروجی باید تا حد ممکن **Pixel Perfect** و شامل تمام بخش‌ها و جزئیات طرح باشد.
>
> ### موارد مورد انتظار
> - تطابق دقیق چیدمان، فاصله‌ها، اندازه‌ها، رنگ‌ها و تایپوگرافی با Figma
> - استفاده از **توکن‌های طراحی** پروژه برای رنگ‌بندی و سایر مقادیر طراحی
> - **کامپوننت‌سازی** متناسب با نیاز صفحه و پرهیز از تکرار غیرضروری کد
> - نمایش صحیح صفحه در اندازه‌های مختلف، مطابق طرح
> - پیاده‌سازی تعاملاتی که در طراحی مشخص شده‌اند
>
> پس از پایان کار، لطفاً فایل کامل پروژه را به‌صورت **ZIP** ارسال کنید.
>
> همچنین یک **ویدیوی کوتاه حدوداً یک‌دقیقه‌ای** ضبط کنید که در آن صفحهٔ پیاده‌سازی‌شده را نمایش دهید و جزئیات کارتان، از جمله نحوهٔ استفاده از **توکن‌ها** و **کامپوننت‌ها** را به‌اختصار توضیح دهید.
>
> استفاده از AI بلامانع است؛ ولی خروجی باید دقیقاً مطابق طراحی و استانداردهای مشخص‌شده باشد.
>
> اگر بخشی از طرح ابهام داشت یا امکان پیاده‌سازی دقیق آن وجود نداشت، آن مورد و دلیلش را در توضیحات ذکر کنید.
>
> **مهلت:** تا ۴۸ ساعت پس از دریافت دسترسی به Figma.

---

## ۲) آنچه در این پروژه پیاده شده است

ترتیب صفحه (از بالا به پایین):

| بخش | کامپوننت | فایل |
| --- | --- | --- |
| هدر | `SiteHeader` | `src/components/layout/site-header.tsx` |
| هیرو (دسته‌ها + اسلایدر) | `HomeHero` (+ `HomeHeaders`) | `src/features/home/components/home-hero.tsx` |
| خدمات | `HomeServices` | `…/home-services.tsx` |
| قیمت روز | `HomePrices` | `…/home-prices.tsx` |
| نرخ ارز (مارکی) | `HomeExchange` | `…/home-exchange.tsx` |
| وبلاگ | `HomeWeblog` | `…/home-weblog.tsx` |
| مشاوره | `HomeConsultation` | `…/home-consultation.tsx` |
| فوتر | `SiteFooter` | `src/components/layout/site-footer.tsx` |

ترکیب صفحه در `src/screens/home/home-screen.tsx` و روت در `src/app/page.tsx`.

محتوای استاتیک (متن‌ها، لینک‌ها، تصاویر) در:

`src/features/home/data/home-content.ts`

---

## ۳) معماری و استانداردها

```
src/
  app/                    # App Router (layout, page, globals)
  components/
    ui/                   # Button, Input, Shape, EmbossedText, …
    layout/               # Header, Footer, Providers, Logo
    shared/               # Container و UI مشترک
    icons/                # آیکون‌های سفارشی از طرح
  features/home/          # ماژول صفحه Home
    components/
    data/
    types/
  screens/home/           # ترکیب بخش‌ها در یک اسکرین
  styles/tokens.css       # تنها منبع رنگ و توکن‌های معنایی
  lib/                    # constants, fonts (Peyda), cn
```

قراردادهای پروژه:

1. ایمپورت با alias `~/` (نه `../../…`)
2. هر پوشه با `index.ts` / `index.tsx` (barrel)
3. رنگ‌ها فقط از توکن‌های معنایی (`bg-primary`, `text-foreground`, …) — بدون hex خام در JSX
4. چیدمان با خاصیت‌های منطقی (`ps`/`pe`/`ms`/`me`/`start`/`end`) برای RTL/LTR
5. موبایل‌اول؛ بدون overflow افقی صفحه

---

## ۴) `tokens.css` چطور کار می‌کند؟ (خلاصه)

جریان سه مرحله‌ای:

```
Figma color  →  tokens.css (CSS variable)  →  @theme در globals.css  →  کلاس Tailwind در JSX
```

1. **تعریف** در `src/styles/tokens.css`
   - Primitive: مقدار خام برند (`--color-brand-600`, `--color-brand-gold`, …)
   - Semantic: نقش در UI (`--primary` ← brand، `--accent` ← gold، `--background`, …)
   - بخش‌محور Home: فقط همان صفحه (`--home-hero-from/to`, `--home-prices-bg`, `--footer`, …)
   - لایت روی `:root`؛ دارک زیر `.dark` (آماده، بدون سوئیچر در طرح)
2. **اتصال** در `src/app/globals.css` با `@import "../styles/tokens.css"` و بلوک `@theme inline` — مثلاً `--color-primary: var(--primary)` تا Tailwind کلاس `bg-primary` / `text-primary` بسازد.
3. **مصرف در کامپوننت** — بدون hex در JSX:

```tsx
className="bg-background text-foreground text-primary"
className="bg-[linear-gradient(to_bottom,var(--home-hero-from),var(--home-hero-to))]"
```

**چرا این کار؟** یک‌بار رنگ را عوض می‌کنید (مثلاً `--primary`)، کل صفحه هم‌زمان به‌روز می‌شود؛ و Pixel Perfect با مقادیر Figma در یک فایل متمرکز می‌ماند.

فونت هم توکن است: Peyda در `src/lib/fonts.ts` → `--font-peyda` روی `<html>` → `--font-sans` در tokens → کلاس `font-sans`.

---

## ۵) RTL کجا و چطور اعمال شده؟ (خلاصه)

| لایه | کجا | چه کار می‌کند |
| --- | --- | --- |
| ثابت‌ها | `src/lib/constants.ts` | `DEFAULT_LOCALE = "fa"` → `LOCALE_DIR.fa = "rtl"` → `DEFAULT_DIR` |
| ریشهٔ سند | `src/app/layout.tsx` | `<html lang={…} dir={DEFAULT_DIR}>` + `AppProviders direction={DEFAULT_DIR}` |
| کلاس‌های UI | تقریباً همهٔ کامپوننت‌های Home/Layout | به‌جای `ml`/`mr`/`pl`/`pr`/`left`/`right` از **logical** استفاده شده: `ms`/`me`, `ps`/`pe`, `start`/`end`, `text-start`, `border-s` |
| استثناهای آگاهانه | مثلاً مارکی ارز در `HomeExchange` | گاهی `dir="rtl"` روی قطعهٔ محتوا یا track مارکی با جهت کنترل‌شده تا انیمیشن شکسته نشود |

یعنی RTL سراسری از `<html dir="rtl">` می‌آید؛ چیدمان‌ها با logical property طوری نوشته شده‌اند که اگر بعداً `en`/`ltr` فعال شود، فاصله‌ها و تراز برعکس نشکنند.

در ویدیو کافی است بگویید: «جهت از constants و layout ست می‌شود؛ در کامپوننت‌ها به‌جای left/right از start/end و ms/me استفاده کردم.»

---

## ۶) کامپوننت‌سازی (خلاصه)

| لایه | نقش | مثال |
| --- | --- | --- |
| UI پایه | مشترک کل اپ | `Button`, `Shape`, `EmbossedText` |
| Layout | پوسته | `SiteHeader`, `SiteFooter`, `Container` |
| Feature | بخش‌های Home | `HomeHero`, `HomePrices`, `HomeExchange`, … |
| Shared feature | جلوگیری از تکرار | `SectionHeading`, `HorizontalScroller` |
| Screen | فقط ترکیب | `HomeScreen` |

`Shape` فرم‌های خاص Figma (اسکِو هدر، پنل قیمت، نوار ارز ذوزنقه‌ای) را با path یک‌بار تعریف می‌کند.

---

## ۷) در ویدیو کدام کامپوننت‌ها را نشان بدهید؟

اولویت نمایش (همان ترتیب پیشنهاد می‌شود):

| # | چه نشان دهید | فایل / کامپوننت | چه بگویید (یک خط) |
| --- | --- | --- | --- |
| ۱ | صفحه در مرورگر | کل Home | «از هدر تا فوتر مطابق لایهٔ Home» |
| ۲ | تعامل اسلایدر | `HomeHero` | «autoplay، pause روی hover، تعویض اسلاید» |
| ۳ | اسکرول افقی | `HomeHeaders` یا ردیف کارت در `HomePrices` | «اسکرولر افقی بدون overflow صفحه» |
| ۴ | مارکی ارز | `HomeExchange` | «نوار نرخ با Shape ذوزنقه‌ای + مارکی» |
| ۵ | کد توکن | `src/styles/tokens.css` (چند خط `--primary` و `--home-*`) | «رنگ‌ها فقط از اینجا» |
| ۶ | کد مصرف توکن | مثلاً گرادیان در `home-hero.tsx` یا `bg-primary` در هدر/CTA | «در UI با کلاس معنایی / var(--…)» |
| ۷ | ترکیب صفحه | `home-screen.tsx` | «هر بخش یک کامپوننت feature» |
| ۸ | UI مشترک | `Shape` (مصرف در header یا prices) + `SectionHeading` | «تکرار کم؛ path و عنوان بخش reuse» |
| ۹ | RTL | `layout.tsx` (`dir=`) + یک کلاس `ms-`/`ps-` در همان فایل باز | «RTL از ریشه + logical props» |

اختیاری اگر وقت ماند: `HomeServices` / `HomeWeblog` / `SiteFooter` فقط اسکرول بصری — لازم نیست کدشان را باز کنید.

**لازم نیست نشان دهید:** صفحهٔ `/components/shape`، تست‌ها، کل `home-content.ts`.

---

## ۸) اسکریپت پیشنهادی ویدیو (~۹۰–۱۲۰ ثانیه)

هم‌زمان مرورگر + ادیتور را نشان دهید (split یا جابه‌جایی سریع):

1. **۰–۲۰ث — مرورگر:** اسکرول هدر → هیرو؛ یک‌بار اسلاید عوض کنید؛ بگویید Next.js + Pixel Perfect لایهٔ Home.
2. **۲۰–۴۰ث — مرورگر:** خدمات → قیمت (اسکرول کارت) → ارز (مارکی) → وبلاگ/مشاوره/فوتر — خیلی کوتاه.
3. **۴۰–۶۵ث — کد توکن:** باز کردن `tokens.css` → اشاره به `--primary` و یک `--home-*` → بعد یک مصرف در `HomeHero` یا کلاس `text-primary`. جمله: «مقدار در tokens، کلاس در Tailwind، بدون hex پراکنده.»
4. **۶۵–۹۰ث — کامپوننت:** باز کردن `home-screen.tsx` (ترکیب) → پرش به `HomePrices` یا `HomeExchange` (feature) → اشاره به `Shape` / `SectionHeading`. جمله: «صفحه شکسته شده به featureها؛ UI مشترک reuse می‌شود.»
5. **۹۰–۱۱۰ث — RTL:** `layout.tsx` با `dir={DEFAULT_DIR}` و یک نمونه `ms`/`ps` در کامپوننت. جمله کوتاه بالا.
6. **۱۱۰–۱۲۰ث — جمع‌بندی:** داده mock است؛ ابهامات در README؛ ممنون.

اگر کوتاه‌تر خواستید، بخش ۵ را حذف و بخش ۳–۴ را فشرده کنید.

---

## ۹) تعاملات پیاده‌شده

- **اسلایدر هیرو (`HomeHero`):** تعویض اسلاید، autoplay با pause روی hover/focus، Motion، احترام به `prefers-reduced-motion`
- **Story headers (`HomeHeaders`):** اسکرول افقی + hover
- **قیمت روز (`HomePrices`):** اسکرول افقی کارت‌ها
- **نرخ ارز (`HomeExchange`):** مارکی seamless
- **وبلاگ / خدمات / مشاوره:** CTA مطابق طرح (`href="#"` به‌عنوان placeholder)

---

## ۱۰) ریسپانسیو

ماتریس در `~/lib/constants` (`VIEWPORTS` / `BREAKPOINTS`):

`320 · 375 · 430 · 768 · 1024 · 1280 · 1440 · 1920`

بدون اسکرول افقی صفحه؛ اسکرولرهای داخلی داخل `overflow-x-auto` / `overflow-x-clip`.

---

## ۱۱) اجرا و کیفیت

نیازمندی: **Node.js 20.9+** و **Yarn**.

```bash
yarn install
yarn playwright install chromium   # فقط اگر e2e لازم است

yarn dev          # توسعه — http://localhost:3000
yarn build
yarn start
yarn lint
yarn typecheck
yarn test
yarn test:e2e
yarn check        # typecheck + lint + format + unit
yarn verify       # check + build + e2e
```

---

## ۱۲) آماده‌سازی ZIP برای ارسال

از ریشهٔ پروژه (پوشهٔ والد پروژه را zip نکنید؛ خود پروژه را):

**شامل شود:** سورس (`src/`)، `public/` در صورت وجود، `package.json`, `yarn.lock`, کانفیگ‌ها، `README.md`

**حذف / کنار گذاشتن:**

- `node_modules/`
- `.next/`
- `coverage/`, `playwright-report/`, `test-results/`
- `.git/` (اختیاری ولی توصیه‌شده برای حجم)
- فایل‌های env خصوصی (`.env*`)

ساده‌ترین راه از ریشهٔ پروژه:

```bash
yarn clean
yarn pack:submission
```

خروجی در `dist-submission/frontend-home-exam-YYYY-MM-DD.zip` ساخته می‌شود (`node_modules` و `.next` کنار گذاشته می‌شوند؛ `src/assets` می‌ماند).

اگر اسکریپت روی سیستم‌تان کار نکرد، از پوشهٔ والد:

```powershell
Compress-Archive -Path examTest -DestinationPath examTest-frontend-submission.zip -Force
```

سپس داخل ZIP، `node_modules` و `.next` را حذف کنید.

> **مهم:** پوشه‌های تصویر در `src/assets/` (مثل `sliders/`, `carsPrice/`, …) باید داخل ZIP باشند؛ بدون آن‌ها صفحه ناقص رندر می‌شود. این پوشه‌ها ممکن است در `.gitignore` باشند ولی برای ارسال آزمون باید همراه پروژه بروند.

پس از دریافت ZIP توسط ارزیاب:

```bash
yarn install
yarn dev
```

---

## ۱۳) ابهامات / محدودیت‌ها (برای ارزیاب)

| مورد | توضیح |
| --- | --- |
| لینک‌ها و ناوبری | مسیرهای واقعی صفحات داخلی در طرح مشخص نبود؛ CTAها و آیتم‌های منو با `href="#"` هستند. |
| دادهٔ زنده | قیمت‌ها، نرخ ارز و پست‌های وبلاگ mock استاتیک‌اند (بدون API) — مطابق ماهیت آزمون UI-only. |
| حالت دارک | توکن‌های `.dark` در معماری آماده‌اند؛ سوئیچر تم در طرح Home نبود و اضافه نشده. |
| locale انگلیسی | ساختار چندزبانه (`fa`/`en`) آماده است؛ محتوای `en` فعلاً خالی است (طبق قرارداد پروژه). |
| صفحهٔ دمو Shape | مسیر `/components/shape` فقط برای نمایش سیستم `Shape` است و جزء لایهٔ Home نیست. |
| دارایی‌های رسانه‌ای | تصاویر از export طرح / دارایی‌های محلی هستند؛ کیفیت و crop تا حد ممکن با Figma هم‌تراز شده‌اند. |

اگر مورد دیگری هنگام بازبینی Figma مبهم بود، همان‌جا در توضیحات ارسالی ذکر شود.

---

## ۱۴) چک‌لیست قبل از ارسال

- [ ] `yarn build` بدون خطا
- [ ] مرور صفحه در دسکتاپ و موبایل (حداقل 375 و 1440)
- [ ] تطبیق بصری با Figma (Home)
- [ ] ZIP شامل `src/assets` و بدون `node_modules` / `.next`
- [ ] ویدیو (~۹۰–۱۲۰ث): صفحه + توکن + چند کامپوننت کلیدی + RTL
- [ ] ذکر ابهامات (بخش ۱۳ یا متن ایمیل)
