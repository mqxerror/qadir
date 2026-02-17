import type { Metadata } from 'next';
import { BookingFlow } from '@/components/booking/booking-flow';

export const metadata: Metadata = {
  title: 'Book a Consultation',
  description: 'Schedule an in-store fragrance consultation or private discovery session at QADIR Montreal.',
};

export default function AppointmentsPage() {
  return (
    <div className="pt-[var(--spacing-10)]">
      <div className="max-w-[680px] mx-auto px-5 md:px-8">
        <div className="text-center mb-[var(--spacing-8)]">
          <h1 className="mb-[var(--spacing-4)]">Book a Consultation</h1>
          <p className="text-lg text-[var(--color-primary)] opacity-80">
            We&apos;d welcome the opportunity to introduce you to our Signature Collection in person.
          </p>
        </div>
        <BookingFlow />
      </div>
    </div>
  );
}
