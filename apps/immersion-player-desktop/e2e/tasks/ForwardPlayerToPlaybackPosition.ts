import { Task } from '@serenity-js/core';
import { ExecuteScript } from '@serenity-js/web';
import { PlayerPage } from '../pages/player.page.js';

export const forwardPlayerToPlaybackPosition = (seconds: number) => {
  return Task.where(
    `#actor seeks to ${seconds} seconds`,
    ExecuteScript.sync((video: HTMLVideoElement, seconds: number) => {
      video.currentTime = seconds;
    }).withArguments(PlayerPage.videoPlayer, seconds)
  );
};
