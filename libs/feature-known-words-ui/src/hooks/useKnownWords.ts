import { useSuspenseQuery } from '@tanstack/react-query';

export function useKnownWordsStats() {
  const { data, isFetching } = useSuspenseQuery<number[]>({
      queryKey: ['knownWords'],
      queryFn: async () => {
        await new Promise(resolve => setTimeout(resolve, 2000)); // 2 second delay
      // @ts-expect-error window.electron is not typed
        return window.api.getKnownWordsStats();
      },
      staleTime: 1000 * 60 * 5,
    }
  )

  return {data, isFetching};
}
