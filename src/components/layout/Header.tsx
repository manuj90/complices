import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Info } from 'lucide-react';
import { Logo } from '../ui/Logo';
import { ProgressTracker } from '../ui/ProgressTracker';

export function Header() {
  return (
    <motion.header
      className="header"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.8 }}
    >
      <Link to="/" className="header__logo">
        <Logo variant="header" />
      </Link>

      <ProgressTracker />

      <nav className="header__nav">
        <Link to="/" className="header__link">
          <MapPin size={16} />
          <span>Maqueta</span>
        </Link>
        <Link to="/acerca" className="header__link">
          <Info size={16} />
          <span>Acerca</span>
        </Link>
      </nav>
    </motion.header>
  );
}