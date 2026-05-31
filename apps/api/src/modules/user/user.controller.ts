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
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import {
  ApiBody,
  ApiConsumes,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { AuthUser } from '../../common/decorators/auth-user.decorator';
import { PayloadEntity } from '../auth/entities/payload.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { PublicUserEntity, UserEntity } from './entities/user.entity';
import { Roles } from '../../common/decorators/roles.decorator';
import { Public } from '../../common/decorators/public.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { imageFilePipe } from '../../common/pipes/image-file.pipe';
import { UserFilterDto } from './dto/user-filter.dto';
import { PaginatedEntity } from '../../common/entities/paginated.entity';
import { SkipThrottle, Throttle } from '@nestjs/throttler';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('current-user')
  @SkipThrottle({ short: true, long: true })
  @ApiOperation({ summary: 'Fetch the current logged in user' })
  @ApiOkResponse({
    description: 'Fetch successful',
    type: [UserEntity],
  })
  async getCurrentUser(@AuthUser() user: PayloadEntity) {
    return await this.userService.findUserById(user.sub);
  }

  @Public()
  @Get('public/:username')
  @SkipThrottle({ short: true, long: true })
  @ApiOperation({
    summary: 'Fetch the user based on username return public info',
  })
  @ApiParam({ name: 'username', type: 'string' })
  @ApiOkResponse({
    description: 'Fetch successful',
    type: [PublicUserEntity],
  })
  async findUserByUsernamePublic(@Param('username') username: string) {
    return await this.userService.findUserByUsernamePublic(username);
  }

  @Get()
  @SkipThrottle({ short: true, long: true })
  @ApiOperation({ summary: 'Finds all of existing users' })
  @ApiOkResponse({
    description: 'Fetch successful',
    type: PaginatedEntity(UserEntity),
  })
  async findAll(@Query() filter: UserFilterDto) {
    const [data, meta] = await this.userService.findAll(filter);
    return { data, ...meta };
  }

  @Post()
  @ApiOperation({ summary: 'Creates new user' })
  @ApiBody({ type: CreateUserDto })
  @ApiOkResponse({ description: 'Create successful', type: UserEntity })
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto);
  }

  @Post('upload/profile-picture')
  @Throttle({ long: { ttl: 15 * 60 * 1000, limit: 20 } })
  @ApiOperation({ summary: 'Uploads profile picture' })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('image'))
  async uploadProfilePicture(
    @AuthUser() user: PayloadEntity,
    @UploadedFile(imageFilePipe())
    image: Express.Multer.File,
  ) {
    return await this.userService.uploadProfilePicture(user, image);
  }

  @Post('remove/profile-picture')
  @Throttle({ long: { ttl: 15 * 60 * 1000, limit: 20 } })
  @ApiOperation({ summary: 'Removes profile picture' })
  async removeProfilePicture(@AuthUser() user: PayloadEntity) {
    return await this.userService.removeProfilePicture(user);
  }

  @Post('upload/cover-image')
  @Throttle({ long: { ttl: 15 * 60 * 1000, limit: 20 } })
  @ApiOperation({ summary: 'Uploads cover image' })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('image'))
  async uploadCoverImage(
    @AuthUser() user: PayloadEntity,
    @UploadedFile(imageFilePipe())
    image: Express.Multer.File,
  ) {
    return await this.userService.uploadCoverImage(user, image);
  }

  @Post('remove/cover-image')
  @Throttle({ long: { ttl: 15 * 60 * 1000, limit: 20 } })
  @ApiOperation({ summary: 'Removes cover image' })
  async removeCoverImage(@AuthUser() user: PayloadEntity) {
    return await this.userService.removeCoverImage(user);
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
