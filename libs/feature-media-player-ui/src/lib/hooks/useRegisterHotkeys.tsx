import { useHotkeys } from 'react-hotkeys-hook';
import { RefObject } from 'react';
import { useSubtitleStore } from '../state/subtitle.store.js';
import { timecodeToSeconds } from '@immersion-player/shared-utils';
import useSubtitles from './useSubtitles.js';

export function useRegisterHotkeys(videoRef: RefObject<HTMLVideoElement>) {
  const subtitleStore = useSubtitleStore();
  const {subtitles} = useSubtitles();

  function seekToSubtitle(offset: number) {
    if (!videoRef.current || subtitleStore.currentSubtitleIndex == null) return;

    const targetIndex = subtitleStore.currentSubtitleIndex + offset;
    if (targetIndex < 0 || targetIndex >= subtitles.length) return;

    const startTime = subtitles[targetIndex]?.startTime;
    if (!startTime) return;

    videoRef.current.currentTime = timecodeToSeconds(startTime);
  }

  useHotkeys('left', () => seekToSubtitle(-1));
  useHotkeys('right', () => seekToSubtitle(1));
}
