import { addToast } from '@heroui/react';
import { CreateFlashcardDto } from '@immersion-player/shared-types';
import { useMutation } from '@tanstack/react-query';

export default function useFlashcards() {
  const mutation = useMutation({
    mutationFn: (flashcard: CreateFlashcardDto) =>
      // @ts-expect-error
      window.api.createFlashcard(flashcard),
  });

 const createFlashcard = async (flashcard: CreateFlashcardDto) => {
   try {
     const promise = mutation.mutateAsync(flashcard);
     addToast({
       title: 'In Progress',
       description: 'Your flashcard is currently created in Anki!',
       promise,
       timeout: 1
     });
     await promise;
     addToast({
       title: 'Success',
       description: 'Flashcard successfully created!',
       severity: 'success',
       color: 'success',
     });
   } catch (error) {
     addToast({
       title: 'Failed',
       description: 'Could not create your flashcard!',
       severity: 'danger',
       color: 'danger',
     });
   }
 };

  return { createFlashcard };
}
