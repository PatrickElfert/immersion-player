import {RefObject, useEffect, useMemo, useRef, useState} from 'react';
type VideoStats = {
  currentTime: number;
  duration: number;
  isPlaying: boolean;
};

export default function useVideo(videoRef: RefObject<HTMLVideoElement>) {
  const [stats, setStats] = useState<VideoStats>({
    currentTime: 0,
    duration: 0,
    isPlaying: false,
  });

  const animationFrameRef = useRef<number | null>(null);

  const updateStats = () => {
    const video = videoRef.current;
    if (!video) return;

    setStats((prev) => ({
      ...prev,
      currentTime: video.currentTime,
      playbackPercentage: (video.currentTime / video.duration) * 100 || 0,
    }));

    if (video.paused || video.ended) {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
    } else {
      animationFrameRef.current = requestAnimationFrame(updateStats);
    }
  };

  const play = () => {
    console.log(videoRef.current)
    videoRef.current?.play();
  };

  const pause = () => {
    videoRef.current?.pause();
  };

  const playbackPercentage = useMemo(() => {
    if (stats.duration === 0) return 0;
    return (stats.currentTime / stats.duration) * 100;
  }, [stats.currentTime, stats.duration]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) {
      return;
    }

    const handleTimeUpdate = () => {
      setStats((prev) => ({ ...prev, currentTime: video.currentTime }));
    };

    const handleLoadedMetadata = () => {
      setStats((prev) => ({ ...prev, duration: video.duration }));
    };

    const handlePlay = () => {
      setStats((prev) => ({ ...prev, isPlaying: true }));
      if (!animationFrameRef.current) {
        animationFrameRef.current = requestAnimationFrame(updateStats);
      }
    };

    const handlePause = () => {
      setStats((prev) => ({ ...prev, isPlaying: false }));
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener("play", handlePlay);
    video.addEventListener("pause", handlePause);

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener("play", handlePlay);
      video.removeEventListener("pause", handlePause);
    };
  }, [videoRef]);

  return { play, pause, stats: {...stats, playbackPercentage} };
}
