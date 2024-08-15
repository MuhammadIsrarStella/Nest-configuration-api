import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LogRoutesMiddleware } from './middleware/log-routes.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(new LogRoutesMiddleware().use);  // Apply the logging middleware

  await app.listen(3000);
}
bootstrap();
