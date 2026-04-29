import { Injectable } from '@nestjs/common';
import { CreateEntryMoodDto } from './dto/create-entry-mood.dto';
import { UpdateEntryMoodDto } from './dto/update-entry-mood.dto';

@Injectable()
export class EntryMoodService {
  create(createEntryMoodDto: CreateEntryMoodDto) {
    return 'This action adds a new entryMood';
  }

  findAll() {
    return `This action returns all entryMood`;
  }

  findOne(id: number) {
    return `This action returns a #${id} entryMood`;
  }

  update(id: number, updateEntryMoodDto: UpdateEntryMoodDto) {
    return `This action updates a #${id} entryMood`;
  }

  remove(id: number) {
    return `This action removes a #${id} entryMood`;
  }
}
