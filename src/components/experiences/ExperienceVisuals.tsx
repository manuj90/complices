import { motion, useMotionValue, useAnimationFrame } from 'framer-motion';
import { useMemo, useRef, useState } from 'react';
import type { PinId } from '../../data/types';
import { VIDEOS } from '../../data/videos';
import { AutoplayVideo } from '../ui/AutoplayVideo';

interface ExperienceVisualsProps {
  experienceId: PinId;
  phase: number;
  isLoop: boolean;
  splitOpen?: boolean;
}

export function ExperienceVisuals({ experienceId, phase, isLoop, splitOpen }: ExperienceVisualsProps) {
  switch (experienceId) {
    case 'faro':
      return <FaroVisuals phase={phase} isLoop={isLoop} splitOpen={splitOpen ?? false} />;
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

function FaroVisuals({
  phase,
  isLoop,
  splitOpen,
}: {
  phase: number;
  isLoop: boolean;
  splitOpen: boolean;
}) {
  const curtainEase = [0.22, 1, 0.36, 1] as const;

  return (
    <div className={`visuals visuals--faro${splitOpen ? ' visuals--faro-open' : ''}`}>
      <div className="faro-split">
        <div className="faro-split__video">
          <AutoplayVideo
            sources={[{ src: VIDEOS.faro.mar }]}
            active={splitOpen}
          />
          <div className="faro-split__video-overlay" />
        </div>
        <div className="faro-split__text-side" />
      </div>

      <motion.div
        className="faro-curtain faro-curtain--left"
        initial={false}
        animate={{ x: splitOpen ? '-100%' : '0%' }}
        transition={{ duration: 1.2, ease: curtainEase }}
      />
      <motion.div
        className="faro-curtain faro-curtain--right"
        initial={false}
        animate={{ x: splitOpen ? '100%' : '0%' }}
        transition={{ duration: 1.2, ease: curtainEase }}
      />

      <motion.div
        className="faro-neon-line"
        initial={{ scaleY: 0, opacity: 1 }}
        animate={{
          scaleY: 1,
          opacity: splitOpen ? 0 : 1,
          scaleX: splitOpen ? 1.6 : 1,
        }}
        transition={{
          scaleY: { duration: 1.4, ease: curtainEase },
          opacity: { duration: 0.35, delay: splitOpen ? 0.15 : 0 },
          scaleX: { duration: 0.5, delay: splitOpen ? 0.1 : 0 },
        }}
      />

      {splitOpen && (
        <motion.div
          className="faro-waves"
          initial={{ opacity: 0 }}
          animate={{ y: [0, -20, 0], opacity: 1 }}
          transition={{
            opacity: { duration: 0.8, delay: 0.4 },
            y: { repeat: Infinity, duration: 3 },
          }}
        >
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="faro-wave"
              style={{ animationDelay: `${i * 0.5}s` }}
            />
          ))}
        </motion.div>
      )}

      {splitOpen && phase >= 2 && (
        <motion.div
          className="faro-boat"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2 }}
        />
      )}

      {isLoop && splitOpen && <FaroFish />}
    </div>
  );
}

const FISH_COUNT = 4;
const FLEE_RADIUS = 140; // px, distancia a la que el pez empieza a huir
const FLEE_STRENGTH = 60; // px, desplazamiento máximo de huida

function FaroFish() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: -9999, y: -9999 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouse.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  const handleMouseLeave = () => {
    mouse.current = { x: -9999, y: -9999 };
  };

  return (
    <div
      ref={containerRef}
      className="faro-fish"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}

    >
      {[...Array(FISH_COUNT)].map((_, i) => (
        <Fish key={i} index={i} containerRef={containerRef} mouse={mouse} />
      ))}
    </div>
  );
}

function Fish({
  index,
  containerRef,
  mouse,
}: {
  index: number;
  containerRef: React.RefObject<HTMLDivElement | null>;
  mouse: React.RefObject<{ x: number; y: number }>;
}) {
  const baseTop = 20 + index * 8; // %
  const baseLeft = index * 10; // %
  const duration = 4 + index * 0.5;

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const fleeX = useMotionValue(0);
  const fleeY = useMotionValue(0);

  useAnimationFrame((t) => {
    // Movimiento base: nado de ida y vuelta en loop continuo
    const progress = (t / 1000 / duration) % 1;
    const swimDistance = 100 + index * 30;
    const baseX = Math.sin(progress * Math.PI * 2) * (swimDistance / 2) + swimDistance / 2;
    const baseY = Math.sin(progress * Math.PI * 4 + index) * 20;

    // Calcula posición absoluta del pez para comparar con el mouse
    const container = containerRef.current;
    if (container) {
      const rect = container.getBoundingClientRect();
      const fishX = (baseLeft / 100) * rect.width + baseX + fleeX.get();
      const fishY = (baseTop / 100) * rect.height + baseY + fleeY.get();

      const dx = fishX - mouse.current.x;
      const dy = fishY - mouse.current.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < FLEE_RADIUS && dist > 0) {
        const force = (1 - dist / FLEE_RADIUS) * FLEE_STRENGTH;
        const targetFleeX = (dx / dist) * force;
        const targetFleeY = (dy / dist) * force;
        // suaviza la huida (spring manual simple)
        fleeX.set(fleeX.get() + (targetFleeX - fleeX.get()) * 0.15);
        fleeY.set(fleeY.get() + (targetFleeY - fleeY.get()) * 0.15);
      } else {
        // vuelve gradualmente a su trayectoria normal
        fleeX.set(fleeX.get() + (0 - fleeX.get()) * 0.05);
        fleeY.set(fleeY.get() + (0 - fleeY.get()) * 0.05);
      }
    }

    x.set(baseX + fleeX.get());
    y.set(baseY + fleeY.get());
  });

  return (
    <motion.div
      className="fish"
      style={{
        top: `${baseTop}%`,
        left: `${baseLeft}%`,
        x,
        y,
      }}
    />
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
  { label: 'Mujer Airport', video: VIDEOS.pareja.mujerAirport, wall: 1 },
  { label: 'Hombre Restaurant', video: VIDEOS.pareja.comoSolo, wall: 2 },
  { label: 'Aeropuerto', video: VIDEOS.pareja.corroAirport, wall: 3 },
  { label: 'Perro', video: VIDEOS.pareja.perro, wall: 2 },
  { label: 'Padre Hijo', video: VIDEOS.pareja.abrazoAirport, wall: 2 },
  { label: 'Bicicletas', video: VIDEOS.pareja.bikes, wall: 1 },
  { label: 'Palomas', video: VIDEOS.pareja.tie, wall: 3 },
  { label: 'Ajedrez', video: VIDEOS.pareja.chess, wall: 1 },
  { label: 'Bailando', video: VIDEOS.pareja.bailando, wall: 1 },
  { label: 'Auriculares', video: VIDEOS.pareja.walks, wall: 3 },
  { label: 'Bar', video: VIDEOS.pareja.earphones, wall: 1 },
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
                    <AutoplayVideo
                      className="pareja-window__video"
                      sources={[{ src: scene.video }]}
                      preloadStrategy="metadata"
                    />
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
  const sceneAreaRef = useRef<HTMLDivElement>(null);

  return (
    <div className="visuals visuals--obelisco">
      <div className="obelisco-bg-video">
        <AutoplayVideo sources={[{ src: VIDEOS.obelisco.ciudad }]} />
      </div>

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
        <div className="obelisco-loop-scenes" ref={sceneAreaRef}>
          <ObeliscoSceneVideo
            src={VIDEOS.obelisco.estadio}
            label="Estadio lleno"
            delay={0.5}
            dragConstraintsRef={sceneAreaRef}
          />
          <ObeliscoSceneVideo
            src={VIDEOS.obelisco.bar}
            label="Bar activo"
            delay={1.2}
            dragConstraintsRef={sceneAreaRef}
          />
        </div>
      )}
    </div>
  );
}

function ObeliscoSceneVideo({
  src,
  label,
  delay,
  dragConstraintsRef,
}: {
  src: string;
  label: string;
  delay: number;
  dragConstraintsRef: React.RefObject<HTMLDivElement | null>;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      className={`obelisco-scene-video${expanded ? ' obelisco-scene-video--expanded' : ''}`}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, delay }}
      drag
      dragConstraints={dragConstraintsRef}
      dragMomentum={false}
      dragElastic={0.1}
      whileDrag={{ cursor: 'grabbing', zIndex: 10 }}
      onTap={() => setExpanded((v) => !v)}
    >
      <AutoplayVideo sources={[{ src }]} preloadStrategy="metadata" />
      <span className="obelisco-scene-label">{label}</span>
    </motion.div>
  );
}

function ObservatorioVisuals({ phase, isLoop }: { phase: number; isLoop: boolean }) {
  const stars = useMemo(
    () =>
      [...Array(20)].map((_, i) => ({
        id: i,
        left: `${(i * 17 + 11) % 100}%`,
        top: `${(i * 23 + 7) % 60}%`,
        duration: 1.2 + (i % 5) * 0.4,
        delay: (i % 7) * 0.15,
      })),
    [],
  );

  return (
    <div className="visuals visuals--observatorio">
      <motion.div
        className="obs-dome"
        animate={{ rotateX: phase >= 1 ? 60 : 0 }}
        transition={{ duration: 3 }}
      />
      <div className="obs-stars">
        {stars.map((star) => (
          <motion.div
            key={star.id}
            className="obs-star"
            style={{ left: star.left, top: star.top }}
            animate={{ opacity: [0.2, 1, 0.2] }}
            transition={{
              repeat: Infinity,
              duration: star.duration,
              delay: star.delay,
            }}
          />
        ))}
      </div>
      {phase >= 2 && (
        <motion.div
          className="obs-zoom"
          initial={{ scale: 1 }}
          animate={{ scale: isLoop ? 2 : 1.5 }}
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
  const particles = useMemo(
    () =>
      [...Array(15)].map((_, i) => ({
        id: i,
        left: `${(i * 19 + 5) % 100}%`,
        top: `${(i * 31 + 12) % 100}%`,
        hue: 280 + (i % 6) * 10,
        dx: ((i % 5) - 2) * 30,
        dy: ((i % 4) - 2) * 25,
        duration: 3 + (i % 3),
      })),
    [],
  );

  return (
    <div className="visuals visuals--cierre">
      <div className="cierre-particles">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="cierre-particle"
            style={{
              left: p.left,
              top: p.top,
              background: `hsl(${p.hue}, 70%, 60%)`,
            }}
            animate={{
              x: [0, p.dx],
              y: [0, p.dy],
              scale: [1, 1.4, 1],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{ repeat: Infinity, duration: p.duration }}
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