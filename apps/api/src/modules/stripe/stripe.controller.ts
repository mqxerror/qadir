import { Controller, Post, Get, Body, Param, Req, Headers, BadRequestException, NotFoundException } from '@nestjs/common';
import { StripeService } from './stripe.service';

@Controller('payments')
export class StripeController {
  constructor(private readonly stripeService: StripeService) {}

  @Post('create-intent')
  async createPaymentIntent(
    @Body() body: { blendId: string; quantity: number; email: string; name?: string },
  ) {
    if (!body.blendId || !body.quantity || !body.email) {
      throw new BadRequestException('blendId, quantity, and email are required');
    }
    const result = await this.stripeService.createPaymentIntent(body);
    return { data: result };
  }

  @Post('create-checkout')
  async createCheckoutSession(
    @Body() body: { blendId: string; quantity: number; successUrl: string; cancelUrl: string },
  ) {
    if (!body.blendId || !body.quantity || !body.successUrl || !body.cancelUrl) {
      throw new BadRequestException('blendId, quantity, successUrl, and cancelUrl are required');
    }
    const result = await this.stripeService.createCheckoutSession(body);
    return { data: result };
  }

  @Post('webhook')
  async handleWebhook(
    @Req() req: any,
    @Headers('stripe-signature') signature: string,
  ) {
    const rawBody = (req as any).rawBody;
    if (!rawBody) {
      throw new BadRequestException('Raw body not available');
    }
    await this.stripeService.handleWebhook(rawBody, signature);
    return { received: true };
  }

  @Get('order/:id')
  async getOrder(@Param('id') id: string) {
    const order = await this.stripeService.getOrder(id);
    if (!order) throw new NotFoundException('Order not found');
    return { data: order };
  }
}
