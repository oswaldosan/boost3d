'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export default function CTA() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} id="contacto" className="relative py-32">
      <div className="relative mx-auto max-w-4xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-accent">
            Empecemos
          </p>
          <h2 className="mb-6 text-4xl font-bold text-primary md:text-5xl lg:text-6xl">
            ¿Listo para{' '}
            <span className="gradient-text-accent">transformar tu marca?</span>
          </h2>
          <p className="mx-auto mb-12 max-w-xl text-lg text-gray">
            Hablemos sobre cómo podemos llevar tu marca al siguiente nivel.
            El primer paso comienza con una conversación.
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="mailto:hola@boostdigitalhn.com"
              className="group relative overflow-hidden rounded-full bg-accent px-12 py-5 text-lg font-semibold text-white transition-all duration-300 hover:shadow-[0_0_50px_rgba(255,67,66,0.3)] hover:scale-105"
            >
              <span className="relative z-10">Agendar Consulta</span>
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            </a>
            <a
              href="https://wa.me/50400000000"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-primary/20 px-12 py-5 text-lg font-semibold text-primary transition-all duration-300 hover:border-primary/40 hover:bg-primary/5"
            >
              WhatsApp
            </a>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-8 text-sm text-gray/60"
          >
            Respuesta en menos de 24 horas. Sin compromiso.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
