import { test } from '@serenity-js/playwright-test';
import type {ElectronApplication} from '@playwright/test';
import { LibraryPage } from "./pages/library.page.js";
import { launchElectron } from "./utils/electron.js";
import { Actor, actorCalled, Wait, WaitUntil } from '@serenity-js/core';
import { BrowseTheWebWithPlaywright } from '@serenity-js/playwright';
import { NavigateByMenu } from './tasks/NavigateByMenu.js';
import { MediaItemIsVisible } from './questions/library/MediaItems.js';
import { Ensure, equals } from '@serenity-js/assertions';
import { Enter } from '@serenity-js/web';

let electronApp: ElectronApplication;
let actor: Actor;

test.beforeEach(async () => {
  electronApp = await launchElectron()
  const page = await electronApp.firstWindow()

  if(!page) {
    throw new Error('Could not get window');
  }

  actor = actorCalled('Patrick').whoCan(BrowseTheWebWithPlaywright.usingPage(page))
});

test.afterEach(async () => {
  if (electronApp) {
    await electronApp.close();
  }
});

test('Load and display existing media', async () => {
  await actor.attemptsTo(NavigateByMenu.toPage('Library'))
  await actor.attemptsTo(Ensure.that(MediaItemIsVisible.withTitle('Example E01'), equals(true)));
  await actor.attemptsTo(Ensure.that(MediaItemIsVisible.withTitle('Example E02'), equals(true)));
});

test('Search for specific media', async () => {
  await actor.attemptsTo(NavigateByMenu.toPage('Library'))
  await actor.attemptsTo(Enter.theValue('Example E01').into(LibraryPage.searchField));
  await actor.attemptsTo(Wait.until(LibraryPage.mediaItems.count(), equals(1)));
  await actor.attemptsTo(Ensure.that(MediaItemIsVisible.withTitle('Example E01'), equals(true)));
})
