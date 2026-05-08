import { Controller, Get, Post, Body, Delete } from '@nestjs/common';
import { CurrentMoodService } from './current-mood.service';
import { SetCurrentMoodDto } from './dto/create-current-mood.dto';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { CurrentMoodEntity } from './entities/current-mood.entity';
import { AuthUser } from '../../common/decorators/auth-user.decorator';
import { PayloadEntity } from '../auth/entities/payload.entity';

@ApiTags('Current Mood')
@Controller('current-mood')
export class CurrentMoodController {
  constructor(private readonly currentMoodService: CurrentMoodService) {}

  @Post()
  @ApiOperation({ summary: 'Create mood' })
  @ApiBody({ type: SetCurrentMoodDto })
  @ApiCreatedResponse({
    description: 'Mood created',
    type: CurrentMoodEntity,
  })
  async create(
    @AuthUser() user: PayloadEntity,
    @Body() createCurrentMoodDto: SetCurrentMoodDto,
  ) {
    return await this.currentMoodService.setOrUpdate(
      user.sub,
      createCurrentMoodDto,
    );
  }

  @Get()
  @ApiOperation({ summary: 'Fetch mood' })
  @ApiBody({ type: SetCurrentMoodDto })
  @ApiOkResponse({
    description: 'Updated Mood',
    type: CurrentMoodEntity,
  })
  async findOne(@AuthUser() user: PayloadEntity) {
    return await this.currentMoodService.findOne(user.sub);
  }

  @Delete()
  @ApiOperation({ summary: 'Remove mood' })
  @ApiOkResponse({
    description: 'Removed Mood',
    type: CurrentMoodEntity,
  })
  async delete(@AuthUser() user: PayloadEntity) {
    return await this.currentMoodService.delete(user.sub);
  }
}
