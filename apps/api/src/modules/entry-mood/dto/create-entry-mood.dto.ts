import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { CreateEntryMoodDto as ICreateEntryMoodDto } from '@hobbies-dashboard/types';

export class CreateEntryMoodDto implements ICreateEntryMoodDto {
  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  icon: string;
}
