import type { Metadata } from "next";
import type { ReactNode } from "react";

import { AppProviders, SiteFooter, SiteHeader } from "~/components/layout";
import { APP_NAME, DEFAULT_DIR, DEFAULT_LOCALE, cn, fontPeyda } from "~/lib";

import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: APP_NAME,
    template: `%s · ${APP_NAME}`,
  },
  description:
    "Modern Next.js UI boilerplate for pixel-perfect Figma implementation.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html
      lang={DEFAULT_LOCALE}
      dir={DEFAULT_DIR}
      className={cn(fontPeyda.variable, "font-sans")}
      suppressHydrationWarning
    >
      <body className="flex min-h-dvh flex-col">
        <AppProviders direction={DEFAULT_DIR}>
          <SiteHeader />
          <div className="flex-1">{children}</div>
          <SiteFooter />
        </AppProviders>
      </body>
    </html>
  );
}
