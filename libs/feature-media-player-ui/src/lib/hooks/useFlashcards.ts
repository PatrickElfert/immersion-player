import { useMutation } from '@tanstack/react-query';
import { CreateFlashcardDto } from '@immersion-player/shared-types';
import toast, { Toast } from 'react-simple-toasts';

export default function useFlashcards() {
  let progressToast: Toast;

  const { mutate: createFlashcard } = useMutation({
    mutationFn: (flashcard: CreateFlashcardDto) =>
      // @ts-ignore
      window.api.createFlashcard(flashcard),
    onMutate: () => {
      progressToast = toast('Creating Flashcard', { loading: true, duration: Infinity });
    },
    onSuccess: () => {
      progressToast.update({ loading: false, message: 'Flashcard Created', duration: 5000, theme: 'success' });
    },
    onError: () => {
      progressToast.update({loading: false, message: "Could not create Flashcard", duration: 5000, theme: 'failure'})
    }
  });
  return { createFlashcard };
}
