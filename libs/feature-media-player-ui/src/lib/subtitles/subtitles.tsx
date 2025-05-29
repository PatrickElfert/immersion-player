import { Character, Definition, Subtitle } from '@immersion-player/shared-types';
import { DictionaryOverlay } from './dictionary.js';
import useFlashcards from '../hooks/useFlashcards.js';
import { cn, timecodeToSeconds } from '@immersion-player/shared-utils';
import useSubtitles from '../hooks/useSubtitles.js';

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
  containerClassName,
  subtitleClassName,
  subtitle,
  disableDictionary,
}: {
  subtitle: Subtitle | null 
  containerClassName?: string;
  subtitleClassName?: string;
  disableDictionary?: boolean;
}) {
  const { createFlashcard } = useFlashcards();
  const { path } = useSubtitles();
  const showFurigana = false;

  const handleCreateFlashcard = (definitions: Definition[], subtitle: Subtitle, path: string) => {
    createFlashcard({
      sentenceFront: subtitle.text[0],
      sentenceBack: subtitle.lookupResult.flatMap(l => l.token),
      definitions,
      startTime: timecodeToSeconds(subtitle.startTime),
      endTime: timecodeToSeconds(subtitle.endTime),
      filePath: path,
    });
  };

  return (
    <div
      data-testid="subtitles"
      className={containerClassName}>
      {subtitle && (
        <div className={cn("flex flex-row flex-wrap text-white", subtitleClassName)} >
          {
            subtitle.lookupResult.map((result, index) => (
              <div className="inline-block">
                <DictionaryOverlay
                  enabled={!disableDictionary}
                  key={index}
                  onCreateFlashcard={(definitions) => handleCreateFlashcard(definitions, subtitle, path!)}
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
