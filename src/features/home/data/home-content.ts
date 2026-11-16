import type {
  ConsultationCta,
  ExchangeRate,
  HomeHeaderCategory,
  HomeService,
  HomeSlide,
  PriceCategory,
  WeblogPost,
} from "~/features/home/types";

import header1 from "~/assets/headers/1.png";
import header2 from "~/assets/headers/2.jpg";
import header3 from "~/assets/headers/3.jpg";
import header4 from "~/assets/headers/4.jpg";
import header5 from "~/assets/headers/5.jpg";
import header6 from "~/assets/headers/6.jpg";
import header7 from "~/assets/headers/7.jpg";
import header8 from "~/assets/headers/8.jpg";
import header9 from "~/assets/headers/9.jpg";
import carPrice1 from "~/assets/carsPrice/cars1.png";
import carPrice2 from "~/assets/carsPrice/cars2.png";
import carPrice3 from "~/assets/carsPrice/cars3.png";
import carPrice4 from "~/assets/carsPrice/cars4.png";
import carPrice5 from "~/assets/carsPrice/cars5.png";
import carPriceTitle from "~/assets/carsPrice/title.png";
import consultationImg from "~/assets/images/consultation.jpg";
import carsImg from "~/assets/services/cars.png";
import importExportImg from "~/assets/services/import-export.png";
import ordersImg from "~/assets/services/orders.png";
import shippingImg from "~/assets/services/shipping.png";
import storageImg from "~/assets/services/storage.png";
import truckImg from "~/assets/services/truck.png";
import slider1 from "~/assets/sliders/slider1.jpg";
import slider2 from "~/assets/sliders/slider2.jpg";
import slider3 from "~/assets/sliders/slider3.png";
import slider4 from "~/assets/sliders/slider4.jpg";
import tractorPrice1 from "~/assets/tractorPrice/cars1.png";
import tractorPrice2 from "~/assets/tractorPrice/cars2.png";
import tractorPrice3 from "~/assets/tractorPrice/cars3.png";
import tractorPrice4 from "~/assets/tractorPrice/cars4.png";
import tractorPrice5 from "~/assets/tractorPrice/cars5.png";
import tractorPriceTitle from "~/assets/tractorPrice/title.png";
import weblogCar from "~/assets/weblog/car.png";
import weblogShip from "~/assets/weblog/ship.jpg";
import weblogTruck from "~/assets/weblog/truck.png";

const SERVICE_CTA = "بررسی و ادامه روند درخواست";

/** Placeholder content — replace with API / CMS data later. */

/**
 * Category strip above the slider.
 * Order = RTL start → end (right → left), matching numbered files in `headers/`.
 */
export const HOME_HEADER_CATEGORIES: HomeHeaderCategory[] = [
  {
    id: "header-cars",
    title: "خودروهای سواری",
    href: "#cars",
    imageSrc: header1,
    imageAlt: "خودروهای سواری",
  },
  {
    id: "header-truck",
    title: "کشنده",
    href: "#truck",
    imageSrc: header2,
    imageAlt: "کشنده",
  },
  {
    id: "header-inspection",
    title: "بازرسی مبدا",
    href: "#services",
    imageSrc: header3,
    imageAlt: "بازرسی مبدا",
  },
  {
    id: "header-loading",
    title: "بارگیری",
    href: "#shipping",
    imageSrc: header4,
    imageAlt: "بارگیری",
  },
  {
    id: "header-china",
    title: "حمل از چین",
    href: "#shipping",
    imageSrc: header5,
    imageAlt: "حمل از چین",
  },
  {
    id: "header-transit",
    title: "ترانزیت",
    href: "#shipping",
    imageSrc: header6,
    imageAlt: "ترانزیت",
  },
  {
    id: "header-warehouse",
    title: "انبار",
    href: "#storage",
    imageSrc: header7,
    imageAlt: "انبار",
  },
  {
    id: "header-forex",
    title: "تامین ارز",
    href: "#orders",
    imageSrc: header8,
    imageAlt: "تامین ارز",
  },
  {
    id: "header-customs",
    title: "ترخیص کالا",
    href: "#import-export",
    imageSrc: header9,
    imageAlt: "ترخیص کالا",
  },
];

/**
 * Tab order (RTL start → end): امور گمرکی → خودرو → کشنده → حمل بین‌الملل
 * Matches Figma Main Slider default (customs active on the right).
 */
export const HOME_SLIDES: HomeSlide[] = [
  {
    id: "slide-customs",
    category: "امور گمرکی",
    brand: "بازرگانی اصولی شجاعی",
    title: "انجام کلیه امور گمرکی",
    /** RTL start → end */
    tags: ["حمل", "ترخیص", "انبارداری", "ثبت سفارش"],
    description:
      "هر قدم با یک کارشناس هماهنگ‌کننده و برآورد آنلاین همان لحظه",
    ctaLabel: "مشاهده خدمات",
    ctaHref: "#services",
    imageSrc: slider1,
    imageAlt: "انجام کلیه امور گمرکی — بازرگانی اصولی شجاعی",
  },
  {
    id: "slide-vehicles",
    category: "خودرو",
    title: "خودروهای صفر و کارکرده موجود",
    subtitle: "قیمت روز به دلار، پلاک ارس و ماکو",
    tags: ["خرید", "سفارش خاص", "حمل و نقل", "ترانزیت"],
    description:
      "خرید از موجودی یا سفارش خودروی خاص از دبی؛ پیش‌فاکتور، قرارداد، ترخیص و تحویل",
    ctaLabel: "مشاهده خدمات",
    ctaHref: "#services",
    imageSrc: slider2,
    imageAlt: "خودروهای صفر و کارکرده موجود",
  },
  {
    id: "slide-trucks",
    category: "کشنده",
    title: "کشنده‌های وارداتی از اروپا و ترکیه",
    subtitle: "ثبت سفارش یا اسقاط، ترخیص و پلاک",
    tags: ["خرید", "سفارش خاص", "حمل و نقل", "ترانزیت"],
    description:
      "کشنده‌های موجود با وضعیت گمرکی و قیمت یورو، یا سفارش کشنده خاص با مشخصات دلخواه",
    ctaLabel: "مشاهده خدمات",
    ctaHref: "#services",
    imageSrc: slider3,
    imageAlt: "کشنده‌های وارداتی از اروپا و ترکیه",
  },
  {
    id: "slide-shipping",
    category: "حمل بین‌الملل",
    title: "حمل دریایی، زمینی و ریلی بار کامل",
    subtitle: "از چین، ترکیه و اروپا تا گمرک مقصد",
    tags: ["بین‌المللی", "داخلی", "دریایی", "ریلی"],
    description:
      "محاسبه خودکار تعداد کانتینر یا تریلی بر اساس وزن و حجم، همراه بیمه و اسناد حمل",
    ctaLabel: "مشاهده خدمات",
    ctaHref: "#services",
    imageSrc: slider4,
    imageAlt: "حمل دریایی، زمینی و ریلی بار کامل",
  },
];

export const HOME_SERVICES: HomeService[] = [
  {
    id: "svc-cars",
    watermark: "Cars",
    title: "خودروهای سواری",
    description:
      "خودروهای موجود و سفارش اختصاصی • گالری و فیلتر • مشخصات کامل • قیمت نهایی • رزرو و پیش‌پرداخت",
    ctaLabel: SERVICE_CTA,
    ctaHref: "#cars",
    imageSrc: carsImg,
    imageAlt: "خودروهای سواری",
  },
 
  {
    id: "svc-truck",
    watermark: "Truck",
    title: "کشنده و کامیون",
    description:
      "کشنده‌های موجود و سفارشی • گالری و فیلتر • مشخصات فنی • ترخیص • ثبت سفارش • اسقاط",
    ctaLabel: SERVICE_CTA,
    ctaHref: "#truck",
    imageSrc: truckImg,
    imageAlt: "کشنده و کامیون",
  },
 
  {
    id: "svc-shipping",
    watermark: "Shipping",
    title: "حمل و نقل",
    description:
      "شیپینگ کانتینری • ترانزیت زمینی • حمل ریلی • حمل داخلی ایران • درخواست چند قلم کالا",
    ctaLabel: SERVICE_CTA,
    ctaHref: "#shipping",
    imageSrc: shippingImg,
    imageAlt: "حمل و نقل کانتینری و بین‌المللی",
  },
  {
    id: "svc-import-export",
    watermark: "Import / Export",
    title: "واردات، صادرات و ترخیص",
    description:
      "واردات و صادرات کالا • ترخیص مستقل • گمرکات سرزمین اصلی و مناطق آزاد • مسیر ترکیبی خدمات",
    ctaLabel: SERVICE_CTA,
    ctaHref: "#import-export",
    imageSrc: importExportImg,
    imageAlt: "واردات، صادرات و ترخیص",
  },

  {
    id: "svc-storage",
    watermark: "Storage",
    title: "انبارداری و سردخانه گمرکی",
    description:
      "ارس • بازرگان • بندرعباس • محاسبه ظرفیت بر مبنای کامیون • برآورد متناسب با نوع کالا",
    ctaLabel: SERVICE_CTA,
    ctaHref: "#storage",
    imageSrc: storageImg,
    imageAlt: "انبارداری و سردخانه گمرکی",
  },
  {
    id: "svc-orders",
    watermark: "Orders",
    title: "ثبت سفارش و امور ارزی",
    description:
      "ثبت سفارش متناسب با کالا • تأمین ارز • حواله • خدمات بانکی و پیگیری فرایند",
    ctaLabel: SERVICE_CTA,
    ctaHref: "#orders",
    imageSrc: ordersImg,
    imageAlt: "ثبت سفارش و امور ارزی",
  },
];

const SAMPLE_TOMAN = "۹,۵۰۰,۰۰۰,۰۰۰";

/** Overlay lines on Mini Card image — same set for every car in the design. */
const CAR_SPECS = ["۲۰۲۶", "برقی", "۲.۰ لیتر توربو", "اتومات"] as const;

/** Overlay lines for imported tractor Mini Cards. */
const TRACTOR_SPECS = ["۲۰۲۶", "فول کالر", "اتومات"] as const;
const TRACTOR_SPECS_FULL = ["۲۰۲۶", "فول آپشن", "فول کالر", "اتومات"] as const;

export     const HOME_PRICE_CATEGORIES: PriceCategory[] = [
  {
    id: "price-cars",
    tone: "cars",
    title: "قیمت روز خودرو",
    subtitle: "موجود، مدل روز",
    watermark: "CARS",
    bannerSrc: carPriceTitle,
    bannerAlt: "خودروهای سواری",
    seeMoreLabel: "خودرو‌ها",
    seeMoreHref: "#cars",
    vehicles: [
      {
        id: "car-1",
        title: "تویوتا کراس",
        price: SAMPLE_TOMAN,
        specs: [...CAR_SPECS],
        imageSrc: carPrice1,
        imageAlt: "تویوتا کراس",
        brand: "Toyota",
      },
      {
        id: "car-2",
        title: "ام جی ۵",
        price: SAMPLE_TOMAN,
        specs: [...CAR_SPECS],
        imageSrc: carPrice2,
        imageAlt: "ام جی ۵",
        brand: "MG",
      },
      {
        id: "car-3",
        title: "تویوتا کمری LE",
        price: SAMPLE_TOMAN,
        specs: [...CAR_SPECS],
        imageSrc: carPrice3,
        imageAlt: "تویوتا کمری LE",
        brand: "Toyota",
      },
      {
        id: "car-4",
        title: "A250",
        price: SAMPLE_TOMAN,
        specs: [...CAR_SPECS],
        imageSrc: carPrice4,
        imageAlt: "مرسدس بنز A250",
        brand: "Mercedes-Benz",
      },
      {
        id: "car-5",
        title: "اوتلندر اچ‌لاین تیپ دو",
        price: SAMPLE_TOMAN,
        specs: [...CAR_SPECS],
        imageSrc: carPrice5,
        imageAlt: "میتسوبیشی اوتلندر اچ‌لاین تیپ دو",
        brand: "Mitsubishi",
      },
    ],
  },
  {
    id: "price-tractors",
    tone: "tractors",
    title: "کشنده‌ها",
    subtitle: "وارداتی، مدل روز",
    watermark: "Tractor",
    bannerSrc: tractorPriceTitle,
    bannerAlt: "کشنده‌های وارداتی",
    seeMoreLabel: "کشنده‌ها",
    seeMoreHref: "#truck",
    vehicles: [
      {
        id: "tractor-1",
        title: "DAF XF 480",
        price: SAMPLE_TOMAN,
        specs: [...TRACTOR_SPECS],
        imageSrc: tractorPrice1,
        imageAlt: "DAF XF 480",
        brand: "DAF",
      },
      {
        id: "tractor-2",
        title: "Volvo FH500",
        price: SAMPLE_TOMAN,
        specs: [...TRACTOR_SPECS_FULL],
        imageSrc: tractorPrice2,
        imageAlt: "Volvo FH500",
        brand: "Volvo",
      },
      {
        id: "tractor-3",
        title: "Renault T520",
        price: SAMPLE_TOMAN,
        specs: [...TRACTOR_SPECS],
        imageSrc: tractorPrice3,
        imageAlt: "Renault T520",
        brand: "Renault",
      },
      {
        id: "tractor-4",
        title: "Scania R450",
        price: SAMPLE_TOMAN,
        specs: [...TRACTOR_SPECS_FULL],
        imageSrc: tractorPrice4,
        imageAlt: "Scania R450",
        brand: "Scania",
      },
      {
        id: "tractor-5",
        title: "MAN TGX 510",
        price: SAMPLE_TOMAN,
        specs: [...TRACTOR_SPECS],
        imageSrc: tractorPrice5,
        imageAlt: "MAN TGX 510",
        brand: "MAN",
      },
    ],
  },
];

export const EXCHANGE_RATES: ExchangeRate[] = [
  { id: "usd", code: "USD", name: "دلار آمریکا", rate: "۲۷۲,۵۰۰" },
  { id: "eur", code: "EUR", name: "یورو", rate: "۳۰۴,۹۰۰" },
  { id: "gbp", code: "GBP", name: "پوند انگلیس", rate: "۳۶۳,۹۰۰" },
  { id: "aed", code: "AED", name: "درهم امارت", rate: "۷۴,۵۲۴" },
  { id: "try", code: "TRY", name: "لیر ترکیه", rate: "۵,۴۸۰" },
  { id: "chf", code: "CHF", name: "فرانک سوئیس", rate: "۳۲۹,۹۱۰" },
  { id: "cny", code: "CNY", name: "یوآن چین", rate: "۴۰,۸۷۰" },
  { id: "jpy", code: "JPY", name: "ین ژاپن", rate: "۱۷۳,۳۰۰" },
  { id: "cad", code: "CAD", name: "دلار کانادا", rate: "۱۹۴,۴۰۰" },
  { id: "aud", code: "AUD", name: "دلار استرالیا", rate: "۱۹۱,۵۰۰" },
  { id: "nzd", code: "NZD", name: "دلار نیوزلند", rate: "۱۵۴,۹۰۰" },
  { id: "sgd", code: "SGD", name: "دلار سنگاپور", rate: "۲۱۳,۰۰۰" },
  { id: "inr", code: "INR", name: "روپیه هند", rate: "۲,۸۵۶" },
  { id: "pkr", code: "PKR", name: "روپیه پاکستان", rate: "۹۶۴" },
  { id: "iqd", code: "IQD", name: "دینار عراق", rate: "۱۷۵" },
  { id: "syp", code: "SYP", name: "لیر سوریه", rate: "۲,۲۴۳" },
];

export const CONSULTATION_CTA: ConsultationCta = {
  title: "تجارت شما، با یک شریک مطمئن",
  description:
    "از مشاوره تا اجرا، در کنار شما هستیم. نام و شماره همراه را بگذارید؛ کارشناس همان خدمت با شما تماس می‌گیرد.",
  ctaLabel: "مشاوره",
  ctaHref: "/consultation",
  imageSrc: consultationImg,
  imageAlt: "مشاوره تخصصی بازرگانی — دست دادن شرکای تجاری",
};

const WEBLOG_AUTHOR = "محمد پوراسکندر";
const WEBLOG_DATE = "۱۴۰۵/۰۷/۳۱";
const WEBLOG_DATE_TIME = "2026-10-22";
const WEBLOG_EXCERPT =
  "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است.";

export const WEBLOG_POSTS: WeblogPost[] = [
  {
    id: "post-truck",
    category: "کشنده و کامیون",
    title: "کشنده‌های مرسدس بنز اکتروس در بازار",
    excerpt: WEBLOG_EXCERPT,
    date: WEBLOG_DATE,
    dateTime: WEBLOG_DATE_TIME,
    author: WEBLOG_AUTHOR,
    href: "#weblog",
    imageSrc: weblogTruck,
    imageAlt: "کشنده‌های مرسدس بنز اکتروس",
  },
  {
    id: "post-ship",
    category: "مراحل ترخیص کالا",
    title: "آشنایی با مراحل ترخیص کالا از گمرک",
    excerpt: WEBLOG_EXCERPT,
    date: WEBLOG_DATE,
    dateTime: WEBLOG_DATE_TIME,
    author: WEBLOG_AUTHOR,
    href: "#weblog",
    imageSrc: weblogShip,
    imageAlt: "کشتی کانتینری در مسیر ترخیص کالا",
  },
  {
    id: "post-car",
    category: "خودروهای لوکس",
    title: "خودروهای لوکس پورشه در بازار",
    excerpt: WEBLOG_EXCERPT,
    date: WEBLOG_DATE,
    dateTime: WEBLOG_DATE_TIME,
    author: WEBLOG_AUTHOR,
    href: "#weblog",
    imageSrc: weblogCar,
    imageAlt: "خودروی لوکس پورشه",
  },
];
