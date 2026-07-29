import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import CyberAvatar from './CyberAvatar';
import HologramRings from './HologramRings';
import ParticleField from './ParticleField';

export default function AvatarCanvas({
  emotion = 'happy',
  isSpeaking = false,
  isWaving = false,
  lipViseme = 0,
  mousePos = { x: 0, y: 0 }
}) {
  return (
    <div className="w-full h-full relative min-h-[380px]">
      <Canvas
        camera={{ position: [0, 0.4, 4.2], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.7} />
        <directionalLight position={[5, 5, 5]} intensity={1.2} />
        <directionalLight position={[-5, 3, -5]} color="#a855f7" intensity={0.8} />

        {/* 3D Background Floating Particle System */}
        <ParticleField count={250} />

        {/* Holographic Glowing Pedestal Rings */}
        <HologramRings emotionColor={emotion === 'excited' ? '#ec4899' : emotion === 'thinking' ? '#3b82f6' : '#00f3ff'} />

        {/* Interactive Gojo Anime 3D Avatar Card */}
        <CyberAvatar
          emotion={emotion}
          isSpeaking={isSpeaking}
          isWaving={isWaving}
          lipViseme={lipViseme}
          mousePos={mousePos}
        />

        {/* Camera Controls */}
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          maxPolarAngle={Math.PI / 1.8}
          minPolarAngle={Math.PI / 2.5}
          maxAzimuthAngle={Math.PI / 4}
          minAzimuthAngle={-Math.PI / 4}
        />
      </Canvas>
    </div>
  );
}
