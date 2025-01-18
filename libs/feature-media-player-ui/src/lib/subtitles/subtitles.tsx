import { Subtitle } from '@immersion-player/shared-types';
import { RefObject, useState } from 'react';
import { usePlayback } from '../hooks/usePlayback';
import { Dictionary } from './dictionary';
import useFlashcards from '../hooks/useFlashcards';
import { timecodeToSeconds } from '@immersion-player/shared-utils';

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
  const { createFlashcard } = useFlashcards();
  const showFurigana = false;

  const onMouseEnter = (index: number) => {
    setVisibleDictionaryIndex(index);
  };

  function onMouseLeave() {
    setVisibleDictionaryIndex(null);
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
                    onCreateFlashcard={(definitions) =>
                      createFlashcard({
                        sentenceFront: currentSubtitle?.text[0],
                        sentenceBack: currentSubtitle?.lookupResult.flatMap(l => l.token),
                        definitions,
                        startTime: timecodeToSeconds(currentSubtitle.startTime),
                        endTime: timecodeToSeconds(currentSubtitle.endTime),
                        filePath: mediaPath,
                      })
                    }
                    definitions={result.definitions}
                  />
                )}
                <ruby>
                  {result.token?.map((t) => (
                    <>
                      {t.original}
                      {showFurigana && t.furigana && <rt>{t.furigana}</rt>}
                    </>
                  ))}
                </ruby>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
}
