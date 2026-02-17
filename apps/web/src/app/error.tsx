'use client';

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-5">
      <h1 className="text-[var(--color-error)] mb-4">Something went wrong</h1>
      <p className="text-[var(--color-primary)] opacity-80 mb-6 max-w-[480px]">
        We couldn&apos;t load this page. Please try again.
      </p>
      <button
        onClick={reset}
        className="px-8 py-3 border border-[var(--color-primary)] text-sm font-semibold uppercase tracking-[0.04em] rounded-[3px] hover:border-[var(--color-accent)] transition-colors min-h-[44px]"
      >
        Try Again
      </button>
    </div>
  );
}
