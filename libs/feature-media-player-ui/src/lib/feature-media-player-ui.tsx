/* eslint-disable-next-line */
import useLibrary from '../../../feature-content-library-ui/src/lib/hooks/useLibrary';
import { useLocation } from 'react-router-dom';
import skip from './skip.svg';

export interface FeatureMediaPlayerUiProps {}

export function FeatureMediaPlayerUi(props: FeatureMediaPlayerUiProps) {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const media = useLibrary().find((entry) => entry.id === params.get('id'));

  console.log(media);

  if (media) {
    return (
      <div className="h-full w-full">
        <div className="relative">
          <video className="w-full">
            <source src={media.path} />
          </video>
          <div className="absolute bottom-0 left-0 flex w-full">
            <div className="w-full flex align-items-center justify-center py-8">
              <img className="w-4 h-4" src={skip} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default FeatureMediaPlayerUi;
