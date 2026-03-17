'use client';

import dynamic from 'next/dynamic';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import { useRef, useState } from 'react';

const HeroScene = dynamic(() => import('@/components/3d/HeroScene'), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 flex items-center justify-center" style={{ background: '#eaeaf0' }}>
      <div className="h-16 w-16 animate-pulse rounded-full bg-primary/20" />
    </div>
  ),
});

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  useMotionValueEvent(scrollYProgress, 'change', (v) => setScrollProgress(v));

  const contentY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative flex min-h-screen flex-col items-center justify-end overflow-hidden pb-28"
      style={{ background: '#eaeaf0' }}
    >
      {/* Subtle radial gradient behind the logo — spotlight effect */}
      <div
        className="pointer-events-none absolute left-1/2 top-[40%] -translate-x-1/2 -translate-y-1/2"
        style={{
          width: '800px',
          height: '800px',
          background: 'radial-gradient(circle, rgba(59,108,255,0.06) 0%, rgba(255,67,66,0.03) 40%, transparent 70%)',
          borderRadius: '50%',
        }}
      />

      {/* 3D Scene */}
      <div className="absolute inset-0">
        <HeroScene scrollProgress={scrollProgress} />
      </div>

      {/* Headline + Buttons */}
      <motion.div
        className="relative z-10 mx-auto w-full max-w-3xl px-6 text-center"
        style={{ y: contentY, opacity: contentOpacity }}
      >
        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 2, ease: [0.22, 1, 0.36, 1] }}
          className="mb-3 text-2xl font-bold tracking-tight text-primary/80 sm:text-3xl md:text-4xl"
        >
          Creamos experiencias que{' '}
          <span className="gradient-text-accent">trascienden</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.3 }}
          className="mx-auto mb-8 max-w-lg text-sm text-gray sm:text-base"
        >
          Estrategia digital, producción BTL y activaciones de clase mundial desde Honduras.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.5 }}
          className="flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <a
            href="#contacto"
            className="group relative overflow-hidden rounded-full bg-accent px-10 py-4 text-base font-semibold text-white transition-all duration-300 hover:shadow-[0_0_40px_rgba(255,67,66,0.3)] hover:scale-105"
          >
            <span className="relative z-10">Iniciar Proyecto</span>
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
          </a>
          <a
            href="#trabajo"
            className="rounded-full border border-primary/15 px-10 py-4 text-base font-semibold text-primary transition-all duration-300 hover:border-primary/30 hover:bg-primary/5"
          >
            Ver Nuestro Trabajo
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3 }}
        className="absolute bottom-4 left-1/2 z-10 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="flex h-10 w-6 items-start justify-center rounded-full border border-primary/10 p-1.5"
        >
          <div className="h-2 w-1 rounded-full bg-primary/20" />
        </motion.div>
      </motion.div>
    </section>
  );
}
