'use client';

import {
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';
import { useState } from 'react';

const sectionLabels = [
  'Hero',
  'Servicios',
  'Trabajo',
  'Nosotros',
  'Proceso',
  'Testimonios',
  'Contacto',
];

const TRACK_HEIGHT = 320;

export default function ScrollArrow() {
  const { scrollYProgress } = useScroll();
  const [activeIndex, setActiveIndex] = useState(0);

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    mass: 0.2,
  });

  const opacity = useTransform(
    smoothProgress,
    [0, 0.03, 0.94, 1],
    [0, 1, 1, 0]
  );
  const markerY = useTransform(smoothProgress, [0, 1], [0, TRACK_HEIGHT]);
  const railProgress = useTransform(smoothProgress, [0, 1], [0.04, 1]);

  useMotionValueEvent(scrollYProgress, 'change', (value) => {
    const nextIndex = Math.min(
      sectionLabels.length - 1,
      Math.round(value * (sectionLabels.length - 1))
    );
    setActiveIndex((prev) => (prev === nextIndex ? prev : nextIndex));
  });

  return (
    <motion.aside
      aria-hidden="true"
      className="pointer-events-none fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 lg:block"
      style={{ opacity }}
    >
      <div className="relative h-[360px] w-[96px] rounded-[26px] border border-primary/10 bg-white/65 shadow-[0_14px_35px_rgba(13,8,105,0.12)] backdrop-blur-md">
        <p className="pt-4 text-center text-[10px] font-semibold uppercase tracking-[0.28em] text-primary/45">
          Scroll
        </p>

        <div className="absolute left-1/2 top-10 h-[320px] w-px -translate-x-1/2 bg-gradient-to-b from-primary/10 via-primary/15 to-primary/5" />

        <motion.div
          className="absolute left-1/2 top-10 h-[320px] w-px origin-top -translate-x-1/2 bg-gradient-to-b from-accent/95 via-accent/60 to-accent/25"
          style={{ scaleY: railProgress }}
        />

        <div className="absolute left-1/2 top-10 flex h-[320px] w-8 -translate-x-1/2 flex-col justify-between">
          {sectionLabels.map((label, index) => {
            const isReached = index <= activeIndex;
            const isCurrent = index === activeIndex;

            return (
              <div key={label} className="relative flex items-center justify-center">
                <span
                  className={`h-2.5 w-2.5 rounded-full border transition-all duration-300 ${
                    isReached
                      ? 'border-accent/60 bg-accent shadow-[0_0_18px_rgba(255,67,66,0.5)]'
                      : 'border-primary/20 bg-white/80'
                  }`}
                />
                <span
                  className={`absolute left-5 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-full border border-primary/10 bg-white/85 px-2 py-1 text-[10px] font-medium text-primary/65 shadow-sm transition-all duration-250 ${
                    isCurrent ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-1'
                  }`}
                >
                  {label}
                </span>
              </div>
            );
          })}
        </div>

        <motion.div
          className="absolute left-1/2 top-10 h-3.5 w-3.5 -translate-x-1/2 rounded-full border border-white/70 bg-accent shadow-[0_0_20px_rgba(255,67,66,0.65)]"
          style={{ y: markerY }}
        />
      </div>
    </motion.aside>
  );
}
