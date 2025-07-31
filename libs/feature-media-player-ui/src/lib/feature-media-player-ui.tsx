/* eslint-disable-next-line */
import { SubtitleLine } from './subtitles/subtitles.js';
import { Suspense, useEffect, useRef } from 'react';
import { useLibraryItem } from './hooks/useMedia.js';
import useSubtitles from './hooks/useSubtitles.js';
import { Browser } from './subtitles/browser.js';
import { Kbd } from '@heroui/react';
import { getPlatform } from '@immersion-player/shared-utils';
import { VIDEO_PLAYER_SHORTCUTS } from './constant.js';
import { useSubtitleStore } from './state/subtitle.store.js';
import { useRegisterHotkeys } from './hooks/useRegisterHotkeys.js';
import { useSubtitleTracking } from './hooks/useSubtitleTracking.js';
import ReactPlayer from 'react-player';
import {
  MediaControlBar,
  MediaController,
  MediaMuteButton,
  MediaPlayButton,
  MediaTimeDisplay,
  MediaTimeRange,
  MediaVolumeRange,
} from 'media-chrome/react';

function setAttributes(el: HTMLElement | null, attrs: Record<string, string | number>) {
  if (!el) return;
  Object.entries(attrs).forEach(([key, value]) => {
    el.setAttribute(key, value.toString());
  });
}

export function FeatureMediaPlayerUi() {
  return (
    <Suspense fallback={null}>
      <div className="grid grid-cols-4 h-full w-full">
        <div className="max-h-full aspect-video col-span-3 m-4">
          <div className="relative">
            <VideoPlayer />
            <div data-testid="currentSubtitle">
              <CurrentSubtitle />
            </div>
          </div>
          <Shortcuts />
        </div>
        <Browser />
      </div>
    </Suspense>
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
  const videoRef = useRef<HTMLVideoElement | null>(null);
  useRegisterHotkeys(videoRef);
  useSubtitleTracking(videoRef);

  const mediaControllerRef = useRef<any>(null);
  const timeRangeRef = useRef<any>(null);
  const timeDisplayRef = useRef<any>(null);
  const muteRef = useRef<any>(null);
  const volumeRef = useRef<any>(null);
  const playRef = useRef<any>(null);

  useEffect(() => {
    const controlRefs = [mediaControllerRef, timeRangeRef, timeDisplayRef, muteRef, volumeRef, playRef];

    controlRefs.forEach((ref) => {
      setAttributes(ref.current, {
        nohotkeys: '',
        tabIndex: -1,
        keysused: 'noarrowleft noarrowright nospace nom nok nof noc',
      });
    });
  }, []);

  return (
    <MediaController ref={mediaControllerRef} style={{ width: '100%', aspectRatio: '16/9' }}>
      <ReactPlayer
        data-testid="video-player"
        slot="media"
        ref={videoRef}
        controls={false}
        style={{ width: '100%', height: '100%', outline: 'none' }}
        src={libraryItem.path}
      ></ReactPlayer>
      <MediaControlBar>
        <MediaPlayButton ref={playRef} />
        <MediaTimeRange ref={timeRangeRef} />
        <MediaTimeDisplay ref={timeDisplayRef} showDuration />
        <MediaMuteButton ref={muteRef} />
        <MediaVolumeRange ref={volumeRef} />
      </MediaControlBar>
    </MediaController>
  );
}

export function CurrentSubtitle() {
  const currentSubtitle = useSubtitleStore((state) => state.currentSubtitle);
  const currentSubtitleIndex = useSubtitleStore((state) => state.currentSubtitleIndex);
  const { subtitles } = useSubtitles();
  
  // Find corresponding secondary subtitle based on index
  const currentSecondarySubtitle = currentSubtitleIndex !== null && subtitles.secondary.length > currentSubtitleIndex 
    ? subtitles.secondary[currentSubtitleIndex] 
    : null;
  
  return (
    <div className="absolute bottom-[60px] w-full flex flex-col items-center gap-2">
      <SubtitleLine
        subtitle={currentSubtitle}
        containerClassName="flex justify-center"
        subtitleClassName="bg-content1/40 backdrop-blur-md backdrop-saturate-150 text-2xl rounded p-2"
      />
      {currentSecondarySubtitle && (
        <SubtitleLine
          subtitle={currentSecondarySubtitle}
          containerClassName="flex justify-center"
          subtitleClassName="bg-content1/20 backdrop-blur-md backdrop-saturate-150 text-lg rounded p-1 opacity-80"
          disableDictionary={true}
        />
      )}
    </div>
  );
}

export default FeatureMediaPlayerUi;
