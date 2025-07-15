import type {Locator, Page} from '@playwright/test';

export class PlayerPage {
  readonly page: Page;
  readonly currentSubtitle: Locator;
  readonly player: Locator;
  readonly dictionary: Locator;

  constructor(page: Page) {
    this.page = page;
    this.currentSubtitle = page.locator('[data-testid="currentSubtitle"] [data-testid="subtitle"] [data-testid="word"]');
    this.player = page.locator('video');
    this.dictionary = page.locator('[data-testid="dictionary"]');
  }

  async getDefinitions(word: string) {
    await this.currentSubtitle.getByText(word).hover()
    await this.dictionary.waitFor({state: 'visible'});
    const deinflectedTerm = this.dictionary.locator('[data-testid="deinflectedTerm"]').first();
    const definitions = await deinflectedTerm.locator('[data-testid="definition"]').all();

    const results = [];
    for (const definition of definitions) {
      const text = await definition.locator('[data-testid="word"]').textContent();
      const description = await definition.locator('[data-testid="description"]').textContent();
      results.push({ text, description });
    }

    return results;
  }

  async nextSubtitle() {
    await this.page.keyboard.press('ArrowRight');
  }

  async previousSubtitle() {
    await this.page.keyboard.press('ArrowLeft');
  }

  async play() {
    await this.page.keyboard.press(' ')
  }

  async setPlaybackPosition(seconds: number) {
    await this.player.waitFor({state: 'visible'});
    await this.page.evaluate((seconds) => {
      const video = document.querySelector('video');
      if(video) {
        video.currentTime = seconds
      }
    }, seconds);
  }

}
