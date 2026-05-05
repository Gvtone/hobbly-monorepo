import { Injectable } from '@nestjs/common';
import { CreateEntryMoodDto } from './dto/create-entry-mood.dto';
import { UpdateEntryMoodDto } from './dto/update-entry-mood.dto';
import { DatabaseService } from '../../common/database/database.service';

@Injectable()
export class EntryMoodService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createEntryMoodDto: CreateEntryMoodDto) {
    return await this.databaseService.entryMood.create({
      data: createEntryMoodDto,
    });
  }

  async findAll() {
    return await this.databaseService.entryMood.findMany();
  }

  async findOne(id: number) {
    return await this.databaseService.entryMood.findUnique({
      where: { id },
    });
  }

  async update(id: number, updateEntryMoodDto: UpdateEntryMoodDto) {
    return await this.databaseService.entryMood.update({
      where: { id },
      data: updateEntryMoodDto,
    });
  }

  async remove(id: number) {
    return await this.databaseService.entryMood.delete({
      where: { id },
    });
  }
}
