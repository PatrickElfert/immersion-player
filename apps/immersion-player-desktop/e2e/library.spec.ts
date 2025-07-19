import { test } from '@serenity-js/playwright-test';
import type { ElectronApplication } from '@playwright/test';
import { launchElectron } from './utils/electron.js';
import { Actor, actorCalled } from '@serenity-js/core';
import { BrowseTheWebWithPlaywright } from '@serenity-js/playwright';
import { navigateByMenu } from './tasks/NavigateByMenu.js';
import { ensureMediaItemsAreVisible } from './tasks/EnsureMediaItemsAreVisible.js';
import { searchForMediaItem } from './tasks/SearchForMediaItem.js';

let electronApp: ElectronApplication;
let actor: Actor;

test.beforeEach(async () => {
  electronApp = await launchElectron();
  const page = await electronApp.firstWindow();

  if (!page) {
    throw new Error('Could not get window');
  }

  actor = actorCalled('Patrick').whoCan(BrowseTheWebWithPlaywright.usingPage(page));
});

test.afterEach(async () => {
  if (electronApp) {
    await electronApp.close();
  }
});

test('Load and display existing media', async () => {
  await actor.attemptsTo(navigateByMenu('Library'), ensureMediaItemsAreVisible(['Example E01', 'Example E02']));
});

test('Search for specific media', async () => {
  await actor.attemptsTo(
    navigateByMenu('Library'),
    searchForMediaItem('Example E01'),
    ensureMediaItemsAreVisible(['Example E01'])
  );
});
