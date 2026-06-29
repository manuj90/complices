import type { PinId } from './types';

export interface MediaConfig {
  /** Archivo local opcional — tiene prioridad sobre YouTube */
  audio?: string;
  video?: string;
  ambient?: string;
  /** ID de YouTube para reproducir en la experiencia */
  youtubeId?: string;
  youtubeUrl?: string;
}

/** Audio ambiente de la maqueta (página principal) */
export const HOME_AMBIENT: MediaConfig = {
  youtubeId: 'P1F9MiPr2Vs',
  youtubeUrl: 'https://www.youtube.com/watch?v=P1F9MiPr2Vs',
};

/**
 * Música por experiencia.
 * Si existe el MP3 en public/media/audio/, se usa ese.
 * Si no, reproduce el track de YouTube.
 */
export const MEDIA_PATHS: Record<PinId, MediaConfig> = {
  faro: {
    audio: '/media/audio/faro.mp3',
    video: '/media/video/faro-loop.mp4',
    ambient: '/media/audio/faro-ambient.mp3',
    youtubeId: 'ISDi9NEKGlw',
    youtubeUrl: 'https://www.youtube.com/watch?v=ISDi9NEKGlw',
  },
  museo: {
    audio: '/media/audio/museo.mp3',
    video: '/media/video/museo-loop.mp4',
    ambient: '/media/audio/museo-ambient.mp3',
    youtubeId: 'QsZ9kuBMp7U',
    youtubeUrl: 'https://www.youtube.com/watch?v=QsZ9kuBMp7U',
  },
  pareja: {
    audio: '/media/audio/pareja.mp3',
    video: '/media/video/pareja-loop.mp4',
    youtubeId: 'dDte-Nd9voY',
    youtubeUrl: 'https://www.youtube.com/watch?v=dDte-Nd9voY',
  },
  obelisco: {
    audio: '/media/audio/obelisco.mp3',
    video: '/media/video/obelisco-loop.mp4',
    youtubeId: '4u_21EqZ1Sc',
    youtubeUrl: 'https://www.youtube.com/watch?v=4u_21EqZ1Sc',
  },
  observatorio: {
    audio: '/media/audio/observatorio.mp3',
    video: '/media/video/observatorio-loop.mp4',
    youtubeId: 'urJjTSfIOrA',
    youtubeUrl: 'https://www.youtube.com/watch?v=urJjTSfIOrA',
  },
  cierre: {
    audio: '/media/audio/cierre.mp3',
    video: '/media/video/cierre-loop.mp4',
    youtubeId: 'xa1FDFxVYSw',
    youtubeUrl: 'https://www.youtube.com/watch?v=xa1FDFxVYSw',
  },
};