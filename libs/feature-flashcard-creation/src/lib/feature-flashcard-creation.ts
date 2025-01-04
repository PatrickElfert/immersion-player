import { YankiConnect } from 'yanki-connect';
import { CreateFlashcardDto } from '@immersion-player/shared-types';
import { backTemplate } from './templates/back';
import { frontTemplate } from './templates/front';

const client = new YankiConnect();
const MODEL_NAME = 'ImmersionPlayer';
const DECK_NAME = 'ImmersionPlayer';

export async function createFlashcard(flashcard: CreateFlashcardDto) {
  const deckNames = await client.deck.deckNames();
  const modelNames = await client.model.modelNames();

  const deckExists = deckNames.find((deckName) => deckName === DECK_NAME);
  const modelExists = modelNames.find((modelName) => modelName === MODEL_NAME);

  if (!modelExists) {
    await client.model.createModel({
      modelName: MODEL_NAME,
      cardTemplates: [
        {
          Back: backTemplate,
          Front: frontTemplate,
        },
      ],
      inOrderFields: ['sentence', 'definitions', 'targetWord'],
    });
  }

  if (!deckExists) {
    await client.deck.createDeck({ deck: DECK_NAME });
  }

  await client.note.addNote({
    note: {
      deckName: DECK_NAME,
      modelName: MODEL_NAME,
      fields: {
        sentence: flashcard.sentence,
        definitions: Object.values(flashcard.definitions)
          .flatMap((d) => d.map((d) => d.text))
          .join(';'),
        targetWord: flashcard.targetWord,
      },
    },
  });
}
