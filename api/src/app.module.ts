import { Module } from '@nestjs/common';
import { PersonModule } from './person/person.module';
import { PrismaModule } from './prisma/prisma.module';
import { RedisModule } from './redis/redis.module';

@Module({
  imports: [PrismaModule, RedisModule, PersonModule],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}
