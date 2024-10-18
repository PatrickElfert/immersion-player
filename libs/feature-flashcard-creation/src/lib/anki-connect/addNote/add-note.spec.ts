import {addNote} from './add-note';

it('should create a new note in anki', async () => {
  const response = await addNote({
    deckName: 'Test',
    modelName: 'TestModel1',
    fields: {
      Sentence: 'Whats this again ?',
    },
    options: {
      allowDuplicate: false
    },
    picture: [{
      path: `${__dirname}/test.jpg`,
      fields: ['Back'],
      filename: 'test.jpg'
    }]
  });
  expect(response.error).toBeNull()
});
