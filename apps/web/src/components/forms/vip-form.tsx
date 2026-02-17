'use client';

import { useState } from 'react';
import { fetchApi } from '@/lib/api';
import { CreateVipSchema } from '@qadir/shared-types';

export function VipForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFieldErrors({});
    setError('');

    const input = { name, email, message, honeypot };
    const validation = CreateVipSchema.safeParse(input);
    if (!validation.success) {
      const errors: Record<string, string> = {};
      validation.error.errors.forEach((err) => {
        if (err.path[0]) errors[String(err.path[0])] = err.message;
      });
      setFieldErrors(errors);
      return;
    }

    setSubmitting(true);
    try {
      await fetchApi('/forms/vip', { method: 'POST', body: JSON.stringify(input) });
      setSuccess(true);
    } catch (err: any) {
      setError(err.message || 'We couldn\'t process that. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="text-center py-[var(--spacing-7)]">
        <div className="text-[var(--color-success)] text-2xl mb-4">&#10003;</div>
        <p className="text-lg">Your inquiry has been noted. Expect a personal response.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-[480px] space-y-[var(--spacing-5)]">
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <input type="text" name="website" value={honeypot} onChange={(e) => setHoneypot(e.currentTarget.value)} tabIndex={-1} autoComplete="off" />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Name <span className="text-[var(--color-error)]">*</span></label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.currentTarget.value)}
          className="w-full h-[44px] px-4 border border-[var(--color-muted)] rounded-[3px] bg-[var(--color-surface)] focus:outline-none focus:border-[var(--color-focus)] focus:ring-2 focus:ring-[var(--color-focus)]/20"
          aria-required="true"
        />
        {fieldErrors.name && <p className="text-sm text-[var(--color-error)] mt-1" role="alert">{fieldErrors.name}</p>}
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Email <span className="text-[var(--color-error)]">*</span></label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.currentTarget.value)}
          className="w-full h-[44px] px-4 border border-[var(--color-muted)] rounded-[3px] bg-[var(--color-surface)] focus:outline-none focus:border-[var(--color-focus)] focus:ring-2 focus:ring-[var(--color-focus)]/20"
          aria-required="true"
        />
        {fieldErrors.email && <p className="text-sm text-[var(--color-error)] mt-1" role="alert">{fieldErrors.email}</p>}
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Message <span className="text-[var(--color-error)]">*</span></label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.currentTarget.value)}
          rows={4}
          className="w-full px-4 py-3 border border-[var(--color-muted)] rounded-[3px] bg-[var(--color-surface)] focus:outline-none focus:border-[var(--color-focus)] focus:ring-2 focus:ring-[var(--color-focus)]/20 resize-none"
          aria-required="true"
        />
        {fieldErrors.message && <p className="text-sm text-[var(--color-error)] mt-1" role="alert">{fieldErrors.message}</p>}
      </div>
      {error && <p className="text-sm text-[var(--color-error)]" role="alert">{error}</p>}
      <button
        type="submit"
        disabled={submitting}
        className="w-full px-8 py-3 bg-[var(--color-primary)] text-[var(--color-background)] text-sm font-semibold uppercase tracking-[0.04em] rounded-[3px] disabled:bg-[var(--color-muted)] disabled:cursor-not-allowed hover:opacity-85 transition-opacity min-h-[44px]"
      >
        {submitting ? 'Sending...' : 'Submit'}
      </button>
    </form>
  );
}
