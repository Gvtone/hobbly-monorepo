import { Test, TestingModule } from '@nestjs/testing';
import { CommentService } from './comment.service';
import { DatabaseService } from '../../common/database/database.service';
import { EntryService } from '../entry/entry.service';
import { UserService } from '../user/user.service';
import { NotFoundException, UnauthorizedException } from '@nestjs/common';

describe('CommentService', () => {
  let service: CommentService;

  const mockDatabaseService = {
    comment: {
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
    paginateModel: jest.fn(),
  };
  const mockEntryService: Partial<EntryService> = {};
  const mockUserService: Partial<UserService> = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommentService,
        { provide: DatabaseService, useValue: mockDatabaseService },
        { provide: EntryService, useValue: mockEntryService },
        { provide: UserService, useValue: mockUserService },
      ],
    }).compile();

    service = module.get<CommentService>(CommentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  const mockUser = { id: 1, email: 'test@test.com', username: 'testuser' };
  const mockEntry = { id: 5, title: 'My Entry', userHobbyId: 1 };
  const mockComment = { id: 10, userId: 1, entryId: 5, content: 'Nice!' };

  describe('create', () => {
    beforeEach(() => {
      mockUserService.findUserById = jest.fn().mockResolvedValue(mockUser);
      mockEntryService.findById = jest.fn().mockResolvedValue(mockEntry);
      mockDatabaseService.comment.create = jest.fn().mockResolvedValue(mockComment);
    });

    it('should throw UnauthorizedException when user not found', async () => {
      mockUserService.findUserById = jest.fn().mockResolvedValue(null);
      await expect(
        service.create(1, 5, { content: 'Nice!' }),
      ).rejects.toThrow(UnauthorizedException);
    });

    it('should throw NotFoundException when entry not found', async () => {
      mockEntryService.findById = jest.fn().mockResolvedValue(null);
      await expect(
        service.create(1, 5, { content: 'Nice!' }),
      ).rejects.toThrow(NotFoundException);
    });

    it('should call databaseService.comment.create with userId, entryId, content', async () => {
      await service.create(1, 5, { content: 'Nice!' });
      expect(mockDatabaseService.comment.create).toHaveBeenCalledWith(
        expect.objectContaining({
          data: { userId: 1, entryId: 5, content: 'Nice!' },
        }),
      );
    });

    it('should return the created comment', async () => {
      const result = await service.create(1, 5, { content: 'Nice!' });
      expect(result).toEqual(mockComment);
    });
  });

  describe('update', () => {
    beforeEach(() => {
      mockDatabaseService.comment.update = jest
        .fn()
        .mockResolvedValue({ ...mockComment, content: 'Updated' });
    });

    it('should call databaseService.comment.update with entryId and id scoping', async () => {
      await service.update(5, 10, { content: 'Updated' });
      expect(mockDatabaseService.comment.update).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { id: 10, entryId: 5 },
          data: { content: 'Updated' },
        }),
      );
    });
  });

  describe('delete', () => {
    beforeEach(() => {
      mockDatabaseService.comment.delete = jest.fn().mockResolvedValue(mockComment);
    });

    it('should call databaseService.comment.delete with entryId and id scoping', async () => {
      await service.delete(5, 10);
      expect(mockDatabaseService.comment.delete).toHaveBeenCalledWith({
        where: { id: 10, entryId: 5 },
      });
    });
  });
});
