import { Test, TestingModule } from '@nestjs/testing';
import { UserHobbyController } from './user-hobby.controller';
import { UserHobbyService } from './user-hobby.service';

describe('UserHobbyController', () => {
  let controller: UserHobbyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserHobbyController],
      providers: [{ provide: UserHobbyService, useValue: {} }],
    }).compile();

    controller = module.get<UserHobbyController>(UserHobbyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
