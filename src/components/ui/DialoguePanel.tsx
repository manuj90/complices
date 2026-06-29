import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
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
  const containerRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const active = activeRef.current;
    if (!active) return;
    active.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, [activeIndex, showFinal]);

  return (
    <div className="dialogue-panel-wrap">
      <div className="dialogue-panel" ref={containerRef}>
        <div className="dialogue-panel__inner">
          {lines.map((line, i) => {
            const isActive = !showFinal && i === activeIndex;
            const isPast = !showFinal && i < activeIndex;

            return (
              <motion.div
                key={i}
                ref={isActive ? activeRef : undefined}
                className={`dialogue-line dialogue-line--${line.speaker} ${
                  isActive ? 'active' : isPast ? 'past' : 'upcoming'
                }`}
                initial={{ opacity: 0, x: line.speaker === 'A' ? -20 : 20 }}
                animate={{ opacity: isActive ? 1 : isPast ? 0.55 : 0.25, x: 0 }}
                transition={{ duration: 0.4 }}
              >
                <span className="dialogue-speaker">{line.speaker}</span>
                <span>{line.text}</span>
              </motion.div>
            );
          })}

          {showFinal && finalText && (
            <motion.p
              ref={activeRef}
              className="dialogue-final"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {finalText}
            </motion.p>
          )}
        </div>
      </div>
      <div className="dialogue-panel__fade dialogue-panel__fade--top" />
      <div className="dialogue-panel__fade dialogue-panel__fade--bottom" />
    </div>
  );
}