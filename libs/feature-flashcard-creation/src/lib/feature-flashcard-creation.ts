import { YankiConnect } from 'yanki-connect';
import { CreateFlashcardDto } from '@immersion-player/shared-types';
import { backTemplate } from './templates/back';
import { frontTemplate } from './templates/front';
import ffmpeg from 'fluent-ffmpeg';
import { fileSync } from 'tmp';
import path from 'path';

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
      inOrderFields: ['sentence', 'definitions', 'targetWord', 'image', 'sentenceAudio'],
    });
  }

  if (!deckExists) {
    await client.deck.createDeck({ deck: DECK_NAME });
  }

  const { tempImageFilePath, tempAudioFilePath, cleanup } = await extractFlashcardMedia(
    flashcard.filePath.replace(/^media:/, ''),
    flashcard.startTime,
    flashcard.endTime
  );

  const imageStoreResult = await client.media.storeMediaFile({
    path: tempImageFilePath,
    filename: path.basename(tempImageFilePath),
  });

  const audioStoreResult = await client.media.storeMediaFile({
    path: tempAudioFilePath,
    filename: path.basename(tempAudioFilePath),
  });

  await client.note.addNote({
    note: {
      deckName: DECK_NAME,
      modelName: MODEL_NAME,
      fields: {
        sentence: flashcard.sentence,
        definitions: flashcard.definitions.map((d) => d.text).join('*~*'),
        targetWord: flashcard.definitions[0].token
          .map((char) => (char.furigana ? `${char.original}[${char.furigana}]` : char.original))
          .join(''),
        sentenceAudio: audioStoreResult,
        image: imageStoreResult,
      },
      options: {
        allowDuplicate: true,
      },
    },
  });

  //cleanup();
}

function extractFlashcardMedia(
  filePath: string,
  startTime: number,
  endTime: number
): Promise<{ tempImageFilePath: string; tempAudioFilePath: string; cleanup: () => void }> {
  const tempImageFile = fileSync({ keep: true, postfix: '.png' });
  const tempAudioFile = fileSync({ keep: true, postfix: '.mp3' });
  const tempVideoFile = fileSync({ keep: true, postfix: '.mp4' });

  console.log(tempVideoFile, tempAudioFile, tempImageFile);

  const cleanup = () => {
    tempAudioFile.removeCallback();
    tempImageFile.removeCallback();
    tempVideoFile.removeCallback();
  };

  return new Promise((resolve, reject) => {
    ffmpeg(filePath)
      .inputOptions(['-ss ' + startTime])
      .setDuration(endTime - startTime)
      .output(tempAudioFile.name)
      .audioCodec('libmp3lame')
      .noVideo()
      .output(tempImageFile.name)
      .outputOption('-vframes 1')
      .on('stderr', (stderrLine) => {
        console.error('FFmpeg stderr:', stderrLine);
      })
      .on('end', () => {
        console.log('Audio and Screenshot for Flashcard created!');
        resolve({
          tempImageFilePath: tempImageFile.name,
          tempAudioFilePath: tempAudioFile.name,
          cleanup,
        });
      })
      .on('error', (err) => {
        console.error('An error occurred:', err);
        reject(err);
      })
      .run();
  });
}
