import { test, expect } from "@playwright/test";
import {
  assertNoHorizontalOverflow,
  assertNoObviousOverlaps,
  assertPageRenders,
  VIEWPORTS,
} from "../helpers/visual";

test.describe("home screen", () => {
  test("renders core landmarks in order", async ({ page }) => {
    await page.goto("/");
    await assertPageRenders(page);

    await expect(page.getByRole("banner")).toBeVisible();
    await expect(page.getByRole("region", { name: /hero slider/i })).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Services", exact: true }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Lists", exact: true }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Exchange", exact: true }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Weblog", exact: true }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Consultation", exact: true }),
    ).toBeVisible();
    await expect(page.getByRole("contentinfo")).toBeVisible();
  });

  test("has no horizontal overflow at current viewport", async ({ page }) => {
    await page.goto("/");
    await assertNoHorizontalOverflow(page);
  });

  test("has no horizontal overflow across assessment viewports", async ({
    page,
  }, testInfo) => {
    test.skip(
      testInfo.project.name !== "desktop-chromium",
      "Full viewport matrix runs once on desktop-chromium",
    );

    await page.goto("/");
    for (const vp of VIEWPORTS) {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await assertNoHorizontalOverflow(page);
    }
  });

  test("has no obvious layout overlaps on desktop", async ({
    page,
  }, testInfo) => {
    test.skip(
      testInfo.project.name !== "desktop-chromium",
      "Overlap check runs on desktop-chromium",
    );
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/");
    await assertNoObviousOverlaps(page);
  });

  test("supports RTL document direction without overflow", async ({ page }) => {
    await page.goto("/");
    await page.evaluate(() => {
      document.documentElement.setAttribute("dir", "rtl");
      document.documentElement.setAttribute("lang", "ar");
    });
    await assertNoHorizontalOverflow(page);
    await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
  });
});
