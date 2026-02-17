import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = { title: 'Order Confirmation' };

const SERVER_API_BASE = process.env.INTERNAL_API_URL || process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/v1';

async function getOrder(id: string) {
  try {
    const res = await fetch(`${SERVER_API_BASE}/payments/order/${id}`, { next: { revalidate: 0 } });
    if (!res.ok) return null;
    const data: any = await res.json();
    return data.data;
  } catch {
    return null;
  }
}

export default async function OrderConfirmationPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const order = await getOrder(id);

  return (
    <div className="pt-[var(--spacing-10)] pb-[var(--spacing-9)]">
      <div className="max-w-[520px] mx-auto px-5 md:px-8 text-center">
        <div className="text-[var(--color-success)] text-4xl mb-[var(--spacing-5)]">&#10003;</div>
        <h1 className="mb-[var(--spacing-4)]">Thank You</h1>

        {order ? (
          <>
            <p className="text-lg text-[var(--color-primary)] opacity-80 mb-[var(--spacing-6)]">
              Your order has been {order.status === 'PAID' ? 'confirmed' : 'received'}.
            </p>
            <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[3px] p-[var(--spacing-5)] mb-[var(--spacing-6)] text-left">
              <p className="text-sm text-[var(--color-muted)] mb-2">Order #{order.id.slice(0, 8)}</p>
              {order.items?.map((item: any) => (
                <div key={item.id} className="flex justify-between items-center py-2">
                  <div>
                    <p className="font-medium">{item.blend?.name}</p>
                    <p className="text-sm text-[var(--color-muted)]">Qty: {item.quantity}</p>
                  </div>
                  <p className="text-sm">${(item.unitCents * item.quantity / 100).toFixed(0)} {order.currency}</p>
                </div>
              ))}
              <div className="border-t border-[var(--color-border)] mt-3 pt-3 flex justify-between font-medium">
                <span>Total</span>
                <span>${(order.totalCents / 100).toFixed(0)} {order.currency}</span>
              </div>
            </div>
          </>
        ) : (
          <p className="text-lg text-[var(--color-primary)] opacity-80 mb-[var(--spacing-6)]">
            Your order has been received. You will receive a confirmation email shortly.
          </p>
        )}

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/collection"
            className="inline-flex items-center justify-center px-8 py-3 bg-[var(--color-primary)] text-[var(--color-background)] text-sm font-semibold uppercase tracking-[0.04em] rounded-[3px] hover:opacity-85 transition-opacity min-h-[44px]"
          >
            Continue Shopping
          </Link>
          <Link
            href="/"
            className="inline-flex items-center justify-center px-8 py-3 border border-[var(--color-primary)] text-[var(--color-primary)] text-sm font-semibold uppercase tracking-[0.04em] rounded-[3px] hover:border-[var(--color-accent)] transition-colors min-h-[44px]"
          >
            Home
          </Link>
        </div>
      </div>
    </div>
  );
}
