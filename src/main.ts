import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  // create a nestjs aoolication instance
  const app = await NestFactory.create(AppModule);

  // start the aoolication and listen the port
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
