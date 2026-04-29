import { PartialType } from '@nestjs/swagger';
import { CreateEntryMoodDto } from './create-entry-mood.dto';

export class UpdateEntryMoodDto extends PartialType(CreateEntryMoodDto) {}
