"use client";

import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, RoundedBox } from "@react-three/drei";
import * as THREE from "three";

// Developer-themed: Floating Laptop
export default function OpiroModel({ position = [-4, 0, 0] as [number, number, number] }) {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const targetScale = useRef(1);
  const screenGlow = useRef(0.3);

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

    // Smooth screen glow
    const target = hovered ? 0.8 : 0.3;
    screenGlow.current += (target - screenGlow.current) * 0.1;
  });

  const handleClick = () => {
    const el = document.getElementById("projects");
    el?.scrollIntoView({ behavior: "smooth" });
  };

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
        rotation={[0.2, 0, 0]}
      >
        {/* Laptop base */}
        <RoundedBox args={[2, 0.08, 1.4]} radius={0.03} position={[0, -0.5, 0]}>
          <meshStandardMaterial color="#2a2a3e" metalness={0.8} roughness={0.2} />
        </RoundedBox>

        {/* Keyboard area */}
        <mesh position={[0, -0.44, 0]}>
          <boxGeometry args={[1.7, 0.01, 1.1]} />
          <meshStandardMaterial color="#1a1a2e" roughness={0.6} />
        </mesh>

        {/* Trackpad */}
        <mesh position={[0, -0.43, 0.3]}>
          <boxGeometry args={[0.5, 0.01, 0.35]} />
          <meshStandardMaterial color="#252540" roughness={0.4} />
        </mesh>

        {/* Screen (angled up) */}
        <group position={[0, 0.15, -0.65]} rotation={[-0.3, 0, 0]}>
          {/* Screen bezel */}
          <RoundedBox args={[2, 1.3, 0.06]} radius={0.03}>
            <meshStandardMaterial color="#2a2a3e" metalness={0.8} roughness={0.2} />
          </RoundedBox>

          {/* Screen display */}
          <mesh position={[0, 0, 0.035]}>
            <boxGeometry args={[1.75, 1.1, 0.01]} />
            <meshStandardMaterial
              color="#0f172a"
              emissive="#8B5CF6"
              emissiveIntensity={screenGlow.current}
            />
          </mesh>

          {/* Code lines on screen */}
          {[-0.35, -0.2, -0.05, 0.1, 0.25].map((y, i) => (
            <mesh key={i} position={[-0.3 + i * 0.05, y, 0.04]}>
              <boxGeometry args={[0.6 + (i % 3) * 0.2, 0.04, 0.005]} />
              <meshStandardMaterial
                color={i % 2 === 0 ? "#8B5CF6" : "#3B82F6"}
                emissive={i % 2 === 0 ? "#8B5CF6" : "#3B82F6"}
                emissiveIntensity={0.5}
                transparent
                opacity={0.7}
              />
            </mesh>
          ))}
        </group>

        {/* Screen hinge glow */}
        <pointLight
          position={[0, -0.1, -0.5]}
          intensity={hovered ? 0.5 : 0.2}
          color="#8B5CF6"
          distance={3}
        />
      </group>
    </Float>
  );
}
