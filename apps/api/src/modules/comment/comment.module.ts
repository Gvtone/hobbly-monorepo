import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { EntryModule } from '../entry/entry.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [EntryModule, UserModule],
  controllers: [CommentController],
  providers: [CommentService],
})
export class CommentModule {}
