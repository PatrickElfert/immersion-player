import type { Page } from '@playwright/test';

export class Menu {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async toggle() {
    await this.page.locator('[data-testid="navbar-menu-button"]').click();
  }

  async selectItem(item: string) {
    this.page.locator('[data-testid="menu"]').getByText(item);
  }
}
