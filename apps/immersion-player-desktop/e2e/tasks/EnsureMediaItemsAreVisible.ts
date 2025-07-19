import { Task, Wait } from '@serenity-js/core';
import { LibraryPage } from '../pages/library.page.js';
import { Ensure, equals } from '@serenity-js/assertions';

export const ensureMediaItemsAreVisible = (titles: string[]) => {
  return Task.where(
    `#actor ensures media items are visible`,
    Wait.until(LibraryPage.mediaItems.count(), equals(titles.length)),
    ...titles.map((title) => Ensure.that(LibraryPage.isMediaItemVisible(title), equals(true)))
  );
};
