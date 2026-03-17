'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { testimonials } from '@/lib/constants';

export default function Testimonials() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} id="testimonios" className="relative py-32">
      <div className="relative mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-20 text-center"
        >
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-accent">
            Testimonios
          </p>
          <h2 className="mb-6 text-4xl font-bold text-primary md:text-5xl lg:text-6xl">
            Lo que dicen{' '}
            <span className="gradient-text-accent">nuestros clientes</span>
          </h2>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((testimonial, i) => (
            <motion.blockquote
              key={testimonial.author}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="card group relative p-8 transition-all duration-500"
            >
              <svg
                className="mb-6 h-8 w-8 text-accent/30"
                fill="currentColor"
                viewBox="0 0 32 32"
              >
                <path d="M10 8c-3.3 0-6 2.7-6 6v10h10V14H8c0-1.1.9-2 2-2V8zm14 0c-3.3 0-6 2.7-6 6v10h10V14h-6c0-1.1.9-2 2-2V8z" />
              </svg>

              <p className="mb-8 text-base leading-relaxed text-primary/70">
                {testimonial.quote}
              </p>

              <footer className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-accent to-glow-red">
                  <span className="text-lg font-bold text-white">
                    {testimonial.author[0]}
                  </span>
                </div>
                <div>
                  <cite className="block text-sm font-semibold not-italic text-primary">
                    {testimonial.author}
                  </cite>
                  <span className="text-xs text-gray">
                    {testimonial.role}, {testimonial.company}
                  </span>
                </div>
              </footer>
            </motion.blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
