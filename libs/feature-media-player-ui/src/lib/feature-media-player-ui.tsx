/* eslint-disable-next-line */
import { useLocation } from 'react-router-dom';
import { useLibrary } from '@immersion-player/feature-content-library-ui';
import { Subtitles } from './subtitles/subtitles';
import { useRef } from 'react';
import useSubtitles from './hooks/useSubtitles';

export function FeatureMediaPlayerUi() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const libraryItem = useLibrary().find((entry) => entry.id === params.get('id'));
  const japaneseLanguage = libraryItem?.language.find((l) => l.languageCode === 'ja');
  const { subtitles, isLoading } = useSubtitles(japaneseLanguage?.path);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  if (libraryItem) {
    return (
      <div className="relative">
        <video
          ref={videoRef}
          controls
          controlsList={'nofullscreen'}
          src={libraryItem.path}
          height="100%"
          width="100%"
        ></video>
        {isLoading && <div className="absolute text-white bottom-[15%] right-1/2">Loading...</div>}

        {!isLoading && subtitles && (
          <Subtitles
            className="absolute bottom-[15%] w-full flex justify-center"
            subtitles={subtitles}
            videoPlayerRef={videoRef}
          />
        )}
      </div>
    );
  }
}

export default FeatureMediaPlayerUi;
