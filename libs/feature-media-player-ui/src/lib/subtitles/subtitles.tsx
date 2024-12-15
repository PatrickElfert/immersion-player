import { Subtitle } from '@immersion-player/shared-types';
import { RefObject } from 'react';
import { usePlayback } from '../hooks/usePlayback';
import {cn} from "@immersion-player/shared-utils";

export function Subtitles({
  subtitles,
  videoPlayerRef,
  className,
}: {
  subtitles: Subtitle[];
  videoPlayerRef: RefObject<HTMLVideoElement>;
  className?: string
}) {
  const { currentSubtitle } = usePlayback(videoPlayerRef, subtitles);

  if (subtitles) {
    return (
      <div className={cn('flex flex-row text-white', className)}>
        {currentSubtitle?.tokens.map((token, index) => (
          <div key={index}>{token.token}</div>
        ))}
      </div>
    );
  }
}
