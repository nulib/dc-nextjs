import { type Page, expect } from "@playwright/test";

export class SearchPage {
  readonly DEFAULT_PAGINATION_SIZE = 40;
  readonly TOTAL_RESULTS = 205;

  readonly route: string = "/search";

  constructor(public readonly page: Page) {}

  async goto() {
    await this.page.goto(this.route);
  }

  getPaginationResults = (totalCount: number) =>
    totalCount > this.DEFAULT_PAGINATION_SIZE
      ? this.DEFAULT_PAGINATION_SIZE
      : totalCount;

  async verifyGridItemCount(totalCount = 0) {
    const paginationResultsCount = this.getPaginationResults(totalCount);
    await expect(this.page.getByTestId(`grid-item`)).toHaveCount(
      paginationResultsCount
    );
  }

  async verifyTopResultsCount(count: number) {
    await expect(this.page.getByTestId(`results-count`)).toContainText(
      `${count} results`
    );
  }

  async verifyTotalsResultDisplay({
    count,
    total,
  }: {
    count: number;
    total: number;
  }) {
    await expect(this.page.getByTestId("results")).toHaveText(
      `Showing 1 to ${count} of ${total} results`
    );
  }
}
