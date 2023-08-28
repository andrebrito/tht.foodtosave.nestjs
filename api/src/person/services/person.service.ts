import { RedisService } from '@foodtosave/redis/services/redis.service';
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/services/prisma.service';
import { CreatePersonDto } from '../dto/create-person.dto';
import { PersonEntity } from '../entities/person.entity';

@Injectable()
export class PersonService {
  private readonly LOGGER = new Logger(PersonService.name);

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
    const personList = await this.prismaService.person.findMany();
    return personList.map((person) => new PersonEntity(person));
  }

  async findOne(id: number): Promise<PersonEntity> {
    const personFromRedis = await this.redisService.get(id.toString());
    if (personFromRedis) {
      this.LOGGER.log('found person on redis.');
      return JSON.parse(personFromRedis);
    }

    this.LOGGER.log('querying person on database...');
    const person = await this.prismaService.person.findUnique({
      where: {
        id,
      },
    });

    if (!person) {
      this.LOGGER.log('person not found.');
      throw new NotFoundException('Person not found.');
    }

    await this.redisService.set(person.id.toString(), JSON.stringify(person));

    return new PersonEntity(person);
  }

  async remove(id: number) {
    const count = await this.count(id);
    if (!count) {
      return;
    }

    this.LOGGER.log('deleting person from database...');
    const deleted = await this.prismaService.person.delete({
      where: {
        id,
      },
    });

    this.LOGGER.log('deleting entry person from redis...');
    await this.redisService.delete(id.toString());

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
