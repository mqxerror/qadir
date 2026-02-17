'use client';

import { motion } from 'framer-motion';

interface OlfactiveNote {
  category: string;
  notes: string[];
  description: string;
}

const tierColors: Record<string, string> = {
  Top: 'border-l-[var(--color-accent)]/60',
  Heart: 'border-l-[var(--color-accent)]/80',
  Base: 'border-l-[var(--color-accent)]',
};

export function OlfactiveProfile({ notes }: { notes: OlfactiveNote[] }) {
  return (
    <section className="max-w-[680px]">
      <h2 className="mb-[var(--spacing-7)]">Olfactive Profile</h2>
      <dl className="space-y-[var(--spacing-5)]">
        {notes.map((note, i) => (
          <motion.div
            key={note.category}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.4, delay: i * 0.12, ease: 'easeOut' }}
            className={`bg-[var(--color-surface)] border border-[var(--color-border)] border-l-4 ${tierColors[note.category] || ''} rounded-[var(--radius-sm)] p-[var(--spacing-5)]`}
          >
            <dt className="text-lg font-semibold tracking-[0.02em] mb-2">{note.category} Notes</dt>
            <dd className="text-[var(--color-accent)] text-sm mb-3 font-medium">{note.notes.join(' \u00b7 ')}</dd>
            <dd className="text-[var(--color-primary)] leading-relaxed opacity-90">{note.description}</dd>
          </motion.div>
        ))}
      </dl>
    </section>
  );
}
