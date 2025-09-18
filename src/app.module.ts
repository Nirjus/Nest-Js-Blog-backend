import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BlogModule } from './blog/blog.module';
import { Blog } from './blog/entities/blog.entity';
import { User } from './auth/entities/user.entity';
import { AuthModule } from './auth/auth.module';
import config from './config/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { CacheModule } from '@nestjs/cache-manager';

// -> Root module which import all other modules

// modules -> group related providers and controllers togather

@Module({
  imports: [
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 5,
      },
    ]),
    CacheModule.register({
      isGlobal: true,
      ttl: 
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'Root',
      database: 'nest-youtube',
      entities: [Blog, User], // array of entites that you want to register
      synchronize: true, // dev mode
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
    BlogModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
