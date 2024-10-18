import { createModel } from './create-model';

it('should create a new note in anki', async () => {
  const response = await createModel({
    modelName: 'TestModel1',
    inOrderFields: ['Sentence'],
    css: "",
    isCloze: false,
    cardTemplates: [
      {
        Name: "My Card 1",
        Front: "<H1> {{Sentence}} </H1>",
        Back: "<H1> {{Sentence}} </H1>"
      }
    ],
  });
  expect(response.error).toBeNull();
});
