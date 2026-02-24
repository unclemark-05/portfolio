"use client";

import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

export default function OpiroModel({ position = [-4, 0, 0] as [number, number, number] }) {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const wave1Ref = useRef<THREE.Mesh>(null);
  const wave2Ref = useRef<THREE.Mesh>(null);
  const wave3Ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (wave1Ref.current) {
      wave1Ref.current.scale.setScalar(1 + Math.sin(t * 2) * 0.1);
    }
    if (wave2Ref.current) {
      wave2Ref.current.scale.setScalar(1 + Math.sin(t * 2 + 1) * 0.1);
    }
    if (wave3Ref.current) {
      wave3Ref.current.scale.setScalar(1 + Math.sin(t * 2 + 2) * 0.1);
    }
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.003;
    }
  });

  const handleClick = () => {
    const el = document.getElementById("projects");
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Float floatIntensity={0.5} rotationIntensity={0.2} position={position}>
      <group
        ref={groupRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={handleClick}
        scale={hovered ? 1.1 : 1}
      >
        {/* Vinyl disc */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[1.2, 1.2, 0.05, 64]} />
          <meshStandardMaterial
            color="#1a1a2e"
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>

        {/* Center label */}
        <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0.03, 0]}>
          <cylinderGeometry args={[0.35, 0.35, 0.02, 32]} />
          <meshStandardMaterial color="#8B5CF6" metalness={0.5} roughness={0.3} />
        </mesh>

        {/* Groove rings */}
        {[0.5, 0.7, 0.9, 1.05].map((radius, i) => (
          <mesh key={i} rotation={[Math.PI / 2, 0, 0]} position={[0, 0.03, 0]}>
            <torusGeometry args={[radius, 0.008, 8, 64]} />
            <meshStandardMaterial
              color="#2a2a3e"
              metalness={0.9}
              roughness={0.1}
            />
          </mesh>
        ))}

        {/* Sound waves */}
        <mesh ref={wave1Ref} position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.5, 0.02, 8, 64]} />
          <meshStandardMaterial
            color="#8B5CF6"
            transparent
            opacity={0.4}
            emissive="#8B5CF6"
            emissiveIntensity={hovered ? 0.8 : 0.3}
          />
        </mesh>
        <mesh ref={wave2Ref} position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.8, 0.015, 8, 64]} />
          <meshStandardMaterial
            color="#8B5CF6"
            transparent
            opacity={0.25}
            emissive="#8B5CF6"
            emissiveIntensity={hovered ? 0.6 : 0.2}
          />
        </mesh>
        <mesh ref={wave3Ref} position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[2.1, 0.01, 8, 64]} />
          <meshStandardMaterial
            color="#8B5CF6"
            transparent
            opacity={0.15}
            emissive="#8B5CF6"
            emissiveIntensity={hovered ? 0.4 : 0.1}
          />
        </mesh>
      </group>
    </Float>
  );
}
