import type { PinId } from './types';

export interface MediaConfig {
  /** Archivo local opcional — tiene prioridad sobre YouTube */
  audio?: string;
  ambient?: string;
  /** ID de YouTube para reproducir en la experiencia */
  youtubeId?: string;
}

/** Audio ambiente de la maqueta (página principal) */
export const HOME_AMBIENT: MediaConfig = {
  youtubeId: 'P1F9MiPr2Vs',
};

/**
 * Música por experiencia.
 * Si existe el MP3 en public/media/audio/, se usa ese.
 * Si no, reproduce el track de YouTube.
 */
export const MEDIA_PATHS: Record<PinId, MediaConfig> = {
  faro: {
    audio: '/media/audio/faro.mp3',
    ambient: '/media/audio/faro-ambient.mp3',
    youtubeId: 'ISDi9NEKGlw',
  },
  museo: {
    audio: '/media/audio/museo.mp3',
    ambient: '/media/audio/museo-ambient.mp3',
    youtubeId: 'QsZ9kuBMp7U',
  },
  pareja: {
    audio: '/media/audio/pareja.mp3',
    youtubeId: 'dDte-Nd9voY',
  },
  obelisco: {
    audio: '/media/audio/obelisco.mp3',
    youtubeId: '4u_21EqZ1Sc',
  },
  observatorio: {
    audio: '/media/audio/observatorio.mp3',
    youtubeId: 'WLjF6qDjLjw',
  },
  cierre: {
    audio: '/media/audio/cierre.mp3',
    youtubeId: 'xa1FDFxVYSw',
  },
};