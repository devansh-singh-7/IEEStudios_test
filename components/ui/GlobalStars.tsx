"use client";

import { useRef, useMemo } from "react";
import dynamic from "next/dynamic";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const Canvas = dynamic(
  () => import("@react-three/fiber").then((m) => ({ default: m.Canvas })),
  { ssr: false }
);

function ParticleField() {
  const ref = useRef<THREE.Points>(null);
  const COUNT = 250;

  const positions = useMemo(() => {
    const arr = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT; i++) {
      arr[i * 3]     = (Math.random() - 0.5) * 25; // Wider X field to cover everything 
      arr[i * 3 + 1] = (Math.random() - 0.5) * 20; // Taller Y field
      arr[i * 3 + 2] = (Math.random() - 0.5) * 15; // Deeper Z field
    }
    return arr;
  }, []);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.elapsedTime;
    ref.current.rotation.y = t * 0.04;
    ref.current.rotation.x = t * 0.02;
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
        color="#a0b4ff" // The soft purple/blue specific to the Hero previously
        size={0.048}
        sizeAttenuation
        transparent
        opacity={0.65}
      />
    </points>
  );
}

export default function GlobalStars() {
  return (
    <div 
      style={{ 
        position: 'fixed', 
        inset: 0, 
        zIndex: -5,
        pointerEvents: 'none' 
      }} 
      aria-hidden="true"
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        <ParticleField />
      </Canvas>
    </div>
  );
}
