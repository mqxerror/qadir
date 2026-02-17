export function BlendCardSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="aspect-[3/4] bg-[var(--color-muted)]/20 mb-[var(--spacing-4)] rounded-[var(--radius-sm)]" />
      <div className="h-8 bg-[var(--color-muted)]/20 rounded w-24 mb-2" />
      <div className="h-4 bg-[var(--color-muted)]/15 rounded w-16" />
    </div>
  );
}
