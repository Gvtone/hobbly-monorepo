import { Test, TestingModule } from '@nestjs/testing';
import { TokenService } from './token.service';
import { HashService } from '../../common/utils/hash.service';
import { DatabaseService } from '../../common/database/database.service';
import { UserService } from '../user/user.service';
import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import { TokenType } from '../../generated/prisma/enums';

describe('TokenService', () => {
  let service: TokenService;

  const mockDatabaseService = {
    token: {
      create: jest.fn(),
      findFirst: jest.fn(),
      findUnique: jest.fn(),
      delete: jest.fn(),
    },
  };
  const mockHashService: Partial<HashService> = {};
  const mockUserService: Partial<UserService> = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TokenService,
        { provide: DatabaseService, useValue: mockDatabaseService },
        { provide: HashService, useValue: mockHashService },
        { provide: UserService, useValue: mockUserService },
      ],
    }).compile();

    service = module.get<TokenService>(TokenService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  const mockUser = { id: 1, email: 'test@test.com' };
  const rawToken = 'abc123def456';
  const mockTokenRow = {
    id: 1,
    token: rawToken,
    type: TokenType.EMAIL_VERIFICATION,
    userId: 1,
    expiresAt: new Date(Date.now() + 60_000),
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  describe('generateToken', () => {
    beforeEach(() => {
      mockHashService.generateToken = jest.fn().mockReturnValue(rawToken);
      mockUserService.findUserById = jest.fn().mockResolvedValue(mockUser);
      mockDatabaseService.token.create = jest
        .fn()
        .mockResolvedValue(mockTokenRow);
    });

    it('should throw NotFoundException when user not found', async () => {
      mockUserService.findUserById = jest.fn().mockResolvedValue(null);
      await expect(
        service.generateToken({
          userId: 1,
          type: TokenType.EMAIL_VERIFICATION,
          expiresAt: new Date(),
        }),
      ).rejects.toThrow(NotFoundException);
    });

    it('should call hashService.generateToken to get raw token', async () => {
      await service.generateToken({
        userId: 1,
        type: TokenType.EMAIL_VERIFICATION,
        expiresAt: new Date(),
      });
      expect(mockHashService.generateToken).toHaveBeenCalled();
    });

    it('should call databaseService.token.create with userId, type, token', async () => {
      const expiresAt = new Date();
      await service.generateToken({
        userId: 1,
        type: TokenType.EMAIL_VERIFICATION,
        expiresAt,
      });
      expect(mockDatabaseService.token.create).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({
            token: rawToken,
            userId: 1,
            type: TokenType.EMAIL_VERIFICATION,
          }),
        }),
      );
    });

    it('should return the raw token string', async () => {
      const result = await service.generateToken({
        userId: 1,
        type: TokenType.EMAIL_VERIFICATION,
        expiresAt: new Date(),
      });
      expect(result).toBe(rawToken);
    });
  });

  describe('verifyToken', () => {
    beforeEach(() => {
      mockDatabaseService.token.findFirst = jest
        .fn()
        .mockResolvedValue(mockTokenRow);
      mockDatabaseService.token.delete = jest
        .fn()
        .mockResolvedValue({ userId: 1 });
    });

    it('should throw UnauthorizedException when token record not found', async () => {
      mockDatabaseService.token.findFirst = jest.fn().mockResolvedValue(null);
      await expect(
        service.verifyToken({
          token: rawToken,
          type: TokenType.EMAIL_VERIFICATION,
        }),
      ).rejects.toThrow(UnauthorizedException);
    });

    it('should throw UnauthorizedException when token is expired', async () => {
      mockDatabaseService.token.findFirst = jest.fn().mockResolvedValue({
        ...mockTokenRow,
        expiresAt: new Date(Date.now() - 1000),
      });
      await expect(
        service.verifyToken({
          token: rawToken,
          type: TokenType.EMAIL_VERIFICATION,
        }),
      ).rejects.toThrow(UnauthorizedException);
    });

    it('should delete the token record on success', async () => {
      await service.verifyToken({
        token: rawToken,
        type: TokenType.EMAIL_VERIFICATION,
      });
      expect(mockDatabaseService.token.delete).toHaveBeenCalledWith(
        expect.objectContaining({ where: { id: mockTokenRow.id } }),
      );
    });

    it('should return the userId on success', async () => {
      const result = await service.verifyToken({
        token: rawToken,
        type: TokenType.EMAIL_VERIFICATION,
      });
      expect(result).toEqual({ userId: 1 });
    });
  });

  describe('findTokenByUserId', () => {
    it('should call databaseService.token.findFirst with userId and type', async () => {
      mockDatabaseService.token.findFirst = jest
        .fn()
        .mockResolvedValue(mockTokenRow);
      await service.findTokenByUserId(1, TokenType.PASSWORD_RESET);
      expect(mockDatabaseService.token.findFirst).toHaveBeenCalledWith({
        where: { userId: 1, type: TokenType.PASSWORD_RESET },
      });
    });
  });

  describe('deleteToken', () => {
    it('should call databaseService.token.delete with the id', async () => {
      mockDatabaseService.token.delete = jest
        .fn()
        .mockResolvedValue(mockTokenRow);
      await service.deleteToken(1);
      expect(mockDatabaseService.token.delete).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });
  });
});
