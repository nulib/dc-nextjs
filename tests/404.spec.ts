import { test as base, expect } from "@playwright/test";

const WORK_404_ID = "00000000-0000-0000-0000-000000000000";

const test = base.extend({});

test.describe("404 page component", async () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`/items/${WORK_404_ID}`);
  });

  test("renders the 404 page", async ({ page }) => {
    await expect(page).toHaveURL(`/items/${WORK_404_ID}`);

    const figure = await page.locator("main .swiper figure");

    await expect(figure.locator(".slide-label")).toHaveText("Page Not Found");
    await expect(figure.locator(".slide-summary")).toHaveText(
      "Sorry the page you are looking for does not exist. It's possible the resource, work, or collection is no longer available. If you think you reached this page in error, please contact us.",
    );
  });
});
