import { useMemo } from 'react';
import * as THREE from 'three';
import { BRAND } from '../../data/brand';

interface Building {
  position: [number, number, number];
  size: [number, number, number];
  color: string;
  emissive?: string;
  type?: 'faro' | 'museo' | 'pareja' | 'obelisco' | 'observatorio' | 'escuela' | 'generic';
}

const GENERIC_GRAY = BRAND.gray;
const GENERIC_VARIANTS = ['#6D6D6D', '#757575', '#656565', '#707070'] as const;

const BUILDINGS: Building[] = [
  { position: [-4.5, 0.8, -3], size: [0.8, 1.6, 0.8], color: '#4a6268', emissive: BRAND.teal, type: 'faro' },
  { position: [4, 0.7, -2], size: [1.2, 1.4, 1], color: '#6a4840', emissive: BRAND.orange, type: 'museo' },
  { position: [-2, 0.5, 3.5], size: [0.6, 1, 0.6], color: '#6a5e48', emissive: BRAND.amber, type: 'pareja' },
  { position: [0, 1.2, 0], size: [0.3, 2.4, 0.3], color: '#5a5a5a', emissive: BRAND.gray, type: 'obelisco' },
  { position: [4.5, 0.9, 2.5], size: [1, 1.8, 1], color: '#5a4a4a', emissive: BRAND.teal, type: 'observatorio' },
  { position: [-3.5, 0.75, 0.5], size: [1.4, 1.5, 1], color: '#6a5e40', emissive: BRAND.amber, type: 'escuela' },
  { position: [-1, 0.4, -1], size: [0.7, 0.8, 0.7], color: GENERIC_VARIANTS[0] },
  { position: [1.5, 0.5, -2], size: [0.9, 1, 0.8], color: GENERIC_VARIANTS[1] },
  { position: [2, 0.35, 1], size: [0.6, 0.7, 0.6], color: GENERIC_VARIANTS[2] },
  { position: [-3, 0.45, 2], size: [0.8, 0.9, 0.7], color: GENERIC_VARIANTS[3] },
  { position: [3, 0.4, -0.5], size: [0.7, 0.8, 0.7], color: GENERIC_VARIANTS[0] },
  { position: [-0.5, 0.3, 2.5], size: [0.5, 0.6, 0.5], color: GENERIC_VARIANTS[1] },
  { position: [1, 0.55, 2.8], size: [0.8, 1.1, 0.7], color: GENERIC_VARIANTS[2] },
];

function BuildingMesh({ building }: { building: Building }) {
  const [w, h, d] = building.size;
  const y = building.position[1];

  return (
    <group position={[building.position[0], y, building.position[2]]}>
      <mesh>
        <boxGeometry args={[w, h, d]} />
        <meshStandardMaterial
          color={building.color}
          emissive={building.emissive || GENERIC_GRAY}
          emissiveIntensity={building.emissive ? 0.15 : 0.06}
          roughness={0.75}
          metalness={0.1}
        />
      </mesh>

      {building.type === 'faro' && (
        <mesh position={[0, h / 2 + 0.3, 0]}>
          <cylinderGeometry args={[0.15, 0.2, 0.5, 8]} />
          <meshStandardMaterial
            color={BRAND.cream}
            emissive={BRAND.teal}
            emissiveIntensity={1.5}
          />
        </mesh>
      )}

      {building.type === 'obelisco' && (
        <mesh position={[0, h / 2 + 0.15, 0]}>
          <coneGeometry args={[0.12, 0.4, 4]} />
          <meshStandardMaterial
            color={BRAND.gray}
            emissive={BRAND.cream}
            emissiveIntensity={0.8}
          />
        </mesh>
      )}

      {building.type === 'observatorio' && (
        <mesh position={[0, h / 2 + 0.25, 0]}>
          <sphereGeometry args={[0.35, 16, 8, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshStandardMaterial
            color="#2a1a1a"
            emissive={BRAND.teal}
            emissiveIntensity={0.6}
          />
        </mesh>
      )}

      {building.type === 'pareja' && (
        <group position={[0, h / 2 + 0.2, 0]}>
          <mesh position={[-0.08, 0, 0]}>
            <capsuleGeometry args={[0.06, 0.2, 4, 8]} />
            <meshStandardMaterial color={BRAND.orange} emissive={BRAND.orange} emissiveIntensity={0.5} />
          </mesh>
          <mesh position={[0.08, 0, 0]}>
            <capsuleGeometry args={[0.06, 0.2, 4, 8]} />
            <meshStandardMaterial color={BRAND.amber} emissive={BRAND.amber} emissiveIntensity={0.5} />
          </mesh>
        </group>
      )}

      {/* Window lights */}
      {Array.from({ length: Math.floor(h * 3) }).map((_, i) => (
        <mesh
          key={i}
          position={[
            (i % 2 === 0 ? 1 : -1) * (w / 2 + 0.01),
            -h / 2 + 0.15 + (i * 0.12),
            0,
          ]}
        >
          <planeGeometry args={[0.08, 0.06]} />
          <meshStandardMaterial
            color={BRAND.amber}
            emissive={BRAND.amber}
            emissiveIntensity={Math.random() > 0.4 ? 0.8 : 0.1}
          />
        </mesh>
      ))}
    </group>
  );
}

export function CityBuildings() {
  const groundGeo = useMemo(() => new THREE.PlaneGeometry(20, 20), []);

  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <primitive object={groundGeo} attach="geometry" />
        <meshStandardMaterial color={BRAND.dark} roughness={0.9} />
      </mesh>

      {/* Roads */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
        <planeGeometry args={[1.5, 12]} />
        <meshStandardMaterial color="#4a4a4a" />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
        <planeGeometry args={[12, 1.5]} />
        <meshStandardMaterial color="#4a4a4a" />
      </mesh>

      {BUILDINGS.map((b, i) => (
        <BuildingMesh key={i} building={b} />
      ))}
    </group>
  );
}