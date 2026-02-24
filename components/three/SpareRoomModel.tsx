"use client";

import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

// Developer-themed: Gear / Settings icon
export default function SpareRoomModel({ position = [4, 0, 0] as [number, number, number] }) {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const targetScale = useRef(1);

  useFrame((state) => {
    const t = state.clock.elapsedTime;

    if (groupRef.current) {
      // Slow constant rotation for gear
      groupRef.current.rotation.z = t * 0.2;

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

  // Create gear teeth positions
  const teethCount = 8;
  const teeth = Array.from({ length: teethCount }, (_, i) => {
    const angle = (i / teethCount) * Math.PI * 2;
    return {
      x: Math.cos(angle) * 1.1,
      y: Math.sin(angle) * 1.1,
      rotation: angle,
    };
  });

  return (
    <Float floatIntensity={0.5} rotationIntensity={0.2} position={position}>
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
        {/* Outer ring */}
        <mesh>
          <torusGeometry args={[0.9, 0.18, 16, 64]} />
          <meshStandardMaterial
            color="#3B82F6"
            emissive="#3B82F6"
            emissiveIntensity={hovered ? 0.6 : 0.3}
            metalness={0.7}
            roughness={0.25}
          />
        </mesh>

        {/* Gear teeth */}
        {teeth.map((tooth, i) => (
          <mesh key={i} position={[tooth.x, tooth.y, 0]} rotation={[0, 0, tooth.rotation]}>
            <boxGeometry args={[0.3, 0.25, 0.18]} />
            <meshStandardMaterial
              color="#3B82F6"
              emissive="#3B82F6"
              emissiveIntensity={hovered ? 0.6 : 0.3}
              metalness={0.7}
              roughness={0.25}
            />
          </mesh>
        ))}

        {/* Inner circle */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.45, 0.45, 0.2, 32]} />
          <meshStandardMaterial
            color="#1e3a5f"
            emissive="#3B82F6"
            emissiveIntensity={hovered ? 0.4 : 0.15}
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>

        {/* Center hole */}
        <mesh>
          <torusGeometry args={[0.25, 0.06, 16, 32]} />
          <meshStandardMaterial
            color="#8B5CF6"
            emissive="#8B5CF6"
            emissiveIntensity={hovered ? 0.8 : 0.4}
            metalness={0.6}
            roughness={0.3}
          />
        </mesh>

        {/* Glow */}
        <pointLight
          position={[0, 0, 1]}
          intensity={hovered ? 0.5 : 0.15}
          color="#3B82F6"
          distance={4}
        />
      </group>
    </Float>
  );
}
