import { useEffect, useRef, useState } from 'react';
import { HOME_AMBIENT } from '../../data/media';
import { useExperience } from '../../context/ExperienceContext';
import { YouTubeAudio, type YouTubePlayerHandle } from '../ui/YouTubeAudio';

export function HomeAmbient() {
  const { introComplete, activeExperience, playbackRequest } = useExperience();
  const ytRef = useRef<YouTubePlayerHandle>(null);
  const [ytReady, setYtReady] = useState(false);

  const shouldPlay = introComplete && !activeExperience;

  useEffect(() => {
    if (!HOME_AMBIENT.youtubeId) return;
    if (shouldPlay && ytReady) {
      ytRef.current?.play();
    } else {
      ytRef.current?.pause();
    }
  }, [shouldPlay, ytReady, playbackRequest]);

  if (!introComplete || !HOME_AMBIENT.youtubeId) return null;

  return (
    <YouTubeAudio
      ref={ytRef}
      videoId={HOME_AMBIENT.youtubeId}
      onReadyChange={(ready) => {
        setYtReady(ready);
        if (ready && shouldPlay) ytRef.current?.play();
      }}
    />
  );
}