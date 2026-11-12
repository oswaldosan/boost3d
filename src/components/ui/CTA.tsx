'use client';

import { site } from '@/lib/constants';
import { useRef, useState, FormEvent } from 'react';
import { motion, useInView } from 'framer-motion';

const interests = ['BTL', 'Audiovisuales', 'Marketing Digital', 'Desarrollo web'] as const;

export default function CTA() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get('name') || '');
    const email = String(data.get('email') || '');
    const interest = String(data.get('interest') || '');
    const message = String(data.get('message') || '');
    const subject = encodeURIComponent(`Contacto web — ${interest || 'Consulta'}`);
    const body = encodeURIComponent(
      `Nombre: ${name}\nEmail: ${email}\nInterés: ${interest}\n\n${message}`,
    );
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  return (
    <section ref={ref} id="contacto" className="relative py-32">
      <div className="relative mx-auto max-w-3xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-accent">
            Contáctanos
          </p>
          <h2 className="mb-6 text-4xl font-bold text-primary md:text-5xl lg:text-6xl">
            ¿Listo para{' '}
            <span className="gradient-text-accent">trabajar con nosotros?</span>
          </h2>
          <p className="mx-auto mb-4 max-w-xl text-lg text-gray">
            Cuéntanos sobre tu proyecto. Creamos, producimos e implementamos
            soluciones BTL, eventos, audiovisuales y marketing digital.
          </p>
          <p className="mx-auto mb-12 text-sm text-gray">
            O escríbenos a{' '}
            <a
              href={`mailto:${site.email}`}
              className="font-medium text-accent transition-colors hover:text-glowRed"
            >
              {site.email}
            </a>
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15 }}
          onSubmit={onSubmit}
          className="card space-y-5 p-8 text-left"
        >
          {submitted ? (
            <p className="py-8 text-center text-primary">
              ¡Gracias! Si no se abrió tu correo, escríbenos a{' '}
              <a href={`mailto:${site.email}`} className="text-accent underline">
                {site.email}
              </a>
              .
            </p>
          ) : (
            <>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block text-sm text-primary/80">
                  Nombre
                  <input
                    required
                    name="name"
                    className="mt-1.5 w-full rounded-xl border border-primary/10 bg-white/70 px-4 py-3 text-primary outline-none focus:border-accent/40"
                    placeholder="Tu nombre"
                  />
                </label>
                <label className="block text-sm text-primary/80">
                  Correo Electrónico
                  <input
                    required
                    type="email"
                    name="email"
                    className="mt-1.5 w-full rounded-xl border border-primary/10 bg-white/70 px-4 py-3 text-primary outline-none focus:border-accent/40"
                    placeholder="tu@email.com"
                  />
                </label>
              </div>

              <fieldset>
                <legend className="mb-2 text-sm text-primary/80">Interés</legend>
                <div className="flex flex-wrap gap-3">
                  {interests.map((item) => (
                    <label
                      key={item}
                      className="flex cursor-pointer items-center gap-2 rounded-full border border-primary/10 bg-white/50 px-4 py-2 text-sm text-primary/80 has-[:checked]:border-accent/40 has-[:checked]:bg-accent/10"
                    >
                      <input type="checkbox" name="interest" value={item} className="accent-[var(--color-accent)]" />
                      {item}
                    </label>
                  ))}
                </div>
              </fieldset>

              <label className="block text-sm text-primary/80">
                Mensaje
                <textarea
                  required
                  name="message"
                  rows={4}
                  className="mt-1.5 w-full rounded-xl border border-primary/10 bg-white/70 px-4 py-3 text-primary outline-none focus:border-accent/40"
                  placeholder="Cuéntanos sobre tu proyecto"
                />
              </label>

              <button
                type="submit"
                className="w-full rounded-full bg-accent px-10 py-4 text-base font-semibold text-white transition-all duration-300 hover:shadow-[0_0_40px_rgba(255,67,66,0.35)] sm:w-auto"
              >
                Enviar
              </button>
            </>
          )}
        </motion.form>
      </div>
    </section>
  );
}
