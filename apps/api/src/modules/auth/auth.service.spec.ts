import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { HashService } from '../../common/utils/hash.service';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { MailService } from '../mail/mail.service';
import { TokenService } from '../token/token.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import {
  GenericOutputEntity,
  GenericOutputStatus,
} from '../../common/entities/generic-output.entity';
import { UserEntity } from '../user/entities/user.entity';
import { TokenType } from '../../generated/prisma/enums';
import { ConflictException } from '@nestjs/common';

describe('AuthService', () => {
  let service: AuthService;

  const mockUserService: Partial<UserService> = {};
  const mockHashService: Partial<HashService> = {};
  const mockConfigService: Partial<ConfigService> = {};
  const mockJwtService: Partial<JwtService> = {};
  const mockMailService: Partial<MailService> = {};
  const mockTokenService: Partial<TokenService> = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UserService, useValue: mockUserService },
        { provide: HashService, useValue: mockHashService },
        { provide: ConfigService, useValue: mockConfigService },
        { provide: JwtService, useValue: mockJwtService },
        { provide: MailService, useValue: mockMailService },
        { provide: TokenService, useValue: mockTokenService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('register', () => {
    const createUserDto: CreateUserDto = {
      email: 'test@test.com',
      username: 'testuser',
      password: 'password123',
    };

    const mockCreatedUser: UserEntity = {
      id: 1,
      email: 'test@test.com',
      username: 'testuser',
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: undefined,
      displayName: '',
      googleId: '',
      password: '',
      profilePicture: '',
      coverImage: '',
      bio: '',
      role: 'HOBBYIST',
      visibility: 'PRIVATE',
      status: 'VERIFY',
    };

    const mockToken =
      '7012db91b57b3708729fce23aa63c1f8435f9ec783290bd5d99c8d5fd4e1f94b';

    const mockEmailResult: GenericOutputEntity = {
      status: GenericOutputStatus.SUCCESS,
      message: 'Verification email sent',
    };

    beforeEach(() => {
      mockUserService.create = jest.fn().mockResolvedValue(mockCreatedUser);
      mockTokenService.generateToken = jest.fn().mockResolvedValue(mockToken);
      mockMailService.sendVerificationEmail = jest
        .fn()
        .mockResolvedValue(mockEmailResult);
    });

    it('should call userService.create with the provided DTO', async () => {
      await service.register(createUserDto);

      expect(mockUserService.create).toHaveBeenCalledWith(createUserDto);
    });

    it('should call tokenService.generateToken with correct args', async () => {
      await service.register(createUserDto);

      expect(mockTokenService.generateToken).toHaveBeenCalledWith({
        userId: mockCreatedUser.id,
        type: TokenType.EMAIL_VERIFICATION,
        expiresAt: expect.any(Date),
      });
    });

    it('should return the result of mailService.sendVerificationEmail', async () => {
      const result = await service.register(createUserDto);

      expect(result).toBe(mockEmailResult);
    });

    it('should throw if userService.create throws', async () => {
      mockUserService.create = jest
        .fn()
        .mockRejectedValue(new ConflictException('Email already in use'));

      await expect(service.register(createUserDto)).rejects.toThrow(
        ConflictException,
      );
    });

    it('should not send email if generateToken throws', async () => {
      mockUserService.create = jest.fn().mockResolvedValue(mockCreatedUser);
      mockTokenService.generateToken = jest
        .fn()
        .mockRejectedValue(new Error('DB error'));

      await expect(service.register(createUserDto)).rejects.toThrow();
      expect(mockMailService.sendVerificationEmail).not.toHaveBeenCalled();
    });
  });
});
