import { test, _electron } from '@playwright/test';
import * as path from 'node:path';
import { workspaceRoot } from '@nx/devkit';

test('has title', async () => {
  const electronEntryPoint = path.resolve(
    workspaceRoot,
    'dist/apps/immersion-player-desktop/main.js'
  );
  const videoPath = path.resolve(workspaceRoot, 'e2e-recordings');

  console.log(electronEntryPoint);
  const electronApp = await _electron.launch({
    args: [electronEntryPoint],
    recordVideo: {
      dir: videoPath,
    },
  });

  const window = await electronApp.firstWindow();

  await window.click('text=Library')

  await window.waitForTimeout(10000);


  await window.click('text=Library')

  await electronApp.close();
});
