import { dialog } from 'electron';
import Store from 'electron-store';
import { AnkiFields, SelectedAnkiFields, KnownWord, UserSettings } from '@immersion-player/shared-types';
import { YankiConnect } from 'yanki-connect';

const client = new YankiConnect();
const store = new Store();

export async function selectMediaFolder(): Promise<void> {
  const { filePaths } = await dialog.showOpenDialog({
    properties: ['openDirectory'],
  });

  store.set('mediaFolder', filePaths[0]);
}

export async function updateKnownWords(ankiFields: AnkiFields[]): Promise<void> {
  const query = ankiFields.map((field) => `note:${field.modelName}`).join('OR');
  const cardIds = await client.card.findCards({ query });
  const cards = await client.card.cardsInfo({ cards: cardIds });

  const knownWords: KnownWord[] = [];

  for (const field of ankiFields) {
    const card = cards.find((n) => n.modelName === field.modelName);
    if (!card) {
      continue;
    }

    for (const selectedField of field.fields) {
      const value = card.fields[selectedField]?.value;

      //@Todo: Implement leeches
      knownWords.push({ text: value, status: card.interval > 21 ? 'KNOWN' : 'MINED' });
    }
  }

  store.set('knownWords', knownWords);
}

export function loadSettings(): UserSettings {
  const store = new Store();
  return {
    mediaFolder: store.get('mediaFolder') as string,
    knownWords: (store.get('knownWords') as KnownWord[]) ?? [],
    selectedModelFields: store.get('modelFields') as AnkiFields[],
  };
}

export async function loadModelFields(): Promise<SelectedAnkiFields[]> {
  const modelNames = await client.model.modelNames();
  const models = await client.model.findModelsByName({ modelNames });
  const selectedFields = store.get('selectedModelFields') as AnkiFields[];

  return models.map((model) => ({
    modelName: model.name,
    fields: model.flds.map((field) => {
      const m = selectedFields.find((m) => m.modelName === model.name);
      const selected = m?.fields.find((f) => f === field.name);

      return { text: field.name, selected: !!selected };
    }),
  }));
}
