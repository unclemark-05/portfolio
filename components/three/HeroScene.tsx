"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload } from "@react-three/drei";
import { Suspense } from "react";
import OpiroModel from "./OpiroModel";
import ScriptureModel from "./ScriptureModel";
import SpareRoomModel from "./SpareRoomModel";
import FloatingParticles from "./FloatingParticles";

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

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.3}
          maxPolarAngle={Math.PI / 1.8}
          minPolarAngle={Math.PI / 2.5}
        />
      </Canvas>
    </div>
  );
}
