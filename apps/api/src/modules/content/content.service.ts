import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class ContentService {
  constructor(private prisma: PrismaService) {}

  async getPageContent(page: string) {
    const record = await this.prisma.pageContent.findUnique({ where: { page } });
    return record?.content || null;
  }

  async getAllBlends() {
    const blends = await this.prisma.blend.findMany({
      orderBy: { sortOrder: 'asc' },
    });
    return blends.map(({ olfactiveProfile, description, meaning, ...rest }) => rest);
  }

  async getBlendBySlug(slug: string) {
    return this.prisma.blend.findUnique({ where: { slug } });
  }
}
