import { workspaceRoot } from '@nx/devkit';
import { _electron } from '@playwright/test';
import type { ElectronApplication } from '@playwright/test';
import { existsSync } from 'node:fs';
import * as path from 'node:path';

const platforms = {
  'macos-latest': 'dist/mac-arm64/immersion-player.app/Contents/MacOS/immersion-player',
  'windows-latest': 'dist/win32/immersion-player.exe',
  'ubuntu-latest': 'dist/linux-unpacked/immersion-player',
};

export async function launchElectron(useBinary = false): Promise<ElectronApplication> {
  const platform = process.env.PLATFORM as keyof typeof platforms;
  const execPath = useBinary ? path.join(workspaceRoot, platforms[platform]) : undefined;

  if (useBinary && execPath && !existsSync(execPath)) {
    throw new Error(`Electron executable not found at: ${execPath}`);
  }

  try {
    const electronApplication = await _electron.launch({
      cwd: workspaceRoot,
      args: !useBinary
        ? ['dist/apps/immersion-player-desktop/main/index.js', '--no-sandbox']
        : ['--no-sandbox'],
      executablePath: execPath,
      timeout: 60000,
      recordVideo: {
        dir: path.join(workspaceRoot, '/videos')
      },
      env: {
        DISPLAY: ':99',
        ELECTRON_IS_DEV: '1',
        ELECTRON_RENDERER_URL: 'http://localhost:4200',
        ELECTRON_ENABLE_LOGGING: 'true',
      },
    });

    if (!electronApplication) {
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

  const proc = electronApplication.process();
  proc?.stdout?.on('data', (data) => {
    console.log(`[main stdout] ${data.toString().trim()}`);
  });
  proc?.stderr?.on('data', (data) => {
    console.error(`[main stderr] ${data.toString().trim()}`);
  });

  return electronApplication;
}
