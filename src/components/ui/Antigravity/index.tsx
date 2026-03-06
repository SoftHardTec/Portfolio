import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef, useState, useEffect } from "react";
import * as THREE from "three";
import { EffectComposer, Bloom } from "@react-three/postprocessing";

interface AntigravityProps {
  count?: number;
  ringRadius?: number;
  particleSize?: number;
  lerpSpeed?: number;
  color?: string;
  particleVariance?: number;
  rotationSpeed?: number;
  depthFactor?: number;
  pulseSpeed?: number;
  particleShape?: "capsule" | "sphere" | "box" | "tetrahedron";
  blur?: number;
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
  particleSize = 2,
  lerpSpeed = 0.1,
  color = "#FF9FFC",

  particleVariance = 1,
  rotationSpeed = 0,
  depthFactor = 1,
  pulseSpeed = 3,
  particleShape = "capsule",
  blur = 0,
}: AntigravityProps) => {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const { viewport, gl } = useThree();
  const dummy = useMemo(() => new THREE.Object3D(), []);

  // Interaction state
  const interaction = useRef({ active: false, x: 0, y: 0 });

  // Click handler to trigger the circle formation
  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;
    const handlePointerDown = (event: MouseEvent) => {
      // Improved position detection using canvas bounds
      const rect = gl.domElement.getBoundingClientRect();
      const x_px = event.clientX - rect.left;
      const y_px = event.clientY - rect.top;

      const normalizedX = (x_px / rect.width) * 2 - 1;
      const normalizedY = -(y_px / rect.height) * 2 + 1;

      const x = (normalizedX * viewport.width) / 2;
      const y = (normalizedY * viewport.height) / 2;

      interaction.current = { active: true, x, y };

      // Return to place after 2 seconds
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        interaction.current = { ...interaction.current, active: false };
      }, 2000);
    };

    const handleScroll = () => {
      if (interaction.current.active) {
        interaction.current.active = false;
        clearTimeout(timeoutId);
      }
    };

    // Attach to window to catch clicks anywhere
    window.addEventListener("click", handlePointerDown);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("click", handlePointerDown);
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timeoutId);
    };
  }, [viewport, gl]);

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

  // Track current positions in a ref to avoid resetting on resize
  const particleState = useRef<
    { cx: number; cy: number; cz: number; vx: number; vy: number; vz: number }[]
  >([]);

  // If seeds change or count changes, initialize state
  useEffect(() => {
    particleState.current = seeds.map((seed) => {
      const x = seed.nmx * (viewport.width || 100);
      const y = seed.nmy * (viewport.height || 100);
      const z = seed.nmz * 20;
      return { cx: x, cy: y, cz: z, vx: 0, vy: 0, vz: 0 };
    });
  }, [seeds, viewport.width, viewport.height]);

  // Derive actual particles from seeds + viewport
  const particles = useMemo<Particle[]>(() => {
    const width = viewport.width || 100;
    const height = viewport.height || 100;

    return seeds.map((seed) => {
      const x = seed.nmx * width;
      const y = seed.nmy * height;
      const z = seed.nmz * 20;

      // When seeds change, particles array is recreated.
      // But we will use particleState.current[i] inside useFrame for the actual animated pos.
      return {
        ...seed,
        mx: x,
        my: y,
        mz: z,
        cx: x, // dummy, will be overridden by ref in useFrame
        cy: y,
        cz: z,
        vx: 0,
        vy: 0,
        vz: 0,
      };
    });
  }, [seeds, viewport.width, viewport.height]);

  useFrame((state, delta) => {
    const mesh = meshRef.current;
    if (!mesh) return;

    // Determine target center (interaction point)
    const interactionX = interaction.current.active ? interaction.current.x : 0;
    const interactionY = interaction.current.active ? interaction.current.y : 0;

    const globalRotation = state.clock.getElapsedTime() * rotationSpeed;
    const time = state.clock.getElapsedTime();

    particles.forEach((particle, i) => {
      const { speed, mx, my, mz } = particle;

      particle.t += speed / 2;
      const t = particle.t;

      // Base Floating Movement (Minimal)
      const floatX = Math.sin(time * floatSpeed + particle.xFactor) * floatAmp;
      const floatY = Math.cos(time * floatSpeed + particle.yFactor) * floatAmp;

      let targetX = mx + floatX;
      let targetY = my + floatY;
      let targetZ = mz * depthFactor;

      // If interaction is active, Override with Circle Logic
      if (interaction.current.active) {
        // Use the base Z for a stable projection factor
        const stableZ = mz * depthFactor;
        const projectionFactor = 1 - stableZ / 50;

        // Base angle for even distribution (quantity balance)
        const baseAngle = (i / count) * Math.PI * 2 + globalRotation;

        // Add disorder using the particle's stable random offset
        const jitterRadius = 1 + particle.randomRadiusOffset * 0.4;
        const jitterAngle = particle.randomRadiusOffset * 0.3;

        const finalAngle = baseAngle + jitterAngle;

        const projectedTargetX = interactionX * projectionFactor;
        const projectedTargetY = interactionY * projectionFactor;
        const targetRadius = ringRadius * projectionFactor * jitterRadius;

        targetX = projectedTargetX + targetRadius * Math.cos(finalAngle);
        targetY = projectedTargetY + targetRadius * Math.sin(finalAngle);
        targetZ = stableZ;
      }

      const pState = particleState.current[i];
      if (!pState) return;

      const frameDelta = Math.min(delta, 0.1);
      const lerpFactor = 1 - Math.pow(1 - lerpSpeed, frameDelta * 60);

      pState.cx += (targetX - pState.cx) * lerpFactor;
      pState.cy += (targetY - pState.cy) * lerpFactor;
      pState.cz += (targetZ - pState.cz) * lerpFactor;

      dummy.position.set(pState.cx, pState.cy, pState.cz);

      // Orientation
      if (interaction.current.active) {
        const stableZ = mz * depthFactor;
        const projectionFactor = 1 - stableZ / 50;
        const projectedTargetX = interactionX * projectionFactor;
        const projectedTargetY = interactionY * projectionFactor;

        // Look at the projected center of the circle at the same depth
        dummy.lookAt(projectedTargetX, projectedTargetY, pState.cz);
      } else {
        dummy.rotation.set(0, 0, 0);
        dummy.lookAt(0, 0, pState.cz);
      }

      dummy.rotateX(Math.PI / 2);

      // Scaling logic
      const pulse = 0.8 + Math.sin(t * pulseSpeed) * 0.2 * particleVariance;
      let scaleFactor = pulse;

      if (interaction.current.active) {
        const stableZ = mz * depthFactor;
        const projectionFactor = 1 - stableZ / 50;
        const projectedTargetX = interactionX * projectionFactor;
        const projectedTargetY = interactionY * projectionFactor;
        const targetBaseRadius = ringRadius * projectionFactor;

        // Enforce circle scaling logic relative to the projected center and target radius
        const currentDistToCenter = Math.sqrt(
          Math.pow(pState.cx - projectedTargetX, 2) +
            Math.pow(pState.cy - projectedTargetY, 2),
        );
        const distFromRing = Math.abs(currentDistToCenter - targetBaseRadius);
        let ringScale = 1 - distFromRing / 10;
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
    <>
      <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
        {particleShape === "capsule" && (
          <capsuleGeometry args={[0.1, 0.4, 4, 8]} />
        )}
        {particleShape === "sphere" && <sphereGeometry args={[0.2, 16, 16]} />}
        {particleShape === "box" && <boxGeometry args={[0.3, 0.3, 0.3]} />}
        {particleShape === "tetrahedron" && (
          <tetrahedronGeometry args={[0.3]} />
        )}
        <meshBasicMaterial
          color={new THREE.Color(color).multiplyScalar(1.5)}
          toneMapped={false}
        />
      </instancedMesh>
      {blur > 0 && (
        <EffectComposer multisampling={0}>
          <Bloom
            luminanceThreshold={0}
            luminanceSmoothing={0.9}
            intensity={blur * 0.2} // Reduced intensity to compensate for toneMapping and mipmapBlur
            mipmapBlur
          />
        </EffectComposer>
      )}
    </>
  );
};

const Antigravity = (props: AntigravityProps) => {
  return (
    <Canvas
      dpr={1} // Force 1.0 pixel ratio for maximum performance consistency
      gl={{ antialias: false, powerPreference: "high-performance" }} // Disable MSAA (since we use Bloom mainly) and request high performance
      camera={{ position: [0, 0, 50], fov: 35 }}
    >
      <AntigravityInner key={props.count} {...props} />
    </Canvas>
  );
};

export default Antigravity;
