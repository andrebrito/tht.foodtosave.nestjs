import { Test, TestingModule } from '@nestjs/testing';
import { personServiceMock } from '../../mocks/person.service.mock';
import { PersonService } from '../../services/person.service';
import { PersonController } from '../person.controller';

describe('PersonController', () => {
  let controller: PersonController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PersonController],
      providers: [PersonService],
    })
      .overrideProvider(PersonService)
      .useValue(personServiceMock)
      .compile();

    controller = module.get<PersonController>(PersonController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should invoke personService.create when invoking create', async () => {
    await controller.create({ name: 'Andrew' });

    expect(personServiceMock.create).toHaveBeenLastCalledWith({
      name: 'Andrew',
    });
  });

  it('should invoke personService.findOne when invoking findOne', async () => {
    await controller.findOne('1');

    expect(personServiceMock.findOne).toHaveBeenLastCalledWith(1);
  });

  it('should invoke personService.findMany when invoking findAll', async () => {
    await controller.findAll();

    expect(personServiceMock.findAll).toHaveBeenLastCalledWith();
  });

  it('should invoke personService.delete when invoking delete', async () => {
    await controller.remove('1');

    expect(personServiceMock.remove).toHaveBeenLastCalledWith(1);
  });
});
