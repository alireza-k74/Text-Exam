/** App-wide constants for the UI boilerplate. */

export const APP_NAME = "Test Exam";

export const BREAKPOINTS = {
  smMobile: 320,
  mobile: 375,
  lgMobile: 430,
  tablet: 768,
  tabletLandscape: 1024,
  laptop: 1280,
  desktop: 1440,
  lgDesktop: 1920,
} as const;

export const VIEWPORTS = [
  { name: "small-mobile", width: 320, height: 640 },
  { name: "mobile", width: 375, height: 812 },
  { name: "large-mobile", width: 430, height: 932 },
  { name: "tablet-portrait", width: 768, height: 1024 },
  { name: "tablet-landscape", width: 1024, height: 768 },
  { name: "laptop", width: 1280, height: 800 },
  { name: "desktop", width: 1440, height: 900 },
  { name: "large-desktop", width: 1920, height: 1080 },
] as const;

export type ViewportPreset = (typeof VIEWPORTS)[number];

/** Locales: fa is filled; en is supported but empty for now. */
export const SUPPORTED_LOCALES = ["fa", "en"] as const;
export type AppLocale = (typeof SUPPORTED_LOCALES)[number];
export const DEFAULT_LOCALE: AppLocale = "fa";

export type DocumentDir = "ltr" | "rtl";

/** Locale → document direction. */
export const LOCALE_DIR: Record<AppLocale, DocumentDir> = {
  fa: "rtl",
  en: "ltr",
};

/** Document direction. Toggle via layout `dir` / DirectionProvider. */
export const DEFAULT_DIR: DocumentDir = LOCALE_DIR[DEFAULT_LOCALE];

/** Themes: light is default; dark tokens stay ready in tokens.css. */
export const SUPPORTED_THEMES = ["light", "dark"] as const;
export type AppTheme = (typeof SUPPORTED_THEMES)[number];
export const DEFAULT_THEME: AppTheme = "light";

/** Primary UI typeface (files in `src/assets/fonts`, wired in `~/lib/fonts`). */
export const FONT_SANS = "Peyda" as const;
