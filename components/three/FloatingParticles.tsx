"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const vertexShader = /* glsl */ `
  attribute float aRandom;
  attribute float aSize;

  uniform float uTime;
  uniform float uPixelRatio;

  varying float vRandom;
  varying float vDistance;

  void main() {
    vec3 pos = position;

    // Organic noise displacement
    float noise = sin(pos.x * 0.5 + uTime * 0.3) * cos(pos.y * 0.3 + uTime * 0.2) * 0.5;
    pos.x += sin(uTime * 0.2 + aRandom * 6.28) * 0.3 + noise;
    pos.y += cos(uTime * 0.15 + aRandom * 6.28) * 0.4;
    pos.z += sin(uTime * 0.1 + aRandom * 3.14) * 0.2;

    // Breathing pulse
    pos *= 1.0 + sin(uTime * 0.5 + aRandom * 3.14) * 0.02;

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);

    // Size attenuation by camera distance
    float distanceFactor = 1.0 / (-mvPosition.z * 0.1 + 1.0);
    gl_PointSize = aSize * uPixelRatio * distanceFactor * 80.0;
    gl_Position = projectionMatrix * mvPosition;

    vRandom = aRandom;
    vDistance = -mvPosition.z;
  }
`;

const fragmentShader = /* glsl */ `
  uniform float uTime;
  uniform vec3 uColor1;
  uniform vec3 uColor2;

  varying float vRandom;
  varying float vDistance;

  void main() {
    // Soft radial gradient (not hard circles)
    float dist = length(gl_PointCoord - vec2(0.5));
    if (dist > 0.5) discard;

    float alpha = 1.0 - smoothstep(0.0, 0.5, dist);
    alpha *= alpha; // Quadratic falloff for soft glow

    // Twinkle effect
    float twinkle = sin(uTime * 2.0 + vRandom * 62.83) * 0.3 + 0.7;
    alpha *= twinkle;

    // Color blend based on random seed
    vec3 color = mix(uColor1, uColor2, vRandom);

    // Glow intensity at center
    float glow = exp(-dist * 4.0) * 0.5;
    color += glow * 0.3;

    gl_FragColor = vec4(color, alpha * 0.6);
  }
`;

export default function FloatingParticles({ count = 300 }) {
  const pointsRef = useRef<THREE.Points>(null);

  const { geometry, uniforms } = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const randoms = new Float32Array(count);
    const sizes = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 30;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 30;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
      randoms[i] = Math.random();
      sizes[i] = Math.random() * 0.5 + 0.1;
    }

    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("aRandom", new THREE.BufferAttribute(randoms, 1));
    geo.setAttribute("aSize", new THREE.BufferAttribute(sizes, 1));

    const u = {
      uTime: { value: 0 },
      uPixelRatio: {
        value: typeof window !== "undefined" ? Math.min(window.devicePixelRatio, 2) : 1,
      },
      uColor1: { value: new THREE.Color("#8B5CF6") },
      uColor2: { value: new THREE.Color("#3B82F6") },
    };

    return { geometry: geo, uniforms: u };
  }, [count]);

  useFrame((state) => {
    uniforms.uTime.value = state.clock.elapsedTime;
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.015;
    }
  });

  return (
    <points ref={pointsRef} geometry={geometry}>
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
