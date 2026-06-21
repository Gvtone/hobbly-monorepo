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
import {
  ConflictException,
  ForbiddenException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { CreateGoogleUserDto } from '../user/dto/create-google-user.dto';
import { AuthPayloadDto } from './dto/auth.dto';
import { PayloadEntity } from './entities/payload.entity';
import { Request, Response } from 'express';

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

  describe('validateUser', () => {
    const usernameIdentifierDto: AuthPayloadDto = {
      identifier: 'testuser',
      password: 'Testpassword123!',
    };

    const emailIdentifierDto: AuthPayloadDto = {
      identifier: 'test@test.com',
      password: 'Testpassword123!',
    };

    const mockFoundUser: UserEntity = {
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

    beforeEach(() => {
      mockUserService.findUserByEmail = jest
        .fn()
        .mockResolvedValue(mockFoundUser);

      mockUserService.findUserByUsername = jest
        .fn()
        .mockResolvedValue(mockFoundUser);

      mockHashService.comparePassword = jest.fn().mockResolvedValue(true);
    });

    it('should call service.validateUser with the provided DTO with email as identifier', async () => {
      await service.validateUser(emailIdentifierDto);

      expect(mockUserService.findUserByEmail).toHaveBeenCalledWith(
        emailIdentifierDto.identifier,
      );
      expect(mockUserService.findUserByUsername).not.toHaveBeenCalled();
    });

    it('should call service.validateUser with the provided DTO with username as identifier', async () => {
      await service.validateUser(usernameIdentifierDto);

      expect(mockUserService.findUserByUsername).toHaveBeenCalledWith(
        usernameIdentifierDto.identifier,
      );
      expect(mockUserService.findUserByEmail).not.toHaveBeenCalled();
    });

    it('should return the payload when user and passwords match', async () => {
      const payload = await service.validateUser(usernameIdentifierDto);

      expect(payload).toEqual(mockPayload);
    });

    it('should return null when user is not found', async () => {
      mockUserService.findUserByEmail = jest.fn().mockResolvedValue(null);

      expect(await service.validateUser(emailIdentifierDto)).toBe(null);
    });

    it('should return null when password does not match', async () => {
      mockHashService.comparePassword = jest.fn().mockResolvedValue(false);

      expect(await service.validateUser(emailIdentifierDto)).toBe(null);
    });
  });

  // Register
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

  describe('forgot', () => {
    const mockFoundUser: UserEntity = {
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

    const mockExistingToken = {
      id: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
      token: '7012db91b57b3708729fce23aa63c1f8435f9ec783290bd5d99c8d5fd4e1f94b',
      type: TokenType.PASSWORD_RESET,
      expiresAt: new Date(),
      userId: mockFoundUser.id,
    };

    const mockNewToken =
      '0458db91b57b3708729fce23aa63c1f8435f9ec783290bd5d99c8d5fd4e1j37s';

    const mockNewTokenDto = {
      userId: mockFoundUser.id,
      type: TokenType.PASSWORD_RESET,
      expiresAt: expect.any(Date),
    };

    const mockSendForgotEmailDto = {
      to: mockFoundUser.email,
      username: mockFoundUser.username,
      token: mockNewToken,
    };

    const mockEmailResult: GenericOutputEntity = {
      status: GenericOutputStatus.SUCCESS,
      message: 'Forgot Password email sent',
    };

    beforeEach(() => {
      mockUserService.findUserByEmail = jest
        .fn()
        .mockResolvedValue(mockFoundUser);

      mockTokenService.findTokenByUserId = jest
        .fn()
        .mockResolvedValue(mockExistingToken);

      mockTokenService.deleteToken = jest
        .fn()
        .mockResolvedValue(mockExistingToken);

      mockTokenService.generateToken = jest
        .fn()
        .mockResolvedValue(mockNewToken);

      mockMailService.sendForgotPasswordEmail = jest
        .fn()
        .mockResolvedValue(mockEmailResult);
    });

    it('should call userService.findUserByEmail with an email', async () => {
      await service.forgot(mockFoundUser.email);

      expect(mockUserService.findUserByEmail).toHaveBeenCalledWith(
        mockFoundUser.email,
      );
    });

    it('should call tokenService.findTokenByUserId with the user ID and PASSWORD_RESET as token type', async () => {
      await service.forgot(mockFoundUser.email);

      expect(mockTokenService.findTokenByUserId).toHaveBeenCalledWith(
        mockFoundUser.id,
        TokenType.PASSWORD_RESET,
      );
    });

    it('should call tokenService.deleteToken if token exist', async () => {
      await service.forgot(mockFoundUser.email);

      expect(mockTokenService.deleteToken).toHaveBeenCalledWith(
        mockExistingToken.id,
      );
    });

    it('should call tokenService.generateToken with userId, type, and expiresAt', async () => {
      await service.forgot(mockFoundUser.email);

      expect(mockTokenService.generateToken).toHaveBeenCalledWith(
        mockNewTokenDto,
      );
    });

    it('should call mailService.sendForgotPasswordEmail with to, username, and token', async () => {
      await service.forgot(mockFoundUser.email);

      expect(mockMailService.sendForgotPasswordEmail).toHaveBeenCalledWith(
        mockSendForgotEmailDto,
      );
    });

    it('should return the result of mailService.sendForgotPasswordEmail', async () => {
      const result = await service.forgot(mockFoundUser.email);

      expect(result).toEqual(mockEmailResult);
    });

    it('should not call tokenService.deleteToken when token does not exist', async () => {
      mockTokenService.findTokenByUserId = jest.fn().mockResolvedValue(null);
      await service.forgot(mockFoundUser.email);

      expect(mockTokenService.deleteToken).not.toHaveBeenCalled();
    });

    it('should throw when user is not found', async () => {
      mockUserService.findUserByEmail = jest.fn().mockResolvedValue(null);

      await expect(service.forgot(mockFoundUser.email)).rejects.toThrow();
      expect(mockTokenService.findTokenByUserId).not.toHaveBeenCalled();
      expect(mockTokenService.generateToken).not.toHaveBeenCalled();
      expect(mockMailService.sendForgotPasswordEmail).not.toHaveBeenCalled();
    });
  });

  describe('logout', () => {
    let mockResponse: { clearCookie: jest.Mock };

    beforeEach(() => {
      mockResponse = {
        clearCookie: jest.fn(),
      };
    });

    it('should clear access_token and refresh_token cookies', async () => {
      await service.logout(mockResponse as unknown as Response);
      expect(mockResponse.clearCookie).toHaveBeenCalledWith('access_token');
      expect(mockResponse.clearCookie).toHaveBeenCalledWith('refresh_token');
    });

    it('should return a success message', async () => {
      const result = await service.logout(mockResponse as unknown as Response);
      expect(result).toEqual({ message: 'Logged out successfully' });
    });
  });

  describe('login', () => {
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

    let mockResponse: { cookie: jest.Mock };
    let mockRequest: { user: PayloadEntity };

    beforeEach(() => {
      mockResponse = { cookie: jest.fn() };
      mockRequest = { user: mockPayload };
      mockConfigService.get = jest.fn().mockImplementation((key: string) => {
        if (key === 'JWT_ACCESS_TOKEN_EXPIRATION') return '15m';
        if (key === 'JWT_REFRESH_TOKEN_EXPIRATION') return '7d';
      });
      mockJwtService.sign = jest.fn().mockReturnValue('mock-token');
    });

    it('should call jwtService.sign twice (access + refresh)', async () => {
      await service.login(
        mockResponse as unknown as Response,
        mockRequest as unknown as Request,
      );
      expect(mockJwtService.sign).toHaveBeenCalledTimes(2);
    });

    it('should set access_token cookie', async () => {
      await service.login(
        mockResponse as unknown as Response,
        mockRequest as unknown as Request,
      );
      expect(mockResponse.cookie).toHaveBeenCalledWith(
        'access_token',
        'mock-token',
        expect.objectContaining({ httpOnly: true }),
      );
    });

    it('should set refresh_token cookie', async () => {
      await service.login(
        mockResponse as unknown as Response,
        mockRequest as unknown as Request,
      );
      expect(mockResponse.cookie).toHaveBeenCalledWith(
        'refresh_token',
        'mock-token',
        expect.objectContaining({ httpOnly: true }),
      );
    });

    it('should return the user payload', async () => {
      const result = await service.login(
        mockResponse as unknown as Response,
        mockRequest as unknown as Request,
      );
      expect(result).toEqual(mockPayload);
    });
  });

  describe('me', () => {
    const mockUser = { id: 1, email: 'test@test.com', username: 'testuser' };
    const mockRequest = { user: { sub: 1 } };

    beforeEach(() => {
      mockUserService.findUserById = jest.fn().mockResolvedValue(mockUser);
    });

    it('should call userService.findUserById with request user sub', async () => {
      await service.me(mockRequest as unknown as Request);
      expect(mockUserService.findUserById).toHaveBeenCalledWith(1);
    });

    it('should return the result of findUserById', async () => {
      const result = await service.me(mockRequest as unknown as Request);
      expect(result).toEqual(mockUser);
    });
  });

  describe('reset', () => {
    const resetDto: ResetPasswordDto = {
      token: 'abc123',
      password: 'NewPass123!',
    };
    const mockTokenResult = { userId: 1 };
    const mockUser = { id: 1, email: 'test@test.com', username: 'testuser' };

    beforeEach(() => {
      mockTokenService.verifyToken = jest
        .fn()
        .mockResolvedValue(mockTokenResult);
      mockHashService.hashPassword = jest
        .fn()
        .mockResolvedValue('hashed-password');
      mockUserService.update = jest.fn().mockResolvedValue(mockUser);
      mockMailService.sendPasswordChangedEmail = jest
        .fn()
        .mockResolvedValue(undefined);
    });

    it('should call tokenService.verifyToken with PASSWORD_RESET type', async () => {
      await service.reset(resetDto);
      expect(mockTokenService.verifyToken).toHaveBeenCalledWith({
        token: resetDto.token,
        type: TokenType.PASSWORD_RESET,
      });
    });

    it('should call hashService.hashPassword with new password', async () => {
      await service.reset(resetDto);
      expect(mockHashService.hashPassword).toHaveBeenCalledWith(
        resetDto.password,
      );
    });

    it('should call userService.update with hashed password', async () => {
      await service.reset(resetDto);
      expect(mockUserService.update).toHaveBeenCalledWith(1, {
        password: 'hashed-password',
      });
    });

    it('should call mailService.sendPasswordChangedEmail', async () => {
      await service.reset(resetDto);
      expect(mockMailService.sendPasswordChangedEmail).toHaveBeenCalledWith({
        to: mockUser.email,
        username: mockUser.username,
      });
    });

    it('should return success result', async () => {
      const result = await service.reset(resetDto);
      expect(result).toEqual({
        status: GenericOutputStatus.SUCCESS,
        message: 'Password reset successfully',
      });
    });
  });

  describe('verifyEmail', () => {
    const token = 'verify-token-abc';
    const mockTokenResult = { userId: 1 };
    const mockUser = { id: 1, email: 'test@test.com', username: 'testuser' };
    const mockUpdatedUser = { ...mockUser, status: 'ACTIVE' };

    beforeEach(() => {
      mockTokenService.verifyToken = jest
        .fn()
        .mockResolvedValue(mockTokenResult);
      mockUserService.findUserById = jest.fn().mockResolvedValue(mockUser);
      mockMailService.sendWelcomeEmail = jest.fn().mockResolvedValue(undefined);
      mockUserService.update = jest.fn().mockResolvedValue(mockUpdatedUser);
    });

    it('should propagate when tokenService.verifyToken throws', async () => {
      mockTokenService.verifyToken = jest
        .fn()
        .mockRejectedValue(new UnauthorizedException('Token Invalid'));
      await expect(service.verifyEmail(token)).rejects.toThrow(
        UnauthorizedException,
      );
    });

    it('should throw NotFoundException when user not found', async () => {
      mockUserService.findUserById = jest.fn().mockResolvedValue(null);
      await expect(service.verifyEmail(token)).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should call mailService.sendWelcomeEmail with user email and username', async () => {
      await service.verifyEmail(token);
      expect(mockMailService.sendWelcomeEmail).toHaveBeenCalledWith({
        email: mockUser.email,
        username: mockUser.username,
      });
    });

    it('should call userService.update with status ACTIVE', async () => {
      await service.verifyEmail(token);
      expect(mockUserService.update).toHaveBeenCalledWith(1, {
        status: 'ACTIVE',
      });
    });

    it('should return the updated user', async () => {
      const result = await service.verifyEmail(token);
      expect(result).toEqual(mockUpdatedUser);
    });
  });

  describe('resendVerificationEmail', () => {
    const email = 'test@test.com';
    const mockUser = {
      id: 1,
      email,
      username: 'testuser',
      status: 'VERIFY',
    };
    const mockExistingToken = { id: 10 };

    beforeEach(() => {
      mockUserService.findUserByEmail = jest.fn().mockResolvedValue(mockUser);
      mockTokenService.findTokenByUserId = jest
        .fn()
        .mockResolvedValue(mockExistingToken);
      mockTokenService.deleteToken = jest.fn().mockResolvedValue(undefined);
      mockTokenService.generateToken = jest.fn().mockResolvedValue('new-token');
      mockMailService.sendVerificationEmail = jest
        .fn()
        .mockResolvedValue(undefined);
    });

    it('should return FAILED when user not found', async () => {
      mockUserService.findUserByEmail = jest.fn().mockResolvedValue(null);
      const result = await service.resendVerificationEmail(email);
      expect(result).toEqual({
        status: GenericOutputStatus.FAILED,
        message: 'No user found',
      });
    });

    it('should return FAILED when user is already ACTIVE', async () => {
      mockUserService.findUserByEmail = jest
        .fn()
        .mockResolvedValue({ ...mockUser, status: 'ACTIVE' });
      const result = await service.resendVerificationEmail(email);
      expect(result).toEqual({
        status: GenericOutputStatus.FAILED,
        message: 'Email is already active. Please log in.',
      });
    });

    it('should call tokenService.deleteToken when existing token exists', async () => {
      await service.resendVerificationEmail(email);
      expect(mockTokenService.deleteToken).toHaveBeenCalledWith(
        mockExistingToken.id,
      );
    });

    it('should not call tokenService.deleteToken when no existing token', async () => {
      mockTokenService.findTokenByUserId = jest.fn().mockResolvedValue(null);
      await service.resendVerificationEmail(email);
      expect(mockTokenService.deleteToken).not.toHaveBeenCalled();
    });

    it('should call tokenService.generateToken with correct args', async () => {
      await service.resendVerificationEmail(email);
      expect(mockTokenService.generateToken).toHaveBeenCalledWith({
        userId: mockUser.id,
        type: TokenType.EMAIL_VERIFICATION,
        expiresAt: expect.any(Date),
      });
    });

    it('should call mailService.sendVerificationEmail', async () => {
      await service.resendVerificationEmail(email);
      expect(mockMailService.sendVerificationEmail).toHaveBeenCalledWith({
        to: mockUser.email,
        username: mockUser.username,
        token: 'new-token',
      });
    });

    it('should return SUCCESS result', async () => {
      const result = await service.resendVerificationEmail(email);
      expect(result).toEqual({
        status: GenericOutputStatus.SUCCESS,
        message: 'New verification email has been sent.',
      });
    });
  });

  describe('refreshToken', () => {
    const mockRefreshPayload: PayloadEntity = {
      sub: 1,
      displayName: '',
      username: 'testuser',
      email: 'test@test.com',
      role: 'HOBBYIST',
      visibility: 'PRIVATE',
      status: 'ACTIVE',
      type: 'REFRESH',
    };

    const mockUser = {
      id: 1,
      email: 'test@test.com',
      username: 'testuser',
      role: 'HOBBYIST',
      visibility: 'PRIVATE',
      status: 'ACTIVE',
      displayName: '',
    };

    let mockResponse: { cookie: jest.Mock; clearCookie: jest.Mock };
    let mockRequest: { cookies: { refresh_token: string } };

    beforeEach(() => {
      mockResponse = { cookie: jest.fn(), clearCookie: jest.fn() };
      mockRequest = { cookies: { refresh_token: 'valid-refresh-token' } };
      mockJwtService.verify = jest.fn().mockReturnValue(mockRefreshPayload);
      mockConfigService.get = jest.fn().mockImplementation((key: string) => {
        if (key === 'JWT_SECRET') return 'secret';
        if (key === 'JWT_ACCESS_TOKEN_EXPIRATION') return '15m';
        if (key === 'JWT_REFRESH_TOKEN_EXPIRATION') return '7d';
      });
      mockUserService.findUserById = jest.fn().mockResolvedValue(mockUser);
      mockJwtService.sign = jest.fn().mockReturnValue('new-token');
    });

    it('should throw UnauthorizedException when no refresh_token cookie', async () => {
      const req = { cookies: {} };
      await expect(
        service.refreshToken(
          mockResponse as unknown as Response,
          req as unknown as Request,
        ),
      ).rejects.toThrow(UnauthorizedException);
    });

    it('should throw UnauthorizedException and clear cookies when JWT is invalid', async () => {
      mockJwtService.verify = jest.fn().mockImplementation(() => {
        throw new Error('jwt expired');
      });
      await expect(
        service.refreshToken(
          mockResponse as unknown as Response,
          mockRequest as unknown as Request,
        ),
      ).rejects.toThrow(UnauthorizedException);
      expect(mockResponse.clearCookie).toHaveBeenCalledWith('access_token');
      expect(mockResponse.clearCookie).toHaveBeenCalledWith('refresh_token');
    });

    it('should throw UnauthorizedException when token type is not REFRESH', async () => {
      mockJwtService.verify = jest
        .fn()
        .mockReturnValue({ ...mockRefreshPayload, type: 'ACCESS' });
      await expect(
        service.refreshToken(
          mockResponse as unknown as Response,
          mockRequest as unknown as Request,
        ),
      ).rejects.toThrow(UnauthorizedException);
    });

    it('should throw UnauthorizedException when user not found', async () => {
      mockUserService.findUserById = jest.fn().mockResolvedValue(null);
      await expect(
        service.refreshToken(
          mockResponse as unknown as Response,
          mockRequest as unknown as Request,
        ),
      ).rejects.toThrow(UnauthorizedException);
    });

    it('should set new access_token and refresh_token cookies on success', async () => {
      await service.refreshToken(
        mockResponse as unknown as Response,
        mockRequest as unknown as Request,
      );
      expect(mockResponse.cookie).toHaveBeenCalledWith(
        'access_token',
        'new-token',
        expect.objectContaining({ httpOnly: true }),
      );
      expect(mockResponse.cookie).toHaveBeenCalledWith(
        'refresh_token',
        'new-token',
        expect.objectContaining({ httpOnly: true }),
      );
    });

    it('should return the new payload on success', async () => {
      const result = await service.refreshToken(
        mockResponse as unknown as Response,
        mockRequest as unknown as Request,
      );
      expect(result).toMatchObject({
        sub: mockUser.id,
        email: mockUser.email,
        username: mockUser.username,
        type: 'ACCESS',
      });
    });
  });

  describe('findOrCreateGoogleUser', () => {
    const googleUserDto: CreateGoogleUserDto = {
      email: 'test@test.com',
      googleId: 'google-123',
      avatar: 'https://avatar.url',
    };

    const mockCreatedUser = {
      id: 1,
      email: 'test@test.com',
      username: 'testuser',
      googleId: 'google-123',
      displayName: '',
      role: 'HOBBYIST',
      visibility: 'PRIVATE',
      status: 'ACTIVE',
    };

    beforeEach(() => {
      mockUserService.findUserByEmail = jest.fn().mockResolvedValue(null);
      mockUserService.createWithGoogle = jest
        .fn()
        .mockResolvedValue(mockCreatedUser);
      mockUserService.update = jest
        .fn()
        .mockResolvedValue({ ...mockCreatedUser, googleId: 'google-123' });
      mockMailService.sendWelcomeEmail = jest.fn().mockResolvedValue(undefined);
      mockConfigService.get = jest.fn().mockReturnValue(undefined);
    });

    it('should create a new user when email not found', async () => {
      await service.findOrCreateGoogleUser(googleUserDto);
      expect(mockUserService.createWithGoogle).toHaveBeenCalledWith(
        googleUserDto,
      );
    });

    it('should send welcome email when user is new', async () => {
      await service.findOrCreateGoogleUser(googleUserDto);
      expect(mockMailService.sendWelcomeEmail).toHaveBeenCalledWith({
        email: mockCreatedUser.email,
        username: mockCreatedUser.username,
      });
    });

    it('should throw ForbiddenException when signups disabled and user is new', async () => {
      mockConfigService.get = jest.fn().mockReturnValue('true');
      await expect(
        service.findOrCreateGoogleUser(googleUserDto),
      ).rejects.toThrow(ForbiddenException);
    });

    it('should update googleId when existing user has no googleId', async () => {
      const userWithoutGoogleId = { ...mockCreatedUser, googleId: null };
      mockUserService.findUserByEmail = jest
        .fn()
        .mockResolvedValue(userWithoutGoogleId);
      await service.findOrCreateGoogleUser(googleUserDto);
      expect(mockUserService.update).toHaveBeenCalledWith(mockCreatedUser.id, {
        googleId: googleUserDto.googleId,
      });
    });

    it('should not create or update when existing user already has googleId', async () => {
      mockUserService.findUserByEmail = jest
        .fn()
        .mockResolvedValue(mockCreatedUser);
      await service.findOrCreateGoogleUser(googleUserDto);
      expect(mockUserService.createWithGoogle).not.toHaveBeenCalled();
      expect(mockUserService.update).not.toHaveBeenCalled();
    });

    it('should return a PayloadEntity with type ACCESS', async () => {
      const result = await service.findOrCreateGoogleUser(googleUserDto);
      expect(result).toMatchObject({
        sub: mockCreatedUser.id,
        email: mockCreatedUser.email,
        username: mockCreatedUser.username,
        type: 'ACCESS',
      });
    });
  });
});
