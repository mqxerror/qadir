import type { Metadata } from 'next';
import { ContactForm } from '@/components/forms/contact-form';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with QADIR Montreal for inquiries, press, or wholesale partnerships.',
};

export default function ContactPage() {
  return (
    <div className="pt-[var(--spacing-10)]">
      <div className="max-w-[680px] mx-auto px-5 md:px-8">
        <h1 className="mb-[var(--spacing-4)]">Contact</h1>
        <p className="text-lg text-[var(--color-primary)] opacity-80 mb-[var(--spacing-8)]">
          We respond to every inquiry personally.
        </p>
        <ContactForm />
      </div>
    </div>
  );
}
