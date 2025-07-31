import { RefObject, useEffect } from 'react';
import useSubtitles from './useSubtitles.js';
import { Subtitle } from '@immersion-player/shared-types';
import { timecodeToSeconds } from '@immersion-player/shared-utils';
import { useSubtitleStore } from '../state/subtitle.store.js';

export function useSubtitleTracking(videoRef: RefObject<HTMLVideoElement>) {
  const { subtitles } = useSubtitles();
  const resetSubtitleStore = useSubtitleStore((state) => state.reset);
  const setCurrentSubtitle = useSubtitleStore((state) => state.setCurrentSubtitle);

  useEffect(() => {
    const currentPlayer = videoRef.current;

    const handleTimeUpdate = () => {
      const timestamp = videoRef.current?.currentTime ?? 0;
      const subtitle = getCurrentSubtitle(subtitles.primary, timestamp);

      if (subtitle) {
        setCurrentSubtitle(subtitle.value, subtitle.index);
      }
    };

    if (currentPlayer) {
      currentPlayer.addEventListener('timeupdate', handleTimeUpdate);
    }
    return () => {
      resetSubtitleStore();
      currentPlayer?.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, [videoRef, subtitles, setCurrentSubtitle, resetSubtitleStore]);
}

export const getCurrentSubtitle = (subtitles: Subtitle[], timestamp: number) => {
  const index = subtitles.findIndex((subtitle) => {
    const start = timecodeToSeconds(subtitle.startTime);
    const end = timecodeToSeconds(subtitle.endTime);
    return start <= timestamp && timestamp <= end;
  });

  if (index === -1) return null;

  return { value: subtitles[index], index };
};
