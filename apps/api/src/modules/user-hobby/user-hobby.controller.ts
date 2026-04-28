import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { UserHobbyService } from './user-hobby.service';
import { ApiBody, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateUserHobbyDto } from './dto/create-user-hobby.dto';
import { UserHobbyEntity } from './entities/user-hobby.entity';
import { UpdateUserHobbyDto } from './dto/update-user-hobby.dto';
import { AuthUser } from '../../common/decorators/auth-user.decorator';
import { PayloadEntity } from '../auth/entities/payload.entity';

@ApiTags('User Hobby')
@Controller('user-hobby')
export class UserHobbyController {
  constructor(private readonly userHobbyService: UserHobbyService) {}

  @Post()
  @ApiOperation({ summary: 'Creates new user-hobby connection' })
  @ApiBody({ type: CreateUserHobbyDto })
  @ApiOkResponse({ description: 'Login successful', type: UserHobbyEntity })
  async create(
    @AuthUser() userId: PayloadEntity,
    @Body() createHobbyDto: CreateUserHobbyDto,
  ) {
    return await this.userHobbyService.create(userId.sub, createHobbyDto);
  }

  @Get('find-all')
  @ApiOperation({
    summary: 'Finds all of existing user-hobby connection of the current user',
  })
  @ApiOkResponse({
    description: 'Fetch successful',
    type: [UserHobbyEntity],
  })
  async findAll(@AuthUser() userId: PayloadEntity) {
    return await this.userHobbyService.findAll(userId.sub);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Fetch hobby based on ID' })
  @ApiOkResponse({ description: 'Fetch successful', type: UserHobbyEntity })
  async findById(
    @Param('id', ParseIntPipe) id: number,
    @AuthUser() userId: PayloadEntity,
  ) {
    return await this.userHobbyService.findById(id, userId.sub);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Updates a hobby' })
  @ApiBody({ type: UpdateUserHobbyDto })
  @ApiOkResponse({ description: 'Update successful', type: UserHobbyEntity })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @AuthUser() userId: PayloadEntity,
    @Body() updateHobbyDto: UpdateUserHobbyDto,
  ) {
    return await this.userHobbyService.update(id, userId.sub, updateHobbyDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deletes a hobby' })
  @ApiOkResponse({
    description: 'Delete successful',
    type: UserHobbyEntity,
  })
  async delete(
    @Param('id', ParseIntPipe) id: number,
    @AuthUser() userId: PayloadEntity,
  ) {
    return await this.userHobbyService.delete(id, userId.sub);
  }
}
