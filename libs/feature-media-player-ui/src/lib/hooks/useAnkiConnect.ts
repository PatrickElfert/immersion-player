import { useMutation } from 'react-query';
import { CreateFlashcardDto, Subtitle } from '@immersion-player/shared-types';

export default function useAnkiConnect() {
  const {mutate: createFlashcard} = useMutation(
    // @ts-ignore
    { mutationFn: (flashcard: CreateFlashcardDto) => window.electron.createFlashcard() }
  );
  return { createFlashcard };
}
