/* eslint-disable-next-line */
import { Subtitles } from './subtitles/subtitles';
import { useRef } from 'react';
import useSubtitles from './hooks/useSubtitles';
import { useMedia } from './hooks/useMedia';

export function FeatureMediaPlayerUi() {
  const media = useMedia();
  const japaneseLanguage = media?.language.find((l) => l.languageCode === 'ja');
  const { subtitles, isLoading } = useSubtitles(japaneseLanguage?.path);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  if (media) {
    return (
      <div className="relative max-h-full aspect-video">
        <video
          ref={videoRef}
          controls
          style={{width: "100%", height: "auto"}}
          controlsList={'nofullscreen'}
          src={media.path}
        ></video>
        {isLoading && <div className="absolute text-white bottom-[15%] right-1/2">Loading...</div>}

        {!isLoading && subtitles && (
          <Subtitles
            className="absolute bottom-[15%] w-full flex justify-center"
            mediaPath={media.path}
            subtitles={subtitles}
            videoPlayerRef={videoRef}
          />
        )}
      </div>
    );
  }
}

export default FeatureMediaPlayerUi;
