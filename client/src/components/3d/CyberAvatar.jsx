import React, { useRef } from 'react';
import { useFrame, useLoader, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const EMOTION_EXPRESSIONS = {
  happy: { aura: '#00f3ff', border: '#38bdf8', ring: '#0284c7', flare: '#38bdf8', speed: 0.4 },
  thinking: { aura: '#3b82f6', border: '#60a5fa', ring: '#1d4ed8', flare: '#60a5fa', speed: 0.2 },
  confused: { aura: '#f59e0b', border: '#fbbf24', ring: '#d97706', flare: '#f59e0b', speed: 0.3 },
  excited: { aura: '#a855f7', border: '#c084fc', ring: '#ec4899', flare: '#ec4899', speed: 1.2 }, // Hollow Purple
  sad: { aura: '#64748b', border: '#94a3b8', ring: '#475569', flare: '#64748b', speed: 0.1 },
  surprised: { aura: '#38bdf8', border: '#7dd3fc', ring: '#0284c7', flare: '#7dd3fc', speed: 0.8 },
  laughing: { aura: '#10b981', border: '#34d399', ring: '#059669', flare: '#34d399', speed: 0.9 }
};

export default function CyberAvatar({
  emotion = 'happy',
  isSpeaking = false,
  isWaving = false,
  lipViseme = 0,
  mousePos = { x: 0, y: 0 }
}) {
  const avatarGroupRef = useRef();
  const auraDiscRef = useRef();
  const ringRef = useRef();
  const innerRingRef = useRef();
  const mouthGlowRef = useRef();
  const leftEyeFlareRef = useRef();
  const rightEyeFlareRef = useRef();

  const { gl } = useThree();

  // Load 8K Masterwork Satoru Gojo Texture
  const texture = useLoader(THREE.TextureLoader, '/gojo_8k.jpg');
  texture.generateMipmaps = true;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.anisotropy = gl.capabilities.getMaxAnisotropy();

  const expr = EMOTION_EXPRESSIONS[emotion] || EMOTION_EXPRESSIONS.happy;

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();

    // 1. Sinusoidal Breathing Sway
    if (avatarGroupRef.current) {
      avatarGroupRef.current.position.y = Math.sin(time * 2.4) * 0.06;

      // 2. Smooth 3D Cursor Parallax Tilt (Strict Front-facing camera lock)
      const targetRotY = mousePos.x * 0.35;
      const targetRotX = -mousePos.y * 0.25;
      avatarGroupRef.current.rotation.y = THREE.MathUtils.lerp(avatarGroupRef.current.rotation.y, targetRotY, 0.1);
      avatarGroupRef.current.rotation.x = THREE.MathUtils.lerp(avatarGroupRef.current.rotation.x, targetRotX, 0.1);
    }

    // 3. Rotating Cursed Energy Infinity Aura Disc
    if (auraDiscRef.current) {
      auraDiscRef.current.rotation.z += delta * expr.speed;
      const pulse = 1 + Math.sin(time * 4) * 0.08;
      auraDiscRef.current.scale.set(pulse, pulse, 1);
    }

    // 4. Dual Rotating Cyber Frame Rings
    if (ringRef.current) {
      ringRef.current.rotation.z -= delta * (expr.speed * 0.8);
    }
    if (innerRingRef.current) {
      innerRingRef.current.rotation.z += delta * (expr.speed * 1.4);
    }

    // 5. Six-Eyes Blue Lens Flare Motion
    if (leftEyeFlareRef.current && rightEyeFlareRef.current) {
      const flareScale = isSpeaking ? 1.4 + Math.sin(time * 12) * 0.4 : 1.0 + Math.sin(time * 3) * 0.2;
      leftEyeFlareRef.current.scale.set(flareScale, flareScale, 1);
      rightEyeFlareRef.current.scale.set(flareScale, flareScale, 1);
    }

    // 6. Lip-Sync Mouth Audio Pulse
    if (mouthGlowRef.current) {
      const scale = isSpeaking ? 1 + lipViseme * 1.0 : 0.8;
      mouthGlowRef.current.scale.set(scale, scale, 1);
    }
  });

  return (
    <group ref={avatarGroupRef} position={[0, 0.1, 0]}>
      {/* ---------------- 3D CURSED ENERGY INFINITY AURA BACKPLATE ---------------- */}
      <mesh ref={auraDiscRef} position={[0, 0, -0.2]}>
        <circleGeometry args={[1.7, 64]} />
        <meshBasicMaterial color={expr.aura} transparent opacity={0.35} side={THREE.DoubleSide} />
      </mesh>

      {/* ---------------- 8K MASTERWORK SATORU GOJO PORTRAIT MESH ---------------- */}
      <mesh position={[0, 0, 0]}>
        <circleGeometry args={[1.38, 64]} />
        <meshBasicMaterial map={texture} side={THREE.DoubleSide} />
      </mesh>

      {/* ---------------- SIX-EYES BLUE LENS FLARE OVERLAY LIGHTS ---------------- */}
      {/* Left Eye Flare */}
      <mesh ref={leftEyeFlareRef} position={[-0.22, 0.22, 0.02]}>
        <circleGeometry args={[0.08, 16]} />
        <meshBasicMaterial color={expr.flare} transparent opacity={0.7} />
      </mesh>

      {/* Right Eye Flare */}
      <mesh ref={rightEyeFlareRef} position={[0.22, 0.22, 0.02]}>
        <circleGeometry args={[0.08, 16]} />
        <meshBasicMaterial color={expr.flare} transparent opacity={0.7} />
      </mesh>

      {/* ---------------- DUAL CYBER NEON BORDER FRAME RINGS ---------------- */}
      <mesh ref={ringRef} position={[0, 0, 0.01]}>
        <ringGeometry args={[1.39, 1.45, 64]} />
        <meshBasicMaterial color={expr.border} transparent opacity={0.9} />
      </mesh>

      <mesh ref={innerRingRef} position={[0, 0, 0.02]}>
        <ringGeometry args={[1.47, 1.49, 64]} />
        <meshBasicMaterial color={expr.ring} transparent opacity={0.65} side={THREE.DoubleSide} />
      </mesh>

      {/* ---------------- SPECTRUM AUDIO LIPS VISEME GLOW NODE ---------------- */}
      <mesh ref={mouthGlowRef} position={[0, -0.25, 0.03]}>
        <ringGeometry args={[0.08, 0.13, 32]} />
        <meshBasicMaterial color={isSpeaking ? '#00f3ff' : expr.border} transparent opacity={isSpeaking ? 0.95 : 0.2} />
      </mesh>

      {/* ---------------- INTERACTIVE WAVING GESTURE BADGE ---------------- */}
      {isWaving && (
        <group position={[1.1, 1.1, 0.1]}>
          <mesh>
            <circleGeometry args={[0.28, 32]} />
            <meshBasicMaterial color="#a855f7" transparent opacity={0.88} />
          </mesh>
        </group>
      )}

      {/* Dynamic Point Light Scene Shading */}
      <pointLight position={[0, 0, 2.0]} color={expr.aura} intensity={2.8} distance={5} />
    </group>
  );
}
