import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { EntryMoodService } from './entry-mood.service';
import { CreateEntryMoodDto } from './dto/create-entry-mood.dto';
import { UpdateEntryMoodDto } from './dto/update-entry-mood.dto';
import { ApiBody, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { EntryMoodEntity } from './entities/entry-mood.entity';

@Controller('entry-mood')
export class EntryMoodController {
  constructor(private readonly entryMoodService: EntryMoodService) {}

  @Post()
  @ApiOperation({ summary: 'Creates new entry mood' })
  @ApiBody({ type: CreateEntryMoodDto })
  @ApiOkResponse({ description: 'Create successful', type: EntryMoodEntity })
  create(@Body() createEntryMoodDto: CreateEntryMoodDto) {
    return this.entryMoodService.create(createEntryMoodDto);
  }

  @Get('find-all')
  @ApiOperation({ summary: 'Fetches all entry moods' })
  @ApiOkResponse({ description: 'Fetch successful', type: EntryMoodEntity })
  findAll() {
    return this.entryMoodService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Fetches a single entry mood' })
  @ApiOkResponse({ description: 'Fetch successful', type: EntryMoodEntity })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.entryMoodService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Updates an existing entry mood' })
  @ApiBody({ type: UpdateEntryMoodDto })
  @ApiOkResponse({ description: 'Update successful', type: EntryMoodEntity })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateEntryMoodDto: UpdateEntryMoodDto,
  ) {
    return this.entryMoodService.update(id, updateEntryMoodDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deletes an existing entry mood' })
  @ApiOkResponse({ description: 'Delete successful', type: EntryMoodEntity })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.entryMoodService.remove(id);
  }
}
