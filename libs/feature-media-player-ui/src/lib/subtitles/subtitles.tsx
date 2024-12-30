import { Subtitle } from '@immersion-player/shared-types';
import { RefObject, useState } from 'react';
import { usePlayback } from '../hooks/usePlayback';
import { cn } from '@immersion-player/shared-utils';

function Dictionary(props: { word: string; definitions: string[] }) {
  return (
    <div className="w-full flex absolute left-0 bottom-0 items-center flex-col">
      <div className="h-60 min-w-[12rem] w-12 bg-surface rounded flex flex-col text-white text-base font-extralight">
        <div className="m-2 px-1 pt-0.5 pb-1 rounded bg-primary-gradient text-black font-normal">{props.word}</div>
        <div className="h-fit overflow-auto">
          {props.definitions.map((definition) => (
            <div className="ml-2 pl-1 my-1 rounded">{definition}</div>
          ))}
        </div>
      </div>
      <div className="h-10 w-full bg-transparent"></div>
    </div>
  );
}

export function Subtitles({
  subtitles,
  videoPlayerRef,
  className,
}: {
  subtitles: Subtitle[];
  videoPlayerRef: RefObject<HTMLVideoElement>;
  className?: string;
}) {
  const { currentSubtitle } = usePlayback(videoPlayerRef, subtitles);
  const [visibleDictionaryIndex, setVisibleDictionaryIndex] = useState<null | number>(null);

  const onMouseEnter = (index: number) => {
    setVisibleDictionaryIndex(index);
  };

  function onMouseLeave() {
    setVisibleDictionaryIndex(null);
  }

  if (subtitles) {
    return (
      <div className={cn('flex flex-row text-white text-2xl', className)}>
        {currentSubtitle?.tokens.map((entry, index) => (
          <div
            onMouseEnter={() => onMouseEnter(index)}
            onMouseLeave={onMouseLeave}
            className={'hover:text-primary relative'}
            key={index}
          >
            {visibleDictionaryIndex === index && <Dictionary word={entry.word} definitions={entry.definitions} />}
            {entry.word}
          </div>
        ))}
      </div>
    );
  }
}
