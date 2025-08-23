import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  // create a nestjs aoolication instance
  const app = await NestFactory.create(AppModule);
  // for using the dto and pipes
  app.useGlobalPipes(new ValidationPipe());
  // start the aoolication and listen the port
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
