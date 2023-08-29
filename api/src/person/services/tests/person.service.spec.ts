import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaModule } from '../../../prisma/prisma.module';
import { PrismaService } from '../../../prisma/services/prisma.service';
import { RedisService } from '../../../redis/services/redis.service';
import { PersonEntity } from '../../entities/person.entity';
import { prismaServiceMock } from '../../mocks/prisma.mock';
import { redisServiceMock } from '../../mocks/redis.service.mock';
import { PersonService } from '../person.service';

describe('PersonService', () => {
  let service: PersonService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule],
      providers: [PersonService, RedisService],
    })
      .overrideProvider(PrismaService)
      .useValue(prismaServiceMock)
      .overrideProvider(RedisService)
      .useValue(redisServiceMock)
      .compile();

    redisServiceMock.set = jest.fn().mockResolvedValueOnce(undefined);
    redisServiceMock.get = jest.fn().mockResolvedValueOnce(undefined);
    redisServiceMock.delete = jest.fn().mockResolvedValueOnce(undefined);

    service = module.get<PersonService>(PersonService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should invoke prismaService.create', async () => {
    prismaServiceMock.person.create = jest.fn().mockResolvedValueOnce({
      id: 1,
      name: 'Andrew',
      createdAt: new Date(),
    });

    await service.create({ name: 'Andrew' });

    expect(prismaServiceMock.person.create).toHaveBeenLastCalledWith({
      data: {
        name: 'Andrew',
      },
    });
  });

  it('should invoke redisService.set with created record', async () => {
    redisServiceMock.set.mockClear();

    prismaServiceMock.person.create = jest.fn().mockResolvedValueOnce({
      id: 1,
      name: 'Andrew',
      createdAt: new Date(),
    });

    await service.create({ name: 'Andrew' });

    expect(redisServiceMock.set).toHaveBeenLastCalledWith(
      '1',
      expect.any(String),
    );
  });

  it('should return PersonEntity after invoking prismaService.create', async () => {
    prismaServiceMock.person.create = jest.fn().mockResolvedValueOnce({
      id: 1,
      name: 'Andrew',
      createdAt: new Date(),
    });

    const personEntity = await service.create({ name: 'Andrew' });

    expect(personEntity).toBeDefined();
    expect(personEntity).toBeInstanceOf(PersonEntity);
    expect(personEntity).toEqual({
      id: 1,
      name: 'Andrew',
      createdAt: expect.any(Date),
    });
  });

  it('should invoke prismaService.findUnique with id', async () => {
    prismaServiceMock.person.findUnique = jest.fn().mockResolvedValueOnce({
      id: 1,
      name: 'Andrew',
      createdAt: new Date(),
    });

    await service.findOne(1);

    expect(prismaServiceMock.person.findUnique).toHaveBeenLastCalledWith({
      where: {
        id: 1,
      },
    });
  });

  it('should return PersonEntity with data returned from prismaService.findUnique', async () => {
    prismaServiceMock.person.findUnique = jest.fn().mockResolvedValueOnce({
      id: 1,
      name: 'Andrew',
      createdAt: new Date(),
    });

    const personEntity = await service.findOne(1);

    expect(personEntity).toBeDefined();
    expect(personEntity).toBeInstanceOf(PersonEntity);
    expect(personEntity).toEqual({
      id: 1,
      name: 'Andrew',
      createdAt: expect.any(Date),
    });
  });

  it('should throw NotFoundException when prismaService.findUnique returns null', async () => {
    prismaServiceMock.person.findUnique = jest.fn().mockResolvedValueOnce(null);

    let error;

    try {
      await service.findOne(1);
    } catch (err) {
      error = err;
    }

    expect(error).toBeDefined();
    expect(error).toBeInstanceOf(NotFoundException);
    expect(error.message).toBe('Person not found.');
  });

  it('should invoke prismaService.findMany', async () => {
    prismaServiceMock.person.findMany = jest.fn().mockResolvedValueOnce([
      {
        id: 1,
        name: 'Andrew',
        createdAt: new Date(),
      },
    ]);

    await service.findAll();

    expect(prismaServiceMock.person.findMany).toHaveBeenLastCalledWith();
  });

  it('should return PersonEntity list with data returned from prismaService.findMany', async () => {
    prismaServiceMock.person.findMany = jest.fn().mockResolvedValueOnce([
      {
        id: 1,
        name: 'Andrew',
        createdAt: new Date(),
      },
      {
        id: 2,
        name: 'Cristina',
        createdAt: new Date(),
      },
    ]);

    const personEntityList = await service.findAll();

    expect(personEntityList).toBeDefined();
    expect(personEntityList).toHaveLength(2);
    expect(personEntityList).toEqual([
      {
        id: 1,
        name: 'Andrew',
        createdAt: expect.any(Date),
      },
      {
        id: 2,
        name: 'Cristina',
        createdAt: expect.any(Date),
      },
    ]);
  });

  it('should invoke prismaService.count and prismaService.delete with id from args when count defined', async () => {
    prismaServiceMock.person.count = jest.fn().mockResolvedValueOnce(1);
    prismaServiceMock.person.delete = jest.fn().mockResolvedValueOnce([
      {
        id: 1,
        name: 'Andrew',
        createdAt: new Date(),
      },
    ]);

    await service.remove(1);

    expect(prismaServiceMock.person.count).toHaveBeenLastCalledWith({
      where: {
        id: 1,
      },
    });

    expect(prismaServiceMock.person.delete).toHaveBeenLastCalledWith({
      where: {
        id: 1,
      },
    });
  });

  it('should not invoke prismaService.delete when prismaService.count is 0', async () => {
    prismaServiceMock.person.delete.mockClear();
    prismaServiceMock.person.count = jest.fn().mockResolvedValueOnce(0);

    await service.remove(1);

    expect(prismaServiceMock.person.count).toHaveBeenLastCalledWith({
      where: {
        id: 1,
      },
    });

    expect(prismaServiceMock.person.delete).not.toHaveBeenCalled();
  });

  it('should not invoke prismaService.count without id when arg is null', async () => {
    await service.count();

    expect(prismaServiceMock.person.count).toHaveBeenLastCalledWith();
  });
});
