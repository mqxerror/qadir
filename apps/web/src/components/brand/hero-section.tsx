'use client';

import Link from 'next/link';
import Image from 'next/image';
import { SealMark } from './seal-mark';
import { motion } from 'framer-motion';

interface HeroSectionProps {
  headline: string;
  subtitle: string;
  ctaPrimary: { label: string; href: string };
  ctaSecondary: { label: string; href: string };
}

export function HeroSection({ headline, subtitle, ctaPrimary, ctaSecondary }: HeroSectionProps) {
  return (
    <section className="relative min-h-screen md:h-screen flex flex-col items-center justify-center text-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/store/boutique.webp"
          alt=""
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 px-5 md:px-8 pb-[var(--spacing-8)]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="flex flex-col items-center gap-[var(--spacing-5)]"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="text-white">
              <SealMark variant="primary" size={90} />
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="max-w-[680px] mt-[var(--spacing-5)] text-white"
          >
            {headline}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.85 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-lg text-white/85 max-w-[520px]"
          >
            {subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 mt-[var(--spacing-4)]"
          >
            <Link
              href={ctaPrimary.href}
              className="inline-flex items-center justify-center px-8 py-3 bg-white text-black text-sm font-semibold uppercase tracking-[0.04em] rounded-[3px] hover:opacity-90 transition-opacity min-w-[200px] min-h-[44px]"
            >
              {ctaPrimary.label}
            </Link>
            <Link
              href={ctaSecondary.href}
              className="inline-flex items-center justify-center px-8 py-3 border border-white/70 text-white text-sm font-semibold uppercase tracking-[0.04em] rounded-[3px] hover:bg-white/10 transition-colors min-w-[200px] min-h-[44px]"
            >
              {ctaSecondary.label}
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
