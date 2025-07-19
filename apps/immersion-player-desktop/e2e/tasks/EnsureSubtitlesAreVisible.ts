import { Wait } from '@serenity-js/core';
import { PlayerPage } from '../pages/player.page.js';
import { equals } from '@serenity-js/assertions';

export const ensureSubtitlesAreVisible = (subtitles: string[]) =>
  Wait.until(PlayerPage.currentSubtitleTokensText, equals(subtitles));
