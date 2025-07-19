import { Task } from '@serenity-js/core';
import { Key, Press } from '@serenity-js/web';

export const moveToPreviousSubtitleByShortcut = () =>
  Task.where(`#actor moves to previous subtitle by shortcut`, Press.the(Key.ArrowLeft));
