import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogController } from './blog.controller';
import { BlogService } from './blog.service';
import { Blog } from './entities/blog.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  // this will make the post repository available for injection
  // available in the current scope
  imports: [TypeOrmModule.forFeature([Blog]), AuthModule],
  controllers: [BlogController],
  providers: [BlogService],
})
export class BlogModule {}
