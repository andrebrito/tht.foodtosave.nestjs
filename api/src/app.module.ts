import { Module } from '@nestjs/common';
import { PersonModule } from './person/person.module';
import { PrismaModule } from './prisma/prisma.module';
import { RedisModule } from './redis/redis.module';

@Module({
  imports: [PersonModule, PrismaModule, RedisModule],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}
