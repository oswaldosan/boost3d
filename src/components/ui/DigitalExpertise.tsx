'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { digitalExpertise } from '@/lib/constants';

export default function DigitalExpertise() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} id="digital" aria-labelledby="digital-title" className="relative py-20 md:py-28 lg:py-32">
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid items-start gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-accent-ink">
              {digitalExpertise.subtitle}
            </p>
            <h2 id="digital-title" className="mb-6 text-4xl font-bold text-primary md:text-5xl">
              Boost{' '}
              <span className="gradient-text-accent">Marketing Digital</span>
            </h2>
            <p className="text-lg leading-relaxed text-gray">{digitalExpertise.body}</p>
          </motion.div>

          <motion.ul
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="grid gap-3 sm:grid-cols-2"
          >
            {digitalExpertise.bullets.map((item, i) => (
              <motion.li
                key={item}
                initial={{ opacity: 0, y: 12 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.45, delay: 0.2 + i * 0.08 }}
                className="card flex items-start gap-3 p-5"
              >
                <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-accent/15">
                  <svg aria-hidden="true" className="h-3.5 w-3.5 text-accent-strong" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </span>
                <span className="text-sm font-medium text-primary">{item}</span>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </div>
    </section>
  );
}
