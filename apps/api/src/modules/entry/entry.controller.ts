import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { EntryService } from './entry.service';
import { CreateEntryDto } from './dto/create-entry.dto';
import { UpdateEntryDto } from './dto/update-entry.dto';
import { AuthUser } from '../../common/decorators/auth-user.decorator';
import { PayloadEntity } from '../auth/entities/payload.entity';
import {
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { EntryEntity, EntryEntityWithUserHobby } from './entities/entry.entity';
import { EntryFilterDto } from './dto/entry-filter.dto';
import { PaginatedEntity } from '../../common/entities/paginated.entity';

@ApiTags('Entry')
@Controller('entry')
export class EntryController {
  constructor(private readonly entryService: EntryService) {}

  @Post()
  @ApiOperation({ summary: 'Creates new entry under a user hobby' })
  @ApiBody({ type: CreateEntryDto })
  @ApiOkResponse({ description: 'Create successful', type: EntryEntity })
  async create(@Body() createEntryDto: CreateEntryDto) {
    return await this.entryService.create(createEntryDto);
  }

  @Get()
  @ApiOperation({ summary: 'Fetch all entries' })
  @ApiOkResponse({
    description: 'Fetch successful',
    type: PaginatedEntity(EntryEntityWithUserHobby),
  })
  async findAll(@Query() filter: EntryFilterDto) {
    const [data, meta] = await this.entryService.findAll(filter);
    return { data, ...meta };
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Updates an entry' })
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({ type: UpdateEntryDto })
  @ApiOkResponse({ description: 'Update successful', type: EntryEntity })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @AuthUser() user: PayloadEntity,
    @Body() updateEntryDto: UpdateEntryDto,
  ) {
    return await this.entryService.update(id, user.sub, updateEntryDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deletes an entry' })
  @ApiParam({ name: 'id', type: Number })
  @ApiOkResponse({ description: 'Delete successful', type: EntryEntity })
  async delete(
    @Param('id', ParseIntPipe) id: number,
    @AuthUser() user: PayloadEntity,
  ) {
    return await this.entryService.delete(id, user.sub);
  }
}
