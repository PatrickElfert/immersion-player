import { RefObject, useEffect } from 'react';
import { usePlaybackStore } from '../state/playback.store.js';

export function useSyncTimestamp(videoPlayerRef: RefObject<HTMLVideoElement>) {
  const playbackStore = usePlaybackStore();

  useEffect(() => {
    const videoPlayer = videoPlayerRef?.current;
    if (videoPlayer) {
      videoPlayer.ontimeupdate = () => {
        playbackStore.setTimestamp(videoPlayer.currentTime);
      };
    }
  }, [videoPlayerRef, playbackStore]);
  return;
}
