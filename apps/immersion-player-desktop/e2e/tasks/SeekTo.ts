import { MetaQuestion, Question, Task } from '@serenity-js/core';
import { ExecuteScript, PageElement } from '@serenity-js/web';


export class SeekTo {
  static seconds = {
    on: (player: MetaQuestion<PageElement, any>) => ({
      at: (seconds: number) =>
        Task.where(`#actor seeks to ${seconds} seconds`,
          ExecuteScript.sync(
            (video: HTMLVideoElement, seconds: number) => {
              video.currentTime = seconds;
            }
          ).withArguments(player, seconds)
        )
    })
  }
}
