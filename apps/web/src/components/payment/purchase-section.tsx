'use client';

import { useState } from 'react';
import { fetchApi } from '@/lib/api';
import { StripeProvider } from './stripe-provider';
import { StripeElementsForm } from './stripe-elements-form';

interface PurchaseSectionProps {
  blendId: string;
  blendName: string;
  price: number;
  currency: string;
}

export function PurchaseSection({ blendId, blendName, price, currency }: PurchaseSectionProps) {
  const [quantity, setQuantity] = useState(1);
  const [mode, setMode] = useState<'idle' | 'elements' | 'loading'>('idle');
  const [clientSecret, setClientSecret] = useState('');
  const [orderId, setOrderId] = useState('');
  const [error, setError] = useState('');
  const [detailsOpen, setDetailsOpen] = useState<string | null>(null);

  const total = (price * quantity) / 100;

  const handlePurchase = async () => {
    setError('');
    setMode('loading');
    try {
      const res = await fetchApi<{ data: { sessionUrl: string } }>(
        '/payments/create-checkout',
        {
          method: 'POST',
          body: JSON.stringify({
            blendId,
            quantity,
            successUrl: `${window.location.origin}/order`,
            cancelUrl: window.location.href,
          }),
        },
      );
      if (res.data.sessionUrl) {
        window.location.href = res.data.sessionUrl;
      }
    } catch (err: any) {
      setError(err.message || 'Could not redirect to checkout');
      setMode('idle');
    }
  };

  const toggleDetail = (key: string) => {
    setDetailsOpen(detailsOpen === key ? null : key);
  };

  return (
    <section id="purchase" className="border-t border-[var(--color-border)] pt-[var(--spacing-7)] mt-[var(--spacing-9)]">
      <h2 className="mb-[var(--spacing-5)]">Purchase</h2>

      {/* Price + size */}
      <div className="flex items-baseline gap-3 mb-1">
        <span className="text-3xl font-serif">${total.toFixed(0)}</span>
        <span className="text-sm text-[var(--color-muted)] uppercase">{currency}</span>
      </div>
      <p className="text-xs text-[var(--color-muted)] mb-[var(--spacing-5)]">50ml / 1.7 fl oz &mdash; Extrait de Parfum</p>

      {/* Quantity */}
      <div className="flex items-center gap-4 mb-[var(--spacing-6)]">
        <label className="text-sm font-medium">Quantity</label>
        <div className="flex items-center border border-[var(--color-border)] rounded-[3px]">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="w-10 h-10 flex items-center justify-center hover:opacity-70 transition-opacity"
            aria-label="Decrease quantity"
          >
            &minus;
          </button>
          <span className="w-10 text-center text-sm font-medium">{quantity}</span>
          <button
            onClick={() => setQuantity(Math.min(10, quantity + 1))}
            className="w-10 h-10 flex items-center justify-center hover:opacity-70 transition-opacity"
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>
      </div>

      {mode === 'idle' && (
        <div className="space-y-4">
          {/* Single primary CTA */}
          <button
            onClick={handlePurchase}
            className="w-full py-4 bg-[var(--color-primary)] text-[var(--color-background)] text-sm font-semibold uppercase tracking-[0.04em] rounded-[3px] hover:opacity-85 transition-opacity min-h-[48px]"
          >
            Purchase &mdash; ${total.toFixed(0)} {currency}
          </button>

          {/* Trust signals */}
          <div className="flex items-center justify-center gap-6 py-3">
            <div className="flex items-center gap-1.5 text-xs text-[var(--color-muted)]">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0110 0v4" /></svg>
              Secure checkout
            </div>
            <div className="flex items-center gap-1.5 text-xs text-[var(--color-muted)]">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M20 12V8H6a2 2 0 01-2-2V4h16v4" /><path d="M4 6v12a2 2 0 002 2h14v-4" /><circle cx="18" cy="16" r="2" /></svg>
              Powered by Stripe
            </div>
          </div>
        </div>
      )}

      {mode === 'loading' && (
        <div className="text-center py-[var(--spacing-5)]">
          <p className="text-sm text-[var(--color-muted)]">Preparing secure checkout...</p>
        </div>
      )}

      {mode === 'elements' && clientSecret && (
        <StripeProvider clientSecret={clientSecret}>
          <StripeElementsForm orderId={orderId} />
        </StripeProvider>
      )}

      {error && (
        <p className="text-sm text-[var(--color-error)] mt-3" role="alert">{error}</p>
      )}

      {/* Collapsible details */}
      <div className="mt-[var(--spacing-5)] border-t border-[var(--color-border)] divide-y divide-[var(--color-border)]">
        {[
          { key: 'shipping', label: 'Shipping', content: 'Complimentary shipping within Canada. International orders ship via tracked express (3\u20135 business days). Orders are carefully packaged in our signature presentation box.' },
          { key: 'returns', label: 'Returns & Exchanges', content: 'Unopened bottles may be returned within 14 days of delivery for a full refund. We stand behind every composition \u2014 if you are not satisfied, contact us directly.' },
          { key: 'authenticity', label: 'Authenticity', content: 'Every QADIR fragrance is mixed, matured, and bottled in Montreal. Each bottle carries a unique batch number traceable to its production run.' },
        ].map(({ key, label, content }) => (
          <button
            key={key}
            onClick={() => toggleDetail(key)}
            className="w-full text-left py-4 group"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">{label}</span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className={`transition-transform duration-200 ${detailsOpen === key ? 'rotate-180' : ''}`}
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </div>
            {detailsOpen === key && (
              <p className="text-sm text-[var(--color-muted)] mt-2 leading-relaxed pr-6">{content}</p>
            )}
          </button>
        ))}
      </div>
    </section>
  );
}
