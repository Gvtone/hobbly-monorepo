import { Controller, Get, Post, Param, Delete } from '@nestjs/common';
import { ProfileShareService } from './profile-share.service';
import {
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { AuthUser } from '../../common/decorators/auth-user.decorator';
import { PayloadEntity } from '../auth/entities/payload.entity';
import {
  ProfileShareEntity,
  ProfileShareWithUserEntity,
} from './entities/profile-share.entity';
import { Public } from '../../common/decorators/public.decorator';

@ApiTags('Profile Share')
@Controller('share')
export class ProfileShareController {
  constructor(private readonly profileShareService: ProfileShareService) {}

  @Post()
  @ApiOperation({
    summary:
      'Creates reference id for profile sharing. Also used for remaking the id',
  })
  @ApiOkResponse({ description: 'Create successful', type: ProfileShareEntity })
  async createOrRemake(@AuthUser() user: PayloadEntity) {
    return await this.profileShareService.createOrRemake(user.sub);
  }

  @Get()
  @ApiOperation({
    summary: 'Finds the reference id of the current user',
  })
  @ApiOkResponse({ description: 'Fetch successful', type: ProfileShareEntity })
  async findOwnRef(@AuthUser() user: PayloadEntity) {
    return await this.profileShareService.findOwnRef(user.sub);
  }

  @Public()
  @Get(':referenceId')
  @ApiOperation({
    summary: 'Finds the user by the reference id',
  })
  @ApiParam({ name: 'referenceId', type: String })
  @ApiOkResponse({
    description: 'Fetch successful',
    type: ProfileShareWithUserEntity,
  })
  async findByReference(@Param('referenceId') referenceId: string) {
    return await this.profileShareService.findByReference(referenceId);
  }

  @Delete()
  @ApiOperation({
    summary: 'Delete the share reference for the current user',
  })
  @ApiOkResponse({ description: 'Delete successful', type: ProfileShareEntity })
  async revoke(@AuthUser() user: PayloadEntity) {
    return await this.profileShareService.revoke(user.sub);
  }
}
