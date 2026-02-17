import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import type { NestExpressApplication } from '@nestjs/platform-express';
import { mountAdminJS } from './admin/setup-admin';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    rawBody: true,
  });
  app.setGlobalPrefix('api/v1');
  app.enableCors({
    origin: process.env.CORS_ORIGIN || ['http://localhost:3000', 'http://localhost:3002'],
    credentials: true,
  });

  // Mount AdminJS before listening (registers Express middleware)
  await mountAdminJS(app);

  await app.listen(process.env.PORT || 3001);
  console.log(`API running on port ${process.env.PORT || 3001}`);
}
bootstrap();
