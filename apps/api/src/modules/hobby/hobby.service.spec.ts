import { Test, TestingModule } from '@nestjs/testing';
import { HobbyService } from './hobby.service';
import { DatabaseService } from '../../common/database/database.service';

describe('HobbyService', () => {
  let service: HobbyService;

  const mockDatabaseService = {
    hobby: {
      create: jest.fn(),
      findFirst: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
    paginateModel: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HobbyService,
        { provide: DatabaseService, useValue: mockDatabaseService },
      ],
    }).compile();

    service = module.get<HobbyService>(HobbyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  const mockHobby = {
    id: 1,
    name: 'Reading',
    description: 'Read books',
    icon: '📚',
    color: '#fff',
    category: 'ARTS',
    status: 'ACTIVE',
  };

  describe('create', () => {
    beforeEach(() => {
      mockDatabaseService.hobby.create = jest.fn().mockResolvedValue(mockHobby);
    });

    it('should call databaseService.hobby.create with the dto', async () => {
      const dto = {
        name: 'Reading',
        description: 'Read books',
        icon: '📚',
        color: '#fff',
        category: 'ARTS' as any,
        status: 'ACTIVE' as any,
      };
      await service.create(dto);
      expect(mockDatabaseService.hobby.create).toHaveBeenCalledWith({
        data: dto,
      });
    });

    it('should return the created hobby', async () => {
      const dto = {
        name: 'Reading',
        description: 'Read books',
        icon: '📚',
        color: '#fff',
        category: 'ARTS' as any,
        status: 'ACTIVE' as any,
      };
      const result = await service.create(dto);
      expect(result).toEqual(mockHobby);
    });
  });

  describe('findById', () => {
    beforeEach(() => {
      mockDatabaseService.hobby.findFirst = jest
        .fn()
        .mockResolvedValue(mockHobby);
    });

    it('should call databaseService.hobby.findFirst with the id', async () => {
      await service.findById(1);
      expect(mockDatabaseService.hobby.findFirst).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });

    it('should return the hobby', async () => {
      const result = await service.findById(1);
      expect(result).toEqual(mockHobby);
    });
  });

  describe('update', () => {
    beforeEach(() => {
      mockDatabaseService.hobby.update = jest
        .fn()
        .mockResolvedValue({ ...mockHobby, name: 'Updated' });
    });

    it('should call databaseService.hobby.update with id and dto', async () => {
      await service.update(1, { name: 'Updated' });
      expect(mockDatabaseService.hobby.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: { name: 'Updated' },
      });
    });
  });

  describe('delete', () => {
    beforeEach(() => {
      mockDatabaseService.hobby.delete = jest.fn().mockResolvedValue(mockHobby);
    });

    it('should call databaseService.hobby.delete with the id', async () => {
      await service.delete(1);
      expect(mockDatabaseService.hobby.delete).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });
  });
});
