import localFont from "next/font/local";

/**
 * Project UI font — Peyda (files in `src/assets/fonts`).
 * Applied globally via root layout CSS variables + `font-sans` / `font-heading`.
 */
export const fontPeyda = localFont({
  src: [
    {
      path: "../assets/fonts/Peyda-Thin.ttf",
      weight: "100",
      style: "normal",
    },
    {
      path: "../assets/fonts/peyda-extralight.ttf",
      weight: "200",
      style: "normal",
    },
    {
      path: "../assets/fonts/peyda-light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../assets/fonts/Peyda-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../assets/fonts/Peyda-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../assets/fonts/Peyda-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../assets/fonts/Peyda-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../assets/fonts/Peyda-ExtraBold.ttf",
      weight: "800",
      style: "normal",
    },
    {
      path: "../assets/fonts/Peyda-Black.ttf",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-peyda",
  display: "swap",
  fallback: ["Tahoma", "Arial", "sans-serif"],
});
