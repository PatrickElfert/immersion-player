import { Subtitle } from '@immersion-player/shared-types';
import { RefObject } from 'react';
import { usePlayback } from '../hooks/usePlayback';
import {cn} from "@immersion-player/shared-utils";

function Dictionary() {
  return <div className="h-80 bg-red-600">
  </div>
}

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
      <div className={cn('flex flex-row text-white text-2xl', className)}>
        {currentSubtitle?.tokens.map((token, index) => (
          <div className={"hover:text-primary"} key={index}>{token.token}</div>
        ))}
      </div>
    );
  }
}
