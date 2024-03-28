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
