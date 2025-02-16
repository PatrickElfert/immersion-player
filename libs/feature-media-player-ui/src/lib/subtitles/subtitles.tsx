import { Character, Definition, Subtitle } from '@immersion-player/shared-types';
import { DictionaryOverlay } from './dictionary';
import useFlashcards from '../hooks/useFlashcards';
import { timecodeToSeconds } from '@immersion-player/shared-utils';

function JapaneseText({ tokens, showFurigana }: { tokens: Character[], showFurigana: boolean }) {
  return <ruby data-testid="word">
    {tokens?.map((t) => (
      <>
        {t.original}
        {showFurigana && t.furigana && <rt>{t.furigana}</rt>}
      </>
    ))}
  </ruby>
}

export function Subtitles({
  currentSubtitle,
  mediaPath,
  className,
}: {
  currentSubtitle: Subtitle | null;
  mediaPath: string;
  className?: string;
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
      className={className}>
      {currentSubtitle && (
        <div className="bg-surface/[.9] flex flex-row text-white text-2xl p-2 rounded">
          {currentSubtitle.lookupResult.map((result, index) => (
            <div>
              <DictionaryOverlay
                key={index}
                onCreateFlashcard={(definitions) => handleCreateFlashcard(definitions, currentSubtitle)}
                definitions={result.definitions}
              >
                <JapaneseText showFurigana={showFurigana} tokens={result.token} />
              </DictionaryOverlay>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
