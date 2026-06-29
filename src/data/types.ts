export type PinId =
  | 'faro'
  | 'museo'
  | 'pareja'
  | 'obelisco'
  | 'observatorio'
  | 'cierre';

export interface PinConfig {
  id: PinId;
  label: string;
  building: string;
  position: [number, number, number];
  color: string;
  glowColor: string;
  icon: string;
  summary: string;
  music?: string;
  lights?: [string, string];
}

export interface NarrationBeat {
  text: string;
  delay?: number;
  visual?: string;
}

export interface DialogueLine {
  speaker: 'A' | 'B';
  text: string;
  delay?: number;
}

export interface ExperienceData {
  id: PinId;
  title: string;
  subtitle: string;
  music: string;
  ambientSound: string;
  lights: [string, string];
  intro: string[];
  narrations: NarrationBeat[];
  loopDescription: string;
  dialogue?: DialogueLine[];
  finalText?: string;
}