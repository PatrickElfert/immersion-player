import {useQuery} from "react-query";
import {Subtitle} from "@immersion-player/shared-types";

export default function useSubtitles(srtPath?: string) {
  const {data, error, isLoading} = useQuery<Subtitle[]>(
    ['subtitles', srtPath],
    // @ts-expect-error window.electron is not typed
    () => window.electron
      .parseSubtitles(srtPath),
    {
      enabled: !!srtPath,
    }
  )

  console.log(error, isLoading, data)

  return {subtitles: data, isLoading, error};
}
