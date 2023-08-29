import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { RedisModule } from '../redis/redis.module';
import { PersonController } from './controllers/person.controller';
import { PersonService } from './services/person.service';

@Module({
  imports: [PrismaModule, RedisModule],
  controllers: [PersonController],
  providers: [PersonService],
})
export class PersonModule {}
