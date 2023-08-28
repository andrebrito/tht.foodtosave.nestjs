import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PersonController } from './controllers/person.controller';
import { PersonService } from './services/person.service';

@Module({
  imports: [PrismaModule],
  controllers: [PersonController],
  providers: [PersonService],
})
export class PersonModule {}
