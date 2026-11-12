import Image from 'next/image';
import type { CSSProperties } from 'react';
import { site, stats } from '@/lib/constants';

// Stats shown as social proof under the CTAs (brands, activations, years).
const heroStats = [stats[3], stats[1], stats[0]];

const subtitleParts = site.subtitle.split('-').map((part) => part.trim());

/** Staggered entrance delay consumed by the `.hero-reveal` animation. */
const delay = (ms: number) => ({ '--hero-delay': `${ms}ms` }) as CSSProperties;

export default function Hero() {
  return (
    <section
      id="hero"
      aria-labelledby="hero-title"
      className="relative isolate overflow-hidden"
    >
      <HeroBackdrop />

      <div className="mx-auto grid min-h-[100svh] w-full max-w-[1120px] items-center gap-12 px-5 pb-16 pt-32 sm:px-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10 lg:px-10 lg:pb-20 lg:pt-28">
        <div className="max-w-xl">
          <p
            className="hero-reveal mb-6 inline-flex items-center gap-2.5 rounded-full border border-primary/10 bg-white/70 py-1.5 pl-2 pr-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-primary/70 shadow-[0_6px_18px_rgba(13,8,105,0.06)] backdrop-blur sm:text-xs"
            style={delay(0)}
          >
            <span className="relative flex h-2 w-2" aria-hidden="true">
              <span className="hero-ping absolute inset-0 rounded-full bg-accent/60" />
              <span className="relative h-2 w-2 rounded-full bg-accent" />
            </span>
            {subtitleParts.join(' · ')}
          </p>

          <h1
            id="hero-title"
            className="hero-reveal font-display text-[3.25rem] font-bold leading-[0.98] tracking-[-0.04em] text-primary sm:text-[4.25rem] lg:text-[5.25rem]"
            style={delay(80)}
          >
            Somos <span className="gradient-text-accent">Boost</span>
          </h1>

          <p
            className="hero-reveal mt-6 max-w-[30rem] text-base leading-relaxed text-primary/70 sm:text-lg"
            style={delay(160)}
          >
            Eventos, BTL, audiovisuales y marketing digital. Creamos y ejecutamos
            campañas que hacen crecer marcas en Honduras.
          </p>

          <div
            className="hero-reveal mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
            style={delay(240)}
          >
            <a
              href="#contacto"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-accent px-7 py-3.5 text-sm font-semibold text-white shadow-[0_12px_28px_rgba(255,67,66,0.3)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_34px_rgba(255,67,66,0.38)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-[#eef0f8] motion-reduce:transition-none motion-reduce:hover:translate-y-0"
            >
              Contáctanos
              <ArrowIcon />
            </a>
            <a
              href="#servicios"
              className="inline-flex items-center justify-center rounded-full border border-primary/15 bg-white/70 px-7 py-3.5 text-sm font-semibold text-primary backdrop-blur transition duration-300 hover:border-primary/25 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#eef0f8]"
            >
              Ver servicios
            </a>
          </div>

          <dl
            className="hero-reveal mt-12 grid max-w-md grid-cols-3 divide-x divide-primary/10 border-t border-primary/10 pt-6"
            style={delay(320)}
          >
            {heroStats.map((stat) => (
              <div key={stat.label} className="flex flex-col-reverse justify-end gap-1 px-3 first:pl-0 last:pr-0 sm:px-5">
                <dt className="text-[11px] leading-snug text-primary/60 sm:text-xs">
                  {stat.label}
                </dt>
                <dd className="font-display text-2xl font-bold tracking-tight text-primary sm:text-[1.75rem]">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <HeroVisual />
      </div>

      <ScrollHint />
    </section>
  );
}

function HeroBackdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
      <div className="hero-grid absolute inset-0" />
      <div className="absolute -right-32 top-16 h-[28rem] w-[28rem] rounded-full bg-accent/15 blur-3xl sm:-right-16" />
      <div className="absolute -left-40 bottom-0 h-[24rem] w-[24rem] rounded-full bg-highlight/12 blur-3xl" />
    </div>
  );
}

function HeroVisual() {
  return (
    <div
      className="hero-reveal relative mx-auto w-full max-w-[300px] sm:max-w-[400px] lg:max-w-[440px]"
      style={delay(200)}
    >
      {/* Decorative concentric rings behind the card */}
      <div
        aria-hidden="true"
        className="absolute inset-[-12%] rounded-full border border-primary/[0.06]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-[-26%] hidden rounded-full border border-dashed border-primary/[0.06] sm:block"
      />

      <div className="relative aspect-square overflow-hidden rounded-[2.25rem] border border-white bg-white shadow-[0_30px_70px_rgba(13,8,105,0.14)]">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(255,67,66,0.08),transparent_55%)]"
        />
        <Image
          src="/brand/buho2.png"
          alt="Búho de Boost Digital sobre una flecha de crecimiento"
          width={612}
          height={571}
          priority
          sizes="(min-width: 1024px) 440px, (min-width: 640px) 400px, 300px"
          className="hero-float relative h-full w-full object-contain p-[12%]"
        />
      </div>

      <div
        aria-hidden="true"
        className="absolute -right-3 top-6 flex items-center gap-2 rounded-2xl border border-primary/10 bg-white/90 px-3.5 py-2.5 shadow-[0_14px_30px_rgba(13,8,105,0.12)] backdrop-blur sm:-right-8"
      >
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-accent/10 text-accent">
          <ArrowIcon />
        </span>
        <span className="text-xs font-semibold text-primary">Marcas que crecen</span>
      </div>

      <div
        aria-hidden="true"
        className="absolute -bottom-5 -left-3 rounded-2xl bg-primary px-4 py-3 text-white shadow-[0_18px_36px_rgba(13,8,105,0.28)] sm:-left-8"
      >
        <p className="font-display text-lg font-bold leading-none">{stats[2].value}</p>
        <p className="mt-1 text-[11px] text-white/75">{stats[2].label}</p>
      </div>
    </div>
  );
}

function ScrollHint() {
  return (
    <div
      aria-hidden="true"
      className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 lg:block"
    >
      <div className="flex h-9 w-5.5 items-start justify-center rounded-full border border-primary/15 bg-white/50 p-1.5">
        <span className="hero-scroll-dot h-1.5 w-1 rounded-full bg-primary/40" />
      </div>
    </div>
  );
}

function ArrowIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      fill="none"
      className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 motion-reduce:transition-none"
    >
      <path
        d="M3 8h10m0 0L8.5 3.5M13 8l-4.5 4.5"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
