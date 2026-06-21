import { Test, TestingModule } from '@nestjs/testing';
import { EntryService } from './entry.service';
import { DatabaseService } from '../../common/database/database.service';
import { EntryMoodService } from '../entry-mood/entry-mood.service';
import { CloudinaryService } from '../../common/cloudinary/cloudinary.service';
import { NotFoundException } from '@nestjs/common';

describe('EntryService', () => {
  let service: EntryService;

  const mockTx = {
    entry: {
      create: jest.fn(),
      update: jest.fn(),
    },
  };

  const mockDatabaseService = {
    entry: {
      findFirst: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
    paginateModel: jest.fn(),
    $transaction: jest.fn().mockImplementation(async (fn: any) => fn(mockTx)),
  };
  const mockEntryMoodService: Partial<EntryMoodService> = {};
  const mockCloudinary: Partial<CloudinaryService> = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EntryService,
        { provide: DatabaseService, useValue: mockDatabaseService },
        { provide: EntryMoodService, useValue: mockEntryMoodService },
        { provide: CloudinaryService, useValue: mockCloudinary },
      ],
    }).compile();

    service = module.get<EntryService>(EntryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  const mockEntry = {
    id: 1,
    title: 'My Entry',
    note: 'Some note',
    userHobbyId: 2,
    moodId: null,
    image: null,
    visibility: 'PUBLIC',
    activityDate: new Date(),
  };

  describe('create', () => {
    const createEntryDto = {
      title: 'Test',
      note: 'Note',
      userHobbyId: 2,
      visibility: 'PUBLIC' as any,
    };

    beforeEach(() => {
      mockTx.entry.create = jest.fn().mockResolvedValue(mockEntry);
      mockTx.entry.update = jest.fn().mockResolvedValue({
        ...mockEntry,
        image: 'https://res.cloudinary.com/img.jpg',
      });
      mockCloudinary.upload = jest.fn().mockResolvedValue({
        secure_url: 'https://res.cloudinary.com/img.jpg',
      });
      mockEntryMoodService.findOne = jest
        .fn()
        .mockResolvedValue({ id: 3, name: 'Happy' });
    });

    it('should throw NotFoundException when moodId is provided but mood not found', async () => {
      mockEntryMoodService.findOne = jest.fn().mockResolvedValue(null);
      await expect(
        service.create({ ...createEntryDto, moodId: 99 }, undefined),
      ).rejects.toThrow(NotFoundException);
    });

    it('should not check mood when moodId is not provided', async () => {
      await service.create(createEntryDto, undefined);
      expect(mockEntryMoodService.findOne).not.toHaveBeenCalled();
    });

    it('should create entry in a transaction', async () => {
      await service.create(createEntryDto, undefined);
      expect(mockDatabaseService.$transaction).toHaveBeenCalled();
      expect(mockTx.entry.create).toHaveBeenCalledWith(
        expect.objectContaining({ data: createEntryDto }),
      );
    });

    it('should upload image and update entry when image is provided', async () => {
      const mockImage = { buffer: Buffer.from('') } as Express.Multer.File;
      await service.create(createEntryDto, mockImage);
      expect(mockCloudinary.upload).toHaveBeenCalledWith(
        mockImage,
        expect.stringContaining('entryImage'),
      );
      expect(mockTx.entry.update).toHaveBeenCalled();
    });

    it('should not upload image when no image is provided', async () => {
      await service.create(createEntryDto, undefined);
      expect(mockCloudinary.upload).not.toHaveBeenCalled();
    });
  });

  describe('findById', () => {
    beforeEach(() => {
      mockDatabaseService.entry.findFirst = jest
        .fn()
        .mockResolvedValue(mockEntry);
    });

    it('should call databaseService.entry.findFirst with the id', async () => {
      await service.findById(1);
      expect(mockDatabaseService.entry.findFirst).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });
  });

  describe('update', () => {
    beforeEach(() => {
      mockDatabaseService.entry.update = jest
        .fn()
        .mockResolvedValue({ ...mockEntry, title: 'Updated' });
    });

    it('should call databaseService.entry.update scoped to userId', async () => {
      await service.update(1, 42, { title: 'Updated' });
      expect(mockDatabaseService.entry.update).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { id: 1, userHobby: { userId: 42 } },
        }),
      );
    });
  });

  describe('delete', () => {
    beforeEach(() => {
      mockDatabaseService.entry.delete = jest.fn().mockResolvedValue(mockEntry);
      mockCloudinary.delete = jest.fn().mockResolvedValue(undefined);
    });

    it('should call cloudinary.delete when entry has an image', async () => {
      mockDatabaseService.entry.findFirst = jest.fn().mockResolvedValue({
        ...mockEntry,
        image: 'https://res.cloudinary.com/img.jpg',
      });
      await service.delete(1, 42);
      expect(mockCloudinary.delete).toHaveBeenCalledWith(
        'https://res.cloudinary.com/img.jpg',
      );
    });

    it('should not call cloudinary.delete when entry has no image', async () => {
      mockDatabaseService.entry.findFirst = jest
        .fn()
        .mockResolvedValue({ ...mockEntry, image: null });
      await service.delete(1, 42);
      expect(mockCloudinary.delete).not.toHaveBeenCalled();
    });

    it('should call databaseService.entry.delete scoped to userId', async () => {
      mockDatabaseService.entry.findFirst = jest
        .fn()
        .mockResolvedValue(mockEntry);
      await service.delete(1, 42);
      expect(mockDatabaseService.entry.delete).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { id: 1, userHobby: { userId: 42 } },
        }),
      );
    });
  });
});
