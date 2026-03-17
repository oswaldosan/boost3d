'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { trustIndicators } from '@/lib/constants';

export default function WhyChooseUs() {
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
              Por qué elegirnos
            </p>
            <h2 className="mb-6 text-4xl font-bold text-primary md:text-5xl">
              La agencia que{' '}
              <span className="gradient-text-accent">marcas confían</span>
            </h2>
            <p className="mb-8 text-lg leading-relaxed text-gray">
              Con más de una década de experiencia en Honduras y la región,
              combinamos visión estratégica con ejecución impecable. No somos
              solo proveedores — somos socios en el crecimiento de tu marca.
            </p>

            <div className="space-y-4">
              {[
                'Equipo multidisciplinario de clase mundial',
                'Presencia regional con conocimiento local',
                'Track record de eventos a gran escala',
                'Resultados medibles y transparentes',
              ].map((item, i) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-accent/15">
                    <svg className="h-3.5 w-3.5 text-accent" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-primary/80">{item}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-2 gap-6"
          >
            {trustIndicators.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                className="card group p-8 text-center transition-all duration-500"
              >
                <p className="mb-2 text-4xl font-bold text-accent md:text-5xl">
                  {stat.value}
                </p>
                <p className="text-sm text-gray">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
