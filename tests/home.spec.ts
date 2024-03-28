import { expect, test } from "@playwright/test";

test("has Homepage Open Graph Data and meta title and description", async ({
  page,
}) => {
  const expectedTitle =
    "Digital Collections - Northwestern University Libraries";
  const expectedDescription =
    "Explore digital resources from the Northwestern University Library collections – including letters, photographs, diaries, maps, and audiovisual materials - as well as licensed art historical images for teaching and reference.";

  await page.goto("/");

  await expect(page).toHaveTitle(expectedTitle);

  // Renders OpenGraph data
  const ogTitle = await page
    .locator('meta[property="og:title"]')
    .getAttribute("content");
  const ogSiteName = await page
    .locator('meta[property="og:site_name"]')
    .getAttribute("content");
  const ogDescription = await page
    .locator('meta[property="og:description"]')
    .first()
    .getAttribute("content");
  const ogUrl = await page
    .locator('meta[property="og:url"]')
    .getAttribute("content");
  const ogImage = await page
    .locator('meta[property="og:image"]')
    .getAttribute("content");
  const metaDescription = await page
    .locator('meta[name="description"]')
    .getAttribute("content");

  expect(ogTitle).toBe(expectedTitle);
  expect(ogDescription).toBe(expectedDescription);
  expect(ogSiteName).toBe(expectedTitle);
  expect(ogUrl).toBe("https://digitalcollections.library.northwestern.edu");
  expect(ogImage).toBe(
    `https://iiif.stack.rdc.library.northwestern.edu/iiif/2/999a8522-aa7a-4c49-a4a1-25165be91b05/full/461,/0/default.jpg`
  );
  expect(metaDescription).toBe(expectedDescription);
});
