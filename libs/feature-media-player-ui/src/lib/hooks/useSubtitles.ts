import { Subtitle } from "@immersion-player/shared-types";
import { useLibraryItem } from "./useMedia.js";
import { useSuspenseQuery } from "@tanstack/react-query";

export default function useSubtitles() {
  const libraryItem = useLibraryItem();
  const languageFile = libraryItem.language.find((l) => l.languageCode === 'ja');

  if(!languageFile) {
    throw Error(`Subtitles for ${libraryItem.name} not found!`)
  }

  const { data, error } = useSuspenseQuery<Subtitle[]>(
    {
      queryKey: ['subtitles', languageFile?.path],
      queryFn:
        // @ts-expect-error window.electron is not typed
        () => window.api
          .parseSubtitles(languageFile?.path),
    }
  )
  return { subtitles: data ?? [], subtitleFilePath: languageFile?.path, error };
}
