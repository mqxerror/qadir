import Link from 'next/link';
import { SealMark } from '@/components/brand/seal-mark';

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-5 text-center">
      <SealMark variant="minimal" size={64} />
      <h1 className="mt-8 mb-4">Page Not Found</h1>
      <p className="text-[var(--color-muted)] max-w-[400px] mb-8">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          href="/"
          className="inline-flex items-center justify-center px-8 py-3 bg-[var(--color-primary)] text-[var(--color-background)] text-sm font-semibold uppercase tracking-[0.04em] rounded-[3px] hover:opacity-85 transition-opacity min-h-[44px]"
        >
          Return Home
        </Link>
        <Link
          href="/collection"
          className="inline-flex items-center justify-center px-8 py-3 border border-[var(--color-primary)] text-[var(--color-primary)] text-sm font-semibold uppercase tracking-[0.04em] rounded-[3px] hover:border-[var(--color-accent)] transition-colors min-h-[44px]"
        >
          View Collection
        </Link>
      </div>
    </div>
  );
}
