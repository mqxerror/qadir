import { Controller, Get, Post, Body, Query, BadRequestException } from '@nestjs/common';
import { BookingService } from './booking.service';
import { CreateAppointmentSchema } from '@qadir/shared-types';

@Controller('appointments')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Get('availability')
  async getAvailability(@Query('date') date?: string) {
    return { data: await this.bookingService.getAvailability(date) };
  }

  @Post()
  async create(@Body() body: any) {
    const result = CreateAppointmentSchema.safeParse(body);
    if (!result.success) {
      throw new BadRequestException({
        error: { code: 'VALIDATION_ERROR', message: 'Invalid input', details: result.error.errors },
      });
    }
    const appointment = await this.bookingService.create(result.data);
    return { data: { id: appointment.id, type: appointment.type, date: appointment.date, time: appointment.time, status: appointment.status } };
  }
}
