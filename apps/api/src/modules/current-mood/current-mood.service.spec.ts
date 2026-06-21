import { Test, TestingModule } from '@nestjs/testing';
import { CurrentMoodService } from './current-mood.service';
import { DatabaseService } from '../../common/database/database.service';

describe('CurrentMoodService', () => {
  let service: CurrentMoodService;

  const mockDatabaseService = {
    currentMood: {
      findFirst: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CurrentMoodService,
        { provide: DatabaseService, useValue: mockDatabaseService },
      ],
    }).compile();

    service = module.get<CurrentMoodService>(CurrentMoodService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  const mockMood = {
    userId: 1,
    icon: '😊',
    color: '#fff',
    description: 'Happy',
  };
  const setDto = { icon: '😊', color: '#fff', description: 'Happy' };

  describe('setOrUpdate', () => {
    it('should call databaseService.currentMood.create when no existing mood', async () => {
      mockDatabaseService.currentMood.findFirst = jest
        .fn()
        .mockResolvedValue(null);
      mockDatabaseService.currentMood.create = jest
        .fn()
        .mockResolvedValue(mockMood);
      await service.setOrUpdate(1, setDto);
      expect(mockDatabaseService.currentMood.create).toHaveBeenCalledWith({
        data: { userId: 1, ...setDto },
      });
    });

    it('should call databaseService.currentMood.update when mood already exists', async () => {
      mockDatabaseService.currentMood.findFirst = jest
        .fn()
        .mockResolvedValue(mockMood);
      mockDatabaseService.currentMood.update = jest
        .fn()
        .mockResolvedValue(mockMood);
      await service.setOrUpdate(1, setDto);
      expect(mockDatabaseService.currentMood.update).toHaveBeenCalledWith({
        where: { userId: 1 },
        data: setDto,
      });
    });

    it('should not call create when mood already exists', async () => {
      mockDatabaseService.currentMood.findFirst = jest
        .fn()
        .mockResolvedValue(mockMood);
      mockDatabaseService.currentMood.create = jest.fn();
      mockDatabaseService.currentMood.update = jest
        .fn()
        .mockResolvedValue(mockMood);
      await service.setOrUpdate(1, setDto);
      expect(mockDatabaseService.currentMood.create).not.toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should call databaseService.currentMood.findFirst with userId', async () => {
      mockDatabaseService.currentMood.findFirst = jest
        .fn()
        .mockResolvedValue(mockMood);
      await service.findOne(1);
      expect(mockDatabaseService.currentMood.findFirst).toHaveBeenCalledWith({
        where: { userId: 1 },
      });
    });
  });

  describe('delete', () => {
    it('should call databaseService.currentMood.delete with userId', async () => {
      mockDatabaseService.currentMood.delete = jest
        .fn()
        .mockResolvedValue(mockMood);
      await service.delete(1);
      expect(mockDatabaseService.currentMood.delete).toHaveBeenCalledWith({
        where: { userId: 1 },
      });
    });
  });
});
