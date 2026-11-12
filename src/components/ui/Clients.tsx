'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { brands } from '@/lib/constants';

export default function Clients() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} id="marcas" aria-labelledby="marcas-title" className="relative py-20 md:py-28">
      <div className="relative mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-14 text-center"
        >
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-accent-ink">
            Marcas que confían en nosotros
          </p>
          <h2 id="marcas-title" className="mb-4 text-4xl font-bold text-primary md:text-5xl">
            Más de <span className="gradient-text-accent">80 marcas</span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray">
            Trabajamos con las marcas más importantes de Honduras y la región en BTL, eventos corporativos y marketing digital.
          </p>
        </motion.div>

        <ul role="list" className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8">
          {brands.map((brand, i) => (
            <motion.li
              key={brand.name}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.35, delay: Math.min(i * 0.02, 0.8) }}
              className="card flex aspect-[4/3] items-center justify-center p-3"
            >
              <Image
                src={brand.logo}
                alt={`Logo de ${brand.name}`}
                width={120}
                height={60}
                sizes="120px"
                className="h-auto max-h-10 w-auto max-w-full object-contain sm:max-h-12"
              />
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
