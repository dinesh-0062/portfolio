"use client";
import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import useReducedMotion from "@/app/hooks/useReducedMotion";
import Rig from "./Rig";

function AmbientParticles({ reducedMotion }) {
  const points = useRef(null);
  const width = useThree((state) => state.size.width);
  const mobile = width < 720;
  const geometry = useMemo(() => {
    const count = mobile ? 32 : 80;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i += 1) {
      const angle = i * 2.39996;
      const radius = 1.1 + (i % 9) * 0.34;
      positions[i * 3] = Math.cos(angle) * radius;
      positions[i * 3 + 1] = Math.sin(angle * 1.7) * 2.2;
      positions[i * 3 + 2] = -1.5 - (i % 7) * 0.4;
    }
    const bufferGeometry = new THREE.BufferGeometry();
    bufferGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return bufferGeometry;
  }, [mobile]);

  useEffect(() => () => geometry.dispose(), [geometry]);

  useFrame((_, delta) => {
    if (points.current && !reducedMotion) points.current.rotation.y += delta * 0.012;
  });

  return (
    <points ref={points} geometry={geometry} frustumCulled={false}>
      <pointsMaterial color="#b9a7ff" size={mobile ? 0.022 : 0.028} transparent opacity={0.42} sizeAttenuation depthWrite={false} />
    </points>
  );
}

function StageRenderSync() {
  const invalidate = useThree((state) => state.invalidate);
  useEffect(() => {
    const renderStage = () => invalidate();
    window.addEventListener("stage", renderStage);
    return () => window.removeEventListener("stage", renderStage);
  }, [invalidate]);
  return null;
}

export default function Scene() {
  const reducedMotion = useReducedMotion();

  return (
    <div className="scene-layer" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        dpr={[1, 1.5]}
        frameloop={reducedMotion ? "demand" : "always"}
        gl={{ alpha: true, antialias: false, powerPreference: "low-power" }}
      >
        <StageRenderSync />
        <AmbientParticles reducedMotion={reducedMotion} />
        <Rig reducedMotion={reducedMotion} />
      </Canvas>
    </div>
  );
}