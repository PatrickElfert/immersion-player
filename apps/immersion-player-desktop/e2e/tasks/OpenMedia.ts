import { LibraryPage } from '../pages/library.page.js';
import { Click } from '@serenity-js/web';
import { Task, Wait } from '@serenity-js/core';
import { equals } from '@serenity-js/assertions';

export class OpenMedia {
  static withTitle = (title: string) =>
    Task.where(`#actor opens media item with title "${title}"`,
      Wait.until(LibraryPage.mediaItemWithTitle(title).isPresent(), equals(true)),
      Click.on(LibraryPage.mediaItemWithTitle(title)));
}
