import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { SkipForward } from 'lucide-react';
import { loadYouTubeAPI } from '../../hooks/useYouTubeAPI';
import { INTRO_NARRATION, PROMESA } from '../../data/experiences';
import { useExperience } from '../../context/ExperienceContext';
import { Logo } from '../ui/Logo';

export function IntroOverlay() {
  const { introComplete, completeIntroWithMusic } = useExperience();
  const [lineIndex, setLineIndex] = useState(0);
  const [showEnter, setShowEnter] = useState(false);

  useEffect(() => {
    if (introComplete) return;

    if (lineIndex < INTRO_NARRATION.length) {
      const timer = setTimeout(() => setLineIndex((i) => i + 1), 2500);
      return () => clearTimeout(timer);
    }
    setShowEnter(true);
  }, [lineIndex, introComplete]);

  const dismiss = () => {
    loadYouTubeAPI();
    completeIntroWithMusic();
    gsap.to('.intro-overlay', {
      opacity: 0,
      duration: 0.8,
      ease: 'power2.inOut',
    });
  };

  if (introComplete) return null;

  return (
    <div className="intro-overlay">
      <div className="intro-overlay__fog" />
      <div className="intro-overlay__vibration" />

      <button className="intro-overlay__skip" onClick={dismiss} type="button">
        <SkipForward size={16} />
        Saltar intro
      </button>

      <motion.div
        className="intro-overlay__logo"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <Logo variant="intro" />
        <p className="intro-overlay__promesa">{PROMESA}</p>
      </motion.div>

      <div className="intro-overlay__narration">
        <AnimatePresence mode="wait">
          {lineIndex < INTRO_NARRATION.length && (
            <motion.p
              key={lineIndex}
              initial={{ opacity: 0, y: 20, filter: 'blur(6px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 1.2 }}
            >
              {INTRO_NARRATION[lineIndex]}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {showEnter && (
          <motion.button
            className="intro-overlay__enter"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            onClick={dismiss}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            type="button"
          >
            Entrar a la experiencia
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}