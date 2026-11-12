'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { stats } from '@/lib/constants';

export default function Stats() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} id="cifras" aria-label="Boost en cifras" className="relative py-16 md:py-20">
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: i * 0.1 }}
              className="card p-5 text-center sm:p-8"
            >
              <p className="mb-2 font-display text-3xl font-bold text-accent-strong sm:text-4xl md:text-5xl">
                {stat.value}
              </p>
              <p className="text-sm leading-snug text-gray">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
