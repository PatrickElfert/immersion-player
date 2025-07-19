import { Question } from '@serenity-js/core';
import { By, PageElement, Text } from '@serenity-js/web';
import { PlayerPage } from '../../pages/player.page.js';

export class GetDefinitions {
  static forTerm = (deinflectedTerm: string) => {
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
  };
}
