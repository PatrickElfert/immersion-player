import { Character, Definition, KnownWordsStatus, Subtitle } from '@immersion-player/shared-types';
import { DictionaryOverlay } from './dictionary.js';
import useFlashcards from '../hooks/useFlashcards.js';
import { cn, timecodeToSeconds } from '@immersion-player/shared-utils';
import { WordStatusHighlighting } from './word-status-highlighting.js';
import { useLibraryItem } from '../hooks/useMedia.js';
import { Fragment } from 'react';

function JapaneseText({
  tokens,
  showFurigana,
  status,
}: {
  tokens: Character[];
  showFurigana: boolean;
  showStatus: boolean;
  status: KnownWordsStatus;
}) {
  return (
    <WordStatusHighlighting status={status}>
      <ruby data-testid="word" className="whitespace-nowrap">
        {tokens?.map((t, index) => (
          <Fragment key={index}>
            <span>{t.original}</span>
            {showFurigana && t.furigana && <rt>{t.furigana}</rt>}
          </Fragment>
        ))}
      </ruby>
    </WordStatusHighlighting>
  );
}

export function SubtitleLine({
  containerClassName,
  subtitleClassName,
  subtitle,
  disableDictionary,
}: {
  subtitle: Subtitle | null;
  containerClassName?: string;
  subtitleClassName?: string;
  disableDictionary?: boolean;
}) {
  const { createFlashcard } = useFlashcards();
  const libraryItem = useLibraryItem();
  const showFurigana = false;
  const showStatus = true;

  const handleCreateFlashcard = (definitions: Definition[], subtitle: Subtitle, path: string) => {
    createFlashcard({
      sentenceFront: subtitle.text[0],
      sentenceBack: subtitle.lookupResult.flatMap((l) => l.token),
      definitions,
      startTime: timecodeToSeconds(subtitle.startTime),
      endTime: timecodeToSeconds(subtitle.endTime),
      filePath: path,
    });
  };

  return (
    <div data-testid="subtitles" className={containerClassName}>
      {subtitle && (
        <div className={cn('flex flex-row flex-wrap text-white', subtitleClassName)}>
          {subtitle.lookupResult.map((result, index) => (
            <div key={index} className="inline-block">
              <DictionaryOverlay
                enabled={!disableDictionary}
                onCreateFlashcard={(definitions) => handleCreateFlashcard(definitions, subtitle, libraryItem.path)}
                dictionaryResults={result.dictionaryResults}
              >
                <JapaneseText
                  status={result.status}
                  showFurigana={showFurigana}
                  showStatus={showStatus}
                  tokens={result.token}
                />
              </DictionaryOverlay>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
