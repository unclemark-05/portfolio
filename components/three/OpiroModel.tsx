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

  // Smooth scale and emissive targets
  const targetScale = useRef(1);
  const currentEmissive = useRef(0.3);
  const targetEmissive = useRef(0.3);

  useFrame((state) => {
    const t = state.clock.elapsedTime;

    // Wave pulsing
    if (wave1Ref.current) {
      wave1Ref.current.scale.setScalar(1 + Math.sin(t * 2) * 0.1);
    }
    if (wave2Ref.current) {
      wave2Ref.current.scale.setScalar(1 + Math.sin(t * 2 + 1) * 0.1);
    }
    if (wave3Ref.current) {
      wave3Ref.current.scale.setScalar(1 + Math.sin(t * 2 + 2) * 0.1);
    }

    // Gentle sine-wave idle rotation instead of constant increment
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(t * 0.3) * 0.15;

      // Smooth scale lerp
      targetScale.current = hovered ? 1.1 : 1;
      groupRef.current.scale.lerp(
        new THREE.Vector3(targetScale.current, targetScale.current, targetScale.current),
        0.1
      );
    }

    // Smooth emissive intensity lerp
    targetEmissive.current = hovered ? 1.5 : 0.6;
    currentEmissive.current += (targetEmissive.current - currentEmissive.current) * 0.1;

    // Apply emissive to wave materials
    [wave1Ref, wave2Ref, wave3Ref].forEach((ref) => {
      if (ref.current) {
        const mat = (ref.current as THREE.Mesh).material as THREE.MeshStandardMaterial;
        if (mat) mat.emissiveIntensity = currentEmissive.current;
      }
    });
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
      >
        {/* Vinyl disc */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[1.2, 1.2, 0.05, 64]} />
          <meshStandardMaterial
            color="#2d2d4e"
            emissive="#8B5CF6"
            emissiveIntensity={0.15}
            metalness={0.7}
            roughness={0.25}
          />
        </mesh>

        {/* Center label */}
        <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0.03, 0]}>
          <cylinderGeometry args={[0.35, 0.35, 0.02, 32]} />
          <meshStandardMaterial
            color="#8B5CF6"
            emissive="#8B5CF6"
            emissiveIntensity={0.4}
            metalness={0.5}
            roughness={0.3}
          />
        </mesh>

        {/* Groove rings */}
        {[0.5, 0.7, 0.9, 1.05].map((radius, i) => (
          <mesh key={i} rotation={[Math.PI / 2, 0, 0]} position={[0, 0.03, 0]}>
            <torusGeometry args={[radius, 0.01, 8, 64]} />
            <meshStandardMaterial
              color="#8B5CF6"
              emissive="#8B5CF6"
              emissiveIntensity={0.2}
              metalness={0.8}
              roughness={0.15}
            />
          </mesh>
        ))}

        {/* Sound waves */}
        <mesh ref={wave1Ref} position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.5, 0.02, 8, 64]} />
          <meshStandardMaterial
            color="#8B5CF6"
            transparent
            opacity={0.6}
            emissive="#8B5CF6"
            emissiveIntensity={0.6}
          />
        </mesh>
        <mesh ref={wave2Ref} position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.8, 0.02, 8, 64]} />
          <meshStandardMaterial
            color="#8B5CF6"
            transparent
            opacity={0.4}
            emissive="#8B5CF6"
            emissiveIntensity={0.5}
          />
        </mesh>
        <mesh ref={wave3Ref} position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[2.1, 0.015, 8, 64]} />
          <meshStandardMaterial
            color="#8B5CF6"
            transparent
            opacity={0.3}
            emissive="#8B5CF6"
            emissiveIntensity={0.4}
          />
        </mesh>
      </group>
    </Float>
  );
}
