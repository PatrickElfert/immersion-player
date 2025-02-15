/* eslint-disable-next-line */
import { Subtitles } from './subtitles/subtitles';
import { useRef } from 'react';
import useSubtitles from './hooks/useSubtitles';
import { useMedia } from './hooks/useMedia';
import { Browser } from './browser/browser';
import { usePlayback } from './hooks/usePlayback';

export function FeatureMediaPlayerUi() {
  const media = useMedia();
  const japaneseLanguage = media?.language.find((l) => l.languageCode === 'ja');
  const { subtitles, isLoading } = useSubtitles(japaneseLanguage?.path);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const {currentSubtitle} = usePlayback(videoRef, subtitles ?? [])


  if (!media) {
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
          src={media.path}
        ></video>
        {isLoading && <div className="absolute text-white bottom-[15%] right-1/2">Loading...</div>}

        {!isLoading && (
          <Subtitles
            className="absolute bottom-[15%] w-full flex justify-center"
            mediaPath={media.path}
            currentSubtitle={currentSubtitle}
          />
        )}
      </div>
      {!isLoading && (
        <Browser
          subtitles={subtitles}
          currentSubtitle={currentSubtitle}
        />
      )}
    </div>
  );
}

export default FeatureMediaPlayerUi;
