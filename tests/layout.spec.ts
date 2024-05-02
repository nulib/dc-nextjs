import { expect, test } from "@playwright/test";

test("top header renders logo and links", async ({ page }) => {
  await page.goto("/");

  // Renders the Northwestern logo
  await expect(page.getByTestId("northwestern-logo")).toBeVisible();

  // Renders the main navigation links
  const navEl = page.getByTestId("super-nav");

  await expect(
    navEl.getByRole("link", { exact: true, name: "Libraries" })
  ).toHaveAttribute("href", "https://www.library.northwestern.edu/");

  await expect(
    navEl.getByRole("link", { exact: true, name: "About" })
  ).toHaveAttribute("href", "/about");

  await expect(
    navEl.getByRole("link", { exact: true, name: "Contact" })
  ).toHaveAttribute("href", "/contact");

  await expect(navEl.getByRole("link", { name: "Sign in" })).toBeVisible();
});

test("footer renders", async ({ page }) => {
  await page.goto("/");

  const footerEl = page.getByTestId("footer");

  // This component is coming from NUL Design System; not necessary to test everything in it
  await expect(footerEl).toBeVisible();
  await expect(
    footerEl.getByAltText("Northwestern University logo")
  ).toBeVisible();

  // Display NUL ethics message
  await expect(
    page.getByText(
      "Northwestern University Libraries is dedicated to the fair and ethical"
    )
  ).toBeVisible();
});
