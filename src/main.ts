import { NestFactory } from '@nestjs/core';
import { OwnerModule } from './owner.module';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(OwnerModule);
  await app.listen(3000);
}
bootstrap();
