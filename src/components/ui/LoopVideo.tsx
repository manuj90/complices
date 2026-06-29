import { motion } from 'framer-motion';
import { useMediaExists } from '../../hooks/useMedia';

interface LoopVideoProps {
  src?: string;
  visible: boolean;
}

export function LoopVideo({ src, visible }: LoopVideoProps) {
  const exists = useMediaExists(src);

  if (!visible || !src || !exists) return null;

  return (
    <motion.div
      className="loop-video"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2 }}
    >
      <video src={src} autoPlay loop muted playsInline />
      <div className="loop-video__overlay" />
    </motion.div>
  );
}