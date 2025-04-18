import { useEffect } from 'react';
import { usePlaybackStore } from './playback';
import { Subtitle } from '@immersion-player/shared-types';

export function useSyncPlaybackData(
  subtitles: Subtitle[] | undefined,
  mediaPath: string | undefined
) {
  const setSubtitles = usePlaybackStore(state => state.setSubtitles);
  const setMediaPath = usePlaybackStore(state => state.setMediaPath);
  
  useEffect(() => {
    if (subtitles?.length) {
      setSubtitles(subtitles);
    }
    
    if (mediaPath) {
      setMediaPath(mediaPath);
    }
  }, [subtitles, mediaPath, setSubtitles, setMediaPath]);
}