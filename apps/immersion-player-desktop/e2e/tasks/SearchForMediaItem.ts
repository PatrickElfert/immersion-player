import { Enter } from '@serenity-js/web';
import { LibraryPage } from '../pages/library.page.js';
import { Task } from '@serenity-js/core';

export const searchForMediaItem = (title: string) => {
  return Task.where(
    `#actor searches for media item with title "${title}"`,
    Enter.theValue('Example E01').into(LibraryPage.searchField)
  );
};
