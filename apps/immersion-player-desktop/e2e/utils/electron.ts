import { workspaceRoot } from '@nx/devkit';
import { _electron, ElectronApplication } from '@playwright/test';
import * as path from 'node:path';

const platforms = {
  "macos-latest": 'dist/executables/mac-arm64/ImmersionPlayer.app/Contents/MacOS/ImmersionPlayer',
  "windows-latest": 'dist/executables/win32/ImmersionPlayer.exe',
  "ubuntu-latest": "dist/executables/linux-x64/ImmersionPlayer"
};

export async function launchElectron(): Promise<ElectronApplication> {
  const videoPath = path.resolve(workspaceRoot, 'e2e-recordings');
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
