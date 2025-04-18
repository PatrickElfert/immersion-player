import { Subtitle } from "@immersion-player/shared-types";
import { create } from "zustand";
import { timecodeToSeconds } from '@immersion-player/shared-utils';
import { RefObject, useEffect } from "react";

export function useSyncTimestamp(
  videoPlayerRef: RefObject<HTMLVideoElement>,
) {
  const playbackStore = usePlaybackStore();

  useEffect(() => {
    const videoPlayer = videoPlayerRef?.current;
    if (videoPlayer) {
      const handleTimeUpdate = () => {
        playbackStore.setTimestamp(videoPlayer.currentTime);
      };
      videoPlayer.ontimeupdate = handleTimeUpdate;
    }
  }, [videoPlayerRef]);
  return
}


type PlaybackState = {
  subtitles: Subtitle[];
  timestamp: number;
  filePath: string;
  setTimestamp: (timestamp: number) => void;
  setSubtitles: (subtitles: Subtitle[]) => void;
  setMediaPath: (mediaPath: string) => void;
}

export const usePlaybackStore = create<PlaybackState>(set => ({
  subtitles: [],
  timestamp: 0,
  filePath: '',
  setSubtitles: (subtitles: Subtitle[]) => set({ subtitles }),
  setTimestamp: (timestamp: number) => set({ timestamp }),
  setMediaPath: (mediaPath: string) => set({ filePath: mediaPath }),
}))

export const useCurrentSubtitle = () => {
  const subtitles = usePlaybackStore(state => state.subtitles);
  const timestamp = usePlaybackStore(state => state.timestamp);
  return getCurrentSubtitle(subtitles, timestamp);
}

export const useCurrentSubtitleIndex = () => {
  const subtitles = usePlaybackStore((state) => state.subtitles);
  const currentSubtitle = useCurrentSubtitle();
  return currentSubtitle ? subtitles.indexOf(currentSubtitle) : null;
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