import { z } from 'zod';

export const OlfactiveNoteSchema = z.object({
  category: z.enum(['Top', 'Heart', 'Base']),
  notes: z.array(z.string()),
  description: z.string(),
});

export const BlendSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1),
  slug: z.string().min(1),
  role: z.string().min(1),
  meaning: z.string().min(1),
  description: z.string().min(1),
  olfactiveProfile: z.array(OlfactiveNoteSchema),
  imageUrl: z.string().nullable(),
  sortOrder: z.number().int(),
  price: z.number().nullable().optional(),
  sku: z.string().nullable().optional(),
  inventory: z.number().int().nullable().optional(),
  currency: z.string().nullable().optional(),
  stripeProductId: z.string().nullable().optional(),
  stripePriceId: z.string().nullable().optional(),
});

export type OlfactiveNote = z.infer<typeof OlfactiveNoteSchema>;
export type Blend = z.infer<typeof BlendSchema>;
