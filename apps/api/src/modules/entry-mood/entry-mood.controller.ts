import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EntryMoodService } from './entry-mood.service';
import { CreateEntryMoodDto } from './dto/create-entry-mood.dto';
import { UpdateEntryMoodDto } from './dto/update-entry-mood.dto';

@Controller('entry-mood')
export class EntryMoodController {
  constructor(private readonly entryMoodService: EntryMoodService) {}

  @Post()
  create(@Body() createEntryMoodDto: CreateEntryMoodDto) {
    return this.entryMoodService.create(createEntryMoodDto);
  }

  @Get()
  findAll() {
    return this.entryMoodService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.entryMoodService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEntryMoodDto: UpdateEntryMoodDto) {
    return this.entryMoodService.update(+id, updateEntryMoodDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.entryMoodService.remove(+id);
  }
}
