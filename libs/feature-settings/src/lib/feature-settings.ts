import { dialog } from 'electron';
import Store from 'electron-store';
import {UserSettings} from '@immersion-player/shared-types'

export async function selectMediaFolder(): Promise<void> {
  const {filePaths} = await dialog.showOpenDialog({
    properties: ['openDirectory'],
  });

  const store = new Store();
  store.set('mediaFolder', filePaths[0]);
}

export function loadSettings(): UserSettings {
  const store = new Store();
  return {
    mediaFolder: store.get('mediaFolder') as string,
  };
}