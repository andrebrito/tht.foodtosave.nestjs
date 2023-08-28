import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/services/prisma.service';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { PersonEntity } from './entities/person.entity';

@Injectable()
export class PersonService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createPersonDto: CreatePersonDto): Promise<PersonEntity> {
    const created = await this.prismaService.person.create({
      data: {
        name: createPersonDto.name,
      },
    });

    return new PersonEntity(created);
  }

  async findAll(): Promise<PersonEntity[]> {
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

  async update(
    id: number,
    updatePersonDto: UpdatePersonDto,
  ): Promise<PersonEntity> {
    const updated = await this.prismaService.person.update({
      where: {
        id,
      },
      data: {
        name: updatePersonDto.name,
      },
    });

    return new PersonEntity(updated);
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
