import { Task, Wait } from '@serenity-js/core';
import { PlayerPage } from '../pages/player.page.js';
import { Ensure, equals } from '@serenity-js/assertions';
import { Hover } from '@serenity-js/web';

export const ensureDefinitionsForWordInActiveSubtitles = (word: string, term: string) => {
  return Task.where(
    `#actor ensures definitions for word "${word}" in current subtitles`,
    Wait.until(PlayerPage.currentSubtitle.isVisible(), equals(true)),
    Hover.over(PlayerPage.subtitleTokenWithText(word)),
    Wait.until(PlayerPage.dictionaryPanel.isVisible(), equals(true)),
    Ensure.that(
      PlayerPage.definitionsForDeinflectedTerm(word),
      equals([
        {
          text: 'indicates sentence topic',
          description: 'pronounced わ in modern Japanese',
        },
        {
          text: 'indicates contrast with another option (stated or unstated)',
          description: '',
        },
        {
          text: 'adds emphasis',
          description: '',
        },
      ])
    )
  );
};
