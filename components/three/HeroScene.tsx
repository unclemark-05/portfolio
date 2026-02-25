"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Preload } from "@react-three/drei";
import { Suspense, useEffect, useRef } from "react";
import OpiroModel from "./OpiroModel";
import ScriptureModel from "./ScriptureModel";
import SpareRoomModel from "./SpareRoomModel";
import FloatingParticles from "./FloatingParticles";

function MouseParallaxRig() {
  const { camera } = useThree();
  const mouse = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });
  const velocity = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("mousemove", onMouseMove);
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, []);

  useFrame((state) => {
    const tx = mouse.current.x * 1.5;
    const ty = mouse.current.y * 0.8;

    // Spring physics for natural deceleration with slight overshoot
    const stiffness = 0.003;
    const damping = 0.12;

    const dx = tx - target.current.x;
    const dy = ty - target.current.y;

    velocity.current.x += dx * stiffness;
    velocity.current.y += dy * stiffness;

    velocity.current.x *= 1 - damping;
    velocity.current.y *= 1 - damping;

    target.current.x += velocity.current.x;
    target.current.y += velocity.current.y;

    // Micro-shake for organic/cinematic feel
    const t = state.clock.elapsedTime;
    const shakeX =
      Math.sin(t * 1.1) * 0.015 + Math.sin(t * 2.3) * 0.008;
    const shakeY =
      Math.cos(t * 0.9) * 0.012 + Math.cos(t * 1.7) * 0.006;

    camera.position.x = target.current.x + shakeX;
    camera.position.y = target.current.y + shakeY;
    camera.lookAt(0, 0, 0);
  });

  return null;
}

export default function HeroScene() {
  return (
    <div className="canvas-container h-full w-full">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} />
        <pointLight position={[-5, 3, -5]} intensity={0.3} color="#8B5CF6" />

        <Suspense fallback={null}>
          <OpiroModel position={[-4, 0, 0]} />
          <ScriptureModel position={[0, 0, 0]} />
          <SpareRoomModel position={[4, 0, 0]} />
          <FloatingParticles />
          <Preload all />
        </Suspense>

        <MouseParallaxRig />
      </Canvas>
    </div>
  );
}
