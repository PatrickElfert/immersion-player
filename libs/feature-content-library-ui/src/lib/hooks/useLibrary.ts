import { useSuspenseQuery } from '@tanstack/react-query'
import { LibraryItem } from "@immersion-player/shared-types";

export function useLibrary(searchTerm?: string) {
  const { data } = useSuspenseQuery<LibraryItem[]>({
    queryKey: ['library'],
    // @ts-expect-error window.electron is not typed
    queryFn: () => window.api.getLibrary(),
    staleTime: 1000 * 60 * 5,
  }
  )

  return data.filter(l => searchTerm ? l.name.includes(searchTerm) : true);

}
