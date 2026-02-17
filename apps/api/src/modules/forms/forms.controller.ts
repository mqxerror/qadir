import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { FormsService } from './forms.service';
import { CreateContactSchema, CreateVipSchema } from '@qadir/shared-types';

@Controller('forms')
export class FormsController {
  constructor(private readonly formsService: FormsService) {}

  @Post('contact')
  createContact(@Body() body: any) {
    const result = CreateContactSchema.safeParse(body);
    if (!result.success) {
      throw new BadRequestException({
        error: { code: 'VALIDATION_ERROR', message: 'Invalid input', details: result.error.errors },
      });
    }
    return { data: this.formsService.createContact(result.data) };
  }

  @Post('vip')
  createVip(@Body() body: any) {
    const result = CreateVipSchema.safeParse(body);
    if (!result.success) {
      throw new BadRequestException({
        error: { code: 'VALIDATION_ERROR', message: 'Invalid input', details: result.error.errors },
      });
    }
    return { data: this.formsService.createVip(result.data) };
  }
}
