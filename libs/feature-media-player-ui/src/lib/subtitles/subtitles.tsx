import { PossibleDefinitions, Subtitle } from '@immersion-player/shared-types';
import { RefObject, useState } from 'react';
import { usePlayback } from '../hooks/usePlayback';
import { cn } from '@immersion-player/shared-utils';

function Dictionary(props: { definitions: PossibleDefinitions }) {
  return (
    <div className="w-full flex absolute left-0 bottom-0 items-center flex-col">
      <div className="h-60 min-w-[14rem] w-14 bg-surface rounded flex flex-col text-white text-base font-extralight overflow-auto">
        {Object.keys(props.definitions).map((deinflectedTerm) => (
          <>
            <div className="m-2 px-1 pt-0.5 pb-1 rounded bg-primary-gradient text-black font-normal">
              {deinflectedTerm}
            </div>
            {props.definitions[deinflectedTerm].map((definition) => (
              <div className="ml-2 pl-1 my-1.5 rounded">{definition}</div>
            ))}
          </>
        ))}
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
        {currentSubtitle?.lookupResult.map((result, index) => (
          <div
            onMouseEnter={() => onMouseEnter(index)}
            onMouseLeave={onMouseLeave}
            className={'hover:text-primary relative'}
            key={index}
          >
            {visibleDictionaryIndex === index && <Dictionary definitions={result.definitions} />}
            {result.token}
          </div>
        ))}
      </div>
    );
  }
}
