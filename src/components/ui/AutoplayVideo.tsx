import { useEffect, useRef } from 'react';
import { useExperience } from '../../context/ExperienceContext';

interface AutoplayVideoProps extends React.VideoHTMLAttributes<HTMLVideoElement> {
  src?: string;
  sources?: { src: string; type?: string }[];
  /** Reintenta play cuando cambia (p. ej. al abrir cortinas) */
  active?: boolean;
  preloadStrategy?: 'auto' | 'metadata';
}

export function AutoplayVideo({
  src,
  sources,
  active = true,
  preloadStrategy = 'auto',
  className,
  ...props
}: AutoplayVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const { playbackRequest } = useExperience();

  useEffect(() => {
    const video = ref.current;
    if (!video || !active) return;

    const tryPlay = () => {
      if (video.paused) {
        video.play().catch(() => {});
      }
    };

    tryPlay();
    video.addEventListener('canplay', tryPlay);
    video.addEventListener('loadeddata', tryPlay);

    return () => {
      video.removeEventListener('canplay', tryPlay);
      video.removeEventListener('loadeddata', tryPlay);
    };
  }, [src, sources, active, playbackRequest]);

  return (
    <video
      ref={ref}
      className={className}
      autoPlay
      muted
      loop
      playsInline
      preload={preloadStrategy}
      {...props}
    >
      {sources?.map((source) => (
        <source key={source.src} src={source.src} type={source.type ?? 'video/mp4'} />
      ))}
      {src && !sources && <source src={src} type="video/mp4" />}
    </video>
  );
}