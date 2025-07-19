import { Key, Press } from '@serenity-js/web';
import { Task } from '@serenity-js/core';

export const moveToNextSubtitleByShortcut = () =>
  Task.where(`#actor moves to next subtitle by shortcut`, Press.the(Key.ArrowRight));
