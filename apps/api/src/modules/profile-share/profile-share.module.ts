import { Module } from '@nestjs/common';
import { ProfileShareService } from './profile-share.service';
import { ProfileShareController } from './profile-share.controller';
import { HashService } from '../../common/utils/hash.service';

@Module({
  controllers: [ProfileShareController],
  providers: [ProfileShareService, HashService],
})
export class ProfileShareModule {}
