import { createFlashcard } from './feature-flashcard-creation';

describe('featureFlashcardCreation', () => {
  it.skip('should work', async () => {
    await createFlashcard({
      targetWord: '食べる',
      sentence: 'ニクさんいつもたくさん食べます',
      definitions: {
        食べます: [
          { text: 'to eat', description: '' },
          { text: 'to live on', description: '' },
        ],
      },
      timeTo: 1,
      timeFrom: 1,
    });
  });
});
