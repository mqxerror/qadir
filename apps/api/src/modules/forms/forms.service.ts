import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class FormsService {
  constructor(
    private prisma: PrismaService,
    private eventEmitter: EventEmitter2,
  ) {}

  async createContact(input: { name: string; email: string; subject: string; message: string; honeypot?: string }) {
    if (input.honeypot) return { id: crypto.randomUUID(), type: 'CONTACT', status: 'received' };

    const subjectToType: Record<string, string> = { Press: 'PRESS', Wholesale: 'WHOLESALE' };
    const type = subjectToType[input.subject] || 'CONTACT';

    const submission = await this.prisma.formSubmission.create({
      data: {
        type,
        name: input.name,
        email: input.email,
        subject: input.subject,
        message: input.message,
      },
    });

    this.eventEmitter.emit('form.submitted', submission);
    if (type === 'WHOLESALE') this.eventEmitter.emit('lead.received', submission);
    return { id: submission.id, type: submission.type, status: 'received' };
  }

  async createVip(input: { name: string; email: string; message: string; honeypot?: string }) {
    if (input.honeypot) return { id: crypto.randomUUID(), type: 'VIP', status: 'received' };

    const submission = await this.prisma.formSubmission.create({
      data: {
        type: 'VIP',
        name: input.name,
        email: input.email,
        message: input.message,
      },
    });

    this.eventEmitter.emit('form.submitted', submission);
    this.eventEmitter.emit('lead.received', submission);
    return { id: submission.id, type: submission.type, status: 'received' };
  }

  async findAll() {
    return this.prisma.formSubmission.findMany({ orderBy: { createdAt: 'desc' } });
  }
}
