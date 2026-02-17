'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

const SCENT_TEASERS: Record<string, string> = {
  asl: 'Dry Saffron \u00B7 Refined Oud \u00B7 Amber Resin',
  noor: 'Neroli \u00B7 White Oud \u00B7 Sandalwood',
  hayba: 'Cardamom \u00B7 Aged Oud \u00B7 Vetiver',
  miqdar: 'Cinnamon Bark \u00B7 Oud Noir \u00B7 Mysore Sandalwood',
};

interface BlendCardProps {
  name: string;
  slug: string;
  role: string;
  imageUrl: string | null;
  price?: number | null;
}

export function BlendCard({ name, slug, role, imageUrl, price }: BlendCardProps) {
  const teaser = SCENT_TEASERS[slug];

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <Link
        href={`/collection/${slug}`}
        aria-label={`Explore ${name} - ${role}`}
        className="group block"
      >
        <div className="aspect-[3/4] bg-[var(--color-muted)]/10 mb-[var(--spacing-4)] overflow-hidden rounded-[var(--radius-sm)] relative">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={`${name} fragrance`}
              width={800}
              height={1067}
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="font-serif text-[48px] text-[var(--color-muted)]">{name[0]}</span>
            </div>
          )}
          {/* Scent teaser overlay on hover */}
          {teaser && (
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent px-4 py-5 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out">
              <p className="text-xs text-white/90 tracking-[0.06em]">{teaser}</p>
            </div>
          )}
        </div>
        <h3 className="font-serif text-[28px] font-light">{name}</h3>
        <p className="text-sm text-[var(--color-muted)] mt-1">{role}</p>
        {price != null && (
          <p className="text-sm font-medium text-[var(--color-primary)] mt-1">${(price / 100).toFixed(0)} CAD</p>
        )}
        <span className="inline-flex items-center gap-1 mt-2 text-sm font-medium text-[var(--color-accent)] group-hover:gap-2 transition-all duration-300">
          Explore
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="transition-transform duration-300 group-hover:translate-x-0.5">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </span>
      </Link>
    </motion.div>
  );
}
