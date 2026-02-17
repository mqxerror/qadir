import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { WebhookService } from './webhook.service';

@Controller('admin/webhooks')
export class WebhookController {
  constructor(private readonly webhookService: WebhookService) {}

  @Get()
  async findAll() { return { data: await this.webhookService.findAll() }; }

  @Post()
  async create(@Body() body: { event: string; url: string; active?: boolean }) {
    return { data: await this.webhookService.create(body) };
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() body: Partial<{ url: string; active: boolean }>) {
    return { data: await this.webhookService.update(id, body) };
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    await this.webhookService.delete(id);
    return { data: { deleted: true } };
  }
}
