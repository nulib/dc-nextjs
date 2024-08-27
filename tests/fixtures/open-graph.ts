import { type Locator, type Page, expect } from "@playwright/test";

export class OpenGraphPage {
  defaultTitle: string =
    "Digital Collections - Northwestern University Libraries";

  defaultDescription: string =
    "Explore digital resources from the Northwestern University Library collections – including letters, photographs, diaries, maps, and audiovisual materials - as well as licensed art historical images for teaching and reference.";

  dcUrl: string = "https://digitalcollections.library.northwestern.edu";

  iiifImageServerUrl: string = `https://iiif.dc.library.northwestern.edu/iiif/2/`;

  readonly metaDescription: Locator;
  readonly metaTitle: Locator;
  readonly ogDescription: Locator;
  readonly ogSiteName: Locator;
  readonly ogImage: Locator;
  readonly ogUrl: Locator;

  constructor(
    public readonly page: Page,
    public readonly route: string,
  ) {
    this.metaDescription = page.locator('meta[name="description"]');
    this.metaTitle = page.locator('meta[property="og:title"]');
    this.ogDescription = page.locator('meta[property="og:description"]').nth(0);
    this.ogImage = page.locator('meta[property="og:image"]');
    this.ogSiteName = page.locator('meta[property="og:site_name"]');
    this.ogUrl = page.locator('meta[property="og:url"]');
    this.route = route;
  }

  async goto() {
    await this.page.goto(this.route);
  }

  async hasDefaultDescription() {
    await expect(this.metaDescription).toHaveAttribute(
      "content",
      this.defaultDescription,
    );
  }

  async hasDefaultOGDescription() {
    await expect(this.ogDescription).toHaveAttribute(
      "content",
      this.defaultDescription,
    );
  }

  async hasDefaultOGImage() {
    await expect(this.ogImage).toHaveAttribute(
      "content",
      `${this.iiifImageServerUrl}999a8522-aa7a-4c49-a4a1-25165be91b05/full/461,/0/default.jpg`,
    );
  }

  async hasOGDescription(description: string) {
    await expect(this.ogDescription).toHaveAttribute("content", description);
  }

  async hasOGImage(uri: string) {
    await expect(this.ogImage).toHaveAttribute("content", uri);
  }

  async hasOGUrl(route: string) {
    const params = route ? `/${route}` : "";
    await expect(this.ogUrl).toHaveAttribute(
      "content",
      `${this.dcUrl}${params}`,
    );
  }

  async hasMetaDescription(description: string) {
    await expect(this.metaDescription).toHaveAttribute("content", description);
  }

  async hasMetaTitle(title: string | null) {
    await expect(this.metaTitle).toHaveAttribute("content", title || "");
  }

  async hasOGSiteName() {
    await expect(this.ogSiteName).toHaveAttribute("content", this.defaultTitle);
  }
}
