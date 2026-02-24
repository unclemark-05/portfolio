"use client";

import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

// Developer-themed: Code Brackets < / >
export default function ScriptureModel({ position = [0, 0, 0] as [number, number, number] }) {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const targetScale = useRef(1);

  useFrame((state) => {
    const t = state.clock.elapsedTime;

    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(t * 0.3) * 0.15;

      targetScale.current = hovered ? 1.1 : 1;
      groupRef.current.scale.lerp(
        new THREE.Vector3(targetScale.current, targetScale.current, targetScale.current),
        0.1
      );
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
        onPointerOver={() => {
          setHovered(true);
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          setHovered(false);
          document.body.style.cursor = "auto";
        }}
        onClick={handleClick}
      >
        {/* Left bracket < */}
        <group position={[-1, 0, 0]}>
          {/* Top arm */}
          <mesh position={[0.15, 0.4, 0]} rotation={[0, 0, 0.5]}>
            <boxGeometry args={[1, 0.15, 0.15]} />
            <meshStandardMaterial
              color="#8B5CF6"
              emissive="#8B5CF6"
              emissiveIntensity={hovered ? 0.8 : 0.4}
              metalness={0.6}
              roughness={0.3}
            />
          </mesh>
          {/* Bottom arm */}
          <mesh position={[0.15, -0.4, 0]} rotation={[0, 0, -0.5]}>
            <boxGeometry args={[1, 0.15, 0.15]} />
            <meshStandardMaterial
              color="#8B5CF6"
              emissive="#8B5CF6"
              emissiveIntensity={hovered ? 0.8 : 0.4}
              metalness={0.6}
              roughness={0.3}
            />
          </mesh>
        </group>

        {/* Slash / */}
        <mesh position={[0, 0, 0]} rotation={[0, 0, 0.3]}>
          <boxGeometry args={[0.15, 1.8, 0.15]} />
          <meshStandardMaterial
            color="#3B82F6"
            emissive="#3B82F6"
            emissiveIntensity={hovered ? 0.6 : 0.3}
            metalness={0.6}
            roughness={0.3}
          />
        </mesh>

        {/* Right bracket > */}
        <group position={[1, 0, 0]}>
          {/* Top arm */}
          <mesh position={[-0.15, 0.4, 0]} rotation={[0, 0, -0.5]}>
            <boxGeometry args={[1, 0.15, 0.15]} />
            <meshStandardMaterial
              color="#8B5CF6"
              emissive="#8B5CF6"
              emissiveIntensity={hovered ? 0.8 : 0.4}
              metalness={0.6}
              roughness={0.3}
            />
          </mesh>
          {/* Bottom arm */}
          <mesh position={[-0.15, -0.4, 0]} rotation={[0, 0, 0.5]}>
            <boxGeometry args={[1, 0.15, 0.15]} />
            <meshStandardMaterial
              color="#8B5CF6"
              emissive="#8B5CF6"
              emissiveIntensity={hovered ? 0.8 : 0.4}
              metalness={0.6}
              roughness={0.3}
            />
          </mesh>
        </group>

        {/* Glow */}
        <pointLight
          position={[0, 0, 1]}
          intensity={hovered ? 0.6 : 0.2}
          color="#8B5CF6"
          distance={4}
        />
      </group>
    </Float>
  );
}
