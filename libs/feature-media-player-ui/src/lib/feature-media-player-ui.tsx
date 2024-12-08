/* eslint-disable-next-line */
import { useLocation } from 'react-router-dom';
import useSubtitles from './hooks/useSubtitles';
import { useLibrary } from '@immersion-player/feature-content-library-ui';

export function FeatureMediaPlayerUi() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const media = useLibrary().find((entry) => entry.id === params.get('id'));
  const japaneseLanguage = media?.language.find((l) => l.languageCode === 'ja');

  const { subtitles, isLoading } = useSubtitles(japaneseLanguage?.path);

  console.log(subtitles);

  if (media) {
    return (
      <div className="relative pt-[56.25%]">
        <video
          controls
          src={media.path}
          height="100%"
          width="100%"
          className={'absolute top-0 left-0'}
        ></video>
      </div>
    );
  }
}

export default FeatureMediaPlayerUi;
