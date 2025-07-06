import { workspaceRoot } from '@nx/devkit';
import { _electron } from '@playwright/test';
import type {ElectronApplication} from '@playwright/test';
import { existsSync } from 'node:fs';
import * as path from 'node:path';

const platforms = {
  "macos-latest": 'dist/mac-arm64/immersion-player.app/Contents/MacOS/immersion-player',
  "windows-latest": 'dist/win32/immersion-player.exe',
  "ubuntu-latest": "dist/linux-unpacked/immersion-player"
};

export async function launchElectron(useBinary = false): Promise<ElectronApplication> {
  const execPath = useBinary ? path.join(
    workspaceRoot,
    platforms[process.env.PLATFORM]
  ) : undefined;

  if (useBinary && !existsSync(execPath)) {
    throw new Error(`Electron executable not found at: ${execPath}`);
  }

  try {
    const electronApplication = await _electron.launch({
      cwd: workspaceRoot,
      args: !useBinary ? [path.join(workspaceRoot, 'dist/apps/immersion-player-desktop/main/index.js')] : [],
      executablePath: execPath,
      timeout: 60000,
      env: {
        ELECTRON_IS_DEV: '1',
        ELECTRON_RENDERER_URL: 'http://localhost:4200',
        ELECTRON_ENABLE_LOGGING: "true"
      }
    });

    if(!electronApplication) {
      throw Error('Electron application is undefined');
    }

    return withLogging(electronApplication);

  } catch (error) {
    console.error('Error launching Electron:', error);
    throw error;
  }
}

function withLogging(electronApplication: ElectronApplication) {
  electronApplication.on('window', async (page) => {
    page.on('console', (msg) => {
      console.log(`[renderer console] ${msg.type()}: ${msg.text()}`);
    });
  });

  electronApplication.on('console', (msg) => {
    console.log(`[main console] ${msg.type()}: ${msg.text()}`);
  });
  return electronApplication;
}
