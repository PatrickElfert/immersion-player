import { workspaceRoot } from '@nx/devkit';
import { _electron, ElectronApplication } from '@playwright/test';
import * as path from 'node:path';

const platforms = {
  "macos-latest": 'dist/mac-arm64/immersion-player.app/Contents/MacOS/immersion-player',
  "windows-latest": 'dist/win32/immersion-player.exe',
  "ubuntu-latest": "dist/linux-x64/immersion-player"
};

export async function launchElectron(): Promise<ElectronApplication> {
  const videoPath = path.resolve(workspaceRoot, 'e2e-recordings');
  console.log(platforms[process.env.PLATFORM])
  console.log(workspaceRoot)
  return await _electron.launch({
    executablePath: path.join(
      workspaceRoot,
      platforms[process.env.PLATFORM]
    ),
    recordVideo: {
      dir: videoPath,
    },
  });
}
