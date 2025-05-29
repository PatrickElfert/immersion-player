import { dialog } from 'electron';
import Store from 'electron-store';

export async function selectMediaFolder(): Promise<void> {
  console.log('selectMediaFolder');
  const {filePaths} = await dialog.showOpenDialog({
    properties: ['openDirectory'],
  });

  const store = new Store();
  store.set('mediaFolder', filePaths[0]);
}
