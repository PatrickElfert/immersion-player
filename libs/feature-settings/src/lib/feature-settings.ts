import { dialog } from 'electron';
import Store from 'electron-store';
import { UserSettings } from '@immersion-player/shared-types';
import { YankiConnect } from 'yanki-connect';

const client = new YankiConnect();

export async function selectMediaFolder(): Promise<void> {
  const { filePaths } = await dialog.showOpenDialog({
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

export async function loadNoteTypes() {
  return ['JP1KV3', 'Immersion']
  //return await client.model.modelNames();
}

export async function loadFieldsByNoteType(name: string) {
  return ['Word', 'Sentence']
  //return await client.model.findModelsByName({ modelNames: [name] });
}
