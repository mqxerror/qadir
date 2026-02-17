import { z } from 'zod';

export const OrderStatus = {
  PENDING: 'PENDING',
  PAID: 'PAID',
  SHIPPED: 'SHIPPED',
  DELIVERED: 'DELIVERED',
  CANCELLED: 'CANCELLED',
} as const;
export type OrderStatus = (typeof OrderStatus)[keyof typeof OrderStatus];

export const OrderItemSchema = z.object({
  id: z.string().uuid(),
  orderId: z.string().uuid(),
  blendId: z.string().uuid(),
  quantity: z.number().int().positive(),
  unitCents: z.number().int(),
});

export const OrderSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  name: z.string().nullable().optional(),
  status: z.string(),
  totalCents: z.number().int(),
  currency: z.string().default('CAD'),
  stripePaymentId: z.string().nullable().optional(),
  stripeSessionId: z.string().nullable().optional(),
  items: z.array(OrderItemSchema).optional(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export const CreatePaymentIntentInput = z.object({
  blendId: z.string().uuid(),
  quantity: z.number().int().positive(),
  email: z.string().email(),
  name: z.string().optional(),
});

export const CreateCheckoutInput = z.object({
  blendId: z.string().uuid(),
  quantity: z.number().int().positive(),
  successUrl: z.string().url(),
  cancelUrl: z.string().url(),
});

export type OrderItem = z.infer<typeof OrderItemSchema>;
export type Order = z.infer<typeof OrderSchema>;
export type CreatePaymentIntentInput = z.infer<typeof CreatePaymentIntentInput>;
export type CreateCheckoutInput = z.infer<typeof CreateCheckoutInput>;
