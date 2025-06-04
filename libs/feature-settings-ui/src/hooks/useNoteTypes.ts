import { useSuspenseQuery } from '@tanstack/react-query';

export function useNoteTypes() {
  const { data } = useSuspenseQuery<string[]>({
    queryKey: ['noteTypes'],
    // @ts-expect-error window.electron is not typed
    queryFn: () => window.api.loadNoteTypes(),
  });

  return data;
}
