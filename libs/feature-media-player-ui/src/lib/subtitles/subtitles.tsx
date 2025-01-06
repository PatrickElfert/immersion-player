import { Definition, Subtitle } from '@immersion-player/shared-types';
import { RefObject, useState } from 'react';
import { usePlayback } from '../hooks/usePlayback';
import { Dictionary } from './dictionary';
import useAnkiConnect from '../hooks/useFlashcards';

export function Subtitles({
  subtitles,
  videoPlayerRef,
  className,
  mediaPath,
}: {
  subtitles: Subtitle[];
  videoPlayerRef: RefObject<HTMLVideoElement>;
  mediaPath: string;
  className?: string;
}) {
  const { currentSubtitle } = usePlayback(videoPlayerRef, subtitles);
  const [visibleDictionaryIndex, setVisibleDictionaryIndex] = useState<null | number>(null);
  const { createFlashcard } = useAnkiConnect();

  const onMouseEnter = (index: number) => {
    setVisibleDictionaryIndex(index);
  };

  function onMouseLeave() {
    setVisibleDictionaryIndex(null);
  }

  function onCreateFlashcard(targetWord: string, definitions: Definition[], sentence: string) {
    createFlashcard({
      targetWord,
      sentence,
      definitions,
      startTime: currentSubtitle?.startTime,
      endTime: currentSubtitle?.endTime,
      filePath: mediaPath,
    });
  }

  if (subtitles) {
    return (
      <div className={className}>
        {currentSubtitle && (
          <div className="bg-surface/[.9] flex flex-row text-white text-2xl p-2 rounded">
            {currentSubtitle.lookupResult.map((result, index) => (
              <div
                onMouseEnter={() => onMouseEnter(index)}
                onMouseLeave={onMouseLeave}
                className={'hover:text-primary relative'}
                key={index}
              >
                {visibleDictionaryIndex === index && (
                  <Dictionary
                    onCreateFlashcard={(targetWord, definitions) =>
                      onCreateFlashcard(targetWord, definitions, currentSubtitle?.text[0])
                    }
                    definitions={result.definitions}
                  />
                )}
                {result.token}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
}
