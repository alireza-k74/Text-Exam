import type { Metadata } from "next";

import { ShapeDemoScreen } from "~/screens/shape-demo";

export const metadata: Metadata = {
  title: "Shape",
  description:
    "گالری و زمین بازی کامپوننت Shape برای برش، تزئین و مسیرهای SVG سفارشی.",
};

export default function ShapeDemoPage() {
  return (
    <main>
      <ShapeDemoScreen />
    </main>
  );
}
