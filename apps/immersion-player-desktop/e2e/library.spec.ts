import { test, expect } from '@playwright/test';
import type {ElectronApplication} from '@playwright/test';
import { LibraryPage } from "./pages/library.page.js";
import { launchElectron } from "./utils/electron.js";

let electronApp: ElectronApplication;
let libraryPage: LibraryPage;

test.beforeEach(async () => {
  electronApp = await launchElectron()
  const page = await electronApp.firstWindow()

  if(!page) {
    throw new Error('Could not get window');
  }

  libraryPage = new LibraryPage(page);
});

test.afterEach(async () => {
  if (electronApp) {
    await electronApp.close();
  }
});

test('Load and display existing media', async () => {

  await libraryPage.open();
  await expect(libraryPage.media.first().getByText('Example E01')).toBeVisible();
  await expect(libraryPage.media.nth(1).getByText('Example E02')).toBeVisible();
});

test('Search for specific media', async () => {
  await libraryPage.open();
  await libraryPage.searchFor('Example E01')
  await expect(libraryPage.media.getByText('Example E01')).toBeVisible();
})
