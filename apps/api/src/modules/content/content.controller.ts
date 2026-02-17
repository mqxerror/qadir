import { Controller, Get, Param, NotFoundException } from '@nestjs/common';
import { ContentService } from './content.service';

@Controller()
export class ContentController {
  constructor(private readonly contentService: ContentService) {}

  @Get('content/:page')
  async getPageContent(@Param('page') page: string) {
    const content = await this.contentService.getPageContent(page);
    if (!content) throw new NotFoundException(`Page '${page}' not found`);
    return { data: content };
  }

  @Get('blends')
  async getAllBlends() {
    const blends = await this.contentService.getAllBlends();
    return { data: blends, meta: { total: blends.length } };
  }

  @Get('blends/:slug')
  async getBlendBySlug(@Param('slug') slug: string) {
    const blend = await this.contentService.getBlendBySlug(slug);
    if (!blend) throw new NotFoundException(`Blend '${slug}' not found`);
    return { data: blend };
  }

  @Get('health')
  health() {
    return { status: 'ok', timestamp: new Date().toISOString() };
  }
}
