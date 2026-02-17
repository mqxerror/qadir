import Image from 'next/image';
import { HeroSection } from '@/components/brand/hero-section';
import { BlendCard } from '@/components/brand/blend-card';
import { RevealOnScroll } from '@/components/ui/reveal-on-scroll';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/v1';

async function getHomeContent() {
  try {
    const res = await fetch(`${API_BASE}/content/home`, { next: { revalidate: 3600 } });
    if (!res.ok) return null;
    const data: any = await res.json();
    return data.data;
  } catch {
    return null;
  }
}

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

export default async function HomePage() {
  const [content, blends] = await Promise.all([getHomeContent(), getBlends()]);

  const hero = content?.hero || {
    headline: 'Modern perfumery rooted in oud tradition. Conceived in Montreal.',
    subtitle: 'Four Signature Blends. Each one a deliberate statement of character.',
    cta_primary: { label: 'Discover the Collection', href: '/collection' },
    cta_secondary: { label: 'Book a Consultation', href: '/appointments' },
  };

  return (
    <>
      <HeroSection
        headline={hero.headline}
        subtitle={hero.subtitle}
        ctaPrimary={hero.cta_primary}
        ctaSecondary={hero.cta_secondary}
      />

      {/* Brand Story */}
      {content?.brandStory && (
        <section className="max-w-[680px] mx-auto px-5 md:px-8 py-[var(--spacing-9)]">
          <RevealOnScroll>
            <h2 className="mb-[var(--spacing-7)]">{content.brandStory.headline}</h2>
          </RevealOnScroll>
          {content.brandStory.sections.map((s: any, i: number) => (
            <RevealOnScroll key={i} delay={i * 0.1}>
              <div className="mb-[var(--spacing-7)]">
                <h3 className="mb-[var(--spacing-4)]">{s.title}</h3>
                <p className="leading-relaxed">{s.body}</p>
              </div>
            </RevealOnScroll>
          ))}
        </section>
      )}

      {/* Store imagery divider with CTA */}
      <RevealOnScroll variant="fade-in">
        <div className="relative h-[40vh] md:h-[50vh] my-[var(--spacing-5)] flex items-center justify-center">
          <Image
            src="/images/store/vip-lounge.webp"
            alt="QADIR Montreal VIP Lounge"
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="relative z-10 text-center px-5">
            <p className="text-sm text-white/70 uppercase tracking-[0.12em] mb-3">Old Montreal</p>
            <h2 className="text-white font-serif text-[32px] md:text-[40px] font-light mb-4">Visit Our Atelier</h2>
            <a
              href="/appointments"
              className="inline-flex items-center justify-center px-8 py-3 border border-white/60 text-white text-sm font-semibold uppercase tracking-[0.04em] rounded-[3px] hover:bg-white/10 transition-colors min-h-[44px]"
            >
              Book a Visit
            </a>
          </div>
        </div>
      </RevealOnScroll>

      {/* Signature Collection Preview */}
      <section className="max-w-[1200px] mx-auto px-5 md:px-8 py-[var(--spacing-9)]">
        <RevealOnScroll>
          <div className="text-center mb-[var(--spacing-8)]">
            <h2>{content?.collectionPreview?.headline || 'The Signature Collection'}</h2>
            <p className="text-[var(--color-muted)] mt-3">{content?.collectionPreview?.subtitle || 'Four blends. Each one a deliberate statement.'}</p>
          </div>
        </RevealOnScroll>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[var(--spacing-6)]">
          {(blends.length > 0 ? blends : [
            { name: 'ASL', slug: 'asl', role: 'Authority', imageUrl: '/images/blends/asl.webp' },
            { name: 'NOOR', slug: 'noor', role: 'Light', imageUrl: '/images/blends/noor.webp' },
            { name: 'HAYBA', slug: 'hayba', role: 'Presence', imageUrl: '/images/blends/hayba.webp' },
            { name: 'MIQDAR', slug: 'miqdar', role: 'Depth', imageUrl: '/images/blends/miqdar.webp' },
          ]).map((blend: any) => (
            <BlendCard key={blend.slug} {...blend} />
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <RevealOnScroll>
        <section className="text-center py-[var(--spacing-10)] px-5">
          <p className="text-xs text-[var(--color-accent)] uppercase tracking-[0.12em] mb-[var(--spacing-4)]">Autorit&eacute; en Essence</p>
          <h2 className="mb-[var(--spacing-5)]">Experience QADIR</h2>
          <p className="text-[var(--color-muted)] max-w-[480px] mx-auto mb-[var(--spacing-7)] leading-relaxed">
            Each fragrance is best understood on skin. We&apos;d welcome the opportunity to introduce you to our Signature Collection in person at our Old Montreal atelier.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="/appointments"
              className="inline-flex items-center justify-center px-8 py-3 bg-[var(--color-primary)] text-[var(--color-background)] text-sm font-semibold uppercase tracking-[0.04em] rounded-[3px] hover:opacity-85 transition-opacity min-h-[44px]"
            >
              Book a Consultation
            </a>
            <a
              href="/collection"
              className="inline-flex items-center justify-center px-8 py-3 border border-[var(--color-border)] text-[var(--color-primary)] text-sm font-semibold uppercase tracking-[0.04em] rounded-[3px] hover:border-[var(--color-accent)] transition-colors min-h-[44px]"
            >
              View the Collection
            </a>
          </div>
        </section>
      </RevealOnScroll>
    </>
  );
}
