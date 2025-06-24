import { useEffect } from "react";
import { cn, useIsScrolling } from "@immersion-player/shared-utils";
import { SubtitleLine } from "./subtitles.js";
import useSubtitles from "../hooks/useSubtitles.js";
import { useSubtitleStore } from '../state/subtitle.store.js';

const formatTime = (timecode: string) => {
    const [time] = timecode.split(',');
    const [hours, minutes, seconds] = time.split(':').map(Number);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};

export function Browser() {
    const currentSubtitleIndex = useSubtitleStore((state) => state.currentSubtitleIndex);
    const { subtitles } = useSubtitles();
    const {isScrolling, ref: containerRef} = useIsScrolling()


    useEffect(() => {
        if (currentSubtitleIndex && containerRef.current) {
            const container = containerRef.current;
            const activeSubtitleElement = container.children[currentSubtitleIndex];
            if (activeSubtitleElement) {
                activeSubtitleElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    }, [currentSubtitleIndex, subtitles, containerRef]);

    return (<div ref={containerRef} className="rounded bg-content2 text-white overflow-y-scroll p-3">
        {subtitles.map((subtitle, index) => {
            return (<div key={index} className={cn('p-2 border-l-primary rounded', { 'border-l-4': currentSubtitleIndex === index })}>
                <SubtitleLine disableDictionary={isScrolling} subtitle={subtitle} />
                <small className="opacity-50">
                    {formatTime(subtitle.startTime)} - {formatTime(subtitle.endTime)}
                </small>
            </div>)
        })}
    </div>)
}
