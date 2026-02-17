'use client';

import { motion, type Variants } from 'framer-motion';

type RevealVariant = 'fade-up' | 'fade-in' | 'slide-left' | 'slide-right';

const variants: Record<RevealVariant, Variants> = {
  'fade-up': {
    hidden: { opacity: 0, y: 32 },
    visible: { opacity: 1, y: 0 },
  },
  'fade-in': {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  'slide-left': {
    hidden: { opacity: 0, x: -32 },
    visible: { opacity: 1, x: 0 },
  },
  'slide-right': {
    hidden: { opacity: 0, x: 32 },
    visible: { opacity: 1, x: 0 },
  },
};

interface RevealOnScrollProps {
  children: React.ReactNode;
  variant?: RevealVariant;
  delay?: number;
  duration?: number;
  className?: string;
}

export function RevealOnScroll({
  children,
  variant = 'fade-up',
  delay = 0,
  duration = 0.6,
  className,
}: RevealOnScrollProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      variants={variants[variant]}
      transition={{ duration, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
