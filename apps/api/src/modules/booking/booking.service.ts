import { Injectable, ConflictException } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class BookingService {
  constructor(
    private prisma: PrismaService,
    private eventEmitter: EventEmitter2,
  ) {}

  async getAvailability(date?: string) {
    const slots = ['10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'];

    if (date) {
      const booked = await this.prisma.appointment.findMany({
        where: { date, status: { in: ['PENDING', 'CONFIRMED'] } },
        select: { time: true },
      });
      const bookedTimes = booked.map((a) => a.time);
      return { date, slots: slots.filter((s) => !bookedTimes.includes(s)) };
    }

    const dates: { date: string; slots: string[] }[] = [];
    const now = new Date();
    for (let i = 1; i <= 14; i++) {
      const d = new Date(now);
      d.setDate(d.getDate() + i);
      if (d.getDay() === 0) continue;
      const dateStr = d.toISOString().split('T')[0];
      const booked = await this.prisma.appointment.findMany({
        where: { date: dateStr, status: { in: ['PENDING', 'CONFIRMED'] } },
        select: { time: true },
      });
      const bookedTimes = booked.map((a) => a.time);
      dates.push({ date: dateStr, slots: slots.filter((s) => !bookedTimes.includes(s)) });
    }
    return { dates };
  }

  async create(input: { type: string; date: string; time: string; name: string; email: string; message?: string }) {
    const existing = await this.prisma.appointment.findFirst({
      where: { date: input.date, time: input.time, status: { in: ['PENDING', 'CONFIRMED'] } },
    });
    if (existing) {
      throw new ConflictException('This time slot is no longer available');
    }

    const appointment = await this.prisma.appointment.create({
      data: {
        type: input.type,
        date: input.date,
        time: input.time,
        name: input.name,
        email: input.email,
        message: input.message || null,
        status: 'PENDING',
      },
    });

    this.eventEmitter.emit('booking.created', appointment);
    return appointment;
  }

  async findAll() {
    return this.prisma.appointment.findMany({ orderBy: { createdAt: 'desc' } });
  }

  async findById(id: string) {
    return this.prisma.appointment.findUnique({ where: { id } });
  }

  async updateStatus(id: string, status: string) {
    const appointment = await this.prisma.appointment.findUnique({ where: { id } });
    if (!appointment) return null;

    const updated = await this.prisma.appointment.update({
      where: { id },
      data: { status },
    });

    if (status === 'CONFIRMED') this.eventEmitter.emit('booking.confirmed', updated);
    if (status === 'CANCELLED') this.eventEmitter.emit('booking.cancelled', updated);
    return updated;
  }
}
