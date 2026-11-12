'use client';

import { motion, useReducedMotion, type Variants } from 'framer-motion';
const easeCinematic = [0.19, 1, 0.22, 1] as const;

export type CinematicHeadingTag = 'h1' | 'p';

const letterHidden: Variants = {
  hidden: {
    opacity: 0,
    y: '0.62em',
    rotateX: -42,
    filter: 'blur(5px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.68, ease: easeCinematic },
  },
};

const wordHidden: Variants = {
  hidden: { opacity: 0, y: 18, filter: 'blur(4px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.55, ease: easeCinematic },
  },
};

export type TextSegment = { text: string; className?: string };

type CinematicLettersProps = {
  segments: TextSegment[];
  as?: CinematicHeadingTag;
  className?: string;
  delayStart?: number;
  stagger?: number;
  label: string;
};

/**
 * Letter-by-letter reveal with slight 3D tilt and blur — title-card style.
 */
export function CinematicLetters({
  segments,
  as = 'p',
  className,
  delayStart = 0,
  stagger = 0.052,
  label,
}: CinematicLettersProps) {
  const reduceMotion = useReducedMotion();
  const flat = segments.flatMap((seg) =>
    Array.from(seg.text).map((char) => ({
      char: char === ' ' ? '\u00A0' : char,
      className: seg.className,
    })),
  );

  const plain = segments.map((s) => s.text).join('');

  const animated = (
    <>
      <span className="sr-only">{label}</span>
      <motion.span
        aria-hidden="true"
        className="inline-block [transform-style:preserve-3d]"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: { staggerChildren: stagger, delayChildren: delayStart },
          },
        }}
      >
        {flat.map((item, i) => (
          <motion.span
            key={`${i}-${item.char}`}
            variants={letterHidden}
            className={`inline-block [transform-origin:50%_100%] ${item.className ?? ''}`}
          >
            {item.char}
          </motion.span>
        ))}
      </motion.span>
    </>
  );

  if (reduceMotion) {
    return as === 'h1' ? (
      <h1 className={className}>{plain}</h1>
    ) : (
      <p className={className}>{plain}</p>
    );
  }

  return as === 'h1' ? (
    <h1 className={className} style={{ perspective: '1000px' }}>
      {animated}
    </h1>
  ) : (
    <p className={className} style={{ perspective: '1000px' }}>
      {animated}
    </p>
  );
}

type CinematicWordsProps = {
  text: string;
  className?: string;
  delayStart?: number;
  stagger?: number;
  label: string;
};

/**
 * Word-by-word reveal for longer copy (still feels like a film subtitle).
 */
export function CinematicWords({
  text,
  className,
  delayStart = 0,
  stagger = 0.09,
  label,
}: CinematicWordsProps) {
  const reduceMotion = useReducedMotion();
  const words = text.split(/\s+/).filter(Boolean);

  const body = reduceMotion ? (
    text
  ) : (
    <>
      <span className="sr-only">{label}</span>
      <motion.span
        aria-hidden="true"
        className="inline-block text-left sm:text-center"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: { staggerChildren: stagger, delayChildren: delayStart },
          },
        }}
      >
        {words.map((word, i) => (
          <motion.span key={`${word}-${i}`} variants={wordHidden} className="inline-block">
            {word}
            {i < words.length - 1 ? '\u00A0' : ''}
          </motion.span>
        ))}
      </motion.span>
    </>
  );

  return <p className={className}>{body}</p>;
}
