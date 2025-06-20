/* eslint-disable-next-line */
import { SubtitleLine } from './subtitles/subtitles.js';
import { Suspense, useRef } from 'react';
import { useLibraryItem } from './hooks/useMedia.js';
import { Browser } from './subtitles/browser.js';
import { useSyncTimestamp } from './hooks/useSyncTimestamp.js';
import { useCurrentSubtitle } from './hooks/useCurrentSubtitle.js';
import { useRenderInfo } from '@uidotdev/usehooks';

export function FeatureMediaPlayerUi() {
  return (
    <div className="grid grid-cols-4 h-full gap-6">
      <div className="relative max-h-full aspect-video col-span-3">
        <Suspense fallback={null}>
          <div className="p-4">
            <VideoPlayer />
          </div>
        </Suspense>
        <Suspense fallback={<div className="absolute text-white bottom-[15%] right-1/2">Loading...</div>}>
          <CurrentSubtitle />
        </Suspense>
      </div>
      <Suspense fallback={null}>
        <Browser />
      </Suspense>
    </div>
  );
}

export function VideoPlayer() {
  const libraryItem = useLibraryItem();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  useSyncTimestamp(videoRef);
  return (
    <video
      ref={videoRef}
      controls
      style={{ width: '100%', height: 'auto' }}
      controlsList={'nofullscreen'}
      src={libraryItem.path}
    ></video>
  );
}

export function CurrentSubtitle() {
  const currentSubtitle = useCurrentSubtitle();
  return (
    <SubtitleLine
      subtitle={currentSubtitle}
      containerClassName="absolute bottom-[15%] w-full flex justify-center"
      subtitleClassName="bg-content1/40 backdrop-blur-md backdrop-saturate-150 text-2xl rounded p-2"
    />
  );
}

export default FeatureMediaPlayerUi;
