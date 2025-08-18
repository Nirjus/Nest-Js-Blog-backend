import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BlogModule } from './blog/blog.module';

// -> Root module which import all other modules

// modules -> group related providers and controllers togather

@Module({
  imports: [BlogModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
