import { RefObject, useEffect, useState } from 'react';
import { Subtitle } from '@immersion-player/shared-types';

export function usePlayback(
  videoPlayerRef: RefObject<HTMLVideoElement>,
  subtitles: Subtitle[]
) {
  const [currentSubtitle, setCurrentSubtitle] = useState<Subtitle | null>(null);

  useEffect(() => {
    const videoPlayer = videoPlayerRef.current;
    if (videoPlayer) {
      const handleTimeUpdate = () => {
        const newSubtitle = getCurrentSubtitle(subtitles, videoPlayer.currentTime);
        if(newSubtitle?.text !== currentSubtitle?.text) {
          setCurrentSubtitle(newSubtitle);
        }
      };
      videoPlayer.ontimeupdate = handleTimeUpdate;
    }
  }, [videoPlayerRef, subtitles]);

  return {currentSubtitle}
}

function getCurrentSubtitle(subtitles: Subtitle[], timestamp: number) {
  let left = 0;
  let right = subtitles.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    const subtitle = subtitles[mid];
    const startTime = parseTimecodeToSeconds(subtitle.startTime);
    const endTime = parseTimecodeToSeconds(subtitle.endTime);

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

function parseTimecodeToSeconds(timecode: string) {
  const [hours, minutes, secondsWithMs] = timecode.split(":");
  const [seconds, milliseconds] = secondsWithMs.split(",");

  const totalSeconds =
    Number(hours) * 3600 +
    Number(minutes) * 60 +
    Number(seconds) +
    Number(milliseconds) / 1000;

  return totalSeconds;
}
