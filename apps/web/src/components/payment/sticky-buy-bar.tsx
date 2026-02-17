'use client';

import { useEffect, useState } from 'react';

interface StickyBuyBarProps {
  name: string;
  price: number;
  currency: string;
}

export function StickyBuyBar({ name, price, currency }: StickyBuyBarProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling past 400px (past the hero image)
      setVisible(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToPurchase = () => {
    const el = document.getElementById('purchase');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const total = price / 100;

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-[var(--color-surface)] border-t border-[var(--color-border)] px-5 py-3 transition-transform duration-300 ${
        visible ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <div className="flex items-center justify-between gap-4 max-w-[680px] mx-auto">
        <div>
          <p className="text-sm font-medium">{name}</p>
          <p className="text-xs text-[var(--color-muted)]">${total.toFixed(0)} {currency}</p>
        </div>
        <button
          onClick={scrollToPurchase}
          className="px-6 py-2.5 bg-[var(--color-primary)] text-[var(--color-background)] text-sm font-semibold uppercase tracking-[0.04em] rounded-[3px] hover:opacity-85 transition-opacity min-h-[44px]"
        >
          Purchase
        </button>
      </div>
    </div>
  );
}
