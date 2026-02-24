"use client";

import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, RoundedBox } from "@react-three/drei";
import * as THREE from "three";

export default function ScriptureModel({ position = [0, 0, 0] as [number, number, number] }) {
  const groupRef = useRef<THREE.Group>(null);
  const crossRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (crossRef.current) {
      crossRef.current.position.y = 1.2 + Math.sin(t * 1.5) * 0.1;
    }
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(t * 0.5) * 0.1;
    }
  });

  const handleClick = () => {
    const el = document.getElementById("projects");
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Float floatIntensity={0.4} rotationIntensity={0.15} position={position}>
      <group
        ref={groupRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={handleClick}
        scale={hovered ? 1.1 : 1}
      >
        {/* Left page */}
        <RoundedBox
          args={[0.9, 1.2, 0.05]}
          radius={0.02}
          position={[-0.5, 0, 0.1]}
          rotation={[0, 0.2, 0]}
        >
          <meshStandardMaterial color="#FFF8E7" roughness={0.8} />
        </RoundedBox>

        {/* Right page */}
        <RoundedBox
          args={[0.9, 1.2, 0.05]}
          radius={0.02}
          position={[0.5, 0, 0.1]}
          rotation={[0, -0.2, 0]}
        >
          <meshStandardMaterial color="#FFF8E7" roughness={0.8} />
        </RoundedBox>

        {/* Book spine */}
        <mesh position={[0, 0, -0.02]}>
          <boxGeometry args={[0.15, 1.25, 0.12]} />
          <meshStandardMaterial color="#8B4513" roughness={0.6} />
        </mesh>

        {/* Cross */}
        <group ref={crossRef} position={[0, 1.2, 0]}>
          {/* Vertical beam */}
          <mesh>
            <boxGeometry args={[0.08, 0.6, 0.08]} />
            <meshStandardMaterial
              color="#D4AF37"
              emissive="#D4AF37"
              emissiveIntensity={hovered ? 0.8 : 0.3}
              metalness={0.7}
              roughness={0.2}
            />
          </mesh>
          {/* Horizontal beam */}
          <mesh position={[0, 0.12, 0]}>
            <boxGeometry args={[0.4, 0.08, 0.08]} />
            <meshStandardMaterial
              color="#D4AF37"
              emissive="#D4AF37"
              emissiveIntensity={hovered ? 0.8 : 0.3}
              metalness={0.7}
              roughness={0.2}
            />
          </mesh>
        </group>

        {/* Light rays (subtle cone) */}
        <mesh position={[0, 2, 0]} rotation={[Math.PI, 0, 0]}>
          <coneGeometry args={[0.8, 1.5, 16, 1, true]} />
          <meshStandardMaterial
            color="#D4AF37"
            transparent
            opacity={hovered ? 0.15 : 0.07}
            side={THREE.DoubleSide}
            emissive="#D4AF37"
            emissiveIntensity={0.2}
          />
        </mesh>
      </group>
    </Float>
  );
}
