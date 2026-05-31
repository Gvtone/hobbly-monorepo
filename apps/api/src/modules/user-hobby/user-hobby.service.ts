import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../../common/database/database.service';
import { CreateUserHobbyDto } from './dto/create-user-hobby.dto';
import { UpdateUserHobbyDto } from './dto/update-user-hobby.dto';
import { CloudinaryService } from '../../common/cloudinary/cloudinary.service';

@Injectable()
export class UserHobbyService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly cloudinary: CloudinaryService,
  ) {}

  async create(userId: number, createUserHobbyDto: CreateUserHobbyDto) {
    return await this.databaseService.userHobby.create({
      data: { userId, ...createUserHobbyDto },
    });
  }

  async findAll(userId: number) {
    // TODO: Create query search
    return await this.databaseService.userHobby.findMany({
      where: { userId },
      include: { hobby: true },
    });
  }

  async findById(id: number, userId: number) {
    return await this.databaseService.userHobby.findFirst({
      where: { id, userId },
    });
  }

  async update(
    id: number,
    userId: number,
    updateUserHobbyDto: UpdateUserHobbyDto,
    image?: Express.Multer.File,
  ) {
    if (!image) {
      return await this.databaseService.userHobby.update({
        where: { id, userId },
        data: updateUserHobbyDto,
      });
    }

    return await this.databaseService.$transaction(async (tx) => {
      const currentUserHobby = await tx.userHobby.findFirst({
        where: { id, userId },
      });

      if (currentUserHobby.backgroundImage) {
        const isCloudinaryUrl =
          currentUserHobby.backgroundImage?.includes('res.cloudinary.com');

        if (isCloudinaryUrl)
          await this.cloudinary.delete(currentUserHobby.backgroundImage);
      }

      const { secure_url } = await this.cloudinary.upload(
        image,
        `userHobbyCover`,
      );

      return await tx.userHobby.update({
        where: { id, userId },
        data: { ...updateUserHobbyDto, backgroundImage: secure_url },
      });
    });
  }

  async delete(id: number, userId: number) {
    return await this.databaseService.userHobby.delete({
      where: { id, userId },
    });
  }
}
