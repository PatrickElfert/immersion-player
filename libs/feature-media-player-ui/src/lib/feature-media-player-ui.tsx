/* eslint-disable-next-line */
import { SubtitleLine } from './subtitles/subtitles.js';
import { KeyboardEvent, Suspense, useEffect, useRef } from 'react';
import { useLibraryItem } from './hooks/useMedia.js';
import { Browser } from './subtitles/browser.js';
import { Kbd } from '@heroui/react';
import { getPlatform, timecodeToSeconds } from '@immersion-player/shared-utils';
import { VIDEO_PLAYER_SHORTCUTS } from './constant.js';
import { Subtitle } from '@immersion-player/shared-types';
import useSubtitles from './hooks/useSubtitles.js';
import { useSubtitleStore } from './state/subtitle.store.js';
import { useRegisterHotkeys } from './hooks/useRegisterHotkeys.js';

export function FeatureMediaPlayerUi() {
  return (
    <div className="grid grid-cols-4 h-full w-full">
      <div className="relative max-h-full aspect-video col-span-3">
        <Suspense fallback={null}>
          <div className="p-4">
            <VideoPlayer />
            <Shortcuts />
          </div>
        </Suspense>
        <Suspense fallback={<div className="absolute text-white bottom-[15%] right-1/2">Loading...</div>}>
          <div data-testid="currentSubtitles">
            <CurrentSubtitle />
          </div>
        </Suspense>
      </div>
      <Suspense fallback={null}>
        <Browser />
      </Suspense>
    </div>
  );
}

export function Shortcuts() {
  const platform = getPlatform();
  const shortcuts = [
    ...(platform === 'mac' ? VIDEO_PLAYER_SHORTCUTS.mac : VIDEO_PLAYER_SHORTCUTS.other),
    ...VIDEO_PLAYER_SHORTCUTS.common,
  ];

  return (
    <div className="flex gap-2">
      {shortcuts.map((shortcut) => (
        <div className="flex p-2 bg-content3 rounded-medium max-w-max">
          <Kbd keys={shortcut.keys}>{shortcut.key}</Kbd>
          <label className="ml-2">{shortcut.label}</label>
        </div>
      ))}
    </div>
  );
}

export function VideoPlayer() {
  const libraryItem = useLibraryItem();
  const { subtitles } = useSubtitles();
  const resetSubtitleStore = useSubtitleStore((state) => state.reset);
  const setCurrentSubtitle = useSubtitleStore((state) => state.setCurrentSubtitle);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  useRegisterHotkeys(videoRef);

  const getCurrentSubtitle = (subtitles: Subtitle[], timestamp: number) => {
    const index = subtitles.findIndex((subtitle) => {
      const start = timecodeToSeconds(subtitle.startTime);
      const end = timecodeToSeconds(subtitle.endTime);
      return start <= timestamp && timestamp <= end;
    });

    if (index === -1) return null;

    return { value: subtitles[index], index };
  };

  useEffect(() => {
    const currentPlayer = videoRef.current;
    const handleTimeUpdate = () => {
      const timestamp = videoRef.current?.currentTime ?? 0;
      const subtitle = getCurrentSubtitle(subtitles, timestamp);

      if (subtitle) {
        setCurrentSubtitle(subtitle.value, subtitle.index);
      }
    };

    if (currentPlayer) {
      currentPlayer.addEventListener('timeupdate', handleTimeUpdate);
    }
    return () => {
      resetSubtitleStore();
      currentPlayer?.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, [videoRef, subtitles, setCurrentSubtitle, resetSubtitleStore]);

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
  const currentSubtitle = useSubtitleStore((state) => state.currentSubtitle);
  return (
    <SubtitleLine
      subtitle={currentSubtitle}
      containerClassName="absolute bottom-[15%] w-full flex justify-center"
      subtitleClassName="bg-content1/40 backdrop-blur-md backdrop-saturate-150 text-2xl rounded p-2"
    />
  );
}

export default FeatureMediaPlayerUi;
