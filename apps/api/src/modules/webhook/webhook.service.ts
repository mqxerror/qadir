import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class WebhookService {
  private readonly logger = new Logger(WebhookService.name);

  constructor(private prisma: PrismaService) {}

  @OnEvent('booking.created')
  @OnEvent('booking.confirmed')
  @OnEvent('booking.cancelled')
  @OnEvent('form.submitted')
  @OnEvent('lead.received')
  async handleEvent(payload: any) {
    this.logger.log(`[WEBHOOK] Event dispatched: ${JSON.stringify({ data: payload }).substring(0, 100)}...`);
  }

  async findAll() {
    return this.prisma.webhookConfig.findMany();
  }

  async create(input: { event: string; url: string; active?: boolean }) {
    return this.prisma.webhookConfig.create({
      data: {
        event: input.event,
        url: input.url,
        active: input.active ?? true,
      },
    });
  }

  async update(id: string, input: Partial<{ url: string; active: boolean }>) {
    const config = await this.prisma.webhookConfig.findUnique({ where: { id } });
    if (!config) return null;
    return this.prisma.webhookConfig.update({
      where: { id },
      data: input,
    });
  }

  async delete(id: string) {
    try {
      await this.prisma.webhookConfig.delete({ where: { id } });
      return true;
    } catch {
      return false;
    }
  }
}
