import { By, PageElement, PageElements, Text } from '@serenity-js/web';
import { equals } from '@serenity-js/assertions';

export class LibraryPage {
  static mediaItemWithTitle = (title: string) =>
    LibraryPage.mediaItems.where(Text, equals(title)).first().describedAs(`media item with text "${title}"`);

  static mediaItems = PageElements.located(By.css(`[data-testid="media"]`));
  static searchField = PageElement.located(By.css(`[data-testid="search"]`));
}
