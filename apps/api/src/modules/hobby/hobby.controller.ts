import {
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { HobbyService } from './hobby.service';
import { CreateHobbyDto } from './dto/create-hobby.dto';
import { UpdateHobbyDto } from './dto/update-hobby.dto';
import { ApiBody, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Roles } from '../../common/decorators/roles.decorator';
import { UserRole } from '../../generated/prisma/enums';
import { HobbyEntity } from './entities/hobby.entity';

@ApiTags('Hobby')
@Controller('hobby')
@Roles(UserRole.ADMIN)
export class HobbyController {
  constructor(private readonly hobbyService: HobbyService) {}

  @Post()
  @ApiOperation({ summary: 'Creates new hobby' })
  @ApiBody({ type: CreateHobbyDto })
  @ApiOkResponse({ description: 'Login successful', type: HobbyEntity })
  async create(createHobbyDto: CreateHobbyDto) {
    return await this.hobbyService.create(createHobbyDto);
  }

  @Get('find-all')
  @ApiOperation({ summary: 'Finds all of existing hobbies' })
  @ApiOkResponse({
    description: 'Fetch successful',
    type: [HobbyEntity],
  })
  async findAll() {
    return await this.hobbyService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Fetch hobby based on ID' })
  @ApiOkResponse({ description: 'Fetch successful', type: HobbyEntity })
  async findById(@Param('id', ParseIntPipe) id: number) {
    return await this.hobbyService.findById(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Updates a hobby' })
  @ApiBody({ type: UpdateHobbyDto })
  @ApiOkResponse({ description: 'Update successful', type: HobbyEntity })
  async update(
    @Param('id', ParseIntPipe) id: number,
    updateHobbyDto: UpdateHobbyDto,
  ) {
    return await this.hobbyService.update(id, updateHobbyDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deletes a hobby' })
  @ApiOkResponse({ description: 'Delete successful', type: HobbyEntity })
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.hobbyService.delete(id);
  }
}
