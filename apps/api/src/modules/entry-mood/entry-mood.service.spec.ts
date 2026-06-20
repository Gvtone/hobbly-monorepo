import { Test, TestingModule } from '@nestjs/testing';
import { EntryMoodService } from './entry-mood.service';
import { DatabaseService } from '../../common/database/database.service';

describe('EntryMoodService', () => {
  let service: EntryMoodService;

  const mockDatabaseService = {
    entryMood: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EntryMoodService,
        { provide: DatabaseService, useValue: mockDatabaseService },
      ],
    }).compile();

    service = module.get<EntryMoodService>(EntryMoodService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  const mockMood = { id: 1, name: 'Happy', icon: '😊', color: '#fff' };

  describe('create', () => {
    it('should call databaseService.entryMood.create with the dto', async () => {
      mockDatabaseService.entryMood.create = jest
        .fn()
        .mockResolvedValue(mockMood);
      const dto = { name: 'Happy', icon: '😊', color: '#fff' };
      await service.create(dto);
      expect(mockDatabaseService.entryMood.create).toHaveBeenCalledWith({
        data: dto,
      });
    });
  });

  describe('findAll', () => {
    it('should call databaseService.entryMood.findMany', async () => {
      mockDatabaseService.entryMood.findMany = jest
        .fn()
        .mockResolvedValue([mockMood]);
      await service.findAll();
      expect(mockDatabaseService.entryMood.findMany).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should call databaseService.entryMood.findUnique with the id', async () => {
      mockDatabaseService.entryMood.findUnique = jest
        .fn()
        .mockResolvedValue(mockMood);
      await service.findOne(1);
      expect(mockDatabaseService.entryMood.findUnique).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });
  });

  describe('update', () => {
    it('should call databaseService.entryMood.update with id and dto', async () => {
      mockDatabaseService.entryMood.update = jest
        .fn()
        .mockResolvedValue(mockMood);
      await service.update(1, { name: 'Sad' });
      expect(mockDatabaseService.entryMood.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: { name: 'Sad' },
      });
    });
  });

  describe('remove', () => {
    it('should call databaseService.entryMood.delete with the id', async () => {
      mockDatabaseService.entryMood.delete = jest
        .fn()
        .mockResolvedValue(mockMood);
      await service.remove(1);
      expect(mockDatabaseService.entryMood.delete).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });
  });
});
