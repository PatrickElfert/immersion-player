/* eslint-disable-next-line */
import useLibrary from '../../../feature-content-library-ui/src/lib/hooks/useLibrary';
import { useLocation } from 'react-router-dom';
import skip from './skip.svg';
import start from './play.svg';
import stop from './pause.svg';
import useVideo from './useVideo';
import { useRef } from 'react';

export interface FeatureMediaPlayerUiProps {}

export function FeatureMediaPlayerUi(props: FeatureMediaPlayerUiProps) {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const media = useLibrary().find((entry) => entry.id === params.get('id'));
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const { play, pause, stats } = useVideo(videoRef);

  console.log(stats.playbackPercentage);

  if (media) {
    return (
      <div className="w-full">
        <div className="relative">
          <video
            ref={videoRef}
            className="w-full"
          >
            <source src={media.path} />
          </video>
          <div className="absolute bottom-0 left-0 flex flex-col items-center w-full py-4">
            <div className="w-full flex items-center justify-center pb-3">
              <img className="cursor-pointer w-4 h-4" src={skip} />
              {stats.isPlaying ? (
                <img onClick={() => pause()} className="cursor-pointer w-8 h-8 mx-6" src={stop} />
              ) : (
                <img onClick={() => play()} className="cursor-pointer w-8 h-8 mx-6" src={start} />
              )}
              <img className="cursor-pointer w-4 h-4 rotate-180" src={skip} />
            </div>
            <div className="w-[90%] flex items-center relative">
              <div className="w-full bg-gray-400 h-1"></div>
              <div
                style={{ width: `${stats.playbackPercentage}%` }}
                className="absolute bg-white h-1"
              ></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default FeatureMediaPlayerUi;
