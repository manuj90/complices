import { AnimatePresence, motion } from 'framer-motion';
import type { DialogueLine } from '../../data/types';

interface DialoguePanelProps {
  lines: DialogueLine[];
  activeIndex: number;
  finalText?: string;
  showFinal?: boolean;
}

export function DialoguePanel({
  lines,
  activeIndex,
  finalText,
  showFinal = false,
}: DialoguePanelProps) {
  const activeLine = !showFinal ? lines[activeIndex] : null;

  return (
    <div className="dialogue-split">
      <div className="dialogue-split__side dialogue-split__side--A">
        <AnimatePresence mode="wait">
          {activeLine?.speaker === 'A' && (
            <motion.p
              key={activeIndex}
              className="dialogue-split__bubble"
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              {activeLine.text}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      <div className="dialogue-split__divider" aria-hidden />

      <div className="dialogue-split__side dialogue-split__side--B">
        <AnimatePresence mode="wait">
          {activeLine?.speaker === 'B' && (
            <motion.p
              key={activeIndex}
              className="dialogue-split__bubble"
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 12 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              {activeLine.text}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {showFinal && finalText && (
          <motion.p
            className="dialogue-split__final"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            {finalText}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}