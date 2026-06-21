import { Test, TestingModule } from '@nestjs/testing';
import { ProfileShareService } from './profile-share.service';
import { DatabaseService } from '../../common/database/database.service';
import { HashService } from '../../common/utils/hash.service';
import { NotFoundException } from '@nestjs/common';

describe('ProfileShareService', () => {
  let service: ProfileShareService;

  const mockPaginateResult = {
    withPages: jest.fn().mockResolvedValue([[], {}]),
  };
  const mockPaginatedEntry = {
    paginate: jest.fn().mockReturnValue(mockPaginateResult),
  };

  const mockDatabaseService = {
    profileShare: {
      findFirst: jest.fn(),
      findUnique: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
    paginateModel: jest.fn().mockResolvedValue({ entry: mockPaginatedEntry }),
  };
  const mockHashService: Partial<HashService> = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProfileShareService,
        { provide: DatabaseService, useValue: mockDatabaseService },
        { provide: HashService, useValue: mockHashService },
      ],
    }).compile();

    service = module.get<ProfileShareService>(ProfileShareService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  const mockShare = { id: 1, userId: 1, referenceId: 'ref-abc' };
  const mockUser = {
    id: 1,
    username: 'testuser',
    displayName: '',
    profilePicture: null,
    coverImage: null,
    bio: '',
    visibility: 'PUBLIC',
  };

  describe('createOrRemake', () => {
    beforeEach(() => {
      mockHashService.generateToken = jest.fn().mockReturnValue('new-ref-id');
      mockDatabaseService.profileShare.findFirst = jest
        .fn()
        .mockResolvedValue(null);
      mockDatabaseService.profileShare.create = jest
        .fn()
        .mockResolvedValue(mockShare);
      mockDatabaseService.profileShare.update = jest
        .fn()
        .mockResolvedValue(mockShare);
    });

    it('should call hashService.generateToken to create a new referenceId', async () => {
      await service.createOrRemake(1);
      expect(mockHashService.generateToken).toHaveBeenCalled();
    });

    it('should call databaseService.profileShare.create when no existing share', async () => {
      await service.createOrRemake(1);
      expect(mockDatabaseService.profileShare.create).toHaveBeenCalledWith({
        data: { userId: 1, referenceId: 'new-ref-id' },
      });
    });

    it('should call databaseService.profileShare.update when share already exists', async () => {
      mockDatabaseService.profileShare.findFirst = jest
        .fn()
        .mockResolvedValue(mockShare);
      await service.createOrRemake(1);
      expect(mockDatabaseService.profileShare.update).toHaveBeenCalledWith({
        where: { userId: mockShare.userId },
        data: { referenceId: 'new-ref-id' },
      });
    });
  });

  describe('findOwnRef', () => {
    it('should call databaseService.profileShare.findUnique with userId', async () => {
      mockDatabaseService.profileShare.findUnique = jest
        .fn()
        .mockResolvedValue(mockShare);
      await service.findOwnRef(1);
      expect(mockDatabaseService.profileShare.findUnique).toHaveBeenCalledWith({
        where: { userId: 1 },
      });
    });
  });

  describe('findByReference', () => {
    it('should throw NotFoundException when share not found', async () => {
      mockDatabaseService.profileShare.findFirst = jest
        .fn()
        .mockResolvedValue(null);
      await expect(service.findByReference('bad-ref')).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should return share.user when found', async () => {
      mockDatabaseService.profileShare.findFirst = jest
        .fn()
        .mockResolvedValue({ ...mockShare, user: mockUser });
      const result = await service.findByReference('ref-abc');
      expect(result).toEqual(mockUser);
    });
  });

  describe('findEntriesByReference', () => {
    it('should throw NotFoundException when share not found', async () => {
      mockDatabaseService.profileShare.findFirst = jest
        .fn()
        .mockResolvedValue(null);
      await expect(service.findEntriesByReference('bad-ref')).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should return paginated entries when share is found', async () => {
      mockDatabaseService.profileShare.findFirst = jest
        .fn()
        .mockResolvedValue(mockShare);
      const result = await service.findEntriesByReference('ref-abc', 1, 10);
      expect(mockDatabaseService.paginateModel).toHaveBeenCalled();
      expect(result).toBeDefined();
    });
  });

  describe('revoke', () => {
    it('should call databaseService.profileShare.delete with userId', async () => {
      mockDatabaseService.profileShare.delete = jest
        .fn()
        .mockResolvedValue(mockShare);
      await service.revoke(1);
      expect(mockDatabaseService.profileShare.delete).toHaveBeenCalledWith({
        where: { userId: 1 },
      });
    });
  });
});
