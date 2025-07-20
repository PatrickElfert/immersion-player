import { useHotkeys } from 'react-hotkeys-hook';
import { RefObject } from 'react';
import { useSubtitleStore } from '../state/subtitle.store.js';
import { timecodeToSeconds } from '@immersion-player/shared-utils';
import useSubtitles from './useSubtitles.js';
import { Subtitle } from '@immersion-player/shared-types';

export function useRegisterHotkeys(videoRef: RefObject<HTMLVideoElement>) {
  const { subtitles } = useSubtitles();

  function seekToSubtitle(direction: 'forward' | 'backward') {
    const currentSubtitleIndex = useSubtitleStore.getState().currentSubtitleIndex;
    if (!videoRef.current) return;
    const nextSubtitle = getSubtitleByDirection(currentSubtitleIndex, direction, subtitles);

    if (!nextSubtitle) {
      return;
    }

    const nudge = 0.01;
    videoRef.current.currentTime = timecodeToSeconds(nextSubtitle.startTime) + nudge;
  }

  function togglePlay() {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
  }

  useHotkeys('left', () => seekToSubtitle('backward'));
  useHotkeys('right', () => seekToSubtitle('forward'));
  useHotkeys('space', () => togglePlay());
}

export function getSubtitleByDirection(
  currentIndex: number | null,
  direction: 'forward' | 'backward',
  subtitles: Subtitle[]
) {
  const nudge = 0.01;

  if (currentIndex === null && direction === 'forward') {
    return subtitles[0];
  }

  if (currentIndex === null) return;

  const searchRange =
    direction === 'forward'
      ? subtitles.slice(currentIndex, subtitles.length)
      : subtitles.slice(0, currentIndex).reverse();

  if(direction === 'forward') {
    return searchRange.find(
      (subtitle) => timecodeToSeconds(subtitles[currentIndex].endTime)  < timecodeToSeconds(subtitle.startTime) + nudge
    );
  }

  if(direction === 'backward') {
    return searchRange.find(
      (subtitle) => timecodeToSeconds(subtitles[currentIndex].startTime) > timecodeToSeconds(subtitle.endTime) - nudge
    );
  }
}
