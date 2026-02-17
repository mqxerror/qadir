'use client';

import { useState } from 'react';
import { fetchApi } from '@/lib/api';
import { CreateAppointmentSchema } from '@qadir/shared-types';

type Step = 1 | 2 | 3;

interface AvailabilityData {
  dates?: { date: string; slots: string[] }[];
  date?: string;
  slots?: string[];
}

export function BookingFlow() {
  const [step, setStep] = useState<Step>(1);
  const [type, setType] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [availability, setAvailability] = useState<AvailabilityData | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const loadAvailability = async (date?: string) => {
    try {
      const url = date ? `/appointments/availability?date=${date}` : '/appointments/availability';
      const res = await fetchApi<{ data: AvailabilityData }>(url);
      setAvailability(res.data);
    } catch {
      setError('Could not load availability. Please try again.');
    }
  };

  const handleNext = async () => {
    if (step === 1 && type) {
      await loadAvailability();
      setStep(2);
    } else if (step === 2 && selectedDate && selectedTime) {
      setStep(3);
    }
  };

  const handleBack = () => {
    setError('');
    setFieldErrors({});
    if (step === 2) setStep(1);
    if (step === 3) setStep(2);
  };

  const handleSubmit = async () => {
    setFieldErrors({});
    setError('');

    const input = { type, date: selectedDate, time: selectedTime, name, email, message: message || undefined };
    const validation = CreateAppointmentSchema.safeParse(input);

    if (!validation.success) {
      const errors: Record<string, string> = {};
      validation.error.errors.forEach((e) => {
        if (e.path[0]) errors[String(e.path[0])] = e.message;
      });
      setFieldErrors(errors);
      return;
    }

    setSubmitting(true);
    try {
      await fetchApi('/appointments', { method: 'POST', body: JSON.stringify(input) });
      setSuccess(true);
    } catch (err: any) {
      setError(err.message || 'We couldn\'t process that. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDateSelect = async (date: string) => {
    setSelectedDate(date);
    setSelectedTime('');
    await loadAvailability(date);
  };

  if (success) {
    return (
      <div className="text-center py-[var(--spacing-8)]">
        <div className="text-[var(--color-success)] text-2xl mb-4">&#10003;</div>
        <h3 className="mb-4">Booking Confirmed</h3>
        <p className="text-[var(--color-primary)] opacity-80">
          {type === 'IN_STORE_CONSULTATION' ? 'In-Store Consultation' : 'Private Discovery Session'} on {selectedDate} at {selectedTime}
        </p>
        <p className="text-sm text-[var(--color-muted)] mt-4">A confirmation has been sent to {email}.</p>
      </div>
    );
  }

  return (
    <div className="max-w-[520px] mx-auto">
      {/* Step indicator */}
      <div className="flex items-center justify-center gap-4 mb-[var(--spacing-7)]">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex items-center gap-2">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                s < step ? 'bg-[var(--color-primary)] text-[var(--color-background)]'
                : s === step ? 'border-2 border-[var(--color-primary)] text-[var(--color-primary)]'
                : 'border border-[var(--color-muted)] text-[var(--color-muted)]'
              }`}
              aria-current={s === step ? 'step' : undefined}
            >
              {s < step ? '\u2713' : s}
            </div>
            {s < 3 && <div className="w-12 h-px bg-[var(--color-muted)]" />}
          </div>
        ))}
      </div>

      {/* Step 1: Select Type */}
      {step === 1 && (
        <div className="space-y-4">
          <h3 className="text-center mb-[var(--spacing-5)]">Select Appointment Type</h3>
          {[
            { value: 'IN_STORE_CONSULTATION', label: 'In-Store Fragrance Consultation', desc: 'Explore our Signature Collection with personal guidance.' },
            { value: 'PRIVATE_DISCOVERY', label: 'Private Discovery Session', desc: 'An intimate experience tailored to your preferences.' },
          ].map((opt) => (
            <button
              key={opt.value}
              onClick={() => setType(opt.value)}
              className={`w-full text-left p-5 border rounded-[3px] transition-colors ${
                type === opt.value ? 'border-[var(--color-primary)] bg-[var(--color-surface)]' : 'border-[var(--color-muted)] hover:border-[var(--color-accent)]'
              }`}
            >
              <div className="font-medium">{opt.label}</div>
              <div className="text-sm text-[var(--color-muted)] mt-1">{opt.desc}</div>
            </button>
          ))}
          <button
            onClick={handleNext}
            disabled={!type}
            className="w-full mt-[var(--spacing-5)] py-3 bg-[var(--color-primary)] text-[var(--color-background)] text-sm font-semibold uppercase tracking-[0.04em] rounded-[3px] disabled:bg-[var(--color-muted)] disabled:cursor-not-allowed hover:opacity-85 transition-opacity min-h-[44px]"
          >
            Continue
          </button>
        </div>
      )}

      {/* Step 2: Select Date & Time */}
      {step === 2 && (
        <div className="space-y-4">
          <h3 className="text-center mb-[var(--spacing-5)]">Select Date & Time</h3>
          {availability?.dates && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-[var(--spacing-5)]">
              {availability.dates.slice(0, 12).map((d) => (
                <button
                  key={d.date}
                  onClick={() => handleDateSelect(d.date)}
                  disabled={d.slots.length === 0}
                  className={`p-3 border rounded-[3px] text-sm transition-colors ${
                    selectedDate === d.date ? 'border-[var(--color-primary)] bg-[var(--color-surface)] font-medium'
                    : d.slots.length === 0 ? 'border-[var(--color-muted)] text-[var(--color-muted)] cursor-not-allowed'
                    : 'border-[var(--color-muted)] hover:border-[var(--color-accent)]'
                  }`}
                >
                  {new Date(d.date + 'T12:00:00').toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                </button>
              ))}
            </div>
          )}
          {selectedDate && availability?.slots && (
            <div>
              <p className="text-sm text-[var(--color-muted)] mb-3">Available times:</p>
              <div className="grid grid-cols-4 gap-2">
                {availability.slots.map((slot) => (
                  <button
                    key={slot}
                    onClick={() => setSelectedTime(slot)}
                    className={`p-2 border rounded-[3px] text-sm transition-colors ${
                      selectedTime === slot ? 'border-[var(--color-primary)] bg-[var(--color-surface)] font-medium' : 'border-[var(--color-muted)] hover:border-[var(--color-accent)]'
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>
          )}
          <div className="flex gap-3 mt-[var(--spacing-5)]">
            <button onClick={handleBack} className="flex-1 py-3 border border-[var(--color-primary)] text-sm font-semibold uppercase tracking-[0.04em] rounded-[3px] min-h-[44px]">Back</button>
            <button
              onClick={handleNext}
              disabled={!selectedDate || !selectedTime}
              className="flex-1 py-3 bg-[var(--color-primary)] text-[var(--color-background)] text-sm font-semibold uppercase tracking-[0.04em] rounded-[3px] disabled:bg-[var(--color-muted)] disabled:cursor-not-allowed hover:opacity-85 transition-opacity min-h-[44px]"
            >
              Continue
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Contact Info */}
      {step === 3 && (
        <div className="space-y-4">
          <h3 className="text-center mb-[var(--spacing-5)]">Your Details</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Name <span className="text-[var(--color-error)]">*</span></label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.currentTarget.value)}
                className="w-full h-[44px] px-4 border border-[var(--color-muted)] rounded-[3px] bg-[var(--color-surface)] focus:outline-none focus:border-[var(--color-focus)] focus:ring-2 focus:ring-[var(--color-focus)]/20"
                aria-required="true"
              />
              {fieldErrors.name && <p className="text-sm text-[var(--color-error)] mt-1">{fieldErrors.name}</p>}
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
              {fieldErrors.email && <p className="text-sm text-[var(--color-error)] mt-1">{fieldErrors.email}</p>}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Message <span className="text-xs text-[var(--color-muted)]">(optional)</span></label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.currentTarget.value)}
              rows={3}
              className="w-full px-4 py-3 border border-[var(--color-muted)] rounded-[3px] bg-[var(--color-surface)] focus:outline-none focus:border-[var(--color-focus)] focus:ring-2 focus:ring-[var(--color-focus)]/20 resize-none"
            />
          </div>
          {error && <p className="text-sm text-[var(--color-error)]">{error}</p>}
          <div className="flex gap-3 mt-[var(--spacing-5)]">
            <button onClick={handleBack} className="flex-1 py-3 border border-[var(--color-primary)] text-sm font-semibold uppercase tracking-[0.04em] rounded-[3px] min-h-[44px]">Back</button>
            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="flex-1 py-3 bg-[var(--color-primary)] text-[var(--color-background)] text-sm font-semibold uppercase tracking-[0.04em] rounded-[3px] disabled:bg-[var(--color-muted)] disabled:cursor-not-allowed hover:opacity-85 transition-opacity min-h-[44px]"
            >
              {submitting ? 'Booking...' : 'Confirm Booking'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
