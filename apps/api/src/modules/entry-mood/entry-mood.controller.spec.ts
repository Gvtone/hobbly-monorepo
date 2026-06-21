import { Test, TestingModule } from '@nestjs/testing';
import { EntryMoodController } from './entry-mood.controller';
import { EntryMoodService } from './entry-mood.service';

describe('EntryMoodController', () => {
  let controller: EntryMoodController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EntryMoodController],
      providers: [{ provide: EntryMoodService, useValue: {} }],
    }).compile();

    controller = module.get<EntryMoodController>(EntryMoodController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
