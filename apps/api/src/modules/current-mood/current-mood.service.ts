import { Injectable } from '@nestjs/common';
import { SetCurrentMoodDto } from './dto/create-current-mood.dto';
import { DatabaseService } from '../../common/database/database.service';

@Injectable()
export class CurrentMoodService {
  constructor(private readonly databaseService: DatabaseService) {}

  async setOrUpdate(userId: number, createCurrentMoodDto: SetCurrentMoodDto) {
    const existingMood = await this.databaseService.currentMood.findFirst({
      where: { userId },
    });

    if (!existingMood)
      return await this.databaseService.currentMood.create({
        data: { userId, ...createCurrentMoodDto },
      });

    return await this.databaseService.currentMood.update({
      where: { userId },
      data: createCurrentMoodDto,
    });
  }

  async findOne(userId: number) {
    return await this.databaseService.currentMood.findFirst({
      where: { userId },
    });
  }

  async delete(userId: number) {
    return await this.databaseService.currentMood.delete({ where: { userId } });
  }
}
