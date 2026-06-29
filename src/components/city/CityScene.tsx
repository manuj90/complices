import { Suspense, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Stars, Cloud, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';
import { CityBuildings } from './CityBuildings';
import { PinMarker } from './PinMarker';
import { PINS } from '../../data/experiences';
import { useExperience } from '../../context/ExperienceContext';
import type { PinId } from '../../data/types';

function FogParticles() {
  const ref = useRef<THREE.Points>(null);
  const count = 200;
  const positions = new Float32Array(count * 3);

  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 15;
    positions[i * 3 + 1] = Math.random() * 3;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 15;
  }

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.elapsedTime * 0.02;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#477C86"
        transparent
        opacity={0.4}
        sizeAttenuation
      />
    </points>
  );
}

function SceneLights() {
  return (
    <>
      <ambientLight intensity={0.28} color="#F1E8E8" />
      <directionalLight
        position={[5, 8, 5]}
        intensity={0.4}
        color="#477C86"
      />
      <pointLight position={[-3, 3, -2]} intensity={0.8} color="#477C86" distance={10} />
      <pointLight position={[3, 3, 2]} intensity={0.6} color="#EA5021" distance={10} />
      <pointLight position={[0, 4, 0]} intensity={0.5} color="#DE8F3B" distance={8} />
      <spotLight
        position={[0, 6, 0]}
        angle={0.5}
        penumbra={0.8}
        intensity={1.2}
        color="#F1E8E8"
      />
    </>
  );
}

function CameraRig() {
  const { camera } = useThree();
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    camera.position.x = Math.sin(t * 0.1) * 0.3;
  });
  return null;
}

interface CitySceneProps {
  onPinClick: (id: PinId) => void;
}

function CityContent({ onPinClick }: CitySceneProps) {
  const { visitedPins, cierreUnlocked, activeExperience } = useExperience();

  const visiblePins = PINS.filter((pin) => {
    if (pin.id === 'cierre') return cierreUnlocked;
    return true;
  });

  return (
    <>
      <PerspectiveCamera makeDefault position={[6, 5, 6]} fov={45} />
      <CameraRig />
      <SceneLights />
      <fog attach="fog" args={['#232323', 8, 25]} />

      <CityBuildings />
      <FogParticles />

      <Stars radius={50} depth={30} count={3000} factor={2} fade speed={0.5} />

      <Cloud
        opacity={0.15}
        speed={0.2}
        bounds={[10, 2, 10]}
        segments={20}
        position={[0, 3, 0]}
        color="#3a2a28"
      />

      {visiblePins.map((pin) => (
        <PinMarker
          key={pin.id}
          pin={pin}
          onClick={() => onPinClick(pin.id)}
          disabled={!!activeExperience || (pin.id === 'cierre' && !cierreUnlocked)}
          visited={visitedPins.has(pin.id)}
          highlighted={pin.id === 'cierre' && cierreUnlocked}
        />
      ))}

      <OrbitControls
        enablePan={false}
        minDistance={4}
        maxDistance={14}
        minPolarAngle={Math.PI / 6}
        maxPolarAngle={Math.PI / 2.5}
        autoRotate={!activeExperience}
        autoRotateSpeed={0.3}
        enableDamping
        dampingFactor={0.08}
        rotateSpeed={0.5}
      />
    </>
  );
}

export function CityScene({ onPinClick }: CitySceneProps) {
  return (
    <div className="city-scene">
      <Canvas dpr={[1, 2]} gl={{ antialias: true, alpha: true }}>
        <Suspense fallback={null}>
          <CityContent onPinClick={onPinClick} />
        </Suspense>
      </Canvas>
      <div className="city-scene__vignette" />
      <div className="city-scene__scanlines" />
    </div>
  );
}