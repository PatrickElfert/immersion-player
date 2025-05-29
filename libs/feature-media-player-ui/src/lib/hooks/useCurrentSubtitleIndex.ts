import { useCurrentSubtitle } from "./useCurrentSubtitle.js";
import useSubtitles from "./useSubtitles.js";

export const useCurrentSubtitleIndex = () => {
  const { subtitles } = useSubtitles();
  const currentSubtitle = useCurrentSubtitle();
  return currentSubtitle ? subtitles.indexOf(currentSubtitle) : null;
}