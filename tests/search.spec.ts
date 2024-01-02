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
  test.beforeEach(async ({ page }) => {
    await page.goto("/search");
  });

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
    await expect(searchInput).toHaveValue(searches[0].term);

    const search1 = searchPage.getPaginationResults(
      searches[0].expectedResultCount
    );

    await searchPage.verifyTopResultsCount(searches[0].expectedResultCount);
    await searchPage.verifyTotalsResultDisplay({
      count: search1,
      total: search1,
    });

    // Test "Illinois" search term
    await searchInput.fill(searches[1].term);
    await searchBtn.click();

    await expect(page).toHaveURL(`/search?q=${searches[1].term}`);
    await searchPage.verifyTopResultsCount(searches[1].expectedResultCount);
    await expect(searchInput).toHaveValue(searches[1].term);

    const search2 = searchPage.getPaginationResults(
      searches[1].expectedResultCount
    );

    await searchPage.verifyTopResultsCount(searches[1].expectedResultCount);
    await searchPage.verifyTotalsResultDisplay({
      count: search2,
      total: search2,
    });

    // Reset the search
    await page.getByRole("button", { name: "Clear" }).click();
    await expect(page).toHaveURL(/\/search/);

    // Verify original counts are back in place
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
      name: "Clear All",
    });
    const publicWorksToggle = page.getByRole("switch", {
      name: "Public works only",
    });
    const facetUserComponent = page
      .getByTestId("facet-user-component")
      .locator("span");

    const IMAGE_COUNT = 152;
    const AUDIO_COUNT = 25;
    const VIDEO_COUNT = 28;
    const PUBLIC_WORKS_COUNT = 179;

    // Work Type facet button checks
    await expect(allBtn).toHaveAttribute("aria-checked", "true");
    await expect(imageBtn).toHaveAttribute("aria-checked", "false");

    // Select Image facet
    await imageBtn.click();
    await expect(imageBtn).toHaveAttribute("aria-checked", "true");
    await expect(allBtn).toHaveAttribute("aria-checked", "false");
    await searchPage.verifyTopResultsCount(IMAGE_COUNT);
    await searchPage.verifyGridItemCount(IMAGE_COUNT);

    // Select Audio facet
    await audioBtn.click();
    await expect(audioBtn).toHaveAttribute("aria-checked", "true");
    await expect(imageBtn).toHaveAttribute("aria-checked", "false");
    await searchPage.verifyTopResultsCount(AUDIO_COUNT);
    await searchPage.verifyGridItemCount(AUDIO_COUNT);

    // Select Video facet
    await videoBtn.click();
    await expect(videoBtn).toHaveAttribute("aria-checked", "true");
    await expect(audioBtn).toHaveAttribute("aria-checked", "false");
    await searchPage.verifyTopResultsCount(VIDEO_COUNT);
    await searchPage.verifyGridItemCount(VIDEO_COUNT);

    // Toggle Public Works
    await allBtn.click();
    await publicWorksToggle.click();

    await searchPage.verifyTopResultsCount(PUBLIC_WORKS_COUNT);
    await searchPage.verifyGridItemCount(PUBLIC_WORKS_COUNT);

    // Test Filter Facet Toggle UI
    await clearAllBtn.click();
    await expect(facetUserComponent).not.toBeVisible();

    await imageBtn.click();
    await expect(facetUserComponent).toContainText("1");

    await publicWorksToggle.click();
    await expect(facetUserComponent).toContainText("2");
  });

  test("renders the Filter modal and a general run through of interactions within", async ({
    page,
  }) => {
    const filterBtn = page.getByRole("button", { name: "Filter Filter" });
    const filterModalHeading = page.getByRole("heading", { name: "Filter" });
    const filterModalBody = page.getByTestId("facets-group-list");

    await filterBtn.click();

    // Test Filter Modal UI, default layout and interactions
    await expect(filterModalHeading).toBeInViewport();
    await page.getByRole("banner").getByTestId("facets-filter-close").click();
    await page.getByRole("button", { name: "Filter Filter" }).click();
    await page.getByRole("button", { name: "Clear All" }).click();
    await page.getByText("Cancel").click();
    await page.getByRole("button", { name: "Filter Filter" }).click();
    await page
      .getByTestId("facets-submit")
      .getByTestId("submit-button")
      .click();

    expect(filterModalHeading).not.toBeVisible();

    // Test facets; Subject and Descriptive defaults open on load
    await filterBtn.click();
    await expect(
      filterModalBody.getByRole("button", { name: "Subject and Descriptive" })
    ).toBeVisible();

    // Test Genre facet
    await page.getByRole("tab", { name: "Genre" }).click();
    await page.getByRole("heading", { name: "Genre" }).click();

    // Test Language facet
    await page.getByRole("tab", { name: "Language" }).click();
    await page.getByRole("heading", { name: "Language" }).click();
    await page.locator("li").filter({ hasText: "English(84)" }).click();
    await page.locator("li").filter({ hasText: "French(11)" }).click();

    // Test Style Period facet
    await page.getByRole("tab", { name: "Style Period" }).click();
    await page.getByRole("heading", { name: "Style Period" }).click();
    await page.getByPlaceholder("Find Style Period").click();
    await page.getByText("Qing (dynastic styles and").click();
    await page
      .getByTestId("facet-options")
      .getByLabel("Qing (dynastic styles and")
      .click();

    // Test Subject facet
    await page.getByRole("tab", { name: "Subject" }).click();
    await page
      .getByTestId("facet-multi-component")
      .getByRole("heading", { name: "Subject" })
      .click();
    await page.getByPlaceholder("Find Subject").click();
    await page
      .getByText("Northwestern University (Evanston, Ill.)(21)")
      .click();
    await page
      .getByLabel("Northwestern University (Evanston, Ill.)(22)")
      .click();

    // Test Technique facet
    await page.getByRole("tab", { name: "Technique" }).click();
    await page.getByRole("heading", { name: "Technique" }).click();
    await page.getByPlaceholder("Find Technique").click();
    await page
      .locator("li")
      .filter({ hasText: "photomechanical processes(6)" })
      .click();
    await page.getByLabel("photomechanical processes(6)").click();

    // Test Work Type facet
    await page.getByRole("tab", { name: "Work Type" }).click();
    await page.getByRole("heading", { name: "Work Type" }).click();
    await page.getByPlaceholder("Find Work Type").click();
    await page.getByTestId("facet-options").click();

    // Close modal
    await page.getByRole("banner").getByTestId("facets-filter-close").click();

    // Reopen modal
    await filterBtn.click();

    // Check Collection and Location Group facets
    await page.getByRole("button", { name: "Collection and Location" }).click();
    await page.getByRole("tab", { name: "Collection" }).click();
    await page
      .getByTestId("facet-multi-component")
      .getByRole("heading", { name: "Collection" })
      .click();
    await page.getByPlaceholder("Find Collection").click();
    await page
      .locator("li")
      .filter({ hasText: "Collection of Carl Smith(14)" })
      .click();
    await page
      .locator("li")
      .filter({ hasText: "Chicago Chamber Musicians" })
      .click();
    await page
      .getByTestId("facet-options")
      .getByLabel("Chicago Chamber Musicians")
      .click();
    await page.getByRole("tab", { name: "Series" }).click();
    await page.getByRole("heading", { name: "Series" }).click();
    await page.getByPlaceholder("Find Series").click();
    await page.getByRole("tab", { name: "Box Number" }).click();
    await page.getByRole("heading", { name: "Box Number" }).click();
    await page.getByPlaceholder("Find Box Number").click();

    // Activate a facet
    await page.getByLabel("(16)").click();
    await page.getByRole("heading", { name: "Preview Results" }).click();

    // Currently selected (uncommitted) facets display in modal header
    const userFacet = page.getByTestId("facet-user-value-component");
    await expect(userFacet).toContainText("1");
    await expect(userFacet).toContainText("Box Number");

    // Remove facet
    await userFacet.click();

    // Verify currently selected user facet is removed from the modal header
    expect(userFacet).not.toBeVisible();

    // Toggle the facet again
    await page.getByLabel("(16)").click();

    // Submit button shows number of results
    const modalSubmitBtn = page
      .getByTestId("facets-submit")
      .getByTestId("submit-button");
    await expect(modalSubmitBtn).toHaveText("View Results (16)");
    await modalSubmitBtn.click();

    // Main search page matches result count
    await expect(page.getByTestId("results-count")).toHaveText("16 results");
  });

  test("Filter modal facets will update Preview Results when facets are turned on/off", async ({
    page,
  }) => {
    const filterBtn = page.getByRole("button", { name: "Filter Filter" });
    const previewItems = page.getByTestId("facets-filter-preview-item");
    const facetOptions = page.getByTestId("facet-options");
    const userFacetsRow = page.getByTestId("facet-user-component");
    const userFacetButtons = userFacetsRow.getByTestId(
      "facet-user-value-component"
    );

    await filterBtn.click();

    // Default Preview Results display
    await expect(previewItems).toHaveCount(5);
    expect(previewItems.nth(0)).toContainText("Dracula");
    expect(previewItems.nth(1)).toContainText("Portrait of Justine Cordwell.");
    expect(userFacetsRow).toHaveCount(0);

    // Activate a facet
    await page.getByLabel("African American college students").click();

    // Preview Items update
    await expect(previewItems.nth(0)).toContainText(
      "Protest photographs, c. 1969-1970"
    );
    await expect(previewItems.nth(1)).toContainText(
      "Ronald E. Pitts. Cleveland"
    );

    // User selected facets update
    await expect(userFacetButtons).toHaveCount(1);
    await expect(
      userFacetsRow.getByLabel("Remove African American")
    ).toBeVisible();

    // Test the facet count (12) is included in the facet label and its checked
    await expect(
      facetOptions.getByText("African American college students(12)")
    ).toBeVisible();
    await expect(
      facetOptions.getByLabel("African American college students")
    ).toBeChecked();

    // Activating a second facet
    await facetOptions.getByLabel("Choirs (Music)").click();

    // Preview Items update
    await expect(previewItems).toHaveCount(2);
    await expect(previewItems.nth(0)).toContainText(
      "Ronald E. Pitts. Cleveland"
    );
    await expect(previewItems.nth(1)).toContainText(
      "Audition for the Northwestern Community Ensemble"
    );

    // User facets update
    await expect(userFacetButtons).toHaveCount(2);
    await expect(
      userFacetsRow.getByLabel("Remove Choirs (Music)")
    ).toBeVisible();
    await expect(
      userFacetsRow.getByLabel("Remove African American")
    ).toBeVisible();

    // Test the facet count (2) is included in the facet label and its checked
    await expect(
      facetOptions.getByText("African American college students(2)")
    ).toBeVisible();
    await expect(facetOptions.getByLabel("Choirs (Music)")).toBeChecked();
  });

  test("Filter modal cancel buttons do not make changes to the search results", async ({
    page,
  }) => {
    const filterBtn = page.getByRole("button", { name: "Filter Filter" });
    const facetOptions = page.getByTestId("facet-options");
    const submitBtn = page
      .getByTestId("facets-submit")
      .getByTestId("submit-button");
    const resultsCount = page.getByTestId("results-count");

    await filterBtn.click();

    // Activating a facet updates uncommitted count within modal
    await page.getByRole("tab", { name: "Language" }).click();
    await facetOptions.getByLabel("French(11)").check();
    await expect(submitBtn).toHaveText("View Results (11)");

    // Canceling returns the default number of total results
    await page.getByText("Cancel").click();
    await expect(resultsCount).toHaveText(`${TOTAL_RESULTS} results`);

    await filterBtn.click();

    // Try another facet from a different group
    await page.getByRole("button", { name: "Collection and Location" }).click();
    await page.getByRole("tab", { name: "Collection" }).click();
    await facetOptions.getByLabel("Map and Atlas Collection").check();
    await expect(submitBtn).toHaveText("View Results (6)");

    await page.getByRole("banner").getByTestId("facets-filter-close").click();
    await expect(resultsCount).toHaveText(`${TOTAL_RESULTS} results`);
  });

  test("renders correct pagination", async ({ page, searchPage }) => {
    function buildResultsString({ page }: { page: number }) {
      const start = paginationResultsCount * (page - 1) + 1;
      const end = start + paginationResultsCount - 1;
      const refinedEnd = end > TOTAL_RESULTS ? TOTAL_RESULTS : end;
      return `Showing ${start} to ${refinedEnd} of ${TOTAL_RESULTS} results`;
    }

    const nextBtn = page.getByRole("button", { name: "Next" });
    const prevBtn = page.getByRole("button", { name: "Previous" });
    const startBtn = page.getByRole("button", { name: "Start" });
    const paginationResultsCount =
      searchPage.getPaginationResults(TOTAL_RESULTS);

    await searchPage.verifyGridItemCount(TOTAL_RESULTS);
    await searchPage.verifyTopResultsCount(TOTAL_RESULTS);

    await expect(prevBtn).not.toBeVisible();
    await expect(startBtn).not.toBeVisible();

    // Click to page 2
    await nextBtn.click();
    await searchPage.verifyGridItemCount(
      TOTAL_RESULTS - paginationResultsCount
    );
    await expect(page.getByTestId("results")).toHaveText(
      buildResultsString({ page: 2 })
    );
    await expect(prevBtn).toBeVisible();
    await expect(startBtn).not.toBeVisible();

    // URL updates
    await expect(page).toHaveURL(new RegExp(`/search\\?page=2`));

    // Click to page 3
    await nextBtn.click();
    await searchPage.verifyGridItemCount(
      TOTAL_RESULTS - paginationResultsCount * 2
    );
    await expect(page.getByTestId("results")).toHaveText(
      buildResultsString({ page: 3 })
    );
    expect(prevBtn).toBeVisible();
    expect(startBtn).toBeVisible();

    await expect(page).toHaveURL(`/search?page=3`);

    // Click previous going back to page 2
    await prevBtn.click();
    await searchPage.verifyGridItemCount(
      TOTAL_RESULTS - paginationResultsCount
    );
    await expect(page.getByTestId("results")).toHaveText(
      buildResultsString({ page: 2 })
    );
    await expect(page).toHaveURL(`/search?page=2`);

    // Go to end of results
    await page.goto("/search?page=6");
    await searchPage.verifyGridItemCount(5);
    await expect(page.getByTestId("results")).toHaveText(
      buildResultsString({ page: 6 })
    );
    await expect(nextBtn).not.toBeVisible();
  });

  test("renders Work results which link to the Work page", async ({ page }) => {
    await page.getByLabel("Public works only").click();
    await page.getByRole("link", { name: "Ajal-e Moallaq Image" }).click();
    await expect(page).toHaveURL("items/5a2dcade-0071-48c3-b29b-755293e862c4");

    await page.goto("/search");
    await page.getByLabel("Public works only").click();

    await page.getByRole("link", { name: "Cadbury Eggs Cars Image" }).click();
    await expect(page).toHaveURL("items/944cc66c-dcf9-4ac5-8d0d-ec48a699a0fe");
  });
});
