import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DatabaseService } from '../../common/database/database.service';
import { UserEntity } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { HashService } from '../../common/utils/hash.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { PayloadEntity } from '../auth/entities/payload.entity';
import { CloudinaryService } from '../../common/cloudinary/cloudinary.service';
import { UserFilterDto } from './dto/user-filter.dto';
import { Prisma } from '../../generated/prisma/client';

@Injectable()
export class UserService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly hashService: HashService,
    private readonly cloudinary: CloudinaryService,
  ) {}

  async findAll({
    id,
    search,
    role,
    status,
    visibility,
    page,
    limit = 10,
  }: UserFilterDto) {
    const whereClause: Prisma.UserWhereInput = {
      ...(id && { id: { in: id } }),
      ...(role && { role }),
      ...(status && { status }),
      ...(visibility && { visibility }),

      ...(search && {
        OR: [
          { displayName: { contains: search, mode: 'insensitive' } },
          { username: { contains: search, mode: 'insensitive' } },
          { email: { contains: search, mode: 'insensitive' } },
          { bio: { contains: search, mode: 'insensitive' } },
        ],
      }),
    };

    const paginatedDatabse = await this.databaseService.paginateModel();

    return await paginatedDatabse.user
      .paginate({
        where: whereClause,
        omit: { password: true },
        orderBy: { createdAt: 'desc' },
      })
      .withPages({ page, limit });
  }

  async findUserByEmail(email: string) {
    const user = await this.databaseService.user.findFirst({
      where: { email: { equals: email, mode: 'insensitive' } },
    });

    if (!user) return null;
    return new UserEntity(user);
  }

  async findUserById(id: number) {
    return await this.databaseService.user.findFirst({
      where: { id },
      omit: { password: true },
    });
  }

  async findUserByUsernamePublic(username: string) {
    return await this.databaseService.user.findFirst({
      where: { username },
      select: {
        id: true,
        createdAt: true,
        displayName: true,
        username: true,
        profilePicture: true,
        coverImage: true,
        bio: true,
        visibility: true,
      },
    });
  }

  async findUserByUsername(username: string) {
    const user = await this.databaseService.user.findFirst({
      where: { username },
    });

    if (!user) return null;
    return new UserEntity(user);
  }

  async create({ username, email, password }: CreateUserDto) {
    const existingUsername = await this.databaseService.user.findFirst({
      where: { username },
    });

    if (existingUsername)
      throw new ConflictException(
        'An account with this username already exists.',
      );

    const existingEmail = await this.databaseService.user.findFirst({
      where: { email },
    });

    if (existingEmail)
      throw new ConflictException('An account with this email already exists.');

    const hashedPassword = await this.hashService.hashPassword(password);

    const user = await this.databaseService.user.create({
      data: { password: hashedPassword, username, email },
    });

    return new UserEntity(user);
  }

  async uploadProfilePicture(user: PayloadEntity, image: Express.Multer.File) {
    const { profilePicture } = await this.findUserById(user.sub);

    const isCloudinaryUrl = profilePicture?.includes('res.cloudinary.com');

    if (isCloudinaryUrl) await this.cloudinary.delete(profilePicture);

    const { secure_url } = await this.cloudinary.upload(
      image,
      'profilePicture',
    );

    return await this.databaseService.user.update({
      where: { id: user.sub },
      data: { profilePicture: secure_url },
      omit: { password: true },
    });
  }

  async removeProfilePicture(user: PayloadEntity) {
    const { profilePicture } = await this.findUserById(user.sub);

    if (!profilePicture)
      throw new NotFoundException('User have no profile picture');

    const isCloudinaryUrl = profilePicture?.includes('res.cloudinary.com');

    if (isCloudinaryUrl) await this.cloudinary.delete(profilePicture);

    return await this.databaseService.user.update({
      where: { id: user.sub },
      data: { profilePicture: null },
      omit: { password: true },
    });
  }

  async uploadCoverImage(user: PayloadEntity, image: Express.Multer.File) {
    const { coverImage } = await this.findUserById(user.sub);

    const isCloudinaryUrl = coverImage?.includes('res.cloudinary.com');

    if (isCloudinaryUrl) await this.cloudinary.delete(coverImage);

    const { secure_url } = await this.cloudinary.upload(image, 'coverImage');

    return await this.databaseService.user.update({
      where: { id: user.sub },
      data: { coverImage: secure_url },
      omit: { password: true },
    });
  }

  async removeCoverImage(user: PayloadEntity) {
    const { coverImage } = await this.findUserById(user.sub);

    if (!coverImage)
      throw new NotFoundException('User have no profile picture');

    const isCloudinaryUrl = coverImage?.includes('res.cloudinary.com');

    if (isCloudinaryUrl) await this.cloudinary.delete(coverImage);

    return await this.databaseService.user.update({
      where: { id: user.sub },
      data: { coverImage: null },
      omit: { password: true },
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return await this.databaseService.user.update({
      where: { id },
      data: { ...updateUserDto },
      omit: { password: true },
    });
  }

  async delete(id: number) {
    return await this.databaseService.user.delete({
      where: { id },
      omit: { password: true },
    });
  }
}
