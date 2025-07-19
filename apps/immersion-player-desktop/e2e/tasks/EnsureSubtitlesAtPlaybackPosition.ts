import { forwardPlayerToPlaybackPosition } from './ForwardPlayerToPlaybackPosition.js';
import { ensureSubtitlesAreVisible } from './EnsureSubtitlesAreVisible.js';
import { Task } from '@serenity-js/core';

export const ensureSubtitlesAtPlaybackPosition = (seconds: number, subtitles: string[]) => {
  return Task.where(`#actor ensures subtitles are visible at ${seconds} seconds`,
    forwardPlayerToPlaybackPosition(seconds),
    ensureSubtitlesAreVisible(subtitles)
  )
}
