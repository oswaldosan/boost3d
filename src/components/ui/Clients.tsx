'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { brands } from '@/lib/constants';

export default function Clients() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} id="marcas" className="relative py-28">
      <div className="relative mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-14 text-center"
        >
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-accent">
            Marcas que confían en nosotros
          </p>
          <h2 className="mb-4 text-4xl font-bold text-primary md:text-5xl">
            Más de <span className="gradient-text-accent">80 marcas</span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray">
            Trabajamos con las marcas más importantes de Honduras y la región.
          </p>
        </motion.div>

        <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8">
          {brands.map((brand, i) => (
            <motion.div
              key={brand.name}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.35, delay: Math.min(i * 0.02, 0.8) }}
              className="card flex aspect-[4/3] items-center justify-center p-3 transition-all duration-300 hover:shadow-[0_12px_30px_rgba(13,8,105,0.12)]"
              title={brand.name}
            >
              <Image
                src={brand.logo}
                alt={brand.name}
                width={120}
                height={60}
                className="max-h-10 w-auto object-contain opacity-80 transition-opacity duration-300 hover:opacity-100 sm:max-h-12"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
