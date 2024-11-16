import {Locator, Page} from "@playwright/test";

export class LibraryPage {
  readonly page: Page;
  readonly media: Locator;
  readonly search: Locator;

  constructor(page: Page) {
    this.page = page;
    this.media = page.locator('[data-testid="media"]')
    this.search = page.locator('[data-testid="search"]');
  }

  async open(): Promise<void> {
    await this.page.locator('[data-testid="menu"]').getByText('Library').click();
  }

  async searchFor(text: string): Promise<void> {
    await this.search.fill(text);
  }
}
