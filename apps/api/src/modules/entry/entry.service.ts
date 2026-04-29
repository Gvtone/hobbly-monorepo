import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEntryDto } from './dto/create-entry.dto';
import { UpdateEntryDto } from './dto/update-entry.dto';
import { DatabaseService } from '../../common/database/database.service';

@Injectable()
export class EntryService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createEntryDto: CreateEntryDto) {
    const mood = await this.databaseService.entryMood.findUnique({
      where: { id: createEntryDto.moodId },
    });

    if (!mood) {
      throw new NotFoundException('Mood does not exist');
    }

    return await this.databaseService.entry.create({ data: createEntryDto });
  }

  async findAll(userId: number) {
    // TODO: Add search query
    return await this.databaseService.entry.findMany({
      where: { userHobby: { userId } },
      include: { userHobby: { include: { hobby: true } }, mood: true },
    });
  }

  async update(id: number, userId: number, updateEntryDto: UpdateEntryDto) {
    return await this.databaseService.entry.update({
      where: { id, userHobby: { userId } },
      data: updateEntryDto,
    });
  }

  async delete(id: number, userId: number) {
    return await this.databaseService.entry.delete({
      where: { id, userHobby: { userId } },
    });
  }
}
