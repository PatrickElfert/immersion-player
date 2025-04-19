import { useCurrentSubtitle } from "./useCurrentSubtitle";
import useSubtitles from "./useSubtitles";

export const useCurrentSubtitleIndex = () => {
  const { subtitles } = useSubtitles();
  const currentSubtitle = useCurrentSubtitle();
  return currentSubtitle ? subtitles.indexOf(currentSubtitle) : null;
}