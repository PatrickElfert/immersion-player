import { memo, useEffect, useRef } from 'react';
import { cn, useIsScrolling } from '@immersion-player/shared-utils';
import { SubtitleLine } from './subtitles.js';
import useSubtitles from '../hooks/useSubtitles.js';
import { useSubtitleStore } from '../state/subtitle.store.js';
import { useDebounce, useRenderInfo } from '@uidotdev/usehooks';
import { Subtitle } from '@immersion-player/shared-types';

const formatTime = (timecode: string) => {
  const [time] = timecode.split(',');
  const [hours, minutes, seconds] = time.split(':').map(Number);
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};

export function Browser() {
  const currentSubtitleIndex = useSubtitleStore((state) => state.currentSubtitleIndex);
  const debouncedSubtitleIndex = useDebounce(currentSubtitleIndex, 300);
  const { subtitles } = useSubtitles();
  //@Todo: Optimize performance of useIsScrolling
  //const {isScrolling, ref: containerRef} = useIsScrolling()
  const containerRef = useRef<HTMLDivElement>(null);

  useRenderInfo('Browser');

  useEffect(() => {
    if (debouncedSubtitleIndex && containerRef.current) {
      const container = containerRef.current;
      const activeSubtitleElement = container.children[debouncedSubtitleIndex];
      if (activeSubtitleElement) {
        activeSubtitleElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [debouncedSubtitleIndex, subtitles, containerRef]);

  return (
    <div ref={containerRef} className="rounded bg-content2 text-white overflow-y-scroll p-3">
      {subtitles.map((subtitle, index) => (
        <BrowserRow subtitle={subtitle} index={index} isActive={currentSubtitleIndex === index}></BrowserRow>
      ))}
    </div>
  );
}

const BrowserRow = memo(
  ({ subtitle, index, isActive }: { subtitle: Subtitle; index: number; isActive: boolean }) => {
    return (
      <div key={index} className={cn('p-2 border-l-primary rounded', { 'border-l-4': isActive })}>
        <SubtitleLine disableDictionary={false} subtitle={subtitle} />
        <small className="opacity-50">
          {formatTime(subtitle.startTime)} - {formatTime(subtitle.endTime)}
        </small>
      </div>
    );
  },
  (prev, next) => prev.isActive === next.isActive && prev.subtitle.index === next.subtitle.index
);
