import { z } from 'zod';

export const AppointmentType = z.enum(['IN_STORE_CONSULTATION', 'PRIVATE_DISCOVERY']);
export const AppointmentStatus = z.enum(['PENDING', 'CONFIRMED', 'CANCELLED']);

export const CreateAppointmentSchema = z.object({
  type: AppointmentType,
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be YYYY-MM-DD format'),
  time: z.string().regex(/^\d{2}:\d{2}$/, 'Time must be HH:MM format'),
  name: z.string().min(1, 'Name is required').max(100),
  email: z.string().email('Please provide a valid email address'),
  message: z.string().max(1000).optional(),
});

export const AppointmentSchema = z.object({
  id: z.string().uuid(),
  type: AppointmentType,
  date: z.string(),
  time: z.string(),
  name: z.string(),
  email: z.string().email(),
  message: z.string().nullable(),
  status: AppointmentStatus,
  clientId: z.string().nullable().optional(),
  createdAt: z.string(),
});

export type CreateAppointmentInput = z.infer<typeof CreateAppointmentSchema>;
export type Appointment = z.infer<typeof AppointmentSchema>;
