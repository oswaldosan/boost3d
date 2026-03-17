'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface AnimatedArrowProps {
  className?: string;
  direction?: 'right' | 'left';
  delay?: number;
}

export default function AnimatedArrow({
  className = '',
  direction = 'right',
  delay = 0.3,
}: AnimatedArrowProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const flip = direction === 'left' ? 'scale-x-[-1]' : '';

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: direction === 'right' ? -30 : 30, y: 10 }}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      className={`pointer-events-none ${flip} ${className}`}
    >
      <svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Curved arrow path matching the Boost brand arrow */}
        <path
          d="M8 36C8 36 12 8 36 8"
          stroke="#ff4342"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
        />
        {/* Arrowhead */}
        <path
          d="M28 6L36 8L34 16"
          stroke="#ff4342"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
    </motion.div>
  );
}
