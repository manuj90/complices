import { motion, AnimatePresence } from 'framer-motion';

interface NarrationTextProps {
  text: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export function NarrationText({ text, className = '', size = 'lg' }: NarrationTextProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.p
        key={text}
        className={`narration narration--${size} ${className}`}
        initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        exit={{ opacity: 0, y: -20, filter: 'blur(4px)' }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      >
        {text}
      </motion.p>
    </AnimatePresence>
  );
}