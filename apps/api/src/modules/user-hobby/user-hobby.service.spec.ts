import { Test, TestingModule } from '@nestjs/testing';
import { UserHobbyService } from './user-hobby.service';
import { DatabaseService } from '../../common/database/database.service';
import { CloudinaryService } from '../../common/cloudinary/cloudinary.service';

describe('UserHobbyService', () => {
  let service: UserHobbyService;

  const mockTx = {
    userHobby: {
      findFirst: jest.fn(),
      update: jest.fn(),
    },
  };

  const mockDatabaseService = {
    userHobby: {
      create: jest.fn(),
      findMany: jest.fn(),
      findFirst: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
    $transaction: jest.fn().mockImplementation(async (fn: any) => fn(mockTx)),
  };
  const mockCloudinary: Partial<CloudinaryService> = {};

  beforeEach(async () => {
    jest.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserHobbyService,
        { provide: DatabaseService, useValue: mockDatabaseService },
        { provide: CloudinaryService, useValue: mockCloudinary },
      ],
    }).compile();

    service = module.get<UserHobbyService>(UserHobbyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  const mockUserHobby = {
    id: 1,
    userId: 42,
    hobbyId: 3,
    backgroundImage: null,
  };

  describe('create', () => {
    it('should call databaseService.userHobby.create with userId merged', async () => {
      mockDatabaseService.userHobby.create = jest
        .fn()
        .mockResolvedValue(mockUserHobby);
      await service.create(42, { hobbyId: 3 });
      expect(mockDatabaseService.userHobby.create).toHaveBeenCalledWith({
        data: { userId: 42, hobbyId: 3 },
      });
    });
  });

  describe('findAll', () => {
    it('should call databaseService.userHobby.findMany with userId', async () => {
      mockDatabaseService.userHobby.findMany = jest
        .fn()
        .mockResolvedValue([mockUserHobby]);
      await service.findAll(42);
      expect(mockDatabaseService.userHobby.findMany).toHaveBeenCalledWith(
        expect.objectContaining({ where: { userId: 42 } }),
      );
    });
  });

  describe('findById', () => {
    it('should call databaseService.userHobby.findFirst with id and userId', async () => {
      mockDatabaseService.userHobby.findFirst = jest
        .fn()
        .mockResolvedValue(mockUserHobby);
      await service.findById(1, 42);
      expect(mockDatabaseService.userHobby.findFirst).toHaveBeenCalledWith({
        where: { id: 1, userId: 42 },
      });
    });
  });

  describe('update without image', () => {
    it('should call databaseService.userHobby.update directly', async () => {
      mockDatabaseService.userHobby.update = jest
        .fn()
        .mockResolvedValue(mockUserHobby);
      await service.update(1, 42, { hobbyId: 3 }, undefined);
      expect(mockDatabaseService.userHobby.update).toHaveBeenCalledWith({
        where: { id: 1, userId: 42 },
        data: { hobbyId: 3 },
      });
    });
  });

  describe('update with image', () => {
    const mockImage = { buffer: Buffer.from('') } as Express.Multer.File;
    const cloudinaryUrl = 'https://res.cloudinary.com/old.jpg';

    beforeEach(() => {
      mockTx.userHobby.findFirst = jest.fn().mockResolvedValue({
        ...mockUserHobby,
        backgroundImage: cloudinaryUrl,
      });
      mockTx.userHobby.update = jest.fn().mockResolvedValue({
        ...mockUserHobby,
        backgroundImage: 'https://res.cloudinary.com/new.jpg',
      });
      mockCloudinary.delete = jest.fn().mockResolvedValue(undefined);
      mockCloudinary.upload = jest.fn().mockResolvedValue({
        secure_url: 'https://res.cloudinary.com/new.jpg',
      });
    });

    it('should run in a transaction', async () => {
      await service.update(1, 42, {}, mockImage);
      expect(mockDatabaseService.$transaction).toHaveBeenCalled();
    });

    it('should call cloudinary.delete when existing backgroundImage is a Cloudinary URL', async () => {
      await service.update(1, 42, {}, mockImage);
      expect(mockCloudinary.delete).toHaveBeenCalledWith(cloudinaryUrl);
    });

    it('should not call cloudinary.delete when no existing backgroundImage', async () => {
      mockTx.userHobby.findFirst = jest
        .fn()
        .mockResolvedValue({ ...mockUserHobby, backgroundImage: null });
      await service.update(1, 42, {}, mockImage);
      expect(mockCloudinary.delete).not.toHaveBeenCalled();
    });

    it('should upload the new image and update with secure_url', async () => {
      await service.update(1, 42, {}, mockImage);
      expect(mockCloudinary.upload).toHaveBeenCalledWith(
        mockImage,
        'userHobbyCover',
      );
      expect(mockTx.userHobby.update).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({
            backgroundImage: 'https://res.cloudinary.com/new.jpg',
          }),
        }),
      );
    });
  });

  describe('delete', () => {
    it('should call databaseService.userHobby.delete with id and userId', async () => {
      mockDatabaseService.userHobby.delete = jest
        .fn()
        .mockResolvedValue(mockUserHobby);
      await service.delete(1, 42);
      expect(mockDatabaseService.userHobby.delete).toHaveBeenCalledWith({
        where: { id: 1, userId: 42 },
      });
    });
  });
});
