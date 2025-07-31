import { Subtitle } from "@immersion-player/shared-types";
import type { SubtitlesByLibraryItem } from "@immersion-player/feature-dictionary-lookup";
import { useLibraryItem } from "./useMedia.js";
import { useSuspenseQuery } from "@tanstack/react-query";

export default function useSubtitles() {
  const libraryItem = useLibraryItem();

  const { data, error } = useSuspenseQuery<SubtitlesByLibraryItem>(
    {
      queryKey: ['subtitles', libraryItem.path],
      queryFn:
        // @ts-expect-error window.electron is not typed
        () => window.api
          .getSubtitlesByLibraryItem(libraryItem.path),
    }
  )
  return { 
    subtitles: data ?? { primary: [], secondary: [] }, 
    subtitleFilePath: libraryItem.path, 
    error 
  };
}
