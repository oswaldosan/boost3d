'use client';

import { Suspense, useRef, useEffect, useState, useMemo, useCallback } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF, Environment, Center, ContactShadows } from '@react-three/drei';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import * as THREE from 'three';

useGLTF.preload('/3d/Logo3.glb');

/* ── Dark stage background color ── */
const BG = '#eaeaf0';

/* ── Materials — tuned for dark env ── */
const MAT_BLUE: Record<string, unknown> = {
  color: new THREE.Color('#0d0869'),
  metalness: 0.92,
  roughness: 0.1,
  envMapIntensity: 1.2,
  clearcoat: 0.8,
  clearcoatRoughness: 0.05,
  reflectivity: 0.9,
  iridescence: 0.2,
  iridescenceIOR: 1.4,
};

const MAT_ORANGE: Record<string, unknown> = {
  color: new THREE.Color('#ff4342'),
  metalness: 0.8,
  roughness: 0.1,
  envMapIntensity: 1.8,
  clearcoat: 0.8,
  clearcoatRoughness: 0.03,
  reflectivity: 1,
  iridescence: 0.1,
  iridescenceIOR: 1.4,
};

const MAT_BLACK: Record<string, unknown> = {
  color: new THREE.Color('#080808'),
  metalness: 0.95,
  roughness: 0.05,
  envMapIntensity: 1.5,
  clearcoat: 1,
  clearcoatRoughness: 0.02,
  reflectivity: 1,
};

/* ── Logo ── */
function LogoModel({ scrollProgress }: { scrollProgress: number }) {
  const { scene } = useGLTF('/3d/Logo3.glb');
  const groupRef = useRef<THREE.Group>(null);
  const mouse = useRef({ x: 0, y: 0 });
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
    const onMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  useEffect(() => {
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        let mat = MAT_BLUE;
        if (child.name === 'Shape12') mat = MAT_ORANGE;
        if (child.name === 'Shape62') mat = MAT_BLACK;
        child.material = new THREE.MeshPhysicalMaterial(mat);
        child.castShadow = true;
        child.receiveShadow = true;
        if (child.name === 'Shape12') arrowRef.current = child;
        if (child.name === 'Shape62') beakRef.current = child;
        if (child.name === 'Shape11') textRef.current = child;
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
    const baseY = (Math.sin(clock.elapsedTime * 0.15) + 1) * 0.5 * (Math.PI * 0.1);
    groupRef.current.rotation.y = (baseY + smoothMouse.current.x * 0.15) * ip;
    groupRef.current.rotation.x = smoothMouse.current.y * 0.1 * ip;

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

    groupRef.current.scale.setScalar((0.6 + ip * 0.4) * (1 - sp * 0.1));
    groupRef.current.position.y = (1.5 - (1 - ip) * 2) - sp * 0.5;
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

/* ── Clean dust particles — small spheres, instanced ── */
const PARTICLE_COUNT = 60;

function DustParticles() {
  const meshRef = useRef<THREE.InstancedMesh>(null);

  const particles = useMemo(() => {
    const data = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const angle = Math.random() * Math.PI * 2;
      const r = 4 + Math.random() * 10;
      data.push({
        x: Math.cos(angle) * r,
        y: (Math.random() - 0.5) * 8,
        z: Math.sin(angle) * r - 4,
        speed: 0.03 + Math.random() * 0.06,
        offset: Math.random() * Math.PI * 2,
        drift: 0.1 + Math.random() * 0.25,
        size: 0.015 + Math.random() * 0.025,
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
    <instancedMesh ref={meshRef} args={[undefined, undefined, PARTICLE_COUNT]}>
      <sphereGeometry args={[1, 6, 6]} />
      <meshBasicMaterial color="#9098c0" transparent opacity={0.15} depthWrite={false} />
    </instancedMesh>
  );
}

/* ── Shooting stars — 3 max, alternating colors ── */
function ShootingStars() {
  return (
    <group>
      <ShootingStar delay={2} cooldown={9} color="#ff4342" />
      <ShootingStar delay={6} cooldown={11} color="#3b6cff" />
      <ShootingStar delay={12} cooldown={10} color="#ff4342" />
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
function CameraRig() {
  const { camera } = useThree();
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  useFrame(() => {
    camera.position.x += (mouse.current.x * 0.1 - camera.position.x) * 0.01;
    camera.position.y += (-mouse.current.y * 0.06 + 1 - camera.position.y) * 0.01;
    camera.lookAt(0, 0.6, 0);
  });

  return null;
}

/* ── Responsive camera ── */
function ResponsiveCamera() {
  const { camera, size } = useThree();
  useEffect(() => {
    const cam = camera as THREE.PerspectiveCamera;
    if (size.width < 480) { cam.fov = 58; cam.position.z = 12; }
    else if (size.width < 768) { cam.fov = 48; cam.position.z = 11; }
    else { cam.fov = 36; cam.position.z = 9; }
    cam.updateProjectionMatrix();
  }, [camera, size.width]);
  return null;
}

/* ── Main scene ── */
export default function HeroScene({ scrollProgress = 0 }: { scrollProgress?: number }) {
  const [dpr, setDpr] = useState(1.5);
  useEffect(() => { if (window.innerWidth < 768) setDpr(1); }, []);

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
        <ambientLight intensity={0.25} />
        <directionalLight position={[3, 8, 5]} intensity={0.4} color="#f8f9ff" />
        <directionalLight position={[-5, 3, 4]} intensity={0.35} color="#d0d6ff" />

        <Suspense fallback={null}>
          <LogoModel scrollProgress={scrollProgress} />
          <DustParticles />
          <ShootingStars />

          {/* Dark dramatic HDR — gives the logo beautiful reflections */}
          <Environment preset="studio" environmentIntensity={0.35} />

          {/* Ground shadow for depth */}
          <ContactShadows position={[0, -2.8, 0]} opacity={0.3} scale={14} blur={3} far={5} color="#0d0869" />
        </Suspense>

        <ResponsiveCamera />
        <CameraRig />

        {/* Post-processing: bloom for glow + vignette for focus */}
        <EffectComposer>
          <Bloom intensity={0.15} luminanceThreshold={0.8} luminanceSmoothing={0.9} mipmapBlur />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
