'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { caseStudies } from '@/lib/constants';

export default function CaseStudies() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} id="trabajo" className="relative py-32">
      <div className="relative mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-20 text-center"
        >
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-accent">
            Nuestro Trabajo
          </p>
          <h2 className="mb-6 text-4xl font-bold text-primary md:text-5xl lg:text-6xl">
            Campañas que{' '}
            <span className="gradient-text-accent">dejan huella</span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray">
            Cada proyecto es una oportunidad para superar expectativas y crear
            algo verdaderamente extraordinario.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2">
          {caseStudies.map((study, i) => (
            <motion.article
              key={study.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="card group relative overflow-hidden transition-all duration-500"
            >
              <div className="relative h-52 overflow-hidden rounded-t-2xl bg-gradient-to-br from-primary/5 to-highlight/5">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent/10">
                    <span className="text-2xl font-bold text-accent">{String(i + 1).padStart(2, '0')}</span>
                  </div>
                </div>
                <div className="absolute left-4 top-4">
                  <span className="rounded-full bg-primary/10 px-4 py-1.5 text-xs font-medium text-primary">
                    {study.category}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <p className="mb-1 text-sm text-gray">{study.client}</p>
                <h3 className="mb-3 text-xl font-bold text-primary">
                  {study.title}
                </h3>
                <div className="flex items-center gap-2">
                  <div className="h-0.5 w-6 rounded-full bg-accent" />
                  <span className="text-sm font-semibold text-accent">
                    {study.stats}
                  </span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
