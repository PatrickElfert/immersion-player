import { Character, Definition, Subtitle } from '@immersion-player/shared-types';
import { DictionaryOverlay } from './dictionary';
import useFlashcards from '../hooks/useFlashcards';
import { cn, timecodeToSeconds } from '@immersion-player/shared-utils';
import { usePlaybackStore } from '../hooks/playback';

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
  subtitle,
  containerClassName,
  subtitleClassName
}: {
  subtitle: Subtitle;
  containerClassName?: string;
  subtitleClassName?: string;
}) {
  const { createFlashcard } = useFlashcards();
  const filePath = usePlaybackStore((state) => state.filePath)
  const showFurigana = false;

  const handleCreateFlashcard = (definitions: Definition[], subtitle: Subtitle) => {
    createFlashcard({
      sentenceFront: subtitle.text[0],
      sentenceBack: subtitle.lookupResult.flatMap(l => l.token),
      definitions,
      startTime: timecodeToSeconds(subtitle.startTime),
      endTime: timecodeToSeconds(subtitle.endTime),
      filePath,
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
                  key={index}
                  onCreateFlashcard={(definitions) => handleCreateFlashcard(definitions, subtitle)}
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
