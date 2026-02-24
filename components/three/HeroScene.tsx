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
  const smoothed = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("mousemove", onMouseMove);
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, []);

  useFrame(() => {
    smoothed.current.x += (mouse.current.x - smoothed.current.x) * 0.05;
    smoothed.current.y += (mouse.current.y - smoothed.current.y) * 0.05;

    camera.position.x = smoothed.current.x * 1.5;
    camera.position.y = smoothed.current.y * 0.8;
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
