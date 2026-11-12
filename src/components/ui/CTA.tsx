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
    const interest = data.getAll('interest').map(String).join(', ');
    const message = String(data.get('message') || '');
    const subject = encodeURIComponent(`Contacto web — ${interest || 'Consulta'}`);
    const body = encodeURIComponent(
      `Nombre: ${name}\nEmail: ${email}\nInterés: ${interest}\n\n${message}`,
    );
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  return (
    <section ref={ref} id="contacto" aria-labelledby="contacto-title" className="relative py-20 md:py-28 lg:py-32">
      <div className="relative mx-auto max-w-3xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-accent-ink">
            Contáctanos
          </p>
          <h2 id="contacto-title" className="mb-6 text-4xl font-bold text-primary md:text-5xl lg:text-6xl">
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
              className="font-semibold text-accent-ink underline decoration-accent-ink/30 underline-offset-4 transition-colors hover:decoration-accent-ink"
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
          aria-label="Formulario de contacto"
          className="card space-y-5 p-5 text-left sm:p-8"
        >
          {submitted ? (
            <p role="status" className="py-8 text-center text-primary">
              ¡Gracias! Si no se abrió tu correo, escríbenos a{' '}
              <a href={`mailto:${site.email}`} className="font-semibold text-accent-ink underline underline-offset-4">
                {site.email}
              </a>
              .
            </p>
          ) : (
            <>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block text-sm font-medium text-primary">
                  Nombre
                  <input
                    required
                    name="name"
                    autoComplete="name"
                    className="mt-1.5 w-full rounded-xl border border-primary/45 bg-white px-4 py-3 text-base text-primary placeholder:text-gray transition-colors hover:border-primary/60 focus:border-primary focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-highlight"
                    placeholder="Tu nombre"
                  />
                </label>
                <label className="block text-sm font-medium text-primary">
                  Correo Electrónico
                  <input
                    required
                    type="email"
                    name="email"
                    autoComplete="email"
                    className="mt-1.5 w-full rounded-xl border border-primary/45 bg-white px-4 py-3 text-base text-primary placeholder:text-gray transition-colors hover:border-primary/60 focus:border-primary focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-highlight"
                    placeholder="tu@email.com"
                  />
                </label>
              </div>

              <fieldset>
                <legend className="mb-2 text-sm font-medium text-primary">Interés</legend>
                <div className="flex flex-wrap gap-3">
                  {interests.map((item) => (
                    <label
                      key={item}
                      className="flex min-h-11 cursor-pointer items-center gap-2 rounded-full border border-primary/25 bg-white/70 px-4 py-2 text-sm font-medium text-primary transition-colors hover:border-primary/45 has-[:checked]:border-accent-strong has-[:checked]:bg-accent/10 has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-highlight"
                    >
                      <input type="checkbox" name="interest" value={item} className="h-4 w-4 accent-[var(--color-accent-strong)] focus-visible:outline-none" />
                      {item}
                    </label>
                  ))}
                </div>
              </fieldset>

              <label className="block text-sm font-medium text-primary">
                Mensaje
                <textarea
                  required
                  name="message"
                  rows={4}
                  className="mt-1.5 w-full rounded-xl border border-primary/45 bg-white px-4 py-3 text-base text-primary placeholder:text-gray transition-colors hover:border-primary/60 focus:border-primary focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-highlight"
                  placeholder="Cuéntanos sobre tu proyecto"
                />
              </label>

              <button
                type="submit"
                className="min-h-12 w-full rounded-full bg-accent-strong px-10 py-4 text-base font-semibold text-white transition-colors duration-300 hover:bg-accent-ink sm:w-auto"
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
