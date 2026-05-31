import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { CurrentMoodService } from './current-mood.service';
import { SetCurrentMoodDto } from './dto/create-current-mood.dto';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { CurrentMoodEntity } from './entities/current-mood.entity';
import { AuthUser } from '../../common/decorators/auth-user.decorator';
import { PayloadEntity } from '../auth/entities/payload.entity';
import { Public } from '../../common/decorators/public.decorator';
import { SkipThrottle } from '@nestjs/throttler';

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
  async setOrUpdate(
    @AuthUser() user: PayloadEntity,
    @Body() createCurrentMoodDto: SetCurrentMoodDto,
  ) {
    return await this.currentMoodService.setOrUpdate(
      user.sub,
      createCurrentMoodDto,
    );
  }

  @Public()
  @Get(':userId')
  @SkipThrottle({ short: true, long: true })
  @ApiOperation({ summary: 'Fetch mood' })
  @ApiParam({ name: 'userId', type: Number })
  @ApiOkResponse({
    description: 'Fetch Mood',
    type: CurrentMoodEntity,
  })
  async findOne(@Param('userId', ParseIntPipe) userId: number) {
    return await this.currentMoodService.findOne(userId);
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
