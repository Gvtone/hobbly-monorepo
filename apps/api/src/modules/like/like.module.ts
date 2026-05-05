import { Module } from '@nestjs/common';
import { LikeService } from './like.service';
import { LikeController } from './like.controller';
import { UserModule } from '../user/user.module';
import { EntryModule } from '../entry/entry.module';

@Module({
  imports: [UserModule, EntryModule],
  controllers: [LikeController],
  providers: [LikeService],
})
export class LikeModule {}
