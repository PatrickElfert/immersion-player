import {addNote} from './add-note';

it('should create a new note in anki', async () => {
  const response = await addNote({
    deckName: 'Test',
    fields: {
      Front: 'Whats this again ?',
      Back: 'Another Test !',
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
