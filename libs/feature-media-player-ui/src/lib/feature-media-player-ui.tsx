/* eslint-disable-next-line */
import useLibrary from '../../../feature-content-library-ui/src/lib/hooks/useLibrary';
import { useLocation } from 'react-router-dom';

export interface FeatureMediaPlayerUiProps {}

export function FeatureMediaPlayerUi(props: FeatureMediaPlayerUiProps) {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const media = useLibrary().find((entry) => entry.id === params.get('id'));

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
