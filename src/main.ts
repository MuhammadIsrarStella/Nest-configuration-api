import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LogRoutesMiddleware } from './middleware/log-routes.middleware';
import { HttpExceptionFilter } from './exceptions/http-exception.filter';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));
  app.use(new LogRoutesMiddleware().use);  
  await app.listen(3000);
}
bootstrap();
