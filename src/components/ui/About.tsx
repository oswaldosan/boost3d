'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { about } from '@/lib/constants';

export default function About() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} id="nosotros" className="relative py-32">
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-accent">
              {about.subtitle}
            </p>
            <h2 className="mb-6 text-4xl font-bold text-primary md:text-5xl">
              {about.title.split(' ').slice(0, -1).join(' ')}{' '}
              <span className="gradient-text-accent">
                {about.title.split(' ').slice(-1)}
              </span>
            </h2>
            <p className="mb-10 text-lg leading-relaxed text-gray">{about.body}</p>

            <div className="space-y-6">
              <div className="card p-6">
                <h3 className="mb-2 text-lg font-bold text-primary">01 · Misión</h3>
                <p className="text-sm leading-relaxed text-gray">{about.mission}</p>
              </div>
              <div className="card p-6">
                <h3 className="mb-2 text-lg font-bold text-primary">02 · Visión</h3>
                <p className="text-sm leading-relaxed text-gray">{about.vision}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative overflow-hidden rounded-2xl border border-primary/10 bg-primary/5 shadow-[0_20px_50px_rgba(13,8,105,0.12)]"
          >
            <video
              className="aspect-square w-full object-cover"
              src={about.video}
              autoPlay
              muted
              loop
              playsInline
              poster="/brand/buho2.png"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
