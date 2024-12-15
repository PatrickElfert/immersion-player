import {useQuery} from "react-query";
import {LookupResult} from "@immersion-player/shared-types";

export default function useSubtitles(srtPath?: string) {
  const {data, error, isLoading} = useQuery<LookupResult[]>(
    ['subtitles', srtPath],
    // @ts-expect-error window.electron is not typed
    () => window.electron
      .parseSubtitles(srtPath),
    {
      enabled: !!srtPath,
      staleTime: 1000 * 60 * 5,
      cacheTime: 1000 * 60 * 30
    }
  )

  return {subtitles: data, isLoading, error};
}
