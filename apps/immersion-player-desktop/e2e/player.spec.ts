import { test, expect } from '@playwright/test';
import type { ElectronApplication } from '@playwright/test';
import { launchElectron } from './utils/electron.js';
import { PlayerPage } from './pages/player.page.js';
import { LibraryPage } from './pages/library.page.js';

let electronApp: ElectronApplication;
let playerPage: PlayerPage;
let libraryPage: LibraryPage;

test.beforeEach(async () => {
  electronApp = await launchElectron();
  const page = await electronApp.firstWindow();

  if (!page) {
    throw new Error('Could not get window');
  }

  libraryPage = new LibraryPage(page);
  playerPage = new PlayerPage(page);

  await libraryPage.open();
  await libraryPage.media.first().click();
});

test.afterEach(async () => {
  if (electronApp) {
    await electronApp.close();
  }
});

test('Display subtitles at specific playback position', async () => {
  await playerPage.setPlaybackPosition(3);
  await expect(playerPage.currentSubtitle).toHaveText(['今日', 'は', '友達', 'と', '学校', 'に', '行きます']);
});

test('Display definitions in overlay', async () => {
  await playerPage.setPlaybackPosition(3);
  const definitions = await playerPage.getDefinitions('は');
  expect(definitions).toEqual([
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
  ]);
});

test('Navigating between subtitles with keyboard shortcuts', async () => {
  await playerPage.nextSubtitle();
  await expect(playerPage.currentSubtitle).toHaveText(['今日', 'は', '友達', 'と', '学校', 'に', '行きます']);

  await playerPage.nextSubtitle();
  await expect(playerPage.currentSubtitle).toHaveText(['電車', 'で', '行く', '予定', 'です']);

  await playerPage.nextSubtitle();
  await expect(playerPage.currentSubtitle).toHaveText(['少し', '遅れ', 'そうです']);

  await playerPage.previousSubtitle();
  await expect(playerPage.currentSubtitle).toHaveText(['電車', 'で', '行く', '予定', 'です']);
});
