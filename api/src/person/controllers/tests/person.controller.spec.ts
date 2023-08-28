import { Test, TestingModule } from '@nestjs/testing';
import { personServiceMock } from '../../mocks/person-mock';
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
});
