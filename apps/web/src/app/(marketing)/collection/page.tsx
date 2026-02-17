import type { Metadata } from 'next';
import { BlendCard } from '@/components/brand/blend-card';

export const metadata: Metadata = { title: 'The Signature Collection' };

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/v1';

async function getBlends() {
  try {
    const res = await fetch(`${API_BASE}/blends`, { next: { revalidate: 3600 } });
    if (!res.ok) return [];
    const data: any = await res.json();
    return data.data;
  } catch {
    return [];
  }
}

export default async function CollectionPage() {
  const blends = await getBlends();

  const displayBlends = blends.length > 0 ? blends : [
    { name: 'ASL', slug: 'asl', role: 'Authority', imageUrl: null },
    { name: 'NOOR', slug: 'noor', role: 'Light', imageUrl: null },
    { name: 'HAYBA', slug: 'hayba', role: 'Presence', imageUrl: null },
    { name: 'MIQDAR', slug: 'miqdar', role: 'Depth', imageUrl: null },
  ];

  return (
    <div className="pt-[var(--spacing-10)]">
      <div className="max-w-[1200px] mx-auto px-5 md:px-8">
        <div className="max-w-[680px] mb-[var(--spacing-8)]">
          <h1 className="mb-[var(--spacing-4)]">The Signature Collection</h1>
          <p className="text-lg text-[var(--color-primary)] opacity-80">
            Four blends. Each one a deliberate statement of character — Authority, Light, Presence, Depth.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[var(--spacing-6)] md:gap-[var(--spacing-7)]">
          {displayBlends.map((blend: any) => (
            <BlendCard key={blend.slug} {...blend} />
          ))}
        </div>
      </div>
    </div>
  );
}
