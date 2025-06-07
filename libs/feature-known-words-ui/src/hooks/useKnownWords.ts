import { useSuspenseQuery } from '@tanstack/react-query';

export function useKnownWordsStats() {
  const { data, isFetching } = useSuspenseQuery<number[]>({
      queryKey: ['knownWords'],
    // @ts-expect-error window.electron is not type
      queryFn: () => window.api.getKnownWordsStats()
    }
  )

  return {data, isFetching};
}
