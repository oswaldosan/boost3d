'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { stats } from '@/lib/constants';

export default function Stats() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} id="stats" className="relative py-20">
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: i * 0.1 }}
              className="card p-8 text-center"
            >
              <p className="mb-2 text-4xl font-bold text-accent md:text-5xl">
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
