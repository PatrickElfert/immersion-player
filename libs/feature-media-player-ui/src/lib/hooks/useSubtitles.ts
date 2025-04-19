import { Subtitle } from "@immersion-player/shared-types";
import { useLibraryItem } from "./useMedia";
import { useSuspenseQuery } from "@tanstack/react-query";

export default function useSubtitles() {
  const libraryItem = useLibraryItem();
  const item = libraryItem.language.find((l) => l.languageCode === 'ja');

  if(!item) {
    throw Error(`Subtitles for ${libraryItem.name} not found!`)
  }

  const { data, error, isLoading } = useSuspenseQuery<Subtitle[]>(
    {
      queryKey: ['subtitles', item?.path],
      queryFn:
        // @ts-expect-error window.electron is not typed
        () => window.api
          .parseSubtitles(item?.path),
    }
  )
  return { subtitles: data ?? [], path: item?.path, isLoading, error };
}
