/* eslint-disable-next-line */
import { useLocation } from 'react-router-dom';
import { useLibrary } from '@immersion-player/feature-content-library-ui';
import { Subtitles } from './subtitles/subtitles';
import { useRef } from 'react';
import useSubtitles from './hooks/useSubtitles';

export function FeatureMediaPlayerUi() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const libraryItem = useLibrary().find(
    (entry) => entry.id === params.get('id')
  );
  const japaneseLanguage = libraryItem?.language.find(
    (l) => l.languageCode === 'ja'
  );
  const { subtitles, isLoading } = useSubtitles(japaneseLanguage?.path);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  if (libraryItem) {
    return (
      <div className="relative pt-[56.25%]">
        <video
          ref={videoRef}
          controls
          src={libraryItem.path}
          height="100%"
          width="100%"
          className={'absolute top-0 left-0'}
        ></video>
        {
          isLoading && <div className="absolute text-white bottom-[15%] right-1/2">Loading...</div>
        }

        {!isLoading && subtitles && (
          <Subtitles className="absolute bottom-0 left-0" subtitles={subtitles} videoPlayerRef={videoRef} />
        )}
      </div>
    );
  }
}

export default FeatureMediaPlayerUi;
