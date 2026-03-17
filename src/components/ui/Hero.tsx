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

  const contentY = useTransform(scrollYProgress, [0, 1], [0, 115]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.45], [1, 0]);

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative flex min-h-[100svh] flex-col items-center justify-end overflow-hidden pb-8 pt-24 sm:min-h-[100svh] sm:pb-16 sm:pt-28"
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
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(1200px_500px_at_50%_95%,rgba(255,67,66,0.06),transparent_70%)]" />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -left-[22%] top-[-35%] h-[170%] w-[42%] rotate-[15deg] bg-gradient-to-b from-white/38 via-white/0 to-transparent blur-3xl"
        animate={{ x: ['-8%', '10%', '-8%'], opacity: [0.22, 0.38, 0.22] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* 3D Scene */}
      <div className="absolute inset-0">
        <HeroScene scrollProgress={scrollProgress} />
      </div>

      {/* Headline + Buttons */}
      <motion.div
        className="relative z-10 mx-auto w-full max-w-3xl px-4 text-center sm:px-6"
        style={{ y: contentY, opacity: contentOpacity }}
      >
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mb-3 text-[11px] font-semibold uppercase tracking-[0.3em] text-primary/50"
        >
          Agencia Creativa
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.95, ease: [0.22, 1, 0.36, 1] }}
          className="mb-5 text-[2rem] font-bold leading-[1.08] tracking-tight text-primary sm:text-4xl md:text-5xl"
        >
          Creamos experiencias que{' '}
          <span className="gradient-text-accent">trascienden</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.1 }}
          className="mx-auto mb-8 max-w-xl text-[0.95rem] leading-relaxed text-primary/65 sm:text-base"
        >
          Estrategia digital, producción BTL y activaciones de clase mundial para marcas que buscan impacto real.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.25 }}
          className="flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <a
            href="#contacto"
            className="group relative overflow-hidden rounded-full bg-accent px-10 py-4 text-base font-semibold text-white shadow-[0_14px_34px_rgba(255,67,66,0.35)] transition-all duration-300 hover:shadow-[0_18px_40px_rgba(255,67,66,0.45)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50"
          >
            <span className="relative z-10">Iniciar Proyecto</span>
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-600 group-hover:translate-x-full" />
          </a>
          <a
            href="#trabajo"
            className="rounded-full border border-primary/15 bg-white/50 px-10 py-4 text-base font-semibold text-primary transition-all duration-300 hover:border-primary/25 hover:bg-white/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20"
          >
            Ver Portafolio
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        className="absolute bottom-4 left-1/2 z-10 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          className="flex h-9 w-5 items-start justify-center rounded-full border border-primary/12 bg-white/30 p-1"
        >
          <div className="h-1.5 w-1 rounded-full bg-primary/25" />
        </motion.div>
      </motion.div>
    </section>
  );
}
