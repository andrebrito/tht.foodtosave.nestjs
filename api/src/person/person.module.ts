import { RedisModule } from '@foodtosave/redis/redis.module';
import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { PersonController } from './controllers/person.controller';
import { PersonService } from './services/person.service';

console.log('process.env.REDIS_PORT @ personmoudke,', process.env.REDIS_PORT);
@Module({
  imports: [PrismaModule, RedisModule],
  controllers: [PersonController],
  providers: [PersonService],
})
export class PersonModule {}
