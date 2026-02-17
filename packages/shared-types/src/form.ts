import { z } from 'zod';

export const FormType = z.enum(['CONTACT', 'VIP', 'PRESS', 'WHOLESALE']);
export const ContactSubject = z.enum(['General', 'Press', 'Wholesale']);

export const CreateContactSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  email: z.string().email('Please provide a valid email address'),
  subject: ContactSubject,
  message: z.string().min(1, 'Message is required').max(2000),
  honeypot: z.string().max(0).optional(),
});

export const CreateVipSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  email: z.string().email('Please provide a valid email address'),
  message: z.string().min(1, 'Message is required').max(2000),
  honeypot: z.string().max(0).optional(),
});

export const FormSubmissionSchema = z.object({
  id: z.string().uuid(),
  type: FormType,
  name: z.string(),
  email: z.string().email(),
  subject: z.string().nullable(),
  message: z.string(),
  clientId: z.string().nullable().optional(),
  createdAt: z.string(),
});

export type CreateContactInput = z.infer<typeof CreateContactSchema>;
export type CreateVipInput = z.infer<typeof CreateVipSchema>;
export type FormSubmission = z.infer<typeof FormSubmissionSchema>;
