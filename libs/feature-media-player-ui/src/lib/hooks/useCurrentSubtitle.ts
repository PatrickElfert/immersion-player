import { Subtitle } from '@immersion-player/shared-types';
import { usePlaybackStore } from '../state/playback.store.js';
import useSubtitles from './useSubtitles.js';
import { timecodeToSeconds } from '@immersion-player/shared-utils';
import { useEffect, useRef, useState } from 'react';

export const useCurrentSubtitle = () => {
  const { subtitles } = useSubtitles();
  const [currentSubtitle, setCurrentSubtitle] = useState<Subtitle | null>(null);
  const subtitleKey = useRef<string | null>(null);

  useEffect(() => {
    const unsubscribe= usePlaybackStore.subscribe(state => {
      const subtitle = getCurrentSubtitle(subtitles, state.timestamp);
      const key = `${subtitle?.startTime}-${subtitle?.endTime}`;

      if (subtitle && key != subtitleKey.current) {
        subtitleKey.current = key;
        setCurrentSubtitle(subtitle);
      }
    })

    return ()  => unsubscribe();
  }, [subtitles]);

  return currentSubtitle;
};

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
