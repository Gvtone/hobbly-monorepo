import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../../common/database/database.service';
import { CreateUserHobbyDto } from './dto/create-user-hobby.dto';
import { UpdateUserHobbyDto } from './dto/update-user-hobby.dto';

@Injectable()
export class UserHobbyService {
  constructor(private readonly databaseService: DatabaseService) {}

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
  ) {
    return await this.databaseService.userHobby.update({
      where: { id, userId },
      data: updateUserHobbyDto,
    });
  }

  async delete(id: number, userId: number) {
    return await this.databaseService.userHobby.delete({
      where: { id, userId },
    });
  }
}
