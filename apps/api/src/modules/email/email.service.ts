import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);

  @OnEvent('booking.created')
  handleBookingCreated(payload: any) {
    this.logger.log(`[EMAIL] Booking confirmation → ${payload.email} | ${payload.type} on ${payload.date} at ${payload.time}`);
    this.logger.log(`[EMAIL] Booking notification → founder | New booking from ${payload.name}`);
  }

  @OnEvent('form.submitted')
  handleFormSubmitted(payload: any) {
    this.logger.log(`[EMAIL] Form routing → founder | ${payload.type} from ${payload.name} (${payload.email})`);
  }
}
