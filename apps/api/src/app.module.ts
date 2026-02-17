import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { PrismaModule } from './prisma/prisma.module';
import { ContentModule } from './modules/content/content.module';
import { BookingModule } from './modules/booking/booking.module';
import { FormsModule } from './modules/forms/forms.module';
import { EmailModule } from './modules/email/email.module';
import { WebhookModule } from './modules/webhook/webhook.module';
import { StripeModule } from './modules/stripe/stripe.module';

@Module({
  imports: [
    EventEmitterModule.forRoot(),
    ThrottlerModule.forRoot([{ ttl: 60000, limit: 100 }]),
    PrismaModule,
    ContentModule,
    BookingModule,
    FormsModule,
    EmailModule,
    WebhookModule,
    StripeModule,
  ],
  providers: [
    { provide: APP_GUARD, useClass: ThrottlerGuard },
  ],
})
export class AppModule {}
