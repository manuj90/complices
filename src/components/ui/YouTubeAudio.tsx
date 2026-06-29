import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { loadYouTubeAPI } from '../../hooks/useYouTubeAPI';
import type { YTPlayer } from '../../types/youtube';

export interface YouTubePlayerHandle {
  play: () => void;
  pause: () => void;
  isReady: () => boolean;
}

interface YouTubeAudioProps {
  videoId: string;
  active?: boolean;
  onPlayingChange?: (playing: boolean) => void;
  onReadyChange?: (ready: boolean) => void;
}

export const YouTubeAudio = forwardRef<YouTubePlayerHandle, YouTubeAudioProps>(
  function YouTubeAudio({ videoId, active = false, onPlayingChange, onReadyChange }, ref) {
    const onPlayingRef = useRef(onPlayingChange);
    const onReadyRef = useRef(onReadyChange);
    onPlayingRef.current = onPlayingChange;
    onReadyRef.current = onReadyChange;
    const containerRef = useRef<HTMLDivElement>(null);
    const playerRef = useRef<YTPlayer | null>(null);
    const readyRef = useRef(false);
    const [error, setError] = useState(false);

    useImperativeHandle(ref, () => ({
      play: () => {
        if (playerRef.current && readyRef.current) {
          playerRef.current.playVideo();
        }
      },
      pause: () => {
        playerRef.current?.pauseVideo();
      },
      isReady: () => readyRef.current,
    }));

    useEffect(() => {
      if (!videoId || !containerRef.current) return;

      let destroyed = false;
      readyRef.current = false;
      onReadyRef.current?.(false);
      setError(false);

      loadYouTubeAPI().then(() => {
        if (destroyed || !containerRef.current || !window.YT) return;

        playerRef.current = new window.YT.Player(containerRef.current, {
          videoId,
          playerVars: {
            autoplay: 0,
            loop: 1,
            playlist: videoId,
            controls: 0,
            modestbranding: 1,
            rel: 0,
            playsinline: 1,
            origin: window.location.origin,
          },
          events: {
            onReady: () => {
              if (destroyed) return;
              readyRef.current = true;
              onReadyRef.current?.(true);
            },
            onStateChange: (event) => {
              if (destroyed || !window.YT) return;
              const playing = event.data === window.YT.PlayerState.PLAYING;
              onPlayingRef.current?.(playing);
            },
            onError: () => {
              if (!destroyed) setError(true);
            },
          },
        });
      });

      return () => {
        destroyed = true;
        readyRef.current = false;
        onReadyRef.current?.(false);
        onPlayingRef.current?.(false);
        try {
          playerRef.current?.destroy();
        } catch {
          /* player already destroyed */
        }
        playerRef.current = null;
      };
    }, [videoId]);

    return (
      <div
        className={`youtube-audio ${active ? 'youtube-audio--active' : ''} ${
          error ? 'youtube-audio--error' : ''
        }`}
      >
        <div ref={containerRef} className="youtube-audio__target" />
      </div>
    );
  },
);