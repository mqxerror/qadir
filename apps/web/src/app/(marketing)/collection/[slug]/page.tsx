import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { OlfactiveProfile } from '@/components/brand/olfactive-profile';
import { PurchaseSection } from '@/components/payment/purchase-section';
import { StickyBuyBar } from '@/components/payment/sticky-buy-bar';
import { notFound } from 'next/navigation';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/v1';

const BLENDS_ORDER = ['asl', 'noor', 'hayba', 'miqdar'];

const FALLBACK_BLENDS: Record<string, any> = {
  asl: { name: 'ASL', slug: 'asl', role: 'Authority', meaning: 'ASL (\u0623\u0635\u0644) \u2014 Origin, Foundation. The root from which all else grows.', description: 'ASL is the foundation of the QADIR collection \u2014 a fragrance that speaks before you do. Built on a base of refined oud and dry saffron, it opens with quiet confidence and deepens into a warm, resinous signature that lingers long after you\u2019ve left the room. This is not a fragrance that announces; it is one that remains.', olfactiveProfile: [{ category: 'Top', notes: ['Dry Saffron', 'Black Pepper', 'Bergamot'], description: 'A measured opening \u2014 saffron\u2019s warmth tempered by the precision of black pepper and a whisper of bergamot.' }, { category: 'Heart', notes: ['Refined Oud', 'Rose Absolute', 'Leather'], description: 'The core reveals itself slowly: oud in its most refined expression, softened by rose absolute and a subtle leather accord.' }, { category: 'Base', notes: ['Amber Resin', 'Cedarwood', 'Musk'], description: 'The foundation settles into amber warmth, grounded by cedarwood and carried by clean musk into the hours ahead.' }] },
  noor: { name: 'NOOR', slug: 'noor', role: 'Light', meaning: 'NOOR (\u0646\u0648\u0631) \u2014 Light, Radiance. What illuminates without burning.', description: 'NOOR is luminosity rendered in scent \u2014 a fragrance that captures the quality of light itself. It opens with the bright transparency of neroli and settles into a quiet, glowing warmth that feels like sunlight through linen. For those who lead not by force, but by clarity.', olfactiveProfile: [{ category: 'Top', notes: ['Neroli', 'Lemon Zest', 'Pink Pepper'], description: 'An immediate brightness \u2014 neroli\u2019s citrus purity sharpened by pink pepper and lemon.' }, { category: 'Heart', notes: ['White Oud', 'Jasmine Sambac', 'Iris'], description: 'Translucent character \u2014 white oud\u2019s clean sweetness interwoven with jasmine and iris.' }, { category: 'Base', notes: ['Sandalwood', 'White Musk', 'Ambrette'], description: 'Light resting on warm skin \u2014 sandalwood\u2019s creaminess carried by clean musk.' }] },
  hayba: { name: 'HAYBA', slug: 'hayba', role: 'Presence', meaning: 'HAYBA (\u0647\u064a\u0628\u0629) \u2014 Awe, Commanding Respect. The gravity that precedes words.', description: 'HAYBA is presence made tangible \u2014 a fragrance for rooms that go quiet when you enter. Built around aged oud and ceremonial incense, it carries the weight of intention without heaviness. This is not volume; it is gravity.', olfactiveProfile: [{ category: 'Top', notes: ['Cardamom', 'Incense', 'Elemi Resin'], description: 'A ceremonial opening \u2014 cardamom\u2019s warmth meeting sacred incense and elemi\u2019s balsamic freshness.' }, { category: 'Heart', notes: ['Aged Oud', 'Amber', 'Tobacco Leaf'], description: 'The most complex expression in the collection \u2014 aged oud\u2019s depth amplified by amber and a whisper of tobacco.' }, { category: 'Base', notes: ['Vetiver', 'Benzoin', 'Labdanum'], description: 'Deep and lasting \u2014 vetiver\u2019s earthy precision anchored by benzoin\u2019s warmth and labdanum\u2019s resinous embrace.' }] },
  miqdar: { name: 'MIQDAR', slug: 'miqdar', role: 'Depth', meaning: 'MIQDAR (\u0645\u0642\u062f\u0627\u0631) \u2014 Measure, Proportion. The precise calculation of impact.', description: 'MIQDAR is depth with precision \u2014 the darkest expression in the QADIR collection, yet perfectly measured. Every note is calibrated to create maximum impact with minimum excess. For those who understand that true power lies in knowing exactly how much is enough.', olfactiveProfile: [{ category: 'Top', notes: ['Cinnamon Bark', 'Nutmeg', 'Dark Plum'], description: 'A warm, spiced opening \u2014 cinnamon\u2019s heat tempered by nutmeg\u2019s sweetness and the richness of dark plum.' }, { category: 'Heart', notes: ['Oud Noir', 'Orris Root', 'Saffron Absolute'], description: 'The darkest expression of oud \u2014 noir-grade intensity softened by orris root\u2019s powdery elegance and saffron\u2019s crimson warmth.' }, { category: 'Base', notes: ['Mysore Sandalwood', 'Castoreum', 'Oakmoss'], description: 'A foundation of rare woods \u2014 Mysore sandalwood\u2019s creamy depth with castoreum\u2019s animalic warmth and oakmoss\u2019s forest floor.' }] },
};

async function getBlend(slug: string) {
  try {
    const res = await fetch(`${API_BASE}/blends/${slug}`, { next: { revalidate: 3600 } });
    if (!res.ok) return FALLBACK_BLENDS[slug] || null;
    const data: any = await res.json();
    return data.data;
  } catch {
    return FALLBACK_BLENDS[slug] || null;
  }
}

export async function generateStaticParams() {
  return BLENDS_ORDER.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const blend = await getBlend(slug);
  if (!blend) return {};
  return {
    title: blend.name,
    description: blend.description?.substring(0, 160),
  };
}

export default async function BlendDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const blend = await getBlend(slug);

  if (!blend) notFound();

  const currentIndex = BLENDS_ORDER.indexOf(slug);
  const prevSlug = currentIndex > 0 ? BLENDS_ORDER[currentIndex - 1] : null;
  const nextSlug = currentIndex < BLENDS_ORDER.length - 1 ? BLENDS_ORDER[currentIndex + 1] : null;

  const jsonLd = blend.price ? {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: `QADIR ${blend.name}`,
    description: blend.description,
    image: blend.imageUrl ? `${process.env.NEXT_PUBLIC_SITE_URL || 'https://qadir.com'}${blend.imageUrl}` : undefined,
    brand: { '@type': 'Brand', name: 'QADIR Montreal' },
    offers: {
      '@type': 'Offer',
      price: (blend.price / 100).toFixed(2),
      priceCurrency: blend.currency || 'CAD',
      availability: 'https://schema.org/InStock',
    },
  } : null;

  return (
    <article className="pt-[var(--spacing-10)]">
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}

      {/* Two-column layout on desktop */}
      <div className="max-w-[1200px] mx-auto px-5 md:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-[var(--spacing-8)]">

          {/* Left column: Product image (sticky on desktop) */}
          <div className="lg:sticky lg:top-[88px] lg:self-start mb-[var(--spacing-7)] lg:mb-0">
            {blend.imageUrl ? (
              <div className="relative aspect-[3/4] overflow-hidden rounded-[var(--radius-sm)]">
                <Image
                  src={blend.imageUrl}
                  alt={`${blend.name} fragrance`}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            ) : (
              <div className="aspect-[3/4] bg-[var(--color-muted)]/10 rounded-[var(--radius-sm)] flex items-center justify-center">
                <span className="font-serif text-[96px] text-[var(--color-muted)]">{blend.name[0]}</span>
              </div>
            )}
          </div>

          {/* Right column: Content */}
          <div>
            <p className="text-sm text-[var(--color-accent)] uppercase tracking-[0.08em] mb-[var(--spacing-3)]">{blend.role}</p>
            <h1 className="mb-[var(--spacing-4)]">{blend.name}</h1>
            <p className="text-[var(--color-muted)] italic mb-[var(--spacing-5)]">{blend.meaning}</p>
            <p className="text-lg leading-relaxed mb-[var(--spacing-7)]">{blend.description}</p>

            {/* Quick facts */}
            <div className="flex gap-6 mb-[var(--spacing-7)] py-[var(--spacing-4)] border-y border-[var(--color-border)]">
              <div>
                <p className="text-xs text-[var(--color-muted)] uppercase tracking-[0.08em] mb-1">Concentration</p>
                <p className="text-sm font-medium">Extrait de Parfum</p>
              </div>
              <div>
                <p className="text-xs text-[var(--color-muted)] uppercase tracking-[0.08em] mb-1">Size</p>
                <p className="text-sm font-medium">50ml / 1.7 fl oz</p>
              </div>
              <div>
                <p className="text-xs text-[var(--color-muted)] uppercase tracking-[0.08em] mb-1">Character</p>
                <p className="text-sm font-medium">{blend.role}</p>
              </div>
            </div>

            {blend.olfactiveProfile && <OlfactiveProfile notes={blend.olfactiveProfile} />}

            {/* Purchase section */}
            {blend.price && blend.id && (
              <PurchaseSection
                blendId={blend.id}
                blendName={blend.name}
                price={blend.price}
                currency={blend.currency || 'CAD'}
              />
            )}

            {/* Blend Navigation */}
            <nav className="flex justify-between items-center mt-[var(--spacing-9)] pt-[var(--spacing-6)] border-t border-[var(--color-border)]">
              {prevSlug ? (
                <Link href={`/collection/${prevSlug}`} className="text-sm hover:text-[var(--color-accent)] transition-colors">
                  &larr; Previous
                </Link>
              ) : <span />}
              <Link href="/collection" className="text-sm text-[var(--color-muted)] hover:text-[var(--color-primary)] transition-colors">
                All Blends
              </Link>
              {nextSlug ? (
                <Link href={`/collection/${nextSlug}`} className="text-sm hover:text-[var(--color-accent)] transition-colors">
                  Next &rarr;
                </Link>
              ) : <span />}
            </nav>
          </div>
        </div>
      </div>

      {/* Sticky mobile buy bar */}
      {blend.price && (
        <StickyBuyBar
          name={blend.name}
          price={blend.price}
          currency={blend.currency || 'CAD'}
        />
      )}
    </article>
  );
}
