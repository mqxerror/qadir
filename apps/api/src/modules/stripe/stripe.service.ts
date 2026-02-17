import { Injectable, Logger, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import Stripe from 'stripe';

@Injectable()
export class StripeService {
  private readonly logger = new Logger(StripeService.name);
  private stripe: Stripe;

  constructor(private prisma: PrismaService) {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
      apiVersion: '2025-02-24.acacia',
    });
  }

  async createPaymentIntent(input: {
    blendId: string;
    quantity: number;
    email: string;
    name?: string;
  }) {
    const blend = await this.prisma.blend.findUnique({ where: { id: input.blendId } });
    if (!blend || !blend.price) {
      throw new BadRequestException('Product not found or not available for purchase');
    }

    const totalCents = blend.price * input.quantity;

    const order = await this.prisma.order.create({
      data: {
        email: input.email,
        name: input.name,
        status: 'PENDING',
        totalCents,
        currency: blend.currency || 'CAD',
        items: {
          create: {
            blendId: blend.id,
            quantity: input.quantity,
            unitCents: blend.price,
          },
        },
      },
    });

    const paymentIntent = await this.stripe.paymentIntents.create({
      amount: totalCents,
      currency: (blend.currency || 'CAD').toLowerCase(),
      metadata: {
        orderId: order.id,
        blendId: blend.id,
        blendName: blend.name,
      },
    });

    await this.prisma.order.update({
      where: { id: order.id },
      data: { stripePaymentId: paymentIntent.id },
    });

    return {
      clientSecret: paymentIntent.client_secret,
      orderId: order.id,
      amount: totalCents,
      currency: blend.currency || 'CAD',
    };
  }

  async createCheckoutSession(input: {
    blendId: string;
    quantity: number;
    successUrl: string;
    cancelUrl: string;
  }) {
    const blend = await this.prisma.blend.findUnique({ where: { id: input.blendId } });
    if (!blend || !blend.price) {
      throw new BadRequestException('Product not found or not available for purchase');
    }

    const order = await this.prisma.order.create({
      data: {
        email: 'pending@checkout.stripe',
        status: 'PENDING',
        totalCents: blend.price * input.quantity,
        currency: blend.currency || 'CAD',
        items: {
          create: {
            blendId: blend.id,
            quantity: input.quantity,
            unitCents: blend.price,
          },
        },
      },
    });

    const session = await this.stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: (blend.currency || 'CAD').toLowerCase(),
            product_data: {
              name: `QADIR ${blend.name}`,
              description: blend.role,
            },
            unit_amount: blend.price,
          },
          quantity: input.quantity,
        },
      ],
      mode: 'payment',
      success_url: `${input.successUrl}?orderId=${order.id}`,
      cancel_url: input.cancelUrl,
      metadata: { orderId: order.id },
    });

    await this.prisma.order.update({
      where: { id: order.id },
      data: { stripeSessionId: session.id },
    });

    return { sessionUrl: session.url, orderId: order.id };
  }

  async handleWebhook(payload: Buffer, signature: string) {
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    if (!webhookSecret) {
      this.logger.warn('Stripe webhook secret not configured');
      return;
    }

    let event: Stripe.Event;
    try {
      event = this.stripe.webhooks.constructEvent(payload, signature, webhookSecret);
    } catch (err: any) {
      this.logger.error(`Webhook signature verification failed: ${err.message}`);
      throw new BadRequestException('Invalid webhook signature');
    }

    switch (event.type) {
      case 'payment_intent.succeeded': {
        const pi = event.data.object as Stripe.PaymentIntent;
        const orderId = pi.metadata.orderId;
        if (orderId) {
          await this.prisma.order.update({
            where: { id: orderId },
            data: { status: 'PAID' },
          });
          this.logger.log(`Order ${orderId} marked as PAID`);
        }
        break;
      }
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        const orderId = session.metadata?.orderId;
        if (orderId) {
          await this.prisma.order.update({
            where: { id: orderId },
            data: {
              status: 'PAID',
              email: session.customer_details?.email || 'unknown',
              name: session.customer_details?.name,
            },
          });
          this.logger.log(`Order ${orderId} marked as PAID via Checkout`);
        }
        break;
      }
      default:
        this.logger.log(`Unhandled event type: ${event.type}`);
    }
  }

  async getOrder(id: string) {
    return this.prisma.order.findUnique({
      where: { id },
      include: { items: { include: { blend: true } } },
    });
  }
}
