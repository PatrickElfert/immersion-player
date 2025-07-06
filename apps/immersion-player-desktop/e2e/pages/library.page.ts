import type {Locator, Page} from "@playwright/test";
import { Menu } from '../components/menu.js';

export class LibraryPage {
  readonly page: Page;
  readonly media: Locator;
  readonly search: Locator;
  readonly menu: Menu;

  constructor(page: Page) {
    this.page = page;
    this.media = page.locator('[data-testid="media"]')
    this.search = page.locator('[data-testid="search"]');
    this.menu = new Menu(page);
  }

  async open(): Promise<void> {
   await this.menu.selectItem('Library');
  }

  async searchFor(text: string): Promise<void> {
    await this.search.fill(text);
  }
}
