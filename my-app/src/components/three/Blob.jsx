
"use client";

import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { stages } from "@/app/data/stages";
import { store } from "@/app/lib/store";

const vertex = /* glsl */ `
uniform float uT, uA;
uniform vec2 uM;
varying vec3 vN;

float n(vec3 p) {
  return sin(p.x * 1.7 + uT)
       * sin(p.y * 1.9 - uT * .8)
       * sin(p.z * 1.6 + uT * .6);
}

void main() {
  vec3 p = position;

  float d = (
    n(p * 1.3) * .32 +
    n(p * 2.7 + 3.) * .13
  ) * uA * (1. + length(uM) * .9);

  vec3 q = normal + vec3(
    n(p * 1.3 + 1.),
    n(p * 1.3 + 2.),
    n(p * 1.3 + 3.)
  ) * .45 * uA;

  vN = normalize(normalMatrix * q);

  gl_Position = projectionMatrix
    * modelViewMatrix
    * vec4(p + normal * d, 1.);
}
`;

const fragment = /* glsl */ `
uniform vec3 c1, c2, c3;
uniform float uT;
varying vec3 vN;

void main() {
  vec3 N = normalize(vN);
  vec3 V = vec3(0., 0., 1.);

  float f = pow(
    1. - max(dot(N, V), 0.),
    2.3
  );

  float g = .5 + .5 * sin(
    N.y * 2.4 + N.x * 1.8 + uT * .6
  );

  vec3 b = mix(c1, c2, g);

  b = mix(
    b,
    c3,
    smoothstep(.15, .95, f)
  );

  float s = pow(
    max(
      dot(
        reflect(-normalize(vec3(.5, .8, .6)), N),
        V
      ),
      0.
    ),
    26.
  );

  // Extra animated glow
  float glow = .5 + .5 * sin(uT * 1.2 + N.y * 3.);

  vec3 finalColor =
    b * (.75 + .3 * N.y)
    + f * (.5 + glow * .25)
    + s * .8;

  gl_FragColor = vec4(finalColor, 1.);
}
`;

export default function Blob({ reducedMotion, mobile }) {
  const mesh = useRef(null);
  const tmp = useRef(new THREE.Color());

  const width = useThree((state) => state.size.width);

  const uniforms = useRef({
    uT: { value: 0 },
    uA: { value: 1 },
    uM: { value: new THREE.Vector2() },

    c1: {
      value: new THREE.Color(stages[0].pal[0]),
    },
    c2: {
      value: new THREE.Color(stages[0].pal[1]),
    },
    c3: {
      value: new THREE.Color(stages[0].pal[2]),
    },
  });

  useFrame((state, dt) => {
    const u = uniforms.current;
    const t = state.clock.elapsedTime;

    const motion = !reducedMotion;

    // Shader animation
    u.uT.value = motion ? t : 0;

    // Organic surface movement
    u.uA.value = motion
      ? 0.85 + Math.sin(t * 1.4) * 0.15
      : 0;

    // Mouse interaction
    u.uM.value.lerp(
      new THREE.Vector2(
        motion ? state.pointer.x * 0.5 : 0,
        motion ? state.pointer.y * 0.5 : 0
      ),
      1 - Math.exp(-dt * 4)
    );

    // Dynamic stage colors
    const pal =
      stages[store.active]?.pal ?? stages[0].pal;

    const colorEase = motion
      ? 1 - Math.exp(-dt * 3)
      : 1;

    [u.c1, u.c2, u.c3].forEach((c, i) => {
      c.value.lerp(
        tmp.current.set(pal[i]),
        colorEase
      );
    });

    if (!mesh.current) return;

    if (motion) {
      // Smooth floating
      mesh.current.position.y =
        Math.sin(t * 0.8) * 0.12;

      // Breathing scale
      const scale =
        1 + Math.sin(t * 1.1) * 0.025;

      mesh.current.scale.setScalar(scale);

      // Continuous rotation
      mesh.current.rotation.y +=
        dt * 0.18 +
        state.pointer.x * dt * 0.5;

      mesh.current.rotation.x = THREE.MathUtils.damp(
        mesh.current.rotation.x,
        -state.pointer.y * 0.5,
        3,
        dt
      );

      mesh.current.rotation.z =
        Math.sin(t * 0.4) * 0.04;

    } else {
      mesh.current.position.y = 0;
      mesh.current.scale.setScalar(1);
      mesh.current.rotation.set(0, 0, 0);
    }
  });

  return (
    <mesh ref={mesh}>
      <icosahedronGeometry
        args={[1.5, mobile || width < 720 ? 18 : 30]}
      />

      <shaderMaterial
        uniforms={uniforms.current}
        vertexShader={vertex}
        fragmentShader={fragment}
      />
    </mesh>
  );
}
