import { motion } from 'framer-motion';
import type { PinId } from '../../data/types';

interface ExperienceVisualsProps {
  experienceId: PinId;
  phase: number;
  isLoop: boolean;
}

export function ExperienceVisuals({ experienceId, phase, isLoop }: ExperienceVisualsProps) {
  switch (experienceId) {
    case 'faro':
      return <FaroVisuals phase={phase} isLoop={isLoop} />;
    case 'museo':
      return <MuseoVisuals phase={phase} isLoop={isLoop} />;
    case 'pareja':
      return <ParejaVisuals phase={phase} isLoop={isLoop} />;
    case 'obelisco':
      return <ObeliscoVisuals phase={phase} isLoop={isLoop} />;
    case 'observatorio':
      return <ObservatorioVisuals phase={phase} isLoop={isLoop} />;
    case 'cierre':
      return <CierreVisuals phase={phase} isLoop={isLoop} />;
    default:
      return null;
  }
}

function FaroVisuals({ phase, isLoop }: { phase: number; isLoop: boolean }) {
  return (
    <div className="visuals visuals--faro">
      <motion.div
        className="faro-neon-line"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: phase >= 0 ? 1 : 0 }}
        transition={{ duration: 1.5 }}
      />
      <motion.div
        className="faro-waves"
        animate={{ y: [0, -20, 0] }}
        transition={{ repeat: Infinity, duration: 3 }}
      >
        {[...Array(3)].map((_, i) => (
          <div key={i} className="faro-wave" style={{ animationDelay: `${i * 0.5}s` }} />
        ))}
      </motion.div>
      {phase >= 2 && (
        <motion.div
          className="faro-boat"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2 }}
        />
      )}
      {isLoop && (
        <div className="faro-fish">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="fish"
              animate={{
                x: [0, 100 + i * 30],
                y: [0, Math.sin(i) * 20],
              }}
              transition={{ repeat: Infinity, duration: 4 + i * 0.5, ease: 'linear' }}
              style={{ top: `${20 + i * 8}%`, left: `${i * 10}%` }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function MuseoVisuals({ phase, isLoop }: { phase: number; isLoop: boolean }) {
  return (
    <div className="visuals visuals--museo">
      <motion.div
        className="museo-fire"
        animate={{ opacity: phase >= 0 ? [0.6, 1, 0.6] : 0 }}
        transition={{ repeat: Infinity, duration: 2 }}
      />
      {phase >= 1 && (
        <div className="museo-hands">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="hand-print"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 0.7, scale: 1 }}
              transition={{ delay: i * 0.4 }}
              style={{
                left: `${15 + i * 12}%`,
                top: `${30 + (i % 3) * 15}%`,
                rotate: `${-20 + i * 15}deg`,
              }}
            />
          ))}
        </div>
      )}
      {phase >= 3 && (
        <div className="museo-art-layer">
          {['🎨', '🎭', '🎵', '✏️', '🖼️'].map((emoji, i) => (
            <motion.span
              key={i}
              className="art-piece"
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: i * 0.3 }}
              style={{ left: `${10 + i * 18}%`, top: `${20 + (i % 2) * 30}%` }}
            >
              {emoji}
            </motion.span>
          ))}
        </div>
      )}
      {isLoop && (
        <motion.div
          className="museo-cave"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 30, ease: 'linear' }}
        />
      )}
    </div>
  );
}

interface ParejaScene {
  label: string;
  wall: number;
  video?: string;
  emoji?: string;
}

const PAREJA_SCENES: ParejaScene [] = [
  {
    label: "Mujer Airport",
    video: "public/media/video/pareja/MujerAirport.mp4",
    wall: 1,
  },
  {
    label: "Hombre Restaurant",
    video: "public/media/video/pareja/ComoSolo.mp4",
    wall: 2,
  },
  {
    label: "Aeropuerto",
    video: "public/media/video/pareja/CorroAirport.mp4",
    wall: 3,
  },
  {
    label: "Perro",
    video: "public/media/video/pareja/PerroSolo.mp4",
    wall: 2,
  },
  {
    label: "Padre Hijo",
    video: "public/media/video/pareja/abrazoAirport.mp4",
    wall: 2,
  },
  {
    label: "Bicicletas",
    video: "public/media/video/pareja/Bikes.mp4",
    wall: 1,
  },
  {
    label: "Palomas",
    video: "public/media/video/pareja/Tie.mp4",
    wall: 3,
  },
  {
    label: "Ajedrez",
    video: "public/media/video/pareja/Chess.mp4",
    wall: 1,
  },
  {
    label: "Bailando",
    video: "public/media/video/pareja/Bailando.mp4",
    wall: 1,
  },
  {
    label: "Auriculares",
    video: "public/media/video/pareja/Walks.mp4",
    wall: 3,
  },
  {
    label: "Bar",
    video: "public/media/video/pareja/Earphones.mp4",
    wall: 1,
  },
];

function ParejaVisuals({ phase, isLoop }: { phase: number; isLoop: boolean }) {
  const visibleCount = Math.min(phase + 1, PAREJA_SCENES.length);

  return (
    <div className="visuals visuals--pareja">
      <div className="pareja-walls">
        {[1, 2, 3].map((wall) => (
          <div key={wall} className={`pareja-wall pareja-wall--${wall}`}>
            {PAREJA_SCENES.filter((_, i) => i < visibleCount)
              .filter((s) => s.wall === wall)
              .map((scene, i) => (
                <motion.div
                  key={scene.label}
                  className="pareja-window"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: i * 0.2 }}
                >
                  {scene.video ? (
                    <video
                      className="pareja-window__video"
                      autoPlay
                      muted
                      loop
                      playsInline
                    >
                      <source src={scene.video} type="video/mp4" />
                    </video>
                  ) : (
                    <div className="pareja-window__placeholder">
                      {scene.label}
                    </div>
                  )}
                </motion.div>
              ))}
          </div>
        ))}
      </div>
      {phase >= 8 && (
        <svg className="pareja-threads" viewBox="0 0 100 100">
          {PAREJA_SCENES.slice(0, visibleCount).map((_, i) => (
            <motion.line
              key={i}
              x1={20 + (i % 4) * 20}
              y1={20 + Math.floor(i / 4) * 25}
              x2={50}
              y2={50}
              stroke="rgba(255,255,255,0.3)"
              strokeWidth="0.5"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            />
          ))}
        </svg>
      )}
      {isLoop && (
        <div className="pareja-buildings-loop">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="pareja-building"
              initial={{ y: 100 }}
              animate={{ y: 0 }}
              transition={{ delay: i * 0.3 }}
            >
              {[...Array(6)].map((_, j) => (
                <motion.div
                  key={j}
                  className="pareja-window-lit"
                  animate={{ opacity: [0.2, 1, 0.2] }}
                  transition={{ repeat: Infinity, duration: 2, delay: j * 0.3 }}
                />
              ))}
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

function ObeliscoVisuals({ phase, isLoop }: { phase: number; isLoop: boolean }) {
  const activity = isLoop ? 1 : Math.min(phase / 3, 1);

  return (
    <div className="visuals visuals--obelisco">
      <div className="obelisco-city">
        <div className="obelisco-monument" />
        <div className="obelisco-streets">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="obelisco-building"
              style={{ left: `${5 + (i % 4) * 22}%`, bottom: `${(Math.floor(i / 4)) * 25}%` }}
              animate={{ opacity: 0.3 + activity * 0.7 }}
            >
              <motion.div
                className="obelisco-window"
                animate={{ opacity: activity > 0.3 ? [0.1, 1, 0.1] : 0.1 }}
                transition={{ repeat: Infinity, duration: 1.5, delay: i * 0.2 }}
              />
            </motion.div>
          ))}
        </div>
        {activity > 0.5 && (
          <>
            <motion.div className="obelisco-car" animate={{ x: ['-10%', '110%'] }} transition={{ repeat: Infinity, duration: 4 }} />
            <motion.div className="obelisco-bike" animate={{ x: ['110%', '-10%'] }} transition={{ repeat: Infinity, duration: 6 }} />
          </>
        )}
      </div>
      {phase >= 1 && (
        <motion.div
          className="obelisco-mic"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          🎤
        </motion.div>
      )}
      {isLoop && (
        <div className="obelisco-loop-scenes">
          <div className="obelisco-stadium">⚽ Estadio lleno</div>
          <div className="obelisco-bar">🍻 Bar activo</div>
        </div>
      )}
    </div>
  );
}

function ObservatorioVisuals({ phase, isLoop }: { phase: number; isLoop: boolean }) {
  return (
    <div className="visuals visuals--observatorio">
      <motion.div
        className="obs-dome"
        animate={{ rotateX: phase >= 1 ? 60 : 0 }}
        transition={{ duration: 3 }}
      />
      <div className="obs-stars">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="obs-star"
            style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 60}%` }}
            animate={{ opacity: [0.2, 1, 0.2] }}
            transition={{ repeat: Infinity, duration: 1 + Math.random() * 2, delay: Math.random() }}
          />
        ))}
      </div>
      {phase >= 2 && (
        <motion.div
          className="obs-zoom"
          initial={{ scale: 1 }}
          animate={{ scale: isLoop ? 3 : 1.5 }}
          transition={{ duration: 8 }}
        />
      )}
      {isLoop && (
        <div className="obs-cosmos">
          <motion.div className="obs-planet obs-planet--1" animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 20, ease: 'linear' }} />
          <motion.div className="obs-planet obs-planet--2" animate={{ rotate: -360 }} transition={{ repeat: Infinity, duration: 30, ease: 'linear' }} />
          <div className="obs-milkyway" />
        </div>
      )}
    </div>
  );
}

function CierreVisuals({ phase, isLoop }: { phase: number; isLoop: boolean }) {
  return (
    <div className="visuals visuals--cierre">
      <div className="cierre-particles">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="cierre-particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: `hsl(${Math.random() * 60 + 280}, 70%, 60%)`,
            }}
            animate={{
              x: [0, (Math.random() - 0.5) * 100],
              y: [0, (Math.random() - 0.5) * 100],
              scale: [1, 1.5, 1],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{ repeat: Infinity, duration: 3 + Math.random() * 2 }}
          />
        ))}
      </div>
      {phase >= 1 && (
        <motion.div
          className="cierre-silhouettes"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
        >
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="cierre-silhouette"
              style={{
                left: `${20 + i * 15}%`,
                filter: `hue-rotate(${i * 60}deg) blur(${2 + i}px)`,
              }}
              animate={{ y: [0, -10, 0], scale: [1, 1.05, 1] }}
              transition={{ repeat: Infinity, duration: 2 + i * 0.3 }}
            />
          ))}
        </motion.div>
      )}
      {isLoop && (
        <motion.p
          className="cierre-message"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ repeat: Infinity, duration: 3 }}
        >
          Vos formás parte de la obra
        </motion.p>
      )}
    </div>
  );
}