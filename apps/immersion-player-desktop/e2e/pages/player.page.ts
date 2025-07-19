import { By, PageElement, PageElements, Text } from '@serenity-js/web';
import { equals, includes } from '@serenity-js/assertions';

export class PlayerPage {
  static videoPlayer = PageElement.located(By.css('video')).describedAs('video player');
  static currentSubtitle = PageElement.located(By.css('[data-testid="currentSubtitle"] [data-testid="subtitle"]'));
  static currentSubtitleTokens = PageElements.located(By.css('[data-testid="word"]'))
    .of(PlayerPage.currentSubtitle)
    .describedAs(`current subtitle tokens`);
  static  currentSubtitleTokensText= Text.ofAll(PlayerPage.currentSubtitleTokens);

  static subtitleTokenWithText = (word: string) =>
    PlayerPage.currentSubtitleTokens.where(Text, equals(word)).first().describedAs(`subtitle word "${word}"`);

  static dictionaryPanel = PageElement.located(By.css('[data-testid="dictionary"]')).describedAs('dictionary panel');
  static deinflectedTerms = PageElements.located(By.css('[data-testid="deinflectedTerm"]')).of(
    PlayerPage.dictionaryPanel
  );
  static definitions = PageElements.located(By.css('[data-testid="definition"]'));
  static deinflectedTermWithText = (text: string) => PlayerPage.deinflectedTerms.where(Text, includes(text)).first();
}
