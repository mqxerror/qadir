'use client';

import { useState } from 'react';
import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useRouter } from 'next/navigation';

export function StripeElementsForm({ orderId }: { orderId: string }) {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setProcessing(true);
    setError('');

    const result = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/order/${orderId}/confirmation`,
      },
    });

    if (result.error) {
      setError(result.error.message || 'Payment failed. Please try again.');
      setProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-[var(--spacing-5)]">
      <PaymentElement />
      {error && (
        <p className="text-sm text-[var(--color-error)]" role="alert">{error}</p>
      )}
      <button
        type="submit"
        disabled={!stripe || processing}
        className="w-full py-3 bg-[var(--color-primary)] text-[var(--color-background)] text-sm font-semibold uppercase tracking-[0.04em] rounded-[3px] disabled:bg-[var(--color-muted)] disabled:cursor-not-allowed hover:opacity-85 transition-opacity min-h-[44px]"
      >
        {processing ? 'Processing...' : 'Complete Purchase'}
      </button>
    </form>
  );
}
