import { test } from '@playwright/test';
import type { ElectronApplication } from '@playwright/test';
import { launchElectron } from './utils/electron.js';
import { Actor, actorCalled } from '@serenity-js/core';
import { BrowseTheWebWithPlaywright } from '@serenity-js/playwright';
import { openMediaItem } from './tasks/OpenMediaItem.js';
import { forwardPlayerToPlaybackPosition } from './tasks/ForwardPlayerToPlaybackPosition.js';
import { moveToNextSubtitleByShortcut } from './tasks/MoveToNextSubtitleByShortcut.js';
import { ensureSubtitlesAreVisible } from './tasks/EnsureSubtitlesAreVisible.js';
import { ensureSubtitlesAtPlaybackPosition } from './tasks/EnsureSubtitlesAtPlaybackPosition.js';
import { moveToPreviousSubtitleByShortcut } from './tasks/MoveToPreviousByShortcut.js';
import { ensureDefinitionsForWordInActiveSubtitles } from './tasks/EnsureDefinitionsForWord.js';

let electronApp: ElectronApplication;
let actor: Actor;

test.beforeEach(async () => {
  electronApp = await launchElectron();
  const page = await electronApp.firstWindow();

  if (!page) {
    throw new Error('Could not get window');
  }

  actor = actorCalled('Patrick').whoCan(BrowseTheWebWithPlaywright.usingPage(page));
  await actor.attemptsTo(openMediaItem('Example E01'));
});

test.afterEach(async () => {
  if (electronApp) {
    await electronApp.close();
  }
});

test('Display subtitles at specific playback position', async () => {
  await actor.attemptsTo(ensureSubtitlesAtPlaybackPosition(3, ['今日', 'は', '友達', 'と', '学校', 'に', '行きます']));
});

test('Display definitions in overlay', async () => {
  await actor.attemptsTo(
    forwardPlayerToPlaybackPosition(3),
    ensureDefinitionsForWordInActiveSubtitles('は', [
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
  );
});

test('Navigating between subtitles with keyboard shortcuts', async () => {
  await actor.attemptsTo(
    moveToNextSubtitleByShortcut(),
    ensureSubtitlesAreVisible(['今日', 'は', '友達', 'と', '学校', 'に', '行きます']),
    moveToNextSubtitleByShortcut(),
    ensureSubtitlesAreVisible(['電車', 'で', '行く', '予定', 'です']),
    moveToNextSubtitleByShortcut(),
    ensureSubtitlesAreVisible(['少し', '遅れ', 'そうです']),
    moveToPreviousSubtitleByShortcut(),
    ensureSubtitlesAreVisible(['電車', 'で', '行く', '予定', 'です'])
  );
});

test('Creating flashcards for multiple unknown words', async () => {});
