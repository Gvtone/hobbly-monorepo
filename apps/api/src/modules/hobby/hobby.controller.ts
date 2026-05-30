import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { HobbyService } from './hobby.service';
import { CreateHobbyDto } from './dto/create-hobby.dto';
import { UpdateHobbyDto } from './dto/update-hobby.dto';
import {
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { Roles } from '../../common/decorators/roles.decorator';
import { UserRole } from '../../generated/prisma/enums';
import { HobbyEntity } from './entities/hobby.entity';
import { HobbyFilterDto } from './dto/hobby-filter.dto';
import { PaginatedEntity } from '../../common/entities/paginated.entity';
import { SkipThrottle } from '@nestjs/throttler';

@ApiTags('Hobby')
@Controller('hobby')
export class HobbyController {
  constructor(private readonly hobbyService: HobbyService) {}

  @Post()
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Creates new hobby' })
  @ApiBody({ type: CreateHobbyDto })
  @ApiOkResponse({ description: 'Create successful', type: HobbyEntity })
  async create(@Body() createHobbyDto: CreateHobbyDto) {
    return await this.hobbyService.create(createHobbyDto);
  }

  @Get()
  @SkipThrottle()
  @ApiOperation({ summary: 'Finds all of existing hobbies' })
  @ApiOkResponse({
    description: 'Fetch successful',
    type: PaginatedEntity(HobbyEntity),
  })
  async findAll(@Query() filter: HobbyFilterDto) {
    const [data, meta] = await this.hobbyService.findAll(filter);
    return { data, ...meta };
  }

  @Get(':id')
  @SkipThrottle()
  @ApiOperation({ summary: 'Fetch hobby based on ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiOkResponse({ description: 'Fetch successful', type: HobbyEntity })
  async findById(@Param('id', ParseIntPipe) id: number) {
    return await this.hobbyService.findById(id);
  }

  @Patch(':id')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Updates a hobby' })
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({ type: UpdateHobbyDto })
  @ApiOkResponse({ description: 'Update successful', type: HobbyEntity })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateHobbyDto: UpdateHobbyDto,
  ) {
    return await this.hobbyService.update(id, updateHobbyDto);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Deletes a hobby' })
  @ApiParam({ name: 'id', type: Number })
  @ApiOkResponse({ description: 'Delete successful', type: HobbyEntity })
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.hobbyService.delete(id);
  }
}
