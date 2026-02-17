import type { Metadata } from 'next';
import Image from 'next/image';
import { RevealOnScroll } from '@/components/ui/reveal-on-scroll';

export const metadata: Metadata = { title: 'About' };

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/v1';

async function getAboutContent() {
  try {
    const res = await fetch(`${API_BASE}/content/about`, { next: { revalidate: 3600 } });
    if (!res.ok) return null;
    const data: any = await res.json();
    return data.data;
  } catch {
    return null;
  }
}

export default async function AboutPage() {
  const content = await getAboutContent();

  const sections = content ? [
    content.origin,
    content.founder,
    content.philosophy,
  ] : [
    { title: 'Our Origin', body: 'QADIR was born in Montreal — a city that understands the power of measured expression. In a market saturated with mass-produced fragrances and loud marketing, we chose a different path: restraint, precision, and the confidence to let quality speak without amplification.' },
    { title: 'The Founder', body: 'Our founder\'s journey began with the scent of oud in family gatherings — raw, uncompromising, impossibly rich. Years later, surrounded by Montreal\'s minimalist design culture, a question formed: what happens when you apply restraint to one of the world\'s most complex fragrance traditions?' },
    { title: 'Our Philosophy', body: 'Luxury is not decoration. It is the confidence to present less, knowing that what remains is exceptional. Our fragrances are conceived as a collection — not individual products competing for attention, but four voices in deliberate conversation.' },
  ];

  return (
    <article className="pt-[var(--spacing-10)]">
      <div className="max-w-[680px] mx-auto px-5 md:px-8">
        <RevealOnScroll>
          <h1 className="mb-[var(--spacing-8)]">{content?.hero?.headline || 'About QADIR Montreal'}</h1>
        </RevealOnScroll>
        {content?.hero?.subtitle && (
          <RevealOnScroll delay={0.1}>
            <p className="text-lg text-[var(--color-primary)] opacity-80 mb-[var(--spacing-9)]">{content.hero.subtitle}</p>
          </RevealOnScroll>
        )}

        {/* First section */}
        <RevealOnScroll>
          <section className="mb-[var(--spacing-9)]">
            <h2 className="mb-[var(--spacing-5)]">{sections[0].title}</h2>
            {sections[0].body.split('\n\n').map((paragraph: string, j: number) => (
              <p key={j} className="leading-relaxed mb-[var(--spacing-4)]">{paragraph}</p>
            ))}
          </section>
        </RevealOnScroll>
      </div>

      {/* Store image break */}
      <RevealOnScroll variant="fade-in">
        <div className="relative h-[40vh] md:h-[50vh] my-[var(--spacing-5)]">
          <Image
            src="/images/store/boutique.webp"
            alt="QADIR Montreal Boutique"
            fill
            className="object-cover"
            sizes="100vw"
          />
        </div>
      </RevealOnScroll>

      <div className="max-w-[680px] mx-auto px-5 md:px-8">
        {sections.slice(1).map((section: any, i: number) => (
          <RevealOnScroll key={i}>
            <section className="mb-[var(--spacing-9)]">
              <h2 className="mb-[var(--spacing-5)]">{section.title}</h2>
              {section.body.split('\n\n').map((paragraph: string, j: number) => (
                <p key={j} className="leading-relaxed mb-[var(--spacing-4)]">{paragraph}</p>
              ))}
            </section>
          </RevealOnScroll>
        ))}
      </div>
    </article>
  );
}
