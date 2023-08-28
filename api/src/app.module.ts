import { Module } from '@nestjs/common';
import { PersonModule } from './person/person.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [PrismaModule, PersonModule],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}
