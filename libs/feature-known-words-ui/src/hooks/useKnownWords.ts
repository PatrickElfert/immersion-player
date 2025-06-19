import { useQuery, useSuspenseQuery } from '@tanstack/react-query';

export function useKnownWordsStats() {
  const { data, isLoading} = useQuery<number[]>({
      queryKey: ['knownWords'],
    // @ts-expect-error window.electron is not type
      queryFn: () => window.api.getKnownWordsStats()
    }
  )

  return {data, isLoading};
}
