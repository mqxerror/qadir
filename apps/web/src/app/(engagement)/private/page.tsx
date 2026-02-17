import type { Metadata } from 'next';
import { VipForm } from '@/components/forms/vip-form';

export const metadata: Metadata = {
  title: 'Private Access',
  description: 'Request private access to exclusive QADIR Montreal experiences.',
};

const BENEFITS = [
  {
    title: 'Early Access',
    description: 'Be the first to experience new compositions before public release.',
  },
  {
    title: 'Private Consultations',
    description: 'One-on-one sessions with our in-house perfumer in our Old Montreal atelier.',
  },
  {
    title: 'Bespoke Compositions',
    description: 'Commission a personal fragrance crafted exclusively around your olfactive identity.',
  },
  {
    title: 'Collector Editions',
    description: 'Access to limited-run bottles, rare oud sourcing, and numbered releases.',
  },
];

export default function PrivatePage() {
  return (
    <div className="pt-[var(--spacing-10)]">
      <div className="max-w-[680px] mx-auto px-5 md:px-8">
        {/* Header */}
        <div className="text-center mb-[var(--spacing-9)]">
          <p className="text-sm text-[var(--color-accent)] uppercase tracking-[0.08em] mb-[var(--spacing-3)]">By Invitation</p>
          <h1 className="mb-[var(--spacing-5)]">Certain experiences are reserved</h1>
          <p className="text-lg text-[var(--color-primary)] opacity-80 max-w-[480px] mx-auto">
            For those who value discretion and personalized attention, we offer invitation-only access to a deeper level of the QADIR experience.
          </p>
        </div>

        {/* Benefits */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-[var(--spacing-6)] mb-[var(--spacing-9)]">
          {BENEFITS.map((benefit) => (
            <div key={benefit.title} className="border border-[var(--color-border)] rounded-[var(--radius-sm)] p-[var(--spacing-5)]">
              <h3 className="font-serif text-[20px] font-medium mb-2">{benefit.title}</h3>
              <p className="text-sm text-[var(--color-muted)] leading-relaxed">{benefit.description}</p>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-[var(--color-border)] mb-[var(--spacing-8)]" />

        {/* Form */}
        <div className="text-center mb-[var(--spacing-5)]">
          <h2 className="mb-[var(--spacing-3)]">Request Access</h2>
          <p className="text-sm text-[var(--color-muted)]">
            Tell us a little about yourself and what interests you. We review every inquiry personally.
          </p>
        </div>
        <div className="flex justify-center">
          <VipForm />
        </div>
      </div>
    </div>
  );
}
