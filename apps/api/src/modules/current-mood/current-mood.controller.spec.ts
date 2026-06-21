import { Test, TestingModule } from '@nestjs/testing';
import { CurrentMoodController } from './current-mood.controller';
import { CurrentMoodService } from './current-mood.service';

describe('CurrentMoodController', () => {
  let controller: CurrentMoodController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CurrentMoodController],
      providers: [{ provide: CurrentMoodService, useValue: {} }],
    }).compile();

    controller = module.get<CurrentMoodController>(CurrentMoodController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
