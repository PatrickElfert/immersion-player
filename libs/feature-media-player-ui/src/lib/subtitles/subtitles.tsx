import { Character, Definition, Subtitle } from '@immersion-player/shared-types';
import { DictionaryOverlay } from './dictionary';
import useFlashcards from '../hooks/useFlashcards';
import { cn, timecodeToSeconds } from '@immersion-player/shared-utils';

function JapaneseText({ tokens, showFurigana }: { tokens: Character[], showFurigana: boolean }) {
  return <ruby data-testid="word" className='whitespace-nowrap'>
    {tokens?.map((t) => (
      <>
        {t.original}
        {showFurigana && t.furigana && <rt>{t.furigana}</rt>}
      </>
    ))}
  </ruby>
}

export function SubtitleLine({
  currentSubtitle,
  mediaPath,
  containerClassName,
  subtitleClassName
}: {
  currentSubtitle: Subtitle | null;
  mediaPath: string;
  containerClassName?: string;
  subtitleClassName?: string;
}) {
  const { createFlashcard } = useFlashcards();
  const showFurigana = false;

  const handleCreateFlashcard = (definitions: Definition[], subtitle: Subtitle) => {
    createFlashcard({
      sentenceFront: subtitle.text[0],
      sentenceBack: subtitle.lookupResult.flatMap(l => l.token),
      definitions,
      startTime: timecodeToSeconds(subtitle.startTime),
      endTime: timecodeToSeconds(subtitle.endTime),
      filePath: mediaPath,
    });
  };

  return (
    <div
      data-testid="subtitles"
      className={containerClassName}>
      {currentSubtitle && (
        <div className={cn("flex flex-row flex-wrap text-white", subtitleClassName)} >
          {
            currentSubtitle.lookupResult.map((result, index) => (
              <div className="inline-block">
                <DictionaryOverlay
                  key={index}
                  onCreateFlashcard={(definitions) => handleCreateFlashcard(definitions, currentSubtitle)}
                  definitions={result.definitions}
                >
                  <JapaneseText showFurigana={showFurigana} tokens={result.token} />
                </DictionaryOverlay>
              </div>
            ))
          }
        </div>
      )
      }
    </div >
  );
}
