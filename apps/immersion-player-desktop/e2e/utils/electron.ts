import { workspaceRoot } from '@nx/devkit';
import { _electron, ElectronApplication } from '@playwright/test';
import { existsSync } from 'node:fs';
import * as path from 'node:path';

const platforms = {
  "macos-latest": 'dist/mac-arm64/immersion-player.app/Contents/MacOS/immersion-player',
  "windows-latest": 'dist/win32/immersion-player.exe',
  "ubuntu-latest": "dist/linux-unpacked/immersion-player"
};

export async function launchElectron(useBinary = false): Promise<ElectronApplication> {
  const execPath = path.join(
    workspaceRoot,
    platforms[process.env.PLATFORM]
  )

  if (useBinary && !existsSync(execPath)) {
    throw new Error(`Electron executable not found at: ${execPath}`);
  }

  try {
    const electronApplication = await _electron.launch({
      cwd: workspaceRoot,
      args: !useBinary ? [path.join(workspaceRoot, 'dist/apps/immersion-player-desktop/main/index.js')] : [],
      executablePath: useBinary ? execPath : undefined,
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

    return electronApplication; 

  } catch (error) {
    console.error('Error launching Electron:', error);
    throw error;
  }
}
