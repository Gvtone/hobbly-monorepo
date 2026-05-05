import { Module } from '@nestjs/common';
import { EntryService } from './entry.service';
import { EntryController } from './entry.controller';
import { EntryMoodModule } from '../entry-mood/entry-mood.module';

@Module({
  imports: [EntryMoodModule],
  controllers: [EntryController],
  providers: [EntryService],
  exports: [EntryService],
})
export class EntryModule {}
