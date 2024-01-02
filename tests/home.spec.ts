import { OpenGraphPage } from "./fixtures/open-graph";
import { test } from "@playwright/test";

const ogTest = test.extend<{ openGraphPage: OpenGraphPage }>({
  openGraphPage: async ({ page }, use) => {
    const openGraphPage = new OpenGraphPage(page, "/");
    await openGraphPage.goto();
    await use(openGraphPage);
  },
});

ogTest(
  "has Homepage Open Graph Data and meta title and description",
  async ({ openGraphPage }) => {
    await openGraphPage.hasOGSiteName();
    await openGraphPage.hasMetaTitle(
      "Digital Collections - Northwestern University Libraries"
    );
    await openGraphPage.hasDefaultDescription();
    await openGraphPage.hasDefaultOGDescription();
    await openGraphPage.hasOGUrl("");
    await openGraphPage.hasDefaultOGImage();
  }
);
