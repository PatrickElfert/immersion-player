/* eslint-disable-next-line */
import { SubtitleLine } from './subtitles/subtitles.js';
import { Suspense, useRef } from 'react';
import useSubtitles from './hooks/useSubtitles.js';
import { useLibraryItem } from './hooks/useMedia.js';
import { Browser } from './subtitles/browser.js';
import { useSyncTimestamp } from './hooks/useSyncTimestamp.js';
import { useCurrentSubtitle } from './hooks/useCurrentSubtitle.js';

export function FeatureMediaPlayerUi() {
  const libraryItem = useLibraryItem();
  const { isLoading } = useSubtitles();

  const videoRef = useRef<HTMLVideoElement | null>(null);
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
        <Suspense fallback={<div className="absolute text-white bottom-[15%] right-1/2">Loading...</div>}>
          <CurrentSubtitle/>
        </Suspense>
      </div>
      {!isLoading && (
        <Browser />
      )}
    </div>
  );
}

export function CurrentSubtitle() {
  const currentSubtitle = useCurrentSubtitle();
  return (
    <SubtitleLine
      subtitle={currentSubtitle}
      containerClassName="absolute bottom-[15%] w-full flex justify-center"
      subtitleClassName='bg-surface/[.9] text-2xl rounded p-2'
    />
  )
}

export default FeatureMediaPlayerUi;

