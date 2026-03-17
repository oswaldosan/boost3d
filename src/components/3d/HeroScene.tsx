'use client';

import { Suspense, useRef, useEffect, useMemo, useCallback, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Environment, Center, ContactShadows } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';

useGLTF.preload('/3d/Logo3.glb');

/* ── Dark stage background color ── */
const BG = '#eaeaf0';

/* ── Materials — tuned for dark env ── */
const MAT_BLUE: Record<string, unknown> = {
  color: new THREE.Color('#0d0869'),
  metalness: 0.92,
  roughness: 0.14,
  envMapIntensity: 1,
  clearcoat: 0.8,
  clearcoatRoughness: 0.05,
  reflectivity: 0.9,
  iridescence: 0.2,
  iridescenceIOR: 1.4,
};

const MAT_ORANGE: Record<string, unknown> = {
  color: new THREE.Color('#ff4342'),
  metalness: 0.8,
  roughness: 0.14,
  envMapIntensity: 1.45,
  clearcoat: 0.8,
  clearcoatRoughness: 0.03,
  reflectivity: 1,
  iridescence: 0.1,
  iridescenceIOR: 1.4,
};

const MAT_BLACK: Record<string, unknown> = {
  color: new THREE.Color('#080808'),
  metalness: 0.95,
  roughness: 0.09,
  envMapIntensity: 1.25,
  clearcoat: 1,
  clearcoatRoughness: 0.02,
  reflectivity: 1,
};

/* ── Logo ── */
function LogoModel({ scrollProgress }: { scrollProgress: number }) {
  const { scene } = useGLTF('/3d/Logo3.glb');
  const groupRef = useRef<THREE.Group>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const isMobile = useRef(false);
  const smoothMouse = useRef({ x: 0, y: 0 });
  const arrowRef = useRef<THREE.Mesh | null>(null);
  const beakRef = useRef<THREE.Mesh | null>(null);
  const textRef = useRef<THREE.Mesh | null>(null);
  const bodyRef = useRef<THREE.Mesh | null>(null);

  const { center, scaleFactor } = useMemo(() => {
    const box = new THREE.Box3().setFromObject(scene);
    const c = new THREE.Vector3();
    box.getCenter(c);
    const size = new THREE.Vector3();
    box.getSize(size);
    // Reduced ~15% (4.7 instead of 5.5)
    return { center: c, scaleFactor: 4.7 / Math.max(size.x, size.y, size.z) };
  }, [scene]);

  useEffect(() => {
    const setMobileState = () => {
      isMobile.current = window.innerWidth < 768;
    };

    setMobileState();
    const onMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    window.addEventListener('resize', setMobileState, { passive: true });
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => {
      window.removeEventListener('resize', setMobileState);
      window.removeEventListener('mousemove', onMove);
    };
  }, []);

  useEffect(() => {
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        // Hide the "Marketing digital • BTL • Audiovisuales" text mesh
        if (child.name === 'Shape11') {
          child.visible = false;
          textRef.current = child;
          return;
        }
        
        let mat = MAT_BLUE;
        if (child.name === 'Shape12') mat = MAT_ORANGE;
        if (child.name === 'Shape62') mat = MAT_BLACK;
        child.material = new THREE.MeshPhysicalMaterial(mat);
        child.castShadow = true;
        child.receiveShadow = true;
        if (child.name === 'Shape12') arrowRef.current = child;
        if (child.name === 'Shape62') beakRef.current = child;
        if (child.name === 'Shape8') bodyRef.current = child;
      }
    });
  }, [scene]);

  const originals = useRef<{ arrow: THREE.Vector3; beak: THREE.Vector3; text: THREE.Vector3; body: THREE.Vector3 } | null>(null);
  const intro = useRef(0);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;

    // Intro
    const ip = 1 - Math.pow(1 - Math.min(clock.elapsedTime / 2.5, 1), 3);
    intro.current = ip;

    // Mouse
    smoothMouse.current.x += (mouse.current.x - smoothMouse.current.x) * 0.02;
    smoothMouse.current.y += (mouse.current.y - smoothMouse.current.y) * 0.02;
    const baseRotationY = Math.sin(clock.elapsedTime * 0.14) * 0.068;
    const targetRotationY = (0.02 + baseRotationY + smoothMouse.current.x * 0.085) * ip;
    const targetRotationX = smoothMouse.current.y * 0.06 * ip;
    groupRef.current.rotation.y = THREE.MathUtils.clamp(targetRotationY, -0.13, 0.15);
    groupRef.current.rotation.x = THREE.MathUtils.clamp(targetRotationX, -0.08, 0.08);

    if (!originals.current) {
      originals.current = {
        arrow: arrowRef.current?.position.clone() ?? new THREE.Vector3(),
        beak: beakRef.current?.position.clone() ?? new THREE.Vector3(),
        text: textRef.current?.position.clone() ?? new THREE.Vector3(),
        body: bodyRef.current?.position.clone() ?? new THREE.Vector3(),
      };
    }

    const sp = scrollProgress * scrollProgress;

    if (arrowRef.current && originals.current) {
      arrowRef.current.position.y = originals.current.arrow.y - (1 - ip) * 6 + sp * 4;
      arrowRef.current.position.x = originals.current.arrow.x + sp * 1;
    }
    if (textRef.current && originals.current) {
      textRef.current.position.y = originals.current.text.y + (1 - ip) * 4;
      textRef.current.position.x = originals.current.text.x + sp * 3;
    }
    if (beakRef.current && originals.current) {
      beakRef.current.position.y = originals.current.beak.y + (1 - ip) * 3 - sp * 2.5;
    }
    if (bodyRef.current && originals.current) {
      bodyRef.current.position.x = originals.current.body.x + (1 - ip) * -5 - sp * 2;
    }

    const logoScale = isMobile.current ? 0.84 : 1;
    const basePositionX = isMobile.current ? 0.08 : 0.1;
    const basePositionY = isMobile.current ? 2.05 : 1.25;
    const basePositionZ = 0;
    const introTravel = isMobile.current ? 1.35 : 2;
    const scrollTravel = isMobile.current ? 0.3 : 0.5;

    groupRef.current.scale.setScalar((0.6 + ip * 0.4) * (1 - sp * 0.1) * logoScale);
    groupRef.current.position.x = basePositionX + smoothMouse.current.x * (isMobile.current ? 0.03 : 0.06) - sp * 0.12;
    groupRef.current.position.y = (basePositionY - (1 - ip) * introTravel) - sp * scrollTravel;
    groupRef.current.position.z = basePositionZ + Math.sin(clock.elapsedTime * 0.55) * 0.03;
  });

  return (
    <group ref={groupRef} position={[0.1, 1.5, 0]}>
      <Center>
        <group scale={scaleFactor}>
          <primitive object={scene} position={[-center.x, -center.y, -center.z]} />
        </group>
      </Center>
    </group>
  );
}

/* ── Space particles — ambient floating dots ── */
const PARTICLE_COUNT = 120;
type Particle = {
  x: number;
  y: number;
  z: number;
  speed: number;
  offset: number;
  drift: number;
  size: number;
};

function seededValue(seed: number) {
  const x = Math.sin(seed * 12.9898 + 78.233) * 43758.5453;
  return x - Math.floor(x);
}

function seededRange(seed: number, min: number, max: number) {
  return min + seededValue(seed) * (max - min);
}

function DustParticles() {
  const meshRef = useRef<THREE.InstancedMesh>(null);

  const particles = useMemo<Particle[]>(() => {
    const data: Particle[] = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const seed = i + 1;
      const angle = seededRange(seed * 1.1, 0, Math.PI * 2);
      const r = seededRange(seed * 1.3, 6, 18);
      const elevation = seededRange(seed * 1.7, -4, 6);
      data.push({
        x: Math.cos(angle) * r,
        y: elevation,
        z: Math.sin(angle) * r - 8,
        speed: seededRange(seed * 2.1, 0.015, 0.06),
        offset: seededRange(seed * 2.5, 0, Math.PI * 2),
        drift: seededRange(seed * 2.9, 0.08, 0.28),
        size: seededRange(seed * 3.3, 0.01, 0.035),
      });
    }
    return data;
  }, []);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.elapsedTime;
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const p = particles[i];
      dummy.position.set(
        p.x + Math.sin(t * p.speed + p.offset) * p.drift,
        p.y + Math.cos(t * p.speed * 0.7 + p.offset) * p.drift * 0.5,
        p.z,
      );
      dummy.scale.setScalar(p.size);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <>
      <instancedMesh ref={meshRef} args={[undefined, undefined, PARTICLE_COUNT]}>
        <sphereGeometry args={[1, 8, 8]} />
        <meshBasicMaterial color="#b8c0e8" transparent opacity={0.22} depthWrite={false} />
      </instancedMesh>
    </>
  );
}

/* ── Tiny twinkling stars — space ambiance ── */
const STAR_COUNT = 80;

function SpaceStars() {
  const meshRef = useRef<THREE.InstancedMesh>(null);

  const stars = useMemo(() => {
    const data: { x: number; y: number; z: number; size: number; twinkle: number; offset: number }[] = [];
    for (let i = 0; i < STAR_COUNT; i++) {
      const seed = i + 200;
      const angle = seededRange(seed * 1.2, 0, Math.PI * 2);
      const r = seededRange(seed * 1.5, 8, 22);
      data.push({
        x: Math.cos(angle) * r,
        y: seededRange(seed * 1.8, -3, 7),
        z: Math.sin(angle) * r - 10,
        size: seededRange(seed * 2.2, 0.006, 0.02),
        twinkle: seededRange(seed * 2.6, 0.5, 2),
        offset: seededRange(seed * 3.0, 0, Math.PI * 2),
      });
    }
    return data;
  }, []);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.elapsedTime;
    for (let i = 0; i < STAR_COUNT; i++) {
      const s = stars[i];
      dummy.position.set(s.x, s.y, s.z);
      const flicker = 0.6 + Math.sin(t * s.twinkle + s.offset) * 0.4;
      dummy.scale.setScalar(s.size * flicker);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, STAR_COUNT]}>
      <sphereGeometry args={[1, 6, 6]} />
      <meshBasicMaterial color="#ffffff" transparent opacity={0.5} depthWrite={false} />
    </instancedMesh>
  );
}

/* ── Rising bubbles — subtle upward motion ── */
const BUBBLE_COUNT = 12;

function RisingBubbles() {
  const meshRef = useRef<THREE.InstancedMesh>(null);

  const bubbles = useMemo(() => {
    const data: { x: number; z: number; speed: number; offset: number; size: number }[] = [];
    for (let i = 0; i < BUBBLE_COUNT; i++) {
      const seed = i + 500;
      data.push({
        x: seededRange(seed * 1.1, -4, 4),
        z: seededRange(seed * 1.3, -3, 2),
        speed: seededRange(seed * 1.7, 0.15, 0.35),
        offset: seededRange(seed * 2.1, 0, 10),
        size: seededRange(seed * 2.5, 0.025, 0.06),
      });
    }
    return data;
  }, []);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.elapsedTime;
    for (let i = 0; i < BUBBLE_COUNT; i++) {
      const b = bubbles[i];
      const cycleTime = 12 / b.speed;
      const phase = ((t + b.offset) % cycleTime) / cycleTime;
      const y = -3 + phase * 10;
      const wobble = Math.sin(t * 2 + b.offset) * 0.15;
      dummy.position.set(b.x + wobble, y, b.z);
      const fadeIn = Math.min(phase * 4, 1);
      const fadeOut = Math.min((1 - phase) * 4, 1);
      dummy.scale.setScalar(b.size * fadeIn * fadeOut);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, BUBBLE_COUNT]}>
      <sphereGeometry args={[1, 12, 12]} />
      <meshBasicMaterial color="#a8b4e8" transparent opacity={0.18} depthWrite={false} />
    </instancedMesh>
  );
}

/* ── Shooting stars — denser studio ambiance ── */
function ShootingStars() {
  return (
    <group>
      <ShootingStar delay={1.5} cooldown={8} color="#ff4342" />
      <ShootingStar delay={4.5} cooldown={9} color="#3b6cff" />
      <ShootingStar delay={7.5} cooldown={8.5} color="#ff4342" />
      <ShootingStar delay={10.5} cooldown={10} color="#3b6cff" />
      <ShootingStar delay={13.5} cooldown={9.5} color="#ff7a74" />
      <ShootingStar delay={16} cooldown={11} color="#7c9dff" />
    </group>
  );
}

function ShootingStar({ delay, cooldown, color }: { delay: number; cooldown: number; color: string }) {
  const headRef = useRef<THREE.Mesh>(null);
  const trailRef = useRef<THREE.Mesh>(null);
  const state = useRef({ active: false, progress: 0, nextFire: delay, sx: 0, sy: 0, ex: 0, ey: 0, sz: 0, speed: 0 });

  const fire = useCallback(() => {
    const s = state.current;
    const r = Math.random() > 0.5;
    s.sx = r ? -12 : 12; s.ex = r ? 12 : -12;
    s.sy = 3 + Math.random() * 3; s.ey = s.sy - 2 - Math.random() * 2;
    s.sz = -1 + Math.random() * 2; s.speed = 0.5 + Math.random() * 0.3;
    s.progress = 0; s.active = true;
  }, []);

  useFrame((_, dt) => {
    const s = state.current;
    if (!s.active) {
      s.nextFire -= dt;
      if (s.nextFire <= 0) fire();
      if (headRef.current) headRef.current.visible = false;
      if (trailRef.current) trailRef.current.visible = false;
      return;
    }
    s.progress += dt * s.speed;
    if (s.progress >= 1) {
      s.active = false; s.nextFire = cooldown + Math.random() * 5;
      if (headRef.current) headRef.current.visible = false;
      if (trailRef.current) trailRef.current.visible = false;
      return;
    }
    const t = s.progress;
    const x = s.sx + (s.ex - s.sx) * t;
    const y = s.sy + (s.ey - s.sy) * t;
    const a = t < 0.1 ? t / 0.1 : t > 0.7 ? (1 - t) / 0.3 : 1;

    if (headRef.current) {
      headRef.current.visible = true;
      headRef.current.position.set(x, y, s.sz);
      (headRef.current.material as THREE.MeshBasicMaterial).opacity = a;
    }
    if (trailRef.current) {
      trailRef.current.visible = true;
      const tt = Math.max(0, t - 0.05);
      trailRef.current.position.set((x + s.sx + (s.ex - s.sx) * tt) / 2, (y + s.sy + (s.ey - s.sy) * tt) / 2, s.sz);
      trailRef.current.lookAt(x + (s.ex - s.sx), y + (s.ey - s.sy), s.sz);
      trailRef.current.scale.set(0.015, 0.015, 1 + a * 2);
      (trailRef.current.material as THREE.MeshBasicMaterial).opacity = a * 0.4;
    }
  });

  return (
    <group>
      <mesh ref={headRef} visible={false}>
        <sphereGeometry args={[0.05, 6, 6]} />
        <meshBasicMaterial color={color} transparent opacity={0} toneMapped={false} />
      </mesh>
      <mesh ref={trailRef} visible={false}>
        <cylinderGeometry args={[1, 0, 1, 4]} />
        <meshBasicMaterial color={color} transparent opacity={0} toneMapped={false} />
      </mesh>
    </group>
  );
}

/* ── Subtle mouse parallax ── */
function CameraController() {
  const mouse = useRef({ x: 0, y: 0 });
  const viewportPreset = useRef<number | null>(null);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  useFrame(({ camera, size }) => {
    const cam = camera as THREE.PerspectiveCamera;
    const nextPreset = size.width < 480 ? 0 : size.width < 768 ? 1 : 2;

    if (viewportPreset.current !== nextPreset) {
      viewportPreset.current = nextPreset;
      if (nextPreset === 0) {
        cam.fov = 50;
        cam.position.z = 11.2;
      } else if (nextPreset === 1) {
        cam.fov = 44;
        cam.position.z = 10.3;
      } else {
        cam.fov = 36;
        cam.position.z = 9;
      }
      cam.updateProjectionMatrix();
    }

    cam.position.x += (mouse.current.x * 0.08 - cam.position.x) * 0.015;
    cam.position.y += (-mouse.current.y * 0.05 + 0.85 - cam.position.y) * 0.015;
    cam.lookAt(0, 0.4, 0);
  });

  return null;
}

/* ── Main scene ── */
export default function HeroScene({ scrollProgress = 0 }: { scrollProgress?: number }) {
  const [dpr] = useState(() => (window.innerWidth < 768 ? 1 : 1.5));

  return (
    <div className="canvas-container" aria-hidden="true">
      <Canvas
        dpr={dpr}
        camera={{ position: [0, 1, 9], fov: 36 }}
        gl={{ antialias: true, powerPreference: 'high-performance' }}
      >
        <color attach="background" args={[BG]} />

        {/* Only 3 lights total — clean, dramatic */}
        {/* Key light: warm spotlight from top-front */}
        {/* Clean studio lighting */}
        <ambientLight intensity={0.22} />
        <directionalLight position={[3, 8, 5]} intensity={0.32} color="#f8f9ff" />
        <directionalLight position={[-5, 3, 4]} intensity={0.24} color="#d0d6ff" />

        <Suspense fallback={null}>
          <LogoModel scrollProgress={scrollProgress} />
          <DustParticles />
          <SpaceStars />
          <RisingBubbles />
          <ShootingStars />

          {/* Dark dramatic HDR — gives the logo beautiful reflections */}
          <Environment preset="studio" environmentIntensity={0.3} />

          {/* Ground shadow for depth */}
          <ContactShadows position={[0, -2.8, 0]} opacity={0.25} scale={14} blur={3} far={5} color="#0d0869" />

          {/* Very subtle warm glow on floor */}
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.79, 0]}>
            <circleGeometry args={[10, 64]} />
            <meshBasicMaterial transparent opacity={0.018} color="#ffb090" depthWrite={false} />
          </mesh>
        </Suspense>

        <CameraController />

        {/* Post-processing: bloom for glow + vignette for focus */}
        <EffectComposer>
          <Bloom intensity={0.12} luminanceThreshold={0.82} luminanceSmoothing={0.9} mipmapBlur />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
