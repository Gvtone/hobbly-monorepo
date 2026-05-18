import { Module } from '@nestjs/common';
import { CurrentMoodService } from './current-mood.service';
import { CurrentMoodController } from './current-mood.controller';

@Module({
  controllers: [CurrentMoodController],
  providers: [CurrentMoodService],
})
export class CurrentMoodModule {}
