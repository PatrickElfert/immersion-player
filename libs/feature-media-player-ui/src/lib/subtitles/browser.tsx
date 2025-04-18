import { useEffect, useRef } from "react";
import { cn } from "@immersion-player/shared-utils";
import { SubtitleLine } from "./subtitles";
import { useCurrentSubtitleIndex, usePlaybackStore } from "../hooks/playback";

const formatTime = (timecode: string) => {
    const [time] = timecode.split(',');
    const [hours, minutes, seconds] = time.split(':').map(Number);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};

export function Browser() {
    const containerRef = useRef<HTMLDivElement>(null);
    const currentSubtitleIndex = useCurrentSubtitleIndex();
    const subtitles = usePlaybackStore((state) => state.subtitles);

    useEffect(() => {
        if (currentSubtitleIndex && containerRef.current) {
            const container = containerRef.current;
            const activeSubtitleElement = container.children[currentSubtitleIndex];
            if (activeSubtitleElement) {
                activeSubtitleElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    }, [currentSubtitleIndex, subtitles]);

    return (<div ref={containerRef} className="rounded bg-card text-white overflow-y-scroll">
        {subtitles.map((subtitle, index) => {
            return (<div key={index} className={cn('p-2 border-l-primary rounded', { 'border-l-4': currentSubtitleIndex === index })}>
                <SubtitleLine subtitle={subtitle} />
                <small className="opacity-50">
                    {formatTime(subtitle.startTime)} - {formatTime(subtitle.endTime)}
                </small>
            </div>)
        })}
    </div>)
}