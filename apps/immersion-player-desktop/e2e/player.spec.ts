import { test, expect } from '@playwright/test';
import type { ElectronApplication } from '@playwright/test';
import { launchElectron } from './utils/electron.js';
import { Actor, actorCalled, Duration, Wait, WaitUntil } from '@serenity-js/core';
import { BrowseTheWebWithPlaywright } from '@serenity-js/playwright';
import { OpenMedia } from './tasks/OpenMedia.js';
import { SeekTo } from './tasks/SeekTo.js';
import { PlayerPage } from './pages/player.page.js';
import { Ensure, equals } from '@serenity-js/assertions';
import { Hover } from '@serenity-js/web';
import { GetDefinitions } from './questions/player/Definitions.js';

let electronApp: ElectronApplication;
let actor: Actor;

test.beforeEach(async () => {
  electronApp = await launchElectron();
  const page = await electronApp.firstWindow();

  if (!page) {
    throw new Error('Could not get window');
  }

  actor = actorCalled('Patrick').whoCan(BrowseTheWebWithPlaywright.usingPage(page));
  await actor.attemptsTo(OpenMedia.withTitle('Example E01'));
});

test.afterEach(async () => {
  if (electronApp) {
    await electronApp.close();
  }
});

test('Display subtitles at specific playback position', async () => {
  await actor.attemptsTo(SeekTo.seconds.on(PlayerPage.videoPlayer).at(3));
  await actor.attemptsTo(Wait.until(PlayerPage.currentSubtitleTokensText, equals(['今日', 'は', '友達', 'と', '学校', 'に', '行きます'])));
});

test('Display definitions in overlay', async () => {
  await actor.attemptsTo(SeekTo.seconds.on(PlayerPage.videoPlayer).at(3));
  await actor.attemptsTo(Wait.until(PlayerPage.currentSubtitle.isVisible(), equals(true)))
  await actor.attemptsTo(Hover.over(PlayerPage.subtitleTokenWithText('は')));
  await actor.attemptsTo(Wait.until(PlayerPage.dictionaryPanel.isVisible(), equals(true)));
  await actor.attemptsTo(Ensure.that(GetDefinitions.forTerm('は'), equals(
    [
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
    ]
  )))
});
//
// test('Navigating between subtitles with keyboard shortcuts', async () => {
//   await playerPage.nextSubtitle();
//   await expect(playerPage.currentSubtitle).toHaveText(['今日', 'は', '友達', 'と', '学校', 'に', '行きます']);
//
//   await playerPage.nextSubtitle();
//   await expect(playerPage.currentSubtitle).toHaveText(['電車', 'で', '行く', '予定', 'です']);
//
//   await playerPage.nextSubtitle();
//   await expect(playerPage.currentSubtitle).toHaveText(['少し', '遅れ', 'そうです']);
//
//   await playerPage.previousSubtitle();
//   await expect(playerPage.currentSubtitle).toHaveText(['電車', 'で', '行く', '予定', 'です']);
// });
