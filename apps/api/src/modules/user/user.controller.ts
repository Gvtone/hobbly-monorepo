import { Body, Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiBody, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthUser } from '../../common/decorators/auth-user.decorator';
import { PayloadEntity } from '../auth/entities/payload.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

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

  @Patch()
  @ApiOperation({ summary: 'Updates a user' })
  @ApiBody({ type: UpdateUserDto })
  @ApiOkResponse({ description: 'Update successful', type: UserEntity })
  async update(@AuthUser() user: PayloadEntity, updateUserDto: UpdateUserDto) {
    return await this.userService.update(user.sub, updateUserDto);
  }

  @Delete()
  @ApiOperation({ summary: 'Deletes a user' })
  @ApiOkResponse({ description: 'Delete successful', type: UserEntity })
  async delete(@AuthUser() user: PayloadEntity) {
    return await this.userService.delete(user.sub);
  }
}
