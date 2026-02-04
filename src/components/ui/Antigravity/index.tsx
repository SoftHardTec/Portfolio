import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef, useState, useEffect } from "react";
import * as THREE from "three";

interface AntigravityProps {
  count?: number;
  magnetRadius?: number;
  ringRadius?: number;
  waveSpeed?: number;
  waveAmplitude?: number;
  particleSize?: number;
  lerpSpeed?: number;
  color?: string;
  autoAnimate?: boolean;
  particleVariance?: number;
  rotationSpeed?: number;
  depthFactor?: number;
  pulseSpeed?: number;
  particleShape?: "capsule" | "sphere" | "box" | "tetrahedron";
  fieldStrength?: number;
}

interface ParticleSeed {
  t: number;
  factor: number;
  speed: number;
  xFactor: number;
  yFactor: number;
  zFactor: number;
  nmx: number; // normalized mx
  nmy: number; // normalized my
  nmz: number; // normalized mz
  randomRadiusOffset: number;
}

interface Particle {
  t: number;
  factor: number;
  speed: number;
  xFactor: number;
  yFactor: number;
  zFactor: number;
  mx: number;
  my: number;
  mz: number;
  cx: number;
  cy: number;
  cz: number;
  vx: number;
  vy: number;
  vz: number;
  randomRadiusOffset: number;
}

const floatSpeed = 0.2;
const floatAmp = 3;

const AntigravityInner = ({
  count = 300,

  ringRadius = 10,
  waveSpeed = 0.4,
  waveAmplitude = 1,
  particleSize = 2,
  lerpSpeed = 0.1,
  color = "#FF9FFC",

  particleVariance = 1,
  rotationSpeed = 0,
  depthFactor = 1,
  pulseSpeed = 3,
  particleShape = "capsule",
  fieldStrength = 10,
}: AntigravityProps) => {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const { viewport } = useThree();
  const dummy = useMemo(() => new THREE.Object3D(), []);

  // Interaction state
  const interaction = useRef({ active: false, x: 0, y: 0 });

  // Click handler to trigger the circle formation
  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      // Calculate cursor position in viewport coordinates directly from event
      // This bypasses any potential R3F pointer lag
      const normalizedX = (event.clientX / window.innerWidth) * 2 - 1;
      const normalizedY = -(event.clientY / window.innerHeight) * 2 + 1;

      const x = (normalizedX * viewport.width) / 2;
      const y = (normalizedY * viewport.height) / 2;

      interaction.current = { active: true, x, y };

      // Return to place after 2 seconds
      setTimeout(() => {
        interaction.current = { ...interaction.current, active: false };
      }, 2000);
    };

    // Attach to window to catch clicks anywhere
    window.addEventListener("pointerdown", handlePointerDown);
    return () => window.removeEventListener("pointerdown", handlePointerDown);
  }, [viewport]);

  // Generate stable random seeds
  const [seeds] = useState<ParticleSeed[]>(() => {
    const temp: ParticleSeed[] = [];
    for (let i = 0; i < count; i++) {
      temp.push({
        t: Math.random() * 100,
        factor: 20 + Math.random() * 100,
        speed: 0.01 + Math.random() / 200,
        xFactor: -50 + Math.random() * 100,
        yFactor: -50 + Math.random() * 100,
        zFactor: -50 + Math.random() * 100,
        nmx: Math.random() - 0.5,
        nmy: Math.random() - 0.5,
        nmz: Math.random() - 0.5,
        randomRadiusOffset: (Math.random() - 0.5) * 2,
      });
    }
    return temp;
  });

  // Derive actual particles from seeds + viewport
  const particles = useMemo<Particle[]>(() => {
    const width = viewport.width || 100;
    const height = viewport.height || 100;

    return seeds.map((seed) => {
      const x = seed.nmx * width;
      const y = seed.nmy * height;
      const z = seed.nmz * 20;

      return {
        t: seed.t,
        factor: seed.factor,
        speed: seed.speed,
        xFactor: seed.xFactor,
        yFactor: seed.yFactor,
        zFactor: seed.zFactor,
        mx: x,
        my: y,
        mz: z,
        cx: x,
        cy: y,
        cz: z,
        vx: 0,
        vy: 0,
        vz: 0,
        randomRadiusOffset: seed.randomRadiusOffset,
      };
    });
  }, [seeds, viewport.width, viewport.height]);

  useFrame((state) => {
    const mesh = meshRef.current;
    if (!mesh) return;

    // Determine target center (mouse or interaction point)
    const targetX = interaction.current.active ? interaction.current.x : 0;
    const targetY = interaction.current.active ? interaction.current.y : 0;

    const globalRotation = state.clock.getElapsedTime() * rotationSpeed;
    const time = state.clock.getElapsedTime();

    particles.forEach((particle, i) => {
      const { speed, mx, my, mz, cz, randomRadiusOffset } = particle;

      particle.t += speed / 2;
      const t = particle.t;

      // Base Floating Movement (Minimal)
      const floatX = Math.sin(time * floatSpeed + particle.xFactor) * floatAmp;
      const floatY = Math.cos(time * floatSpeed + particle.yFactor) * floatAmp;

      const targetPos = {
        x: mx + floatX,
        y: my + floatY,
        z: mz * depthFactor,
      };

      // If interaction is active, Override with Circle Logic
      if (interaction.current.active) {
        const projectionFactor = 1 - cz / 50;
        const projectedTargetX = targetX * projectionFactor;
        const projectedTargetY = targetY * projectionFactor;

        // Calculate angle from the interaction center to the particle's origin (mx, my)
        // ensuring they form a circle around the click, keeping relative angular positions
        const dx = mx - projectedTargetX;
        const dy = my - projectedTargetY;
        // Just use the particle's original angle relative to center?
        // Or relative to the click point? Relative to click point creates a nice gathering effect.
        const angle = Math.atan2(dy, dx) + globalRotation;

        const wave = Math.sin(t * waveSpeed + angle) * (0.5 * waveAmplitude);
        const deviation = randomRadiusOffset * (5 / (fieldStrength + 0.1));

        const currentRingRadius = ringRadius + wave + deviation;

        targetPos.x = projectedTargetX + currentRingRadius * Math.cos(angle);
        targetPos.y = projectedTargetY + currentRingRadius * Math.sin(angle);
        targetPos.z =
          mz * depthFactor + Math.sin(t) * (1 * waveAmplitude * depthFactor);
      }

      particle.cx += (targetPos.x - particle.cx) * lerpSpeed;
      particle.cy += (targetPos.y - particle.cy) * lerpSpeed;
      particle.cz += (targetPos.z - particle.cz) * lerpSpeed;

      dummy.position.set(particle.cx, particle.cy, particle.cz);

      // Orientation
      // Look at the target (if active) or just float?
      // Let's keep looking at the "center of interest" if active, or forward if not?
      // Original code looked at `projectedTargetX`.
      // Getting `projectedTargetX` even in float mode:
      const lookAtX = interaction.current.active ? targetX : particle.cx;
      const lookAtY = interaction.current.active ? targetY : particle.cy;
      // If idle, maybe just look slightly shifting or fixed?
      // Original code: `dummy.lookAt(projectedTargetX, ...)` where targetX was virtualMouse.

      if (interaction.current.active) {
        dummy.lookAt(lookAtX, lookAtY, particle.cz);
      } else {
        // Slight rotation or fixed orientation
        dummy.rotation.set(0, 0, 0);
        // Or keep looking at 0,0?
        dummy.lookAt(0, 0, particle.cz);
      }

      dummy.rotateX(Math.PI / 2);

      // Scaling logic
      // In float mode, maybe just constant pulse?
      // In circle mode, check distance from ring?
      // Let's simplify:
      const pulse = 0.8 + Math.sin(t * pulseSpeed) * 0.2 * particleVariance;
      let scaleFactor = pulse;

      if (interaction.current.active) {
        // Enforce circle scaling logic
        const currentDistToCenter = Math.sqrt(
          Math.pow(particle.cx - targetX, 2) +
            Math.pow(particle.cy - targetY, 2),
        );
        const distFromRing = Math.abs(currentDistToCenter - ringRadius);
        let ringScale = 1 - distFromRing / 20; // softer falloff
        ringScale = Math.max(0.5, Math.min(1.2, ringScale));
        scaleFactor *= ringScale;
      }

      const finalScale = scaleFactor * particleSize;
      dummy.scale.set(finalScale, finalScale, finalScale);

      dummy.updateMatrix();

      mesh.setMatrixAt(i, dummy.matrix);
    });

    mesh.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      {particleShape === "capsule" && (
        <capsuleGeometry args={[0.1, 0.4, 4, 8]} />
      )}
      {particleShape === "sphere" && <sphereGeometry args={[0.2, 16, 16]} />}
      {particleShape === "box" && <boxGeometry args={[0.3, 0.3, 0.3]} />}
      {particleShape === "tetrahedron" && <tetrahedronGeometry args={[0.3]} />}
      <meshBasicMaterial color={color} />
    </instancedMesh>
  );
};

const Antigravity = (props: AntigravityProps) => {
  return (
    <Canvas camera={{ position: [0, 0, 50], fov: 35 }}>
      <AntigravityInner key={props.count} {...props} />
    </Canvas>
  );
};

export default Antigravity;
