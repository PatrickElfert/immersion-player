import { test, ElectronApplication, expect } from '@playwright/test';
import { launchElectron } from "./utils/electron";
import { PlayerPage } from './pages/player.page';
import { LibraryPage } from './pages/library.page';

let electronApp: ElectronApplication;
let playerPage: PlayerPage;
let libraryPage: LibraryPage;

test.beforeEach(async () => {
  electronApp = await launchElectron()
  const page = await electronApp.firstWindow()

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

test('It should display the correct subtitles', async () => {
  await playerPage.setPlaybackPosition(3);
  const subtitles = await playerPage.getSubtitles();
  expect(subtitles).toEqual([
    '今日',
    'は',
    '友達',
    'と',
    '学校',
    'に',
    '行きます'
  ])
});

test('It should display the correct translations', async () => {
  await playerPage.setPlaybackPosition(3);
  const definitions = await playerPage.getDefinitions('は');
  expect(definitions).toEqual([{
    text: 'indicates sentence topic',
    description: 'pronounced わ in modern Japanese'
  }, {
    text: 'indicates contrast with another option (stated or unstated)',
    description: ''
  }, {
    text: 'adds emphasis',
    description: ''
  }])
});
