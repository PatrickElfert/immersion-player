import { Subtitle } from '@immersion-player/shared-types';
import { useState } from 'react';
import { Dictionary } from './dictionary';
import useFlashcards from '../hooks/useFlashcards';
import { timecodeToSeconds } from '@immersion-player/shared-utils';

export function Subtitles({
  currentSubtitle,
  mediaPath,
  className,
}: {
  currentSubtitle: Subtitle | null;
  mediaPath: string;
  className?: string;
}) {
  const [visibleDictionaryIndex, setVisibleDictionaryIndex] = useState<null | number>(null);
  const { createFlashcard } = useFlashcards();
  const showFurigana = false;

  const onMouseEnter = (index: number) => {
    setVisibleDictionaryIndex(index);
  };

  function onMouseLeave() {
    setVisibleDictionaryIndex(null);
  }

  return (
    <div
      data-testid="subtitles"
      className={className}>
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
              <ruby data-testid="word">
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
