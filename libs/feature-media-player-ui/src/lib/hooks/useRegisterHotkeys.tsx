import { useHotkeys } from 'react-hotkeys-hook';
import { RefObject} from 'react';
import { useSubtitleStore } from '../state/subtitle.store.js';
import { timecodeToSeconds } from '@immersion-player/shared-utils';
import useSubtitles from './useSubtitles.js';

export function useRegisterHotkeys(videoRef: RefObject<HTMLVideoElement>) {
  const {subtitles} = useSubtitles();

  function seekToSubtitle(offset: number) {
    const currentSubtitleIndex = useSubtitleStore.getState().currentSubtitleIndex;
    if (!videoRef.current) return;

    const targetIndex = currentSubtitleIndex != null ? currentSubtitleIndex + offset : 0;
    if (targetIndex < 0 || targetIndex >= subtitles.length) return;

    const startTime = subtitles[targetIndex]?.startTime;
    if (!startTime) return;

    const nudge = 0.01
    videoRef.current.currentTime = timecodeToSeconds(startTime) + nudge;
  }

  function togglePlay() {
    if(!videoRef.current) return;
    if(videoRef.current.paused) {
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
  }

  useHotkeys('left', () => seekToSubtitle(-1));
  useHotkeys('right', () => seekToSubtitle(1));
  useHotkeys('space', () => togglePlay());
}
