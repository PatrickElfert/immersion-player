import { workspaceRoot } from '@nx/devkit';
import { _electron, ElectronApplication } from '@playwright/test';
import { existsSync } from 'node:fs';
import * as path from 'node:path';
import { execPath } from 'node:process';

const platforms = {
  "macos-latest": 'dist/mac-arm64/immersion-player.app/Contents/MacOS/immersion-player',
  "windows-latest": 'dist/win32/immersion-player.exe',
  "ubuntu-latest": "dist/linux-x64/immersion-player"
};

export async function launchElectron(): Promise<ElectronApplication> {
  //const videoPath = path.resolve(workspaceRoot, 'e2e-recordings');
  const execPath = path.join(
    workspaceRoot,
    platforms[process.env.PLATFORM]
  )

  if (!existsSync(execPath)) {
    throw new Error(`Electron executable not found at: ${execPath}`);
  }

  try {
    return await _electron.launch({
      executablePath: execPath,
      timeout: 60000,
    });
  } catch (error) {
    console.error('Error launching Electron:', error);
    throw error;
  }
}
