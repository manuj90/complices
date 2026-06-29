import { AnimatePresence } from 'framer-motion';
import { useExperience } from '../../context/ExperienceContext';
import { ExperiencePlayer } from './ExperiencePlayer';

export function ExperienceModal() {
  const { activeExperience } = useExperience();

  return (
    <AnimatePresence>
      {activeExperience && (
        <ExperiencePlayer key={activeExperience} experienceId={activeExperience} />
      )}
    </AnimatePresence>
  );
}