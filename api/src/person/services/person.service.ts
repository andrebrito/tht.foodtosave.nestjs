import { RedisService } from '@foodtosave/redis/services/redis.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/services/prisma.service';
import { CreatePersonDto } from '../dto/create-person.dto';
import { PersonEntity } from '../entities/person.entity';

@Injectable()
export class PersonService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly redisService: RedisService,
  ) {}

  async create(createPersonDto: CreatePersonDto): Promise<PersonEntity> {
    const created = await this.prismaService.person.create({
      data: {
        name: createPersonDto.name,
      },
    });

    await this.redisService.set(created.id.toString(), JSON.stringify(created));

    return new PersonEntity(created);
  }

  async findAll(): Promise<PersonEntity[]> {
    const personListFromRedis = await this.redisService.get('personList');

    const personList = await this.prismaService.person.findMany();

    return personList.map((person) => new PersonEntity(person));
  }

  async findOne(id: number): Promise<PersonEntity> {
    const person = await this.prismaService.person.findUnique({
      where: {
        id,
      },
    });

    if (!person) {
      throw new NotFoundException('Person not found.');
    }

    return new PersonEntity(person);
  }

  async remove(id: number) {
    const count = await this.count(id);
    if (!count) {
      return;
    }

    const deleted = await this.prismaService.person.delete({
      where: {
        id,
      },
    });

    return new PersonEntity(deleted);
  }

  count(id?: number) {
    if (id) {
      return this.prismaService.person.count({
        where: {
          id,
        },
      });
    }

    return this.prismaService.person.count();
  }
}
