import {Locator, Page} from "@playwright/test";

export class PlayerPage {
  readonly page: Page;
  readonly subtitles: Locator;
  readonly player: Locator;
  readonly dictionary: Locator;

  constructor(page: Page) {
    this.page = page;
    this.subtitles = page.locator('[data-testid="subtitles"] [data-testid="word"]');
    this.player = page.locator('video');
    this.dictionary = page.locator('[data-testid="dictionary"]');
  }

  async getSubtitles() {
    await this.page.locator('[data-testid="subtitles"]').waitFor({state: 'visible'});
    return await this.subtitles.allTextContents(); 
  }

  async getDefinitions(word: string) {
    await this.subtitles.getByText(word).hover();
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

  async setPlaybackPosition(seconds: number) {
    await this.page.evaluate((seconds) => {
      const video = document.querySelector('video');
      video.currentTime = seconds
    }, seconds);
  }

}
