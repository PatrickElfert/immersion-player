import {test, expect, ElectronApplication} from '@playwright/test';
import {LibraryPage} from "./pages/library.page";
import {launchElectron} from "./utils/electron";

let electronApp: ElectronApplication;
let page: LibraryPage;

test.beforeEach(async () => {
  electronApp = await launchElectron()
  page = new LibraryPage(await electronApp.firstWindow());
});

test.afterEach(async () => {
  await electronApp.close();
});

test('Load and display existing media', async () => {

  await page.open();
  await expect(page.media).toHaveCount(2)
  await expect(page.media.first().getByText('Example E01')).toBeVisible();
  await expect(page.media.nth(1).getByText('Example E02')).toBeVisible();
});

test('Search for specific media', async() => {
  await page.open();
  await page.searchFor('Example E01')
  await expect(page.media.getByText('Example E01')).toBeVisible();
})
