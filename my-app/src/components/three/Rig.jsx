"use client";
import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { stages, mobilePose } from "@/app/data/stages";
import { store } from "@/app/lib/store";
import Blob from "./Blob";

export default function Rig({ reducedMotion }) {
  const group = useRef(null);
  const width = useThree((s) => s.size.width);
  const cur = useRef({ x: 2.8, y: 0, s: 1.15, z: 0 });

  useFrame((state, dt) => {
    const p = width > 800 ? stages[store.active]?.pose ?? stages[0].pose : mobilePose;
    const c = cur.current;
    if (reducedMotion) {
      [c.x, c.y, c.s, c.z] = p;
    } else {
      c.x = THREE.MathUtils.damp(c.x, p[0], 4, dt);
      c.y = THREE.MathUtils.damp(c.y, p[1], 4, dt);
      c.s = THREE.MathUtils.damp(c.s, p[2], 4, dt);
      c.z = THREE.MathUtils.damp(c.z, p[3], 4, dt);
    }

    const t = state.clock.elapsedTime;
    if (group.current) {
      group.current.position.set(c.x, c.y + (reducedMotion ? 0 : Math.sin(t * 0.8) * 0.12), c.z);
      group.current.scale.setScalar(c.s);
    }
  });

  return (
    <group ref={group}>
      <Blob reducedMotion={reducedMotion} mobile={width <= 800} />
    </group>
  );
}