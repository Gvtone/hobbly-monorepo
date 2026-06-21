import { Test, TestingModule } from '@nestjs/testing';
import { ProfileShareController } from './profile-share.controller';
import { ProfileShareService } from './profile-share.service';

describe('ProfileShareController', () => {
  let controller: ProfileShareController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProfileShareController],
      providers: [{ provide: ProfileShareService, useValue: {} }],
    }).compile();

    controller = module.get<ProfileShareController>(ProfileShareController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
