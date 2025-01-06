import { useMutation } from 'react-query';
import { CreateFlashcardDto } from '@immersion-player/shared-types';

export default function useFlashcards() {
  const { mutate: createFlashcard } = useMutation(
    {
      mutationFn: (flashcard: CreateFlashcardDto) =>
        // @ts-ignore
        window.api.createFlashcard(flashcard),
    }
  );
  return { createFlashcard };
}
