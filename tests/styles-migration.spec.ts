import { expect, test } from "@playwright/test";
import { mockSearchResponse1 } from "@/mocks/search-response1";
import { work1 as work } from "@/mocks/work-page/work1";
import { workManifest1 as manifest } from "@/mocks/work-page/work-manifest1";

// Exercise real components without depending on staging auth or search data.
const results = Array.from({ length: 12 }, (_, index) => ({
  ...mockSearchResponse1.data[index % 2],
  id: index === 0 ? work.id : `fixture-${index}`,
  api_model: "Work",
  title: `Fixture work ${index}`,
}));
const pagination = {
  query_url: "https://example.org/api/v2/search?query=fixture",
  current_page: 1,
  limit: 100,
  offset: 0,
  total_hits: results.length,
  total_pages: 1,
};
const collection = {
  id: "https://example.org/collection",
  type: "Collection",
  label: { en: ["Fixture collection"] },
  items: results.map((item) => ({
    id: `https://example.org/manifests/${item.id}`,
    type: "Manifest",
    label: { en: [item.title] },
    thumbnail: [
      {
        id: "https://example.org/thumbnail.png",
        type: "Image",
        format: "image/png",
        width: 600,
        height: 600,
      },
    ],
    homepage: [
      {
        id: `https://example.org/items/${item.id}`,
        type: "Text",
        format: "text/html",
      },
    ],
  })),
};

test.use({ contextOptions: { reducedMotion: "reduce" } });
test.setTimeout(60_000);
test.beforeEach(async ({ page }) => {
  await page.route("**/*", async (route) => {
    const url = new URL(route.request().url());
    // Client navigation uses this payload instead of contacting staging on the server.
    if (
      url.pathname.includes("/_next/data/") &&
      url.pathname.includes("/items/")
    ) {
      return route.fulfill({
        json: {
          pageProps: { id: work.id, status: 200, collectionWorkCounts: null },
          __N_SSP: true,
        },
      });
    }
    if (url.pathname.includes("/auth/whoami"))
      return route.fulfill({ json: { isLoggedIn: false, scopes: [] } });
    if (url.pathname.includes("/auth/magic"))
      return route.fulfill({ json: { enabled: true } });
    if (/google|cookieyes|honeybadger/.test(url.hostname)) return route.abort();
    if (
      route.request().resourceType() === "image" &&
      url.hostname !== "127.0.0.1"
    ) {
      return route.fulfill({
        contentType: "image/gif",
        body: Buffer.from(
          "R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==",
          "base64",
        ),
      });
    }
    if (
      url.searchParams.get("as") === "iiif" &&
      /search|similar/.test(url.pathname)
    )
      return route.fulfill({ json: collection });
    if (url.pathname.includes("/api/v2/search/file-sets"))
      return route.fulfill({
        json: { data: [], pagination: { ...pagination, total_hits: 0 } },
      });
    if (url.pathname.includes("/api/v2/search"))
      return route.fulfill({ json: { data: results, info: {}, pagination } });
    if (url.href === work.iiif_manifest || url.href === manifest.id)
      return route.fulfill({ json: manifest });
    if (url.pathname.endsWith(`/works/${work.id}`))
      return route.fulfill({ json: { data: work } });
    if (url.pathname.includes("/api/v2/collections"))
      return route.fulfill({
        json: { data: [], pagination: { ...pagination, total_hits: 0 } },
      });
    if (url.pathname.endsWith("/info.json")) {
      return route.fulfill({
        json: {
          "@context": "http://iiif.io/api/image/2/context.json",
          "@id": url.href.replace("/info.json", ""),
          protocol: "http://iiif.io/api/image",
          profile: ["http://iiif.io/api/image/2/level2.json"],
          width: 4494,
          height: 3059,
          tiles: [{ width: 512, scaleFactors: [1, 2, 4, 8, 16] }],
        },
      });
    }
    return route.continue();
  });
});

test("informational pages and the portaled sign-in dialog fit desktop and mobile", async ({
  page,
}) => {
  for (const width of [1440, 390]) {
    await page.setViewportSize({ width, height: 1000 });
    for (const path of ["/about", "/contact"]) {
      await page.goto(path, { waitUntil: "domcontentloaded" });
      await expect(page.getByTestId("footer")).toBeVisible();
      const scrollWidth = await page.evaluate(() => document.body.scrollWidth);
      // The pre-migration About grid already overflows by 10px at 1440px.
      expect(scrollWidth).toBeLessThanOrEqual(
        width + (path === "/about" && width === 1440 ? 10 : 0),
      );
    }
    if (width < 768)
      await page
        .locator("header")
        .first()
        .locator("button")
        .filter({ has: page.locator("svg") })
        .first()
        .click();
    await page
      .getByRole("button", { name: "Sign in", exact: true })
      .first()
      .click();
    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();
    await expect(dialog).toHaveCSS("position", "fixed");
    expect((await dialog.boundingBox())!.width).toBeLessThanOrEqual(width);
    const sso = dialog.getByRole("link", { name: "Northwestern NetID" });
    await expect(sso).toHaveCSS("color", "rgb(255, 255, 255)");
    await expect(sso).toHaveCSS("padding-left", "0px");
    await page.keyboard.press("Tab");
    expect(
      await dialog.evaluate((element) =>
        element.contains(document.activeElement),
      ),
    ).toBe(true);
    await page.keyboard.press("Escape");
    await expect(dialog).toBeHidden();
  }
});

test("Masonry preserves columns, distribution, gaps, and mixed image proportions on resize", async ({
  page,
}) => {
  await page.goto("/search?q=fixture");
  const grid = page.getByTestId("search-results-grid");
  await expect(grid).toBeVisible();
  for (const width of [
    334, 335, 575, 576, 767, 768, 991, 992, 1199, 1200, 1439, 1440,
  ]) {
    await page.setViewportSize({ width, height: 1000 });
    const count = width <= 767 ? 2 : width <= 991 ? 3 : width <= 1199 ? 4 : 5;
    await expect(grid.locator(".grid-column")).toHaveCount(count);
    const columns = await grid.locator(".grid-column").evaluateAll((elements) =>
      elements.map((element) => ({
        margin: getComputedStyle(element).marginLeft,
        ids: [...element.querySelectorAll<HTMLElement>("[data-item-id]")].map(
          (item) => item.dataset.itemId,
        ),
      })),
    );
    for (let index = 0; index < count; index++) {
      expect(columns[index].ids).toEqual(
        results
          .filter((_, item) => item % count === index)
          .map((item) => item.id),
      );
    }
    expect(columns[0].margin).toBe("0px");
    expect(parseFloat(columns[1].margin)).toBeCloseTo(
      width <= 991 ? 19 : 30.742,
      2,
    );
    const image = grid.locator(
      `[data-item-id="${work.id}"] [data-dc-slot="figure-image-wrapper"]`,
    );
    const box = (await image.boundingBox())!;
    expect(box.width / box.height).toBeCloseTo(
      results[0].representative_file_set.aspect_ratio,
      2,
    );
  }
});

test("Clover's public exports render the viewer and responsive, navigable sliders", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  // Several views, so the viewer shows its thumbnail rail; `rail` is each
  // one's width there. Routes added here take precedence over beforeEach's.
  const views = [
    { name: "wide", width: 600, height: 100, rail: 256 },
    { name: "tall", width: 100, height: 300, rail: 128 },
    { name: "landscape", width: 300, height: 200, rail: 192 },
  ];
  const [canvas] = manifest.items;
  const multiView = {
    ...manifest,
    items: views.map(({ name, width, height }, index) => ({
      ...canvas,
      id: index ? `${canvas.id}/${name}` : canvas.id,
      label: { none: [`${name} view`] },
      thumbnail: [
        {
          id: `https://example.org/thumbs/${name}.svg`,
          type: "Image" as const,
          format: "image/svg+xml",
          width,
          height,
        },
      ],
    })),
  };
  await page.route(
    (url) => url.href === work.iiif_manifest || url.href === manifest.id,
    (route) => route.fulfill({ json: multiView }),
  );
  await page.route("https://example.org/thumbs/*.svg", (route) => {
    const { width, height } = views.find(({ name }) =>
      route.request().url().includes(`/${name}.svg`),
    )!;
    return route.fulfill({
      contentType: "image/svg+xml",
      body: `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}"><rect width="100%" height="100%" fill="#836eaa"/></svg>`,
    });
  });
  await page.goto("/search?q=fixture");
  await page.getByTestId("grid-item-link").first().click();
  await expect(page.getByTestId("title")).toBeVisible();
  const viewer = page.getByTestId("work-viewer-wrapper");
  await expect(viewer).toBeVisible();
  // The fixture's canvas has a placeholderCanvas, shown until the reader opens
  // the viewer. The toggle's name depends on whether Clover has collapsed its
  // controls ("Open image viewer" / "Expand viewer controls"), so target its
  // public class. Clover 4 draws the image itself (no OpenSeadragon); its
  // viewport takes focus.
  await viewer.locator(".clover-canvas-placeholder-toggle").first().click();
  const canvasViewport = viewer.getByTestId("clover-canvas-viewport").first();
  await expect(canvasViewport).toBeVisible();
  await expect(canvasViewport).toHaveAttribute("tabindex", "0");
  // The thumbnail rail is 128px high. Each view keeps its own width between a
  // square and twice as wide, cropped to fill (at Clover's defaults the wide
  // and tall views would be 912px and 51px wide).
  const railPictures = viewer.locator(
    '.clover-items[data-layout="slider"] .clover-items-picture',
  );
  await expect(railPictures).toHaveCount(views.length);
  await expect
    .poll(() =>
      railPictures.evaluateAll((elements) =>
        elements.map((element) => {
          const { width, height } = element.getBoundingClientRect();
          return [Math.round(width), Math.round(height)];
        }),
      ),
    )
    .toEqual(views.map(({ rail }) => [rail, 128]));
  await expect(railPictures.first().locator("img")).toHaveCSS(
    "object-fit",
    "cover",
  );
  const slider = page
    .getByTestId("related-items")
    .locator('.clover-items[data-layout="slider"]')
    .first();
  await expect(slider).toBeVisible();
  for (const width of [390, 767, 991, 1199, 1439, 1920]) {
    await page.setViewportSize({ width, height: 1000 });
    // Up to 5 across; the widest screens keep 5.
    const columns = width < 767 ? 2 : width < 991 ? 3 : width < 1199 ? 4 : 5;
    await expect
      .poll(async () =>
        slider.evaluate((element, count) => {
          const track = element.querySelector<HTMLElement>(
            ".clover-items-track",
          )!;
          const slide =
            element.querySelector<HTMLElement>(".clover-items-item")!;
          return Math.abs(
            slide.getBoundingClientRect().width * count +
              parseFloat(getComputedStyle(track).columnGap) * (count - 1) -
              track.getBoundingClientRect().width,
          );
        }, columns),
      )
      .toBeLessThan(1);
    // Cards are as far apart as the subheading is from them.
    const spacing = await slider.evaluate((element) => {
      const header = element.querySelector(".clover-items-header")!;
      const [first, second] = [
        ...element.querySelectorAll(".clover-items-picture"),
      ].map((picture) => picture.getBoundingClientRect());
      return {
        gap: second.left - first.right,
        underHeading: first.top - header.getBoundingClientRect().bottom,
      };
    });
    expect(spacing.gap).toBeCloseTo(20, 0);
    expect(spacing.underHeading).toBeCloseTo(spacing.gap, 0);
    // The arrows centre on the square pictures, and hang half off the
    // slider's edges only where the page has room beside the Container.
    const measureArrow = () =>
      slider.evaluate((element) => {
        const frame = element
          .querySelector(".clover-items-frame")!
          .getBoundingClientRect();
        const picture = element
          .querySelector(".clover-items-picture")!
          .getBoundingClientRect();
        const next = element
          .querySelector(".clover-items-scroll-next")!
          .getBoundingClientRect();
        return {
          offCentre: Math.abs(
            next.top + next.height / 2 - (picture.top + picture.height / 2),
          ),
          overhang: next.right - frame.right,
          halfControl: next.width / 2,
          pageOverflow: document.documentElement.scrollWidth - innerWidth,
        };
      });
    // Clover transitions its buttons' position, so let them settle.
    await expect
      .poll(async () => (await measureArrow()).offCentre)
      .toBeLessThan(1);
    const { halfControl } = await measureArrow();
    const overhang = expect.poll(async () => (await measureArrow()).overhang);
    if (width >= 1160) await overhang.toBeCloseTo(halfControl, 0);
    else await overhang.toBeLessThan(0);
    expect((await measureArrow()).pageOverflow).toBeLessThanOrEqual(0);
  }
  // Clover 4's scroll buttons mark the unavailable direction with aria-disabled.
  const previous = slider.getByRole("button", { name: "Show previous items" });
  await expect(previous).toBeDisabled();
  await slider.getByRole("button", { name: "Show more items" }).click();
  await expect(previous).toBeEnabled();
  await previous.click();
  await expect(previous).toBeDisabled();
  const viewAll = slider.getByRole("link", { name: "View all" });
  await expect(viewAll).toHaveAttribute("href", /\/search\?/);
  // A text link in DC purple (as SectionHeading's), not a filled pill.
  await expect(viewAll).toHaveCSS("color", "rgb(78, 42, 132)");
  await expect(viewAll).toHaveCSS("background-color", "rgba(0, 0, 0, 0)");
  await page.getByRole("button", { name: "Cite this item" }).click();
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  await expect(dialog).toHaveCSS("position", "fixed");
  await expect(dialog.getByRole("heading", { name: /Cite/ })).toBeVisible();
  await dialog.getByRole("button", { name: "Cancel", exact: true }).click();
  await expect(dialog).toBeHidden();
  expect(errors).toEqual([]);
});
