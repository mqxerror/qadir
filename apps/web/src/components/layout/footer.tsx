import { SealMark } from '@/components/brand/seal-mark';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t border-[var(--color-border)] mt-[var(--spacing-9)]">
      <div className="max-w-[1200px] mx-auto px-5 md:px-8 py-[var(--spacing-8)]">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-[var(--spacing-7)]">
          {/* Brand */}
          <div className="md:col-span-1">
            <SealMark variant="primary" size={60} />
            <p className="text-xs text-[var(--color-muted)] mt-4 max-w-[200px]">
              Modern perfumery rooted in oud tradition. Conceived in Montreal.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-[0.08em] mb-4">Explore</h4>
            <nav className="flex flex-col gap-2 text-sm text-[var(--color-muted)]">
              <Link href="/collection" className="hover:text-[var(--color-primary)] transition-colors">The Collection</Link>
              <Link href="/about" className="hover:text-[var(--color-primary)] transition-colors">About QADIR</Link>
              <Link href="/appointments" className="hover:text-[var(--color-primary)] transition-colors">Book a Consultation</Link>
            </nav>
          </div>

          {/* Engagement */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-[0.08em] mb-4">Connect</h4>
            <nav className="flex flex-col gap-2 text-sm text-[var(--color-muted)]">
              <Link href="/private" className="hover:text-[var(--color-primary)] transition-colors">Private Access</Link>
              <Link href="/contact" className="hover:text-[var(--color-primary)] transition-colors">Contact</Link>
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-[0.08em] mb-4">Visit</h4>
            <address className="text-sm text-[var(--color-muted)] not-italic leading-relaxed">
              QADIR Montreal<br />
              Old Montreal, QC<br />
              Canada
            </address>
          </div>
        </div>

        <div className="border-t border-[var(--color-border)] mt-[var(--spacing-7)] pt-[var(--spacing-5)] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[var(--color-muted)]">
            &copy; {new Date().getFullYear()} QADIR Montreal. All rights reserved.
          </p>
          <p className="text-xs text-[var(--color-muted)]">
            Autorit&eacute; en Essence
          </p>
        </div>
      </div>
    </footer>
  );
}
