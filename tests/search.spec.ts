import { test as base, expect } from "@playwright/test";

import { OpenGraphPage } from "@/tests/fixtures/open-graph";
import { SearchPage } from "@/tests/fixtures/search-page";

type SearchPageFixtures = {
  openGraphPage: OpenGraphPage;
  searchPage: SearchPage;
};

const TOTAL_RESULTS = 205;

/** Set up Fixtures for the test.  Super handy */
// https://playwright.dev/docs/test-fixtures
const test = base.extend<SearchPageFixtures>({
  // A common fixture to help with Open Graph data
  openGraphPage: async ({ page }, use) => {
    const openGraphPage = new OpenGraphPage(page, "/search");
    await openGraphPage.goto();
    await use(openGraphPage);
  },

  // A fixture to help with the Search Page shared functionality
  searchPage: async ({ page }, use) => {
    const searchPage = new SearchPage(page);
    await searchPage.goto();
    await use(searchPage);
  },
});

test.describe("Search page component", () => {
  test.beforeEach(async ({ page, searchPage }) => {
    await searchPage.goto();
  });

  test.skip();

  test("renders Open Graph data and meta title and description", async ({
    openGraphPage,
  }) => {
    await openGraphPage.hasOGSiteName();
    await openGraphPage.hasMetaTitle("Search");
    await openGraphPage.hasDefaultDescription();
    await openGraphPage.hasDefaultOGDescription();
    await openGraphPage.hasOGUrl("search");
    await openGraphPage.hasDefaultOGImage();
    await openGraphPage.hasDefaultOGDescription();
  });

  test("renders the global search bar and fires off successful searches", async ({
    page,
    searchPage,
  }) => {
    const searches = [
      {
        expectedResultCount: 5,
        term: "Obama",
      },
      {
        expectedResultCount: 35,
        term: "Illinois",
      },
      {
        expectedResultCount: 8,
        term: "Berkeley",
      },
    ];

    const searchInput = page.getByPlaceholder("Search by keyword or phrase,");
    const searchBtn = page.getByTestId("submit-button");

    await searchPage.verifyTopResultsCount(TOTAL_RESULTS);
    await searchPage.verifyGridItemCount(TOTAL_RESULTS);

    // Test "Obama" search term
    await searchInput.fill(searches[0].term);
    await searchBtn.click();

    await expect(page).toHaveURL(`/search?q=${searches[0].term}`);
    await searchPage.verifyTopResultsCount(searches[0].expectedResultCount);

    const search1 = searchPage.getPaginationResults(
      searches[0].expectedResultCount,
    );

    await searchPage.verifyTopResultsCount(searches[0].expectedResultCount);
    await searchPage.verifyTotalsResultDisplay({
      count: search1,
      total: search1,
    });

    // Test "Illinois" search term
    await searchInput.fill(searches[1].term);
    await searchBtn.click();

    await page.waitForLoadState("domcontentloaded");
    await expect(page).toHaveURL(`/search?q=${searches[1].term}`);
    await searchPage.verifyTopResultsCount(searches[1].expectedResultCount);

    const search2 = searchPage.getPaginationResults(
      searches[1].expectedResultCount,
    );

    await page.waitForLoadState("domcontentloaded");
    await searchPage.verifyTopResultsCount(searches[1].expectedResultCount);
    await searchPage.verifyTotalsResultDisplay({
      count: search2,
      total: search2,
    });

    // Reset the search
    await page.getByRole("button", { name: "Clear" }).click();
    await expect(page).toHaveURL(/\/search/);

    // Verify original counts are back in place
    await page.waitForLoadState("domcontentloaded");
    await searchPage.verifyTopResultsCount(TOTAL_RESULTS);
    await searchPage.verifyGridItemCount(TOTAL_RESULTS);
  });

  test("renders Facet filter buttons above the grid correctly", async ({
    page,
    searchPage,
  }) => {
    const facetInlineComponent = page.getByTestId("facet-inline-component");
    const allBtn = facetInlineComponent.getByRole("radio", { name: "All" });
    const imageBtn = facetInlineComponent.getByRole("radio", { name: "Image" });
    const audioBtn = facetInlineComponent.getByRole("radio", { name: "Audio" });
    const videoBtn = facetInlineComponent.getByRole("radio", { name: "Video" });
    const clearAllBtn = page.getByRole("button", {
      name: "Reset",
    });
    const publicWorksToggle = page.getByRole("switch", {
      name: "Public only",
    });
    const facetUserComponent = page
      .getByTestId("facet-user-component")
      .locator("span");

    const IMAGE_COUNT = 152;
    const AUDIO_COUNT = 25;
    const VIDEO_COUNT = 28;
    const PUBLIC_WORKS_COUNT = 179;

    // Work Type facet button checks
    await page.waitForLoadState("domcontentloaded");
    await expect(allBtn).toHaveAttribute("aria-checked", "true");
    await expect(imageBtn).toHaveAttribute("aria-checked", "false");

    // Select Image facet
    await imageBtn.click();
    await page.waitForLoadState("domcontentloaded");
    await expect(imageBtn).toHaveAttribute("aria-checked", "true");
    await expect(allBtn).toHaveAttribute("aria-checked", "false");
    await searchPage.verifyTopResultsCount(IMAGE_COUNT);
    await searchPage.verifyGridItemCount(IMAGE_COUNT);

    // Select Audio facet
    await audioBtn.click();
    await page.waitForLoadState("domcontentloaded");
    await expect(audioBtn).toHaveAttribute("aria-checked", "true");
    await expect(imageBtn).toHaveAttribute("aria-checked", "false");
    await searchPage.verifyTopResultsCount(AUDIO_COUNT);
    await searchPage.verifyGridItemCount(AUDIO_COUNT);

    // Select Video facet
    await videoBtn.click();
    await page.waitForLoadState("domcontentloaded");
    await expect(videoBtn).toHaveAttribute("aria-checked", "true");
    await expect(audioBtn).toHaveAttribute("aria-checked", "false");
    await searchPage.verifyTopResultsCount(VIDEO_COUNT);
    await searchPage.verifyGridItemCount(VIDEO_COUNT);

    // Select All (work types) facet
    await allBtn.click();
    await page.waitForLoadState("domcontentloaded");
    await searchPage.verifyTopResultsCount(TOTAL_RESULTS);

    // Toggle Public Works
    await publicWorksToggle.click();
    await page.waitForLoadState("domcontentloaded");
    await searchPage.verifyTopResultsCount(PUBLIC_WORKS_COUNT);
    await searchPage.verifyGridItemCount(PUBLIC_WORKS_COUNT);
    await expect(facetUserComponent).toContainText("1");

    // Test Filter Facet Toggle UI
    await clearAllBtn.click();
    await page.waitForLoadState("domcontentloaded");
    await expect(facetUserComponent).not.toBeVisible();

    await imageBtn.click();
    await page.waitForLoadState("domcontentloaded");
    await publicWorksToggle.click();
    await page.waitForLoadState("domcontentloaded");
    await expect(facetUserComponent).toContainText("1");

    await publicWorksToggle.click();
    await page.waitForLoadState("domcontentloaded");
    await expect(facetUserComponent).toContainText("2");
  });
});
