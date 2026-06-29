import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Music, Pause, Play, Volume2 } from 'lucide-react';
import { useExperience } from '../../context/ExperienceContext';
import { useMediaExists } from '../../hooks/useMedia';
import { YouTubeAudio, type YouTubePlayerHandle } from './YouTubeAudio';

interface AudioPlayerProps {
  track: string;
  ambient?: string;
  audioSrc?: string;
  ambientSrc?: string;
  youtubeId?: string;
  youtubeUrl?: string;
  isPlaying?: boolean;
  variant?: 'inline' | 'bar';
  autoPlay?: boolean;
}

export function AudioPlayer({
  track,
  ambient,
  audioSrc,
  ambientSrc,
  youtubeId,
  youtubeUrl,
  isPlaying = true,
  variant = 'inline',
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

  const handleYoutubeToggle = () => {
    if (!ytRef.current?.isReady()) return;
    if (ytPlaying) {
      ytRef.current.pause();
    } else {
      ytRef.current.play();
    }
  };

  const playing = hasLocalAudio ? localPlaying && isPlaying : ytPlaying;

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

      <motion.div
        className={`audio-player audio-player--${variant} ${
          useYoutube && !ytPlaying ? 'audio-player--prompt' : ''
        }`}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        {hasLocalAudio && audioSrc && (
          <audio ref={audioRef} src={audioSrc} loop preload="auto" />
        )}
        {hasAmbient && ambientSrc && (
          <audio ref={ambientRef} src={ambientSrc} loop preload="auto" />
        )}

        {useYoutube && (
          <button
            type="button"
            className={`audio-player__play-btn ${ytPlaying ? 'playing' : ''}`}
            onClick={handleYoutubeToggle}
            disabled={!ytReady}
            aria-label={ytPlaying ? 'Pausar música' : 'Reproducir música'}
          >
            {ytPlaying ? <Pause size={variant === 'bar' ? 22 : 16} /> : <Play size={variant === 'bar' ? 22 : 16} />}
          </button>
        )}

        <div className="audio-player__icon">
          {playing ? (
            <motion.div
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ repeat: Infinity, duration: 1.2 }}
            >
              <Volume2 size={variant === 'bar' ? 22 : 18} />
            </motion.div>
          ) : (
            <Music size={variant === 'bar' ? 22 : 18} />
          )}
        </div>

        <div className="audio-player__info">
          <span className="audio-player__track">{track}</span>
          {ambient && variant === 'inline' && (
            <span className="audio-player__ambient">{ambient}</span>
          )}
          {useYoutube && !ytPlaying && (
            <span className="audio-player__prompt">
              {ytReady
                ? autoPlay
                  ? 'Tocá ▶ si no arrancó solo'
                  : 'Tocá ▶ para escuchar'
                : 'Cargando música…'}
            </span>
          )}
          {useYoutube && youtubeUrl && (
            <a
              className="audio-player__youtube"
              href={youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLink size={12} />
              Abrir en YouTube
            </a>
          )}
        </div>

        {playing && (
          <div className="audio-player__bars">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="audio-player__bar"
                animate={{ scaleY: [0.3, 1, 0.5, 0.8, 0.3] }}
                transition={{
                  repeat: Infinity,
                  duration: 0.8,
                  delay: i * 0.1,
                }}
              />
            ))}
          </div>
        )}
      </motion.div>
    </>
  );
}