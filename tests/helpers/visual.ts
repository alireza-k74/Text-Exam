import { expect, type Page } from "@playwright/test";
import { VIEWPORTS, type ViewportPreset } from "../../src/lib/constants";

/** Assert the document does not scroll horizontally beyond 1px tolerance. */
export async function assertNoHorizontalOverflow(page: Page) {
  const overflow = await page.evaluate(() => {
    const doc = document.documentElement;
    return {
      scrollWidth: doc.scrollWidth,
      clientWidth: doc.clientWidth,
      bodyScrollWidth: document.body.scrollWidth,
    };
  });

  expect(
    overflow.scrollWidth,
    `Horizontal overflow detected: scrollWidth=${overflow.scrollWidth}, clientWidth=${overflow.clientWidth}`,
  ).toBeLessThanOrEqual(overflow.clientWidth + 1);
}

/** Capture a full-page screenshot for a named viewport. */
export async function captureViewportScreenshot(
  page: Page,
  name: string,
  viewport: Pick<ViewportPreset, "width" | "height">,
) {
  await page.setViewportSize({
    width: viewport.width,
    height: viewport.height,
  });
  await page.waitForLoadState("networkidle");
  await assertNoHorizontalOverflow(page);
  await expect(page).toHaveScreenshot(`${name}.png`, {
    fullPage: true,
  });
}

/** Basic render sanity: main landmark and no obvious empty body. */
export async function assertPageRenders(page: Page) {
  await expect(page.locator("main")).toBeVisible();
  const text = await page.locator("body").innerText();
  expect(text.trim().length).toBeGreaterThan(0);
}

/** Detect overlapping elements via getBoundingClientRect pairwise sample. */
export async function assertNoObviousOverlaps(
  page: Page,
  selector = "h1, h2, button, a, [data-slot='card']",
) {
  const overlaps = await page.evaluate((sel) => {
    const nodes = Array.from(document.querySelectorAll(sel));
    const boxes = nodes.map((el) => {
      const r = el.getBoundingClientRect();
      return {
        tag: el.tagName,
        text: (el.textContent ?? "").slice(0, 40),
        x: r.x,
        y: r.y,
        w: r.width,
        h: r.height,
      };
    });

    const hits: string[] = [];
    for (let i = 0; i < boxes.length; i++) {
      for (let j = i + 1; j < boxes.length; j++) {
        const a = boxes[i];
        const b = boxes[j];
        const overlapX = a.x < b.x + b.w && a.x + a.w > b.x;
        const overlapY = a.y < b.y + b.h && a.y + a.h > b.y;
        const area =
          Math.max(0, Math.min(a.x + a.w, b.x + b.w) - Math.max(a.x, b.x)) *
          Math.max(0, Math.min(a.y + a.h, b.y + b.h) - Math.max(a.y, b.y));
        // Ignore tiny intersections / nested containers; flag substantial overlaps.
        if (overlapX && overlapY && area > 40) {
          const aContainsB =
            a.x <= b.x &&
            a.y <= b.y &&
            a.x + a.w >= b.x + b.w &&
            a.y + a.h >= b.y + b.h;
          const bContainsA =
            b.x <= a.x &&
            b.y <= a.y &&
            b.x + b.w >= a.x + a.w &&
            b.y + b.h >= a.y + a.h;
          if (!aContainsB && !bContainsA) {
            hits.push(`${a.tag}("${a.text}") overlaps ${b.tag}("${b.text}")`);
          }
        }
      }
    }
    return hits;
  }, selector);

  expect(overlaps, overlaps.join("; ")).toEqual([]);
}

export { VIEWPORTS };
