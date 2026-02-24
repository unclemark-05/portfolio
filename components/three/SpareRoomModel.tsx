"use client";

import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

export default function SpareRoomModel({ position = [4, 0, 0] as [number, number, number] }) {
  const groupRef = useRef<THREE.Group>(null);
  const keyRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (keyRef.current) {
      keyRef.current.position.y = 1.5 + Math.sin(t * 2) * 0.15;
      keyRef.current.rotation.z = Math.sin(t * 1.5) * 0.3;
    }
    if (groupRef.current && hovered) {
      groupRef.current.rotation.y = Math.sin(t) * 0.15;
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
        {/* House body */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[1.6, 1.2, 1.2]} />
          <meshStandardMaterial color="#3B82F6" roughness={0.4} />
        </mesh>

        {/* Roof */}
        <mesh position={[0, 1, 0]} rotation={[0, Math.PI / 4, 0]}>
          <coneGeometry args={[1.3, 0.8, 4]} />
          <meshStandardMaterial color="#1E40AF" roughness={0.5} />
        </mesh>

        {/* Door */}
        <mesh position={[0, -0.2, 0.61]}>
          <boxGeometry args={[0.35, 0.6, 0.02]} />
          <meshStandardMaterial color="#1E3A5F" roughness={0.6} />
        </mesh>

        {/* Door handle */}
        <mesh position={[0.1, -0.2, 0.63]}>
          <sphereGeometry args={[0.03, 8, 8]} />
          <meshStandardMaterial color="#D4AF37" metalness={0.8} />
        </mesh>

        {/* Windows */}
        <mesh position={[-0.45, 0.15, 0.61]}>
          <boxGeometry args={[0.3, 0.3, 0.02]} />
          <meshStandardMaterial
            color="#87CEEB"
            emissive="#87CEEB"
            emissiveIntensity={hovered ? 0.3 : 0.1}
            transparent
            opacity={0.8}
          />
        </mesh>
        <mesh position={[0.45, 0.15, 0.61]}>
          <boxGeometry args={[0.3, 0.3, 0.02]} />
          <meshStandardMaterial
            color="#87CEEB"
            emissive="#87CEEB"
            emissiveIntensity={hovered ? 0.3 : 0.1}
            transparent
            opacity={0.8}
          />
        </mesh>

        {/* Key */}
        <group ref={keyRef} position={[0.9, 1.5, 0]}>
          {/* Key ring */}
          <mesh>
            <torusGeometry args={[0.15, 0.025, 16, 32]} />
            <meshStandardMaterial
              color="#D4AF37"
              metalness={0.8}
              roughness={0.2}
              emissive="#D4AF37"
              emissiveIntensity={hovered ? 0.4 : 0.1}
            />
          </mesh>
          {/* Key shaft */}
          <mesh position={[0, -0.3, 0]}>
            <cylinderGeometry args={[0.02, 0.02, 0.35, 8]} />
            <meshStandardMaterial
              color="#D4AF37"
              metalness={0.8}
              roughness={0.2}
            />
          </mesh>
          {/* Key teeth */}
          <mesh position={[-0.04, -0.45, 0]}>
            <boxGeometry args={[0.06, 0.08, 0.02]} />
            <meshStandardMaterial color="#D4AF37" metalness={0.8} />
          </mesh>
          <mesh position={[-0.04, -0.38, 0]}>
            <boxGeometry args={[0.04, 0.06, 0.02]} />
            <meshStandardMaterial color="#D4AF37" metalness={0.8} />
          </mesh>
        </group>
      </group>
    </Float>
  );
}
