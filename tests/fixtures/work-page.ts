import { type Page } from "@playwright/test";

export const CANARY_WORK_ID = "cb8a19a7-3dec-47f3-80c0-12872ae61f8f";

export class WorkPage {
  readonly route: string = `/items/${CANARY_WORK_ID}`;

  constructor(public readonly page: Page) {}

  async goto() {
    await this.page.goto(this.route);
  }
}
