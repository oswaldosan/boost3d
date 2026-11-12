'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { contactLink, navLinks, site } from '@/lib/constants';
import { useActiveSection } from '@/hooks/useActiveSection';

const MENU_ID = 'mobile-menu';
const SECTION_IDS = ['hero', ...navLinks.map((l) => l.href.slice(1)), contactLink.href.slice(1)];
const FOCUSABLE = 'a[href], button:not([disabled])';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const activeId = useActiveSection(SECTION_IDS);

  const close = useCallback((restoreFocus = false) => {
    setOpen(false);
    if (restoreFocus) toggleRef.current?.focus();
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // While the menu is open: lock page scroll, trap focus, close on Esc,
  // and close automatically if the viewport grows past the mobile breakpoint.
  useEffect(() => {
    if (!open) return;

    const root = document.documentElement;
    const previousOverflow = root.style.overflow;
    root.style.overflow = 'hidden';

    const header = headerRef.current;
    header?.querySelector<HTMLElement>(`#${MENU_ID} a`)?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        close(true);
        return;
      }
      if (event.key !== 'Tab' || !header) return;
      const items = Array.from(header.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
        (el) => el.offsetParent !== null,
      );
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      const current = document.activeElement;
      if (event.shiftKey && (current === first || !header.contains(current))) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && (current === last || !header.contains(current))) {
        event.preventDefault();
        first.focus();
      }
    };

    const desktop = window.matchMedia('(min-width: 768px)');
    const onBreakpoint = (e: MediaQueryListEvent) => e.matches && close();

    document.addEventListener('keydown', onKeyDown);
    desktop.addEventListener('change', onBreakpoint);
    return () => {
      root.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKeyDown);
      desktop.removeEventListener('change', onBreakpoint);
    };
  }, [open, close]);

  const solid = scrolled || open;

  return (
    <motion.header
      ref={headerRef}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,padding,box-shadow] duration-300 ${
        open ? 'bg-neutral py-3' : solid ? 'glass-strong py-3' : 'bg-transparent py-5'
      }`}
    >
      <nav
        aria-label="Principal"
        className="mx-auto flex max-w-7xl items-center justify-between px-5 sm:px-6"
      >
        <a
          href="#hero"
          aria-label={`${site.name}, ir al inicio`}
          onClick={() => close()}
          className="relative z-10 flex items-center rounded-lg"
        >
          <Image
            src="/brand/logoboost2.png"
            alt=""
            width={180}
            height={103}
            className="h-11 w-auto"
            priority
          />
        </a>

        <ul className="hidden items-center gap-8 md:flex lg:gap-10">
          {navLinks.map((link) => {
            const current = activeId === link.href.slice(1);
            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  aria-current={current ? 'true' : undefined}
                  className="relative py-2 text-[15px] font-medium text-primary/75 transition-colors duration-200 hover:text-primary aria-[current]:text-primary after:absolute after:inset-x-0 after:-bottom-0.5 after:h-0.5 after:origin-left after:scale-x-0 after:rounded-full after:bg-accent after:transition-transform after:duration-300 hover:after:scale-x-100 aria-[current]:after:scale-x-100 motion-reduce:after:transition-none"
                >
                  {link.label}
                </a>
              </li>
            );
          })}
          <li>
            <a
              href={contactLink.href}
              className="inline-flex min-h-11 items-center rounded-full bg-accent-strong px-6 text-[15px] font-semibold text-white shadow-[0_10px_24px_rgba(214,41,40,0.28)] transition-colors duration-200 hover:bg-accent-ink"
            >
              {contactLink.label}
            </a>
          </li>
        </ul>

        <button
          ref={toggleRef}
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls={MENU_ID}
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          className="relative z-10 -mr-2 flex h-11 w-11 flex-col items-center justify-center gap-1.5 rounded-full text-primary transition-colors hover:bg-primary/5 md:hidden"
        >
          <span
            aria-hidden="true"
            className={`h-0.5 w-6 rounded-full bg-current transition-transform duration-300 motion-reduce:transition-none ${open ? 'translate-y-2 rotate-45' : ''}`}
          />
          <span
            aria-hidden="true"
            className={`h-0.5 w-6 rounded-full bg-current transition-opacity duration-300 ${open ? 'opacity-0' : ''}`}
          />
          <span
            aria-hidden="true"
            className={`h-0.5 w-6 rounded-full bg-current transition-transform duration-300 motion-reduce:transition-none ${open ? '-translate-y-2 -rotate-45' : ''}`}
          />
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id={MENU_ID}
            key="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="fixed inset-x-0 bottom-0 top-[68px] overflow-y-auto border-t border-primary/10 bg-neutral md:hidden"
          >
            <div className="mx-auto flex min-h-full max-w-md flex-col px-5 pb-10 pt-4">
              <ul className="flex flex-col gap-1">
                {navLinks.map((link) => {
                  const current = activeId === link.href.slice(1);
                  return (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        onClick={() => close()}
                        aria-current={current ? 'true' : undefined}
                        className="group flex min-h-14 items-center justify-between rounded-2xl px-4 font-display text-xl font-semibold text-primary transition-colors hover:bg-primary/5 active:bg-primary/10 aria-[current]:bg-accent/[0.07] aria-[current]:text-accent-ink"
                      >
                        {link.label}
                        <svg
                          aria-hidden="true"
                          viewBox="0 0 16 16"
                          fill="none"
                          className="h-4 w-4 text-primary/40 transition-transform group-hover:translate-x-0.5 group-aria-[current]:text-accent-ink motion-reduce:transition-none"
                        >
                          <path
                            d="M3 8h10m0 0L8.5 3.5M13 8l-4.5 4.5"
                            stroke="currentColor"
                            strokeWidth="1.75"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </a>
                    </li>
                  );
                })}
              </ul>

              <div className="mt-6 border-t border-primary/10 pt-6">
                <a
                  href={contactLink.href}
                  onClick={() => close()}
                  className="flex min-h-12 w-full items-center justify-center rounded-full bg-accent-strong px-8 text-base font-semibold text-white shadow-[0_12px_28px_rgba(214,41,40,0.28)] transition-colors hover:bg-accent-ink"
                >
                  {contactLink.label}
                </a>
                <p className="mt-5 text-center text-sm text-gray">
                  O escríbenos a{' '}
                  <a
                    href={`mailto:${site.email}`}
                    className="font-semibold text-primary underline decoration-primary/30 underline-offset-4 hover:decoration-primary"
                  >
                    {site.email}
                  </a>
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
