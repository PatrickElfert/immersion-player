import { addToast } from '@heroui/react';
import { CreateFlashcardDto } from '@immersion-player/shared-types';
import { useMutation } from '@tanstack/react-query';

export default function useFlashcards() {
  const { mutate: createFlashcard } = useMutation({
    mutationFn: (flashcard: CreateFlashcardDto) =>
      // @ts-expect-error
      window.api.createFlashcard(flashcard),
    onMutate: () => {
      addToast({
        title: 'In Progress',
        description: 'Your flashcard is currently created in Anki!',
      });
    },
    onSuccess: () => {
      addToast({
        title: 'Success',
        description: 'Flashcard successfully created!',
        severity: 'success',
        color: 'success',
      });
    },
    onError: () => {
      addToast({
        title: 'Failed',
        description: 'Could not create your flashcard!',
        severity: 'danger',
        color: 'danger',
      });
    },
  });

  return { createFlashcard };
}
