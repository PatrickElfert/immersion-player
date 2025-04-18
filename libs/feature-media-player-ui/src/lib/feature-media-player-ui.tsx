/* eslint-disable-next-line */
import { SubtitleLine } from './subtitles/subtitles';
import { useEffect, useRef } from 'react';
import useSubtitles from './hooks/useSubtitles';
import { useLibraryItem } from './hooks/useMedia';
import { Browser } from './subtitles/browser';
import { useCurrentSubtitle, usePlaybackStore, useSyncTimestamp } from './hooks/playback';
import { useSyncPlaybackData } from './hooks/useSyncPlaybackData';

export function FeatureMediaPlayerUi() {
  const libraryItem = useLibraryItem();
  const japaneseLanguage = libraryItem?.language.find((l) => l.languageCode === 'ja');
  const { subtitles, isLoading } = useSubtitles(japaneseLanguage?.path);
  const currentSubtitle = useCurrentSubtitle();

  const videoRef = useRef<HTMLVideoElement | null>(null);
  useSyncPlaybackData(subtitles, libraryItem?.path)
  useSyncTimestamp(videoRef)


  if (!libraryItem) {
    return null;
  }

  return (
    <div className='grid grid-cols-4 h-full gap-6'>
      <div className="relative max-h-full aspect-video col-span-3">
        <video
          ref={videoRef}
          controls
          style={{ width: "100%", height: "auto" }}
          controlsList={'nofullscreen'}
          src={libraryItem.path}
        ></video>
        {isLoading && <div className="absolute text-white bottom-[15%] right-1/2">Loading...</div>}

        {!isLoading && currentSubtitle && (
          <SubtitleLine
            subtitle={ currentSubtitle }
            containerClassName="absolute bottom-[15%] w-full flex justify-center"
            subtitleClassName='bg-surface/[.9] text-2xl rounded p-2'
          />
        )}
      </div>
      {!isLoading && (
        <Browser />
      )}
    </div>
  );
}

export default FeatureMediaPlayerUi;

