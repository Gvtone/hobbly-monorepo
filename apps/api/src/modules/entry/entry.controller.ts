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
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { EntryService } from './entry.service';
import { CreateEntryDto } from './dto/create-entry.dto';
import { UpdateEntryDto } from './dto/update-entry.dto';
import { AuthUser } from '../../common/decorators/auth-user.decorator';
import { PayloadEntity } from '../auth/entities/payload.entity';
import {
  ApiBody,
  ApiConsumes,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { EntryEntity, EntryEntityWithUserHobby } from './entities/entry.entity';
import { EntryFilterDto, PublicEntryFilterDto } from './dto/entry-filter.dto';
import { PaginatedEntity } from '../../common/entities/paginated.entity';
import { Public } from '../../common/decorators/public.decorator';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('Entry')
@Controller('entry')
export class EntryController {
  constructor(private readonly entryService: EntryService) {}

  @Post()
  @ApiOperation({ summary: 'Creates new entry under a user hobby' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: CreateEntryDto })
  @UseInterceptors(FileInterceptor('image'))
  @ApiOkResponse({ description: 'Create successful', type: EntryEntity })
  async create(
    @Body() createEntryDto: CreateEntryDto,
    @UploadedFile() image?: Express.Multer.File,
  ) {
    return await this.entryService.create(createEntryDto, image);
  }

  @Public()
  @Get('public')
  @ApiOperation({ summary: 'Fetch all entries' })
  @ApiOkResponse({
    description: 'Fetch successful',
    type: PaginatedEntity(EntryEntityWithUserHobby),
  })
  async findAllPublic(@Query() filter: PublicEntryFilterDto) {
    const [data, meta] = await this.entryService.findAll({
      ...filter,
      visibility: 'PUBLIC',
      userVisibility: 'PUBLIC',
    });
    return { data, ...meta };
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
