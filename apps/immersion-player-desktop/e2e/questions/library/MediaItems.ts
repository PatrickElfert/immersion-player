import { Question } from '@serenity-js/core';
import { LibraryPage } from '../../pages/library.page.js';

export class MediaItemIsVisible {
  static withTitle = (title: string) =>
    Question.about(`whether media item with title "${title}" is visible`, (actor) =>
      LibraryPage.mediaItemWithTitle(title).isVisible().answeredBy(actor)
    );
}
