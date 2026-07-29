import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function HologramRings({ emotionColor = '#00f3ff' }) {
  const ring1Ref = useRef();
  const ring2Ref = useRef();
  const ring3Ref = useRef();

  useFrame((state, delta) => {
    if (ring1Ref.current) ring1Ref.current.rotation.z += delta * 0.4;
    if (ring2Ref.current) ring2Ref.current.rotation.z -= delta * 0.6;
    if (ring3Ref.current) ring3Ref.current.rotation.z += delta * 0.2;
  });

  return (
    <group position={[0, -2.5, -0.5]} rotation={[-Math.PI / 2.3, 0, 0]}>
      {/* Outer Hologram Ring */}
      <mesh ref={ring1Ref}>
        <ringGeometry args={[2.0, 2.08, 64]} />
        <meshBasicMaterial color={emotionColor} side={THREE.DoubleSide} transparent opacity={0.6} />
      </mesh>

      {/* Dashed Inner Hologram Ring */}
      <mesh ref={ring2Ref}>
        <ringGeometry args={[1.5, 1.55, 32]} />
        <meshBasicMaterial color="#a855f7" side={THREE.DoubleSide} transparent opacity={0.4} />
      </mesh>

      {/* Core Glowing Platform */}
      <mesh ref={ring3Ref}>
        <circleGeometry args={[1.0, 32]} />
        <meshBasicMaterial color={emotionColor} transparent opacity={0.15} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}
