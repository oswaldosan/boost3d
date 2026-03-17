'use client';

import { motion, useScroll, useTransform } from 'framer-motion';

export default function ScrollArrow() {
  const { scrollYProgress } = useScroll();

  // Arrow appears after hero (10%) and disappears near footer (90%)
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.08, 0.12, 0.85, 0.92],
    [0, 0, 1, 1, 0]
  );

  // Zigzag horizontally between sections
  const x = useTransform(
    scrollYProgress,
    [0.1, 0.25, 0.4, 0.55, 0.7, 0.85],
    [60, -60, 60, -60, 60, -60]
  );

  // Rotate as it moves
  const rotate = useTransform(
    scrollYProgress,
    [0.1, 0.25, 0.4, 0.55, 0.7, 0.85],
    [0, -15, 10, -10, 15, -5]
  );

  // Scale pulses slightly
  const scale = useTransform(
    scrollYProgress,
    [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8],
    [0.8, 1, 0.9, 1.05, 0.95, 1, 0.9, 0.85]
  );

  return (
    <motion.div
      className="pointer-events-none fixed right-8 top-1/2 z-40 -translate-y-1/2 hidden lg:block"
      style={{ opacity, x, rotate, scale }}
    >
      <svg
        width="56"
        height="56"
        viewBox="0 0 56 56"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          filter: 'drop-shadow(0 4px 12px rgba(255, 67, 66, 0.3))',
        }}
      >
        {/* Curved arrow — inspired by Boost logo arrow */}
        <path
          d="M10 42C10 42 14 10 42 10"
          stroke="#ff4342"
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
        />
        {/* Arrowhead */}
        <path
          d="M33 7L42 10L39 19"
          stroke="#ff4342"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        {/* Inner glow line */}
        <path
          d="M12 40C12 40 16 14 40 12"
          stroke="#ff6a63"
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
          opacity="0.4"
        />
      </svg>
    </motion.div>
  );
}
