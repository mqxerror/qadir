'use client';

import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || ''
);

export function StripeProvider({
  clientSecret,
  children,
}: {
  clientSecret: string;
  children: React.ReactNode;
}) {
  return (
    <Elements
      stripe={stripePromise}
      options={{
        clientSecret,
        appearance: {
          theme: 'flat',
          variables: {
            colorPrimary: '#5A4632',
            colorBackground: 'var(--color-surface, #FFFFFF)',
            colorText: 'var(--color-primary, #111111)',
            fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif",
            borderRadius: '3px',
          },
        },
      }}
    >
      {children}
    </Elements>
  );
}
