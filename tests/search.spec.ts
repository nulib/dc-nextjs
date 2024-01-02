/* eslint-disable testing-library/prefer-screen-queries */

import { expect, test } from '@playwright/test';

const url = 'https://dcnextuser:dcnextpassword@preview-nextjs-latest.d2v1qbdeix3nr2.amplifyapp.com/';

test.describe('Search page component', () => {
  test('renders the global search bar and fires off a successful searches', async ({ page }) => {
    await page.goto(url);

    const searches = [
      {
        expectedResultCount: "285 results",
        term: 'Obama',
      },
      {
        expectedResultCount: "15,743 results",
        term: 'Illinois',
      },
    ];

    for (const s of searches) {
      await page.fill('form[data-testid="search-ui-component"] input', s.term);
      await page.click('text=Search');
      await expect(page).toHaveURL(`${url}?q=${s.term}`);
      await expect(page.getByTestId("results-count")).toHaveText(s.expectedResultCount);

      const gridItems = page.getByTestId("grid-item");
      expect(gridItems).toHaveCount(40);
    }

    await page.click("button[type='reset']");
    expect(page.url()).toContain(`/search`);
  });

  // ... other tests
});