import { Test, TestingModule } from '@nestjs/testing';
import { LikeService } from './like.service';
import { DatabaseService } from '../../common/database/database.service';
import { UserService } from '../user/user.service';
import { EntryService } from '../entry/entry.service';
import { NotFoundException, UnauthorizedException } from '@nestjs/common';

describe('LikeService', () => {
  let service: LikeService;

  const mockDatabaseService = {
    like: {
      findFirst: jest.fn(),
      create: jest.fn(),
      delete: jest.fn(),
      count: jest.fn(),
    },
  };
  const mockUserService: Partial<UserService> = {};
  const mockEntryService: Partial<EntryService> = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LikeService,
        { provide: DatabaseService, useValue: mockDatabaseService },
        { provide: UserService, useValue: mockUserService },
        { provide: EntryService, useValue: mockEntryService },
      ],
    }).compile();

    service = module.get<LikeService>(LikeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  const mockUser = { id: 1 };
  const mockEntry = { id: 5 };
  const mockLike = { id: 10, userId: 1, entryId: 5 };

  describe('toggle', () => {
    beforeEach(() => {
      mockUserService.findUserById = jest.fn().mockResolvedValue(mockUser);
      mockEntryService.findById = jest.fn().mockResolvedValue(mockEntry);
      mockDatabaseService.like.findFirst = jest.fn().mockResolvedValue(null);
      mockDatabaseService.like.create = jest.fn().mockResolvedValue(mockLike);
      mockDatabaseService.like.delete = jest.fn().mockResolvedValue(mockLike);
    });

    it('should throw UnauthorizedException when user not found', async () => {
      mockUserService.findUserById = jest.fn().mockResolvedValue(null);
      await expect(service.toggle(1, 5)).rejects.toThrow(UnauthorizedException);
    });

    it('should throw NotFoundException when entry not found', async () => {
      mockEntryService.findById = jest.fn().mockResolvedValue(null);
      await expect(service.toggle(1, 5)).rejects.toThrow(NotFoundException);
    });

    it('should delete like and return { liked: false } when like already exists', async () => {
      mockDatabaseService.like.findFirst = jest
        .fn()
        .mockResolvedValue(mockLike);
      const result = await service.toggle(1, 5);
      expect(mockDatabaseService.like.delete).toHaveBeenCalledWith({
        where: { id: mockLike.id },
      });
      expect(result).toEqual({ liked: false });
    });

    it('should create like and return { liked: true } when like does not exist', async () => {
      const result = await service.toggle(1, 5);
      expect(mockDatabaseService.like.create).toHaveBeenCalledWith({
        data: { userId: 1, entryId: 5 },
      });
      expect(result).toEqual({ liked: true });
    });
  });

  describe('count', () => {
    it('should call databaseService.like.count with entryId and return the count', async () => {
      mockDatabaseService.like.count = jest.fn().mockResolvedValue(7);
      const result = await service.count(5);
      expect(mockDatabaseService.like.count).toHaveBeenCalledWith({
        where: { entryId: 5 },
      });
      expect(result).toBe(7);
    });
  });

  describe('isLiked', () => {
    it('should return true when like record exists', async () => {
      mockDatabaseService.like.findFirst = jest
        .fn()
        .mockResolvedValue(mockLike);
      const result = await service.isLiked(1, 5);
      expect(result).toBe(true);
    });

    it('should return false when like record does not exist', async () => {
      mockDatabaseService.like.findFirst = jest.fn().mockResolvedValue(null);
      const result = await service.isLiked(1, 5);
      expect(result).toBe(false);
    });
  });
});
