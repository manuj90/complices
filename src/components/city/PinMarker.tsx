import { useRef, useState } from 'react';
import { useFrame, type ThreeEvent } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import type { PinConfig } from '../../data/types';

interface PinMarkerProps {
  pin: PinConfig;
  onClick: () => void;
  disabled?: boolean;
  visited?: boolean;
  highlighted?: boolean;
}

export function PinMarker({
  pin,
  onClick,
  disabled = false,
  visited = false,
  highlighted = false,
}: PinMarkerProps) {
  const groupRef = useRef<THREE.Group>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;
    groupRef.current.position.y =
      pin.position[1] + Math.sin(t * 2 + pin.position[0]) * 0.08;

    if (glowRef.current) {
      const scale = 1 + Math.sin(t * 3) * 0.15;
      glowRef.current.scale.setScalar(hovered || highlighted ? scale * 1.3 : scale);
    }
  });

  const handleClick = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    if (!disabled) onClick();
  };

  return (
    <group ref={groupRef} position={pin.position}>
      {/* Área de click amplia — invisible */}
      <mesh visible={false} onClick={handleClick} onPointerOver={() => !disabled && setHovered(true)} onPointerOut={() => setHovered(false)}>
        <sphereGeometry args={[0.55, 12, 12]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>

      <mesh
        ref={glowRef}
        onClick={handleClick}
        onPointerOver={() => !disabled && setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <sphereGeometry args={[0.22, 16, 16]} />
        <meshStandardMaterial
          color={pin.glowColor}
          emissive={pin.glowColor}
          emissiveIntensity={hovered || highlighted ? 2.5 : 1.2}
          transparent
          opacity={disabled ? 0.3 : 0.95}
        />
      </mesh>

      <mesh position={[0, -0.35, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 0.5, 8]} />
        <meshStandardMaterial
          color={pin.color}
          emissive={pin.glowColor}
          emissiveIntensity={0.5}
        />
      </mesh>

      <Html
        center
        distanceFactor={10}
        style={{ pointerEvents: 'none', userSelect: 'none' }}
        zIndexRange={[100, 0]}
      >
        <div
          className={`pin-label-3d ${hovered || highlighted ? 'pin-label-3d--active' : ''} ${
            disabled ? 'pin-label-3d--disabled' : ''
          }`}
          style={{
            borderColor: pin.glowColor,
            boxShadow: hovered || highlighted ? `0 0 20px ${pin.glowColor}` : 'none',
          }}
        >
          {pin.label}
          {visited && <span className="pin-label-3d__check">✓</span>}
        </div>
      </Html>
    </group>
  );
}