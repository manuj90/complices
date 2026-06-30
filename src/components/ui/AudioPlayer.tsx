import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Pause, Play } from 'lucide-react';
import { useExperience } from '../../context/ExperienceContext';
import { useMediaExists } from '../../hooks/useMedia';
import { YouTubeAudio, type YouTubePlayerHandle } from './YouTubeAudio';

interface AudioPlayerProps {
  track: string;
  ambient?: string;
  audioSrc?: string;
  ambientSrc?: string;
  youtubeId?: string;
  isPlaying?: boolean;
  autoPlay?: boolean;
}

export function AudioPlayer({
  track,
  audioSrc,
  ambientSrc,
  youtubeId,
  isPlaying = true,
  autoPlay = true,
}: AudioPlayerProps) {
  const { playbackRequest } = useExperience();
  const audioRef = useRef<HTMLAudioElement>(null);
  const ambientRef = useRef<HTMLAudioElement>(null);
  const ytRef = useRef<YouTubePlayerHandle>(null);

  const hasLocalAudio = useMediaExists(audioSrc);
  const hasAmbient = useMediaExists(ambientSrc);

  const [ytReady, setYtReady] = useState(false);
  const [ytPlaying, setYtPlaying] = useState(false);
  const [localPlaying, setLocalPlaying] = useState(false);

  const useYoutube = !!youtubeId && !hasLocalAudio;

  useEffect(() => {
    if (!hasLocalAudio || !audioRef.current) return;
    if (isPlaying) {
      audioRef.current
        .play()
        .then(() => setLocalPlaying(true))
        .catch(() => setLocalPlaying(false));
    } else {
      audioRef.current.pause();
      setLocalPlaying(false);
    }
  }, [hasLocalAudio, isPlaying, audioSrc]);

  useEffect(() => {
    if (!hasAmbient || !ambientRef.current) return;
    if (isPlaying) {
      ambientRef.current.volume = 0.35;
      ambientRef.current.play().catch(() => {});
    } else {
      ambientRef.current.pause();
    }
  }, [hasAmbient, isPlaying, ambientSrc]);

  useEffect(() => {
    if (!isPlaying) {
      ytRef.current?.pause();
      setYtPlaying(false);
    }
  }, [isPlaying]);

  useEffect(() => {
    if (!autoPlay || !isPlaying || !useYoutube || !ytReady) return;
    ytRef.current?.play();
  }, [autoPlay, isPlaying, useYoutube, ytReady, playbackRequest]);

  const handleToggle = () => {
    if (useYoutube) {
      if (!ytRef.current?.isReady()) return;
      if (ytPlaying) {
        ytRef.current.pause();
      } else {
        ytRef.current.play();
      }
      return;
    }

    const audio = audioRef.current;
    if (!audio) return;

    if (localPlaying) {
      audio.pause();
      ambientRef.current?.pause();
      setLocalPlaying(false);
      return;
    }

    audio
      .play()
      .then(() => setLocalPlaying(true))
      .catch(() => setLocalPlaying(false));

    if (ambientRef.current) {
      ambientRef.current.volume = 0.35;
      ambientRef.current.play().catch(() => {});
    }
  };

  const playing = hasLocalAudio ? localPlaying && isPlaying : ytPlaying;
  const hasAudio = useYoutube || hasLocalAudio;

  if (!hasAudio) return null;

  return (
    <>
      {useYoutube && isPlaying && youtubeId && (
        <YouTubeAudio
          ref={ytRef}
          videoId={youtubeId}
          active={ytPlaying}
          onPlayingChange={setYtPlaying}
          onReadyChange={(ready) => {
            setYtReady(ready);
            if (ready && autoPlay && isPlaying) ytRef.current?.play();
          }}
        />
      )}

      <motion.button
        type="button"
        className={`audio-player__play-btn ${playing ? 'playing' : ''}`}
        onClick={handleToggle}
        disabled={useYoutube && !ytReady}
        aria-label={playing ? 'Pausar música' : 'Reproducir música'}
        title={track}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        {playing ? <Pause size={14} /> : <Play size={14} />}
      </motion.button>

      {hasLocalAudio && audioSrc && (
        <audio ref={audioRef} src={audioSrc} loop preload="auto" />
      )}
      {hasAmbient && ambientSrc && (
        <audio ref={ambientRef} src={ambientSrc} loop preload="auto" />
      )}
    </>
  );
}