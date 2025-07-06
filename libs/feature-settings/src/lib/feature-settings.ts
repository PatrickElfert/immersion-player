import { dialog } from 'electron';
import Store from 'electron-store';
import {
  KnownWordMap,
  ModelFields,
  SelectedModelFields,
  UpdateFieldMappingPayload,
  UserSettings,
} from '@immersion-player/shared-types';
import { YankiConnect } from 'yanki-connect';

const client = new YankiConnect();
const store = new Store<UserSettings>();

export async function selectMediaFolder(): Promise<void> {
  const { filePaths } = await dialog.showOpenDialog({
    properties: ['openDirectory'],
  });
  store.set('mediaFolder', filePaths[0]);
}

export async function updateModelFields(payload: UpdateFieldMappingPayload): Promise<void> {
  const selectedFields = store.get('selectedFields') ?? {};

  if (selectedFields) {
    selectedFields[payload.modelName] = { selectedFields: payload.selectedFields };
  }

  store.set('selectedFields', selectedFields);
}

export async function getKnownWords(selectedFields: SelectedModelFields): Promise<KnownWordMap> {
  const query = Object.keys(selectedFields)
    .map((modelName) => `"note:${modelName}"`)
    .join(' OR ');

  if (query === '') {
    return {};
  }

  let knownWords: KnownWordMap = {};

  try {
    const cardIds = await client.card.findCards({ query });
    const cards = await client.card.cardsInfo({ cards: cardIds });

    for (const [modelName, modelValue] of Object.entries(selectedFields)) {
      const filteredCards = cards.filter((n) => n.modelName === modelName);
      const selectedFields = modelValue.selectedFields;

      for (const card of filteredCards) {
        for (const selectedField of selectedFields) {
          const value = card.fields[selectedField]?.value;

          //@Todo: Implement leeches
          knownWords[value] = { status: card.interval > 21 ? 'KNOWN' : 'MINED' };
        }
      }
    }

    store.set('knownWords', knownWords);
  } catch (error) {
    knownWords = store.get('knownWords', {});
  }

  return knownWords;
}

export async function getKnownWordsStats() {
  const selectedFields = store.get('selectedFields') ?? {};
  const knownWords = await getKnownWords(selectedFields);
  return Object.values(knownWords).filter((knownWord) => knownWord.status === 'KNOWN').length;
}

export function loadSettings(): UserSettings {
  return {
    mediaFolder: store.get('mediaFolder'),
    selectedFields: store.get('selectedFields'),
    knownWords: store.get('knownWords'),
  };
}

export async function loadModelFields(): Promise<ModelFields> {
  const modelNames = await client.model.modelNames();
  const models = await client.model.findModelsByName({ modelNames });
  const selectedFields = store.get('selectedFields') ?? {};

  const modelFields: ModelFields = {};

  for (const model of models) {
    if (!modelFields[model.name]) {
      modelFields[model.name] = { fields: [] };
    }

    modelFields[model.name].fields = model.flds.map((fld) => {
      const selected = selectedFields[model.name]?.selectedFields?.find((field) => field === fld.name);
      return { text: fld.name, selected: !!selected };
    });
  }

  return modelFields;
}
