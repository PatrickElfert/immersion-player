import {useQuery} from "react-query";
import {LibraryItem} from "@immersion-player/shared-types";

export function useLibrary(searchTerm?: string) {
  const {data, error, isLoading} = useQuery<LibraryItem[]>(
    ['library'],
    // @ts-expect-error window.electron is not typed
      () => window.api
      .getLibrary('ImmersionPlayer'),
    {
      staleTime: 1000 * 60 * 5,
      cacheTime: 1000 * 60 * 30
    }
  )


  const library = data?.filter(l => searchTerm ?  l.name.includes(searchTerm): true);

  return library ?? [];
}
