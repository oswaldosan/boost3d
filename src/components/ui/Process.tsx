'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { processSteps } from '@/lib/constants';

export default function Process() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} id="proceso" className="relative py-32">
      <div className="relative mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-20 text-center"
        >
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-accent">
            Nuestro Proceso
          </p>
          <h2 className="mb-6 text-4xl font-bold text-primary md:text-5xl lg:text-6xl">
            De la idea al{' '}
            <span className="gradient-text-accent">impacto</span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray">
            Un proceso probado que garantiza resultados excepcionales en cada proyecto.
          </p>
        </motion.div>

        <div className="relative">
          <div className="absolute left-8 top-0 hidden h-full w-px bg-gradient-to-b from-primary/10 via-accent/10 to-transparent md:left-1/2 md:block" />

          <div className="space-y-12 md:space-y-24">
            {processSteps.map((step, i) => {
              const isEven = i % 2 === 0;
              return (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, x: isEven ? -40 : 40 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: i * 0.15 }}
                  className={`relative flex flex-col items-center gap-8 md:flex-row ${
                    isEven ? '' : 'md:flex-row-reverse'
                  }`}
                >
                  <div className={`flex-1 ${isEven ? 'md:text-right' : 'md:text-left'}`}>
                    <div className="card inline-block p-8 transition-all duration-500">
                      <span className="mb-2 block text-sm font-bold text-accent">
                        Paso {step.step}
                      </span>
                      <h3 className="mb-3 text-2xl font-bold text-primary">
                        {step.title}
                      </h3>
                      <p className="text-gray">{step.description}</p>
                    </div>
                  </div>

                  <div className="relative z-10 flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full border border-primary/10 bg-bg-light">
                    <span className="text-lg font-bold text-primary">
                      {step.step}
                    </span>
                  </div>

                  <div className="hidden flex-1 md:block" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
