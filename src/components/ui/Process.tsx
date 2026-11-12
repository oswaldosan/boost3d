'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { processSteps } from '@/lib/constants';

export default function Process() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} id="proceso" aria-labelledby="proceso-title" className="relative py-20 md:py-28 lg:py-32">
      <div className="relative mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-12 text-center md:mb-20"
        >
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-accent-ink">
            Nuestro Proceso
          </p>
          <h2 id="proceso-title" className="mb-6 text-4xl font-bold text-primary md:text-5xl lg:text-6xl">
            De la idea al{' '}
            <span className="gradient-text-accent">impacto</span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray">
            Un proceso probado que garantiza resultados excepcionales en cada proyecto.
          </p>
        </motion.div>

        <div className="relative">
          <div aria-hidden="true" className="absolute left-8 top-0 hidden h-full w-px bg-gradient-to-b from-primary/10 via-accent/10 to-transparent md:left-1/2 md:block" />

          <ol className="space-y-8 md:space-y-24">
            {processSteps.map((step, i) => {
              const isEven = i % 2 === 0;
              return (
                <motion.li
                  key={step.step}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: i * 0.15 }}
                  className={`relative flex flex-col-reverse items-center gap-4 md:gap-8 md:flex-row ${
                    isEven ? '' : 'md:flex-row-reverse'
                  }`}
                >
                  <div className={`w-full flex-1 ${isEven ? 'md:text-right' : 'md:text-left'}`}>
                    <div className="card w-full p-6 sm:p-8 md:inline-block md:w-auto md:max-w-md">
                      <span className="mb-2 block text-sm font-bold text-accent-ink">
                        Paso {step.step}
                      </span>
                      <h3 className="mb-3 text-2xl font-bold text-primary">
                        {step.title}
                      </h3>
                      <p className="text-gray">{step.description}</p>
                    </div>
                  </div>

                  <div aria-hidden="true" className="relative z-10 flex h-14 w-14 md:h-16 md:w-16 flex-shrink-0 items-center justify-center rounded-full border border-primary/10 bg-bg-light">
                    <span className="text-lg font-bold text-primary">
                      {step.step}
                    </span>
                  </div>

                  <div aria-hidden="true" className="hidden flex-1 md:block" />
                </motion.li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
