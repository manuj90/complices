import { motion } from 'framer-motion';
import { HomeAmbient } from '../components/home/HomeAmbient';
import { CityScene } from '../components/city/CityScene';
import { IntroOverlay } from '../components/experiences/IntroOverlay';
import { ExperienceModal } from '../components/experiences/ExperienceModal';
import { Header } from '../components/layout/Header';
import { loadYouTubeAPI } from '../hooks/useYouTubeAPI';
import { useExperience } from '../context/ExperienceContext';
import { PINS, PROMESA } from '../data/experiences';
import type { PinId } from '../data/types';

export function HomePage() {
  const { openExperience, introComplete, cierreUnlocked } = useExperience();

  const handlePinClick = (id: PinId) => {
    if (id === 'cierre' && !cierreUnlocked) return;
    loadYouTubeAPI();
    openExperience(id);
  };

  const canInteract = introComplete;

  return (
    <div className="home-page">
      <IntroOverlay />
      <HomeAmbient />
      <Header />

      <main className="home-page__main">
        <motion.section
          className="home-page__hero"
          initial={{ opacity: 0 }}
          animate={{ opacity: introComplete ? 1 : 0 }}
          transition={{ duration: 1 }}
        >
          <div className="home-page__hero-text">
            <h2>Maqueta Interactiva</h2>
            <p>{PROMESA}</p>
            <p className="home-page__hint">
              Explorá los pines sobre la ciudad. Elegí el orden de tu recorrido.
            </p>
          </div>
        </motion.section>

        <motion.div
          className={`home-page__canvas ${canInteract ? 'home-page__canvas--ready' : 'home-page__canvas--waiting'}`}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: canInteract ? 1 : 0.35, scale: 1 }}
          transition={{ delay: 0.3, duration: 1 }}
        >
          <CityScene onPinClick={handlePinClick} />
          {!canInteract && (
            <div className="home-page__canvas-hint">
              Saltá la intro para explorar la maqueta
            </div>
          )}
        </motion.div>

        <motion.section
          className="home-page__pins"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: canInteract ? 1 : 0.6, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          {PINS.filter((p) => p.id !== 'cierre' || cierreUnlocked).map((pin, i) => (
            <motion.button
              key={pin.id}
              className="pin-card"
              style={{
                '--pin-color': pin.glowColor,
                '--pin-bg': pin.color,
                cursor: canInteract ? 'pointer' : 'not-allowed',
              } as React.CSSProperties}
              onClick={() => canInteract && handlePinClick(pin.id)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + i * 0.1 }}
              whileHover={{ scale: 1.03, y: -4 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="pin-card__glow" />
              <h3>{pin.label}</h3>
              <span className="pin-card__building">{pin.building}</span>
              <p>{pin.summary}</p>
              {pin.music && <span className="pin-card__music">♪ {pin.music}</span>}
            </motion.button>
          ))}

          {!cierreUnlocked && (
            <div className="pin-card pin-card--locked">
              <h3>Cierre</h3>
              <span className="pin-card__building">Escuela Da Vinci</span>
              <p>Recorré los 5 espacios para desbloquear el cierre final.</p>
            </div>
          )}
        </motion.section>
      </main>

      <ExperienceModal />
    </div>
  );
}