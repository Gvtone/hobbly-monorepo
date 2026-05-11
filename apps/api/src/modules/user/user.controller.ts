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
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiBody, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthUser } from '../../common/decorators/auth-user.decorator';
import { PayloadEntity } from '../auth/entities/payload.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { Roles } from '../../common/decorators/roles.decorator';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('current-user')
  @ApiOperation({ summary: 'Fetch the current logged in user' })
  @ApiOkResponse({
    description: 'Fetch successful',
    type: [UserEntity],
  })
  async getCurrentUser(@AuthUser() user: PayloadEntity) {
    return await this.userService.findUserById(user.sub);
  }

  @Get()
  @ApiOperation({ summary: 'Finds all of existing users' })
  @ApiOkResponse({
    description: 'Fetch successful',
    type: [UserEntity],
  })
  async findAll() {
    return await this.userService.findAll();
  }

  @Post()
  @ApiOperation({ summary: 'Creates new user' })
  @ApiBody({ type: CreateUserDto })
  @ApiOkResponse({ description: 'Create successful', type: UserEntity })
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto);
  }

  @Patch('current-user')
  @ApiOperation({ summary: 'Updates the current user' })
  @ApiBody({ type: UpdateUserDto })
  @ApiOkResponse({ description: 'Update successful', type: UserEntity })
  async updateCurrentUser(
    @AuthUser() user: PayloadEntity,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return await this.userService.update(user.sub, updateUserDto);
  }

  @Roles('ADMIN')
  @Patch(':id')
  @ApiOperation({ summary: 'Updates a user' })
  @ApiBody({ type: UpdateUserDto })
  @ApiOkResponse({ description: 'Update successful', type: UserEntity })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return await this.userService.update(id, updateUserDto);
  }

  @Delete('current-user')
  @ApiOperation({ summary: 'Deletes the current user' })
  @ApiOkResponse({ description: 'Delete successful', type: UserEntity })
  async deleteCurrentUser(@AuthUser() user: PayloadEntity) {
    return await this.userService.delete(user.sub);
  }

  @Roles('ADMIN')
  @Delete(':id')
  @ApiOperation({ summary: 'Deletes a user' })
  @ApiOkResponse({ description: 'Delete successful', type: UserEntity })
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.userService.delete(id);
  }
}
