import { Module } from '@nestjs/common';
import { EntryMoodService } from './entry-mood.service';
import { EntryMoodController } from './entry-mood.controller';

@Module({
  controllers: [EntryMoodController],
  providers: [EntryMoodService],
  exports: [EntryMoodService],
})
export class EntryMoodModule {}
