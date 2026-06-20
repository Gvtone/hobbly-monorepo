import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { DatabaseService } from '../../common/database/database.service';
import { HashService } from '../../common/utils/hash.service';
import { CloudinaryService } from '../../common/cloudinary/cloudinary.service';
import { MailService } from '../mail/mail.service';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { PayloadEntity } from '../auth/entities/payload.entity';

describe('UserService', () => {
  let service: UserService;

  const mockDatabaseService = {
    user: {
      findFirst: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
    paginateModel: jest.fn(),
  };
  const mockHashService: Partial<HashService> = {};
  const mockCloudinary: Partial<CloudinaryService> = {};
  const mockMailService: Partial<MailService> = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        { provide: DatabaseService, useValue: mockDatabaseService },
        { provide: HashService, useValue: mockHashService },
        { provide: CloudinaryService, useValue: mockCloudinary },
        { provide: MailService, useValue: mockMailService },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  const mockUserRow = {
    id: 1,
    email: 'test@test.com',
    username: 'testuser',
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: undefined,
    displayName: '',
    googleId: '',
    password: 'hashed',
    profilePicture: null,
    coverImage: null,
    bio: '',
    role: 'HOBBYIST',
    visibility: 'PRIVATE',
    status: 'ACTIVE',
  };

  const mockPayload: PayloadEntity = {
    sub: 1,
    displayName: '',
    username: 'testuser',
    email: 'test@test.com',
    role: 'HOBBYIST',
    visibility: 'PRIVATE',
    status: 'ACTIVE',
    type: 'ACCESS',
  };

  describe('findUserByEmail', () => {
    beforeEach(() => {
      mockDatabaseService.user.findFirst = jest
        .fn()
        .mockResolvedValue(mockUserRow);
    });

    it('should return a UserEntity when user is found', async () => {
      const result = await service.findUserByEmail('test@test.com');
      expect(result).toBeDefined();
      expect(result.email).toBe('test@test.com');
    });

    it('should return null when user is not found', async () => {
      mockDatabaseService.user.findFirst = jest.fn().mockResolvedValue(null);
      const result = await service.findUserByEmail('notfound@test.com');
      expect(result).toBeNull();
    });
  });

  describe('findUserById', () => {
    beforeEach(() => {
      mockDatabaseService.user.findFirst = jest
        .fn()
        .mockResolvedValue(mockUserRow);
    });

    it('should return user when found', async () => {
      const result = await service.findUserById(1);
      expect(result).toBeDefined();
    });

    it('should return null when not found', async () => {
      mockDatabaseService.user.findFirst = jest.fn().mockResolvedValue(null);
      const result = await service.findUserById(999);
      expect(result).toBeNull();
    });
  });

  describe('findUserByUsername', () => {
    beforeEach(() => {
      mockDatabaseService.user.findFirst = jest
        .fn()
        .mockResolvedValue(mockUserRow);
    });

    it('should return a UserEntity when user is found', async () => {
      const result = await service.findUserByUsername('testuser');
      expect(result).toBeDefined();
      expect(result.username).toBe('testuser');
    });

    it('should return null when not found', async () => {
      mockDatabaseService.user.findFirst = jest.fn().mockResolvedValue(null);
      const result = await service.findUserByUsername('ghost');
      expect(result).toBeNull();
    });
  });

  describe('create', () => {
    const createUserDto = {
      username: 'newuser',
      email: 'new@test.com',
      password: 'Pass123!',
    };

    beforeEach(() => {
      mockDatabaseService.user.findFirst = jest.fn().mockResolvedValue(null);
      mockHashService.hashPassword = jest.fn().mockResolvedValue('hashed');
      mockDatabaseService.user.create = jest
        .fn()
        .mockResolvedValue({ ...mockUserRow, ...createUserDto });
    });

    it('should throw ConflictException when username already exists', async () => {
      mockDatabaseService.user.findFirst = jest
        .fn()
        .mockResolvedValueOnce(mockUserRow);
      await expect(service.create(createUserDto)).rejects.toThrow(
        ConflictException,
      );
    });

    it('should throw ConflictException when email already exists', async () => {
      mockDatabaseService.user.findFirst = jest
        .fn()
        .mockResolvedValueOnce(null)
        .mockResolvedValueOnce(mockUserRow);
      await expect(service.create(createUserDto)).rejects.toThrow(
        ConflictException,
      );
    });

    it('should call hashService.hashPassword with the password', async () => {
      await service.create(createUserDto);
      expect(mockHashService.hashPassword).toHaveBeenCalledWith(
        createUserDto.password,
      );
    });

    it('should call databaseService.user.create with hashed password', async () => {
      await service.create(createUserDto);
      expect(mockDatabaseService.user.create).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({ password: 'hashed' }),
        }),
      );
    });

    it('should return a UserEntity on success', async () => {
      const result = await service.create(createUserDto);
      expect(result).toBeDefined();
      expect(result.username).toBe(createUserDto.username);
    });
  });

  describe('uploadProfilePicture', () => {
    const mockImage = { buffer: Buffer.from('') } as Express.Multer.File;
    const cloudinaryUrl = 'https://res.cloudinary.com/old.jpg';

    beforeEach(() => {
      mockDatabaseService.user.findFirst = jest
        .fn()
        .mockResolvedValue({ ...mockUserRow, profilePicture: cloudinaryUrl });
      mockCloudinary.delete = jest.fn().mockResolvedValue(undefined);
      mockCloudinary.upload = jest.fn().mockResolvedValue({
        secure_url: 'https://res.cloudinary.com/new.jpg',
      });
      mockDatabaseService.user.update = jest.fn().mockResolvedValue({
        ...mockUserRow,
        profilePicture: 'https://res.cloudinary.com/new.jpg',
      });
    });

    it('should call cloudinary.delete when existing picture is a Cloudinary URL', async () => {
      await service.uploadProfilePicture(mockPayload, mockImage);
      expect(mockCloudinary.delete).toHaveBeenCalledWith(cloudinaryUrl);
    });

    it('should not call cloudinary.delete when no existing picture', async () => {
      mockDatabaseService.user.findFirst = jest
        .fn()
        .mockResolvedValue({ ...mockUserRow, profilePicture: null });
      await service.uploadProfilePicture(mockPayload, mockImage);
      expect(mockCloudinary.delete).not.toHaveBeenCalled();
    });

    it('should call cloudinary.upload with the image', async () => {
      await service.uploadProfilePicture(mockPayload, mockImage);
      expect(mockCloudinary.upload).toHaveBeenCalledWith(
        mockImage,
        'profilePicture',
      );
    });

    it('should return the updated user', async () => {
      const result = await service.uploadProfilePicture(mockPayload, mockImage);
      expect(result).toBeDefined();
    });
  });

  describe('removeProfilePicture', () => {
    const cloudinaryUrl = 'https://res.cloudinary.com/pic.jpg';

    beforeEach(() => {
      mockDatabaseService.user.findFirst = jest
        .fn()
        .mockResolvedValue({ ...mockUserRow, profilePicture: cloudinaryUrl });
      mockCloudinary.delete = jest.fn().mockResolvedValue(undefined);
      mockDatabaseService.user.update = jest
        .fn()
        .mockResolvedValue({ ...mockUserRow, profilePicture: null });
    });

    it('should throw NotFoundException when user has no profile picture', async () => {
      mockDatabaseService.user.findFirst = jest
        .fn()
        .mockResolvedValue({ ...mockUserRow, profilePicture: null });
      await expect(service.removeProfilePicture(mockPayload)).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should call cloudinary.delete when picture is a Cloudinary URL', async () => {
      await service.removeProfilePicture(mockPayload);
      expect(mockCloudinary.delete).toHaveBeenCalledWith(cloudinaryUrl);
    });

    it('should update user profilePicture to null', async () => {
      await service.removeProfilePicture(mockPayload);
      expect(mockDatabaseService.user.update).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({ profilePicture: null }),
        }),
      );
    });
  });

  describe('update', () => {
    beforeEach(() => {
      mockDatabaseService.user.update = jest
        .fn()
        .mockResolvedValue({ ...mockUserRow, displayName: 'Updated' });
    });

    it('should call databaseService.user.update with the correct id and data', async () => {
      await service.update(1, { displayName: 'Updated' });
      expect(mockDatabaseService.user.update).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { id: 1 },
          data: { displayName: 'Updated' },
        }),
      );
    });
  });

  describe('delete', () => {
    beforeEach(() => {
      mockDatabaseService.user.delete = jest
        .fn()
        .mockResolvedValue(mockUserRow);
      mockMailService.sendAccountDeletedEmail = jest
        .fn()
        .mockResolvedValue(undefined);
    });

    it('should call databaseService.user.delete with the correct id', async () => {
      await service.delete(1);
      expect(mockDatabaseService.user.delete).toHaveBeenCalledWith(
        expect.objectContaining({ where: { id: 1 } }),
      );
    });

    it('should call mailService.sendAccountDeletedEmail after deletion', async () => {
      await service.delete(1);
      expect(mockMailService.sendAccountDeletedEmail).toHaveBeenCalledWith({
        email: mockUserRow.email,
        username: mockUserRow.username,
      });
    });
  });
});
