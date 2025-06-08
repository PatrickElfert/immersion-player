import { dialog } from 'electron';
import Store from 'electron-store';
import { KnownWordMap, ModelFields, UserSettings } from '@immersion-player/shared-types';
import { YankiConnect } from 'yanki-connect';

const client = new YankiConnect();
const store = new Store<UserSettings>();

export async function selectMediaFolder(): Promise<void> {
  const { filePaths } = await dialog.showOpenDialog({
    properties: ['openDirectory'],
  });

  store.set('mediaFolder', filePaths[0]);
}

export async function selectModelFields(modelFields: ModelFields): Promise<void> {
  store.set('modelFields', modelFields);
}

export async function getKnownWords(modelFields: ModelFields): Promise<KnownWordMap> {
  const query = Object.keys(modelFields)
    .map((modelName) => `"note:${modelName}"`)
    .join(' OR ');

  if (query === '') {
    return {};
  }

  let knownWords: KnownWordMap = {};

  try {
    const cardIds = await client.card.findCards({ query });
    const cards = await client.card.cardsInfo({ cards: cardIds });

    for (const [modelName, modelValue] of Object.entries(modelFields)) {
      const filteredCards = cards.filter((n) => n.modelName === modelName);
      const selectedFields = modelValue.fields.filter((f) => f.selected);

      for (const card of filteredCards) {
        for (const selectedField of selectedFields) {
          const value = card.fields[selectedField.text]?.value;

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
  const modelFields = store.get('modelFields') ?? {};
  const modelsWithSelectedFields = Object.fromEntries(
    Object.entries(modelFields).filter(([_, modelValue]) => modelValue.fields.some((f) => f.selected))
  );

  const knownWords = await getKnownWords(modelsWithSelectedFields);
  return Object.values(knownWords).filter((knownWord) => knownWord.status === 'KNOWN').length;
}

export function loadSettings(): UserSettings {
  return {
    mediaFolder: store.get('mediaFolder'),
    modelFields: store.get('modelFields'),
    knownWords: store.get('knownWords'),
  };
}

export async function loadModelFields(): Promise<ModelFields> {
  const modelNames = await client.model.modelNames();
  const models = await client.model.findModelsByName({ modelNames });
  const modelFields = store.get('modelFields') ?? {};

  for (const model of models) {
    if (!modelFields[model.name]) {
      modelFields[model.name] = { fields: [] };
    }

    modelFields[model.name].fields = model.flds.map((field) => {
      const selected = modelFields[model.name]?.fields?.find((f) => f.text === field.name)?.selected;
      return { text: field.name, selected: !!selected };
    });
  }

  return modelFields;
}
