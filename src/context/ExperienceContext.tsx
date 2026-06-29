import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import type { PinId } from '../data/types';

const MAIN_PINS: PinId[] = [
  'faro',
  'museo',
  'pareja',
  'obelisco',
  'observatorio',
];

interface ExperienceContextValue {
  visitedPins: Set<PinId>;
  activeExperience: PinId | null;
  introComplete: boolean;
  isInLoop: boolean;
  /** Incrementa tras cada gesto del usuario para intentar autoplay */
  playbackRequest: number;
  visitPin: (id: PinId) => void;
  openExperience: (id: PinId) => void;
  closeExperience: () => void;
  completeIntroWithMusic: () => void;
  setInLoop: (value: boolean) => void;
  allMainVisited: boolean;
  cierreUnlocked: boolean;
}

const ExperienceContext = createContext<ExperienceContextValue | null>(null);

export function ExperienceProvider({ children }: { children: ReactNode }) {
  const [visitedPins, setVisitedPins] = useState<Set<PinId>>(new Set());
  const [activeExperience, setActiveExperience] = useState<PinId | null>(null);
  const [introComplete, setIntroComplete] = useState(false);
  const [isInLoop, setIsInLoop] = useState(false);
  const [playbackRequest, setPlaybackRequest] = useState(0);

  const bumpPlayback = useCallback(() => {
    setPlaybackRequest((n) => n + 1);
  }, []);

  const visitPin = useCallback((id: PinId) => {
    setVisitedPins((prev) => new Set([...prev, id]));
  }, []);

  const openExperience = useCallback(
    (id: PinId) => {
      setActiveExperience(id);
      setIsInLoop(false);
      bumpPlayback();
    },
    [bumpPlayback],
  );

  const closeExperience = useCallback(() => {
    if (activeExperience) {
      visitPin(activeExperience);
    }
    setActiveExperience(null);
    setIsInLoop(false);
    bumpPlayback();
  }, [activeExperience, visitPin, bumpPlayback]);

  const completeIntroWithMusic = useCallback(() => {
    setIntroComplete(true);
    bumpPlayback();
  }, [bumpPlayback]);

  const allMainVisited = MAIN_PINS.every((p) => visitedPins.has(p));
  const cierreUnlocked = allMainVisited;

  const value = useMemo(
    () => ({
      visitedPins,
      activeExperience,
      introComplete,
      isInLoop,
      playbackRequest,
      visitPin,
      openExperience,
      closeExperience,
      completeIntroWithMusic,
      setInLoop: setIsInLoop,
      allMainVisited,
      cierreUnlocked,
    }),
    [
      visitedPins,
      activeExperience,
      introComplete,
      isInLoop,
      playbackRequest,
      visitPin,
      openExperience,
      closeExperience,
      completeIntroWithMusic,
      allMainVisited,
      cierreUnlocked,
    ],
  );

  return (
    <ExperienceContext.Provider value={value}>
      {children}
    </ExperienceContext.Provider>
  );
}

export function useExperience() {
  const ctx = useContext(ExperienceContext);
  if (!ctx) throw new Error('useExperience must be used within ExperienceProvider');
  return ctx;
}