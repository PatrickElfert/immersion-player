import { By, PageElement, PageElements, Text } from '@serenity-js/web';
import { equals, includes } from '@serenity-js/assertions';
import { Question } from '@serenity-js/core';

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

  static definitionsForDeinflectedTerm = (deinflectedTerm: string) => {
    return Question.about(`definitions of ${deinflectedTerm}`, async (actor) => {
      const definitions = await PlayerPage.definitions
        .of(PlayerPage.deinflectedTermWithText(deinflectedTerm))
        .answeredBy(actor);
      const results: { description: string; text: string }[] = [];

      for (const definition of definitions) {
        const text = await Text.of(PageElement.located(By.css('[data-testid="word"]')).of(definition)).answeredBy(
          actor
        );
        const description = await Text.of(
          PageElement.located(By.css('[data-testid="description"]')).of(definition)
        ).answeredBy(actor);
        results.push({ text, description });
      }

      return results;
    });
  }

}
