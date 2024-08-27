import { type Page } from "@playwright/test";

export class WorkPage {
  readonly route: string = "/items";

  constructor(public readonly page: Page) {}
}
