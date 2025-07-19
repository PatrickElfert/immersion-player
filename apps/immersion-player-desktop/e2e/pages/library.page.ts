import { By, Click, PageElement, PageElements, Text } from '@serenity-js/web';
import { equals } from '@serenity-js/assertions';
import { Question } from '@serenity-js/core';

export class LibraryPage {
  static mediaItemWithTitle = (title: string) =>
    LibraryPage.mediaItems.where(Text, equals(title)).first().describedAs(`media item with text "${title}"`);

  static mediaItems = PageElements.located(By.css(`[data-testid="media"]`));
  static searchField = PageElement.located(By.css(`[data-testid="search"]`));

  static isMediaItemVisible = (title: string) =>
    Question.about(`whether media item with title "${title}" is visible`, (actor) =>
      LibraryPage.mediaItemWithTitle(title).isVisible().answeredBy(actor)
    );
}
