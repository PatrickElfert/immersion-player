import { Subtitle } from "@immersion-player/shared-types";
import { usePlaybackStore } from "../state/playback.store";
import useSubtitles from "./useSubtitles";
import { timecodeToSeconds } from "@immersion-player/shared-utils";

export const useCurrentSubtitle = () => {
  const { subtitles } = useSubtitles();
  const timestamp = usePlaybackStore(state => state.timestamp);
  return getCurrentSubtitle(subtitles, timestamp);
}

function getCurrentSubtitle(subtitles: Subtitle[], timestamp: number) {
  let left = 0;
  let right = subtitles.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    const subtitle = subtitles[mid];
    const startTime = timecodeToSeconds(subtitle.startTime);
    const endTime = timecodeToSeconds(subtitle.endTime);

    if (startTime <= timestamp && endTime >= timestamp) {
      return subtitle;
    } else if (startTime > timestamp) {
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }

  return null;
}