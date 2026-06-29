import { motion } from 'framer-motion';
import { Check, Lock } from 'lucide-react';
import { PINS } from '../../data/experiences';
import { useExperience } from '../../context/ExperienceContext';
import type { PinId } from '../../data/types';

const MAIN_PIN_IDS: PinId[] = [
  'faro',
  'museo',
  'pareja',
  'obelisco',
  'observatorio',
];

export function ProgressTracker() {
  const { visitedPins, cierreUnlocked } = useExperience();

  return (
    <div className="progress-tracker">
      {MAIN_PIN_IDS.map((id) => {
        const pin = PINS.find((p) => p.id === id)!;
        const visited = visitedPins.has(id);
        return (
          <motion.div
            key={id}
            className={`progress-tracker__item ${visited ? 'visited' : ''}`}
            style={{ '--pin-color': pin.glowColor } as React.CSSProperties}
            whileHover={{ scale: 1.05 }}
          >
            <div className="progress-tracker__dot">
              {visited && <Check size={12} />}
            </div>
            <span>{pin.label}</span>
          </motion.div>
        );
      })}
      <motion.div
        className={`progress-tracker__item cierre ${cierreUnlocked ? 'unlocked' : 'locked'}`}
        animate={cierreUnlocked ? { opacity: 1 } : { opacity: 0.4 }}
      >
        <div className="progress-tracker__dot">
          {cierreUnlocked ? <Check size={12} /> : <Lock size={10} />}
        </div>
        <span>Cierre</span>
      </motion.div>
    </div>
  );
}