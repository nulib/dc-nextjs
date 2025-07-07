import { test as base, expect } from "@playwright/test";

import { DC_URL } from "@/lib/constants/endpoints";
import { OpenGraphPage } from "@/tests/fixtures/open-graph";
import { WorkPage } from "@/tests/fixtures/work-page";
import { canaryWork } from "@/tests/fixtures/works/canary-work";

type WorkPageFixtures = {
  openGraphPage: OpenGraphPage;
  workPage: WorkPage;
};

const CANARY_WORK_ID = "cb8a19a7-3dec-47f3-80c0-12872ae61f8f";

const test = base.extend<WorkPageFixtures>({
  // A common fixture to help with Open Graph data
  openGraphPage: async ({ page }, use) => {
    const openGraphPage = new OpenGraphPage(page, `/items/${CANARY_WORK_ID}`);
    await openGraphPage.goto();
    await use(openGraphPage);
  },

  // A fixture to help with the Search Page shared functionality
  workPage: async ({ page }, use) => {
    const workPage = new WorkPage(page);
    await use(workPage);
  },
});

test.describe("Work page component", async () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`/items/${CANARY_WORK_ID}`);
  });

  /**
   * this test is skipped due to timeouts in github CI actions
   */

  test("renders Open Graph data and meta title and description", async ({
    openGraphPage,
  }) => {
    await openGraphPage.hasMetaTitle(canaryWork.title);
    await openGraphPage.hasMetaDescription(canaryWork.description.join(" "));
    await openGraphPage.hasOGDescription(
      `${canaryWork.description.join(" ")} - ${canaryWork.terms_of_use}`,
    );
    await openGraphPage.hasOGSiteName();
    await openGraphPage.hasOGUrl(`items/${canaryWork.id}`);
    await openGraphPage.hasOGImage(
      `https://dc-test-iiif.rdc-staging.library.northwestern.edu/iiif/2/a59dc417-d313-4286-88d4-1c80916b82c6/full/1200,630/0/default.jpg`,
    );
  });

  test("renders the Work", async ({ page, workPage }) => {
    await expect(page).toHaveURL(`/items/${CANARY_WORK_ID}`);
  });

  test("renders the Work top level metadata", async ({ page, workPage }) => {
    await expect(page.getByTestId("title")).toContainText(
      canaryWork.title || "",
    );

    await expect(page.getByTestId("summary")).toContainText(
      canaryWork.description.join(", ") || "",
    );
    const metadataEl = page.getByTestId("metadata");

    await expect(metadataEl.getByText("Alternate Title")).toBeVisible();
    await expect(
      metadataEl.getByText("This is an alternative title"),
    ).toBeVisible();
    await expect(metadataEl.getByText("Abstract")).toBeVisible();
    await expect(metadataEl.getByText("Updated description!!!")).toBeVisible();
    await expect(metadataEl.getByText("Caption")).toBeVisible();
    await expect(metadataEl.getByText("Beebo")).toBeVisible();
    await expect(metadataEl.getByText("Contributor")).toBeVisible();
    await expect(
      metadataEl.getByText("Metallica (Musical group) (Cartographer)"),
    ).toBeVisible();
    await expect(metadataEl.getByText("Creator")).toBeVisible();
    await expect(metadataEl.getByText("Dessa (Vocalist)")).toBeVisible();
    await expect(metadataEl.getByText("Cultural Context")).toBeVisible();
    await expect(metadataEl.getByText("Test Context")).toBeVisible();
    await expect(metadataEl.getByText("Date", { exact: true })).toBeVisible();
    await expect(
      metadataEl.getByText("August 1906 to December 1910"),
    ).toBeVisible();
    await expect(metadataEl.getByText("1958")).toBeVisible();
    await expect(metadataEl.getByText("Department")).toBeVisible();
    await expect(
      metadataEl.getByText("University (MAIN) Library"),
    ).toBeVisible();
    await expect(metadataEl.getByText("Dimensions")).toBeVisible();
    await expect(metadataEl.getByText("16 x 24 inches")).toBeVisible();
    await expect(metadataEl.getByText("Genre")).toBeVisible();

    // Click to show more
    await page.getByRole("button", { name: "Show More" }).click();

    await expect(metadataEl.getByText("stencil prints")).toBeVisible();
    await expect(
      metadataEl.getByText("Language", { exact: true }),
    ).toBeVisible();
    await expect(metadataEl.getByText("Crimean Tatar")).toBeVisible();
    await expect(metadataEl.getByText("Location")).toBeVisible();
    await expect(metadataEl.getByText("Leland Township")).toBeVisible();
    await expect(
      metadataEl.getByText("Materials", { exact: true }),
    ).toBeVisible();
    await expect(
      metadataEl.getByText("Acrylic paint on cement block"),
    ).toBeVisible();
    await expect(metadataEl.getByText("Notes", { exact: true })).toBeVisible();
    await expect(
      metadataEl.getByText("Here are some notes (General Note)", {
        exact: true,
      }),
    ).toBeVisible();
    await expect(metadataEl.getByText("Awards type (Awards)")).toBeVisible();
    await expect(metadataEl.getByText("Biographical note (")).toBeVisible();
    await expect(
      metadataEl.getByText("creation production credits ("),
    ).toBeVisible();
    await expect(metadataEl.getByText("Provenance")).toBeVisible();
    await expect(
      metadataEl.getByText("Artist; sold to Mr. Blank in"),
    ).toBeVisible();
    await expect(metadataEl.getByText("Publisher")).toBeVisible();
    await expect(
      metadataEl.getByText("Northwestern University Press"),
    ).toBeVisible();
    await expect(
      metadataEl.getByText("Related Material", { exact: true }),
    ).toBeVisible();
    await expect(
      metadataEl.getByText("See Also: related material"),
    ).toBeVisible();
    await expect(metadataEl.getByText("Related URL")).toBeVisible();
    await expect(metadataEl.getByText("Finding Aid")).toBeVisible();
    await expect(metadataEl.getByText("Research Guide")).toBeVisible();
    await expect(metadataEl.getByText("Rights Holder")).toBeVisible();
    await expect(metadataEl.getByText("Artist", { exact: true })).toBeVisible();
    await expect(metadataEl.getByText("Rights Statement")).toBeVisible();
    await expect(
      metadataEl.getByText("In Copyright - Educational"),
    ).toBeVisible();
    await expect(metadataEl.getByText("Scope and Contents")).toBeVisible();
    await expect(
      metadataEl.getByText("I promise there is scope and"),
    ).toBeVisible();
    await expect(metadataEl.getByText("Series")).toBeVisible();
    await expect(
      metadataEl.getByText("Canaries and How to Care for"),
    ).toBeVisible();
    await expect(metadataEl.getByText("Source")).toBeVisible();
    await expect(metadataEl.getByText("Mars")).toBeVisible();
    await expect(metadataEl.getByText("Style Period")).toBeVisible();
    await expect(
      metadataEl.getByText("Qing (dynastic styles and"),
    ).toBeVisible();
    await expect(metadataEl.getByText("Subject")).toBeVisible();
    await expect(metadataEl.getByText("Cats on postage stamps")).toBeVisible();
    await expect(metadataEl.getByText("Test Record Canary")).toBeVisible();
    await expect(metadataEl.getByText("Table of Contents")).toBeVisible();
    await expect(metadataEl.getByText("cats; 2. dogs")).toBeVisible();
    await expect(metadataEl.getByText("Technique")).toBeVisible();
    await expect(
      metadataEl.getByText("drypoint (printing process)"),
    ).toBeVisible();
    await expect(page.getByText("Attribution")).toContainText("Attribution");
    await expect(page.getByText("Courtesy of Northwestern")).toBeVisible();

    // Shows the collection
    const collectionsCard = page.getByTestId("card-wrapper").locator("a");
    await expect(
      collectionsCard.getByAltText("TEST Canary Records"),
    ).toHaveAttribute(
      "src",
      `https://dc-test-api.rdc-staging.library.northwestern.edu/api/v2/collections/820fc328-a333-430b-a974-ac6218a1ffcd/thumbnail?aspect=square`,
    );
    const figCaption = collectionsCard.locator("figcaption");
    await expect(figCaption).toContainText("TEST Canary Records");
    await expect(figCaption.getByTestId("work-count-total")).toContainText(
      "3 Works",
    );
    const workCountTypes = figCaption.getByTestId("work-count-type");
    await expect(workCountTypes.nth(0)).toContainText("1");
    await expect(workCountTypes.nth(1)).toContainText("1");
    await expect(workCountTypes.nth(2)).toContainText("1");
  });

  test("renders the Explore Further section Clover sliders", async ({
    page,
  }) => {
    await page.getByRole("button", { name: "Dismiss" }).click();
    const relatedItems = page.getByTestId("related-items");

    await expect(
      page.getByRole("heading", { name: "Explore Further" }),
    ).toBeVisible();

    // Collection Slider
    await expect(
      page
        .getByTestId("related-items")
        .locator("a")
        .filter({ hasText: "TEST Canary Records" }),
    ).toHaveAttribute(
      "href",
      `${DC_URL}/search?collection=TEST+Canary+Records`,
    );

    // View all buttons
    const viewAllButtons = page
      .getByTestId("related-items")
      .getByRole("link", { name: "View All" });
    const similarPattern = new RegExp(`${DC_URL}/search\\?similar=.*`);
    const subjectPattern = new RegExp(`${DC_URL}/search\\?subject=.*`);

    await expect(viewAllButtons.first()).toHaveAttribute(
      "href",
      `${DC_URL}/search?collection=TEST+Canary+Records`,
    );
    await expect(viewAllButtons.nth(1)).toHaveAttribute("href", similarPattern);
    await expect(viewAllButtons.nth(2)).toHaveAttribute("href", subjectPattern);
    await expect(viewAllButtons.nth(3)).toHaveAttribute("href", subjectPattern);

    // Test the Collection carousel
    const collectionsSliderItems = relatedItems
      .locator(".swiper-wrapper")
      .nth(0);
    await expect(
      collectionsSliderItems.filter({ hasText: "Canary Record TEST 3" }),
    ).toBeVisible();
    await expect(
      collectionsSliderItems.filter({ hasText: "Image" }),
    ).toBeVisible();
    await expect(
      collectionsSliderItems.filter({ hasText: "Canary Record TEST 2" }),
    ).toBeVisible();
    await expect(
      collectionsSliderItems.filter({ hasText: "Video" }),
    ).toBeVisible();
    await expect(
      collectionsSliderItems.filter({ hasText: "Canary Record TEST 1" }),
    ).toBeVisible();
    await expect(
      collectionsSliderItems.filter({ hasText: "Audio" }),
    ).toBeVisible();

    // More Like This slider
    await expect(
      page
        .getByTestId("related-items")
        .locator("a")
        .filter({ hasText: "More Like This" }),
    ).toHaveAttribute(
      "href",
      `${DC_URL}/search?similar=cb8a19a7-3dec-47f3-80c0-12872ae61f8f`,
    );

    // TODO: Something is wrong with the More Like This slider

    // // Test the More Like This carousel
    // const moreLikeThisSliderItems = relatedItems
    //   .locator(".swiper-wrapper")
    //   .nth(1);

    // // Test the More Like This carousel has 10 items
    // await expect(moreLikeThisSliderItems.locator(".swiper-slide")).toHaveCount(
    //   11
    // );

    // // Slider navigation
    // await expect(
    //   relatedItems.getByRole("button", { name: "previous item" })
    // ).toBeDisabled();

    // await page.getByRole("button", { name: "next item" }).click();
    // // expect prev button to be enabled
    // await expect(
    //   relatedItems.getByRole("button", { name: "previous item" })
    // ).toBeEnabled();
    // // expect next button to be disabled
    // await expect(
    //   relatedItems.getByRole("button", { name: "next item" })
    // ).toBeDisabled();

    // Test the Subject carousels exist.  But they'll be random so can't really test the content
    const subject1SliderItems = relatedItems.locator(".swiper-wrapper").nth(2);
    const subject2SliderItems = relatedItems.locator(".swiper-wrapper").nth(3);

    await expect(subject1SliderItems).toBeVisible();
    await expect(subject2SliderItems).toBeVisible();

    console.log("renders the Explore Further section Clover sliders (end)");
  });

  test("renders the Find this item and Cite this item modal windows", async ({
    page,
  }) => {
    const today = new Date().toDateString();

    await page.getByRole("button", { name: "Dismiss" }).click();

    /**
     * Find this item
     */
    await page.getByRole("button", { name: "Find this item" }).click();
    await page.getByRole("heading", { name: "Find this item" }).click();
    await page
      .getByTestId("actions-dialog-aside")
      .getByRole("img", { name: "Canary Record TEST" })
      .click();
    await page
      .getByTestId("actions-dialog-aside")
      .getByText("Canary Record TEST")
      .click();
    await page.getByTestId("actions-dialog-aside").getByText("Image").click();
    await page.getByText("Accession").click();
    await page.getByText("TEST_canary_002").click();
    await page.getByText("Box Name").click();
    await page.getByText("The name of a box").click();
    await page.getByText("Box Number").click();
    await page.getByText("88").nth(1).click();
    await page.getByText("Folder Name").click();
    await page.getByText("Blue folder").click();
    await page.getByText("Folder Number").click();
    await page.getByText("88").nth(2).click();
    await page.getByText("NUsearch").click();
    await page.getByRole("link", { name: "MS-1984-1982-" }).click();

    expect(page.url()).toBe(
      "https://search.library.northwestern.edu/discovery/search?vid=01NWU_INST%3ANULVNEW&institution=01NWU&field=any&query=any%2Ccontains%2CMS-1984-1982-1989&query=&search_scope=MyInst_and_CI",
    );

    await page.goBack();

    /**
     * Cite this item
     */
    const citeDialog = page.getByRole("dialog").getByTestId("metadata");

    await page.getByRole("button", { name: "Cite this item" }).click();
    await expect(
      page.getByRole("heading", { name: "Cite this item" }),
    ).toBeVisible();

    // Aside info
    await expect(
      page
        .getByTestId("actions-dialog-aside")
        .getByRole("img", { name: "Canary Record TEST" }),
    ).toBeVisible();
    await expect(
      page.getByTestId("actions-dialog-aside").getByText("Canary Record TEST"),
    ).toBeVisible();
    await expect(
      page.getByTestId("actions-dialog-aside").getByText("Image"),
    ).toBeVisible();

    // Main data
    await expect(citeDialog.getByText("Title", { exact: true })).toBeVisible();
    await expect(
      citeDialog.getByText("Canary Record TEST 3 | Copy"),
    ).toBeVisible();
    await citeDialog
      .locator("dd")
      .filter({ hasText: "Canary Record TEST 3 | Copy" })
      .getByRole("button")
      .click();

    await expect(citeDialog.getByText("Use Statement")).toBeVisible();
    await expect(citeDialog.getByText("Terms | Copy")).toBeVisible();

    await expect(citeDialog.getByText("Ark", { exact: true })).toBeVisible();
    await expect(
      citeDialog.getByText("ark:/81985/n2x34qh35 | Copy"),
    ).toBeVisible();

    await expect(citeDialog.getByText("APA Format")).toBeVisible();
    await expect(
      citeDialog.getByText(
        `University (MAIN) Library, Northwestern University Libraries. (${today}`,
      ),
    ).toBeVisible();

    await expect(citeDialog.getByText("Chicago/Turabian Format")).toBeVisible();
    await expect(
      citeDialog.getByText("University (MAIN) Library,").nth(1),
    ).toBeVisible();

    await expect(citeDialog.getByText("MLA Format")).toBeVisible();
    await expect(
      citeDialog.getByText(
        `University (MAIN) Library, Northwestern University Libraries. "Canary Record TEST 3", TEST Canary Records ${today}.`,
      ),
    ).toBeVisible();

    await expect(citeDialog.getByText("Wiki Citation")).toBeVisible();
    await expect(
      citeDialog.getByText("<ref name=NUL>{{cite web |"),
    ).toBeVisible();

    // Verify the copy button is present on all items
    const copyButtons = citeDialog
      .locator("button")
      .filter({ hasText: "Copy" });
    await expect(copyButtons).toHaveCount(7);
    await copyButtons.nth(0).click();

    // TODO: This fails in headless tests for some reason
    //await expect(copyButtons.nth(0).locator("> span")).toHaveText("Copied");

    await page.getByTestId("facets-filter-close").click();
  });

  test("Download and share dialog renders all content", async ({ page }) => {
    await page.getByRole("button", { name: "Dismiss" }).click();
    await page.getByRole("button", { name: "Download and share" }).click();

    const dialog = page.getByRole("dialog");

    await expect(
      dialog.getByRole("heading", { name: "Download this item" }),
    ).toBeVisible();

    // Aside info
    await expect(
      dialog.getByRole("img", { name: "Canary Record TEST" }),
    ).toBeVisible();
    await expect(dialog.getByText("Image", { exact: true })).toBeVisible();
    await expect(
      dialog.getByRole("button", { name: "Logo Facebook" }),
    ).toBeVisible();
    await expect(
      dialog.getByRole("button", { name: "Logo Twitter" }),
    ).toBeVisible();
    await expect(
      dialog.getByRole("button", { name: "Logo Pinterest" }),
    ).toBeVisible();

    // IIIF Manifest
    await expect(
      dialog.getByRole("heading", { name: "IIIF Manifest" }),
    ).toBeVisible();
    await expect(
      dialog.getByRole("link", { name: "https://dc-test-api.rdc-" }),
    ).toBeVisible();
    await dialog.getByRole("button", { name: "Copy Manifest Link" }).click();

    //TODO: This fails in headless tests for some reason
    //await expect(dialog.getByText("Copied")).toBeVisible();

    await expect(
      dialog.getByRole("link", { name: "What is IIIF?" }),
    ).toHaveAttribute("href", "https://iiif.io/get-started/why-iiif/");
    await expect(
      dialog.getByRole("link", { name: "View in Mirador" }),
    ).toHaveAttribute(
      "href",
      "https://projectmirador.org/embed/?iiif-content=https://dc-test-api.rdc-staging.library.northwestern.edu/api/v2/works/cb8a19a7-3dec-47f3-80c0-12872ae61f8f?as=iiif",
    );

    // Embed Viewer
    const embedViewer = dialog.getByTestId("preview-embed-viewer");

    await expect(
      dialog.getByRole("heading", { name: "Embed Viewer" }),
    ).toBeVisible();
    await expect(dialog.getByTestId("embed-html")).toContainText(
      `/embedded-viewer/https%3A%2F%2Fdc-test-api.rdc-staging.library.northwestern.edu%2Fapi%2Fv2%2Fworks%2Fcb8a19a7-3dec-47f3-80c0-12872ae61f8f%3Fas%3Diiif" title="Canary Record TEST 3" width="100%" height="800"></iframe>`,
    );
    await expect(dialog.getByText("Preview")).toBeVisible();
    await expect(
      embedViewer.filter({ hasText: "Canary Record TEST 3" }),
    ).toBeVisible();
    await expect(embedViewer.locator("span").nth(1)).toHaveAttribute(
      "style",
      `background-image: url(\"https://dc-test-api.rdc-staging.library.northwestern.edu/api/v2/works/cb8a19a7-3dec-47f3-80c0-12872ae61f8f/thumbnail\");`,
    );

    await page.getByRole("button", { exact: true, name: "Copy" }).click();

    await page.locator('select[name="show-title"]').selectOption("false");
    await expect(embedViewer.getByText("Canary Record TEST 3")).toBeHidden();

    await expect(page.getByTestId("preview-info-panel")).not.toBeVisible();
    await page
      .locator('select[name="show-info-panel"]')
      .selectOption("show initially open");
    await expect(page.getByTestId("preview-info-panel")).toBeVisible();

    // Download and Embed Images
    const downloadEmbedItems = dialog.getByTestId("download-embed-items");

    // Image thumbnails
    await expect(
      dialog.getByRole("heading", { name: "Download and Embed" }),
    ).toBeVisible();
    await expect(
      downloadEmbedItems.getByRole("img", { name: "access tif" }),
    ).toBeVisible();
    await expect(
      downloadEmbedItems.getByRole("img", { name: "access jpg" }),
    ).toBeVisible();
    await expect(
      downloadEmbedItems.getByRole("img", {
        name: "Cocktail Construction Chart",
      }),
    ).toBeVisible();
    await expect(
      downloadEmbedItems.getByRole("img", { name: "auxiliary png" }),
    ).toBeVisible();

    await expect(downloadEmbedItems.getByText("access tif")).toBeVisible();
    await expect(downloadEmbedItems.getByText("access jpg")).toBeVisible();
    await expect(
      downloadEmbedItems.getByText("Cocktail Construction Chart"),
    ).toBeVisible();
    await expect(downloadEmbedItems.getByText("auxiliary png")).toBeVisible();

    await expect(
      downloadEmbedItems.getByRole("button", { name: "Download JPG" }),
    ).toHaveCount(4);
    await expect(downloadEmbedItems.getByText("Embed HTML")).toHaveCount(4);
    await expect(
      downloadEmbedItems.getByRole("button", { name: "Copy IIIF" }),
    ).toHaveCount(4);

    // Toggle Embed HTML
    const embedHtml = downloadEmbedItems.getByText(
      `<img src="https://dc-test-iiif.rdc-staging.library.northwestern.edu/iiif/2/39a418a3-1ec7-4ef6-ae0c-0227c5aa2355/full/3000,/0/default.jpg" alt="Northwestern Libraries Digital Collections Fileset image for 39a418a3-1ec7-4ef6-ae0c-0227c5aa2355" />`,
    );

    await expect(embedHtml).toBeHidden();
    await downloadEmbedItems.getByText("Embed HTML").nth(0).click();
    await expect(embedHtml).toBeVisible();

    await expect(
      downloadEmbedItems.getByText("Copy 3000px - 100%1800px - 50"),
    ).toBeVisible();

    await downloadEmbedItems.getByRole("combobox").nth(0).selectOption("900");
    await downloadEmbedItems.getByRole("combobox").nth(1).selectOption("gray");

    await expect(
      downloadEmbedItems.getByText(
        `<img src="https://dc-test-iiif.rdc-staging.library.northwestern.edu/iiif/2/39a418a3-1ec7-4ef6-ae0c-0227c5aa2355/full/900,/0/gray.jpg" alt="Northwestern Libraries Digital Collections Fileset image for 39a418a3-1ec7-4ef6-ae0c-0227c5aa2355" />`,
      ),
    ).toBeVisible();
  });
});
